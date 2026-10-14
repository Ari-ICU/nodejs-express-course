import React from "react";
import Link from "next/link";
import {
  Cpu,
  Terminal,
  ShieldCheck,
  Database,
  Layers,
  Play,
  BookOpen,
  Award,
  Server,
  ArrowUpRight,
  Boxes,
  Zap,
} from "lucide-react";

export const Footer = () => {
  const curriculumTracks = [
    { range: "01–05", title: "Node.js Core & HTTP Engine", href: "/modules" },
    { range: "06–08", title: "Express Framework & Middleware", href: "/modules" },
    { range: "09–10", title: "MongoDB Atlas & Mongoose ODM", href: "/modules" },
    { range: "11–13", title: "REST APIs & Layered Architecture", href: "/modules" },
    { range: "14–18", title: "Validation, Security & JWT Auth", href: "/modules" },
    { range: "19–26", title: "Production Services, Queues & Real-Time", href: "/modules" },
    { range: "27–29", title: "Clean Architecture, Docker & Capstones", href: "/modules" },
  ];

  const tools = [
    { label: "Interactive Slide Studio", href: "/slides", icon: Play, badge: "Live Presenter" },
    { label: "Curriculum Matrix (29)", href: "/modules", icon: BookOpen, badge: "382 Topics" },
    { label: "6 Production Projects", href: "/projects", icon: Boxes, badge: "Real-World" },
    { label: "20 Career Outcomes", href: "/outcomes", icon: Award, badge: "Industry Cert" },
  ];

  const techStack = [
    { name: "Node.js 22 LTS", dotColor: "bg-emerald-500", border: "hover:border-emerald-300" },
    { name: "Express 4.x / 5", dotColor: "bg-amber-500", border: "hover:border-amber-300" },
    { name: "MongoDB Atlas", dotColor: "bg-emerald-600", border: "hover:border-emerald-300" },
    { name: "Redis 7 Cache", dotColor: "bg-rose-500", border: "hover:border-rose-300" },
    { name: "BullMQ Queues", dotColor: "bg-purple-500", border: "hover:border-purple-300" },
    { name: "Docker & Compose", dotColor: "bg-sky-500", border: "hover:border-sky-300" },
    { name: "Nginx Proxy", dotColor: "bg-teal-500", border: "hover:border-teal-300" },
    { name: "Swagger / OpenAPI", dotColor: "bg-cyan-500", border: "hover:border-cyan-300" },
    { name: "TypeScript 5", dotColor: "bg-blue-500", border: "hover:border-blue-300" },
    { name: "Zod & Joi", dotColor: "bg-violet-500", border: "hover:border-violet-300" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/80 border-t border-slate-200/80 text-slate-600 overflow-hidden">
      {/* Subtle top ambient accent line */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-96 h-32 bg-emerald-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 relative z-10">
        {/* Main 4-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-200">
          {/* Brand & Overview Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-all">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-base text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors">
                    NODE.JS + EXPRESS.JS
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 font-semibold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Enterprise Backend Academy</span>
                </div>
              </div>
            </Link>

            <p className="text-xs text-slate-600 leading-relaxed font-sans pr-4">
              Comprehensive industry-grade backend curriculum. Master high-throughput asynchronous execution, native HTTP, RESTful routing, MongoDB Atlas, Redis caching, Docker, Nginx, and production Clean Architecture.
            </p>

            {/* Quick Metrics Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px]">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium shadow-2xs">
                <Zap className="w-3 h-3 text-emerald-500" />
                <span>29 Modules</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium shadow-2xs">
                <Layers className="w-3 h-3 text-teal-500" />
                <span>382 Topics</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium shadow-2xs">
                <Terminal className="w-3 h-3 text-indigo-500" />
                <span>6 Projects</span>
              </span>
            </div>
          </div>

          {/* Curriculum Tracks Column */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
                Curriculum Tracks
              </h4>
            </div>
            <ul className="space-y-1.5 text-xs">
              {curriculumTracks.map((track, i) => (
                <li key={i}>
                  <Link
                    href={track.href}
                    className="group flex items-center justify-between py-1 px-2 -mx-2 rounded-lg hover:bg-slate-100/80 text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    <span className="font-mono text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-1.5 py-0.5 rounded">
                      {track.range}
                    </span>
                    <span className="ml-2.5 flex-1 truncate text-xs group-hover:text-emerald-700 transition-colors">
                      {track.title}
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-emerald-600 opacity-0 group-hover:opacity-100 transition-all shrink-0 ml-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Tools Column */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
                Interactive Tools
              </h4>
            </div>
            <ul className="space-y-2 text-xs">
              {tools.map((tool, i) => {
                const Icon = tool.icon;
                return (
                  <li key={i}>
                    <Link
                      href={tool.href}
                      className="group flex flex-col p-2 -mx-2 rounded-xl hover:bg-white hover:border-slate-200 border border-transparent transition-all shadow-2xs hover:shadow-xs"
                    >
                      <div className="flex items-center gap-2 text-slate-700 group-hover:text-emerald-700 font-medium">
                        <Icon className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-600 transition-colors" />
                        <span className="truncate">{tool.label}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 ml-5.5 mt-0.5">
                        {tool.badge}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Stack Standard Column */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
                Stack Standard
              </h4>
            </div>
            <p className="text-[11px] text-slate-500 leading-normal mb-2 font-sans">
              Production tools and libraries used across all 29 modules and hands-on lab codebases:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {techStack.map((tech, i) => (
                <div
                  key={i}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200/90 rounded-lg text-[11px] font-mono text-slate-700 shadow-2xs hover:bg-slate-50 transition-all ${tech.border}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${tech.dotColor}`} />
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enterprise Architecture Pipeline Diagram Banner */}
        <div className="py-5 my-6 px-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-mono font-semibold text-slate-700 shrink-0">
            <Server className="w-4 h-4 text-emerald-600" />
            <span className="text-[11px] uppercase tracking-wider text-slate-500">Architecture Pipeline:</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5 font-mono text-[11px] text-slate-600">
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">Client / Browser</span>
            <span className="text-emerald-500 font-bold">➔</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">Nginx Reverse Proxy</span>
            <span className="text-emerald-500 font-bold">➔</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">Express.js (Router + Middleware)</span>
            <span className="text-emerald-500 font-bold">➔</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">Controllers &amp; Services</span>
            <span className="text-emerald-500 font-bold">➔</span>
            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">MongoDB &amp; Redis</span>
            <span className="text-emerald-500 font-bold">➔</span>
            <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200 font-semibold">BullMQ Workers</span>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p className="font-sans">
            © 2026 <span className="font-semibold text-slate-700">NodePulse Academy</span>. Built for enterprise-grade backend engineering.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[11px] shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold">Production Ready · 29 Modules Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
