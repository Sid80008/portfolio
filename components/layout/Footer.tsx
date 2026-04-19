import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full border-t border-surface-container-low bg-surface mt-auto relative z-20">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-8 py-12 max-w-7xl mx-auto gap-8">
        <div className="flex items-center gap-3 text-lg font-black text-on-surface font-headline tracking-tighter">
          <div className="relative w-6 h-6">
            <Image 
              src="/logo.png" 
              alt="Siddharth Logo" 
              fill 
              className="object-contain opacity-80" 
            />
          </div>
          Siddharth Umajwal
        </div>

        <div className="flex flex-wrap justify-center gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
          <Link href="https://github.com/siddharthumajwal" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline transition-all opacity-80 hover:opacity-100">
            GitHub
          </Link>
          <Link href="https://instagram.com/professional.sid" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline transition-all opacity-80 hover:opacity-100">
            Instagram
          </Link>
          <Link href="mailto:siddharthumajwal@gmail.com" className="hover:text-primary hover:underline transition-all opacity-80 hover:opacity-100">
            Email
          </Link>
        </div>

        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant text-center md:text-right opacity-80 hover:opacity-100 transition-opacity">
          © {new Date().getFullYear()} Siddharth Umajwal. Crafted with Cinematic Logic.
        </div>
      </div>
    </footer>
  );
}
