"use client";

import React, { useState } from "react";
import { Send, Check, Copy, Clock, Layers, Sparkles, Database } from "lucide-react";
import { MOCK_API_ENDPOINTS, MockEndpoint } from "@/data/mock-api";

export const ApiTesterPanel: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<MockEndpoint>(
    MOCK_API_ENDPOINTS[0]
  );
  const [method, setMethod] = useState<string>(selectedEndpoint.method);
  const [path, setPath] = useState<string>(selectedEndpoint.path);
  const [requestBody, setRequestBody] = useState<string>(
    selectedEndpoint.defaultBody || ""
  );
  const [activeTab, setActiveTab] = useState<"body" | "headers">("body");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSent, setHasSent] = useState(false);
  const [responseTime, setResponseTime] = useState(8);
  const [copied, setCopied] = useState(false);

  const handleSelectEndpoint = (ep: MockEndpoint) => {
    setSelectedEndpoint(ep);
    setMethod(ep.method);
    setPath(ep.path);
    setRequestBody(ep.defaultBody || "");
    setHasSent(false);
  };

  const handleSend = () => {
    setIsLoading(true);
    const simulatedLatency = Math.floor(Math.random() * 80) + 30;
    setTimeout(() => {
      setResponseTime(simulatedLatency);
      setIsLoading(false);
      setHasSent(true);
    }, simulatedLatency);
  };

  const handleCopyResponse = async () => {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify(selectedEndpoint.responseBody, null, 2)
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const methodColors: Record<string, string> = {
    GET: "bg-emerald-50 text-emerald-700 border-emerald-300",
    POST: "bg-blue-50 text-blue-700 border-blue-300",
    PUT: "bg-amber-50 text-amber-700 border-amber-300",
    PATCH: "bg-purple-50 text-purple-700 border-purple-300",
    DELETE: "bg-rose-50 text-rose-700 border-rose-300",
  };

  return (
    <div className="w-full rounded-3xl bg-white border border-slate-200 p-6 flex flex-col shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              Interactive Tool
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Live Mock REST Client
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900 mt-1">
            REST API Playground &amp; Endpoint Inspector
          </h3>
        </div>

        {/* Quick Endpoint Preset Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-md no-scrollbar">
          {MOCK_API_ENDPOINTS.map((ep) => (
            <button
              key={ep.id}
              onClick={() => handleSelectEndpoint(ep)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap transition-all cursor-pointer border ${
                selectedEndpoint.id === ep.id
                  ? "bg-slate-900 text-white border-slate-900 font-semibold shadow-2xs"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {ep.method} {ep.category}
            </button>
          ))}
        </div>
      </div>

      {/* URL / Request bar */}
      <div className="flex items-center gap-2 my-4">
        <span
          className={`px-3 py-2 rounded-xl text-xs font-mono font-bold border shadow-2xs ${
            methodColors[method] || "bg-slate-100 text-slate-700"
          }`}
        >
          {method}
        </span>

        <div className="flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono text-xs text-slate-900 focus-within:border-emerald-500 focus-within:bg-white transition-colors shadow-2xs">
          <span className="text-slate-400 select-none mr-1">http://localhost:5000</span>
          <input
            type="text"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-slate-900"
          />
        </div>

        <button
          onClick={handleSend}
          disabled={isLoading}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs cursor-pointer shadow-xs disabled:opacity-50 transition-all active:scale-95"
        >
          <Send className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          <span>{isLoading ? "Sending..." : "Send"}</span>
        </button>
      </div>

      {/* Main Split (Request Options vs Response Preview) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Request Params & Body */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("body")}
                className={`text-xs font-mono px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  activeTab === "body"
                    ? "bg-white text-slate-900 font-bold shadow-2xs border border-slate-200"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                JSON Body
              </button>
              <button
                onClick={() => setActiveTab("headers")}
                className={`text-xs font-mono px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  activeTab === "headers"
                    ? "bg-white text-slate-900 font-bold shadow-2xs border border-slate-200"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Headers ({Object.keys(selectedEndpoint.defaultHeaders).length})
              </button>
            </div>
            <span className="text-[10px] font-mono text-slate-500">
              {selectedEndpoint.description}
            </span>
          </div>

          {activeTab === "body" ? (
            <textarea
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
              placeholder="Enter JSON request payload (or empty for GET requests)..."
              disabled={method === "GET"}
              rows={8}
              className="w-full flex-1 bg-white border border-slate-200 rounded-xl p-3 font-mono text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 resize-none leading-relaxed disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs"
            />
          ) : (
            <div className="flex-1 bg-white border border-slate-200 rounded-xl p-3 font-mono text-xs text-slate-800 space-y-1 overflow-y-auto max-h-[190px] shadow-2xs">
              {Object.entries(selectedEndpoint.defaultHeaders).map(([k, v]) => (
                <div key={k} className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">{k}:</span>
                  <span className="text-emerald-700 truncate max-w-[200px]">{v}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Response Output */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-slate-800">
                Response:
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                  selectedEndpoint.responseStatus < 300
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                    : "bg-rose-50 text-rose-700 border border-rose-300"
                }`}
              >
                {selectedEndpoint.responseStatus} OK
              </span>
              <span className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                <Clock className="w-3 h-3 text-emerald-600" />
                {responseTime}ms
              </span>
            </div>

            <button
              onClick={handleCopyResponse}
              className="flex items-center gap-1 text-[11px] font-mono text-slate-600 hover:text-slate-900 px-2 py-0.5 rounded bg-white hover:bg-slate-100 border border-slate-200 cursor-pointer transition-colors shadow-2xs"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>

          <pre className="flex-1 bg-[#0b0f19] border border-slate-800 rounded-xl p-3 font-mono text-xs text-emerald-300 overflow-auto leading-relaxed max-h-[190px] shadow-2xs">
            {JSON.stringify(selectedEndpoint.responseBody, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};
