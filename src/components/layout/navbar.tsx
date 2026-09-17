"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Boxes,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Award,
  Terminal,
  Play
} from "lucide-react";
import { getStoredProgress } from "@/lib/storage";

export const Navbar = () => {
  const pathname = usePathname();
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const progress = getStoredProgress();
    setCompletedCount(progress.completedTopics.length);
  }, [pathname]);

  const navLinks = [
    { href: "/modules", label: "Curriculum (29)", icon: BookOpen },
    { href: "/slides", label: "Slide Studio", icon: Play, badge: "Teaching" },
    { href: "/projects", label: "Projects (6)", icon: Boxes },
    { href: "/api-tester", label: "REST Playground", icon: Terminal },
    { href: "/architecture", label: "Architecture", icon: Layers },
    { href: "/outcomes", label: "Outcomes", icon: Award },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-xs">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center group-hover:border-emerald-300 group-hover:bg-emerald-100/70 transition-all shadow-xs">
            <Cpu className="w-5 h-5 text-emerald-600 group-hover:scale-105 transition-transform" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-slate-900 group-hover:text-emerald-700 tracking-tight transition-colors">
                NodePulse
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                Node + Express
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Enterprise Backend Academy
            </p>
          </div>
        </Link>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-white text-slate-900 shadow-xs border border-slate-200 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-emerald-600" : "text-slate-500"}`} />
                <span>{link.label}</span>
                {link.badge && (
                  <span className="ml-1 px-1.5 py-0.2 rounded text-[9px] font-mono uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/outcomes"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 hover:border-slate-300 hover:bg-slate-100/80 transition-colors"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-slate-500 text-[11px]">Progress:</span>
            <span className="font-mono font-bold text-emerald-700 text-xs">
              {completedCount} Topics
            </span>
          </Link>

          <Link
            href="/slides"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-sm hover:shadow active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Launch Slides</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
