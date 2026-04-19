import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-grow flex items-center justify-center px-6 min-h-[70vh]">
      <div className="text-center flex flex-col items-center gap-8">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
          Signal Lost
        </span>
        <h1 className="font-headline text-[8rem] md:text-[12rem] font-black leading-none tracking-tighter text-on-surface opacity-10">
          404
        </h1>
        <p className="text-on-surface-variant text-lg font-light max-w-md -mt-4">
          The page you&apos;re looking for doesn&apos;t exist or has been
          relocated to a different frequency.
        </p>
        <Link
          href="/"
          className="mt-4 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-on-primary font-headline font-medium tracking-wide hover:scale-105 transition-transform duration-300 shadow-[0_0_60px_rgba(196,192,255,0.15)]"
        >
          Return to Base
        </Link>
      </div>
    </main>
  );
}
