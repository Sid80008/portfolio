import React from "react";
import { PrismaClient } from "@prisma/client";
import { 
  Plus, 
  Trash2, 
  RefreshCw, 
  Layers, 
  Database
} from "lucide-react";
import { syncFromStatic, deleteProject, deleteSkill } from "@/lib/actions/admin";

const prisma = new PrismaClient();

export default async function AdminPortfolioPage() {
  const [projects, skills] = await Promise.all([
    prisma.project.findMany({ orderBy: { order: "asc" } }),
    prisma.skill.findMany({ orderBy: { category: "asc" } }),
  ]);

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter mb-2">PORTFOLIO ENGINE</h1>
          <p className="text-white/40 font-mono text-sm tracking-widest uppercase">Managing dynamic resource nodes</p>
        </div>
        <form action={syncFromStatic}>
          <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white hover:text-black transition-all text-xs font-bold uppercase tracking-widest group">
            <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-700" />
            Sync from Static Data
          </button>
        </form>
      </header>

      {/* Projects Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-center px-2">
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <Layers size={20} className="text-white/40" />
            Live Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-black border border-white/5 rounded-3xl overflow-hidden group">
              <div className="h-40 bg-white/5 relative flex items-center justify-center">
                 <span className="text-[10px] font-mono text-white/10 uppercase tracking-[0.4em] transform -rotate-12 select-none">
                   {project.category}
                 </span>
                 <div className="absolute top-4 right-4 flex gap-2">
                   <form action={deleteProject.bind(null, project.id)}>
                     <button className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
                       <Trash2 size={12} />
                     </button>
                   </form>
                 </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold mb-1">{project.title}</h3>
                <p className="text-xs text-white/40 line-clamp-2 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-[9px] font-mono text-white/40 uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          
          <button className="border-2 border-dashed border-white/5 rounded-3xl p-10 flex flex-col items-center justify-center gap-4 text-white/20 hover:text-white hover:border-white/20 transition-all group">
            <div className="p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">
              <Plus size={24} />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest">Register New Project</span>
          </button>
        </div>
      </section>

      {/* Skills Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight px-2 flex items-center gap-2">
          <Database size={20} className="text-white/40" />
          Technical Arsenal
        </h2>
        <div className="bg-black border border-white/5 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 divide-x divide-y divide-white/5">
            {skills.map((skill) => (
              <div key={skill.id} className="p-6 group hover:bg-white/[0.02] transition-colors relative">
                <p className="text-[10px] font-mono text-white/20 uppercase mb-2">{skill.category}</p>
                <h4 className="text-sm font-bold">{skill.name}</h4>
                <form action={deleteSkill.bind(null, skill.id)} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 text-red-500 hover:bg-red-500/10 rounded transition-colors">
                    <Trash2 size={10} />
                  </button>
                </form>
              </div>
            ))}
            <button className="p-6 flex flex-col items-center justify-center gap-2 text-white/10 hover:text-white/40 transition-colors">
              <Plus size={16} />
              <span className="text-[10px] font-mono uppercase tracking-widest">Add Skill</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
