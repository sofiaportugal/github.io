import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { ArrowUpRight, ArrowLeft, ArrowDown, Mail, Linkedin, Github, Dribbble, Download, Menu, X, MapPin, Clock, Users, ChevronRight, ExternalLink, Sparkles } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   FONTS
   ───────────────────────────────────────────────────────────── */
const Fonts = () => (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap');`}</style>
);

/* ─────────────────────────────────────────────────────────────
   GLOBAL STYLES + DESIGN TOKENS
   ───────────────────────────────────────────────────────────── */
const Styles = () => (
  <style>{`
    :root {
      --bg: #FDFCF9;
      --bg-warm: #F7F5F0;
      --bg-card: #FFFFFF;
      --bg-dark: #1C1B18;
      --border: #EAE7E0;
      --border-hover: #D4D0C8;
      --text: #1C1B18;
      --text-2: #5C5850;
      --text-3: #9A958B;
      --accent: #8B7355;
      --accent-light: #BCA88A;
      --highlight: #F0E8DA;
      --serif: 'Instrument Serif', Georgia, serif;
      --sans: 'Plus Jakarta Sans', system-ui, sans-serif;
      --spring: cubic-bezier(0.34, 1.56, 0.64, 1);
      --smooth: cubic-bezier(0.16, 1, 0.3, 1);
      --ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
    html { scroll-behavior: smooth; }
    body { font-family: var(--sans); background: var(--bg); color: var(--text); -webkit-font-smoothing: antialiased; }
    ::selection { background: var(--highlight); color: var(--text); }

    @keyframes enterUp {
      from { opacity:0; transform: translateY(32px); }
      to { opacity:1; transform: translateY(0); }
    }
    @keyframes enterFade {
      from { opacity:0; }
      to { opacity:1; }
    }
    @keyframes enterScale {
      from { opacity:0; transform: scale(0.95); }
      to { opacity:1; transform: scale(1); }
    }
    @keyframes float {
      0%,100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }
    @keyframes pulse-dot {
      0%,100% { opacity:0.4; transform:scale(1); }
      50% { opacity:0.9; transform:scale(1.3); }
    }

    .reveal {
      opacity: 0;
      transform: translateY(32px);
      transition: opacity 0.9s var(--smooth), transform 0.9s var(--smooth);
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .link-line {
      position: relative;
      text-decoration: none;
    }
    .link-line::after {
      content: '';
      position: absolute;
      bottom: -2px; left: 0;
      width: 0; height: 1px;
      background: currentColor;
      transition: width 0.5s var(--smooth);
    }
    .link-line:hover::after { width: 100%; }

    .pcard {
      transition: transform 0.55s var(--spring), box-shadow 0.5s var(--smooth);
      will-change: transform;
    }
    .pcard:hover {
      transform: translateY(-10px) scale(1.005);
      box-shadow: 0 24px 64px -12px rgba(28,27,24,0.10), 0 8px 24px -8px rgba(28,27,24,0.06);
    }
    .pcard:active {
      transform: translateY(-4px) scale(1.0);
      transition-duration: 0.15s;
      transition-timing-function: ease;
    }
    .pcard .pcard-img {
      transition: transform 0.8s var(--smooth);
    }
    .pcard:hover .pcard-img {
      transform: scale(1.06);
    }
    .pcard .pcard-arrow {
      transition: transform 0.45s var(--spring), opacity 0.35s ease;
      opacity: 0;
      transform: translateX(-8px) translateY(4px);
    }
    .pcard:hover .pcard-arrow {
      opacity: 1;
      transform: translateX(0) translateY(0);
    }
    .pcard .pcard-tag {
      transition: background 0.3s ease, color 0.3s ease;
    }
    .pcard:hover .pcard-tag {
      background: var(--text);
      color: var(--bg);
    }

    .cta-btn {
      transition: background 0.3s ease, transform 0.4s var(--spring), box-shadow 0.3s ease;
    }
    .cta-btn:hover {
      background: #2E2D2A !important;
      transform: translateY(-2px);
      box-shadow: 0 8px 28px -4px rgba(28,27,24,0.18);
    }
    .cta-btn:active { transform: translateY(0); transition-duration:0.1s; }

    .sec-btn {
      transition: border-color 0.3s ease, color 0.3s ease, transform 0.4s var(--spring);
    }
    .sec-btn:hover {
      border-color: var(--text) !important;
      color: var(--text) !important;
      transform: translateY(-1px);
    }

    .exp-row {
      transition: background 0.4s ease, padding-left 0.4s var(--smooth), padding-right 0.4s var(--smooth);
    }
    .exp-row:hover {
      background: var(--bg-card);
      padding-left: 20px !important;
      padding-right: 20px !important;
    }

    .xcard {
      transition: transform 0.5s var(--spring), border-color 0.3s ease;
    }
    .xcard:hover {
      transform: translateY(-6px) scale(1.01);
      border-color: var(--border-hover) !important;
    }

    .metric-pop {
      transition: transform 0.5s var(--spring), border-color 0.3s ease;
    }
    .metric-pop:hover {
      transform: translateY(-4px);
      border-color: var(--accent) !important;
    }

    .grain {
      position: fixed; inset: 0; z-index: 9999; pointer-events: none;
      opacity: 0.022;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
      background-repeat: repeat;
      background-size: 180px;
    }

    .nav-blur {
      backdrop-filter: blur(16px) saturate(1.5);
      -webkit-backdrop-filter: blur(16px) saturate(1.5);
    }

    .mob-overlay {
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
    }

    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }

    .cs-enter { animation: enterScale 0.65s var(--smooth) forwards; }

    :focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 3px;
      border-radius: 4px;
    }
  `}</style>
);

