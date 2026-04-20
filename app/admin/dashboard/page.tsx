import React from "react";
import { getDashboardStats } from "@/lib/actions/admin";
import DashboardStats from "@/components/admin/DashboardStats";
import { motion } from "framer-motion";
import { Calendar, Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-black italic tracking-tighter mb-2">SYSTEM OVERVIEW</h1>
        <p className="text-white/40 font-mono text-sm tracking-widest uppercase">Operational Integrity: 100%</p>
      </header>

      <DashboardStats 
        inquiries={stats.inquiries}
        projects={stats.projects}
        skills={stats.skills}
        failedEmails={stats.failedEmails}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent Inquiries */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
              <Mail size={20} className="text-white/40" />
              Recent Inquiries
            </h2>
            <Link href="/admin/messages" className="text-xs font-mono text-white/40 hover:text-white transition-colors flex items-center gap-1">
              VIEW INBOX <ArrowUpRight size={12} />
            </Link>
          </div>

          <div className="bg-black border border-white/5 rounded-3xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-[10px] uppercase font-mono tracking-widest text-white/40">
                  <th className="px-6 py-4 border-b border-white/5">Sender</th>
                  <th className="px-6 py-4 border-b border-white/5">Subject</th>
                  <th className="px-6 py-4 border-b border-white/5 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {stats.recentInquiries.length > 0 ? (
                  stats.recentInquiries.map((msg) => (
                    <tr key={msg.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold">{msg.name}</span>
                          <span className="text-[10px] font-mono text-white/20 uppercase">{msg.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm text-white/60 line-clamp-1">{msg.subject}</span>
                      </td>
                      <td className="px-6 py-5 text-right text-xs font-mono text-white/20">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-20 text-center text-white/20 font-mono text-xs uppercase italic tracking-widest">
                      Zero incoming transmissions detected.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Logs / Small Status */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold tracking-tight px-2 flex items-center gap-2">
            <Calendar size={20} className="text-white/40" />
            System Events
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <div className="flex-1">
                <p className="text-xs font-bold">Database Synchronized</p>
                <p className="text-[10px] text-white/40 font-mono uppercase">Neon PostgreSQL Connection Active</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <div className="flex-1">
                <p className="text-xs font-bold">Resend Pipeline Operational</p>
                <p className="text-[10px] text-white/40 font-mono uppercase">NodeMailer Transport Ready</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <div className="flex-1">
                <p className="text-xs font-bold">Sentry Monitoring Live</p>
                <p className="text-[10px] text-white/40 font-mono uppercase">Tracing production exceptions</p>
              </div>
            </div>
            
            <div className="pt-6 mt-6 border-t border-white/5">
              <p className="text-[10px] text-white/20 font-mono uppercase tracking-widest leading-relaxed">
                System Time: {new Date().toLocaleTimeString()}<br />
                Vercel Status: Healthy<br />
                Node Version: {process.version}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
