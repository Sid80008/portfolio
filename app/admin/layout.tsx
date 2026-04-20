"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Mail, 
  Briefcase, 
  Cpu, 
  LogOut, 
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { signout } from "@/lib/actions/admin";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Messages", href: "/admin/messages", icon: Mail },
  { name: "Portfolio", href: "/admin/portfolio", icon: Briefcase },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-black flex flex-col z-20">
        <div className="p-8 flex items-center gap-3">
          <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-black rounded-lg text-xs italic">S.</div>
          <span className="font-black tracking-tighter text-lg italic">CONSOLE</span>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between group px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-white text-black" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={18} />
                  <span className="text-sm font-bold tracking-tight">{item.name}</span>
                </div>
                {!isActive && <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 space-y-2 pb-8">
          <Link 
            href="/" 
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 text-white/40 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest"
          >
            <ExternalLink size={14} />
            View Site
          </Link>
          <button 
            onClick={() => signout()}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500/60 hover:text-red-500 transition-colors text-xs font-mono uppercase tracking-widest"
          >
            <LogOut size={14} />
            Disconnect
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Subtle background visual */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none" />
        <div className="p-10 relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
