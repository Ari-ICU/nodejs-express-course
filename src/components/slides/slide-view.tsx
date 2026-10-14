"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Bookmark,
  FileText,
  Layers,
  Maximize2,
  Minimize2,
  ArrowLeft,
} from "lucide-react";
import { COURSE_MODULES, CourseModule, LessonTopic } from "@/data/curriculum";
import { CodeBlock } from "@/components/ui/code-block";
import { MdxContent } from "@/components/ui/mdx-content";
import { useMdxContent } from "@/hooks/useMdxContent";
import { SlideNavOverlay } from "./slide-nav-overlay";
import { FieldNotes } from "./field-notes";
import { DeploymentAnim } from "./deployment-anim";
import { getAssetUrl, resolveCodeFilename } from "@/lib/utils";
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
  const searchParams = useSearchParams();
  const queryModule = searchParams.get("module");
  const querySlide = searchParams.get("slide");

  const [currentModuleId, setCurrentModuleId] = useState<string>(
    queryModule || initialModuleId
  );
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(
    Math.max(0, (querySlide ? Number(querySlide) : initialSlideId) - 1)
  );

  useEffect(() => {
    if (queryModule && queryModule !== currentModuleId) {
      setCurrentModuleId(queryModule);
    }
    if (querySlide) {
      const idx = Math.max(0, Number(querySlide) - 1);
      if (idx !== currentSlideIndex) {
        setCurrentSlideIndex(idx);
      }
    }
  }, [queryModule, querySlide]);
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

  // Load the MDX metadata & code for the current slide
  const topicNum = String(safeSlideIndex + 1).padStart(2, "0");
  const { meta: mdxMeta } = useMdxContent(currentModuleId, topicNum);

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
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col selection:bg-emerald-500/20 selection:text-emerald-900 relative">
      {/* ── Ambient Background Lighting ── */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[360px] bg-gradient-to-b from-emerald-500/5 via-teal-500/3 to-transparent blur-3xl rounded-full" />
        <div className="absolute top-1/3 -right-32 w-[420px] h-[420px] bg-emerald-500/3 blur-3xl rounded-full" />
      </div>

      {/* ── 68px Top Header with Frosted Glass ── */}
      <header className="h-[68px] bg-white/90 backdrop-blur-xl border-b border-slate-200/90 sticky top-0 z-40 px-4 sm:px-8 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/modules"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/90 text-slate-700 hover:text-slate-900 text-xs font-mono transition-all shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline font-medium font-sans">ត្រឡប់ទៅមាតិកាវគ្គសិក្សា (Curriculum)</span>
          </Link>

          {/* Chapter Selector Button with 'មេរៀនបច្ចុប្បន្ន' status */}
          <button
            onClick={() => setIsNavOpen(true)}
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 cursor-pointer transition-all group shadow-2xs"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono uppercase font-bold text-emerald-700 tracking-wider">
                  {activeModule.id} · មេរៀនបច្ចុប្បន្ន
                </span>
              </div>
              <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors block truncate max-w-[220px] sm:max-w-[420px]">
                {activeModule.title}
              </span>
            </div>
            <Layers className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 ml-1" />
          </button>
        </div>

        {/* Center Progress Indicators (Animated dots) */}
        <div className="hidden lg:flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60 shadow-2xs">
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
                    ? "w-7 bg-emerald-600 shadow-xs"
                    : isDone
                    ? "w-2.5 bg-emerald-400 hover:bg-emerald-500"
                    : "w-2 bg-slate-300 hover:bg-slate-400"
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
                : "bg-white border-slate-200/90 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline font-sans">
              {isCompleted ? "បានបញ្ចប់ (Completed)" : "សម្គាល់ថាបានរៀន (Mark Done)"}
            </span>
          </button>

          <button
            onClick={toggleBookmark}
            className={`p-2 rounded-xl border text-xs transition-all cursor-pointer shadow-2xs ${
              isBookmarked
                ? "bg-amber-50 text-amber-700 border-amber-300"
                : "bg-white border-slate-200/90 text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            }`}
            title="Bookmark this slide"
          >
            <Bookmark className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsNotesOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 hover:border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-mono cursor-pointer transition-colors shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline font-medium font-sans">កំណត់ចំណាំ (Field Notes)</span>
          </button>

          <button
            onClick={toggleFullscreenMode}
            className="p-2 rounded-xl bg-white border border-slate-200/90 hover:border-slate-300 text-slate-500 hover:text-slate-900 cursor-pointer transition-colors hidden sm:block shadow-2xs"
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

      {/* ── Main Slide Presentation Stage ── */}
      <main className="flex-1 max-w-[1780px] w-full mx-auto px-4 sm:px-8 lg:px-10 py-5 sm:py-7 flex flex-col justify-start">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Panel: Narrative, Explanations, Tables */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-sm p-6 sm:p-8 shadow-[0_4px_24px_rgba(15,23,42,0.03)] hover:border-slate-300/80 transition-all">
            <div>
              {/* Module and Topic Tag */}
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-mono font-bold tracking-tight shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  {activeModule.id} · TOPIC {activeTopic.number}
                </span>
                <span className="inline-flex items-center text-xs font-sans font-medium text-slate-600 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200/80">
                  {activeTopic.type === "lab"
                    ? "ការអនុវត្ត (Lab)"
                    : activeTopic.type === "architecture"
                    ? "ស្ថាបត្យកម្ម (Architecture)"
                    : "គោលគំនិត (Concept)"}
                </span>
              </div>

              {/* Title & Khmer Subtitle Banner */}
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 leading-tight">
                {activeTopic.title}
              </h1>
              <div className="mt-2.5 mb-4 px-3.5 py-2 rounded-xl bg-emerald-50/70 border-l-3 border-emerald-600 text-sm sm:text-base font-semibold text-emerald-900 font-sans leading-relaxed">
                {activeTopic.khmerTitle}
              </div>

              {/* Main Narrative Explanation — sourced from MDX meta.summary */}
              <div className="mt-2">
                <MdxContent content={mdxMeta?.summary ?? activeTopic.summary ?? ""} />
              </div>
            </div>
          </div>

          {/* Right Panel: Sticky Code Block or Visual Stage */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col space-y-4 lg:sticky lg:top-24">
            {(mdxMeta?.imageUrl || activeTopic.imageUrl) ? (
              <div className="relative group rounded-3xl border border-slate-700/60 bg-[#0d1117] overflow-hidden shadow-2xl flex flex-col items-center justify-center p-4 sm:p-8 min-h-[460px]">
                <div className="absolute top-3 left-4 flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="font-sans text-xs text-slate-400 ml-2">គំនិតរូបភាព (Visual Concept)</span>
                </div>
                <img
                  src={getAssetUrl(mdxMeta?.imageUrl || activeTopic.imageUrl)}
                  alt={activeTopic.title}
                  className="rounded-2xl max-h-[440px] w-auto max-w-full object-contain shadow-2xl transition-transform duration-300 group-hover:scale-[1.01]"
                />
              </div>
            ) : activeModule.id === "M28" && safeSlideIndex === 0 ? (
              <DeploymentAnim accent="#10b981" />
            ) : (
              <div className="space-y-4">
                <CodeBlock
                  code={mdxMeta?.codeSnippet || activeTopic.codeSnippet || "// Loading lesson code..."}
                  language={activeTopic.codeLanguage || mdxMeta?.codeLanguage || "javascript"}
                  filename={resolveCodeFilename(
                    mdxMeta?.codeSnippet || activeTopic.codeSnippet,
                    mdxMeta?.filename || activeTopic.filename,
                    activeTopic.title,
                    activeTopic.codeLanguage || mdxMeta?.codeLanguage,
                    activeModule.id,
                    activeTopic.number
                  )}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ── Floating Bottom Navigation Dock ── */}
      <footer className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 py-3 px-4 sm:px-8 shadow-xs">
        <div className="max-w-[1780px] mx-auto flex items-center justify-between">
          {/* Previous Button */}
          <button
            onClick={handlePrevSlide}
            className="group h-11 px-4 sm:px-5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 hover:text-slate-900 flex items-center gap-2 cursor-pointer transition-all active:scale-95 shadow-2xs"
            title="ស្លាយមុន (Previous slide)"
          >
            <ChevronLeft className="w-5 h-5 text-slate-500 group-hover:text-slate-800 transition-transform group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline text-xs font-bold font-sans">ស្លាយមុន (Prev)</span>
          </button>

          {/* Center Slide Indicator & Progress Bar */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-sans font-bold text-slate-900">
                ស្លាយទី {safeSlideIndex + 1} <span className="text-slate-400 font-normal">/</span> {totalSlides}
              </span>
              <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200/80 text-[10px] font-mono text-slate-500">
                <kbd className="font-semibold text-slate-700">Space</kbd> ឬ <kbd className="font-semibold text-slate-700">←</kbd> <kbd className="font-semibold text-slate-700">→</kbd>
              </span>
            </div>
            {/* Visual mini progress track */}
            <div className="w-36 sm:w-56 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300"
                style={{ width: `${((safeSlideIndex + 1) / totalSlides) * 100}%` }}
              />
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNextSlide}
            className="group h-11 px-5 sm:px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2 cursor-pointer transition-all active:scale-95 shadow-sm hover:shadow-md"
            title="ស្លាយបន្ទាប់ (Next slide)"
          >
            <span className="text-xs font-bold font-sans">ស្លាយបន្ទាប់ (Next)</span>
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 stroke-[2.5]" />
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
