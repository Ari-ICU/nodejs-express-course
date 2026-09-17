"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Boxes,
  CheckCircle2,
  FolderTree,
  Database,
  Code2,
  Terminal,
  ExternalLink,
  Layers,
  Server,
  ShieldCheck,
  Play
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { REAL_WORLD_PROJECTS, ProjectSpec } from "@/data/projects";
import { CodeBlock } from "@/components/ui/code-block";

export default function ProjectsPage() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("project-01");
  const [activeTab, setActiveTab] = useState<"features" | "folder" | "schema" | "controller">("features");

  const currentProject =
    REAL_WORLD_PROJECTS.find((p) => p.id === selectedProjectId) ||
    REAL_WORLD_PROJECTS[0];

  const methodColors: Record<string, string> = {
    GET: "text-emerald-700 bg-emerald-50 border-emerald-300",
    POST: "text-blue-700 bg-blue-50 border-blue-300",
    PUT: "text-amber-700 bg-amber-50 border-amber-300",
    PATCH: "text-purple-700 bg-purple-50 border-purple-300",
    DELETE: "text-rose-700 bg-rose-50 border-rose-300",
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-emerald-500/20 selection:text-emerald-900">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                Applied Engineering
              </span>
              <span className="text-xs font-mono text-slate-500">
                6 Capstone Builds
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-2">
              Real-World Projects Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Architect, code, test, and deploy 6 production-grade backend applications ranging from simple REST APIs to high-concurrency microservices.
            </p>
          </div>

          {/* Project Selector Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {REAL_WORLD_PROJECTS.map((project) => {
              const isSelected = project.id === currentProject.id;
              return (
                <button
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between shadow-2xs ${
                    isSelected
                      ? "bg-emerald-50 border-emerald-400 shadow-xs scale-102"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono font-bold text-emerald-700">
                        P{project.number}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500 uppercase">
                        {project.level.split(" ")[0]}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                      {project.title}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 mt-2 block">
                    {project.duration}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Project Detail Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column (Metadata, Features & Endpoints) - 5 cols */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold shadow-2xs">
                    PROJECT {currentProject.number} · {currentProject.level}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    Est. {currentProject.duration}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-slate-950">
                  {currentProject.title}
                </h2>
                <p className="text-xs font-semibold text-emerald-700 font-sans">
                  {currentProject.khmerTitle}
                </p>

                <p className="text-xs text-slate-700 leading-relaxed font-sans">
                  {currentProject.summary}
                </p>

                {/* Tech Stack Badges */}
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block mb-2">
                    Technologies Used:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentProject.techStack.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[11px] font-mono text-slate-700 shadow-2xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features List */}
                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block mb-2">
                    Key Features Checklist:
                  </span>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {currentProject.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Link to Slide Studio */}
                <div className="pt-2">
                  <Link
                    href={`/slides?module=M29&slide=${Number(currentProject.number)}`}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-xs"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Open in Slide Studio</span>
                  </Link>
                </div>
              </div>

              {/* Endpoints Table */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
                  REST API Endpoints Specification:
                </span>

                <div className="space-y-2">
                  {currentProject.endpoints.map((ep, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-mono shadow-2xs"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                            methodColors[ep.method] || "text-slate-600"
                          }`}
                        >
                          {ep.method}
                        </span>
                        <span className="text-slate-800 truncate max-w-[180px] sm:max-w-[240px]">
                          {ep.path}
                        </span>
                      </div>
                      {ep.auth && (
                        <span className="text-[9px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                          Auth Required
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (Folder tree, Schema, Controller) - 7 cols */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
                {/* Tabs */}
                <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-200 overflow-x-auto no-scrollbar">
                  <button
                    onClick={() => setActiveTab("features")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono cursor-pointer transition-all ${
                      activeTab === "features"
                        ? "bg-emerald-600 text-white font-bold shadow-xs"
                        : "text-slate-600 hover:text-slate-900 bg-slate-50 border border-slate-200"
                    }`}
                  >
                    <FolderTree className="w-3.5 h-3.5" />
                    <span>Folder Tree</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("schema")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono cursor-pointer transition-all ${
                      activeTab === "schema"
                        ? "bg-emerald-600 text-white font-bold shadow-xs"
                        : "text-slate-600 hover:text-slate-900 bg-slate-50 border border-slate-200"
                    }`}
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>Database Schema</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("controller")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono cursor-pointer transition-all ${
                      activeTab === "controller"
                        ? "bg-emerald-600 text-white font-bold shadow-xs"
                        : "text-slate-600 hover:text-slate-900 bg-slate-50 border border-slate-200"
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Sample Controller</span>
                  </button>
                </div>

                {/* Tab Content */}
                <div>
                  {activeTab === "features" && (
                    <div className="space-y-4">
                      <CodeBlock
                        code={currentProject.folderTree}
                        language="bash"
                        filename="project-structure.tree"
                        showLineNumbers={false}
                      />
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 font-mono shadow-2xs">
                        <span className="text-emerald-700 font-bold mr-2">Deployment Note:</span>
                        {currentProject.deploymentNotes}
                      </div>
                    </div>
                  )}

                  {activeTab === "schema" && (
                    <div className="space-y-4">
                      <CodeBlock
                        code={currentProject.databaseSchema}
                        language="javascript"
                        filename="models/schema.js"
                      />
                    </div>
                  )}

                  {activeTab === "controller" && (
                    <div className="space-y-4">
                      <CodeBlock
                        code={currentProject.sampleController}
                        language="javascript"
                        filename="controllers/handler.controller.js"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
