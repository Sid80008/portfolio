import React from "react";
export const dynamic = 'force-dynamic';
import prisma from "@/lib/db";
import Link from "next/link";
import { 
  ProjectCategory, 
  MessageStatus 
} from "@prisma/client";
import { 
  LayoutDashboard, 
  Mail, 
  FolderKanban, 
  Code2, 
  History,
  ArrowUpRight,
  ShieldCheck,
  Zap
} from "lucide-react";

async function getStats() {
  const [projectCount, messageCount, unreadMessages, featuredProjects] = await Promise.all([
    prisma.project.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { status: MessageStatus.UNREAD } }),
    prisma.project.count({ where: { featured: true } }),
  ]);

  return { projectCount, messageCount, unreadMessages, featuredProjects };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const navItems = [
    { name: "Portfolio", icon: FolderKanban, href: "/admin/portfolio", desc: "Manage projects, skills and experience", color: "text-blue-400" },
    { name: "Messages", icon: Mail, href: "/admin/messages", desc: "Inbox for contact form submissions", color: "text-amber-400", count: stats.unreadMessages },
    { name: "Settings", icon: ShieldCheck, href: "/admin/settings", desc: "System and security configuration", color: "text-emerald-400" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 lg:p-12 font-sans selection:bg-white/10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
              <LayoutDashboard size={20} className="text-white/60" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/30">Administrative Core</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter">DASHBOARD</h1>
        </div>
        
        <div className="flex gap-4">
            <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-end">
                <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-1">Status</span>
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-tighter">System Nominal</span>
                </div>
            </div>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard title="Projects" value={stats.projectCount} sub={`${stats.featuredProjects} Featured`} icon={Code2} />
        <StatCard title="Total Inquiries" value={stats.messageCount} sub={`${stats.unreadMessages} Unread`} icon={Mail} highlight={stats.unreadMessages > 0} />
        <StatCard title="Uptime" value="99.9%" sub="Verified" icon={Zap} />
        <StatCard title="Last Activity" value="Active" sub="Just now" icon={History} />
      </div>

      {/* Main Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {navItems.map((item) => (
          <Link key={item.name} href={item.href} className="group relative">
            <div className="absolute inset-0 bg-white/5 rounded-[32px] blur-2xl group-hover:bg-white/10 transition-all duration-500 opacity-0 group-hover:opacity-100" />
            <div className="relative bg-[#0a0a0a] border border-white/10 p-10 rounded-[32px] h-full flex flex-col hover:border-white/20 transition-all duration-500">
              <div className={`mb-8 w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center ${item.color}`}>
                <item.icon size={28} />
              </div>
              <h2 className="text-2xl font-bold mb-3 tracking-tight flex items-center gap-2">
                {item.name}
                {item.count ? (
                    <span className="bg-amber-500/10 text-amber-500 text-[10px] px-2 py-0.5 rounded-full border border-amber-500/20">
                        {item.count}
                    </span>
                ) : null}
              </h2>
              <p className="text-white/40 text-sm leading-relaxed mb-8 flex-grow">{item.desc}</p>
              <div className="flex items-center text-[10px] font-mono uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                Configure Module <ArrowUpRight size={14} className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <footer className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-[0.4em] text-white/20">
          <div>Sid. Operations — Admin Unit v1.0.0</div>
          <div className="flex gap-8">
              <a href="/" className="hover:text-white transition-colors">Surface Web</a>
              <a href="#" className="hover:text-white transition-colors">Logs</a>
          </div>
      </footer>
    </div>
  );
}

function StatCard({ title, value, sub, icon: Icon, highlight = false }: any) {
  return (
    <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-[24px] hover:border-white/20 transition-all group">
      <div className="flex items-start justify-between mb-6">
        <div className={`text-[10px] font-mono uppercase tracking-widest ${highlight ? 'text-amber-400' : 'text-white/30'}`}>{title}</div>
        <Icon size={18} className="text-white/10" />
      </div>
      <div className="text-3xl font-black tracking-tighter mb-1">{value}</div>
      <div className="text-[10px] text-white/20 font-bold uppercase tracking-tighter">{sub}</div>
    </div>
  );
}
