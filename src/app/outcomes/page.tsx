"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { COURSE_OUTCOMES, CourseOutcomeItem } from "@/data/course-outcomes";
import { Award, CheckCircle2, Circle, Sparkles, Download, RotateCcw } from "lucide-react";
import { getStoredProgress, saveProgress } from "@/lib/storage";
import confetti from "canvas-confetti";

export default function OutcomesPage() {
  const [completedOutcomes, setCompletedOutcomes] = useState<number[]>([]);
  const [studentName, setStudentName] = useState("Developer");
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    const progress = getStoredProgress();
    setCompletedOutcomes(progress.completedOutcomes || []);
  }, []);

  const toggleOutcome = (id: number) => {
    const isDone = completedOutcomes.includes(id);
    const updated = isDone
      ? completedOutcomes.filter((item) => item !== id)
      : [...completedOutcomes, id];

    setCompletedOutcomes(updated);
    const progress = getStoredProgress();
    saveProgress({ ...progress, completedOutcomes: updated });

    if (updated.length === COURSE_OUTCOMES.length) {
      triggerCelebration();
    }
  };

  const triggerCelebration = () => {
    setShowCertificate(true);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const selectAll = () => {
    const allIds = COURSE_OUTCOMES.map((o) => o.id);
    setCompletedOutcomes(allIds);
    const progress = getStoredProgress();
    saveProgress({ ...progress, completedOutcomes: allIds });
    triggerCelebration();
  };

  const resetAll = () => {
    setCompletedOutcomes([]);
    setShowCertificate(false);
    const progress = getStoredProgress();
    saveProgress({ ...progress, completedOutcomes: [] });
  };

  const percent = Math.round(
    (completedOutcomes.length / COURSE_OUTCOMES.length) * 100
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-emerald-500/20 selection:text-emerald-900">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header & Progress Stats */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  Graduate Evaluation
                </span>
                <span className="text-xs font-mono text-slate-500">
                  20 Industry Capabilities
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-2">
                Course Outcomes &amp; Certification Tracker
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                Track your verifiable mastery of all 20 backend milestones. Unlock your graduation certificate upon 100% completion.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <button
                onClick={resetAll}
                className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer shadow-2xs"
              >
                Reset
              </button>
              <button
                onClick={selectAll}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs font-mono transition-all shadow-xs cursor-pointer"
              >
                Simulate 100% Complete
              </button>
            </div>
          </div>

          {/* Progress Bar Card */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs">
            <div className="space-y-1 w-full sm:w-auto">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black font-mono text-emerald-700">
                  {percent}%
                </span>
                <span className="text-xs font-mono text-slate-700 font-semibold">
                  ({completedOutcomes.length} of {COURSE_OUTCOMES.length} Completed)
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {percent === 100
                  ? "🎉 Congratulations! All 20 competencies have been achieved."
                  : "Keep studying modules and completing real-world projects to check off skills."}
              </p>
            </div>

            <div className="w-full sm:w-72 bg-slate-200 rounded-full h-3 overflow-hidden border border-slate-300">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          {/* Certificate Modal / View */}
          {percent === 100 && (
            <div className="p-8 rounded-3xl bg-gradient-to-b from-emerald-50/60 to-white border-2 border-emerald-500/60 shadow-lg relative overflow-hidden text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto shadow-2xs">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase font-bold tracking-widest text-emerald-700">
                  Official Certificate of Completion
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
                  Node.js &amp; Express.js Backend Engineer
                </h2>
                <p className="text-xs text-slate-600 max-w-lg mx-auto">
                  This certifies that{" "}
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="bg-white border-b-2 border-emerald-500 font-bold text-emerald-800 text-center px-2 py-0.5 rounded outline-none shadow-2xs"
                  />{" "}
                  has successfully mastered all 29 modules, 6 production projects, and 20 verified course outcomes.
                </p>
              </div>

              <div className="flex items-center justify-center gap-6 pt-2 text-[11px] font-mono text-slate-500">
                <span>Issued: {new Date().toLocaleDateString()}</span>
                <span>Verification ID: NP-{Date.now().toString().slice(-6)}</span>
              </div>
            </div>
          )}

          {/* 20 Outcomes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COURSE_OUTCOMES.map((item) => {
              const isDone = completedOutcomes.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => toggleOutcome(item.id)}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer flex items-start gap-4 shadow-2xs ${
                    isDone
                      ? "bg-emerald-50/70 border-emerald-300 shadow-xs"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300" />
                    )}
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                        OUTCOME #{item.id.toString().padStart(2, "0")} · {item.category}
                      </span>
                    </div>

                    <h3
                      className={`text-sm font-bold leading-snug ${
                        isDone ? "text-slate-950" : "text-slate-800"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs text-emerald-700 font-sans font-medium">
                      {item.khmerTitle}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      {item.description}
                    </p>

                    {/* Skills pills */}
                    <div className="flex flex-wrap gap-1 pt-2">
                      {item.skillsLearned.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.2 rounded bg-white border border-slate-200 text-[10px] font-mono text-slate-600 shadow-2xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
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
