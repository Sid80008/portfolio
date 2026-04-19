import { Code2, Briefcase, MessageCircle, Mail } from "lucide-react";

export default function SocialLinks() {
  const socials = [
    { icon: <Code2 size={20} />, href: "#", name: "GitHub" },
    { icon: <Briefcase size={20} />, href: "#", name: "LinkedIn" },
    { icon: <MessageCircle size={20} />, href: "#", name: "Twitter" },
    { icon: <Mail size={20} />, href: "mailto:hello@example.com", name: "Email" },
  ];

  return (
    <div className="flex gap-4">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 cursor-none"
          aria-label={social.name}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}
