"use client";

import React, { useState } from "react";
import { X, Search, CheckCircle2, ChevronRight, BookOpen } from "lucide-react";
import { COURSE_MODULES, CourseModule } from "@/data/curriculum";

interface SlideNavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  currentModuleId: string;
  onSelectModule: (moduleId: string) => void;
  completedTopics: string[];
}

export const SlideNavOverlay: React.FC<SlideNavOverlayProps> = ({
  isOpen,
  onClose,
  currentModuleId,
  onSelectModule,
  completedTopics,
}) => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  if (!isOpen) return null;

  const categories = [
    "All",
    "Fundamentals",
    "Core & Async",
    "Express & REST",
    "Databases",
    "Security & Auth",
    "Architecture & DevOps",
    "Advanced & Real-time",
    "Projects",
  ];

  const filteredModules = COURSE_MODULES.filter((mod) => {
    const matchesCategory =
      selectedCategory === "All" || mod.category === selectedCategory;
    const matchesSearch =
      mod.title.toLowerCase().includes(search.toLowerCase()) ||
      mod.khmerTitle.toLowerCase().includes(search.toLowerCase()) ||
      mod.id.toLowerCase().includes(search.toLowerCase()) ||
      mod.topics.some((t) =>
        t.title.toLowerCase().includes(search.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  Course Navigation
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  29 Modules Total
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-950 mt-1">
                ជ្រើសរើសមេរៀន (Select Module & Chapter)
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200/80 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by topic, keyword, or module name..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 shadow-2xs"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-3 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-emerald-600 text-white font-bold shadow-2xs"
                    : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Modules List Grid */}
        <div className="p-6 overflow-y-auto flex-1 space-y-2.5 bg-slate-50/40">
          {filteredModules.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs font-mono">
              No modules found matching &quot;{search}&quot;
            </div>
          ) : (
            filteredModules.map((module) => {
              const isCurrent = module.id === currentModuleId;
              const completedInModule = module.topics.filter((t) =>
                completedTopics.includes(t.id)
              ).length;
              const totalInModule = module.topics.length;
              const isAllDone = completedInModule === totalInModule && totalInModule > 0;

              return (
                <button
                  key={module.id}
                  onClick={() => {
                    onSelectModule(module.id);
                    onClose();
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group shadow-2xs ${
                    isCurrent
                      ? "bg-emerald-50/90 border-emerald-300 shadow-sm"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${
                        isCurrent
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 border border-slate-200 text-slate-700 group-hover:bg-slate-200/80"
                      }`}
                    >
                      {module.id}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                          {module.category}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded border border-emerald-300">
                            មេរៀនបច្ចុប្បន្ន (Active)
                          </span>
                        )}
                        {isAllDone && (
                          <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Completed
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 mt-0.5">
                        {module.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-1 mt-0.5 font-sans">
                        {module.khmerTitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <span className="text-xs font-mono font-semibold text-slate-800">
                        {module.topics.length} Slides
                      </span>
                      <p className="text-[10px] font-mono text-slate-500">
                        {module.duration}
                      </p>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 ${
                        isCurrent ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-700"
                      }`}
                    />
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
