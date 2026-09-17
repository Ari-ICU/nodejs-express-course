"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  BookOpen,
  Play,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Code2,
  Layers,
  ArrowRight
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { COURSE_MODULES, CourseModule } from "@/data/curriculum";
import { CodeBlock } from "@/components/ui/code-block";
import { getStoredProgress } from "@/lib/storage";

export default function ModulesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    M01: true,
    M02: false,
  });

  const progress = getStoredProgress();

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

  const toggleExpand = (modId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

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
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-emerald-500/20 selection:text-emerald-900">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                Course Syllabus
              </span>
              <span className="text-xs font-mono text-slate-500">
                29 Modules · 250+ Lessons
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-2">
              Complete Course Curriculum
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Browse every module, topic, code example, and practical exercise. Jump directly to any slide in Slide Studio.
            </p>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-3xl bg-slate-50 border border-slate-200 mb-8 shadow-2xs">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search topics, keywords (e.g. JWT, Mongoose, Event Loop, Docker)..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 shadow-2xs"
              />
            </div>

            {/* Category Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-emerald-600 text-white font-bold shadow-xs"
                      : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 shadow-2xs"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Modules List */}
          <div className="space-y-4">
            {filteredModules.map((module) => {
              const isExpanded = expandedModules[module.id] ?? false;
              const completedCount = module.topics.filter((t) =>
                progress.completedTopics.includes(t.id)
              ).length;

              return (
                <div
                  key={module.id}
                  className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all"
                >
                  {/* Module Header Row */}
                  <div className="p-5 sm:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-slate-50/70 border-b border-slate-100">
                    <div className="flex items-start sm:items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center font-mono font-bold text-sm text-emerald-700 shrink-0 shadow-2xs">
                        {module.id}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase px-2 py-0.2 rounded bg-white text-slate-600 border border-slate-200 shadow-2xs">
                            {module.category}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {module.duration}
                          </span>
                        </div>
                        <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                          {module.title}
                        </h2>
                        <p className="text-xs text-emerald-700 font-sans mt-0.5">
                          {module.khmerTitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-200">
                      <div className="text-left lg:text-right">
                        <span className="text-xs font-mono font-semibold text-slate-800">
                          {module.topics.length} Lessons
                        </span>
                        <div className="text-[10px] font-mono text-slate-500">
                          {completedCount}/{module.topics.length} completed
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/slides?module=${module.id}&slide=1`}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Slide View</span>
                        </Link>

                        <button
                          onClick={() => toggleExpand(module.id)}
                          className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer shadow-2xs"
                          title="Toggle lesson list"
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Lessons Grid */}
                  {isExpanded && (
                    <div className="p-6 bg-white space-y-3">
                      <p className="text-xs text-slate-600 mb-4 font-sans leading-relaxed">
                        {module.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {module.topics.map((topic, idx) => {
                          const isDone = progress.completedTopics.includes(topic.id);

                          return (
                            <div
                              key={topic.id}
                              className="p-4 rounded-2xl bg-slate-50/60 border border-slate-200 hover:border-slate-300 hover:bg-white transition-all flex flex-col justify-between group shadow-2xs"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-mono text-slate-500 font-bold">
                                      #{topic.number}
                                    </span>
                                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-white text-emerald-800 border border-emerald-200 shadow-2xs">
                                      {topic.type}
                                    </span>
                                  </div>
                                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                                    {topic.title}
                                  </h4>
                                  <p className="text-[11px] text-slate-600 line-clamp-1">
                                    {topic.khmerTitle}
                                  </p>
                                </div>

                                {isDone && (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                                )}
                              </div>

                              <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between">
                                <span className="text-[10px] font-mono text-slate-500">
                                  {topic.codeLanguage || "javascript"}
                                </span>
                                <Link
                                  href={`/slides?module=${module.id}&slide=${idx + 1}`}
                                  className="flex items-center gap-1 text-[11px] font-mono font-semibold text-emerald-700 hover:text-emerald-600"
                                >
                                  <span>Study Slide</span>
                                  <ArrowRight className="w-3 h-3" />
                                </Link>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