/* ─────────────────────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: "meridian",
    title: "Meridian",
    tagline: "Making enterprise analytics feel human",
    desc: "Redesigned a B2B analytics platform from the ground up—turning weeks of onboarding into minutes and bringing clarity to complex data workflows.",
    role: "Lead Product Designer",
    year: "2025",
    team: "2 designers · 4 engineers · 1 PM",
    timeline: "8 months",
    tags: ["Enterprise", "Analytics"],
    gradient: "linear-gradient(145deg, #C8BFAE 0%, #A09580 45%, #7A6E58 100%)",
    accent: "#A09580",
    mockupType: "dashboard",
    hasCaseStudy: true,
  },
  {
    id: "canvas",
    title: "Canvas",
    tagline: "Where teams think together",
    desc: "Built a real-time collaborative whiteboard that bridges the messy gap between brainstorming and building—designed for distributed design teams.",
    role: "Senior Product Designer",
    year: "2024",
    team: "3 designers · 6 engineers",
    timeline: "6 months",
    tags: ["Collaboration", "SaaS"],
    gradient: "linear-gradient(145deg, #AAB8C4 0%, #8A9DAD 45%, #6A7D8B 100%)",
    accent: "#8A9DAD",
    mockupType: "whiteboard",
    hasCaseStudy: false,
  },
  {
    id: "nourish",
    title: "Nourish",
    tagline: "Healthy habits without the guilt",
    desc: "A consumer health app using behavioral science to help people build sustainable eating habits—no calorie counting, no shame, just clarity.",
    role: "Product Designer",
    year: "2024",
    team: "1 designer · 3 engineers · 1 nutritionist",
    timeline: "5 months",
    tags: ["Consumer", "Mobile"],
    gradient: "linear-gradient(145deg, #B5C4A0 0%, #96AA78 45%, #788B60 100%)",
    accent: "#96AA78",
    mockupType: "mobile",
    hasCaseStudy: false,
  },
  {
    id: "ledger",
    title: "Ledger",
    tagline: "Financial peace of mind for creators",
    desc: "Designed a financial platform for independent creators—invoicing, taxes, cash flow—all in one place that doesn't require an accounting degree.",
    role: "Product Designer",
    year: "2023",
    team: "2 designers · 5 engineers · 1 PM",
    timeline: "7 months",
    tags: ["Fintech", "Creator Economy"],
    gradient: "linear-gradient(145deg, #C4AAB8 0%, #AA8899 45%, #8B6878 100%)",
    accent: "#AA8899",
    mockupType: "finance",
    hasCaseStudy: false,
  },
];

const CASE_STUDY_DATA = {
  overview: "Meridian had the engine—powerful analytics that Fortune 500 companies relied on—but the dashboard felt like it was designed for the engineers who built it, not the analysts who used it. I led the full redesign over eight months, and the result was a product that finally felt like it understood the people on the other side of the screen.",
  problem: {
    content: "Here's the thing about enterprise analytics: the tools are often as complex as the data they're meant to simplify. Meridian's interface required two to three weeks of training before someone could run a basic query. New analysts were abandoning the platform within days—not because the data wasn't there, but because the interface stood between them and the answers they needed.",
    stat: "$2.4M",
    statLabel: "estimated annual cost of user churn",
    quote: "I just want to ask a question and get an answer. Why does it feel like I need a PhD to do my job?",
    quoteAuthor: "Senior Data Analyst",
    quoteCompany: "Fortune 100 retail company",
  },
  research: {
    content: "We went deep. Forty user interviews across twelve enterprise accounts. Contextual inquiry sessions where we watched people struggle in real time. A comprehensive audit of every competitor worth studying. What emerged wasn't a list of feature requests—it was a fundamental misunderstanding of how analysts actually think.",
    insights: [
      { num: "01", title: "People think in questions", detail: "Analysts don't think in SQL. They think in questions. The interface needed to bridge natural language to structured queries without losing precision." },
      { num: "02", title: "Expertise is a spectrum", detail: "80% of daily tasks used 20% of features. Power users needed depth, but the default experience was drowning everyone else." },
      { num: "03", title: "Insights die in transit", detail: "Discoveries were shared verbally or in screenshots, losing all context. The platform needed native storytelling—not just charts, but narratives." },
    ],
  },
  solution: {
    content: "We designed a three-layer architecture: an AI-assisted natural language bar for quick answers, a visual query builder for intermediate users, and the full SQL editor for power users. Each layer shared the same data model, so switching between them felt like adjusting a zoom level—not learning a new tool.",
    features: [
      { title: "Natural language queries", detail: "Ask questions in plain English. Smart suggestions help refine intent without requiring syntax knowledge." },
      { title: "Visual pipeline builder", detail: "Drag-and-drop data transformations with real-time preview. Complex joins feel like connecting puzzle pieces." },
      { title: "Collaborative dashboards", detail: "Inline comments, version history, and shared annotations. Insights travel with their context." },
      { title: "Adaptive help system", detail: "Contextual guidance that learns what you know and surfaces what you need—never patronizing, always useful." },
    ],
  },
  outcomes: {
    metrics: [
      { value: "60%", label: "faster onboarding", detail: "From 3 weeks to 5 days average" },
      { value: "3.2×", label: "more daily queries", detail: "Users exploring data more freely" },
      { value: "94%", label: "satisfaction score", detail: "Up from 61% pre-redesign" },
      { value: "$1.8M", label: "churn reduction", detail: "Annual revenue recovered" },
    ],
    reflection: "This project taught me something I keep coming back to: enterprise software doesn't have to feel enterprise. When you respect people's time and intelligence—when you design for the analyst at 4pm on a Friday who just needs one number—even the most complex tools can feel like they're on your side.",
  },
};

const EXPERIENCE = [
  { co: "Meridian Labs", role: "Lead Product Designer", when: "2024 – Present", what: "Leading the core analytics redesign. Built the design system from scratch, mentored two junior designers, and drove the product vision through executive buy-in." },
  { co: "Flux Studio", role: "Senior Product Designer", when: "2022 – 2024", what: "Designed collaborative tools for distributed teams. Shipped three major launches and led the effort to create a unified design language across products." },
  { co: "Greenline Health", role: "Product Designer", when: "2020 – 2022", what: "Created consumer health experiences for 500K+ users. The mobile redesign I led doubled daily engagement within the first quarter." },
  { co: "Freelance", role: "Independent Designer", when: "2018 – 2020", what: "Worked with startups and agencies on branding, product design, and early-stage product strategy across fintech, health, and education." },
];

const EXPERIMENTS = [
  { title: "Type & Motion", desc: "Generative typography experiments with variable fonts and kinetic layouts.", color: "#E8E2D6", emoji: "✦" },
  { title: "Spatial UI", desc: "Prototyping interaction patterns for spatial computing and mixed reality.", color: "#D6E2E8", emoji: "◐" },
  { title: "tokens-cli", desc: "Open-source CLI for managing and syncing design tokens across codebases.", color: "#E2E8D6", emoji: "⌘" },
  { title: "Analog Process", desc: "A photo essay on sketching, paper prototyping, and thinking with your hands.", color: "#E8D6E2", emoji: "∿" },
];

/* ─────────────────────────────────────────────────────────────
   HOOKS
   ───────────────────────────────────────────────────────────── */
function useInView(opts = {}) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px", ...opts });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let ticking = false;
    const h = () => { if (!ticking) { requestAnimationFrame(() => { setY(window.scrollY); ticking = false; }); ticking = true; } };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

/* ─────────────────────────────────────────────────────────────
   REVEAL WRAPPER
   ───────────────────────────────────────────────────────────── */
function Reveal({ children, className = "", delay = 0, style = {} }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} className={`reveal ${vis ? "visible" : ""} ${className}`}
         style={{ transitionDelay: `${delay}s`, ...style }}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MOCKUP THUMBNAILS
   ───────────────────────────────────────────────────────────── */
