import React from "react";
import Link from "next/link";
import {
  Play,
  BookOpen,
  Boxes,
  Terminal,
  Layers,
  Award,
  Cpu,
  ShieldCheck,
  Zap,
  ArrowRight,
  Server,
  Database,
  CheckCircle2
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { COURSE_MODULES } from "@/data/curriculum";
import { REAL_WORLD_PROJECTS } from "@/data/projects";
import { FULL_STACK_ROADMAP_STEPS } from "@/data/course-outcomes";
import { MiddlewarePipeline } from "@/components/visualizers/middleware-pipeline";
import { ApiTesterPanel } from "@/components/visualizers/api-tester-panel";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-emerald-500/20 selection:text-emerald-900">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-16 pb-20 border-b border-slate-200 bg-gradient-to-b from-slate-50/70 via-white to-white">
          {/* Ambient subtle glowing radial background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Enterprise Level: Intermediate ➔ Advanced</span>
              </div>

              {/* Main Title */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 leading-tight">
                NODE.JS + EXPRESS.JS
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 mt-2">
                  MASTERCLASS &amp; SLIDE STUDIO
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-sans leading-relaxed">
                The complete engineering curriculum from Node.js runtime and HTTP internals to Express REST APIs, MongoDB, Redis caching, Docker, and production CI/CD pipelines.
              </p>

              {/* Prerequisites Card */}
              <div className="w-full max-w-xl p-3.5 bg-white border border-slate-200 rounded-2xl flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-slate-600 shadow-2xs">
                <span className="text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                  Prerequisites:
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">HTML</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">CSS</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">JavaScript ES6+</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">HTTP Basics</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">Databases</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link
                  href="/slides"
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Slide Studio</span>
                </Link>

                <Link
                  href="/modules"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-sm font-semibold transition-all cursor-pointer shadow-2xs hover:border-slate-400"
                >
                  <BookOpen className="w-4 h-4 text-slate-600" />
                  <span>Explore 29 Modules</span>
                </Link>

                <Link
                  href="/api-tester"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 border border-emerald-200 text-sm font-semibold font-mono transition-all cursor-pointer shadow-2xs"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Live REST Client</span>
                </Link>
              </div>
            </div>

            {/* Course Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center shadow-2xs">
                <div className="text-3xl font-extrabold text-slate-900 font-mono">29</div>
                <div className="text-xs text-slate-500 font-mono mt-1 font-medium">Core Modules</div>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center shadow-2xs">
                <div className="text-3xl font-extrabold text-emerald-600 font-mono">250+</div>
                <div className="text-xs text-slate-500 font-mono mt-1 font-medium">In-Depth Topics</div>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center shadow-2xs">
                <div className="text-3xl font-extrabold text-cyan-600 font-mono">6</div>
                <div className="text-xs text-slate-500 font-mono mt-1 font-medium">Real-World Projects</div>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center shadow-2xs">
                <div className="text-3xl font-extrabold text-purple-600 font-mono">20</div>
                <div className="text-xs text-slate-500 font-mono mt-1 font-medium">Verified Outcomes</div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE SIMULATOR SHOWCASE */}
        <section className="py-16 border-b border-slate-200 bg-slate-50/50">
          <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-mono uppercase font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded border border-emerald-200">
                Interactive Learning Tools
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-3">
                Experience the Backend Pipeline Live
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Simulate how Express intercepts requests, parses JSON payloads, authenticates tokens, and writes responses.
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
              <MiddlewarePipeline />
              <ApiTesterPanel />
            </div>
          </div>
        </section>

        {/* 6 REAL-WORLD PROJECTS SHOWCASE */}
        <section className="py-16 border-b border-slate-200 bg-white">
          <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-mono uppercase font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded border border-emerald-200">
                  Hands-On Portfolio
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-3">
                  6 Production-Ready Backend Projects
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                  Progressive capstone builds starting from simple CRUD to full-scale distributed systems with Redis, Docker, and Nginx.
                </p>
              </div>
              <Link
                href="/projects"
                className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 hover:text-emerald-600 group"
              >
                <span>View all project blueprints</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {REAL_WORLD_PROJECTS.map((project) => (
                <div
                  key={project.id}
                  className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between group shadow-xs hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-emerald-700">
                        PROJECT {project.number}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {project.level}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-medium text-emerald-700 font-sans mt-0.5">
                      {project.khmerTitle}
                    </p>
                    <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                      {project.summary}
                    </p>

                    {/* Features list */}
                    <ul className="mt-4 space-y-1.5 text-xs text-slate-700">
                      {project.features.slice(0, 3).map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-[10px] font-mono text-slate-600 shadow-2xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/projects?project=${project.id}`}
                      className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 transition-colors shadow-2xs"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FULL-STACK COURSE CONNECTION ROADMAP */}
        <section className="py-16 border-b border-slate-200 bg-slate-50/50">
          <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-mono uppercase font-bold text-cyan-700 bg-cyan-50 px-3 py-1 rounded border border-cyan-200">
                Full-Stack Connection
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-3">
                The Complete Web Engineering Journey
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                How HTML, CSS, JavaScript, and React connect directly to this Node.js, Express, MongoDB, and Docker mastery.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {FULL_STACK_ROADMAP_STEPS.map((s, idx) => (
                <div
                  key={s.step}
                  className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between relative group hover:border-slate-300 transition-all shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold text-slate-400">
                        STEP {s.step}
                      </span>
                      <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {s.level}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 font-mono">
                      {s.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      {s.desc}
                    </p>
                  </div>

                  {idx < FULL_STACK_ROADMAP_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                      <div className="w-4 h-4 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-[10px] text-slate-600 font-bold shadow-2xs">
                        ↓
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 text-center relative overflow-hidden bg-white">
          <div className="max-w-3xl mx-auto px-4 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950">
              Ready to Master Node.js &amp; Express.js?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Launch into Slide Studio for full-screen presentation mode, or explore the complete 29-module syllabus and interactive REST API playground.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/slides"
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Launch Slide Studio</span>
              </Link>
              <Link
                href="/outcomes"
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-sm font-semibold transition-all shadow-2xs hover:border-slate-400"
              >
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Track 20 Outcomes</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
