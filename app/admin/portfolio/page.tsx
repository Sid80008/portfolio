import React from "react";
export const dynamic = 'force-dynamic';
import prisma from "@/lib/db";
import { 
  ProjectCategory, 
  SkillCategory 
} from "@prisma/client";
import { 
  FolderKanban, 
  Plus, 
  ChevronLeft,
  Settings,
  Package,
  Layers,
  GraduationCap,
  ExternalLink,
  Trophy,
  Pencil,
  Trash2
} from "lucide-react";
import Link from "next/link";

async function getPortfolioData() {
  const [projects, skills, experience] = await Promise.all([
    prisma.project.findMany({ orderBy: { order: "asc" } }),
    prisma.skill.findMany({ orderBy: { category: "asc", order: "asc" } }),
    prisma.experience.findMany({ orderBy: { order: "asc" } }),
  ]);
  return { projects, skills, experience };
}

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default async function AdminPortfolio() {
  const { projects, skills, experience } = await getPortfolioData();

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 lg:p-12 mb-20 selection:bg-white/10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <Link href="/admin/dashboard" className="flex items-center gap-2 text-white/30 hover:text-white transition-colors text-[10px] font-mono uppercase tracking-[0.2em] mb-4">
            <ChevronLeft size={12} /> Return to Core
          </Link>
          <h1 className="text-4xl font-black tracking-tighter">PORTFOLIO MGT</h1>
          <p className="text-white/40 text-sm mt-2 font-mono uppercase tracking-widest">Content Orchestration Layer</p>
        </div>
        
        <button className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/90 active:scale-95 transition-all">
          <Plus size={16} /> New Asset
        </button>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* Projects Column */}
        <div className="xl:col-span-12">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-500/20">
                        <Package size={16} className="text-blue-400" />
                    </div>
                    <h2 className="text-2xl font-black italic tracking-tight">PROJECTS</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="bg-[#0a0a0a] border border-white/10 rounded-[28px] overflow-hidden group hover:border-white/30 transition-all duration-300">
                        <div className="h-40 bg-white/5 relative overflow-hidden">
                            {project.imageUrl && (
                                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" />
                            )}
                            <div className="absolute top-4 right-4 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                                <button className="p-2 bg-black/60 backdrop-blur-md rounded-lg text-white hover:text-blue-400 transition-colors"><Pencil size={14} /></button>
                                <button className="p-2 bg-black/60 backdrop-blur-md rounded-lg text-white hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                            </div>
                            <div className="absolute top-4 left-4">
                                <span className="bg-blue-500/10 text-blue-400 text-[9px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 rounded-md border border-blue-500/20 backdrop-blur-sm">
                                    {project.category}
                                </span>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-lg font-bold mb-2 tracking-tight line-clamp-1">{project.title}</h3>
                            <p className="text-white/40 text-xs line-clamp-2 mb-6 font-mono">{project.description}</p>
                            <div className="flex items-center gap-4 text-white/20">
                                {project.liveUrl && <ExternalLink size={14} className="hover:text-blue-400 transition-colors cursor-pointer" />}
                                {project.githubUrl && <GithubIcon size={14} />}
                                {project.featured && <Trophy size={14} className="text-amber-500/40" />}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Skills & Experience Row */}
        <div className="xl:col-span-5">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center border border-emerald-500/20">
                    <GraduationCap size={16} className="text-emerald-400" />
                </div>
                <h2 className="text-2xl font-black italic tracking-tight uppercase">Skills</h2>
            </div>
            
            <div className="bg-[#0a0a0a] border border-white/10 rounded-[32px] p-8 space-y-8">
                {Object.values(SkillCategory).map((cat) => {
                    const catSkills = skills.filter(s => s.category === cat);
                    if (catSkills.length === 0) return null;
                    return (
                        <div key={cat} className="space-y-4">
                            <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/20">{cat}</h4>
                            <div className="flex flex-wrap gap-2">
                                {catSkills.map(skill => (
                                    <span key={skill.id} className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl flex items-center gap-2 group hover:bg-white/10 transition-colors">
                                        {skill.name}
                                        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-white/40 hover:text-white"><Pencil size={10}/></button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

        <div className="xl:col-span-7">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center border border-purple-500/20">
                    <Layers size={16} className="text-purple-400" />
                </div>
                <h2 className="text-2xl font-black italic tracking-tight uppercase">Experience</h2>
            </div>

            <div className="space-y-4">
                {experience.map((exp) => (
                    <div key={exp.id} className="bg-[#0a0a0a] border border-white/10 p-6 rounded-[24px] hover:border-white/20 transition-all flex items-center justify-between group">
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-white/5 rounded-xl flex flex-col items-center justify-center text-white/20 font-black italic leading-none group-hover:bg-white group-hover:text-black transition-all">
                                <span className="text-[10px]">{exp.startDate.getFullYear()}</span>
                            </div>
                            <div>
                                <h3 className="font-bold tracking-tight">{exp.title}</h3>
                                <div className="flex items-center gap-2 text-[10px] font-mono text-white/30 uppercase tracking-widest mt-1">
                                    <span>{exp.org}</span>
                                    {exp.current && <span className="text-emerald-500/60">• Present</span>}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"><Pencil size={14} /></button>
                            <button className="p-3 bg-white/5 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors"><Trash2 size={14} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      <footer className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-[0.4em] text-white/20">
          <div>Sid. Operations — Admin Unit v1.0.0</div>
          <div>Synchronized with Neural Database</div>
      </footer>
    </div>
  );
}