function Mockup({ type, gradient, hovered }) {
  const shared = { width: "100%", aspectRatio: "16/10", background: gradient, borderRadius: "14px 14px 0 0", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" };
  const glow = { position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 35%, rgba(255,255,255,0.18) 0%, transparent 65%)", pointerEvents: "none" };
  const lb = "rgba(255,255,255,0.18)";
  const lb2 = "rgba(255,255,255,0.1)";

  if (type === "dashboard") {
    return (
      <div className="pcard-img" style={shared}>
        <div style={glow} />
        <div style={{ width: "72%", height: "68%", background: "rgba(255,255,255,0.12)", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.12)", display: "flex", flexDirection: "column", padding: "10%", gap: "6%" }}>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: lb }} />
            <div style={{ width: "35%", height: "5px", background: lb, borderRadius: "3px" }} />
          </div>
          <div style={{ display: "flex", gap: "6%", flex: 1 }}>
            <div style={{ flex: 1, background: "rgba(255,255,255,0.08)", borderRadius: "4px", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "8%", gap: "4px" }}>
              {[60, 85, 45, 72, 90, 55].map((h, i) => (
                <div key={i} style={{ display: "flex" }}>
                  <div style={{ width: `${h}%`, height: "4px", background: lb, borderRadius: "2px" }} />
                </div>
              ))}
            </div>
            <div style={{ flex: 1, background: "rgba(255,255,255,0.08)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "55%", height: "55%", borderRadius: "50%", border: `3px solid ${lb}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--sans)", fontWeight: 600 }}>72%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (type === "whiteboard") {
    return (
      <div className="pcard-img" style={shared}>
        <div style={glow} />
        <div style={{ width: "72%", height: "68%", background: "rgba(255,255,255,0.12)", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.12)", position: "relative", overflow: "hidden" }}>
          {[{ x:"10%",y:"12%",w:"28%",h:"30%",r:-2 },{ x:"42%",y:"8%",w:"24%",h:"26%",r:1 },{ x:"15%",y:"52%",w:"22%",h:"28%",r:1.5 },{ x:"50%",y:"48%",w:"30%",h:"32%",r:-1 }].map((n,i)=>(
            <div key={i} style={{ position:"absolute",left:n.x,top:n.y,width:n.w,height:n.h,background:`rgba(255,255,255,${0.12+i*0.03})`,borderRadius:"4px",transform:`rotate(${n.r}deg)`,padding:"6%",display:"flex",flexDirection:"column",gap:"3px" }}>
              <div style={{ width:"70%",height:"3px",background:lb2,borderRadius:"2px" }} />
              <div style={{ width:"50%",height:"3px",background:lb2,borderRadius:"2px" }} />
            </div>
          ))}
          <svg style={{ position:"absolute",inset:0,width:"100%",height:"100%" }}>
            <line x1="35%" y1="27%" x2="44%" y2="21%" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
            <line x1="30%" y1="55%" x2="52%" y2="52%" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
          </svg>
          <div style={{ position:"absolute",right:"18%",top:"35%",width:"12px",height:"12px",borderRadius:"50%",background:"rgba(255,255,255,0.3)",border:"2px solid rgba(255,255,255,0.5)",animation:hovered?"float 3s ease-in-out infinite":"none" }} />
        </div>
      </div>
    );
  }
  if (type === "mobile") {
    return (
      <div className="pcard-img" style={shared}>
        <div style={glow} />
        <div style={{ width: "32%", height: "72%", background: "rgba(255,255,255,0.12)", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.12)", display: "flex", flexDirection: "column", padding: "5% 6%", gap: "5%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ width: "30%", height: "5px", background: lb, borderRadius: "3px" }} />
            <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: lb2 }} />
          </div>
          <div style={{ width: "60%", height: "6px", background: lb, borderRadius: "3px" }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
            {[1,2,3].map(i=>(
              <div key={i} style={{ display:"flex",gap:"6px",padding:"6% 0",borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ width:"28px",height:"28px",borderRadius:"8px",background:lb2,flexShrink:0 }} />
                <div style={{ flex:1,display:"flex",flexDirection:"column",gap:"3px",justifyContent:"center" }}>
                  <div style={{ width:"65%",height:"4px",background:lb,borderRadius:"2px" }} />
                  <div style={{ width:"40%",height:"3px",background:lb2,borderRadius:"2px" }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ height:"26px",background:lb2,borderRadius:"13px",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <div style={{ width:"40%",height:"4px",background:lb,borderRadius:"2px" }} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="pcard-img" style={shared}>
      <div style={glow} />
      <div style={{ width:"72%",height:"68%",background:"rgba(255,255,255,0.12)",borderRadius:"6px",border:"1px solid rgba(255,255,255,0.12)",display:"flex",flexDirection:"column",padding:"8%",gap:"8%" }}>
        <div style={{ display:"flex",justifyContent:"space-between" }}>
          <div>
            <div style={{ width:"45px",height:"4px",background:lb2,borderRadius:"2px",marginBottom:"4px" }} />
            <div style={{ fontSize:"14px",fontFamily:"var(--sans)",fontWeight:600,color:"rgba(255,255,255,0.45)" }}>$12,480</div>
          </div>
          <div style={{ display:"flex",gap:"4px" }}>
            <div style={{ padding:"3px 8px",borderRadius:"4px",background:lb2,fontSize:"8px",color:"rgba(255,255,255,0.4)",fontFamily:"var(--sans)" }}>1M</div>
            <div style={{ padding:"3px 8px",borderRadius:"4px",background:lb,fontSize:"8px",color:"rgba(255,255,255,0.6)",fontFamily:"var(--sans)" }}>6M</div>
          </div>
        </div>
        <div style={{ flex:1,display:"flex",alignItems:"flex-end",gap:"3%",padding:"0 2%" }}>
          {[40,55,35,68,52,78,45,82,60,70].map((h,i)=>(
            <div key={i} style={{ flex:1,height:`${h}%`,background:lb,borderRadius:"2px 2px 0 0" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   NAVBAR
   ───────────────────────────────────────────────────────────── */
function Navbar({ view, goHome, scrollY }) {
  const [mob, setMob] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrolled = scrollY > 50;
  const links = [{ l:"Work", h:"#work" },{ l:"Experience", h:"#exp" },{ l:"About", h:"#about" },{ l:"Say hello", h:"#contact" }];

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <nav role="navigation" aria-label="Main" style={{
        position:"fixed",top:0,left:0,right:0,zIndex:100,
        padding:scrolled?"10px 0":"18px 0",
        background:scrolled?"rgba(253,252,249,0.82)":"transparent",
        borderBottom:scrolled?"1px solid rgba(234,231,224,0.6)":"1px solid transparent",
        transition:"all 0.45s var(--smooth)",
      }} className={scrolled?"nav-blur":""}>
        <div style={{ maxWidth:"1140px",margin:"0 auto",padding:"0 28px",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <button onClick={()=>{goHome();window.scrollTo({top:0,behavior:"smooth"});}}
            style={{ background:"none",border:"none",cursor:"pointer",fontFamily:"var(--serif)",fontSize:"21px",color:"var(--text)",letterSpacing:"-0.01em" }}
            aria-label="Home">
            elena voss
          </button>
          <div style={{ display:"flex",gap:"28px",alignItems:"center" }}>
            {!isMobile && (view === "case-study" ? (
              <button onClick={goHome} className="link-line"
                style={{ background:"none",border:"none",cursor:"pointer",fontFamily:"var(--sans)",fontSize:"13px",fontWeight:400,color:"var(--text-2)",display:"flex",alignItems:"center",gap:"5px" }}>
                <ArrowLeft size={13} /> All work
              </button>
            ) : (
              links.map(l=>(
                <a key={l.l} href={l.h} className="link-line" style={{ fontFamily:"var(--sans)",fontSize:"13px",fontWeight:400,color:"var(--text-2)",textDecoration:"none" }}>
                  {l.l}
                </a>
              ))
            ))}
            {isMobile && (
              <button onClick={()=>setMob(!mob)}
                style={{ background:"none",border:"none",cursor:"pointer",color:"var(--text)",padding:"4px" }}
                aria-label={mob?"Close":"Menu"}>
                {mob?<X size={20}/>:<Menu size={20}/>}
              </button>
            )}
          </div>
        </div>
      </nav>
      {mob && (
        <div className="mob-overlay" style={{
          position:"fixed",inset:0,zIndex:99,background:"rgba(253,252,249,0.96)",
          display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"28px",
          animation:"enterFade 0.25s ease forwards",
        }}>
          {view==="case-study"?(
            <button onClick={()=>{goHome();setMob(false);}}
              style={{ background:"none",border:"none",cursor:"pointer",fontFamily:"var(--serif)",fontSize:"28px",color:"var(--text)",display:"flex",alignItems:"center",gap:"8px" }}>
              <ArrowLeft size={20}/> All work
            </button>
          ):(
            links.map((l,i)=>(
              <a key={l.l} href={l.h} onClick={()=>setMob(false)}
                style={{ fontFamily:"var(--serif)",fontSize:"28px",color:"var(--text)",textDecoration:"none",opacity:0,animation:`enterUp 0.5s var(--smooth) ${i*0.07}s forwards` }}>
                {l.l}
              </a>
            ))
          )}
        </div>
      )}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO — compact so projects peek
   ───────────────────────────────────────────────────────────── */
function Hero({ scrollY }) {
  const opacity = Math.max(0, 1 - scrollY / 420);
  const blur = Math.min(scrollY / 100, 12);
  const yOff = scrollY * 0.15;

  return (
    <section aria-label="Introduction" style={{
      padding:"130px 28px 52px",maxWidth:"1140px",margin:"0 auto",
      opacity,filter:`blur(${blur}px)`,transform:`translateY(${yOff}px)`,
      willChange:"opacity, filter, transform",
    }}>
      <div style={{ display:"flex",alignItems:"center",gap:"10px",marginBottom:"32px",opacity:0,animation:"enterUp 0.75s var(--smooth) 0.1s forwards" }}>
        <div style={{ width:"34px",height:"34px",borderRadius:"50%",background:"linear-gradient(135deg,#C4B5A0,#8B7D68)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--serif)",fontSize:"17px",color:"rgba(255,255,255,0.9)" }}>E</div>
        <div style={{ display:"flex",alignItems:"center",gap:"6px",fontFamily:"var(--sans)",fontSize:"13px",color:"var(--text-2)" }}>
          <span style={{ width:"5px",height:"5px",borderRadius:"50%",background:"#7BAF6E",animation:"pulse-dot 3s ease infinite" }}/>
          Available for new projects
        </div>
      </div>

      <h1 style={{
        fontFamily:"var(--serif)",fontWeight:400,
        fontSize:"clamp(40px,6.5vw,76px)",lineHeight:1.04,
        letterSpacing:"-0.035em",marginBottom:"22px",
        opacity:0,animation:"enterUp 0.8s var(--smooth) 0.2s forwards",
      }}>
        I design products that<br/>
        <em style={{ fontStyle:"italic" }}>feel obvious</em>
        <span style={{ color:"var(--accent)" }}>.</span>
      </h1>

      <p style={{
        fontFamily:"var(--sans)",fontSize:"clamp(15px,1.8vw,18px)",
        lineHeight:1.7,color:"var(--text-2)",fontWeight:300,
        maxWidth:"500px",marginBottom:"32px",
        opacity:0,animation:"enterUp 0.8s var(--smooth) 0.35s forwards",
      }}>
        Product designer with 7+ years making complex things simple. Currently
        leading design at Meridian Labs. Previously shaped tools for collaboration,
        health, and finance.
      </p>

      <div style={{ display:"flex",gap:"12px",flexWrap:"wrap",alignItems:"center",opacity:0,animation:"enterUp 0.8s var(--smooth) 0.48s forwards" }}>
        <a href="#contact" className="cta-btn"
          style={{ display:"inline-flex",alignItems:"center",gap:"7px",background:"var(--bg-dark)",color:"var(--bg)",padding:"13px 24px",borderRadius:"10px",fontFamily:"var(--sans)",fontSize:"13px",fontWeight:500,textDecoration:"none",letterSpacing:"0.01em" }}>
          Say hello <Mail size={14}/>
        </a>
        <a href="#work" className="sec-btn"
          style={{ display:"inline-flex",alignItems:"center",gap:"6px",border:"1px solid var(--border)",color:"var(--text-2)",padding:"13px 24px",borderRadius:"10px",fontFamily:"var(--sans)",fontSize:"13px",fontWeight:400,textDecoration:"none" }}>
          See my work <ArrowDown size={13}/>
        </a>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   PROJECT CARD
   ───────────────────────────────────────────────────────────── */
function ProjectCard({ p, idx, onSelect }) {
  const [hov, setHov] = useState(false);
  const [ref, vis] = useInView();

  return (
    <article ref={ref} className={`pcard reveal ${vis?"visible":""}`}
      style={{ transitionDelay:`${idx*0.1}s`,cursor:p.hasCaseStudy?"pointer":"default",borderRadius:"14px",overflow:"hidden",background:"var(--bg-card)",border:"1px solid var(--border)" }}
      onClick={()=>p.hasCaseStudy&&onSelect(p.id)}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      onKeyDown={e=>e.key==="Enter"&&p.hasCaseStudy&&onSelect(p.id)}
      tabIndex={0} role={p.hasCaseStudy?"button":"article"}
      aria-label={p.hasCaseStudy?`View ${p.title} case study`:p.title}>

      <div style={{ overflow:"hidden" }}>
        <Mockup type={p.mockupType} gradient={p.gradient} hovered={hov}/>
      </div>

      <div style={{ padding:"22px 24px 26px" }}>
        <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:"6px" }}>
          <div>
            <h3 style={{ fontFamily:"var(--serif)",fontSize:"26px",fontWeight:400,letterSpacing:"-0.02em",lineHeight:1.2 }}>{p.title}</h3>
            <p style={{ fontFamily:"var(--sans)",fontSize:"14px",color:"var(--accent)",fontWeight:500,marginTop:"2px" }}>{p.tagline}</p>
          </div>
          {p.hasCaseStudy && <span className="pcard-arrow" style={{ marginTop:"4px",color:"var(--text)" }}><ArrowUpRight size={18}/></span>}
        </div>

        <p style={{ fontFamily:"var(--sans)",fontSize:"13.5px",lineHeight:1.65,color:"var(--text-2)",fontWeight:300,margin:"12px 0 16px" }}>{p.desc}</p>

        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"8px" }}>
          <div style={{ display:"flex",gap:"6px" }}>
            {p.tags.map(t=>(
              <span key={t} className="pcard-tag" style={{ padding:"4px 10px",borderRadius:"6px",background:"var(--bg-warm)",fontFamily:"var(--sans)",fontSize:"11px",fontWeight:500,color:"var(--text-3)",letterSpacing:"0.02em" }}>{t}</span>
            ))}
          </div>
          <span style={{ fontFamily:"var(--sans)",fontSize:"12px",color:"var(--text-3)" }}>{p.role} · {p.year}</span>
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────
   PROJECT GRID
   ───────────────────────────────────────────────────────────── */
function ProjectGrid({ onSelect }) {
  return (
    <section id="work" aria-label="Selected work" style={{ padding:"20px 28px 100px" }}>
      <div style={{ maxWidth:"1140px",margin:"0 auto" }}>
        <Reveal>
          <div style={{ marginBottom:"44px" }}>
            <p style={{ fontFamily:"var(--sans)",fontSize:"12px",fontWeight:600,color:"var(--accent)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"10px" }}>Selected Work</p>
            <h2 style={{ fontFamily:"var(--serif)",fontSize:"clamp(28px,4vw,44px)",fontWeight:400,letterSpacing:"-0.02em",lineHeight:1.15 }}>Things I've been making</h2>
          </div>
        </Reveal>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,460px),1fr))",gap:"24px" }}>
          {PROJECTS.map((p,i)=><ProjectCard key={p.id} p={p} idx={i} onSelect={onSelect}/>)}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   CASE STUDY
   ───────────────────────────────────────────────────────────── */
function CaseStudy({ projectId, onBack }) {
  const p = PROJECTS.find(x=>x.id===projectId);
  const cs = CASE_STUDY_DATA;
  if (!p) return null;

  const VisualBreak = ({ label, aspect="21/8" }) => (
    <div style={{ maxWidth:"1140px",margin:"0 auto",padding:"0 28px" }}>
      <Reveal>
        <div style={{ width:"100%",aspectRatio:aspect,background:`linear-gradient(135deg, ${p.accent}30, ${p.accent}12)`,borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid var(--border)" }}>
          <span style={{ fontFamily:"var(--sans)",fontSize:"13px",color:"var(--text-3)",fontStyle:"italic" }}>{label}</span>
        </div>
      </Reveal>
    </div>
  );

  return (
    <div className="cs-enter" style={{ paddingBottom:"80px" }}>
      <div style={{ maxWidth:"1140px",margin:"0 auto",padding:"100px 28px 0" }}>
        <div style={{ width:"100%",aspectRatio:"2.3/1",background:p.gradient,borderRadius:"14px",position:"relative",overflow:"hidden",marginBottom:"52px" }}>
          <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse at 35% 45%, rgba(255,255,255,0.14) 0%, transparent 65%)" }}/>
          <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"32px 36px",background:"linear-gradient(transparent, rgba(0,0,0,0.18))" }}>
            <h1 style={{ fontFamily:"var(--serif)",fontSize:"clamp(34px,5vw,60px)",fontWeight:400,color:"rgba(255,255,255,0.95)",letterSpacing:"-0.03em",lineHeight:1.1 }}>{p.title}</h1>
            <p style={{ fontFamily:"var(--sans)",fontSize:"clamp(14px,1.5vw,17px)",color:"rgba(255,255,255,0.7)",marginTop:"6px",fontWeight:300 }}>{p.tagline}</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:"1140px",margin:"0 auto",padding:"0 28px" }}>
        <Reveal>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:"20px",padding:"24px 0",borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)",marginBottom:"52px" }}>
            {[{icon:<Users size={14}/>,l:"Role",v:p.role},{icon:<Users size={14}/>,l:"Team",v:p.team},{icon:<Clock size={14}/>,l:"Timeline",v:p.timeline},{icon:<MapPin size={14}/>,l:"Year",v:p.year}].map(m=>(
              <div key={m.l}>
                <div style={{ display:"flex",alignItems:"center",gap:"5px",fontFamily:"var(--sans)",fontSize:"11px",fontWeight:600,color:"var(--text-3)",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"5px" }}>{m.icon} {m.l}</div>
                <div style={{ fontFamily:"var(--sans)",fontSize:"14px",color:"var(--text)" }}>{m.v}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div style={{ maxWidth:"1140px",margin:"0 auto",padding:"0 28px 64px" }}>
        <Reveal>
          <div style={{ maxWidth:"660px" }}>
            <p style={{ fontFamily:"var(--serif)",fontSize:"clamp(19px,2.5vw,24px)",lineHeight:1.6,fontWeight:400,color:"var(--text)",letterSpacing:"-0.01em" }}>{cs.overview}</p>
          </div>
        </Reveal>
      </div>

      {/* PROBLEM */}
      <div style={{ maxWidth:"1140px",margin:"0 auto",padding:"0 28px 48px" }}>
        <Reveal>
          <p style={{ fontFamily:"var(--sans)",fontSize:"12px",fontWeight:600,color:"var(--accent)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"14px" }}>The Problem</p>
          <h2 style={{ fontFamily:"var(--serif)",fontSize:"clamp(26px,3.5vw,38px)",fontWeight:400,letterSpacing:"-0.02em",lineHeight:1.15,marginBottom:"24px" }}>The distance between intent and action</h2>
          <div style={{ maxWidth:"660px" }}>
            <p style={{ fontFamily:"var(--sans)",fontSize:"15px",lineHeight:1.75,color:"var(--text-2)",fontWeight:300 }}>{cs.problem.content}</p>
          </div>
        </Reveal>
      </div>

      <div style={{ maxWidth:"1140px",margin:"0 auto",padding:"0 28px 48px" }}>
        <Reveal>
          <div style={{ display:"inline-flex",alignItems:"baseline",gap:"12px",padding:"24px 32px",background:"var(--bg-warm)",borderRadius:"12px" }}>
            <span style={{ fontFamily:"var(--serif)",fontSize:"clamp(32px,4vw,48px)",fontWeight:400,color:"var(--accent)",letterSpacing:"-0.03em" }}>{cs.problem.stat}</span>
            <span style={{ fontFamily:"var(--sans)",fontSize:"14px",color:"var(--text-2)" }}>{cs.problem.statLabel}</span>
          </div>
        </Reveal>
      </div>

      <div style={{ maxWidth:"1140px",margin:"0 auto",padding:"0 28px 72px" }}>
        <Reveal>
          <div style={{ maxWidth:"660px",padding:"32px 36px",borderLeft:"3px solid var(--accent)",background:"var(--bg-warm)",borderRadius:"0 12px 12px 0" }}>
            <p style={{ fontFamily:"var(--serif)",fontSize:"clamp(17px,2vw,21px)",fontStyle:"italic",lineHeight:1.6,color:"var(--text)",marginBottom:"14px" }}>"{cs.problem.quote}"</p>
            <p style={{ fontFamily:"var(--sans)",fontSize:"13px",color:"var(--text-3)" }}>— {cs.problem.quoteAuthor}, {cs.problem.quoteCompany}</p>
          </div>
        </Reveal>
      </div>

      <VisualBreak label="Research synthesis · Affinity mapping · Journey maps" />

      {/* RESEARCH */}
      <div style={{ maxWidth:"1140px",margin:"0 auto",padding:"72px 28px 24px" }}>
        <Reveal>
          <p style={{ fontFamily:"var(--sans)",fontSize:"12px",fontWeight:600,color:"var(--accent)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"14px" }}>Discovery & Research</p>
          <h2 style={{ fontFamily:"var(--serif)",fontSize:"clamp(26px,3.5vw,38px)",fontWeight:400,letterSpacing:"-0.02em",lineHeight:1.15,marginBottom:"24px" }}>Learning how analysts actually think</h2>
          <div style={{ maxWidth:"660px",marginBottom:"48px" }}>
            <p style={{ fontFamily:"var(--sans)",fontSize:"15px",lineHeight:1.75,color:"var(--text-2)",fontWeight:300 }}>{cs.research.content}</p>
          </div>
        </Reveal>
      </div>

      <div style={{ maxWidth:"1140px",margin:"0 auto",padding:"0 28px 72px" }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,300px),1fr))",gap:"18px" }}>
          {cs.research.insights.map((ins,i)=>(
            <Reveal key={i} delay={i*0.08}>
              <div className="metric-pop" style={{ padding:"28px",border:"1px solid var(--border)",borderRadius:"12px",background:"var(--bg-card)",height:"100%" }}>
                <span style={{ fontFamily:"var(--serif)",fontSize:"28px",color:"var(--accent)",fontStyle:"italic" }}>{ins.num}</span>
                <h4 style={{ fontFamily:"var(--sans)",fontSize:"15px",fontWeight:600,color:"var(--text)",margin:"12px 0 8px" }}>{ins.title}</h4>
                <p style={{ fontFamily:"var(--sans)",fontSize:"13.5px",lineHeight:1.65,color:"var(--text-2)",fontWeight:300 }}>{ins.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:"1140px",margin:"0 auto",padding:"0 28px 72px" }}>
        <Reveal>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"18px" }}>
            {["Wireframe explorations","Component system"].map((l,i)=>(
              <div key={i} style={{ aspectRatio:"16/10",background:`linear-gradient(${140+i*25}deg, ${p.accent}28, ${p.accent}10)`,borderRadius:"12px",border:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"center" }}>
                <span style={{ fontFamily:"var(--sans)",fontSize:"13px",color:"var(--text-3)",fontStyle:"italic" }}>{l}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* SOLUTION */}
      <div style={{ maxWidth:"1140px",margin:"0 auto",padding:"0 28px 24px" }}>
        <Reveal>
          <p style={{ fontFamily:"var(--sans)",fontSize:"12px",fontWeight:600,color:"var(--accent)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"14px" }}>The Solution</p>
          <h2 style={{ fontFamily:"var(--serif)",fontSize:"clamp(26px,3.5vw,38px)",fontWeight:400,letterSpacing:"-0.02em",lineHeight:1.15,marginBottom:"24px" }}>Three layers, one mental model</h2>
          <div style={{ maxWidth:"660px",marginBottom:"40px" }}>
            <p style={{ fontFamily:"var(--sans)",fontSize:"15px",lineHeight:1.75,color:"var(--text-2)",fontWeight:300 }}>{cs.solution.content}</p>
          </div>
        </Reveal>
      </div>

      <div style={{ maxWidth:"1140px",margin:"0 auto",padding:"0 28px 48px" }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,240px),1fr))",gap:"16px" }}>
          {cs.solution.features.map((f,i)=>(
            <Reveal key={i} delay={i*0.07}>
              <div style={{ padding:"24px",background:"var(--bg-warm)",borderRadius:"12px",height:"100%" }}>
                <div style={{ width:"28px",height:"28px",borderRadius:"8px",background:"var(--accent)",color:"var(--bg)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:700,fontFamily:"var(--sans)",marginBottom:"14px" }}>{i+1}</div>
                <h4 style={{ fontFamily:"var(--sans)",fontSize:"14px",fontWeight:600,marginBottom:"6px" }}>{f.title}</h4>
                <p style={{ fontFamily:"var(--sans)",fontSize:"13px",lineHeight:1.6,color:"var(--text-2)",fontWeight:300 }}>{f.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:"1140px",margin:"0 auto",padding:"0 28px 72px" }}>
        <Reveal>
          <div style={{ width:"100%",aspectRatio:"21/9",background:p.gradient,borderRadius:"14px",position:"relative",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse at 55% 45%, rgba(255,255,255,0.12) 0%, transparent 60%)" }}/>
            <span style={{ fontFamily:"var(--sans)",fontSize:"13px",color:"rgba(255,255,255,0.6)",fontStyle:"italic",zIndex:1 }}>Final product — dashboard overview</span>
          </div>
        </Reveal>
      </div>

      {/* OUTCOMES */}
      <div style={{ maxWidth:"1140px",margin:"0 auto",padding:"0 28px 24px" }}>
        <Reveal>
          <p style={{ fontFamily:"var(--sans)",fontSize:"12px",fontWeight:600,color:"var(--accent)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"14px" }}>Outcomes</p>
          <h2 style={{ fontFamily:"var(--serif)",fontSize:"clamp(26px,3.5vw,38px)",fontWeight:400,letterSpacing:"-0.02em",lineHeight:1.15,marginBottom:"40px" }}>The numbers that mattered</h2>
        </Reveal>
      </div>

      <div style={{ maxWidth:"1140px",margin:"0 auto",padding:"0 28px 52px" }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,220px),1fr))",gap:"16px" }}>
          {cs.outcomes.metrics.map((m,i)=>(
            <Reveal key={i} delay={i*0.07}>
              <div className="metric-pop" style={{ padding:"28px",border:"1px solid var(--border)",borderRadius:"12px",background:"var(--bg-card)",textAlign:"center" }}>
                <div style={{ fontFamily:"var(--serif)",fontSize:"clamp(30px,4vw,44px)",fontWeight:400,color:"var(--accent)",letterSpacing:"-0.03em",marginBottom:"4px" }}>{m.value}</div>
                <div style={{ fontFamily:"var(--sans)",fontSize:"14px",fontWeight:500,color:"var(--text)",marginBottom:"4px" }}>{m.label}</div>
                <div style={{ fontFamily:"var(--sans)",fontSize:"12px",color:"var(--text-3)" }}>{m.detail}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:"1140px",margin:"0 auto",padding:"0 28px 72px" }}>
        <Reveal>
          <div style={{ maxWidth:"660px",padding:"32px 36px",background:"var(--bg-warm)",borderRadius:"14px" }}>
            <p style={{ fontFamily:"var(--sans)",fontSize:"12px",fontWeight:600,color:"var(--accent)",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"14px" }}>What I learned</p>
            <p style={{ fontFamily:"var(--serif)",fontSize:"clamp(16px,2vw,20px)",fontStyle:"italic",lineHeight:1.65,color:"var(--text)" }}>{cs.outcomes.reflection}</p>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div style={{ textAlign:"center",padding:"0 28px" }}>
          <button onClick={onBack} className="cta-btn"
            style={{ display:"inline-flex",alignItems:"center",gap:"7px",background:"var(--bg-dark)",color:"var(--bg)",padding:"13px 28px",borderRadius:"10px",border:"none",fontFamily:"var(--sans)",fontSize:"13px",fontWeight:500,cursor:"pointer" }}>
            <ArrowLeft size={14}/> Back to all work
          </button>
        </div>
      </Reveal>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   EXPERIENCE
   ───────────────────────────────────────────────────────────── */
function ExperienceSection() {
  return (
    <section id="exp" aria-label="Experience" style={{ padding:"80px 28px 100px",background:"var(--bg-warm)" }}>
      <div style={{ maxWidth:"1140px",margin:"0 auto" }}>
        <Reveal>
          <p style={{ fontFamily:"var(--sans)",fontSize:"12px",fontWeight:600,color:"var(--accent)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"10px" }}>Experience</p>
          <h2 style={{ fontFamily:"var(--serif)",fontSize:"clamp(28px,4vw,44px)",fontWeight:400,letterSpacing:"-0.02em",lineHeight:1.15,marginBottom:"48px" }}>Places that shaped how I think</h2>
        </Reveal>
        {EXPERIENCE.map((e,i)=>(
          <Reveal key={i} delay={i*0.06}>
            <div className="exp-row" style={{ display:"grid",gridTemplateColumns:"minmax(100px,180px) 1fr",gap:"20px",padding:"28px 0",borderBottom:"1px solid var(--border)",borderRadius:"8px" }}>
              <span style={{ fontFamily:"var(--sans)",fontSize:"13px",color:"var(--text-3)",paddingTop:"3px" }}>{e.when}</span>
              <div>
                <h3 style={{ fontFamily:"var(--serif)",fontSize:"22px",fontWeight:400,letterSpacing:"-0.01em" }}>{e.co}</h3>
                <p style={{ fontFamily:"var(--sans)",fontSize:"13px",fontWeight:500,color:"var(--accent)",margin:"3px 0 8px" }}>{e.role}</p>
                <p style={{ fontFamily:"var(--sans)",fontSize:"13.5px",lineHeight:1.65,color:"var(--text-2)",fontWeight:300,maxWidth:"480px" }}>{e.what}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   EXPERIMENTS
   ───────────────────────────────────────────────────────────── */
function ExperimentsSection() {
  return (
    <section aria-label="Experiments" style={{ padding:"80px 28px 100px" }}>
      <div style={{ maxWidth:"1140px",margin:"0 auto" }}>
        <Reveal>
          <p style={{ fontFamily:"var(--sans)",fontSize:"12px",fontWeight:600,color:"var(--accent)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"10px" }}>After Hours</p>
          <h2 style={{ fontFamily:"var(--serif)",fontSize:"clamp(28px,4vw,44px)",fontWeight:400,letterSpacing:"-0.02em",lineHeight:1.15,marginBottom:"48px" }}>Things I tinker with</h2>
        </Reveal>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,240px),1fr))",gap:"18px" }}>
          {EXPERIMENTS.map((x,i)=>(
            <Reveal key={i} delay={i*0.07}>
              <div className="xcard" style={{ padding:"24px",borderRadius:"14px",border:"1px solid var(--border)",cursor:"pointer",background:"var(--bg-card)" }}>
                <div style={{ width:"100%",aspectRatio:"5/3.5",background:x.color,borderRadius:"10px",marginBottom:"18px",display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <span style={{ fontSize:"28px",opacity:0.45 }}>{x.emoji}</span>
                </div>
                <h3 style={{ fontFamily:"var(--serif)",fontSize:"19px",fontWeight:400,marginBottom:"6px" }}>{x.title}</h3>
                <p style={{ fontFamily:"var(--sans)",fontSize:"13px",lineHeight:1.6,color:"var(--text-2)",fontWeight:300 }}>{x.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   ABOUT
   ───────────────────────────────────────────────────────────── */
function AboutSection() {
  return (
    <section id="about" aria-label="About" style={{ padding:"80px 28px 100px",background:"var(--bg-warm)" }}>
      <div style={{ maxWidth:"1140px",margin:"0 auto" }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,380px),1fr))",gap:"52px",alignItems:"start" }}>
          <Reveal>
            <div style={{ aspectRatio:"4/5",background:"linear-gradient(175deg,#D8D2C6 0%,#B8AFA0 100%)",borderRadius:"14px",position:"relative",overflow:"hidden" }}>
              <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 35%, rgba(255,255,255,0.12) 0%, transparent 55%)" }}/>
              <div style={{ position:"absolute",bottom:"20px",left:"20px",right:"20px",padding:"14px 18px",background:"rgba(255,255,255,0.12)",borderRadius:"10px",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)" }}>
                <span style={{ fontFamily:"var(--sans)",fontSize:"13px",color:"rgba(255,255,255,0.8)" }}>San Francisco, CA</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <p style={{ fontFamily:"var(--sans)",fontSize:"12px",fontWeight:600,color:"var(--accent)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"10px" }}>A Little About Me</p>
              <h2 style={{ fontFamily:"var(--serif)",fontSize:"clamp(28px,4vw,44px)",fontWeight:400,letterSpacing:"-0.02em",lineHeight:1.15,marginBottom:"28px" }}>
                I care about the<br/><em style={{ fontStyle:"italic" }}>craft</em> behind the craft
              </h2>
              <div style={{ fontFamily:"var(--sans)",fontSize:"14.5px",lineHeight:1.75,color:"var(--text-2)",fontWeight:300,display:"flex",flexDirection:"column",gap:"16px" }}>
                <p>I'm Elena—a product designer who studied cognitive science at UC Berkeley because I wanted to understand why people do what they do. Turns out, that question never gets old, and it still drives every design decision I make.</p>
                <p>My work lives at the intersection of research rigor and creative instinct. I spend as much time understanding a problem space as I do crafting the pixels—because the most elegant interface in the world is worthless if it answers the wrong question.</p>
                <p>Outside of design, I'm usually letterpress printing, hiking the Marin Headlands, or writing bad generative art code that occasionally produces something beautiful. I believe the best designers keep a wide aperture for inspiration—and that making things with your hands sharpens your eye for screens.</p>
              </div>
              <div style={{ display:"flex",gap:"8px",flexWrap:"wrap",marginTop:"32px" }}>
                {["Systems Thinking","Design Systems","Prototyping","Research","Accessibility","Motion"].map(s=>(
                  <span key={s} style={{ padding:"5px 12px",borderRadius:"8px",border:"1px solid var(--border)",fontFamily:"var(--sans)",fontSize:"12px",color:"var(--text-3)" }}>{s}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FOOTER
   ───────────────────────────────────────────────────────────── */
function Footer() {
  const SL = ({ icon, label }) => (
    <a href="#" aria-label={label} className="link-line"
      style={{ display:"flex",alignItems:"center",gap:"6px",fontFamily:"var(--sans)",fontSize:"13px",color:"rgba(232,230,225,0.55)",textDecoration:"none",transition:"color 0.3s ease" }}
      onMouseEnter={e=>e.currentTarget.style.color="#FAFAF8"} onMouseLeave={e=>e.currentTarget.style.color="rgba(232,230,225,0.55)"}>
      {icon} {label}
    </a>
  );

  return (
    <footer id="contact" role="contentinfo" style={{ padding:"80px 28px 44px",background:"var(--bg-dark)",color:"#E8E6E1" }}>
      <div style={{ maxWidth:"1140px",margin:"0 auto" }}>
        <Reveal>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,300px),1fr))",gap:"52px",marginBottom:"64px" }}>
            <div>
              <h2 style={{ fontFamily:"var(--serif)",fontSize:"clamp(28px,4vw,44px)",fontWeight:400,letterSpacing:"-0.02em",lineHeight:1.15,color:"#FAFAF8",marginBottom:"16px" }}>
                Let's make something<br/><em style={{ fontStyle:"italic",color:"var(--accent-light)" }}>worth using</em>
              </h2>
              <p style={{ fontFamily:"var(--sans)",fontSize:"14px",lineHeight:1.7,color:"rgba(232,230,225,0.5)",fontWeight:300,maxWidth:"380px",marginBottom:"24px" }}>
                I'm most drawn to thoughtful product challenges—especially in analytics, collaboration, and health. If that sounds like what you're building, I'd love to hear about it.
              </p>
              <a href="mailto:elena@example.com" className="link-line"
                style={{ fontFamily:"var(--sans)",fontSize:"15px",fontWeight:500,color:"#FAFAF8",textDecoration:"none",display:"inline-flex",alignItems:"center",gap:"7px" }}>
                elena@example.com <ArrowUpRight size={15}/>
              </a>
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:"28px",justifyContent:"flex-end" }}>
              <div>
                <p style={{ fontFamily:"var(--sans)",fontSize:"11px",fontWeight:600,color:"rgba(232,230,225,0.3)",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"14px" }}>Elsewhere</p>
                <div style={{ display:"flex",gap:"18px",flexWrap:"wrap" }}>
                  <SL icon={<Linkedin size={15}/>} label="LinkedIn"/>
                  <SL icon={<Dribbble size={15}/>} label="Dribbble"/>
                  <SL icon={<Github size={15}/>} label="GitHub"/>
                </div>
              </div>
              <a href="#" className="sec-btn"
                style={{ display:"inline-flex",alignItems:"center",gap:"7px",padding:"11px 20px",border:"1px solid rgba(232,230,225,0.18)",borderRadius:"10px",fontFamily:"var(--sans)",fontSize:"13px",color:"rgba(232,230,225,0.55)",textDecoration:"none",width:"fit-content" }}>
                <Download size={14}/> Download résumé
              </a>
            </div>
          </div>
        </Reveal>
        <div style={{ borderTop:"1px solid rgba(232,230,225,0.08)",paddingTop:"24px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"8px" }}>
          <span style={{ fontFamily:"var(--sans)",fontSize:"12px",color:"rgba(232,230,225,0.25)" }}>© 2026 Elena Voss</span>
          <span style={{ fontFamily:"var(--sans)",fontSize:"12px",color:"rgba(232,230,225,0.25)" }}>Designed & built with care</span>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────
   APP
   ───────────────────────────────────────────────────────────── */
export default function Portfolio() {
  const [view, setView] = useState("home");
  const [selProject, setSelProject] = useState(null);
  const scrollY = useScrollY();

  const openCase = useCallback(id => {
    setSelProject(id);
    setView("case-study");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goHome = useCallback(() => {
    setView("home");
    setSelProject(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div style={{ fontFamily:"var(--sans)",background:"var(--bg)",color:"var(--text)",minHeight:"100vh",overflowX:"hidden" }}>
      <Fonts/>
      <Styles/>
      <div className="grain" aria-hidden="true"/>
      <Navbar view={view} goHome={goHome} scrollY={scrollY}/>
      {view === "home" ? (
        <main>
          <Hero scrollY={scrollY}/>
          <ProjectGrid onSelect={openCase}/>
          <ExperienceSection/>
          <ExperimentsSection/>
          <AboutSection/>
        </main>
      ) : (
        <main>
          <CaseStudy projectId={selProject} onBack={goHome}/>
        </main>
      )}
      <Footer/>
    </div>
  );
}
