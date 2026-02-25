import { useState, useEffect } from "react";
import HendersonHeader from "./assets/HendersonHeader.webp";
import HendersonDeals from "./assets/HendersonsDeals.webp";

const NAV_LINKS = ["Home", "Services", "Areas", "Contact"];

const SERVICES = [
  {
    icon: "",
    title: "Residential",
    image: HendersonHeader,
    desc: "Thorough, careful cleaning tailored to your home — from deep cleans to regular maintenance schedules.",
  },
  {
    icon: "",
    title: "Commercial",
    image: HendersonDeals,
    desc: "Professional cleaning solutions for offices, retail spaces, and businesses of all sizes.",
  },
  {
    icon: "",
    title: "Airbnb & Short-Term Rentals",
    image: HendersonHeader,
    desc: "Fast turnovers, linen changes, and guest-ready presentation. We keep your ratings 5 stars.",
  },
];

const AREAS = [
  "Kingsport, TN",
  "Johnson City, TN",
  "Bristol, TN/VA",
  "Pigeon Forge, TN",
  "Gatlinburg, TN",
];

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    text: "Henderson's turned my vacation rental into a showpiece. Guests constantly rave about how spotless it is!",
    stars: 5,
  },
  {
    name: "Derek L.",
    text: "Angela and Bradley are absolute pros. My office has never looked better and the team is always on time.",
    stars: 5,
  },
  {
    name: "Patricia H.",
    text: "I've tried a dozen cleaning services. Henderson's is the only one I've ever had to re-book.",
    stars: 5,
  },
];

