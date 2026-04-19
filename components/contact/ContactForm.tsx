"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          subject: `New Inquiry from ${data.name}`,
        }),
      });

      if (response.ok) {
        setStatus("success");
        reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 relative">
          <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest pl-1">Name</label>
          <input
            {...register("name")}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 focus:bg-white/10 transition-all cursor-none"
            placeholder="John Doe"
          />
          {errors.name && <p className="text-destructive text-xs mt-1 absolute -bottom-5 left-1">{errors.name.message}</p>}
        </div>
        <div className="space-y-2 relative">
          <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest pl-1">Email</label>
          <input
            {...register("email")}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 focus:bg-white/10 transition-all cursor-none"
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-destructive text-xs mt-1 absolute -bottom-5 left-1">{errors.email.message}</p>}
        </div>
      </div>
      
      <div className="space-y-2 pt-2 relative">
        <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest pl-1">Message</label>
        <textarea
          {...register("message")}
          rows={5}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 focus:bg-white/10 transition-all cursor-none resize-none"
          placeholder="How can we help you?"
        />
        {errors.message && <p className="text-destructive text-xs mt-1 absolute -bottom-5 left-1">{errors.message.message}</p>}
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="w-full bg-accent hover:bg-white hover:text-black text-white font-medium py-4 rounded-xl flex items-center justify-center gap-3 transition-colors duration-300 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed cursor-none"
        >
          {status === "loading" && <Loader2 className="animate-spin" size={20} />}
          {status === "success" && <CheckCircle2 size={20} />}
          {status === "idle" && <Send size={20} />}
          {status === "error" && <Send size={20} />}
          
          {status === "loading" ? "Sending..." : status === "success" ? "Sent Successfully" : "Send Message"}
        </button>
      </div>

      {status === "error" && (
        <p className="text-destructive text-sm text-center">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
