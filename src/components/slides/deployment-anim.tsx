"use client";

import React, { useEffect, useState } from "react";
import { Globe, Server, CheckCircle2, ShieldCheck, Activity, Cpu } from "lucide-react";

interface DeploymentAnimProps {
  accent?: string;
}

export const DeploymentAnim: React.FC<DeploymentAnimProps> = ({
  accent = "#10b981",
}) => {
  const [progress, setProgress] = useState(65);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 40 : prev + 5));
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { label: "Docker Build Multi-stage", status: "Done", time: "12s" },
    { label: "Vitest Integration Suite (18 tests)", status: "Passed", time: "1.8s" },
    { label: "PM2 Rolling Cluster Reload", status: "Active", time: "live" },
    { label: "Nginx SSL & Reverse Proxy Probe", status: "Healthy", time: "200 OK" },
  ];

  return (
    <div className="w-full h-full min-h-[420px] rounded-3xl bg-white border border-slate-200 p-8 flex flex-col justify-between relative overflow-hidden shadow-sm">
      {/* Background ambient pulse */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ backgroundColor: accent }}
      />

      {/* Top Header */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase">
            Production Cluster Live
          </span>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-xl border border-slate-200 text-[11px] font-mono text-slate-700 shadow-2xs">
          <Activity className="w-3.5 h-3.5 text-emerald-600" />
          <span>Throughput: 14,200 req/s</span>
        </div>
      </div>

      {/* Center Globe & Cluster visual */}
      <div className="flex flex-col items-center justify-center my-6 z-10 text-center">
        <div className="relative mb-4">
          <div className="w-28 h-28 rounded-full border border-emerald-200 flex items-center justify-center bg-emerald-50 shadow-inner">
            <Globe className="w-16 h-16 text-emerald-600 animate-spin" style={{ animationDuration: "16s" }} />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white border border-emerald-300 px-2 py-0.5 rounded-md text-[10px] font-mono text-emerald-700 font-bold shadow-2xs">
            0% Downtime
          </div>
        </div>

        <h4 className="text-base font-bold text-slate-900 font-mono">
          Nginx ➔ Node.js Cluster (4 Workers)
        </h4>
        <p className="text-xs text-slate-600 max-w-sm mt-1">
          Automated CI/CD deployment with zero dropped TCP connections and Redis caching.
        </p>

        {/* Progress bar */}
        <div className="w-full max-w-md bg-slate-100 rounded-full h-2.5 mt-6 overflow-hidden border border-slate-200">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Deployment steps table */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 z-10 pt-4 border-t border-slate-200">
        {steps.map((s, idx) => (
          <div key={idx} className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-mono text-slate-500 block truncate">
              {s.label}
            </span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs font-mono font-bold text-emerald-700">
                {s.status}
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                {s.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
