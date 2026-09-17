"use client";

import React, { useState, useEffect } from "react";

const nodes = [
  {
    id: "client",
    label: "Client",
    sub: "Browser / React App",
    icon: "🌐",
    color: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-400/40",
    text: "text-blue-300",
  },
  {
    id: "nginx",
    label: "Reverse Proxy",
    sub: "Nginx",
    icon: "🔀",
    color: "from-purple-500/20 to-purple-600/10",
    border: "border-purple-400/40",
    text: "text-purple-300",
  },
  {
    id: "node",
    label: "App Server",
    sub: "Node.js + Express",
    icon: "⚙️",
    color: "from-emerald-500/20 to-emerald-600/10",
    border: "border-emerald-400/40",
    text: "text-emerald-300",
  },
];

const leaves = [
  {
    id: "mongo",
    label: "MongoDB",
    sub: "Primary DB",
    icon: "🍃",
    color: "from-green-500/20 to-green-600/10",
    border: "border-green-400/40",
    text: "text-green-300",
  },
  {
    id: "redis",
    label: "Redis",
    sub: "Cache Layer",
    icon: "⚡",
    color: "from-red-500/20 to-red-600/10",
    border: "border-red-400/40",
    text: "text-red-300",
  },
];

const steps = [
  { from: "client", to: "nginx", label: "HTTPS Request", color: "bg-blue-400" },
  { from: "nginx", to: "node", label: "Proxy Forward", color: "bg-purple-400" },
  { from: "node", to: "mongo", label: "DB Query", color: "bg-emerald-400" },
  { from: "node", to: "redis", label: "Cache Lookup", color: "bg-red-400" },
  { from: "mongo", to: "node", label: "Data Response", color: "bg-green-400" },
  { from: "node", to: "nginx", label: "JSON Response", color: "bg-emerald-400" },
  { from: "nginx", to: "client", label: "HTTP 200 OK", color: "bg-purple-400" },
];

export const ClientServerDiagram: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 1200);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const currentStep = steps[activeStep];

  const isNodeActive = (id: string) =>
    currentStep.from === id || currentStep.to === id;

  return (
    <div className="w-full h-full rounded-2xl bg-[#0d1117] border border-slate-700/50 p-5 flex flex-col gap-4 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-3 text-xs font-mono text-slate-400">client-server-flow.diagram</span>
        </div>
        <button
          onClick={() => setIsPlaying((p) => !p)}
          className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:border-emerald-500 transition-all cursor-pointer"
        >
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>
      </div>

      {/* Active step label */}
      <div className="flex items-center justify-center">
        <span
          className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold border ${currentStep.color} border-slate-600 text-slate-200 transition-all duration-300`}
        >
          {activeStep + 1}/{steps.length} — {currentStep.label}
        </span>
      </div>

      {/* Main nodes (vertical chain) */}
      <div className="flex flex-col items-center gap-2 flex-1 justify-center">
        {nodes.map((node, i) => (
          <React.Fragment key={node.id}>
            {/* Node box */}
            <div
              className={`w-full max-w-xs flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r ${node.color} border ${node.border} transition-all duration-300 ${
                isNodeActive(node.id)
                  ? "scale-105 shadow-lg shadow-emerald-500/10 border-opacity-100"
                  : "opacity-60"
              }`}
            >
              <span className="text-xl">{node.icon}</span>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-bold ${node.text} leading-tight`}>{node.label}</p>
                <p className="text-xs text-slate-400 font-mono">{node.sub}</p>
              </div>
              {isNodeActive(node.id) && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              )}
            </div>

            {/* Arrow between main nodes */}
            {i < nodes.length - 1 && (
              <div className="flex flex-col items-center gap-0.5">
                <div
                  className={`w-0.5 h-3 rounded-full transition-all duration-300 ${
                    (currentStep.from === node.id && currentStep.to === nodes[i + 1].id) ||
                    (currentStep.from === nodes[i + 1].id && currentStep.to === node.id)
                      ? "bg-emerald-400 shadow-sm shadow-emerald-400"
                      : "bg-slate-700"
                  }`}
                />
                <svg width="10" height="6" viewBox="0 0 10 6" className="text-slate-600">
                  <path d="M5 6L0 0h10z" fill="currentColor" />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}

        {/* Leaf nodes (MongoDB + Redis) */}
        <div className="flex items-start gap-4 w-full max-w-xs mt-1">
          {/* Fork lines */}
          <div className="absolute" />
          {leaves.map((leaf) => (
            <div
              key={leaf.id}
              className={`flex-1 flex flex-col items-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r ${leaf.color} border ${leaf.border} transition-all duration-300 ${
                isNodeActive(leaf.id)
                  ? "scale-105 shadow-lg border-opacity-100"
                  : "opacity-50"
              }`}
            >
              <span className="text-lg">{leaf.icon}</span>
              <div className="text-center">
                <p className={`text-xs font-bold ${leaf.text} leading-tight`}>{leaf.label}</p>
                <p className="text-[10px] text-slate-500 font-mono">{leaf.sub}</p>
              </div>
              {isNodeActive(leaf.id) && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step dots */}
      <div className="flex justify-center items-center gap-1.5">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => { setActiveStep(i); setIsPlaying(false); }}
            className={`rounded-full transition-all cursor-pointer ${
              i === activeStep ? "w-5 h-2 bg-emerald-400" : "w-2 h-2 bg-slate-700 hover:bg-slate-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
