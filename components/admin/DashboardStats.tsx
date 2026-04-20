import React from "react";
import { 
  Users, 
  Briefcase, 
  Cpu, 
  AlertCircle,
  TrendingUp,
  Activity
} from "lucide-react";

interface StatsProps {
  inquiries: number;
  projects: number;
  skills: number;
  failedEmails: number;
}

export default function DashboardStats({ inquiries, projects, skills, failedEmails }: StatsProps) {
  const cards = [
    { 
      name: "Total Inquiries", 
      value: inquiries, 
      icon: Users, 
      color: "text-white",
      bg: "bg-white/5",
      trend: "+12% this week" 
    },
    { 
      name: "Live Projects", 
      value: projects, 
      icon: Briefcase, 
      color: "text-green-500",
      bg: "bg-green-500/5",
      trend: "Synced to DB"
    },
    { 
      name: "Tech Arsenal", 
      value: skills, 
      icon: Cpu, 
      color: "text-blue-500",
      bg: "bg-blue-500/5",
      trend: "Top Stack"
    },
    { 
      name: "Transmission Failures", 
      value: failedEmails, 
      icon: AlertCircle, 
      color: failedEmails > 0 ? "text-red-500" : "text-white/20",
      bg: failedEmails > 0 ? "bg-red-500/5" : "bg-white/5",
      trend: failedEmails > 0 ? "Check Resend Logs" : "Zero errors"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div key={card.name} className="bg-black border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${card.bg}`} />
          
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-1">{card.name}</p>
              <h3 className="text-3xl font-black italic">{card.value}</h3>
            </div>
            <div className={`p-3 rounded-xl border border-white/5 ${card.bg} ${card.color}`}>
              <card.icon size={20} />
            </div>
          </div>
          
          <div className="mt-6 flex items-center gap-2 relative z-10">
            <Activity size={12} className="text-white/20" />
            <p className="text-[10px] font-mono text-white/40 uppercase tracking-tighter">{card.trend}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
