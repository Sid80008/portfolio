"use client";

import { experienceData } from "@/lib/data/experience";
import TimelineNode from "./TimelineNode";

export default function Timeline() {
  return (
    <div className="relative max-w-5xl mx-auto py-12">
      <div className="relative z-10 w-full">
        {experienceData.map((node, i) => (
          <TimelineNode key={node.id} data={node} index={i} />
        ))}
      </div>
    </div>
  );
}
