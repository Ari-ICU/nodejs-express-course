"use client";

import React, { useState, useEffect } from "react";
import {
  Cpu,
  Layers,
  Zap,
  Play,
  Pause,
  RotateCcw,
  Server,
  AlertTriangle,
  CheckCircle2,
  Activity,
  ArrowRight,
  Database,
  FileCode,
} from "lucide-react";

export const ThreadArchitectureDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"diagram" | "simulation" | "code">("diagram");
  const [requestCount, setRequestCount] = useState(150);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activePulse, setActivePulse] = useState(0);

  // Auto-pulse animation
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePulse((p) => (p + 1) % 4);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  // Traffic simulation loop
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setRequestCount((prev) => {
        if (prev >= 2500) return 2500;
        return prev + 50;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [isSimulating]);

  // Derived metrics
  const apacheRamMb = Math.round(30 + requestCount * 1.8);
  const nodeRamMb = Math.round(28 + requestCount * 0.008);
  const apacheCtxSwitch = requestCount > 500 ? "Critical Thrashing" : requestCount > 200 ? "Moderate" : "Low";
  const nodeLatency = requestCount > 2000 ? "18ms" : requestCount > 1000 ? "12ms" : "4ms";
  const apacheLatency = requestCount > 1500 ? "1420ms (Queueing)" : requestCount > 500 ? "460ms" : "85ms";

  return (
    <div className="w-full rounded-2xl bg-[#0d1117] border border-slate-700/60 p-4 sm:p-5 flex flex-col gap-4 shadow-2xl overflow-hidden">
      {/* Top Window Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/90 shadow-xs shadow-rose-500/30" />
          <span className="w-3 h-3 rounded-full bg-amber-400/90 shadow-xs shadow-amber-400/30" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-xs shadow-emerald-500/30" />
          <span className="ml-2.5 text-xs font-mono font-semibold text-slate-300 flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-emerald-400" />
            architecture-thread-model.diagram
          </span>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveTab("diagram")}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "diagram"
                ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Architecture
          </button>
          <button
            onClick={() => setActiveTab("simulation")}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "simulation"
                ? "bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Live Simulator
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "code"
                ? "bg-purple-600/30 text-purple-300 border border-purple-500/40 shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            Code Model
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === "diagram" ? (
        <div className="flex flex-col gap-4">
          {/* Side-by-Side Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Card: Multi-Threaded (Apache / Traditional) */}
            <div className="rounded-xl bg-gradient-to-b from-amber-950/20 via-slate-900/40 to-slate-950/60 border border-amber-500/30 p-4 flex flex-col justify-between relative overflow-hidden group">
              {/* Subtle top amber glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      Traditional Model
                    </span>
                    <h3 className="text-base font-bold text-slate-100 mt-1 flex items-center gap-1.5">
                      Multi-Threaded
                      <span className="text-xs font-normal text-slate-400">(Apache / Java / PHP)</span>
                    </h3>
                  </div>
                  <AlertTriangle className="w-4 h-4 text-amber-400/80" />
                </div>

                <p className="text-xs text-slate-400 mb-4 leading-relaxed font-sans">
                  Allocates 1 dedicated OS thread per client request. Each thread blocks while waiting on I/O.
                </p>

                {/* Visual Thread Flow */}
                <div className="flex flex-col gap-2.5 font-mono text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-950/70 border border-amber-500/20 flex items-center justify-between">
                    <span className="text-amber-300 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      Request 1
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-slate-300">Thread 1 (~2MB)</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-rose-300/90 text-[11px] bg-rose-950/40 px-1.5 py-0.5 rounded border border-rose-800/40">
                      Blocked on DB ⏳
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950/70 border border-amber-500/20 flex items-center justify-between">
                    <span className="text-amber-300 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      Request 2
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-slate-300">Thread 2 (~2MB)</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-rose-300/90 text-[11px] bg-rose-950/40 px-1.5 py-0.5 rounded border border-rose-800/40">
                      Blocked on Disk ⏳
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950/70 border border-amber-500/20 flex items-center justify-between opacity-85">
                    <span className="text-amber-300 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400/60" />
                      Request N
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-slate-300">Thread N (~2MB)</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-amber-300/90 text-[11px] bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-800/40">
                      Context Switching
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Metrics Pill */}
              <div className="mt-4 pt-3 border-t border-amber-500/20 grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded-lg bg-amber-950/30 border border-amber-500/20">
                  <span className="text-[10px] text-slate-400 uppercase block">RAM for 10k Req</span>
                  <span className="text-amber-300 font-bold">~20 GB RAM ⚠️</span>
                </div>
                <div className="p-2 rounded-lg bg-rose-950/30 border border-rose-500/20">
                  <span className="text-[10px] text-slate-400 uppercase block">Concurrency Limit</span>
                  <span className="text-rose-300 font-bold">Low (~500 thr)</span>
                </div>
              </div>
            </div>

            {/* Right Card: Single-Threaded Event Loop (Node.js) */}
            <div className="rounded-xl bg-gradient-to-b from-emerald-950/25 via-slate-900/40 to-slate-950/60 border border-emerald-500/40 p-4 flex flex-col justify-between relative overflow-hidden group">
              {/* Subtle top emerald glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
                      High-Performance Model
                    </span>
                    <h3 className="text-base font-bold text-slate-100 mt-1 flex items-center gap-1.5">
                      Single-Threaded Event Loop
                      <span className="text-xs font-normal text-emerald-300/80">(Node.js + Libuv)</span>
                    </h3>
                  </div>
                  <Zap className="w-4 h-4 text-emerald-400 animate-pulse" />
                </div>

                <p className="text-xs text-slate-400 mb-4 leading-relaxed font-sans">
                  One main thread delegates I/O non-blockingly to Libuv worker threads and OS kernel. Never blocks.
                </p>

                {/* Visual Event Loop Flow */}
                <div className="flex flex-col gap-2.5 font-mono text-xs">
                  {/* Incoming requests streaming */}
                  <div className="p-2.5 rounded-lg bg-slate-950/70 border border-emerald-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-cyan-300 font-semibold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                        Req 1, 2... N
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-emerald-300 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-emerald-400" />
                      Single Event Loop
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-cyan-300/90 text-[11px] bg-cyan-950/50 px-1.5 py-0.5 rounded border border-cyan-700/40">
                      Non-blocking ⚡
                    </span>
                  </div>

                  {/* Delegating to Libuv */}
                  <div className="p-2.5 rounded-lg bg-slate-950/70 border border-emerald-500/20 flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                      Libuv Workers
                    </span>
                    <span className="text-slate-500">───(Offload)───►</span>
                    <span className="text-emerald-300 text-[11px] bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-700/30">
                      File I/O, Crypto, DNS
                    </span>
                  </div>

                  {/* Delegating to Kernel */}
                  <div className="p-2.5 rounded-lg bg-slate-950/70 border border-emerald-500/20 flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-cyan-400" />
                      Kernel (epoll)
                    </span>
                    <span className="text-slate-500">───(Async)────►</span>
                    <span className="text-cyan-300 text-[11px] bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-700/30">
                      Network Sockets
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Metrics Pill */}
              <div className="mt-4 pt-3 border-t border-emerald-500/20 grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/30">
                  <span className="text-[10px] text-slate-400 uppercase block">RAM for 10k Req</span>
                  <span className="text-emerald-300 font-bold">~35 MB RAM ⚡</span>
                </div>
                <div className="p-2 rounded-lg bg-cyan-950/30 border border-cyan-500/30">
                  <span className="text-[10px] text-slate-400 uppercase block">Concurrency Limit</span>
                  <span className="text-cyan-300 font-bold">100k+ Connections</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Takeaway Banner */}
          <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-3 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-300">
                <strong className="text-emerald-400">Golden Rule:</strong> JavaScript is single-threaded, but Node.js I/O is multi-threaded via Libuv.
              </span>
            </div>
            <span className="hidden sm:inline-block text-[11px] text-slate-500">
              Zero thread-creation overhead
            </span>
          </div>
        </div>
      ) : activeTab === "simulation" ? (
        /* Live Simulation Mode */
        <div className="flex flex-col gap-4">
          {/* Controls Bar */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-300">
                Active Concurrent Clients:
              </span>
              <span className="text-base font-mono font-bold text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-lg border border-cyan-500/30">
                {requestCount.toLocaleString()} reqs
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setRequestCount((c) => Math.max(50, c - 100))}
                className="text-xs font-mono px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition cursor-pointer"
              >
                -100
              </button>
              <button
                onClick={() => setRequestCount((c) => Math.min(2500, c + 100))}
                className="text-xs font-mono px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition cursor-pointer"
              >
                +100
              </button>
              <button
                onClick={() => setIsSimulating((s) => !s)}
                className={`text-xs font-mono px-3.5 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                  isSimulating
                    ? "bg-amber-600/30 text-amber-300 border-amber-500/50"
                    : "bg-emerald-600/30 text-emerald-300 border-emerald-500/50 hover:bg-emerald-600/40"
                }`}
              >
                {isSimulating ? (
                  <>
                    <Pause className="w-3.5 h-3.5" /> Pause Traffic
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" /> Stream Traffic
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setIsSimulating(false);
                  setRequestCount(150);
                }}
                className="text-xs font-mono p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200 transition cursor-pointer"
                title="Reset simulation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Real-Time Live Meters Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Apache Real-Time */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-amber-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    Apache / Traditional Multi-Threaded
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {requestCount} OS Threads
                  </span>
                </div>

                {/* RAM Gauge Bar */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Memory Consumed:</span>
                    <span className={`font-bold ${apacheRamMb > 1000 ? "text-rose-400" : "text-amber-400"}`}>
                      {apacheRamMb > 1024 ? `${(apacheRamMb / 1024).toFixed(2)} GB` : `${apacheRamMb} MB`}
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
                    <div
                      className={`h-full transition-all duration-300 ${
                        apacheRamMb > 1000
                          ? "bg-gradient-to-r from-amber-500 to-rose-500"
                          : "bg-amber-500"
                      }`}
                      style={{ width: `${Math.min(100, (apacheRamMb / 4500) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Avg Response Time</span>
                    <span className="text-amber-300 font-semibold">{apacheLatency}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">CPU Overhead</span>
                    <span className="text-rose-300 font-semibold">{apacheCtxSwitch}</span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-amber-400/80 font-mono mt-3">
                ⚠️ Each thread demands 2MB OS stack. System quickly reaches memory limits under high concurrency.
              </p>
            </div>

            {/* Node.js Real-Time */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-emerald-500/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    Node.js Single-Threaded Event Loop
                  </span>
                  <span className="text-[11px] font-mono text-emerald-300/90">
                    1 Main Thread + Libuv
                  </span>
                </div>

                {/* RAM Gauge Bar */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Memory Consumed:</span>
                    <span className="font-bold text-emerald-400">
                      {nodeRamMb} MB
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-300"
                      style={{ width: `${Math.min(100, (nodeRamMb / 150) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Avg Response Time</span>
                    <span className="text-emerald-300 font-semibold">{nodeLatency}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">CPU Overhead</span>
                    <span className="text-cyan-300 font-semibold">Minimal (No thread swap)</span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-emerald-400/90 font-mono mt-3">
                ⚡ Lightweight socket file descriptors. Massive scale achieved with a fraction of server memory.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Code Model View */
        <div className="flex flex-col gap-3 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-4 overflow-x-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
              <span className="text-purple-400 font-bold">// JavaScript / Node.js Architectural Concurrency Comparison</span>
              <span className="text-slate-500">models/concurrency.js</span>
            </div>
            
            <div className="space-y-1">
              <p className="text-amber-400 font-semibold">// 1. Multi-Threaded Model (Apache / Java / PHP-FPM)</p>
              <p className="text-slate-400">// Allocates 1 dedicated OS thread (~2MB stack) per connection. Blocks on I/O.</p>
              <p className="text-purple-400">class <span className="text-yellow-300">MultiThreadedServer</span> &#123;</p>
              <p className="pl-4 text-blue-400">handleRequest<span className="text-slate-300">(req) &#123;</span></p>
              <p className="pl-8 text-slate-300"><span className="text-purple-400">const</span> thread = ThreadPool.<span className="text-blue-300">allocate</span>(); <span className="text-slate-500">// ~2MB allocated</span></p>
              <p className="pl-8 text-slate-300"><span className="text-purple-400">const</span> data = thread.<span className="text-rose-400">blockingIoQuery</span>(req.id); <span className="text-rose-400/80">// Thread sleeping ⏳</span></p>
              <p className="pl-8 text-slate-300"><span className="text-purple-400">return</span> req.<span className="text-blue-300">send</span>(data);</p>
              <p className="pl-4 text-slate-300">&#125;</p>
              <p className="text-purple-400">&#125;</p>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-900">
              <p className="text-emerald-400 font-semibold">// 2. Single-Threaded Event Loop (Node.js + Libuv)</p>
              <p className="text-slate-400">// Single main thread executes JS; delegates I/O non-blockingly to Libuv & kernel.</p>
              <p className="text-purple-400">const <span className="text-yellow-300">server</span> = http.<span className="text-blue-300">createServer</span>(<span className="text-purple-400">async</span> (req, res) =&gt; &#123;</p>
              <p className="pl-4 text-slate-300"><span className="text-purple-400">const</span> data = <span className="text-purple-400">await</span> db.<span className="text-cyan-400">asyncQuery</span>(req.id); <span className="text-emerald-400">// Main thread NEVER blocks ⚡</span></p>
              <p className="pl-4 text-slate-300">res.<span className="text-blue-300">writeHead</span>(<span className="text-emerald-300">200</span>, &#123; <span className="text-cyan-300">'Content-Type'</span>: <span className="text-emerald-300">'application/json'</span> &#125;);</p>
              <p className="pl-4 text-slate-300">res.<span className="text-blue-300">end</span>(JSON.<span className="text-blue-300">stringify</span>(&#123; status: <span className="text-emerald-300">'ok'</span>, data &#125;));</p>
              <p className="text-purple-400">&#125;);</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
