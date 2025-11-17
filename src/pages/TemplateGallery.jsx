// TemplateGallery.jsx with ALL styling moved to the bottom inside <style> (NO CHANGES TO LOGIC)
// You can now safely delete your external CSS.

import React, { useState } from "react";

const templates = [
  {
    id: "minimal",
    name: "Minimal",
    thumbnailUrl: "/Templates/minimalTemplate.png",
    caption: "Ultra-clean resume with clear section dividers for maximum readability",
    tags: ["Minimalist", "Organized", "Professional"],
  },
  {
    id: "classic",
    name: "Classic",
    thumbnailUrl: "/Templates/ClassicTemplate.png",
    caption: "Content-forward layout - great for academia & research",
    tags: ["Classic", "Readable", "Academic"],
  },
];

export default function TemplateGallery({ onSelect = () => {}, onBack }) {
  const [selectedId, setSelectedId] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  function handleSelect(id) {
    setSelectedId(id);
    onSelect(id);
  }

  return (
    <div className="tg-root">

      {/* BUTTON */}
      <button
        className="tg-back-btn"
        onClick={() => (onBack ? onBack() : window.history.back())}
      >
        ← Back
      </button>

      {/* HEADER */}
      <div className="tg-header">
        <h1 className="tg-title">Choose your template</h1>
        <p className="tg-sub">Select a professionally designed resume layout.</p>
      </div>

      {/* TEMPLATE GRID */}
      <div className="tg-grid">
        {templates.map((t) => (
          <div key={t.id}>
            <div className="tg-card" onClick={() => setPreviewImg(t.thumbnailUrl)}>
              <div className="tg-image-wrap">
                <img src={t.thumbnailUrl} className="tg-image" alt={t.name} />
              </div>

              <div className="tg-meta">
                <div className="tg-caption">{t.caption}</div>

                <div className="tg-tags">
                  {t.tags.map((tag, i) => (
                    <span key={i} className="tg-tag">{tag}</span>
                  ))}
                </div>

                <div className="tg-actions">
                  <button
                    className="tg-btn use"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(t.id);
                    }}
                  >
                    Use Template
                  </button>

                  <button
                    className="tg-btn preview"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewImg(t.thumbnailUrl);
                    }}
                  >
                    Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL PREVIEW */}
      {previewImg && (
        <div className="tg-preview-modal" onClick={() => setPreviewImg(null)}>
          <div className="tg-preview-box" onClick={(e) => e.stopPropagation()}>
            <img src={previewImg} className="tg-preview-image" alt="Preview" />
            <div className="tg-preview-close" onClick={() => setPreviewImg(null)}>
              Close
            </div>
          </div>
        </div>
      )}

      {/* ALL STYLES MOVED HERE AT BOTTOM */}
      <style>{`

       
        .tg-root { padding: 28px; max-width: 1200px; margin: 0 auto; font-family: Inter, system-ui; color:#111; position:relative; }
        .tg-back-btn { position:fixed; top:24px; left:24px; padding:10px 16px; font-size:15px; background:#fff; border-radius:10px; border:1px solid #ddd; cursor:pointer; box-shadow:0 8px 24px rgba(0,0,0,0.12); z-index:5000; display:flex; align-items:center; gap:6px; font-weight:600; transition:.2s; }
        .tg-back-btn:hover { transform:translateY(-3px); box-shadow:0 12px 30px rgba(0,0,0,0.18); }
        .tg-header { margin-bottom:20px; }
        .tg-title { font-size:30px; margin:0; letter-spacing:-0.3px; }
        .tg-sub { margin-top:8px; color:#555; font-size:14px; }
        .tg-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(280px,1fr)); gap:20px; margin-top:14px; }
        .tg-card { background:#fff; border-radius:12px; border:1px solid #ececec; overflow:hidden; display:flex; flex-direction:column; cursor:pointer; min-height:0; box-shadow:0 6px 18px rgba(20,20,20,0.04); transition:.18s; }
        .tg-card:hover { transform:translateY(-5px); box-shadow:0 18px 40px rgba(15,15,15,0.08); }
        .tg-image-wrap { display:flex; justify-content:center; align-items:center; background:#fafafa; border-bottom:1px solid #eee; padding:18px; }
        .tg-image { max-width:100%; max-height:360px; border-radius:6px; box-shadow:0 4px 18px rgba(0,0,0,0.05); user-select:none; }
        .tg-meta { padding:16px; }
        .tg-caption { color:#222; font-size:14px; line-height:1.45; min-height:44px; }
        .tg-tags { margin-top:10px; display:flex; gap:8px; flex-wrap:wrap; }
        .tg-tag { font-size:12px; background:rgba(11,84,200,0.08); color:#0b54c8; padding:6px 10px; border-radius:999px; }
        .tg-actions { display:flex; justify-content:flex-end; margin-top:14px; gap:10px; }
        .tg-btn { border:none; padding:8px 12px; border-radius:8px; cursor:pointer; font-weight:600; font-size:13px; }
        .tg-btn.use { background:#0b54c8; color:#fff; box-shadow:0 8px 20px rgba(11,84,200,0.15); }
        .tg-btn.preview { background:#fff; color:#0b54c8; border:1px solid rgba(11,84,200,0.18); }
        .tg-preview-modal { position:fixed; inset:0; background:rgba(0,0,0,0.55); display:flex; justify-content:center; align-items:center; z-index:6000; }
        .tg-preview-box { background:#fff; padding:20px; border-radius:12px; max-width:90vw; max-height:90vh; display:flex; flex-direction:column; box-shadow:0 15px 40px rgba(0,0,0,0.25); }
        .tg-preview-image { max-width:100%; max-height:82vh; border-radius:8px; }
        .tg-preview-close { margin-top:12px; align-self:flex-end; cursor:pointer; background:#f3f3f3; padding:6px 12px; border-radius:8px; font-weight:600; }

       
        .template-gallery-list-page { max-width:1100px; margin:0 auto; padding:40px 0; }
        .template-title { font-size:2rem; font-weight:800; margin-bottom:10px; text-align:left; }
        .template-text { font-size:small; font-weight:500; margin-bottom:32px; text-align:left; }
        .template-list-visual { display:flex; flex-wrap:wrap; gap:46px; justify-content:center; }
        .template-card-visual { background:#fff; border-radius:24px; box-shadow:0 8px 32px rgba(30,34,40,0.10); padding:32px 24px 20px; max-width:430px; cursor:pointer; display:flex; flex-direction:column; align-items:center; transition:.2s; border:1.5px solid #f2f3f5; }
        .template-card-visual:hover { box-shadow:0 16px 40px rgba(79,70,229,0.14); transform:translateY(-4px) scale(1.018); border:1.5px solid #e0e7ef; }
        .template-card-image-wrapper { background:#f4f5f7; border-radius:18px; padding:12px 10px 14px; width:100%; display:flex; justify-content:center; align-items:center; }
        .template-card-image { width:100%; max-width:355px; border-radius:12px; object-fit:contain; user-select:none; pointer-events:none; max-height:350px; }
        .template-card-details { margin-top:22px; width:100%; }
        .template-card-title { font-size:1.5em; font-weight:800; margin-bottom:6px; letter-spacing:-1px; }
        .template-card-caption { color:#38415b; font-size:1.08em; margin-bottom:17px; }
        .template-card-tags { display:flex; flex-wrap:wrap; gap:10px; }
        .template-tag { font-size:.96em; color:#8187a6; background:#f4f6f8; padding:7px 17px; border-radius:8px; font-weight:500; margin-right:6px; margin-top:6px; }
        @media(max-width:800px){
          .template-card-visual{ max-width:98vw; padding:22px 6px 14px; }
          .template-card-image{ max-width:90vw; max-height:220px; border-radius:8px; }
          .template-title{ font-size:1.3rem; margin-bottom:18px; }
        }

      `}</style>
    </div>
  );
}
