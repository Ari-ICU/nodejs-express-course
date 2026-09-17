import React, { Suspense } from "react";
import { SlideView } from "@/components/slides/slide-view";

export default function SlidesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center text-emerald-700 font-mono text-sm">
          Loading Slide Studio...
        </div>
      }
    >
      <SlideView />
    </Suspense>
  );
}

