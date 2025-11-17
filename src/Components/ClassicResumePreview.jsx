import React, { useEffect } from "react";

function isMeaningfulString(s) {
  return typeof s === "string" && s.trim() !== "";
}
function isMeaningfulEntry(obj) {
  if (!obj) return false;
  if (typeof obj === "string") return isMeaningfulString(obj);
  if (typeof obj === "number") return true;
  if (Array.isArray(obj)) return obj.some(isMeaningfulEntry);
  if (typeof obj === "object") return Object.values(obj).some(isMeaningfulEntry);
  return !!obj;
}
function arrayHasMeaningful(arr) {
  return Array.isArray(arr) && arr.some(isMeaningfulEntry);
}

export default function ClassicResumePreview({
  data = {},
  onFieldClick = () => { },
  a4Px = 794,
}) {
  useEffect(() => {
    if (document.fonts && document.fonts.ready) document.fonts.ready.catch(() => { });
  }, []);

  const doc = {
    name: data.name || "",
    email: data.email || "",
    phone: data.phone || "",
    location: data.location || "",
    website: data.website || "",
    linkedin: data.linkedin || "",
    github: data.github || "",
    education: Array.isArray(data.education) ? data.education : [],
    experiences: Array.isArray(data.experiences) ? data.experiences : [],
    projects: Array.isArray(data.projects) ? data.projects : [],
    publications: Array.isArray(data.publications) ? data.publications : [],
    certifications: Array.isArray(data.certifications) ? data.certifications : [],
    skillCategories: Array.isArray(data.skillCategories) ? data.skillCategories : [],
    technologies: data.technologies || {},
  };

  const visible = {
    education: arrayHasMeaningful(doc.education),
    experiences: arrayHasMeaningful(doc.experiences),
    projects: arrayHasMeaningful(doc.projects),
    publications: arrayHasMeaningful(doc.publications),
    skills:
      (doc.skillCategories && doc.skillCategories.length > 0) ||
      isMeaningfulString(doc.technologies.languages) ||
      isMeaningfulString(doc.technologies.tools),
    certifications: arrayHasMeaningful(doc.certifications),
  };

  const makeHref = (value, type) => {
    if (!value) return "#";
    if (type === "email") return `mailto:${value}`;
    if (type === "phone") return `tel:${String(value).replace(/[^\d+]/g, "")}`;
    if (/^https?:\/\//i.test(value)) return value;
    return `https://${value}`;
  };

  const contactItems = [];
  if (doc.phone)
    contactItems.push({ key: "phone", label: doc.phone, href: makeHref(doc.phone, "phone") });
  if (doc.website)
    contactItems.push({ key: "website", label: "Portfolio", href: makeHref(doc.website) });
  if (doc.email)
    contactItems.push({ key: "email", label: doc.email, href: makeHref(doc.email, "email") });
  if (doc.linkedin)
    contactItems.push({ key: "linkedin", label: "LinkedIn", href: makeHref(doc.linkedin) });
  if (doc.github)
    contactItems.push({ key: "github", label: "GitHub", href: makeHref(doc.github) });

  const educationVisibleBullets = (ed) => {
    if (!Array.isArray(ed.bullets)) return [];
    return ed.bullets.filter(Boolean);
  };

  return (
    <div
      style={{
        width: `${a4Px}px`,
        minHeight: `${Math.round((a4Px * 297) / 210)}px`,
        background: "#fff",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap');
        
        .classic-page {
          width: ${a4Px}px;
          margin: 0 auto;
          padding: 24px 44px 0 44px;
          box-sizing: border-box;
          color: #111;
          font-family: 'Libre Baskerville', serif;
          font-size: 13.2px;
          line-height: 1.38;
        }
        .classic-name {
          font-size: 33px;
          text-align: center;
          font-weight: 700;
          margin-top: 7px;
          margin-bottom: 7px;
        }
        .classic-contacts {
          text-align: center;
          font-size: 13px;
          color: #111;
          margin-bottom: 18px;
        }
        .classic-contacts a {
          color: #0b54c8;
          text-decoration: underline;
          font-weight: 700;
          margin: 0 8px;
        }
        .classic-contacts .sep {
          color: #888;
          margin: 0 7px;
        }
        .section-head {
          color: #4d7da7;
          font-weight: 700;
          font-size: 15px;
          text-transform: uppercase;
          font-variant: small-caps;
          letter-spacing: .7px;
          margin-top: 22px;
          margin-bottom: 0px;
        }
        .section-rule {
          border: 0;
          border-top: 1px solid #bfcad2;
          margin: 5px 0 10px 0;
        }
        .entry { 
          margin-bottom: 8px;
        }
        
        /* Fixed grid with flexible right column */
        .entry-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(120px, auto);
          gap: 6px 14px;
          align-items: start;
        }
        .entry-left {
          min-width: 0;
        }
        .entry-title { 
          font-weight: 700; 
          font-size: 14.5px; 
          color: #000;
        }
        .entry-sub { 
          font-style: italic; 
          color: #222; 
          font-size: 13px;
        }
        .entry-dates {
          text-align: right;
          color: #444;
          font-size: 13px;
          font-style: italic;
          white-space: nowrap;
        }
        .edu-location { 
          font-weight: 700;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
        .edu-dates { 
          font-style: italic;
          color: #444;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
        
        /* Bullets spanning full grid width */
        .bullets {
          margin: 6px 0 0 0;
          padding-left: 21px;
          grid-column: 1 / -1;
          list-style-position: outside;
          list-style-type: disc;
        }
        .bullets li {
          margin-bottom: 4px;
          font-size: 13.2px;
          line-height: 1.22;
          color: #1a1a1a;
          word-break: break-word;
        }
        
        .skills-block { 
          margin: 4px 0 0 0; 
        }
        
        /* Projects/Publications/Certs use inline layout */
        .project-title, .pub-title {
          font-weight: 700;
        }
        .cert-name {
          font-weight: 400;
        }
        .project-link, .pub-link, .cert-link {
          color: #0b54c8;
          text-decoration: underline;
          font-weight: 700;
          font-size: 13px;
          white-space: nowrap;
        }
        .pub-venue {
          font-style: italic;
        }
      `}</style>

      <div className="classic-page">
        <header>
          <div className="classic-name">{doc.name || "Full Name"}</div>
          <div className="classic-contacts">
            {contactItems.map((it, idx) => (
              <React.Fragment key={it.key}>
                {idx > 0 && <span className="sep">&middot;</span>}
                {it.href && it.key !== "phone" ? (
                  <a href={it.href} target="_blank" rel="noreferrer">{it.label}</a>
                ) : (
                  <span>{it.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </header>

        {/* EDUCATION */}
        {visible.education && (
          <>
            <div className="section-head">EDUCATION</div>
            <hr className="section-rule" />
            {doc.education.map((ed, i) => {
              const eduBullets = educationVisibleBullets(ed);
              return (
                <div className="entry" key={i}>
                  <div className="entry-grid">
                    <div className="entry-left">
                      <div className="entry-title">{ed.school || "University 1"}</div>
                      <div className="entry-sub">{ed.degree || "Degree and Specialization"}</div>
                    </div>
                    <div style={{ textAlign: 'right', wordWrap: 'break-word', overflowWrap: 'break-word', maxWidth: '100%' }}>
                      {ed.location ? <div className="edu-location">{ed.location}</div> : null}
                      {ed.dates ? <div className="edu-dates">{ed.dates}</div> : null}
                    </div>

                    {eduBullets.length > 0 && (
                      <ul className="bullets">
                        {eduBullets.map((b, bi) => <li key={bi}>{b}</li>)}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* TECHNICAL SKILLS */}
        {visible.skills && (
          <>
            <div className="section-head">TECHNICAL SKILLS</div>
            <hr className="section-rule" />
            <div className="skills-block">
              {Array.isArray(doc.skillCategories) && doc.skillCategories.length > 0 ? (
                doc.skillCategories.map((cat, idx) => {
                  const items = Array.isArray(cat.items) ? cat.items.filter(Boolean) : [];
                  if (!cat.title && items.length === 0) return null;
                  return (
                    <div key={idx} style={{ marginBottom: 2 }}>
                      <span style={{ fontWeight: 700, marginRight: 6 }}>{cat.title || "Category:"}</span>
                      <span>{items.join(", ")}</span>
                    </div>
                  );
                })
              ) : (
                (doc.technologies && (doc.technologies.languages || doc.technologies.tools)) ? (
                  <>
                    {doc.technologies.languages ? (<div><span style={{ fontWeight: 700 }}>Programming Languages:</span> <span>{doc.technologies.languages}</span></div>) : null}
                    {doc.technologies.tools ? (<div><span style={{ fontWeight: 700 }}>Libraries and Tools:</span> <span>{doc.technologies.tools}</span></div>) : null}
                    {doc.technologies.architectures ? (<div><span style={{ fontWeight: 700 }}>ML Architectures:</span> <span>{doc.technologies.architectures}</span></div>) : null}
                  </>
                ) : null
              )}
            </div>
          </>
        )}

        {/* WORK EXPERIENCE */}
        {visible.experiences && (
          <>
            <div className="section-head">WORK EXPERIENCE</div>
            <hr className="section-rule" />
            {doc.experiences.map((ex, i) => (
              <div className="entry" key={i}>
                <div className="entry-grid">
                  <div className="entry-left">
                    <div className="entry-title">{ex.role || "Job Title"}</div>
                    <div className="entry-sub">{ex.company || "Company Name, State, Country"}</div>
                  </div>
                  <div className="entry-dates">{ex.dates || "Month Year - Month Year"}</div>

                  {Array.isArray(ex.bullets) && ex.bullets.length > 0 && (
                    <ul className="bullets">
                      {ex.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </>
        )}

        {/* PROJECTS */}
        {visible.projects && (
          <>
            <div className="section-head">PROJECTS</div>
            <hr className="section-rule" />
            <ul style={{ margin: '7px 0 0 0', padding: '0 0 0 18px', listStyleType: 'disc', listStylePosition: 'outside' }}>
              {doc.projects.map((pr, i) => (
                <li key={i} style={{ marginBottom: 6 }}>
                  <span className="project-title">{pr.title || `Project ${i + 1} title`}, </span>
                  <span>{pr.details || ""}</span>
                  {pr.link ? (
                    <>
                      {" "}
                      <a className="project-link" href={/^https?:\/\//i.test(pr.link) ? pr.link : `https://${pr.link}`} target="_blank" rel="noreferrer">
                        {pr.linkLabel || "Link"}
                      </a>
                    </>
                  ) : null}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* PUBLICATIONS */}
        {visible.publications && (
          <>
            <div className="section-head">PUBLICATIONS</div>
            <hr className="section-rule" />
            <ul style={{ margin: '7px 0 0 0', padding: '0 0 0 18px', listStyleType: 'disc', listStylePosition: 'outside' }}>
              {doc.publications.map((p, i) => (
                <li key={i} style={{ marginBottom: 6 }}>
                  <span className="pub-title">{p.title || "Add Publication details here"}</span>
                  {p.venue ? <span className="pub-venue"> {p.venue}</span> : null}
                  {p.summary ? <span> {p.summary}</span> : null}
                  {p.link ? (
                    <>
                      {" "}
                      <a className="pub-link" href={/^https?:\/\//i.test(p.link) ? p.link : `https://${p.link}`} target="_blank" rel="noreferrer">
                        Link
                      </a>
                    </>
                  ) : null}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* CERTIFICATIONS */}
        {visible.certifications && (
          <>
            <div className="section-head">CERTIFICATIONS</div>
            <hr className="section-rule" />
            <ul style={{ margin: '7px 0 0 0', padding: '0 0 0 18px', listStyleType: 'disc', listStylePosition: 'outside' }}>
              {doc.certifications.map((c, i) => (
                <li key={i} style={{ marginBottom: 6 }}>
                  <span className="cert-name">{c.name || "Certification"}</span>
                  {c.link ? (
                    <>
                      {" "}
                      <a className="cert-link" href={/^https?:\/\//i.test(c.link) ? c.link : `https://${c.link}`} target="_blank" rel="noreferrer">
                        Link
                      </a>
                    </>
                  ) : null}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
