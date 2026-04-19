import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-grow flex items-center justify-center relative overflow-hidden pt-24 pb-12 px-6">
      {/* Atmospheric Depth Gradient */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
        style={{ background: "radial-gradient(circle at 50% 50%, #4f319c 0%, transparent 50%)", filter: "blur(100px)" }}
      ></div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-center min-h-[716px]">
        <div className="max-w-4xl relative">
          {/* Highlight line */}
          <div className="absolute -left-6 top-4 bottom-4 w-1 bg-gradient-to-b from-primary to-transparent opacity-50 rounded-full"></div>
          
          <h1 className="font-headline text-5xl md:text-7xl lg:text-[100px] leading-[0.9] tracking-tighter font-bold text-on-surface mb-6">
            Siddharth<br/>
            <span className="text-gradient">Umajwal</span>
          </h1>
          
          <div className="flex items-center gap-4 mt-8">
            <div className="h-[1px] w-12 bg-outline-variant"></div>
            <p className="font-mono text-sm md:text-base text-on-surface-variant uppercase tracking-widest">
              Creative Technologist <span className="text-primary mx-2">|</span> Freelancer <span className="text-primary mx-2">|</span> Athlete
            </p>
          </div>
          
          <p className="mt-12 text-lg md:text-xl text-on-surface-variant max-w-2xl font-body leading-relaxed border-l-2 border-surface-container-highest pl-6">
            Crafting cinematic digital experiences through rigorous logic and avant-garde expression. Blending deep technical precision with atmospheric narrative design.
          </p>
          
          <div className="mt-16 flex flex-col sm:flex-row gap-6 items-start">
            <Link href="/projects" className="bg-gradient-to-r from-primary to-secondary text-on-primary px-8 py-4 rounded-full font-headline font-medium tracking-wide flex items-center gap-2 hover:scale-105 transition-transform duration-300 shadow-[0_0_60px_rgba(196,192,255,0.15)]">
              Explore Work
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
            <Link href="/experience" className="px-8 py-4 rounded-full font-headline font-medium tracking-wide flex items-center gap-2 text-on-surface bg-surface-container-high border border-outline-variant/15 backdrop-blur-xl hover:bg-surface-container-highest transition-colors duration-300">
              <span className="material-symbols-outlined text-sm">play_arrow</span>
              View Experience
            </Link>
          </div>
        </div>
        
        {/* Asymmetric image element */}
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 bg-surface-container-low rounded-xl border border-outline-variant/10 overflow-hidden shadow-[0_0_80px_rgba(228,225,233,0.02)]">
          <Image 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRJnojj5iNZ8uKA-KYfrYVrEaWaQ65bEt4d8v-dGz0hkcWnNLJqdFxsZgrn5W4-I0psk32jNpMdtSaRFJKKKc1K9hmpa4BS-1dTmWdwjF1Ff9Cgaht4833jUZaOWW9EouRgWw6CUPmfqGxGau8Lyh1zLcfOxbemgyUg6tiqYOdFlXiMlo1-qldzmKzmle4X0_nuLG4ecWdI4pmUFHbGuVGsnEb58zSjxFJRxN8iP8S0zw9m_Cb3Ja9yjao20hNzMnZej-hKcycC-Oa" 
            alt="Abstract creative technology visual" 
            fill
            unoptimized
            className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" 
          />
        </div>
      </div>
    </main>
  );
}
