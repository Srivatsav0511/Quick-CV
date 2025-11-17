import React, { useState, useEffect } from 'react';

function LandingPage({ onStart }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .landing-page {
          background: #fafafa;
        }

        /* Sticky Navbar */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 60px;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          z-index: 1000;
          transform: translateY(-100%);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .navbar.scrolled {
          transform: translateY(0);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-icon {
          font-size: 28px;
        }

        .logo-text {
          font-size: 24px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.5px;
        }

        .nav-button {
          background: #3b82f6;
          color: white;
          padding: 12px 28px;
          font-size: 15px;
          font-weight: 600;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.25);
        }

        .nav-button:hover {
          background: #2563eb;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.35);
        }

        /* Hero Section */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 20px;
        }

        .paper-stack {
          position: relative;
          width: 200px;
          height: 260px;
          margin-bottom: 60px;
          perspective: 1000px;
        }

        .paper-sheet {
          position: absolute;
          width: 180px;
          height: 240px;
          background: #ffffff;
          border-radius: 6px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12), 0 10px 20px rgba(0, 0, 0, 0.08);
          padding: 24px 20px;
          border: 1px solid #f1f5f9;
        }

        .paper-sheet-1 {
          top: 10px;
          left: 10px;
          z-index: 1;
          transform: rotate(-8deg);
          opacity: 0.4;
        }

        .paper-sheet-2 {
          top: 5px;
          left: 5px;
          z-index: 2;
          transform: rotate(-4deg);
          opacity: 0.6;
        }

        .paper-sheet-3 {
          top: 0;
          left: 0;
          z-index: 3;
          animation: float-gentle 4s ease-in-out infinite;
        }

        @keyframes float-gentle {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }

        .paper-header {
          width: 42px;
          height: 42px;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          border-radius: 8px;
          margin-bottom: 18px;
        }

        .paper-line {
          height: 10px;
          background: #f1f5f9;
          border-radius: 5px;
          margin-bottom: 12px;
        }

        .paper-line.medium {
          width: 80%;
        }

        .paper-line.short {
          width: 55%;
        }

        .hero-content {
          max-width: 900px;
          text-align: center;
        }

        .top-badge {
          display: inline-block;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          color: #64748b;
          padding: 6px 18px;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 32px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        h1 {
          font-size: 72px;
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 28px;
          letter-spacing: -2.5px;
          color: #0f172a;
        }

        .highlight {
          color: #3b82f6;
        }

        .subtitle {
          font-size: 20px;
          color: #64748b;
          line-height: 1.7;
          margin-bottom: 40px;
          font-weight: 400;
        }

        .cta-primary {
          background: #3b82f6;
          color: white;
          padding: 18px 44px;
          font-size: 17px;
          font-weight: 600;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);
          transition: all 0.3s ease;
        }

        .cta-primary:hover {
          background: #2563eb;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }

        /* Feature Badges - 3 per row */
        .feature-badges {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 50px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .feature-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          padding: 8px 16px;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 500;
          color: #475569;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
          white-space: nowrap;
          text-align: center;
        }

        .feature-badge:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border-color: #cbd5e1;
        }

        /* How It Works */
        .how-section {
          padding: 100px 40px;
        }

        .section-title {
          text-align: center;
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 70px;
          letter-spacing: -1.5px;
          color: #0f172a;
        }

        .steps-grid {
          display: flex;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
          max-width: 1000px;
          margin: 0 auto;
        }

        .step {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 32px 28px;
          text-align: center;
          flex: 0 0 280px;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .step:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          border-color: #cbd5e1;
        }

        .step-number {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: 800;
          margin: 0 auto 20px;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
        }

        .step-title {
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
          text-align: center;
        }

        .step-desc {
          font-size: 15px;
          color: #64748b;
          line-height: 1.5;
          text-align: center;
        }

        /* Features */
        .features-section {
          padding: 100px 40px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .feature-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          text-align: center;
          padding: 20px;
        }

        .feature-emoji {
          font-size: 48px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .feature-name {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
          text-align: center;
        }

        .feature-text {
          font-size: 14px;
          color: #64748b;
          line-height: 1.5;
          text-align: center;
        }

        /* CTA Section */
        .cta-section {
          padding: 100px 40px;
          text-align: center;
        }

        .cta-section h2 {
          font-size: 48px;
          font-weight: 900;
          color: #0f172a;
          margin-bottom: 32px;
          letter-spacing: -1.5px;
        }

        /* Footer */
        .footer {
          border-top: 1px solid #e5e7eb;
          padding: 40px;
          text-align: center;
        }

        .copyright {
          font-size: 14px;
          color: #94a3b8;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .navbar { padding: 16px 20px; }
          h1 { font-size: 48px; letter-spacing: -1.5px; }
          .section-title { font-size: 36px; }
          .paper-stack { width: 160px; height: 210px; }
          .paper-sheet { width: 140px; height: 190px; padding: 18px 16px; }
          .feature-badges { grid-template-columns: repeat(2, 1fr); }
          .steps-grid { flex-direction: column; align-items: center; }
          .step { width: 100%; max-width: 320px; }
          .features-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 480px) {
          h1 { font-size: 36px; }
          .cta-primary { padding: 14px 32px; font-size: 16px; }
          .feature-badges { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="landing-page">
        {/* Navbar */}
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
          <div className="logo">
            <div className="logo-icon">📄</div>
            <div className="logo-text">QuickCV</div>
          </div>
          <button className="nav-button" onClick={onStart}>
            Get Started →
          </button>
        </nav>

        {/* Hero */}
        <section className="hero">
          <div className="paper-stack">
            <div className="paper-sheet paper-sheet-1">
              <div className="paper-header"></div>
              <div className="paper-line"></div>
              <div className="paper-line medium"></div>
              <div className="paper-line"></div>
              <div className="paper-line short"></div>
            </div>
            <div className="paper-sheet paper-sheet-2">
              <div className="paper-header"></div>
              <div className="paper-line"></div>
              <div className="paper-line medium"></div>
              <div className="paper-line"></div>
              <div className="paper-line short"></div>
            </div>
            <div className="paper-sheet paper-sheet-3">
              <div className="paper-header"></div>
              <div className="paper-line"></div>
              <div className="paper-line medium"></div>
              <div className="paper-line"></div>
              <div className="paper-line short"></div>
              <div className="paper-line medium"></div>
            </div>
          </div>

          <div className="hero-content">
            <div className="top-badge">✨ Build Professional Resume</div>
            
            <h1>
              Build Your Perfect<br />
              Resume in <span className="highlight">Minutes</span>
            </h1>

            <p className="subtitle">
              Build professional resumes with live preview and beautiful templates.<br />
              No design skills needed. Download instantly. Always free.
            </p>

            <button className="cta-primary" onClick={onStart}>
              Start Building for Free →
            </button>

            <div className="feature-badges">
              <div className="feature-badge">⚡ Fast</div>
              <div className="feature-badge">🎨 Beautiful</div>
              <div className="feature-badge">📥 Download</div>
              <div className="feature-badge">🔒 Private</div>
              <div className="feature-badge">💰 Free</div>
              <div className="feature-badge">👁️ Live Preview</div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="how-section">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-title">Choose Template</div>
              <div className="step-desc">Pick from professional designs</div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-title">Fill Details</div>
              <div className="step-desc">Add your information</div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-title">Download PDF</div>
              <div className="step-desc">Export instantly</div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="features-section">
          <h2 className="section-title">Why QuickCV?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-emoji">⚡</div>
              <div className="feature-name">Lightning Fast</div>
              <div className="feature-text">Ready in minutes</div>
            </div>
            <div className="feature-item">
              <div className="feature-emoji">👁️</div>
              <div className="feature-name">Live Preview</div>
              <div className="feature-text">Real-time updates</div>
            </div>
            <div className="feature-item">
              <div className="feature-emoji">🎨</div>
              <div className="feature-name">Beautiful</div>
              <div className="feature-text">Professional designs</div>
            </div>
            <div className="feature-item">
              <div className="feature-emoji">📥</div>
              <div className="feature-name">Instant Download</div>
              <div className="feature-text">Download immediately</div>
            </div>
            <div className="feature-item">
              <div className="feature-emoji">🔒</div>
              <div className="feature-name">Privacy First</div>
              <div className="feature-text">Your data is safe</div>
            </div>
            <div className="feature-item">
              <div className="feature-emoji">💰</div>
              <div className="feature-name">100% Free</div>
              <div className="feature-text">Always free</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <h2>Ready to Get Started?</h2>
          <button className="cta-primary" onClick={onStart}>
            Create Your Resume Now →
          </button>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="copyright">
            © 2025 QuickCV. Made with ❤️ for job seekers
          </div>
        </footer>
      </div>
    </>
  );
}

export default LandingPage;
