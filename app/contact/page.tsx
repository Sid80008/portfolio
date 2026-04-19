"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setSubmitStatus("success");
      reset();
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-grow pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col lg:flex-row gap-24 items-start">
        {/* Left Column: Context */}
        <div className="flex flex-col gap-8 lg:w-1/2 md:sticky md:top-32">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Transmission</span>
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-on-surface leading-[0.9]">
            Let&apos;s build<br />something<br />exceptional.
          </h1>
          <p className="text-on-surface-variant text-lg font-light leading-relaxed max-w-md mt-4">
            Whether it&apos;s a complex web application, a cinematic promotional site, or a scalable backend architecture—reach out.
          </p>

          <div className="flex flex-col gap-6 mt-8 border-t border-outline-variant/30 pt-8">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-outline">mail</span>
              <a href="mailto:siddharthumajwal@gmail.com" className="font-mono text-sm text-on-surface hover:text-primary transition-colors">siddharthumajwal@gmail.com</a>
            </div>
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-outline">call</span>
              <a href="tel:+918000819558" className="font-mono text-sm text-on-surface hover:text-primary transition-colors">+91 8000819558</a>
            </div>
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-outline">photo_camera</span>
              <a href="https://instagram.com/professional.sid" target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-on-surface hover:text-primary transition-colors">@professional.sid</a>
            </div>
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-outline">location_on</span>
              <span className="font-mono text-sm text-on-surface">NIT Hamirpur, India / Remote</span>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="w-full lg:w-1/2 bg-surface-container-low border border-outline-variant/20 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle at top right, #c4c0ff 0%, transparent 60%)" }}></div>

          <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 flex flex-col gap-8 w-full">
            {/* Honeypot — invisible to users, catches bots */}
            <input
              type="text"
              name="website"
              autoComplete="off"
              tabIndex={-1}
              className="absolute opacity-0 h-0 w-0 pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative group">
              <input
                type="text"
                id="name"
                {...register("name")}
                className="w-full bg-transparent border-b-2 border-outline-variant/30 py-4 text-on-surface focus:outline-none focus:border-primary transition-colors peer"
                placeholder=" "
              />
              <label htmlFor="name" className="absolute left-0 top-4 text-on-surface-variant text-lg transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-primary pointer-events-none">Name</label>
              {errors.name && <p className="text-error text-xs mt-2">{errors.name.message}</p>}
            </div>

            <div className="relative group">
              <input
                type="email"
                id="email"
                {...register("email")}
                className="w-full bg-transparent border-b-2 border-outline-variant/30 py-4 text-on-surface focus:outline-none focus:border-primary transition-colors peer"
                placeholder=" "
              />
              <label htmlFor="email" className="absolute left-0 top-4 text-on-surface-variant text-lg transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-primary pointer-events-none">Email</label>
              {errors.email && <p className="text-error text-xs mt-2">{errors.email.message}</p>}
            </div>

            <div className="relative group">
              <input
                type="text"
                id="subject"
                {...register("subject")}
                className="w-full bg-transparent border-b-2 border-outline-variant/30 py-4 text-on-surface focus:outline-none focus:border-primary transition-colors peer"
                placeholder=" "
              />
              <label htmlFor="subject" className="absolute left-0 top-4 text-on-surface-variant text-lg transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-primary pointer-events-none">Subject</label>
              {errors.subject && <p className="text-error text-xs mt-2">{errors.subject.message}</p>}
            </div>

            <div className="relative group mt-4">
              <textarea
                id="message"
                rows={4}
                {...register("message")}
                className="w-full bg-transparent border-b-2 border-outline-variant/30 py-4 text-on-surface focus:outline-none focus:border-primary transition-colors peer resize-none"
                placeholder=" "
              ></textarea>
              <label htmlFor="message" className="absolute left-0 top-4 text-on-surface-variant text-lg transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-primary pointer-events-none">Message Requirements</label>
              {errors.message && <p className="text-error text-xs mt-2">{errors.message.message}</p>}
            </div>

            {submitStatus === "success" && (
              <p className="text-secondary text-sm">Message transmitted successfully. I will reach out soon.</p>
            )}
            {submitStatus === "error" && (
              <p className="text-error text-sm">Transmission failed. Please try again or use direct email.</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="self-start mt-4 px-10 py-4 bg-primary text-on-primary font-headline font-semibold rounded-full hover:bg-secondary hover:text-on-secondary transition-colors duration-300 shadow-[0_0_30px_rgba(196,192,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Transmitting..." : "Initiate Link"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
