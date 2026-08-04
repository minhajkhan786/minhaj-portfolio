"use client";

import emailjs from "@emailjs/browser";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronUp,
  Download,
  Github,
  Linkedin,
  Menu,
  Moon,
  Send,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { profile, projects, services, skillGroups } from "@/data/portfolio";

const navItems = ["About", "Work", "Skills", "Services", "Contact"];

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="section-title">
      <span className="eyebrow"><i />{kicker}</span>
      <h2>{title}</h2>
    </div>
  );
}

export function Portfolio() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState("");
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    const saved = localStorage.getItem("mk-theme");
    const isDark = saved ? saved === "dark" : true;
    setDark(isDark);
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    const timer = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-word span", { yPercent: 110 }, {
        yPercent: 0,
        duration: 1.05,
        stagger: 0.09,
        ease: "power4.out",
        delay: 0.25,
      });
      gsap.to(".hero-device", {
        y: -50,
        rotate: -2,
        ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });
    }, heroRef);
    return () => ctx.revert();
  }, [loading]);

  const toggleTheme = () => {
    const value = !dark;
    setDark(value);
    document.documentElement.dataset.theme = value ? "dark" : "light";
    localStorage.setItem("mk-theme", value ? "dark" : "light");
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    setSending(true);
    const form = event.currentTarget;
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    try {
      if (serviceId && templateId && publicKey) {
        await emailjs.sendForm(serviceId, templateId, form, { publicKey });
      } else {
        const data = new FormData(form);
        const subject = encodeURIComponent(`Portfolio enquiry from ${data.get("from_name")}`);
        const body = encodeURIComponent(`${data.get("message")}\n\nReply to: ${data.get("reply_to")}`);
        window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      }
      setSent(true);
      form.reset();
      window.setTimeout(() => setSent(false), 5000);
    } catch {
      setFormError("Message could not be sent. Please email me directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <AnimatePresence>{loading && (
        <motion.div className="loader" exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
          <motion.div className="loader-mark" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>MK<span>.</span></motion.div>
          <div className="loader-line"><motion.i initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 0.7, ease: "easeInOut" }} /></div>
        </motion.div>
      )}</AnimatePresence>

      <motion.div className="scroll-progress" style={{ scaleX }} />
      <header className="nav-shell">
        <a href="#top" className="logo" aria-label="Minhaj Khan home">MK<span>.</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}
        </nav>
        <div className="nav-actions">
          <button className="icon-button" onClick={toggleTheme} aria-label={`Switch to ${dark ? "light" : "dark"} theme`}>
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a className="nav-cta" href="#contact">Let&apos;s talk <ArrowUpRight size={15} /></a>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <AnimatePresence>{menuOpen && (
        <motion.nav className="mobile-nav" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
          {navItems.map((item) => <a onClick={() => setMenuOpen(false)} key={item} href={`#${item.toLowerCase()}`}>{item}<ArrowUpRight /></a>)}
        </motion.nav>
      )}</AnimatePresence>

      <main>
        <section className="hero" id="top" ref={heroRef}>
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <motion.div className="availability" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
              <span /> Available for select projects
            </motion.div>
            <h1 aria-label="I build mobile experiences that move business">
              <span className="hero-word"><span>I build mobile</span></span>
              <span className="hero-word outline"><span>experiences</span></span>
              <span className="hero-word"><span>that move business.</span></span>
            </h1>
            <motion.div className="hero-bottom" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
              <p>Flutter developer crafting high-performance apps with clean architecture, thoughtful interfaces and production-ready integrations.</p>
              <div className="hero-links">
                <a className="button primary" href="#work">Explore work <ArrowDown size={17} /></a>
                <a className="button ghost" href="/Minhaj_Resume.pdf" download>Resume <Download size={17} /></a>
              </div>
            </motion.div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="hero-device">
              <div className="device-top"><span>9:41</span><i /></div>
              <div className="device-screen">
                <span className="device-label">Currently building</span>
                <strong>Fast.<br />Fluid.<br />Flutter.</strong>
                <div className="device-metric"><span>Production apps</span><b>08+</b></div>
                <div className="device-chart"><i /><i /><i /><i /><i /><i /><i /></div>
              </div>
            </div>
            <div className="floating-tag tag-one">Flutter / Dart</div>
            <div className="floating-tag tag-two"><Sparkles size={13} /> 7+ months shipping</div>
          </div>
          <div className="hero-marquee"><div>FLUTTER · FIREBASE · REST APIs · SOCKET.IO · GOOGLE MAPS · PAYMENT SYSTEMS · <span>FLUTTER · FIREBASE · REST APIs · SOCKET.IO · GOOGLE MAPS · PAYMENT SYSTEMS ·</span></div></div>
        </section>

        <section className="about section" id="about">
          <Reveal><SectionTitle kicker="Profile" title="Engineering with intent." /></Reveal>
          <div className="about-grid">
            <Reveal className="about-lead"><p>I turn complex mobile workflows into <em>clear, fast and reliable</em> products.</p></Reveal>
            <Reveal className="about-copy">
              <p>I&apos;m Minhaj Khan, a Flutter developer at {profile.company}. I build scalable applications across real estate, logistics, construction, vehicle inspection, sports, astrology and marketplace platforms.</p>
              <p>My work spans the complete mobile product layer: responsive interfaces, REST and real-time integrations, Firebase services, maps, payments, authentication, state management and store deployment.</p>
              <div className="about-stats">
                <div><strong>08+</strong><span>Products</span></div>
                <div><strong>07+</strong><span>Months professional</span></div>
                <div><strong>07</strong><span>Industries</span></div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="experience section" id="experience">
          <Reveal><SectionTitle kicker="Experience" title="Focused on shipping." /></Reveal>
          <div className="timeline-list">
            <Reveal className="timeline">
              <div className="timeline-date">Current role</div>
              <div className="timeline-dot"><i /></div>
              <div className="timeline-content">
                <span>Technogigz Solutions Pvt. Ltd.</span>
                <h3>Flutter Developer</h3>
                <p>Building and maintaining production Flutter applications, from responsive UI and API integration to Firebase, notifications, maps, payments, performance and release delivery.</p>
                <div className="tag-row">{["Product development", "Optimization", "Deployment", "Git collaboration"].map(x => <span key={x}>{x}</span>)}</div>
              </div>
            </Reveal>
            <Reveal className="timeline">
              <div className="timeline-date">Previous role</div>
              <div className="timeline-dot"><i /></div>
              <div className="timeline-content">
                <span>Mobiloitte</span>
                <h3>Flutter Developer</h3>
                <p>Contributed to mobile application development with Flutter, implementing responsive interfaces, integrating APIs and collaborating on reliable product delivery.</p>
                <div className="tag-row">{["Flutter", "Responsive UI", "API integration", "Team delivery"].map(x => <span key={x}>{x}</span>)}</div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="work section" id="work">
          <Reveal><SectionTitle kicker="Selected work" title="Products made for real use." /></Reveal>
          <div className="project-grid">
            {projects.map((project, index) => (
              <Reveal className={`project-card accent-${project.accent}`} key={project.title}>
                <button onClick={() => setActiveProject(index)} aria-label={`View ${project.title} case study`}>
                  <div className="project-visual">
                    <span className="project-index">{project.index}</span>
                    {project.screenshots ? (
                      <div className="project-cover">
                        <Image src={project.screenshots[0]} alt={`${project.title} application preview`} fill sizes="(max-width: 640px) 100vw, 50vw" />
                      </div>
                    ) : (
                      <><div className="app-mark">{project.monogram}</div><div className="mock-phone"><div><i /><i /><i /></div></div></>
                    )}
                    <span className="project-arrow"><ArrowUpRight /></span>
                  </div>
                  <div className="project-info"><span>{project.label}</span><h3>{project.title}</h3><p>{project.summary}</p><div className="tag-row">{project.stack.slice(0,3).map(x => <span key={x}>{x}</span>)}</div></div>
                </button>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="skills section" id="skills">
          <Reveal><SectionTitle kicker="Capabilities" title="A practical mobile toolkit." /></Reveal>
          <div className="skills-layout">
            <Reveal className="skill-radar">
              <div className="radar-ring r1" /><div className="radar-ring r2" /><div className="radar-ring r3" />
              <div className="radar-core"><span>Core</span><strong>Flutter</strong><small>Dart</small></div>
              <span className="radar-label label-a">UI</span><span className="radar-label label-b">API</span><span className="radar-label label-c">Cloud</span><span className="radar-label label-d">Data</span>
            </Reveal>
            <div className="skill-groups">
              {skillGroups.map((group, i) => <Reveal className="skill-group" key={group.title}><span>0{i+1}</span><h3>{group.title}</h3><div>{group.skills.map(s => <i key={s}>{s}</i>)}</div></Reveal>)}
            </div>
          </div>
        </section>

        <section className="services section" id="services">
          <Reveal><SectionTitle kicker="Services" title="From idea to app store." /></Reveal>
          <div className="service-list">
            {services.map(([num, title, desc]) => <Reveal className="service-row" key={num}><span>{num}</span><h3>{title}</h3><p>{desc}</p><ArrowUpRight /></Reveal>)}
          </div>
        </section>

        <section className="achievement-band">
          <div className="section achievement-inner">
            <Reveal><span className="eyebrow"><i />Approach</span><h2>Production thinking,<br /><em>from the first screen.</em></h2></Reveal>
            <Reveal className="principles"><div><strong>01</strong><span>Clarity over clutter</span></div><div><strong>02</strong><span>Performance by default</span></div><div><strong>03</strong><span>Built to maintain</span></div></Reveal>
          </div>
        </section>

        <section className="contact section" id="contact">
          <Reveal className="contact-intro"><span className="eyebrow"><i />Contact</span><h2>Have an app in mind?<br /><em>Let&apos;s make it real.</em></h2><p>Tell me what you&apos;re building, where it stands and what a successful launch looks like.</p></Reveal>
          <div className="contact-grid">
            <Reveal className="contact-details">
              <a href={`mailto:${profile.email}`}><span>Email</span>{profile.email}<ArrowUpRight /></a>
              <a href={profile.github} target="_blank" rel="noreferrer"><span>GitHub</span>View profile<Github /></a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer"><span>LinkedIn</span>Connect with me<Linkedin /></a>
              <div className="location"><span>Based in</span>India · Available remotely</div>
            </Reveal>
            <Reveal>
              <form className="contact-form" onSubmit={submitForm}>
                <input type="hidden" name="to_email" value={profile.email} />
                <div className="field-row"><label>Your name<input required minLength={2} name="from_name" placeholder="Jane Smith" /></label><label>Email address<input required type="email" name="reply_to" placeholder="jane@company.com" /></label></div>
                <label>Project type<select name="project_type" defaultValue=""><option value="" disabled>Select a service</option>{services.map(([,title]) => <option key={title}>{title}</option>)}</select></label>
                <label>Tell me about your project<textarea required minLength={20} name="message" rows={5} placeholder="A short overview, goals and timeline..." /></label>
                <button className="button primary submit" disabled={sending}>{sending ? "Sending..." : "Send enquiry"}<Send size={17} /></button>
                {formError && <p className="form-error">{formError}</p>}
                <AnimatePresence>{sent && <motion.div className="success-message" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><Check /> Message ready. I&apos;ll get back to you soon.</motion.div>}</AnimatePresence>
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <footer>
        <div><a className="logo" href="#top">MK<span>.</span></a><p>Flutter developer creating mobile products with clarity, craft and performance.</p></div>
        <div className="footer-links">{navItems.map(i => <a key={i} href={`#${i.toLowerCase()}`}>{i}</a>)}</div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Minhaj Khan</span><span>Designed & built with purpose.</span><a href="#top" aria-label="Back to top"><ChevronUp /></a></div>
      </footer>

      <AnimatePresence>{activeProject !== null && (
        <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveProject(null)}>
          <motion.article className="project-modal" initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }} onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveProject(null)} aria-label="Close"><X /></button>
            <span className="eyebrow"><i />{projects[activeProject].label}</span><h2>{projects[activeProject].title}</h2><p className="modal-summary">{projects[activeProject].summary}</p>
            <div className="modal-grid"><div><span>My contribution</span><p>{projects[activeProject].contribution}</p></div><div><span>Key features</span><ul>{projects[activeProject].features.map(f => <li key={f}><Check />{f}</li>)}</ul></div></div>
            <div className="tag-row">{projects[activeProject].stack.map(s => <span key={s}>{s}</span>)}</div>
            {projects[activeProject].screenshots ? (
              <div className="project-gallery" aria-label={`${projects[activeProject].title} screenshot gallery`}>
                {projects[activeProject].screenshots.map((screenshot, index) => (
                  <figure key={screenshot}>
                    <Image src={screenshot} alt={`${projects[activeProject].title} app screen ${index + 1}`} width={472} height={1024} sizes="(max-width: 640px) 72vw, 280px" />
                    <figcaption>{String(index + 1).padStart(2, "0")}</figcaption>
                  </figure>
                ))}
              </div>
            ) : <div className="gallery-placeholder"><div>{projects[activeProject].monogram}</div><p>Project gallery</p><span>Screenshots will appear here when available.</span></div>}
            {projects[activeProject].storeUrl ? <a className="button primary" href={projects[activeProject].storeUrl} target="_blank" rel="noreferrer">View on Play Store <ArrowUpRight /></a> : <span className="store-note">Public store link coming soon</span>}
          </motion.article>
        </motion.div>
      )}</AnimatePresence>
    </>
  );
}
