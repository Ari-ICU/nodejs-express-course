"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Play,
  CheckCircle2,
  Bookmark,
  FileText,
  Layers,
  Terminal,
  Maximize2,
  Minimize2,
  ArrowLeft,
  Code2
} from "lucide-react";
import { COURSE_MODULES, CourseModule, LessonTopic } from "@/data/curriculum";
import { CodeBlock } from "@/components/ui/code-block";
import { MdxContent } from "@/components/ui/mdx-content";
import { useMdxContent } from "@/hooks/useMdxContent";
import { SlideNavOverlay } from "./slide-nav-overlay";
import { FieldNotes } from "./field-notes";
import { DeploymentAnim } from "./deployment-anim";
import { MiddlewarePipeline } from "@/components/visualizers/middleware-pipeline";
import { EventLoopVisualizer } from "@/components/visualizers/event-loop-visualizer";
import {
  getStoredProgress,
  saveProgress,
  CourseProgress,
} from "@/lib/storage";

interface SlideViewProps {
  initialModuleId?: string;
  initialSlideId?: number;
}

export const SlideView: React.FC<SlideViewProps> = ({
  initialModuleId = "M01",
  initialSlideId = 1,
}) => {
  const [currentModuleId, setCurrentModuleId] = useState<string>(initialModuleId);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(
    Math.max(0, initialSlideId - 1)
  );
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progressData, setProgressData] = useState<CourseProgress>({
    completedTopics: [],
    completedOutcomes: [],
    bookmarks: [],
    lastVisited: { moduleId: "M01", slideId: 1 },
  });

  const activeModule: CourseModule =
    COURSE_MODULES.find((m) => m.id === currentModuleId) || COURSE_MODULES[0];

  const totalSlides = activeModule.topics.length;
  const safeSlideIndex = Math.min(Math.max(0, currentSlideIndex), totalSlides - 1);
  const activeTopic: LessonTopic =
    activeModule.topics[safeSlideIndex] || activeModule.topics[0];

  // Load progress
  useEffect(() => {
    const loaded = getStoredProgress();
    setProgressData(loaded);
  }, []);

  // Update URL and lastVisited
  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("module", currentModuleId);
      url.searchParams.set("slide", String(safeSlideIndex + 1));
      window.history.replaceState({}, "", url.toString());

      const updated = {
        ...progressData,
        lastVisited: { moduleId: currentModuleId, slideId: safeSlideIndex + 1 },
      };
      saveProgress(updated);
    }
  }, [currentModuleId, safeSlideIndex, progressData]);

  // Next & Prev Slide Handlers
  const handlePrevSlide = useCallback(() => {
    if (safeSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    } else {
      const currentModIdx = COURSE_MODULES.findIndex(
        (m) => m.id === currentModuleId
      );
      if (currentModIdx > 0) {
        const prevMod = COURSE_MODULES[currentModIdx - 1];
        setCurrentModuleId(prevMod.id);
        setCurrentSlideIndex(prevMod.topics.length - 1);
      }
    }
  }, [safeSlideIndex, currentModuleId]);

  const handleNextSlide = useCallback(() => {
    if (safeSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    } else {
      const currentModIdx = COURSE_MODULES.findIndex(
        (m) => m.id === currentModuleId
      );
      if (currentModIdx < COURSE_MODULES.length - 1) {
        const nextMod = COURSE_MODULES[currentModIdx + 1];
        setCurrentModuleId(nextMod.id);
        setCurrentSlideIndex(0);
      }
    }
  }, [safeSlideIndex, totalSlides, currentModuleId]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isNavOpen || isNotesOpen) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevSlide();
      } else if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        handleNextSlide();
      } else if (e.key === "Escape") {
        setIsNavOpen(false);
        setIsNotesOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevSlide, handleNextSlide, isNavOpen, isNotesOpen]);

  // Bookmark Toggle
  const toggleBookmark = () => {
    const topicId = activeTopic.id;
    const isBookmarked = progressData.bookmarks.includes(topicId);
    const newBookmarks = isBookmarked
      ? progressData.bookmarks.filter((id) => id !== topicId)
      : [...progressData.bookmarks, topicId];

    const updated = { ...progressData, bookmarks: newBookmarks };
    setProgressData(updated);
    saveProgress(updated);
  };

  // Mark Completed
  const toggleCompleted = () => {
    const topicId = activeTopic.id;
    const isDone = progressData.completedTopics.includes(topicId);
    const newCompleted = isDone
      ? progressData.completedTopics.filter((id) => id !== topicId)
      : [...progressData.completedTopics, topicId];

    const updated = { ...progressData, completedTopics: newCompleted };
    setProgressData(updated);
    saveProgress(updated);
  };

  const isCompleted = progressData.completedTopics.includes(activeTopic.id);
  const isBookmarked = progressData.bookmarks.includes(activeTopic.id);

  // Load the MDX content for the current slide
  const topicNum = String(safeSlideIndex + 1).padStart(2, "0");
  const { Content: MdxSlideContent, loading: mdxLoading } = useMdxContent(
    currentModuleId,
    topicNum
  );

  // Fullscreen toggle
  const toggleFullscreenMode = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-emerald-500/20 selection:text-emerald-900">
      {/* 72px Top Header with light frosted styling */}
      <header className="h-[72px] bg-white/90 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-40 px-4 sm:px-8 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-4">
          <Link
            href="/modules"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-mono transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline font-medium">Back to Curriculum</span>
          </Link>

          {/* Chapter Selector Button with 'មេរៀនបច្ចុប្បន្ន' status */}
          <button
            onClick={() => setIsNavOpen(true)}
            className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer transition-all group shadow-2xs"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase font-bold text-emerald-700">
                  {activeModule.id} · មេរៀនបច្ចុប្បន្ន
                </span>
              </div>
              <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors block truncate max-w-[200px] sm:max-w-[340px]">
                {activeModule.title}
              </span>
            </div>
            <Layers className="w-4 h-4 text-slate-400 group-hover:text-slate-600 ml-1" />
          </button>
        </div>

        {/* Center Progress Indicators (Animated dots) */}
        <div className="hidden lg:flex items-center gap-1.5">
          {activeModule.topics.map((t, idx) => {
            const isActive = idx === safeSlideIndex;
            const isDone = progressData.completedTopics.includes(t.id);

            return (
              <button
                key={t.id}
                onClick={() => setCurrentSlideIndex(idx)}
                title={`Jump to ${t.title}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  isActive
                    ? "w-8 bg-emerald-600 shadow-xs"
                    : isDone
                    ? "w-2.5 bg-emerald-400"
                    : "w-2 bg-slate-200 hover:bg-slate-300"
                }`}
              />
            );
          })}
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleCompleted}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer shadow-2xs ${
              isCompleted
                ? "bg-emerald-50 text-emerald-700 border-emerald-300 font-bold"
                : "bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isCompleted ? "Completed" : "Mark Done"}
            </span>
          </button>

          <button
            onClick={toggleBookmark}
            className={`p-2 rounded-xl border text-xs transition-all cursor-pointer shadow-2xs ${
              isBookmarked
                ? "bg-amber-50 text-amber-700 border-amber-300"
                : "bg-white border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            }`}
            title="Bookmark this slide"
          >
            <Bookmark className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsNotesOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-mono cursor-pointer transition-colors shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline font-medium">Field Notes</span>
          </button>

          <button
            onClick={toggleFullscreenMode}
            className="p-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-900 cursor-pointer transition-colors hidden sm:block shadow-2xs"
            title="Toggle fullscreen"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </header>

      {/* Main Slide Presentation Stage (1800px Centered Container on clean white background) */}
      <main className="flex-1 max-w-[1800px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-8 flex flex-col justify-center">
        {/* 45/55 Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start min-h-[640px]">
          {/* Left Panel (45% -> 5 cols on 12-grid) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Module and Topic Tag */}
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold tracking-tight shadow-2xs">
                  {activeModule.id} · TOPIC {activeTopic.number}
                </span>
                <span className="text-xs font-mono uppercase text-slate-500 px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                  {activeTopic.type}
                </span>
              </div>

              {/* Title & Khmer Subtitle */}
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 leading-tight">
                {activeTopic.title}
              </h1>
              <p className="text-sm sm:text-base font-semibold text-emerald-700 mt-1.5 font-sans leading-relaxed">
                {activeTopic.khmerTitle}
              </p>

              {/* Main Narrative Explanation (rendered as rich Markdown) */}
              <div className="mt-4">
                <MdxContent content={activeTopic.summary} />
              </div>
            </div>
          </div>

          {/* Right Panel (55% -> 7 cols on 12-grid) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {activeModule.id === "M28" && safeSlideIndex === 0 ? (
              <DeploymentAnim accent="#10b981" />
            ) : activeModule.id === "M08" && safeSlideIndex === 0 ? (
              <MiddlewarePipeline />
            ) : activeModule.id === "M04" && safeSlideIndex === 3 ? (
              <EventLoopVisualizer />
            ) : MdxSlideContent && !mdxLoading ? (
              /* ── MDX rendered content (summary prose + Shiki code block) ── */
              <div className="mdx-slide-content rounded-2xl border border-slate-700/60 bg-[#0d1117] overflow-hidden shadow-lg">
                {/* Filename bar */}
                <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161b22] border-b border-slate-700/60">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="font-mono text-slate-300 text-xs font-medium ml-1">
                    {activeModule.id.toLowerCase()}-topic-{activeTopic.number}.{activeTopic.codeLanguage === "bash" ? "sh" : activeTopic.codeLanguage || "js"}
                  </span>
                </div>
                <div className="mdx-slide-body">
                  <MdxSlideContent />
                </div>
              </div>
            ) : (
              /* ── Fallback: static CodeBlock while MDX loads ── */
              <div className="space-y-4">
                <CodeBlock
                  code={activeTopic.codeSnippet}
                  language={activeTopic.codeLanguage || "javascript"}
                  filename={`${activeModule.id.toLowerCase()}-topic-${activeTopic.number}.${activeTopic.codeLanguage === "bash" ? "sh" : "js"}`}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Floating Bottom Navigation Bar */}
      <footer className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-xl border-t border-slate-200 py-3 px-4 sm:px-8 shadow-xs">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          <button
            onClick={handlePrevSlide}
            className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800 flex items-center justify-center cursor-pointer transition-all active:scale-95 shadow-xs"
            title="Previous slide (Left Arrow)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Slide Indicator & Quick Help */}
          <div className="flex flex-col items-center">
            <span className="text-xs sm:text-sm font-mono font-bold text-slate-900">
              Slide {safeSlideIndex + 1} of {totalSlides}
            </span>
            <span className="text-[11px] font-mono text-slate-500 hidden sm:block">
              Use ← / → keys or Space to advance
            </span>
          </div>

          <button
            onClick={handleNextSlide}
            className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center cursor-pointer transition-all active:scale-95 shadow-sm hover:shadow"
            title="Next slide (Right Arrow / Space)"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>
      </footer>

      {/* Chapter Selection Overlay Modal */}
      <SlideNavOverlay
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        currentModuleId={currentModuleId}
        onSelectModule={(modId) => {
          setCurrentModuleId(modId);
          setCurrentSlideIndex(0);
        }}
        completedTopics={progressData.completedTopics}
      />

      {/* Persistent Field Notes Drawer */}
      <FieldNotes
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        currentModuleId={currentModuleId}
        currentSlideNumber={safeSlideIndex + 1}
        topicTitle={activeTopic.title}
      />
    </div>
  );
};
