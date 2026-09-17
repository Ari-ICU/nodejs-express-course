import React from "react";
import Link from "next/link";
import { Cpu, Terminal, ShieldCheck, Database, Layers } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-12 text-slate-600">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-200">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="font-bold text-sm text-slate-900 font-mono">
                NODE.JS + EXPRESS.JS
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Intermediate → Advanced backend masterclass covering scalable REST APIs, MongoDB, Redis, Docker, Nginx, and Clean Architecture.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider mb-3">
              Curriculum Tracks
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><Link href="/modules" className="hover:text-emerald-600 transition-colors">Modules 01–05: Node.js & HTTP</Link></li>
              <li><Link href="/modules" className="hover:text-emerald-600 transition-colors">Modules 06–10: Express & Routing</Link></li>
              <li><Link href="/modules" className="hover:text-emerald-600 transition-colors">Modules 11–13: MongoDB & Mongoose</Link></li>
              <li><Link href="/modules" className="hover:text-emerald-600 transition-colors">Modules 14–18: Security & Auth</Link></li>
              <li><Link href="/modules" className="hover:text-emerald-600 transition-colors">Modules 24–28: Caching & DevOps</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider mb-3">
              Interactive Tools
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><Link href="/slides" className="hover:text-emerald-600 transition-colors">Interactive Slide Studio</Link></li>
              <li><Link href="/api-tester" className="hover:text-emerald-600 transition-colors">REST API Playground</Link></li>
              <li><Link href="/architecture" className="hover:text-emerald-600 transition-colors">System Architecture Map</Link></li>
              <li><Link href="/projects" className="hover:text-emerald-600 transition-colors">6 Real-World Projects</Link></li>
              <li><Link href="/outcomes" className="hover:text-emerald-600 transition-colors">20 Outcomes & Certificate</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider mb-3">
              Stack Standard
            </h4>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-mono text-slate-700 shadow-2xs">Node.js 22 LTS</span>
              <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-mono text-slate-700 shadow-2xs">Express 4.x/5</span>
              <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-mono text-slate-700 shadow-2xs">MongoDB Atlas</span>
              <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-mono text-slate-700 shadow-2xs">Redis</span>
              <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-mono text-slate-700 shadow-2xs">BullMQ</span>
              <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-mono text-slate-700 shadow-2xs">Docker</span>
              <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-mono text-slate-700 shadow-2xs">Nginx</span>
              <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-mono text-slate-700 shadow-2xs">Swagger</span>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 NodePulse Academy. Designed for high-performance backend engineering.</p>
          <div className="flex items-center gap-4 font-mono text-[11px] text-slate-500">
            <span>Client ➔ Nginx ➔ Express ➔ MongoDB/Redis ➔ BullMQ</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
