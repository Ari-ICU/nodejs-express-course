"use client";

import React, { useState } from "react";
import { Play, RotateCcw, Shield, Check, ArrowRight, Zap, AlertCircle } from "lucide-react";

interface PipelineStep {
  name: string;
  type: "security" | "parser" | "auth" | "controller" | "error";
  desc: string;
  actionSnippet: string;
}

const STEPS: PipelineStep[] = [
  {
    name: "Incoming Request",
    type: "security",
    desc: "Client initiates HTTP Request with headers and URL parameters",
    actionSnippet: "GET /api/v1/users/profile HTTP/1.1",
  },
  {
    name: "helmet()",
    type: "security",
    desc: "Injects X-Content-Type-Options, Strict-Transport-Security, and CSP headers",
    actionSnippet: "res.setHeader('X-Frame-Options', 'DENY'); next();",
  },
  {
    name: "cors()",
    type: "security",
    desc: "Validates Origin against allowed frontend domains whitelist",
    actionSnippet: "if (isAllowedOrigin(req.headers.origin)) next();",
  },
  {
    name: "express.json()",
    type: "parser",
    desc: "Collects incoming raw TCP chunks into parsed JavaScript req.body object",
    actionSnippet: "req.body = JSON.parse(rawBodyBuffer); next();",
  },
  {
    name: "authMiddleware",
    type: "auth",
    desc: "Decodes and verifies Bearer JWT token from Authorization header",
    actionSnippet: "req.user = jwt.verify(token, SECRET); next();",
  },
  {
    name: "userController",
    type: "controller",
    desc: "Executes business logic, queries MongoDB, and responds with JSON",
    actionSnippet: "const user = await User.findById(req.user.id); res.json(user);",
  },
  {
    name: "HTTP Response",
    type: "controller",
    desc: "Serialized JSON data sent back across the network to client",
    actionSnippet: "HTTP/1.1 200 OK | Content-Type: application/json",
  },
];

export const MiddlewarePipeline: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handleAutoRun = () => {
    setIsPlaying(true);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= STEPS.length) {
        clearInterval(interval);
        setIsPlaying(false);
      } else {
        setCurrentStepIndex(step);
      }
    }, 900);
  };

  const activeStep = STEPS[currentStepIndex];

  return (
    <div className="w-full rounded-3xl bg-white border border-slate-200 p-6 flex flex-col shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              Interactive Simulator
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Step {currentStepIndex + 1} of {STEPS.length}
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900 mt-1">
            Express Middleware Pipeline Visualizer
          </h3>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-600 hover:text-slate-900 bg-slate-50 border border-slate-200 hover:bg-slate-100 cursor-pointer transition-colors shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleNext}
            disabled={currentStepIndex >= STEPS.length - 1 || isPlaying}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 cursor-pointer disabled:opacity-40 transition-colors shadow-2xs"
          >
            <span>Next Step</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleAutoRun}
            disabled={isPlaying || currentStepIndex >= STEPS.length - 1}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-mono font-bold bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer shadow-xs disabled:opacity-40 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Simulate Flow</span>
          </button>
        </div>
      </div>

      {/* Visual Pipeline Nodes */}
      <div className="py-6 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-[700px]">
          {STEPS.map((step, idx) => {
            const isPassed = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <React.Fragment key={idx}>
                <div
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`flex-1 p-3 rounded-2xl border text-center transition-all cursor-pointer shadow-2xs ${
                    isCurrent
                      ? "bg-emerald-50 border-emerald-500 shadow-sm scale-102"
                      : isPassed
                      ? "bg-emerald-50/50 border-emerald-200 text-emerald-700"
                      : "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-center mb-1">
                    {isPassed ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <span className="text-[10px] font-mono font-bold">
                        #{idx + 1}
                      </span>
                    )}
                  </div>
                  <h5
                    className={`text-xs font-mono font-bold truncate ${
                      isCurrent ? "text-slate-900 font-extrabold" : isPassed ? "text-emerald-800" : "text-slate-600"
                    }`}
                  >
                    {step.name}
                  </h5>
                </div>

                {idx < STEPS.length - 1 && (
                  <ArrowRight
                    className={`w-3.5 h-3.5 shrink-0 ${
                      idx < currentStepIndex ? "text-emerald-600" : "text-slate-300"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Active Step Details */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-emerald-700">
              {activeStep.name}
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white text-slate-600 border border-slate-200 uppercase">
              {activeStep.type}
            </span>
          </div>
          <p className="text-xs text-slate-700 max-w-xl">{activeStep.desc}</p>
        </div>

        <div className="w-full sm:w-auto bg-[#0b0f19] px-3.5 py-2 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 shadow-2xs">
          <code>{activeStep.actionSnippet}</code>
        </div>
      </div>
    </div>
  );
};
