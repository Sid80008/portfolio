import { Project, Skill, Experience } from "@prisma/client";

// ... existing View type ...
type View = "home" | "skills" | "projects" | "experience" | "contact";

interface MasterPortfolioProps {
  initialProjects?: Project[];
  initialSkills?: Skill[];
  initialExperiences?: Experience[];
}

// ─── 1. PARTICLE FIELD ──────────────────────────────────────────────────────
// ... (Particles function remains same) ...

// ─── 2. CURSOR ──────────────────────────────────────────────────────────────
// ... (SiteCursor function remains same) ...

// ─── 3. VIEWS ────────────────────────────────────────────────────────────────
// ... (wrap function remains same) ...

// Home
// ... (HomeView remains same) ...

// Skills
function SkillsView({ skills }: { skills: Skill[] }) {
  // Group skills by category for better organization
  const groupedSkills = useMemo(() => {
    const groups: Record<string, Skill[]> = {};
    skills.forEach(s => {
      if (!groups[s.category]) groups[s.category] = [];
      groups[s.category].push(s);
    });
    return groups;
  }, [skills]);

  return wrap(
    <div className="min-h-[calc(100vh-80px)] px-6 md:px-16 py-16 max-w-7xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">The Arsenal</span>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 mt-2">Technical Mastery</h2>
        <p className="text-white/40 text-lg mb-12 max-w-2xl">
          A comprehensive overview of the specialized tools and languages I deploy.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(groupedSkills).map(([category, items], i) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col gap-6"
          >
            <h3 className="text-xl font-black uppercase tracking-widest text-white/80">{category.replace('_', ' ')}</h3>
            <div className="h-px w-full bg-white/10" />
            <ul className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <li key={skill.id} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-white/70">
                  {skill.name}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>,
    "skills"
  );
}

// Projects
function ProjectsView({ projects }: { projects: Project[] }) {
  return wrap(
    <div className="min-h-[calc(100vh-80px)] px-6 md:px-16 py-16 max-w-7xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">Selected Works</h2>
        <p className="text-white/40 text-lg mb-8 max-w-2xl">
          A curated intersection of deep engineering and premium visual design.
        </p>
      </motion.div>
      <Suspense fallback={<div className="animate-pulse py-20 text-center text-white/20 font-mono tracking-widest uppercase">Initializing Canvas...</div>}>
        <SearchParamsProvider>
          <ProjectGrid initialProjects={projects} />
        </SearchParamsProvider>
      </Suspense>
    </div>,
    "projects"
  );
}

// Experience
function ExperienceView({ experiences }: { experiences: Experience[] }) {
  return wrap(
    <div className="min-h-[calc(100vh-80px)] px-6 md:px-16 py-16 max-w-7xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">The Timeline</span>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 mt-2">Experience &amp; Evolution</h2>
        <p className="text-white/40 text-lg mb-12 max-w-2xl">
          A chronological mapping of my professional journey.
        </p>
      </motion.div>

      <div className="relative">
        <div className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-white/40 via-white/10 to-transparent" />
        <div className="flex flex-col gap-14 pl-10">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="relative"
            >
              <div className="absolute -left-[47px] top-5 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_white]" />
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md hover:border-white/30 transition-colors duration-500">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                  <h3 className="text-2xl font-black">{exp.title}</h3>
                  <span className="font-mono text-sm text-white/40">
                    {new Date(exp.startDate).getFullYear()} – {exp.current ? "Present" : exp.endDate ? new Date(exp.endDate).getFullYear() : ""}
                  </span>
                </div>
                <p className="text-white/50 leading-relaxed">{exp.description}</p>
                <div className="mt-4 text-xs font-mono text-white/20 uppercase tracking-widest">{exp.org}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>,
    "experience"
  );
}

// Contact
// ... (ContactView remains same) ...

// ─── 4. MASTER ENGINE ────────────────────────────────────────────────────────
export default function Home({ 
  initialProjects = [], 
  initialSkills = [], 
  initialExperiences = [] 
}: MasterPortfolioProps) {
  const [view, setView] = useState<View>("home");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-x-hidden cursor-none" style={{ fontFamily: "var(--font-space-grotesk, Inter, system-ui, sans-serif)" }}>
      <SiteCursor />

      {/* Persistent 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Particles isHovered={isHovered} />
        </Canvas>
      </div>

      {/* Nav */}
      <nav className="fixed top-0 w-full px-6 md:px-12 py-6 flex justify-between items-center z-50">
        <button onClick={() => setView("home")} className="text-xl font-black tracking-tighter hover:text-white/60 transition-colors">
          SID.
        </button>
        <div className="flex gap-4 md:gap-8 text-xs uppercase tracking-widest text-white/40">
          {(["home", "skills", "projects", "experience"] as View[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`hover:text-white transition-colors duration-300 ${view === v ? "text-white" : ""}`}
            >
              {v}
            </button>
          ))}
        </div>
        <button
          onClick={() => setView("contact")}
          className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${view === "contact" ? "bg-white text-black" : "border border-white/20 text-white/60 hover:border-white/60 hover:text-white"}`}
        >
          Hire Me
        </button>
      </nav>

      {/* Animated Views */}
      <main className="relative z-10 pt-20 w-full" onMouseEnter={view === "home" ? () => setIsHovered(true) : undefined} onMouseLeave={view === "home" ? () => setIsHovered(false) : undefined}>
        <AnimatePresence mode="wait">
          {view === "home" && <HomeView key="home" onNavigate={setView} onHover={setIsHovered} />}
          {view === "skills" && <SkillsView key="skills" skills={initialSkills} />}
          {view === "projects" && <ProjectsView key="projects" projects={initialProjects} />}
          {view === "experience" && <ExperienceView key="experience" experiences={initialExperiences} />}
          {view === "contact" && <ContactView key="contact" />}
        </AnimatePresence>
      </main>
    </div>
  );
}
