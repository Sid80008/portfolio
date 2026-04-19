import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Siddharth Umajwal — BTech student at NIT Hamirpur, freelance graphic designer, athlete, and creative technologist.",
};

export default function AboutPage() {
  return (
    <main className="flex-grow pt-32 pb-24 px-6 max-w-7xl mx-auto w-full flex flex-col gap-32">
      {/* Section 1: Personal Story */}
      <section className="relative flex flex-col gap-8 md:w-3/4">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">The Origin</span>
        <h1 className="font-headline text-[2.75rem] md:text-[3.5rem] leading-tight font-semibold tracking-[-0.02em] text-on-surface">
          Crafting logic out of chaos.<br/>
          <span className="text-gradient">A cinematic approach to code.</span>
        </h1>
        <div className="flex flex-col gap-6 text-lg text-on-surface-variant font-light max-w-2xl leading-relaxed">
          <p>
            I am Siddharth Umajwal, a BTech student at NIT Hamirpur. My journey isn&apos;t just about writing scripts; it&apos;s about staging experiences. I believe that engineering without aesthetic intent is just mechanics, and design without logic is just decoration.
          </p>
          <p>
            Here, in the intersection of deep technical rigor and high-end visual execution, is where I build. Every line of code is a frame in a larger narrative.
          </p>
        </div>
      </section>

      {/* Section 2: Education */}
      <section className="flex flex-col gap-12">
        <div className="flex items-center gap-4">
          <span className="h-[1px] w-12 bg-outline-variant/30"></span>
          <h2 className="font-headline text-2xl font-medium tracking-tight text-on-surface">Academic Trajectory</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          <div className="bg-surface-container-low p-8 rounded-lg flex flex-col gap-6 group hover:bg-surface-container-high transition-colors duration-500 ease-out">
            <div className="flex justify-between items-start">
              <h3 className="font-headline text-xl font-medium text-on-surface">National Institute of Technology, Hamirpur</h3>
              <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">account_balance</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-mono text-sm text-secondary">Bachelor of Technology</span>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Immersed in the foundational theories of computer science while aggressively pursuing modern architectural paradigms.
              </p>
            </div>
            <div className="mt-auto pt-4 flex gap-3 flex-wrap">
              <span className="bg-surface-container-highest px-3 py-1 rounded-full font-mono text-xs text-on-surface-variant">Algorithms</span>
              <span className="bg-surface-container-highest px-3 py-1 rounded-full font-mono text-xs text-on-surface-variant">System Design</span>
            </div>
          </div>
          <div className="hidden md:block"></div>
        </div>
      </section>

      {/* Section 3: Sports Identity */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10 rounded-3xl"></div>
        <div className="flex flex-col md:flex-row gap-12 items-center bg-surface-container-low/70 backdrop-blur-xl border border-outline-variant/15 p-8 md:p-12 rounded-xl">
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-secondary">Beyond the Screen</span>
            <h2 className="font-headline text-3xl font-medium tracking-tight text-on-surface">The Athletic Edge</h2>
            <p className="text-on-surface-variant text-base leading-relaxed">
              The discipline of the field directly translates to the discipline of the IDE. Athletics forged my understanding of endurance, iterative improvement, and performance under pressure. It&apos;s not a hobby; it&apos;s the physical manifestation of my drive.
            </p>
            <div className="flex gap-4 mt-2">
              <span className="material-symbols-outlined text-2xl text-primary">directions_run</span>
              <span className="material-symbols-outlined text-2xl text-primary">fitness_center</span>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-64 md:h-96 rounded-lg overflow-hidden bg-surface-container-highest relative">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDYhHHvDMFyD-o7cUACG8taniRbkoQrvJEuS1W6Or8GSBVk-bKJfilGclsAlOVSRbnkQOVk9FH-5lxVPXRYKXeZIrYG75DAvkWlf8a3VBlkxO30eJtEBvcUYULsQqhZBtY6SA0XTv6lEJ-Ijk-6f8aTPYRmeQ7mdo1PwDtqlR7hB8GvtJS-ECOIjx7ZTDPV6vV0hrFaMFWj2MoGVpbn3VOqKpVwwq-kFT_I0oX4Wa440StOhe0YcczkyA3mY7paQMf5cFzkMY-jfyh" 
              alt="Athletic discipline" 
              fill
              unoptimized
              className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" 
            />
          </div>
        </div>
      </section>

      {/* Section 4: Photo Gallery */}
      <section className="flex flex-col gap-12">
        <h2 className="font-headline text-2xl font-medium tracking-tight text-on-surface text-center">Visual Narrative</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          <div className="col-span-2 row-span-2 rounded-lg overflow-hidden bg-surface-container-low relative group">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWwb7AcQ4H8lRyeBLcp_RaET0MEbI-47_UYHHaEdw1m4DjSrvmpbv_AwXnxUCMz0WjnJn5irv26anPHO_ibdzc2nGJKNBYlY6MuMSaoT0W7BFLINFmeQ8igeN0RVB1xeRIhMq4hm15JF-Ljp8I_WkY0aHSxpwV9aU-KhArrvOAHPJXKF6B_sHp785zWzKSZoWA9Jeb_vK1lmBQWpQN2qf_Opu5FT4RrAJ3kN-l4K_Zgx0VdGIIRVWtq_pj6pTywwFZ3vU1kon_mL2y" 
              alt="Workspace" 
              fill
              unoptimized
              className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500" 
            />
            <div className="absolute bottom-4 left-4 font-mono text-xs text-on-surface bg-surface-container-highest/80 px-2 py-1 rounded backdrop-blur-sm">Workspace</div>
          </div>
          <div className="rounded-lg overflow-hidden bg-surface-container-low relative group">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh7whwTHWzWTCCsc8dzkVT0VhQQ8wus-x9YS0cfJPezla999jlVZI6cXBxrvREnrboeqbszJSRXEIvngsuZfjDNm7vtm2Cgyr30gaJrBhiTf4aPye4HuuXBSRxxVCoT9Bjyk29_hzi7-hiQBgTgrkT1NIl8poh4ObQnHiEROoH6nHfBrmV-YbAL2vgi53_OO5Hre_FG5YGjZZfMBsoJnQxSjlJGCxVfmyz0allMY10S2JGOP86FApsnclyDnMB0nQLU4rGXn9D0clG" 
              alt="Abstract code" 
              fill
              unoptimized
              className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500" 
            />
          </div>
          <div className="rounded-lg overflow-hidden bg-surface-container-low relative group">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGT7ImYwcacgBZlWiobYHjfQpmo7wUv9h6t2krW4rb-Eob_-rsUjHd2Z1Yw4ueb7yDdXnKOaYCTh9iBmAzjWpakJKn7KdeIC9IGjEwmB6q2fCGU2yljXliHoOnL-z_YkD2Qp1CiNU9gjMPR-nOPPKS3c5rYAyEgu2bb8bQyM98lqnPB_eFnuy02h3nL9WtIMedu8RrY9BrEdWoLEOMTSZ4wjsdv4Zv2ziEOD3E7r1HQv4_Wmr6p2Q9PH-L-ONJu2_Oywieoj7EaQ7l" 
              alt="Architecture" 
              fill
              unoptimized
              className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500" 
            />
          </div>
          <div className="col-span-2 rounded-lg overflow-hidden bg-surface-container-low relative group">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuARNvmqN7Dm3d0E9Km6pjH2fPj6xDyjK1zI3EnDwGyGKUJc7Rfpi_iHWxX710orPWvCsxVOLtbpErhYk8l3YgFHybpluvpbQZMhELUw_rpNeG8GO5waCOw51UtFVFW4ypRJNIQg5CdpD3JdMqUnkff4yT9WIpghrEm7WemcPBeWzApxmCNcY3eyW-O9cs8rVaAqfRp-hyDMFkTuxK-1ZBs9EpOOGLEgqGahP3-QiQwUeilE9U1gHnhoyriemX4sQD8wrb60j4P33Q5S" 
              alt="Retro tech" 
              fill
              unoptimized
              className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500" 
            />
          </div>
        </div>
      </section>
    </main>
  );
}
