import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight, Download, Github, Linkedin, Mail, GraduationCap, BarChart3, Code2, Rocket,
  Copy, Check, ExternalLink, Menu, X, Send, Database, Terminal,
} from "lucide-react";
import photo from "@/assets/rohan.jpg.asset.json";
import { profile, skillGroups, education, projects } from "@/data/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rohan Borde — Software Developer Portfolio" },
      { name: "description", content: "Rohan Borde: Java & Python developer and CS student at JSPM Rajarshi Shahu College of Engineering (9.5 CGPA)." },
      { property: "og:title", content: "Rohan Borde — Software Developer Portfolio" },
      { property: "og:description", content: "Java & Python developer building practical software. Explore projects, skills and get in touch." },
    ],
  }),
  component: Index,
});

const NAV = ["home", "about", "skills", "education", "projects", "contact"];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return active;
}

function Typing({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[i % words.length] ?? "";
    const t = setTimeout(() => {
      if (!del && text === w) return setDel(true);
      if (del && text === "") { setDel(false); setI(i + 1); return; }
      setText(del ? w.slice(0, text.length - 1) : w.slice(0, text.length + 1));
    }, !del && text === w ? 1600 : del ? 40 : 80);
    return () => clearTimeout(t);
  }, [text, del, i, words]);
  return (
    <span className="font-mono text-primary">
      {text}<span className="caret">▍</span>
    </span>
  );
}

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (n: number) => {
        const p = Math.min((n - start) / 1400, 1);
        setV(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{v.toFixed(1)}</span>;
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <div className="reveal mb-12">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Index() {
  useReveal();
  const active = useActiveSection();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="grid-bg absolute inset-0" />
        <div className="animate-drift absolute -left-40 top-20 h-[28rem] w-[28rem] rounded-full bg-cyan/15 blur-3xl" />
        <div className="animate-drift absolute -right-40 top-1/2 h-[30rem] w-[30rem] rounded-full bg-violet/15 blur-3xl [animation-delay:-6s]" />
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="animate-drift absolute h-1 w-1 rounded-full bg-primary/60"
            style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`, animationDelay: `${-i}s`, animationDuration: `${10 + (i % 6) * 2}s` }} />
        ))}
      </div>

      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
        <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 sm:px-6">
          <a href="#home" className="font-display text-sm font-bold tracking-[0.25em]">
            ROHAN <span className="text-gradient">BORDE</span>
          </a>
          <ul className="hidden items-center gap-1 md:flex">
            {NAV.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className={`rounded-lg px-3 py-2 text-sm capitalize transition-colors ${active === id ? "bg-secondary text-primary" : "text-muted-foreground hover:text-foreground"}`}>{id}</a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="glow-cyan hidden rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 md:inline-block">Let's Connect</a>
          <button className="md:hidden" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </nav>
        {open && (
          <div className="glass mx-auto mt-2 max-w-6xl rounded-2xl p-3 md:hidden">
            {NAV.map((id) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className={`block rounded-lg px-3 py-2 capitalize ${active === id ? "text-primary" : "text-muted-foreground"}`}>{id}</a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="mt-2 block rounded-xl bg-primary px-3 py-2 text-center font-semibold text-primary-foreground">Let's Connect</a>
          </div>
        )}
      </header>

      <main>
        {/* Hero */}
        <section id="home" className="mx-auto grid min-h-screen max-w-6xl items-center gap-14 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[1.15fr_1fr]">
          <div className="reveal">
            <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" /><span className="relative h-2 w-2 rounded-full bg-success" /></span>
              Available for Opportunities
            </span>
            <p className="mt-6 text-lg text-muted-foreground">Hi, I'm <span className="font-semibold text-foreground">Rohan Borde.</span></p>
            <h1 className="mt-2 text-4xl font-bold leading-[1.05] sm:text-6xl">
              Building the Future, <span className="text-gradient">One Line of Code</span> at a Time.
            </h1>
            <p className="mt-5 h-7 text-lg"><span className="text-muted-foreground">&gt; </span><Typing words={profile.roles} /></p>
            <p className="mt-4 max-w-xl text-muted-foreground">
<<<<<<< HEAD
                I am A GAY
=======
            HII i am rohan i study at jspm and i am blue
>>>>>>> origin/main
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="glow-cyan group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition-transform hover:scale-[1.03]">
                Explore My Work <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href={profile.resumeUrl || "#contact"} {...(profile.resumeUrl ? { download: true } : {})}
                title={profile.resumeUrl ? undefined : "Resume coming soon — reach out via contact"}
                className="glass inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold transition-colors hover:text-primary">
                <Download className="h-4 w-4" /> Download Resume
              </a>
            </div>
            <div className="mt-8 flex gap-3">
              <SocialIcon href={profile.github} label="GitHub"><Github className="h-5 w-5" /></SocialIcon>
              <SocialIcon href={profile.linkedin} label="LinkedIn"><Linkedin className="h-5 w-5" /></SocialIcon>
              <SocialIcon href={`mailto:${profile.email}`} label="Email"><Mail className="h-5 w-5" /></SocialIcon>
            </div>
          </div>

          <div className="reveal relative mx-auto w-full max-w-sm">
            <div aria-hidden className="animate-spin-slow absolute -inset-8 rounded-full border border-dashed border-primary/30" />
            <div aria-hidden className="animate-spin-slow absolute -inset-16 rounded-full border border-accent/20 [animation-direction:reverse]" />
            <div aria-hidden className="bg-gradient-accent absolute inset-4 rounded-[2rem] opacity-40 blur-3xl" />
            <div className="glass relative rounded-[2rem] p-3">
              <img src={photo.url} alt="Portrait of Rohan Borde" width={1160} height={1355} loading="eager"
                className="aspect-[4/5] w-full rounded-[1.5rem] object-cover object-top" />
            </div>
            <Badge className="-left-6 top-10"><span className="text-gradient font-bold">9.5</span> CGPA</Badge>
            <Badge className="-right-6 top-1/2 [animation-delay:-2s]"><Terminal className="h-3.5 w-3.5 text-primary" /> Java | Python</Badge>
            <Badge className="-bottom-4 left-10 [animation-delay:-4s]"><Code2 className="h-3.5 w-3.5 text-accent" /> Developer</Badge>
          </div>
        </section>

        {/* About */}
        <Section id="about" eyebrow="01 · About" title={<>A Little <span className="text-gradient">About Me</span></>}>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div className="reveal space-y-4 text-lg text-muted-foreground">
              <p>I'm a student at <span className="text-foreground">{profile.college}</span>, with a strong interest in programming, software development, and database technologies.</p>
              <p>I enjoy learning new technologies, sharpening my problem-solving skills, and turning ideas into practical projects that solve real problems.</p>
              <div className="glass mt-6 inline-flex items-end gap-3 rounded-2xl px-6 py-5">
                <span className="font-display text-6xl font-bold text-gradient"><Counter to={profile.cgpa} /></span>
                <span className="pb-2 font-mono text-sm uppercase tracking-widest text-foreground">CGPA</span>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: GraduationCap, t: "Education", d: profile.college },
                { icon: BarChart3, t: "Academic Performance", d: "9.5 CGPA" },
                { icon: Code2, t: "Focus", d: "Software Development" },
                { icon: Rocket, t: "Interests", d: "Programming, Databases & Building Projects" },
              ].map(({ icon: I, t, d }) => (
                <div key={t} className="glass border-animated reveal rounded-2xl p-5 transition-transform hover:-translate-y-1">
                  <I className="h-6 w-6 text-primary" />
                  <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">{t}</p>
                  <p className="mt-1 font-medium">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Skills */}
        <Section id="skills" eyebrow="02 · Skills" title={<>My <span className="text-gradient">Tech Stack</span></>}>
          <div className="grid gap-6 md:grid-cols-2">
            {skillGroups.map((g) => (
              <div key={g.title} className="glass reveal rounded-3xl p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  {g.title.startsWith("Data") ? <Database className="h-5 w-5 text-accent" /> : <Terminal className="h-5 w-5 text-primary" />}
                  {g.title}
                </h3>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {g.items.map((s) => (
                    <div key={s.name} className="group border-animated flex flex-col items-center gap-3 rounded-2xl border bg-secondary/40 p-4 transition-all hover:-translate-y-1 hover:glow-cyan">
                      <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${s.icon}/${s.icon}-original.svg`} alt="" loading="lazy" className="h-10 w-10 transition-transform group-hover:scale-110" />
                      <span className="text-sm font-medium">{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Education */}
        <Section id="education" eyebrow="03 · Education" title={<>Academic <span className="text-gradient">Journey</span></>}>
          <div className="relative pl-10">
            <div aria-hidden className="bg-gradient-accent absolute bottom-0 left-3 top-0 w-px glow-cyan" />
            {education.map((e) => (
              <div key={e.institution} className="reveal relative">
                <span className="glow-cyan absolute -left-[2.4rem] top-6 grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground"><GraduationCap className="h-4 w-4" /></span>
                <div className="glass rounded-3xl p-6 sm:p-8">
                  <p className="font-mono text-xs text-muted-foreground">{e.period}</p>
                  <h3 className="mt-2 text-2xl font-semibold">{e.institution}</h3>
                  <p className="mt-1 text-muted-foreground">{e.degree}</p>
                  <span className="mt-4 inline-block rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">{e.cgpa}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Projects */}
        <Section id="projects" eyebrow="04 · Projects" title={<>Featured <span className="text-gradient">Projects</span></>}>
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((p, i) => <ProjectCard key={i} p={p} i={i} />)}
          </div>
          <a href={profile.github} target="_blank" rel="noreferrer" className="glass reveal mt-10 flex items-center justify-between gap-4 rounded-2xl p-5 transition-colors hover:text-primary">
            <span className="flex items-center gap-3"><Github className="h-6 w-6" /> See all my repositories on GitHub</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </Section>

        {/* Contact */}
        <Section id="contact" eyebrow="05 · Contact" title={<>Let's Build Something <span className="text-gradient">Great Together</span></>}>
          <p className="reveal -mt-6 mb-10 max-w-xl text-muted-foreground">Have an idea, opportunity, or project in mind? I'd love to connect.</p>
          <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
            <div className="space-y-4">
              <EmailCard />
              <ContactLink href={profile.github} icon={<Github className="h-5 w-5" />} label="GitHub" value="r0han8387254-ui" />
              <ContactLink href={profile.linkedin} icon={<Linkedin className="h-5 w-5" />} label="LinkedIn" value="rohan-borde" />
            </div>
            <ContactForm />
          </div>
        </Section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-medium">Designed & Built by Rohan Borde</p>
            <p className="mt-1 text-sm text-muted-foreground">© {new Date().getFullYear()} · <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary glow-cyan" /> Always Learning</span></p>
          </div>
          <nav className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {NAV.map((id) => <a key={id} href={`#${id}`} className="capitalize hover:text-primary">{id}</a>)}
          </nav>
          <div className="flex gap-3">
            <SocialIcon href={profile.github} label="GitHub"><Github className="h-5 w-5" /></SocialIcon>
            <SocialIcon href={profile.linkedin} label="LinkedIn"><Linkedin className="h-5 w-5" /></SocialIcon>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Badge({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`glass animate-float absolute flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium ${className}`}>{children}</div>;
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={label}
      className="glass grid h-11 w-11 place-items-center rounded-xl transition-all hover:-translate-y-0.5 hover:text-primary hover:glow-cyan">
      {children}
    </a>
  );
}

function ProjectCard({ p, i }: { p: (typeof projects)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => ref.current && (ref.current.style.transform = "")}
      className="glass border-animated reveal flex flex-col rounded-3xl p-4 transition-transform duration-200">
      <div className="grid-bg relative grid aspect-video place-items-center overflow-hidden rounded-2xl border bg-secondary/50">
        <span className="font-mono text-4xl font-bold text-gradient">0{i + 1}</span>
        <span className="absolute bottom-2 right-3 font-mono text-[10px] text-muted-foreground">screenshot placeholder</span>
      </div>
      <h3 className="mt-5 text-xl font-semibold">{p.title}</h3>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {p.tags.map((t) => <span key={t} className="rounded-full border px-2.5 py-0.5 font-mono text-xs text-primary">{t}</span>)}
      </div>
      <div className="mt-5 flex gap-2">
        {p.github ? (
          <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-2 text-sm hover:text-primary"><Github className="h-4 w-4" /> Code</a>
        ) : <span className="rounded-lg border border-dashed px-3 py-2 text-xs text-muted-foreground">Repo link coming soon</span>}
        {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground"><ExternalLink className="h-4 w-4" /> Live</a>}
      </div>
    </div>
  );
}

function EmailCard() {
  const [copied, setCopied] = useState(false);
  return (
    <div className="glass reveal flex items-center gap-4 rounded-2xl p-5">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary"><Mail className="h-5 w-5" /></span>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">Email</p>
        <a href={`mailto:${profile.email}`} className="block truncate font-medium hover:text-primary">{profile.email}</a>
      </div>
      <button aria-label="Copy email" onClick={() => { navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1800); }}
        className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary hover:text-primary">
        {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}

function ContactLink({ href, icon, label, value }: { href: string; icon: ReactNode; label: string; value: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="glass reveal flex items-center gap-4 rounded-2xl p-5 transition-colors hover:text-primary">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">{icon}</span>
      <div className="min-w-0 flex-1"><p className="text-xs text-muted-foreground">{label}</p><p className="truncate font-medium">{value}</p></div>
      <ExternalLink className="h-4 w-4 shrink-0" />
    </a>
  );
}

function ContactForm() {
  const [errors, setErrors] = useState<Partial<Record<"name" | "email" | "subject" | "message", string>>>({});
  const [status, setStatus] = useState("");
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as { name: string; email: string; subject: string; message: string };
    const errs: Partial<Record<"name" | "email" | "subject" | "message", string>> = {};
    if (!f.name?.trim()) errs.name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(f.email ?? "")) errs.email = "Please enter a valid email";
    if (!f.subject?.trim()) errs.subject = "Please add a subject";
    if ((f.message ?? "").trim().length < 10) errs.message = "Message should be at least 10 characters";
    setErrors(errs);
    if (Object.keys(errs).length) { setStatus(""); return; }
    const body = `${f.message}\n\n— ${f.name} (${f.email})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(f.subject)}&body=${encodeURIComponent(body)}`;
    setStatus("Your email app should now open with the message ready — just press send there.");
  };
  const field = "w-full rounded-xl border bg-input/40 px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none";
  return (
    <form onSubmit={submit} noValidate className="glass reveal space-y-4 rounded-3xl p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name}><input name="name" className={field} placeholder="Your name" /></Field>
        <Field label="Email" error={errors.email}><input name="email" type="email" className={field} placeholder="you@example.com" /></Field>
      </div>
      <Field label="Subject" error={errors.subject}><input name="subject" className={field} placeholder="What's this about?" /></Field>
      <Field label="Message" error={errors.message}><textarea name="message" rows={5} className={field} placeholder="Tell me about your idea..." /></Field>
      <button type="submit" className="glow-cyan inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition-transform hover:scale-[1.01]">
        <Send className="h-4 w-4" /> Send Message
      </button>
      {status && <p role="status" className="text-sm text-success">{status}</p>}
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string | undefined; children: ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium">{label}</span>
      {children}
      {error && <span className="block text-xs text-destructive">{error}</span>}
    </label>
  );
}
