"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ApiTesterPanel } from "@/components/visualizers/api-tester-panel";
import { Terminal, Shield, Sparkles, CheckCircle2, Zap } from "lucide-react";

export default function ApiTesterPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-emerald-500/20 selection:text-emerald-900">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                Interactive Dev Tool
              </span>
              <span className="text-xs font-mono text-slate-500">
                Mock Express Server
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-2">
              REST API Simulator &amp; Client
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Inspect request headers, customize JSON payloads, execute GET/POST/PUT/DELETE requests, and analyze realistic Express response envelopes and latency.
            </p>
          </div>

          {/* Interactive Panel */}
          <ApiTesterPanel />

          {/* Info cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 mb-2 text-emerald-700">
                <Zap className="w-4 h-4" />
                <h4 className="text-xs font-mono font-bold uppercase">
                  Fast Prototyping
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Test how Express routers handle missing query params, malformed JSON, and header auth before writing code.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 mb-2 text-cyan-700">
                <Shield className="w-4 h-4" />
                <h4 className="text-xs font-mono font-bold uppercase">
                  Header Security
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Inspect Set-Cookie headers with `HttpOnly`, `SameSite=Strict`, and `Secure` flags configured for JWT refresh tokens.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 mb-2 text-purple-700">
                <Sparkles className="w-4 h-4" />
                <h4 className="text-xs font-mono font-bold uppercase">
                  Standard Envelopes
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Learn consistent JSON API envelopes with `success: true`, status codes, pagination meta, and data arrays.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
