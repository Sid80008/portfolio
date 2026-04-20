import React from "react";
import prisma from "@/lib/db";
import { 
  Mail, 
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import MessageCenter from "@/components/admin/MessageCenter";

async function getMessages() {
  return await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function AdminMessages() {
  const messages = await getMessages();

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 lg:p-12 selection:bg-white/10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <Link href="/admin/dashboard" className="flex items-center gap-2 text-white/30 hover:text-white transition-colors text-[10px] font-mono uppercase tracking-[0.2em] mb-4">
            <ChevronLeft size={12} /> Return to Core
          </Link>
          <h1 className="text-4xl font-black tracking-tighter uppercase">Signal Inbox</h1>
          <p className="text-white/40 text-sm mt-2 font-mono uppercase tracking-widest">User Communications / Security Logs</p>
        </div>
        
        <div className="flex gap-4">
            <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-end">
                <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-1">Total Signals</span>
                <span className="text-xl font-bold text-white">{messages.length}</span>
            </div>
        </div>
      </header>

      {/* Interactive Message Center */}
      <MessageCenter initialMessages={messages} />

      <footer className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-[0.4em] text-white/20">
          <div>Sid. Operations — Admin Unit v1.1.0</div>
          <div>Synchronized with Neural Database</div>
      </footer>
    </div>
  );
}