function StarRating({ count }) {
  return (
    <span style={{ color: "#f5c842", letterSpacing: 2 }}>
      {"★".repeat(count)}
    </span>
  );
}

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("revealed");
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useScrollReveal();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Lato:wght@300;400;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --navy: #1a2a6c;
          --navy-dark: #0f1a45;
          --navy-mid: #1e3170;
          --gold: #c9a84c;
          --gold-light: #f0d080;
          --gold-bright: #f5c842;
          --white: #f7f4ef;
          --text: #e8e0d0;
        }

        html { scroll-behavior: smooth; }

        body {
          font-family: 'Lato', sans-serif;
          background: var(--navy-dark);
          color: var(--text);
          overflow-x: hidden;
        }

        /* REVEAL ANIMATION */
        .reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.revealed {
          opacity: 1;
          transform: none;
        }

        /* NAV */
        nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 48px;
          background: rgba(15,26,69,0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(201,168,76,0.25);
        }

        .nav-logo {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: 1.2rem;
          color: var(--gold);
          letter-spacing: 1px;
          cursor: pointer;
        }
        .nav-logo span { color: var(--white); font-style: italic; }

        .nav-links {
          display: flex;
          gap: 36px;
          list-style: none;
        }
        .nav-links a {
          color: var(--text);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--gold); }

        .nav-cta {
          background: var(--gold);
          color: var(--navy-dark);
          padding: 10px 24px;
          border: none;
          font-family: 'Lato', sans-serif;
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .nav-cta:hover { background: var(--gold-light); transform: translateY(-1px); }

        .hamburger {
          display: none;
          background: none;
          border: none;
          width: 44px;
          height: 44px;
          padding: 0;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 101;
        }

        .hamburger-line {
          position: absolute;
          width: 22px;
          height: 2px;
          background: var(--gold);
          border-radius: 1px;
          transition: transform 0.25s ease, opacity 0.25s ease;
        }

        .hamburger-line:nth-child(1) { transform: translateY(-7px); }
        .hamburger-line:nth-child(2) { transform: translateY(0); }
        .hamburger-line:nth-child(3) { transform: translateY(7px); }

        .hamburger.open .hamburger-line:nth-child(1) { transform: translateY(0) rotate(45deg); }
        .hamburger.open .hamburger-line:nth-child(2) { opacity: 0; }
        .hamburger.open .hamburger-line:nth-child(3) { transform: translateY(0) rotate(-45deg); }

        @keyframes menuIn {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* HERO */
        #Home {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 120px 48px 80px;
          background: linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 60%, #2a3d8f 100%);
        }

        .hero-layout {
          position: relative;
          z-index: 1;
          width: min(1200px, 100%);
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 48px;
          align-items: center;
        }

        .hero-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(201,168,76,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.06) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .hero-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%);
          top: -100px;
          right: -100px;
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          max-width: 680px;
          animation: heroIn 1s cubic-bezier(0.22,1,0.36,1) both;
        }

        .hero-media {
          position: relative;
          border: 1px solid rgba(201,168,76,0.35);
          box-shadow: 0 24px 56px rgba(0,0,0,0.35);
          overflow: hidden;
          min-height: 520px;
        }

        .hero-media::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(15,26,69,0.08) 10%, rgba(15,26,69,0.58) 100%);
        }

        .hero-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .hero-media-badge {
          position: absolute;
          left: 20px;
          bottom: 20px;
          z-index: 2;
          background: rgba(15,26,69,0.85);
          border: 1px solid rgba(201,168,76,0.35);
          color: var(--gold-light);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 10px 14px;
        }

        @keyframes heroIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: none; }
        }

        .hero-badge {
          display: inline-block;
          border: 1px solid var(--gold);
          color: var(--gold);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          padding: 6px 16px;
          margin-bottom: 24px;
          animation: heroIn 1s 0.1s cubic-bezier(0.22,1,0.36,1) both;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 6vw, 5.5rem);
          font-weight: 900;
          line-height: 1.05;
          color: var(--white);
          margin-bottom: 16px;
          animation: heroIn 1s 0.2s cubic-bezier(0.22,1,0.36,1) both;
        }

        .hero-title em {
          color: var(--gold);
          font-style: italic;
        }

        .hero-sub {
          font-size: 1.1rem;
          font-weight: 300;
          color: rgba(232,224,208,0.8);
          line-height: 1.7;
          margin-bottom: 40px;
          animation: heroIn 1s 0.3s cubic-bezier(0.22,1,0.36,1) both;
          max-width: 520px;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          animation: heroIn 1s 0.4s cubic-bezier(0.22,1,0.36,1) both;
        }

        .btn-primary {
          background: var(--gold);
          color: var(--navy-dark);
          padding: 16px 36px;
          border: none;
          font-family: 'Lato', sans-serif;
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-primary:hover { background: var(--gold-light); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(201,168,76,0.35); }

        .btn-outline {
          background: transparent;
          color: var(--gold);
          padding: 16px 36px;
          border: 1px solid var(--gold);
          font-family: 'Lato', sans-serif;
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-outline:hover { background: rgba(201,168,76,0.1); transform: translateY(-2px); }

        .hero-stat-row {
          display: flex;
          gap: 40px;
          margin-top: 64px;
          padding-top: 40px;
          border-top: 1px solid rgba(201,168,76,0.2);
          animation: heroIn 1s 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }

        .stat { text-align: center; }
        .stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem;
          font-weight: 900;
          color: var(--gold);
        }
        .stat-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(232,224,208,0.6);
          margin-top: 4px;
        }

        /* SECTIONS */
        section {
          padding: 100px 48px;
        }

        .section-inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        .section-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 12px;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 900;
          color: var(--white);
          line-height: 1.1;
          margin-bottom: 20px;
        }

        .section-title em { color: var(--gold); font-style: italic; }

        .section-divider {
          width: 60px;
          height: 2px;
          background: var(--gold);
          margin-bottom: 48px;
        }

        /* SERVICES */
        #Services {
          background: var(--navy);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .service-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(201,168,76,0.2);
          padding: 0;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }

        .service-image {
          width: 100%;
          height: 190px;
          object-fit: cover;
          display: block;
          border-bottom: 1px solid rgba(201,168,76,0.2);
          opacity: 0.9;
        }

        .service-content {
          padding: 28px 28px 32px;
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          transform: scaleX(0);
          transition: transform 0.4s;
        }

        .service-card:hover {
          background: rgba(201,168,76,0.06);
          border-color: rgba(201,168,76,0.5);
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.3);
        }

        .service-card:hover::before { transform: scaleX(1); }

        .service-icon {
          font-size: 2.4rem;
          margin-bottom: 16px;
          display: block;
        }

        .service-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--gold);
          margin-bottom: 12px;
        }

        .service-desc {
          font-size: 0.95rem;
          font-weight: 300;
          color: rgba(232,224,208,0.75);
          line-height: 1.8;
        }

        .deals-section {
          background: var(--navy-dark);
          padding: 100px 48px;
        }

        .deals-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 36px;
          align-items: center;
        }

        .deals-image-wrap {
          border: 1px solid rgba(201,168,76,0.3);
          overflow: hidden;
          box-shadow: 0 20px 44px rgba(0,0,0,0.3);
        }

        .deals-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .deals-copy {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,168,76,0.2);
          padding: 36px;
        }

        .deals-copy p {
          font-size: 1rem;
          font-weight: 300;
          color: rgba(232,224,208,0.82);
          line-height: 1.8;
          margin-bottom: 20px;
        }

        /* AREAS */
        #Areas {
          background: var(--navy-dark);
        }

        .areas-flex {
          display: flex;
          gap: 48px;
          align-items: flex-start;
          flex-wrap: wrap;
        }

        .areas-left { flex: 1; min-width: 280px; }
        .areas-right { flex: 1; min-width: 280px; }

        .area-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 0;
          border-bottom: 1px solid rgba(201,168,76,0.12);
          font-size: 1.05rem;
          font-weight: 300;
          color: var(--text);
          transition: color 0.2s;
        }
        .area-item:hover { color: var(--gold); }
        .area-item::before {
          content: '◆';
          color: var(--gold);
          font-size: 0.6rem;
          flex-shrink: 0;
        }

        .contact-card {
          background: linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%);
          border: 1px solid rgba(201,168,76,0.3);
          padding: 40px;
        }

        .contact-card h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          color: var(--gold);
          margin-bottom: 24px;
        }

        .contact-person {
          margin-bottom: 20px;
        }
        .contact-person-name {
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(232,224,208,0.6);
          margin-bottom: 4px;
        }
        .contact-person-phone {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          color: var(--white);
          text-decoration: none;
          transition: color 0.2s;
        }
        .contact-person-phone:hover { color: var(--gold); }

        /* TESTIMONIALS */
        .testimonials-section {
          background: var(--navy);
          padding: 100px 48px;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .testimonial-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(201,168,76,0.15);
          padding: 32px;
          position: relative;
        }

        .testimonial-card::before {
          content: '"';
          position: absolute;
          top: 16px; left: 24px;
          font-family: 'Playfair Display', serif;
          font-size: 5rem;
          color: rgba(201,168,76,0.12);
          line-height: 1;
          pointer-events: none;
        }

        .testimonial-text {
          font-size: 0.95rem;
          font-weight: 300;
          color: rgba(232,224,208,0.85);
          line-height: 1.8;
          margin-bottom: 20px;
          position: relative;
        }

        .testimonial-author {
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--gold);
        }

        /* CONTACT FORM */
        #Contact {
          background: var(--navy-dark);
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }

        .form-intro p {
          font-size: 1rem;
          font-weight: 300;
          color: rgba(232,224,208,0.75);
          line-height: 1.8;
          margin-bottom: 32px;
        }

        .contact-visual {
          border: 1px solid rgba(201,168,76,0.3);
          overflow: hidden;
          margin-bottom: 24px;
        }

        .contact-visual img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          display: block;
        }

        .tagline-block {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          font-style: italic;
          color: var(--gold);
          border-left: 3px solid var(--gold);
          padding-left: 20px;
          margin-top: 32px;
        }

        .form-field {
          margin-bottom: 20px;
        }

        .form-field label {
          display: block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 8px;
        }

        .form-field input,
        .form-field textarea {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(201,168,76,0.25);
          padding: 14px 18px;
          color: var(--white);
          font-family: 'Lato', sans-serif;
          font-size: 0.95rem;
          transition: border-color 0.2s;
          outline: none;
        }

        .form-field input:focus,
        .form-field textarea:focus {
          border-color: var(--gold);
        }

        .form-field textarea { resize: vertical; min-height: 120px; }

        .submit-success {
          background: rgba(201,168,76,0.1);
          border: 1px solid var(--gold);
          padding: 20px 24px;
          color: var(--gold);
          font-weight: 700;
          letter-spacing: 1px;
        }

        /* FOOTER */
        footer {
          background: var(--navy-dark);
          border-top: 1px solid rgba(201,168,76,0.2);
          padding: 40px 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: gap;
          gap: 16px;
        }

        .footer-logo {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          color: var(--gold);
          font-size: 1rem;
        }

        .footer-text {
          font-size: 0.8rem;
          color: rgba(232,224,208,0.4);
        }

        /* MOBILE */
        @media (max-width: 1024px) {
          nav { padding: 14px 28px; }
          .hero-layout { grid-template-columns: 1fr; gap: 36px; }
          .hero-media { min-height: 380px; max-width: 620px; justify-self: center; width: 100%; }
          .hero-content { max-width: 100%; }
          .hero-stat-row { margin-top: 40px; padding-top: 28px; }
          .deals-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 768px) {
          nav { padding: 12px 20px; }
          .nav-logo { font-size: 1rem; max-width: 72%; line-height: 1.2; }
          .nav-links { display: none; }
          .nav-cta { display: none; }
          .hamburger { display: flex; }
          .mobile-menu {
            position: fixed;
            top: 68px; left: 0; right: 0;
            background: var(--navy-dark);
            border-bottom: 1px solid rgba(201,168,76,0.2);
            padding: 20px;
            z-index: 99;
            display: flex;
            flex-direction: column;
            gap: 18px;
            animation: menuIn 0.25s ease both;
          }
          .mobile-menu a {
            color: var(--text);
            text-decoration: none;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            font-size: 0.82rem;
            padding: 4px 0;
          }
          #Home { padding: 100px 24px 60px; }
          .hero-layout { grid-template-columns: 1fr; gap: 32px; }
          .hero-title { font-size: clamp(2.15rem, 11vw, 3.2rem); }
          .hero-sub { font-size: 1rem; margin-bottom: 28px; }
          .hero-actions { width: 100%; flex-direction: column; }
          .btn-primary, .btn-outline { width: 100%; padding: 14px 18px; font-size: 0.78rem; }
          .hero-media { min-height: 280px; }
          .hero-media-badge { left: 12px; bottom: 12px; padding: 8px 10px; letter-spacing: 1.5px; }
          .hero-stat-row { gap: 14px; justify-content: space-between; }
          .stat-num { font-size: 1.6rem; }
          .stat-label { font-size: 0.62rem; letter-spacing: 1.4px; }
          section { padding: 70px 24px; }
          .deals-section { padding: 70px 24px; }
          .deals-grid { grid-template-columns: 1fr; }
          .deals-copy { padding: 26px; }
          .deals-copy p { font-size: 0.95rem; margin-bottom: 16px; }
          .testimonials-section { padding: 70px 24px; }
          .testimonials-grid, .services-grid { grid-template-columns: 1fr; }
          .service-image { height: 180px; }
          .service-content { padding: 24px 22px 26px; }
          .testimonial-card { padding: 26px 22px; }
          .form-grid { grid-template-columns: 1fr; }
          .contact-card { padding: 26px 22px; }
          .contact-person-phone { font-size: 1.25rem; }
          .contact-visual img { height: 180px; }
          footer { padding: 32px 24px; flex-direction: column; text-align: center; }
        }

        @media (max-width: 480px) {
          nav { padding: 10px 14px; }
          .mobile-menu { top: 62px; padding: 16px 14px 18px; }
          #Home { padding: 90px 14px 44px; }
          section, .deals-section, .testimonials-section { padding: 56px 14px; }
          .hero-media { min-height: 230px; }
          .hero-stat-row { gap: 10px; }
          .stat-num { font-size: 1.35rem; }
          .section-divider { margin-bottom: 34px; }
          .deals-copy, .contact-card { padding: 20px 16px; }
          .footer-text { font-size: 0.72rem; }
        }
      `}</style>

      {/* NAV */}
      <nav>
        <div className="nav-logo" onClick={() => scrollTo("Home")}>
          Henderson's <span>Heavenly Cleaning</span>
        </div>
        <ul className="nav-links">
          {NAV_LINKS.map((n) => (
            <li key={n}>
              <a href={`#${n}`} onClick={(e) => { e.preventDefault(); scrollTo(n); }}>{n}</a>
            </li>
          ))}
        </ul>
        <button className="nav-cta" onClick={() => scrollTo("Contact")}>Get a Quote</button>
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          {NAV_LINKS.map((n) => (
            <a key={n} href={`#${n}`} onClick={(e) => { e.preventDefault(); scrollTo(n); }}>{n}</a>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="Home">
        <div className="hero-bg-grid" />
        <div className="hero-glow" />
        <div className="hero-layout">
          <div className="hero-content">
            <div className="hero-badge">TN & VA · Serving the Tri-Cities & Smokies</div>
            <h1 className="hero-title">
              Heavenly Clean.<br /><em>Every Time.</em>
            </h1>
            <p className="hero-sub">
              Airbnb turnovers, residential deep cleans, and commercial maintenance done right — by a family team that treats your space like their own.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => scrollTo("Contact")}>Call for a Quote</button>
              <button className="btn-outline" onClick={() => scrollTo("Services")}>Our Services</button>
            </div>
            <div className="hero-stat-row">
              <div className="stat">
                <div className="stat-num">5★</div>
                <div className="stat-label">Rated</div>
              </div>
              <div className="stat">
                <div className="stat-num">TN+VA</div>
                <div className="stat-label">Coverage</div>
              </div>
              <div className="stat">
                <div className="stat-num">100%</div>
                <div className="stat-label">Satisfaction</div>
              </div>
            </div>
          </div>
          <div className="hero-media reveal">
            <img src={HendersonHeader} alt="Henderson's Heavenly Cleaning team" />
            <div className="hero-media-badge">Family Owned • Detail Driven</div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="Services">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-label">What We Do</div>
            <h2 className="section-title">Our <em>Services</em></h2>
            <div className="section-divider" />
          </div>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <div className="service-card reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <img className="service-image" src={s.image} alt={`${s.title} cleaning service`} />
                <div className="service-content">
                  <span className="service-icon">{s.icon}</span>
                  <div className="service-title">{s.title}</div>
                  <div className="service-desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEALS */}
      <section className="deals-section">
        <div className="section-inner">
          <div className="deals-grid reveal">
            <div className="deals-image-wrap">
              <img src={HendersonDeals} alt="Current Henderson's Heavenly Cleaning deals" />
            </div>
            <div className="deals-copy">
              <div className="section-label">Current Promotions</div>
              <h2 className="section-title">Featured <em>Deals</em></h2>
              <p>
                Ask about seasonal specials, recurring clean discounts, and Airbnb turnover packages. We keep pricing simple and transparent so you always know what to expect.
              </p>
              <button className="btn-primary" onClick={() => scrollTo("Contact")}>Claim Your Deal</button>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <div className="testimonials-section">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-label">Client Love</div>
            <h2 className="section-title">What People <em>Say</em></h2>
            <div className="section-divider" />
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div className="testimonial-card reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <p className="testimonial-text">{t.text}</p>
                <div style={{ marginBottom: 8 }}><StarRating count={t.stars} /></div>
                <div className="testimonial-author">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AREAS */}
      <section id="Areas">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-label">Where We Work</div>
            <h2 className="section-title">Service <em>Areas</em></h2>
            <div className="section-divider" />
          </div>
          <div className="areas-flex">
            <div className="areas-left reveal">
              {AREAS.map((a) => (
                <div className="area-item" key={a}>{a}</div>
              ))}
            </div>
            <div className="areas-right reveal">
              <div className="contact-card">
                <h3>Reach Us Directly</h3>
                <div className="contact-person">
                  <div className="contact-person-name">Angela Henderson</div>
                  <a className="contact-person-phone" href="tel:4232768455">(423) 276-8455</a>
                </div>
                <div style={{ width: '100%', height: 1, background: 'rgba(201,168,76,0.2)', margin: '20px 0' }} />
                <div className="contact-person">
                  <div className="contact-person-name">Bradley Henderson</div>
                  <a className="contact-person-phone" href="tel:4232922511">(423) 292-2511</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="Contact">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-label">Get in Touch</div>
            <h2 className="section-title">Request a <em>Quote</em></h2>
            <div className="section-divider" />
          </div>
          <div className="form-grid">
            <div className="form-intro reveal">
              <p>
                Ready for a home or space that truly shines? Give us a call and we’ll put together a quote tailored to your needs. We serve residential homes, commercial properties, and short-term rentals across the Tri-Cities and Smoky Mountains.
              </p>
              <div className="tagline-block">
                Impeccable Standards. Elevated Living.
              </div>
            </div>
            <div className="reveal">
              <div className="contact-visual">
                <img src={HendersonHeader} alt="Henderson's Heavenly Cleaning service preview" />
              </div>
              <div className="contact-card" style={{ width: '100%', maxWidth: 'unset' }}>
                <h3>Call or Text to Request a Quote</h3>
                <div className="contact-person">
                  <div className="contact-person-name">Angela Henderson</div>
                  <a className="contact-person-phone" href="tel:4232768455">(423) 276-8455</a>
                </div>
                <div style={{ width: '100%', height: 1, background: 'rgba(201,168,76,0.2)', margin: '20px 0' }} />
                <div className="contact-person">
                  <div className="contact-person-name">Bradley Henderson</div>
                  <a className="contact-person-phone" href="tel:4232922511">(423) 292-2511</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">Henderson's Heavenly Cleaning</div>
        <div className="footer-text">TN & VA · Kingsport · Johnson City · Bristol · Pigeon Forge · Gatlinburg</div>
        <div className="footer-text">© 2026 Henderson's Heavenly Cleaning</div>
      </footer>
    </>
  );
}