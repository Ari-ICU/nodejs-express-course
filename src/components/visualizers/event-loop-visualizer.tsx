"use client";

import React, { useState } from "react";
import { Play, RotateCcw, Cpu, Clock, Layers, Zap, ArrowDown } from "lucide-react";

export const EventLoopVisualizer: React.FC = () => {
  const [callStack, setCallStack] = useState<string[]>(["main()"]);
  const [microtaskQueue, setMicrotaskQueue] = useState<string[]>([
    "Promise.then()",
    "process.nextTick()",
  ]);
  const [timerQueue, setTimerQueue] = useState<string[]>([
    "setTimeout(cb, 0)",
    "setImmediate(cb)",
  ]);
  const [executedLogs, setExecutedLogs] = useState<string[]>([]);
  const [currentTick, setCurrentTick] = useState(0);

  const stepExecution = () => {
    // 1. Callstack
    if (callStack.length > 0) {
      const top = callStack[0];
      setCallStack([]);
      setExecutedLogs((prev) => [...prev, `[CALL STACK] Executed: ${top}`]);
      setCurrentTick((t) => t + 1);
      return;
    }

    // 2. Microtasks
    if (microtaskQueue.length > 0) {
      const nextMicro = microtaskQueue[0];
      setMicrotaskQueue((prev) => prev.slice(1));
      setExecutedLogs((prev) => [...prev, `[MICROTASK] Executed: ${nextMicro}`]);
      setCurrentTick((t) => t + 1);
      return;
    }

    // 3. Timers
    if (timerQueue.length > 0) {
      const nextTimer = timerQueue[0];
      setTimerQueue((prev) => prev.slice(1));
      setExecutedLogs((prev) => [...prev, `[EVENT LOOP TICK] Executed: ${nextTimer}`]);
      setCurrentTick((t) => t + 1);
      return;
    }
  };

  const handleReset = () => {
    setCallStack(["main()", "console.log('Sync start')"]);
    setMicrotaskQueue(["process.nextTick()", "Promise.resolve().then()"]);
    setTimerQueue(["setTimeout(cb, 0)", "setImmediate(cb)"]);
    setExecutedLogs([]);
    setCurrentTick(0);
  };

  const isComplete =
    callStack.length === 0 &&
    microtaskQueue.length === 0 &&
    timerQueue.length === 0;

  return (
    <div className="w-full rounded-3xl bg-white border border-slate-200 p-6 flex flex-col shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
              Libuv Concurrency
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Event Loop Tick: #{currentTick}
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900 mt-1">
            Node.js Event Loop &amp; Microtasks Simulator
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-600 hover:text-slate-900 bg-slate-50 border border-slate-200 hover:bg-slate-100 cursor-pointer transition-colors shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Queues</span>
          </button>
          <button
            onClick={stepExecution}
            disabled={isComplete}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-mono font-bold bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer disabled:opacity-40 shadow-xs transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Execute Next Tick</span>
          </button>
        </div>
      </div>

      {/* Visual Queues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {/* Call Stack */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
            <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-purple-700">
              <Cpu className="w-3.5 h-3.5" />
              1. Call Stack (V8)
            </span>
            <span className="text-[10px] font-mono text-slate-500">Synchronous</span>
          </div>
          <div className="space-y-2 min-h-[90px]">
            {callStack.length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-xs font-mono italic">
                (Stack Empty)
              </div>
            ) : (
              callStack.map((item, i) => (
                <div
                  key={i}
                  className="p-2 rounded-xl bg-white border border-purple-200 text-xs font-mono text-purple-900 font-semibold shadow-2xs"
                >
                  {item}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Microtask Queue */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
            <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700">
              <Zap className="w-3.5 h-3.5" />
              2. Microtasks
            </span>
            <span className="text-[10px] font-mono text-slate-500">Highest Priority</span>
          </div>
          <div className="space-y-2 min-h-[90px]">
            {microtaskQueue.length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-xs font-mono italic">
                (Queue Drained)
              </div>
            ) : (
              microtaskQueue.map((item, i) => (
                <div
                  key={i}
                  className="p-2 rounded-xl bg-white border border-emerald-200 text-xs font-mono text-emerald-900 font-semibold shadow-2xs"
                >
                  {item}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Timers & Macrotasks */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
            <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-700">
              <Clock className="w-3.5 h-3.5" />
              3. Macrotasks (Timers)
            </span>
            <span className="text-[10px] font-mono text-slate-500">Libuv Phases</span>
          </div>
          <div className="space-y-2 min-h-[90px]">
            {timerQueue.length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-xs font-mono italic">
                (Queue Drained)
              </div>
            ) : (
              timerQueue.map((item, i) => (
                <div
                  key={i}
                  className="p-2 rounded-xl bg-white border border-cyan-200 text-xs font-mono text-cyan-900 font-semibold shadow-2xs"
                >
                  {item}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Execution Terminal Output */}
      <div className="p-4 bg-[#0b0f19] rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 shadow-2xs">
        <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1.5 font-bold">
          Console Output &amp; Order of Execution:
        </div>
        <div className="space-y-1 min-h-[40px]">
          {executedLogs.length === 0 ? (
            <span className="text-slate-500 italic">Click &quot;Execute Next Tick&quot; to begin simulation...</span>
          ) : (
            executedLogs.map((log, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">›</span>
                <span>{log}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
