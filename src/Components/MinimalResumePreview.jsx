// src/Components/MinimalResumePreview.jsx
import React, { useEffect } from "react";

function isMeaningfulString(s) { return typeof s === "string" && s.trim() !== ""; }
function isMeaningfulEntry(obj) {
  if (!obj) return false;
  if (typeof obj === "string") return isMeaningfulString(obj);
  if (typeof obj === "number") return true;
  if (Array.isArray(obj)) return obj.some(isMeaningfulEntry);
  if (typeof obj === "object") return Object.values(obj).some(isMeaningfulEntry);
  return !!obj;
}
function arrayHasMeaningful(arr) { return Array.isArray(arr) && arr.some(isMeaningfulEntry); }

export default function MinimalResumePreview({ data = {}, onFieldClick = () => {}, a4Px = 794 }) {
  useEffect(() => { if (document.fonts && document.fonts.ready) document.fonts.ready.catch(() => {}); }, []);

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
    technologies: data.technologies || { languages: "", tools: "" }
  };

  const visible = {
    education: arrayHasMeaningful(doc.education),
    experiences: arrayHasMeaningful(doc.experiences),
    projects: arrayHasMeaningful(doc.projects),
    publications: arrayHasMeaningful(doc.publications),
    skills: (doc.skillCategories && doc.skillCategories.length > 0) || isMeaningfulEntry(doc.technologies),
    certifications: arrayHasMeaningful(doc.certifications)
  };

  const makeHref = (value, type) => {
    if (!value) return "#";
    if (type === "email") return `mailto:${value}`;
    if (type === "phone") return `tel:${String(value).replace(/[^\d+]/g, "")}`;
    if (/^https?:\/\//i.test(value)) return value;
    return `https://${value}`;
  };

  const wrapDigits = (s = "") =>
    String(s).replace(/(\d[\d\-\.\+\/]{0,}\d)/g, '<span class="num">$1</span>');

  function projectBullets(pr) {
    if (!pr) return [];
    if (Array.isArray(pr.bullets) && pr.bullets.length > 0) return pr.bullets;
    if (isMeaningfulString(pr.details)) {
      const parts = pr.details.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
      return parts.length > 0 ? parts : [];
    }
    return [];
  }

  // build contact items with '|' separators; link labels are underlined
  const contactNodes = [];
  if (isMeaningfulString(doc.location)) contactNodes.push(<span key="loc" onClick={() => onFieldClick("location")}>{doc.location}</span>);
  if (isMeaningfulString(doc.website)) contactNodes.push(
    <a key="portfolio" className="contact-link" href={makeHref(doc.website,)}  onClick={(e) => { e.stopPropagation(); onFieldClick("website"); }}>
      <span>{doc.website}</span>
    </a>
  );
  if (isMeaningfulString(doc.email)) contactNodes.push(
    <a key="email" className="contact-link" href={makeHref(doc.email, "email")} onClick={(e) => { e.stopPropagation(); onFieldClick("email"); }}>
      <span>{doc.email}</span>
    </a>
  );
  if (isMeaningfulString(doc.phone)) contactNodes.push(<span key="phone">{doc.phone}</span>);
  if (isMeaningfulString(doc.linkedin)) contactNodes.push(
    <a key="linkedin" className="contact-link" href={makeHref(doc.linkedin)} target="_blank" rel="noreferrer" onClick={(e)=>{ e.stopPropagation(); onFieldClick("linkedin"); }}>
      <span>{String(doc.linkedin).replace(/^https?:\/\//i,"")}</span>
    </a>
  );
  if (isMeaningfulString(doc.github)) contactNodes.push(
    <a key="github" className="contact-link" href={makeHref(doc.github)} target="_blank" rel="noreferrer" onClick={(e)=>{ e.stopPropagation(); onFieldClick("github"); }}>
      <span>{String(doc.github).replace(/^https?:\/\//i,"")}</span>
    </a>
  );

  const interleavedContacts = [];
  contactNodes.forEach((node, idx) => {
    interleavedContacts.push(<span key={`c-${idx}`}>{node}</span>);
    if (idx !== contactNodes.length - 1) interleavedContacts.push(<span key={`sep-${idx}`} className="sep"> | </span>);
  });

  return (
    <div style={{ width: `${a4Px}px`, minHeight: `${Math.round(a4Px * 297 / 210)}px`, background: "#fff", boxSizing: "border-box" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Roboto+Mono:wght@400;700&display=swap');

        .page {
          width: ${a4Px}px;
          padding: 28px 34px;
          box-sizing: border-box;
          font-family: 'Merriweather', serif;
          color: #111;
          font-size: 13.4px;
          line-height: 1.28;
        }

        .name { font-size: 44px; margin: 6px 0 12px 0; font-weight:700; text-align:center; cursor: pointer; }
        .contacts { text-align:center; font-size:13.2px; margin-bottom:14px; display:flex; gap:10px; justify-content:center; align-items:center; flex-wrap:wrap; }
        .contact-link { display:inline-flex; align-items:center; gap:8px; color:#111; text-decoration: none; }
        .contact-link span { text-decoration: underline; color: #111; }
        .sep { color: #222; margin: 0 6px; }

        .section-title { font-size:17px; font-weight:700; margin-top:10px; margin-bottom:8px; }
        .section-rule { border:0; border-top:1px solid #9f9f9f; margin-bottom:10px; }

        /* entry grid: left fluid, right fixed (dates/links) */
        .entry { margin-bottom: 12px; }
        .entry-grid { display:grid; grid-template-columns: minmax(0, 1fr) 160px; gap:6px 14px; align-items:start; }
        .left { min-width:0; }
        .title { font-weight:700; font-size:13.2px; color:#000; word-break:break-word; }
        .meta { font-size:13px; color:#111; margin-top:4px; }
        .dates { text-align:right; white-space:nowrap; color:#222; font-size:12.8px; }

        /* bullets: outside markers, fixed padding-left so wrapped lines align to text start */
        .bullets {
          margin: 6px 0 0 0;
          padding-left: 1.2rem;
          grid-column: 1 / -1;
          list-style-position: outside;
          list-style-type: disc;
        }
        .bullets li {
          margin-bottom: 6px;
          line-height: 1.36;
          font-size: 13px;
          white-space: normal;
          word-break: break-word;
          text-indent: 0;
          display: list-item;
        }

        .project-left { min-width:0; display:flex; flex-direction:column; gap:6px; }
        .right-link { display:inline-block; min-width:120px; text-align:right; white-space:nowrap; color:#111; text-decoration: underline; font-weight:600; }

        .pub-venue { font-style: italic; margin-top:6px; display:block; }
        .cert-name { font-weight:400; }

        .num { font-family: 'Roboto Mono', monospace; font-variant-numeric: tabular-nums; }

        /* small safety for wrapping */
        .entry-grid .left, .entry-grid .dates { overflow-wrap: break-word; word-break: break-word; }

        /* Make sure the marker position looks consistent across browsers */
        .bullets li::marker { font-size: 0.9em; }
        
        /* Year and Link stacked */
        .pub-right { text-align: right; display: flex; flex-direction: column; gap: 4px; align-items: flex-end; }
      `}</style>

      <div className="page" role="document">
        <header>
          <h1 className="name" onClick={() => onFieldClick("name")}>{doc.name || "John Doe"}</h1>
          <div className="contacts" aria-hidden>{interleavedContacts}</div>
        </header>

        {/* Education */}
        {visible.education && (
          <>
            <div className="section-title">Education</div>
            <div className="section-rule" />
            {doc.education.map((ed,i) => (
              <div key={i} className="entry">
                <div className="entry-grid">
                  <div className="left">
                    <div className="title" onClick={() => onFieldClick(`education.${i}.school`)}>
                      {ed.school || "University"}, <span style={{fontWeight:400}}>{ed.degree || "Degree"}</span>
                    </div>
                  </div>

                  <div className="dates" onClick={() => onFieldClick(`education.${i}.dates`)} dangerouslySetInnerHTML={{ __html: wrapDigits(ed.dates || "") }} />

                  {Array.isArray(ed.bullets) && ed.bullets.length > 0 && (
                    <ul className="bullets">
                      {ed.bullets.map((b,bi) => <li key={bi} onClick={() => onFieldClick(`education.${i}.bullets.${bi}`)} style={{cursor:"pointer"}}>{b}</li>)}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </>
        )}

        {/* Experience */}
        {visible.experiences && (
          <>
            <div className="section-title">Experience</div>
            <div className="section-rule" />
            {doc.experiences.map((ex,i) => (
              <div key={i} className="entry">
                <div className="entry-grid">
                  <div className="left">
                    <div className="title" onClick={() => onFieldClick(`experiences.${i}.role`)}>
                      {ex.role || "Job Title"}, <span style={{fontWeight:400}}>{ex.company || "Company"}</span>
                    </div>
                  </div>

                  <div className="dates" onClick={() => onFieldClick(`experiences.${i}.dates`)} dangerouslySetInnerHTML={{ __html: wrapDigits(ex.dates || "") }} />

                  {Array.isArray(ex.bullets) && ex.bullets.length > 0 && (
                    <ul className="bullets">
                      {ex.bullets.map((b,bi) => <li key={bi} onClick={() => onFieldClick(`experiences.${i}.bullets.${bi}`)} style={{cursor:"pointer"}}>{b}</li>)}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </>
        )}

        {/* Publications - Year and Link separate */}
        {visible.publications && (
          <>
            <div className="section-title">Publications</div>
            <div className="section-rule" />
            {doc.publications.map((p,i) => (
              <div key={i} className="entry">
                <div className="entry-grid">
                  <div className="left">
                    <div className="title" onClick={() => onFieldClick(`publications.${i}.title`)}>{p.title || "Publication"}</div>
                    {p.venue ? <div className="pub-venue" onClick={() => onFieldClick(`publications.${i}.venue`)}>{p.venue}</div> : null}
                    {p.doi ? <div className="pub-doi">{p.doi}</div> : null}
                  </div>

                 <div className="pub-right">
                    {p.year ? <span style={{fontSize: '12.8px', color: '#222'}}>{p.year}</span> : null}
                    {p.link ? (
                    <a className="right-link" href={makeHref(p.link)} target="_blank" rel="noreferrer" onClick={(e) => { e.stopPropagation(); onFieldClick(`publications.${i}.link`); }}>
                    Link
                      </a>
                        ) : null}
                  </div>  


                  {Array.isArray(p.bullets) && p.bullets.length > 0 && (
                    <ul className="bullets">
                      {p.bullets.map((b,bi) => <li key={bi} onClick={() => onFieldClick(`publications.${i}.bullets.${bi}`)} style={{cursor:"pointer"}}>{b}</li>)}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </>
        )}

        {/* Projects */}
        {visible.projects && (
          <>
            <div className="section-title">Projects</div>
            <div className="section-rule" />
            {doc.projects.map((pr,i) => {
              const bullets = projectBullets(pr);
              return (
                <div key={i} className="entry">
                  <div className="entry-grid">
                    <div className="left project-left">
                      <div style={{ fontWeight:700 }} onClick={() => onFieldClick(`projects.${i}.title`)}>{pr.title || `Project ${i+1}`}</div>
                      {!bullets.length && pr.details ? <div className="meta" onClick={() => onFieldClick(`projects.${i}.details`)}>{pr.details}</div> : null}
                    </div>

                    <div className="dates">
                      {pr.link ? (
                        <a className="right-link" href={makeHref(pr.link)} target="_blank" rel="noreferrer" onClick={(e) => { e.stopPropagation(); onFieldClick(`projects.${i}.link`); }}>
                          Link
                        </a>
                      ) : pr.year ? <span className="num">{pr.year}</span> : null}
                    </div>

                    {bullets.length > 0 && (
                      <ul className="bullets">
                        {bullets.map((b,bi) => <li key={bi} onClick={() => onFieldClick(`projects.${i}.bullets.${bi}`)} style={{cursor:"pointer"}}>{b}</li>)}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* Technologies / Skills */}
        {visible.skills && (
          <>
            <div className="section-title">Technologies</div>
            <div className="section-rule" />
            <div style={{ marginBottom: 6 }}>
              {Array.isArray(doc.skillCategories) && doc.skillCategories.length > 0 ? (
                doc.skillCategories.map((cat, idx) => <div key={idx} style={{ marginBottom: 6 }}><strong>{cat.title}:</strong> {Array.isArray(cat.items) ? cat.items.join(", ") : ""}</div>)
              ) : (
                <>
                  {doc.technologies.languages ? <div style={{ marginBottom:6 }}><strong>Languages:</strong> {doc.technologies.languages}</div> : null}
                  {doc.technologies.tools ? <div style={{ marginBottom:6 }}><strong>Technologies:</strong> {doc.technologies.tools}</div> : null}
                </>
              )}
            </div>
          </>
        )}

        {/* Certifications */}
        {visible.certifications && (
          <>
            <div className="section-title">Certifications</div>
            <div className="section-rule" />
            {doc.certifications.map((c,i) => (
              <div key={i} className="entry">
                <div className="entry-grid">
                  <div className="left">
                    <div className="cert-name" onClick={() => onFieldClick(`certifications.${i}.name`)} style={{ fontWeight: 400 }}>{c.name}</div>
                  </div>

                  <div className="dates">
                    {c.link ? <a className="right-link" href={makeHref(c.link)} target="_blank" rel="noreferrer" onClick={(e)=>{ e.stopPropagation(); onFieldClick(`certifications.${i}.link`); }}>Link</a> : null}
                  </div>

                  {Array.isArray(c.bullets) && c.bullets.length > 0 && (
                    <ul className="bullets">
                      {c.bullets.map((b,bi) => <li key={bi} onClick={() => onFieldClick(`certifications.${i}.bullets.${bi}`)} style={{cursor:"pointer"}}>{b}</li>)}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
