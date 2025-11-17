// src/pages/ResumeEditor.jsx
import React, { useRef, useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineReload } from "react-icons/ai";
import MinimalResumePreview from "../Components/MinimalResumePreview";
import ClassicResumePreview from "../Components/ClassicResumePreview";

/* mm -> px @96dpi for A4 width */
function mmToPx(mm) { return Math.round(mm * (96 / 25.4)); }
const A4_PX = mmToPx(210);

// DEFAULTS used for reset
const DEFAULTS = {
  name: "John Doe",
  email: "john@example.com",
  phone: "+91 99999 99999",
  location: "Your Location",
  website: "yourwebsite.com",
  linkedin: "linkedin.com/in/yourusername",
  github: "github.com/yourusername",

  education: [
    {
      school: "University 1",
      degree: "Degree and Specialization",
      location: "Location, State, USA",
      dates: "Month Year - Month Year",
      bullets: ["GPA: 10/10 ", "Coursework: Coursework in detail "]
    }
  ],

  experiences: [
    {
      role: "Job 1 Title",
      company: "Company Name, State, Country ",
      dates: "Month Year - Month Year",
      bullets: [
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eget nunc ultricies congue. 
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae`,
            `nteger hendrerit semper velit, non vehicula nibh feugiat nec. Vivamus nec consequat nisi. Suspendisse potenti. Sed
            consectetur elit sed aliquam eleifend.`,
            "Sed nec quam et urna placerat placerat. Aenean at mi id nunc venenatis feugiat"
]
    },
   {
      role: "Job 2 Title",
      company: "Company Name, State, Country ",
      dates: "Month Year - Month Year",
      bullets: [
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eget nunc ultricies congue. 
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae`,
            `nteger hendrerit semper velit, non vehicula nibh feugiat nec. Vivamus nec consequat nisi. Suspendisse potenti. Sed
            consectetur elit sed aliquam eleifend.`,
            "Sed nec quam et urna placerat placerat. Aenean at mi id nunc venenatis feugiat"
]
    },
    {
      role: "Job 3 Title",
      company: "Company Name, State, Country ",
      dates: "Month Year - Month Year",
      bullets: [
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eget nunc ultricies congue. 
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae`,
            `nteger hendrerit semper velit, non vehicula nibh feugiat nec. Vivamus nec consequat nisi. Suspendisse potenti. Sed
            consectetur elit sed aliquam eleifend.`,
            "Sed nec quam et urna placerat placerat. Aenean at mi id nunc venenatis feugiat"
]
    },
  ],

  projects: [
    {
      title: "Project 1 title",
      details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eget nunc ultricies congue.
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae`,
      link: "github.com/name/repo"
    },
    {
      title: "Project 2 title",
      details: `Vivamus nec consequat nisi. Suspendisse potenti. Sed consectetur elit sed aliquam eleifend. Sed
                nec quam et urna placerat placerat.`,
      link: "github.com/name/repo"
    }
  ],

  publications: [
    { title: "Paper A", venue: "Conference X", year: "Month-Year", link: "Link" }
  ],

  skillCategories: [
    { title: "Programming languages", items: ["C++", "C", "Java", "JavaScript"] },
    { title: "Tools", items: [".NET", "Microsoft SQL Server", "XCode", "Interface Builder"] }
  ],

  certifications: [
    { name: "Add Certification details here", link: "Link" },
    { name: "Add Certification details here", link: "Link" }
  ]
};

export default function ResumeEditor({ templateKey, onBack }) {
  const { register, watch, setValue, getValues, reset } = useForm({
    defaultValues: DEFAULTS
  });

  // local state for array sections
  const [education, setEducation] = useState(getValues("education") || []);
  const [experiences, setExperiences] = useState(getValues("experiences") || []);
  const [projects, setProjects] = useState(getValues("projects") || []);
  const [publications, setPublications] = useState(getValues("publications") || []);
  const [certifications, setCertifications] = useState(getValues("certifications") || []);
  const [skillCategories, setSkillCategories] = useState(getValues("skillCategories") || []);

  // sync with react-hook-form
  useEffect(() => setValue("education", education), [education, setValue]);
  useEffect(() => setValue("experiences", experiences), [experiences, setValue]);
  useEffect(() => setValue("projects", projects), [projects, setValue]);
  useEffect(() => setValue("publications", publications), [publications, setValue]);
  useEffect(() => setValue("certifications", certifications), [certifications, setValue]);
  useEffect(() => setValue("skillCategories", skillCategories), [skillCategories, setValue]);

  const watched = watch();
  const previewRef = useRef(null);

  // focus helper
  function focusField(path) {
    const id = `input-${path.replace(/\./g, "-")}`;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.focus();
      if (el.select) el.select();
    }
  }

  // navigation: go back
  function handleBack() {
    if (typeof onBack === "function") { onBack(); return; }
    window.history.back();
  }

  // Reset to defaults
  function resetEditor() {
    if (!window.confirm("Reset the resume to default content? This will overwrite current edits.")) return;
    reset(DEFAULTS);
    setEducation(DEFAULTS.education.slice());
    setExperiences(DEFAULTS.experiences.slice());
    setProjects(DEFAULTS.projects.slice());
    setPublications(DEFAULTS.publications ? DEFAULTS.publications.slice() : []);
    setCertifications(DEFAULTS.certifications.slice());
    setSkillCategories(DEFAULTS.skillCategories.slice());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // remove entire section
  function removeSection(section) {
    if (!window.confirm(`Remove the entire "${section}" section?`)) return;
    if (section === "education") setEducation([]);
    if (section === "experiences") setExperiences([]);
    if (section === "projects") setProjects([]);
    if (section === "publications") setPublications([]);
    if (section === "certifications") setCertifications([]);
    if (section === "skills") setSkillCategories([]);
  }

  // array helpers
  const updateEducation = (i, key, val) => setEducation(prev => prev.map((p, idx) => idx === i ? { ...p, [key]: val } : p));
  const addEducation = () => setEducation(prev => [...prev, { school: "", degree: "", location: "", dates: "", bullets: [] }]);
  const removeEducationItem = (i) => setEducation(prev => prev.filter((_, idx) => idx !== i));

  const updateExperience = (i, key, val) => setExperiences(prev => prev.map((p, idx) => idx === i ? { ...p, [key]: val } : p));
  const addExperience = () => setExperiences(prev => [...prev, { role: "", company: "", dates: "", bullets: [] }]);
  const removeExperienceItem = (i) => setExperiences(prev => prev.filter((_, idx) => idx !== i));

  const updateProject = (i, key, val) => setProjects(prev => prev.map((p, idx) => idx === i ? { ...p, [key]: val } : p));
  const addProject = () => setProjects(prev => [...prev, { title: "", details: "", link: "" }]);
  const removeProjectItem = (i) => setProjects(prev => prev.filter((_, idx) => idx !== i));

  const updatePublication = (i, key, val) => setPublications(prev => prev.map((p, idx) => idx === i ? { ...p, [key]: val } : p));
  const addPublication = () => setPublications(prev => [...prev, { title: "", venue: "", year: "", link: "" }]);
  const removePublicationItem = (i) => setPublications(prev => prev.filter((_, idx) => idx !== i));

  const updateCertification = (i, key, val) => setCertifications(prev => prev.map((p, idx) => idx === i ? { ...p, [key]: val } : p));
  const addCertification = () => setCertifications(prev => [...prev, { name: "", link: "" }]);
  const removeCertification = (i) => setCertifications(prev => prev.filter((_, idx) => idx !== i));

  // skill categories helpers
  function addSkillCategory() { setSkillCategories(prev => [...prev, { title: "New category", items: [] }]); }
  function updateSkillCategoryTitle(index, title) { setSkillCategories(prev => prev.map((c, i) => i === index ? { ...c, title } : c)); }
  function removeSkillCategory(index) { setSkillCategories(prev => prev.filter((_, i) => i !== index)); }
  function addSkillItem(index, item) {
    const trimmed = (item || "").trim(); if (!trimmed) return;
    setSkillCategories(prev => prev.map((c, i) => i === index ? { ...c, items: [...(c.items || []), trimmed] } : c));
  }
  function updateSkillItem(index, itemIndex, value) {
    setSkillCategories(prev => prev.map((c, i) => {
      if (i !== index) return c;
      const items = (c.items || []).slice();
      items[itemIndex] = value;
      return { ...c, items };
    }));
  }
  function removeSkillItem(index, itemIndex) {
    setSkillCategories(prev => prev.map((c, i) => {
      if (i !== index) return c;
      const items = (c.items || []).filter((_, j) => j !== itemIndex);
      return { ...c, items };
    }));
  }

  // combined data passed to preview
  const combinedData = useMemo(() => ({
    name: watched.name || "",
    email: watched.email || "",
    phone: watched.phone || "",
    location: watched.location || "",
    website: watched.website || "",
    linkedin: watched.linkedin || "",
    github: watched.github || "",
    education,
    experiences,
    projects,
    publications,
    certifications,
    technologies: { languages: "", tools: "" },
    skillCategories
  }), [
    watched.name, watched.email, watched.phone, watched.location, watched.website, watched.linkedin, watched.github,
    education, experiences, projects, publications, certifications, skillCategories
  ]);

  // choose preview component
  const key = (templateKey || "").toString().toLowerCase();
  const PreviewComponent = key === "classic" ? ClassicResumePreview : MinimalResumePreview;

  // EXPORT PDF
  async function exportToPdf() {
    if (!previewRef.current) { alert("Preview not ready"); return; }

    try {
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("html2canvas"), import("jspdf")]);

      const node = previewRef.current;
      const originalBg = node.style.background;
      node.style.background = "#ffffff";

      const scale = 2;
      const rawCanvas = await html2canvas(node, {
        scale,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false
      });

      node.style.background = originalBg;

      function cropCanvasToContent(c) {
        const ctx = c.getContext("2d");
        const w = c.width;
        const h = c.height;
        const imageData = ctx.getImageData(0, 0, w, h).data;
        let lastContentRow = -1;
        for (let row = h - 1; row >= 0; row--) {
          let rowHasContent = false;
          const rowStart = row * w * 4;
          for (let col = 0; col < w; col++) {
            const r = imageData[rowStart + col * 4 + 0];
            const g = imageData[rowStart + col * 4 + 1];
            const b = imageData[rowStart + col * 4 + 2];
            const a = imageData[rowStart + col * 4 + 3];
            if (a > 16 && !(r > 245 && g > 245 && b > 245)) {
              rowHasContent = true;
              break;
            }
          }
          if (rowHasContent) { lastContentRow = row; break; }
        }
        if (lastContentRow === -1 || lastContentRow === h - 1) return c;
        const cropHeight = lastContentRow + 1;
        const cropped = document.createElement("canvas");
        cropped.width = w;
        cropped.height = cropHeight;
        cropped.getContext("2d").putImageData(ctx.getImageData(0, 0, w, cropHeight), 0, 0);
        return cropped;
      }

      const canvas = cropCanvasToContent(rawCanvas);
      const imgData = canvas.toDataURL("image/jpeg", 0.92);

      const pdf = new jsPDF({ unit: "pt", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgProps = { width: canvas.width, height: canvas.height };
      const pdfImgWidth = pageWidth;
      const pdfImgHeight = (imgProps.height * pdfImgWidth) / imgProps.width;

      const pagesFull = Math.floor(pdfImgHeight / pageHeight);
      const remainder = pdfImgHeight - pagesFull * pageHeight;
      const totalPages = pagesFull + (remainder > 1 ? 1 : 0);

      for (let i = 0; i < totalPages; i++) {
        if (i > 0) pdf.addPage();
        const y = -i * pageHeight;
        pdf.addImage(imgData, "JPEG", 0, y, pdfImgWidth, pdfImgHeight);
      }

      const filename = ((getValues("name") || "resume").trim().replace(/\s+/g, "_") || "resume").toLowerCase();
      pdf.save(`${filename}.pdf`);
    } catch (err) {
      console.error("PDF export error:", err);
      alert("Export failed — check console. Ensure html2canvas & jspdf are installed.");
    }
  }

  // small UI styles
  const inputStyle = { width: "100%", padding: 10, fontSize: 14.5, marginTop: 6, border: "1px solid #ddd", borderRadius: 8 };
  const smallInput = { padding: 8, fontSize: 13, borderRadius: 8, border: "1px solid #ddd" };
  const cardStyle = {
    border: "1px solid #eee",
    padding: 12,
    marginTop: 10,
    borderRadius: 8,
    boxShadow: "0 6px 18px rgba(20,20,20,0.06)",
    background: "#fff"
  };

  return (
    <div style={{ display: "flex", gap: 20, padding: 20 }}>
      {/* EDITOR */}
      <div style={{ width: "34%", maxHeight: "92vh", overflow: "auto", padding: 16 }}>
        {/* Header: Back, Title, Reset */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={handleBack} style={{
              padding: "12px 12px",
              fontSize: "12px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              background: "#fff",
              cursor: "pointer",
              fontWeight: 800,
              boxShadow: "0 6px 18px rgba(0,0,0,0.10)"
            }}>← Back</button>

            <h2 style={{ margin: 0, color: "#000", fontWeight: 500 }}>Resume Editor</h2>

            <button onClick={resetEditor} style={{
              marginLeft: "40px",
              fontSize: "14px",
              background: "#ffff",
              border: "1px solid #ddd",
              padding: "8px 14px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}>
              <AiOutlineReload size={14} />
              Reset
            </button>
          </div>
        </div>

        <hr style={{ marginTop: 6, marginBottom: 12 }} />

        <form onSubmit={(e) => e.preventDefault()}>
          {/* Personal */}
          <div style={cardStyle}>
            <h4 style={{ margin: 0, marginBottom: 8 }}>Personal Details</h4>
            <label style={{ display: "block", fontWeight: 600 }}>Full name</label>
            <input id="input-name" {...register("name")} style={inputStyle} placeholder="John Doe" />

            <label style={{ display: "block", fontWeight: 600, marginTop: 8 }}>Location</label>
            <input id="input-location" {...register("location")} style={inputStyle} placeholder="Your Location" />

            <label style={{ display: "block", fontWeight: 600, marginTop: 8 }}>Email</label>
            <input id="input-email" {...register("email")} style={inputStyle} placeholder="you@example.com" />

            <label style={{ display: "block", fontWeight: 600, marginTop: 8 }}>Phone</label>
            <input id="input-phone" {...register("phone")} style={inputStyle} placeholder="+91 98765 43210" />

            <label style={{ display: "block", fontWeight: 600, marginTop: 8 }}>Website</label>
            <input id="input-website" {...register("website")} style={inputStyle} placeholder="yourwebsite.com" />

            <label style={{ display: "block", fontWeight: 600, marginTop: 8 }}>LinkedIn</label>
            <input id="input-linkedin" {...register("linkedin")} style={inputStyle} placeholder="linkedin.com/in/you" />

            <label style={{ display: "block", fontWeight: 600, marginTop: 8 }}>GitHub</label>
            <input id="input-github" {...register("github")} style={inputStyle} placeholder="github.com/you" />
          </div>

          {/* Education */}
          <div style={{ ...cardStyle }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h4 style={{ margin: 0, color: "#000" }}>Education</h4>
              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" onClick={() => removeSection("education")} style={{ background: "#fff", border: "1px solid #f8caca", color: "#a00", padding: "6px 8px", borderRadius: 6 }}>Remove</button>
                <button type="button" onClick={addEducation} style={{ background: "#000", color: "#fff", padding: "6px 10px", borderRadius: 6 }}>+ Add</button>
              </div>
            </div>

            {education.map((ed, i) => (
              <div key={i} style={{ marginTop: 10 }}>
                <input id={`input-education-${i}-school`} value={ed.school} onChange={(e) => updateEducation(i, "school", e.target.value)} placeholder="School" style={inputStyle} />
                <input id={`input-education-${i}-degree`} value={ed.degree} onChange={(e) => updateEducation(i, "degree", e.target.value)} placeholder="Degree" style={{ ...inputStyle, marginTop: 8 }} />
                <input id={`input-education-${i}-location`} value={ed.location || ""} onChange={(e) => updateEducation(i, "location", e.target.value)} placeholder="Location" style={{ ...inputStyle, marginTop: 8 }} />
                <input id={`input-education-${i}-dates`} value={ed.dates} onChange={(e) => updateEducation(i, "dates", e.target.value)} placeholder="Dates" style={{ ...inputStyle, marginTop: 8 }} />
                <textarea id={`input-education-${i}-bullets`} value={(ed.bullets || []).join("\n")} onChange={(e) => updateEducation(i, "bullets", e.target.value.split("\n"))} placeholder="Bullets (one per line)" rows={3} style={{ width: "100%", marginTop: 8, padding: 8 }} />
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                  <button type="button" onClick={() => removeEducationItem(i)} style={{ background: "#fff", border: "1px solid #eee", padding: "6px 8px", borderRadius: 6 }}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* Experience */}
          <div style={{ ...cardStyle }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h4 style={{ margin: 0, color: "#000" }}>Experience</h4>
              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" onClick={() => removeSection("experiences")} style={{ background: "#fff", border: "1px solid #f8caca", color: "#a00", padding: "6px 8px", borderRadius: 6 }}>Remove</button>
                <button type="button" onClick={addExperience} style={{ background: "#000", color: "#fff", padding: "6px 10px", borderRadius: 6 }}>+ Add</button>
              </div>
            </div>

            {experiences.map((ex, i) => (
              <div key={i} style={{ marginTop: 10 }}>
                <input id={`input-experiences-${i}-role`} value={ex.role} onChange={(e) => updateExperience(i, "role", e.target.value)} placeholder="Role" style={inputStyle} />
                <input id={`input-experiences-${i}-company`} value={ex.company} onChange={(e) => updateExperience(i, "company", e.target.value)} placeholder="Company" style={{ ...inputStyle, marginTop: 8 }} />
                <input id={`input-experiences-${i}-dates`} value={ex.dates} onChange={(e) => updateExperience(i, "dates", e.target.value)} placeholder="Dates" style={{ ...inputStyle, marginTop: 8 }} />
                <textarea id={`input-experiences-${i}-bullets`} value={(ex.bullets || []).join("\n")} onChange={(e) => updateExperience(i, "bullets", e.target.value.split("\n"))} placeholder="Bullets (one per line)" rows={4} style={{ width: "100%", marginTop: 8, padding: 8 }} />
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                  <button type="button" onClick={() => removeExperienceItem(i)} style={{ background: "#fff", border: "1px solid #eee", padding: "6px 8px", borderRadius: 6 }}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div style={{ ...cardStyle }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h4 style={{ margin: 0, color: "#000" }}>Projects</h4>
              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" onClick={() => removeSection("projects")} style={{ background: "#fff", border: "1px solid #f8caca", color: "#a00", padding: "6px 8px", borderRadius: 6 }}>Remove</button>
                <button type="button" onClick={addProject} style={{ background: "#000", color: "#fff", padding: "6px 10px", borderRadius: 6 }}>+ Add</button>
              </div>
            </div>

            {projects.map((pr, i) => (
              <div key={i} style={{ marginTop: 10 }}>
                <input id={`input-projects-${i}-title`} value={pr.title} onChange={(e) => updateProject(i, "title", e.target.value)} placeholder="Title" style={inputStyle} />
                <input id={`input-projects-${i}-link`} value={pr.link} onChange={(e) => updateProject(i, "link", e.target.value)} placeholder="Link" style={{ ...inputStyle, marginTop: 8 }} />
                <textarea 
                  id={`input-projects-${i}-details`} 
                  value={pr.details} 
                  onChange={(e) => updateProject(i, "details", e.target.value)} 
                  placeholder={key === "classic" ? "Description (continuous text)" : "Description (press Enter for bullet points)"} 
                  rows={4} 
                  style={{ width: "100%", marginTop: 8, padding: 8 }} 
                />
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                  <button type="button" onClick={() => removeProjectItem(i)} style={{ background: "#fff", border: "1px solid #eee", padding: "6px 8px", borderRadius: 6 }}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* Publications */}
          <div style={{ ...cardStyle }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h4 style={{ margin: 0, color: "#000" }}>Publications</h4>
              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" onClick={() => removeSection("publications")} style={{ background: "#fff", border: "1px solid #f8caca", color: "#a00", padding: "6px 8px", borderRadius: 6 }}>Remove</button>
                <button type="button" onClick={addPublication} style={{ background: "#000", color: "#fff", padding: "6px 10px", borderRadius: 6 }}>+ Add</button>
              </div>
            </div>

            {publications.map((p, i) => (
              <div key={i} style={{ marginTop: 10 }}>
                <input id={`input-publications-${i}-title`} value={p.title} onChange={(e) => updatePublication(i, "title", e.target.value)} placeholder="Title" style={inputStyle} />
                <input id={`input-publications-${i}-venue`} value={p.venue} onChange={(e) => updatePublication(i, "venue", e.target.value)} placeholder="Venue" style={{ ...inputStyle, marginTop: 8 }} />
                <input id={`input-publications-${i}-year`} value={p.year} onChange={(e) => updatePublication(i, "year", e.target.value)} placeholder="Year" style={{ ...inputStyle, marginTop: 8 }} />
                <input id={`input-publications-${i}-link`} value={p.link} onChange={(e) => updatePublication(i, "link", e.target.value)} placeholder="Link (optional)" style={{ ...inputStyle, marginTop: 8 }} />
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                  <button type="button" onClick={() => removePublicationItem(i)} style={{ background: "#fff", border: "1px solid #eee", padding: "6px 8px", borderRadius: 6 }}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div style={{ ...cardStyle }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h4 style={{ margin: 0, color: "#000" }}>Skills</h4>
              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" onClick={() => removeSection("skills")} style={{ background: "#fff", border: "1px solid #f8caca", color: "#a00", padding: "6px 8px", borderRadius: 6 }}>Remove</button>
                <button type="button" onClick={addSkillCategory} style={{ background: "#000", color: "#fff", padding: "6px 10px", borderRadius: 6 }}>+ Add Category</button>
              </div>
            </div>

            {skillCategories.length === 0 && (
              <div style={{ marginTop: 10 }}>
                <div style={{ color: "#666" }}>No categories — add categories to display custom skill groups.</div>
              </div>
            )}

            {skillCategories.map((cat, ci) => (
              <div key={ci} style={{ marginTop: 12, borderTop: "1px dashed #eee", paddingTop: 10 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input id={`input-skillCategories-${ci}-title`} value={cat.title} onChange={(e) => updateSkillCategoryTitle(ci, e.target.value)} style={{ ...smallInput, flex: 1 }} placeholder="Category title (e.g. Programming languages)" />
                  <button type="button" onClick={() => removeSkillCategory(ci)} style={{ background: "#fff", border: "1px solid #eee", color: "#a00", padding: "6px 8px", borderRadius: 6 }}>Remove category</button>
                </div>

                <div style={{ marginTop: 8 }}>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {(cat.items || []).map((it, ii) => (
                      <div key={ii} style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
                        <input id={`input-skillCategories-${ci}-items-${ii}`} value={it} onChange={(e) => updateSkillItem(ci, ii, e.target.value)} style={{ padding: 8, borderRadius: 8, border: "1px solid #ddd", minWidth: 180 }} />
                        <button type="button" onClick={() => removeSkillItem(ci, ii)} style={{ background: "#fff", border: "1px solid #eee", padding: "6px 8px", borderRadius: 6 }}>Remove</button>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                    <input id={`input-skillCategories-${ci}-add`} placeholder="Add skill (single item)" style={{ ...smallInput, flex: 1 }} onKeyDown={(e) => {
                      if (e.key === "Enter") { e.preventDefault(); addSkillItem(ci, e.target.value); e.target.value = ""; }
                    }} />
                    <button type="button" onClick={() => {
                      const el = document.getElementById(`input-skillCategories-${ci}-add`);
                      if (el) { addSkillItem(ci, el.value); el.value = ""; }
                    }} style={{ background: "#000", color: "#fff", padding: "8px 12px", borderRadius: 8, border: "none" }}>+ Add</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div style={{ ...cardStyle }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h4 style={{ margin: 0, color: "#000" }}>Certifications</h4>
              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" onClick={() => removeSection("certifications")} style={{ background: "#fff", border: "1px solid #f8caca", color: "#a00", padding: "6px 8px", borderRadius: 6 }}>Remove</button>
                <button type="button" onClick={addCertification} style={{ background: "#000", color: "#fff", padding: "6px 10px", borderRadius: 6 }}>+ Add</button>
              </div>
            </div>

            {certifications.map((c, i) => (
              <div key={i} style={{ marginTop: 10 }}>
                <input id={`input-certifications-${i}-name`} value={c.name} onChange={(e) => updateCertification(i, "name", e.target.value)} placeholder="Certification name" style={inputStyle} />
                <input id={`input-certifications-${i}-link`} value={c.link} onChange={(e) => updateCertification(i, "link", e.target.value)} placeholder="Link (optional)" style={{ ...inputStyle, marginTop: 8 }} />
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                  <button type="button" onClick={() => removeCertification(i)} style={{ background: "#fff", border: "1px solid #eee", padding: "6px 8px", borderRadius: 6 }}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </form>
      </div>

      {/* PREVIEW */}
      <div style={{ width: "66%", display: "flex", flexDirection: "column", alignItems: "stretch" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: 12 }}>
          <button onClick={exportToPdf} style={{ background: "#fff", color: "#000", border: "1px solid rgba(0,0,0,0.12)", padding: "12px 20px", fontSize: 16, borderRadius: 10, boxShadow: "0 10px 30px rgba(0,0,0,0.12)", cursor: "pointer" }}>
            Download PDF
          </button>
        </div>

        <div ref={previewRef} style={{ width: `${A4_PX}px`, background: "#fff", borderRadius: 6, boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
          <PreviewComponent data={combinedData} onFieldClick={(path) => focusField(path)} a4Px={A4_PX} />
        </div>
      </div>
    </div>
  );
}
