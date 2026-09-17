"use client";

import React, { useState, useEffect } from "react";
import {
  Radio,
  Mail,
  Package,
  BarChart3,
  Zap,
  Play,
  RotateCcw,
  CheckCircle2,
  Bell,
  Send,
  Layers,
  FileCode,
  ArrowRight,
} from "lucide-react";

interface EventPayload {
  name: string;
  data: Record<string, string | number>;
  color: string;
}

const SAMPLE_EVENTS: EventPayload[] = [
  {
    name: "order:placed",
    data: { id: "#9812", item: "MacBook Pro 16\"", amount: "$2,499" },
    color: "emerald",
  },
  {
    name: "user:registered",
    data: { userId: "usr_402", email: "alex@company.com", tier: "Pro" },
    color: "cyan",
  },
  {
    name: "payment:settled",
    data: { txnId: "tx_88301", gateway: "Stripe", currency: "USD" },
    color: "purple",
  },
];

export const EventDrivenVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"visualizer" | "decoupling" | "code">("visualizer");
  const [selectedEventIndex, setSelectedEventIndex] = useState(0);
  const [isEmitting, setIsEmitting] = useState(false);
  const [activeListener, setActiveListener] = useState<string | null>(null);
  const [eventLogs, setEventLogs] = useState<
    { id: number; time: string; text: string; badge: string; badgeColor: string }[]
  >([
    {
      id: 1,
      time: "00:01.2",
      badge: "INIT",
      badgeColor: "bg-slate-800 text-slate-400 border-slate-700",
      text: "EventEmitter instance initialized with 3 decoupled listeners",
    },
  ]);

  const currentEvent = SAMPLE_EVENTS[selectedEventIndex];

  const handleEmit = (eventObj: EventPayload = currentEvent) => {
    if (isEmitting) return;
    setIsEmitting(true);
    const now = new Date().toLocaleTimeString().split(" ")[0];

    // Log producer emit
    setEventLogs((prev) => [
      {
        id: Date.now(),
        time: now,
        badge: "EMIT",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        text: `Producer fired "${eventObj.name}" with payload ${JSON.stringify(eventObj.data)}`,
      },
      ...prev.slice(0, 8),
    ]);

    // Step through listeners sequentially
    setTimeout(() => {
      setActiveListener("email");
      setEventLogs((prev) => [
        {
          id: Date.now() + 1,
          time: now,
          badge: "EMAIL",
          badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
          text: `📧 [Email Service] Dispatched confirmation receipt for ${eventObj.data.id || eventObj.data.userId}`,
        },
        ...prev.slice(0, 8),
      ]);
    }, 400);

    setTimeout(() => {
      setActiveListener("inventory");
      setEventLogs((prev) => [
        {
          id: Date.now() + 2,
          time: now,
          badge: "INVENTORY",
          badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
          text: `📦 [Inventory Service] Reserved unit from warehouse stock`,
        },
        ...prev.slice(0, 8),
      ]);
    }, 850);

    setTimeout(() => {
      setActiveListener("analytics");
      setEventLogs((prev) => [
        {
          id: Date.now() + 3,
          time: now,
          badge: "ANALYTICS",
          badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40",
          text: `📊 [Analytics Tracker] Pushed conversion metric to telemetry stream`,
        },
        ...prev.slice(0, 8),
      ]);
    }, 1300);

    setTimeout(() => {
      setIsEmitting(false);
      setActiveListener(null);
    }, 1800);
  };

  return (
    <div className="w-full rounded-2xl bg-[#0d1117] border border-slate-700/60 p-4 sm:p-5 flex flex-col gap-4 shadow-2xl overflow-hidden">
      {/* Top Window Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/90 shadow-xs shadow-rose-500/30" />
          <span className="w-3 h-3 rounded-full bg-amber-400/90 shadow-xs shadow-amber-400/30" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-xs shadow-emerald-500/30" />
          <span className="ml-2.5 text-xs font-mono font-semibold text-slate-300 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            event-driven-architecture.diagram
          </span>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveTab("visualizer")}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "visualizer"
                ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Interactive Flow
          </button>
          <button
            onClick={() => setActiveTab("decoupling")}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "decoupling"
                ? "bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Decoupling
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
            Code Spec
          </button>
        </div>
      </div>

      {activeTab === "visualizer" ? (
        <div className="flex flex-col gap-4">
          {/* Preset Events Bar */}
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Trigger Event:</span>
              <div className="flex flex-wrap items-center gap-1.5">
                {SAMPLE_EVENTS.map((ev, idx) => (
                  <button
                    key={ev.name}
                    onClick={() => setSelectedEventIndex(idx)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition cursor-pointer ${
                      selectedEventIndex === idx
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold"
                        : "bg-slate-800/80 text-slate-400 border border-slate-700/60 hover:text-white"
                    }`}
                  >
                    {ev.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleEmit()}
              disabled={isEmitting}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition cursor-pointer shadow-md ${
                isEmitting
                  ? "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/40"
              }`}
            >
              <Send className={`w-3.5 h-3.5 ${isEmitting ? "animate-bounce" : ""}`} />
              {isEmitting ? "Broadcasting..." : `emit("${currentEvent.name}")`}
            </button>
          </div>

          {/* Architecture Stage: Producer -> Event Bus -> Listeners */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
            {/* Left: Producer (3 cols) */}
            <div className="lg:col-span-3 p-3.5 rounded-xl bg-gradient-to-b from-blue-950/25 via-slate-900/40 to-slate-950 border border-blue-500/30 flex flex-col gap-2 relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  Event Producer
                </span>
                <Send className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <h4 className="text-sm font-bold text-slate-100">Order Controller</h4>
              <p className="text-[11px] text-slate-400 font-sans leading-tight">
                Receives HTTP payload, finishes primary task, and triggers domain event.
              </p>
              <div className="mt-1 p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-blue-300">
                emitter.<span className="text-yellow-300">emit</span>(<span className="text-emerald-300">'{currentEvent.name}'</span>)
              </div>
            </div>

            {/* Middle: Event Bus (4 cols) */}
            <div className="lg:col-span-4 p-4 rounded-xl bg-gradient-to-b from-emerald-950/30 via-slate-900/50 to-slate-950 border border-emerald-500/40 flex flex-col items-center text-center gap-2 relative shadow-lg">
              {isEmitting && (
                <div className="absolute inset-0 bg-emerald-500/10 rounded-xl animate-pulse pointer-events-none" />
              )}
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
                <Radio className={`w-5 h-5 ${isEmitting ? "animate-spin text-cyan-300" : ""}`} />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 tracking-wider">
                  Central Event Bus
                </span>
                <h4 className="text-sm font-bold text-slate-100">Node.js EventEmitter</h4>
                <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                  Pub/Sub broker: Notifies all subscribers asynchronously without coupling.
                </p>
              </div>
              <div className="w-full flex items-center justify-center gap-1 text-[10px] font-mono text-emerald-300 bg-emerald-950/50 px-2 py-1 rounded-md border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                3 Registered Listeners
              </div>
            </div>

            {/* Right: Subscribers / Listeners (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-2 font-mono text-xs">
              {/* Listener 1: Email */}
              <div
                className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                  activeListener === "email"
                    ? "bg-blue-950/50 border-blue-400 shadow-md shadow-blue-500/20 scale-[1.02]"
                    : "bg-slate-900/60 border-slate-800 text-slate-400"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-200">Email Notification Service</p>
                    <p className="text-[10px] text-slate-400">on("{currentEvent.name}", sendMail)</p>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded ${activeListener === "email" ? "bg-blue-500 text-white font-bold" : "bg-slate-800 text-slate-500"}`}>
                  {activeListener === "email" ? "Executing" : "Idle"}
                </span>
              </div>

              {/* Listener 2: Inventory */}
              <div
                className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                  activeListener === "inventory"
                    ? "bg-amber-950/50 border-amber-400 shadow-md shadow-amber-500/20 scale-[1.02]"
                    : "bg-slate-900/60 border-slate-800 text-slate-400"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Package className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-200">Inventory & Fulfillment</p>
                    <p className="text-[10px] text-slate-400">on("{currentEvent.name}", deductStock)</p>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded ${activeListener === "inventory" ? "bg-amber-500 text-white font-bold" : "bg-slate-800 text-slate-500"}`}>
                  {activeListener === "inventory" ? "Executing" : "Idle"}
                </span>
              </div>

              {/* Listener 3: Analytics */}
              <div
                className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                  activeListener === "analytics"
                    ? "bg-purple-950/50 border-purple-400 shadow-md shadow-purple-500/20 scale-[1.02]"
                    : "bg-slate-900/60 border-slate-800 text-slate-400"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <BarChart3 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-200">Analytics & Conversion</p>
                    <p className="text-[10px] text-slate-400">on("{currentEvent.name}", recordEvent)</p>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded ${activeListener === "analytics" ? "bg-purple-500 text-white font-bold" : "bg-slate-800 text-slate-500"}`}>
                  {activeListener === "analytics" ? "Executing" : "Idle"}
                </span>
              </div>
            </div>
          </div>

          {/* Live Execution Logs Terminal */}
          <div className="rounded-xl bg-slate-950 border border-slate-800 p-3 flex flex-col gap-2 font-mono text-xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/80 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Live Event Execution Log
              </span>
              <button
                onClick={() => setEventLogs([])}
                className="text-[10px] text-slate-500 hover:text-slate-300 cursor-pointer"
              >
                Clear logs
              </button>
            </div>
            <div className="flex flex-col gap-1.5 max-h-[120px] overflow-y-auto pr-1">
              {eventLogs.length === 0 ? (
                <p className="text-slate-600 text-xs italic py-1">No events dispatched yet. Click emit to trigger.</p>
              ) : (
                eventLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-2 text-[11px] leading-relaxed">
                    <span className="text-slate-600 shrink-0">{log.time}</span>
                    <span className={`px-1.5 py-0.2 rounded border text-[10px] shrink-0 font-bold ${log.badgeColor}`}>
                      {log.badge}
                    </span>
                    <span className="text-slate-300 truncate">{log.text}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ) : activeTab === "decoupling" ? (
        /* Decoupling Comparison View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Monolithic Tight Coupling */}
          <div className="p-4 rounded-xl bg-slate-900/50 border border-rose-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-rose-400">
                  ❌ Tightly Coupled Architecture
                </span>
                <span className="text-[10px] font-mono text-rose-400/80 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-800/30">
                  Fragile
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-3 font-sans leading-relaxed">
                The checkout controller directly imports and calls every downstream dependency in a single blocking chain.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
                <p className="text-slate-500">// If Email service is down, checkout fails!</p>
                <p><span className="text-purple-400">await</span> emailService.<span className="text-blue-300">sendInvoice</span>();</p>
                <p><span className="text-purple-400">await</span> warehouse.<span className="text-blue-300">deductStock</span>();</p>
                <p><span className="text-purple-400">await</span> datadog.<span className="text-blue-300">trackRevenue</span>();</p>
              </div>
            </div>
            <ul className="mt-3 text-[11px] text-slate-400 space-y-1 font-mono">
              <li className="text-rose-400/90">• Cascade failures if one service throws</li>
              <li className="text-rose-400/90">• High cognitive load and difficult testing</li>
            </ul>
          </div>

          {/* Event-Driven Loose Coupling */}
          <div className="p-4 rounded-xl bg-slate-900/50 border border-emerald-500/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-emerald-400">
                  ✅ Event-Driven Loose Coupling
                </span>
                <span className="text-[10px] font-mono text-emerald-400/90 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/30">
                  Scalable
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-3 font-sans leading-relaxed">
                The checkout controller emits an event and immediately responds to client. Subscribers react independently.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
                <p className="text-emerald-400">// Producer knows NOTHING about consumers</p>
                <p>orderEmitter.<span className="text-yellow-300">emit</span>(<span className="text-emerald-300">'order:placed'</span>, order);</p>
                <p className="text-purple-400">return <span className="text-slate-300">res.<span className="text-blue-300">json</span>(&#123; success: <span className="text-emerald-300">true</span> &#125;);</span></p>
              </div>
            </div>
            <ul className="mt-3 text-[11px] text-slate-400 space-y-1 font-mono">
              <li className="text-emerald-400/90">• Add new listeners anytime without touching checkout</li>
              <li className="text-emerald-400/90">• Isolated failure boundaries and faster response times</li>
            </ul>
          </div>
        </div>
      ) : (
        /* Code Spec View */
        <div className="flex flex-col gap-3 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 overflow-x-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
              <span className="text-purple-400 font-bold">// Node.js EventEmitter Implementation</span>
              <span className="text-slate-500">services/order-bus.js</span>
            </div>
            <div className="space-y-1">
              <p><span className="text-purple-400">import</span> &#123; <span className="text-yellow-300">EventEmitter</span> &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">"node:events"</span>;</p>
              <p><span className="text-purple-400">export const</span> <span className="text-blue-300">orderEmitter</span> = <span className="text-purple-400">new</span> <span className="text-yellow-300">EventEmitter</span>();</p>
              <br />
              <p className="text-slate-500">// 1. Subscriber: Email Notification</p>
              <p>orderEmitter.<span className="text-blue-300">on</span>(<span className="text-emerald-300">"order:placed"</span>, <span className="text-purple-400">async</span> (order) =&gt; &#123;</p>
              <p className="pl-4 text-slate-300">console.<span className="text-blue-300">log</span>(<span className="text-emerald-300">{"`📧 Sending invoice to order #${order.id}`"}</span>);</p>
              <p>&#125;);</p>
              <br />
              <p className="text-slate-500">// 2. Subscriber: Warehouse Inventory</p>
              <p>orderEmitter.<span className="text-blue-300">on</span>(<span className="text-emerald-300">"order:placed"</span>, <span className="text-purple-400">async</span> (order) =&gt; &#123;</p>
              <p className="pl-4 text-slate-300">console.<span className="text-blue-300">log</span>(<span className="text-emerald-300">{"`📦 Deducting inventory item ${order.item}`"}</span>);</p>
              <p>&#125;);</p>
              <br />
              <p className="text-slate-500">// 3. Producer: Trigger the Event</p>
              <p>orderEmitter.<span className="text-yellow-300">emit</span>(<span className="text-emerald-300">"order:placed"</span>, &#123; id: <span className="text-emerald-300">9812</span>, item: <span className="text-emerald-300">"MacBook Pro"</span> &#125;);</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
