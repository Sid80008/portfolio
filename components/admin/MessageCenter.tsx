"use client";

import React, { useState } from "react";
import { 
  Mail, 
  Trash2, 
  Eye, 
  Archive, 
  ChevronLeft,
  Calendar,
  User,
  Globe,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Check
} from "lucide-react";
import { MessageStatus, DeliveryStatus, ContactMessage } from "@prisma/client";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

interface MessageCenterProps {
  initialMessages: ContactMessage[];
}

export default function MessageCenter({ initialMessages }: MessageCenterProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === initialMessages.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(initialMessages.map(m => m.id));
    }
  };

  const handleBulkAction = async (action: "READ" | "UNREAD" | "ARCHIVE" | "DELETE") => {
    if (selectedIds.length === 0) return;
    setIsProcessing(true);

    try {
      const method = action === "DELETE" ? "DELETE" : "PATCH";
      const resp = await fetch("/api/admin/messages/bulk", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds, action }),
      });

      if (resp.ok) {
        setSelectedIds([]);
        router.refresh();
      }
    } catch (err) {
      console.error("Bulk action failed", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className={`sticky top-4 z-[60] flex items-center justify-between p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl transition-all duration-500 ${selectedIds.length > 0 ? 'opacity-100 translate-y-0 shadow-[0_0_50px_rgba(255,255,255,0.05)]' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="flex items-center gap-6 pl-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">
                <span className="text-white font-black">{selectedIds.length}</span> Signals Selected
            </span>
            <div className="h-4 w-[1px] bg-white/10" />
            <button 
              onClick={toggleSelectAll}
              className="text-[10px] font-mono uppercase tracking-widest text-white/30 hover:text-white transition-colors"
            >
              {selectedIds.length === initialMessages.length ? "Deselect All" : "Select All"}
            </button>
        </div>

        <div className="flex items-center gap-2">
          <button 
            disabled={isProcessing}
            onClick={() => handleBulkAction("READ")}
            className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-mono uppercase tracking-widest transition-all border border-white/5 active:scale-95 disabled:opacity-50"
          >
            Mark Read
          </button>
          <button 
            disabled={isProcessing}
            onClick={() => handleBulkAction("ARCHIVE")}
            className="px-6 py-2 bg-white/5 hover:bg-blue-500/20 text-blue-400 rounded-xl text-[10px] font-mono uppercase tracking-widest transition-all border border-white/5 active:scale-95 disabled:opacity-50"
          >
            Archive
          </button>
          <button 
            disabled={isProcessing}
            onClick={() => handleBulkAction("DELETE")}
            className="px-6 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-[10px] font-mono uppercase tracking-widest transition-all border border-red-500/20 active:scale-95 disabled:opacity-50"
          >
            Eliminate
          </button>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {initialMessages.length === 0 ? (
          <div className="p-20 text-center bg-white/[0.02] border border-dashed border-white/10 rounded-[32px]">
            <Mail size={40} className="mx-auto mb-6 text-white/10" />
            <h3 className="text-xl font-bold text-white/40">Silence in the Wire</h3>
            <p className="text-white/20 text-sm mt-2 font-mono uppercase tracking-widest">No incoming signals detected</p>
          </div>
        ) : (
          initialMessages.map((msg) => (
            <div 
              key={msg.id} 
              onClick={() => toggleSelect(msg.id)}
              className={`group relative bg-[#0a0a0a] border ${selectedIds.includes(msg.id) ? 'border-white/40 bg-white/[0.05]' : (msg.status === MessageStatus.UNREAD ? 'border-white/20 bg-white/[0.03]' : 'border-white/10')} p-8 rounded-[28px] hover:border-white/30 transition-all duration-300 cursor-pointer`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                <div className="flex items-start gap-6 flex-grow">
                    {/* Checkbox Mask */}
                    <div className="mt-1">
                        <div className={`w-5 h-5 rounded-md border transition-all flex items-center justify-center ${selectedIds.includes(msg.id) ? 'bg-white border-white' : 'border-white/20 group-hover:border-white/40 bg-white/5'}`}>
                            {selectedIds.includes(msg.id) && <Check size={12} className="text-black" />}
                        </div>
                    </div>

                    <div className="flex-grow">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/10 group-hover:bg-white/10 transition-colors">
                          <User size={12} className="text-white/40" />
                          <span className="text-xs font-bold tracking-tight">{msg.name}</span>
                        </div>
                        <div className="text-white/20 text-[10px] font-mono tracking-widest uppercase">
                          {format(new Date(msg.createdAt), "MMM d, HH:mm")}
                        </div>
                        {msg.deliveryStatus === DeliveryStatus.SENT ? (
                            <div className="flex items-center gap-1.5 text-emerald-500/60 text-[10px] font-mono uppercase tracking-widest">
                                <CheckCircle2 size={10} /> Delivered
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5 text-red-500/60 text-[10px] font-mono uppercase tracking-widest">
                                <AlertCircle size={10} /> Transmission Failed
                            </div>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-black tracking-tight mb-2 uppercase">{msg.subject}</h3>
                      <p className="text-white/50 text-sm leading-relaxed mb-6 font-mono bg-white/[0.02] p-4 rounded-xl border border-white/5 line-clamp-2 group-hover:line-clamp-none transition-all">{msg.message}</p>
                      
                      <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-2 text-white/30 text-[10px] font-mono uppercase">
                          <Mail size={12} /> {msg.email}
                        </div>
                        <div className="flex items-center gap-2 text-white/30 text-[10px] font-mono uppercase">
                          <Globe size={12} /> {msg.ip || "Unknown IP"}
                        </div>
                      </div>
                    </div>
                </div>

                {/* Individual Actions (Only show if nothing selected) */}
                {selectedIds.length === 0 && (
                    <div className="flex lg:flex-col gap-2 shrink-0 self-center">
                        <button className="p-4 bg-white/5 hover:bg-white text-white hover:text-black rounded-2xl border border-white/10 transition-all duration-300">
                            <Eye size={18} />
                        </button>
                    </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
