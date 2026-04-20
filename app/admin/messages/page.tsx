import React from "react";
import { PrismaClient } from "@prisma/client";
import { Mail, CheckCircle, Trash2, AlertTriangle, Eye } from "lucide-react";
import { updateMessageStatus, deleteMessage } from "@/lib/actions/admin";

const prisma = new PrismaClient();

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter mb-2">INBOX</h1>
          <p className="text-white/40 font-mono text-sm tracking-widest uppercase">
            {messages.length} total transmissions received
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`group bg-black border ${msg.status === 'UNREAD' ? 'border-white/20' : 'border-white/5'} p-6 rounded-3xl transition-all hover:bg-white/[0.02] relative`}
          >
            {msg.status === 'UNREAD' && (
              <div className="absolute top-6 right-6 w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]" />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="space-y-1">
                 <p className="text-xs font-mono text-white/20 uppercase tracking-widest">Sender</p>
                 <h4 className="text-lg font-bold">{msg.name}</h4>
                 <p className="text-sm text-white/40">{msg.email}</p>
                 <div className="mt-4 flex items-center gap-2">
                   <span className={`px-2 py-0.5 rounded text-[10px] font-mono border uppercase ${
                     msg.deliveryStatus === 'SENT' ? 'border-green-500/20 text-green-500 bg-green-500/5' :
                     msg.deliveryStatus === 'FAILED' ? 'border-red-500/20 text-red-500 bg-red-500/5' :
                     'border-yellow-500/20 text-yellow-500 bg-yellow-500/5'
                   }`}>
                     Email: {msg.deliveryStatus}
                   </span>
                 </div>
              </div>

              <div className="lg:col-span-2 space-y-4">
                <div>
                  <p className="text-xs font-mono text-white/20 uppercase tracking-widest mb-1">Inquiry</p>
                  <h5 className="text-sm font-bold text-white/80">{msg.subject}</h5>
                </div>
                <p className="text-sm text-white/60 leading-relaxed font-serif italic text-lg">
                  "{msg.message}"
                </p>
              </div>

              <div className="flex flex-col lg:items-end justify-between">
                <span className="text-[10px] font-mono text-white/20 uppercase">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
                
                <div className="flex gap-2 mt-6 lg:mt-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <form action={updateMessageStatus.bind(null, msg.id, 'READ')}>
                    <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white hover:text-black transition-all flex items-center gap-2 text-xs font-bold">
                      <CheckCircle size={14} />
                      {msg.status === 'UNREAD' ? 'MARK READ' : 'ARCHIVE'}
                    </button>
                  </form>
                  <form action={deleteMessage.bind(null, msg.id)}>
                    <button className="p-3 bg-red-500/5 border border-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                      <Trash2 size={14} />
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {msg.errorMessage && (
              <div className="mt-6 pt-6 border-t border-white/5 flex items-start gap-3 text-red-400">
                <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                <p className="text-[10px] font-mono uppercase tracking-wider leading-relaxed">
                  SYSTEM LOG: {msg.errorMessage}
                </p>
              </div>
            )}
          </div>
        ))}

        {messages.length === 0 && (
          <div className="py-40 text-center space-y-4">
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto text-white/20">
              <Mail size={32} />
            </div>
            <p className="text-white/20 font-mono text-xs uppercase italic tracking-widest">
              Zero incoming transmissions detected in the archive.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
