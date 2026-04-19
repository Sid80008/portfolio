"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

const filters = [
  { label: "All", value: "all" },
  { label: "Web Apps", value: "web" },
  { label: "Design Software", value: "app" },
  { label: "Open Source", value: "open-source" },
];

export default function FilterBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentFilter = searchParams.get("filter") || "all";

  const setFilter = (filter: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("filter", filter);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap gap-3 mb-12">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => setFilter(f.value)}
          className={cn(
            "relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors cursor-none overflow-hidden",
            currentFilter === f.value ? "text-white" : "text-white/60 hover:text-white border border-white/5 bg-white/5"
          )}
        >
          {currentFilter === f.value && (
            <motion.div
              layoutId="filter-indicator"
              className="absolute inset-0 bg-accent rounded-full -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 font-mono tracking-tight">{f.label}</span>
        </button>
      ))}
    </div>
  );
}
