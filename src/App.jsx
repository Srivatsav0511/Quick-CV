// src/App.jsx
import React, { useState } from "react";
import LandingPage from "./pages/LandingPage";
import TemplateGallery from "./pages/TemplateGallery";
import ResumeEditor from "./pages/ResumeEditor";

function App() {
  const [page, setPage] = useState("landing"); // 'landing' | 'gallery' | 'editor'
  const [selectedTemplateKey, setSelectedTemplateKey] = useState(null);

  // Centralized navigation helpers — keep them stable so you can pass directly as props
  const goToLanding = () => setPage("landing");
  const goToGallery = () => setPage("gallery");
  const goToEditor = (templateKey) => {
    setSelectedTemplateKey(templateKey);
    setPage("editor");
  };

  // Render appropriate top-level page
  if (page === "landing") {
    return <LandingPage onStart={goToGallery} />;
  }

  if (page === "gallery") {
    return (
      <TemplateGallery
        onSelect={(key) => goToEditor(key)}
        onBack={goToLanding} // when gallery back clicked, go to landing
      />
    );
  }

  if (page === "editor") {
    // If no template chosen, send user back to gallery
    if (!selectedTemplateKey) {
      // defensive fallback
      return <TemplateGallery onSelect={(k) => goToEditor(k)} onBack={goToLanding} />;
    }

    return (
      <ResumeEditor
        templateKey={selectedTemplateKey}
        onBack={goToGallery} // when editor back clicked, go to gallery
      />
    );
  }

  return null;
}

export default App;
