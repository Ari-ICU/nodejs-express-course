import React, { Suspense } from "react";
import { SlideView } from "@/components/slides/slide-view";

interface SlidesPageProps {
  searchParams: Promise<{
    module?: string;
    slide?: string;
  }>;
}

export default async function SlidesPage({ searchParams }: SlidesPageProps) {
  const params = await searchParams;
  const initialModule = params.module || "M01";
  const initialSlide = Number(params.slide) || 1;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#030509] flex items-center justify-center text-emerald-400 font-mono text-sm">
          Loading Slide Studio...
        </div>
      }
    >
      <SlideView initialModuleId={initialModule} initialSlideId={initialSlide} />
    </Suspense>
  );
}
