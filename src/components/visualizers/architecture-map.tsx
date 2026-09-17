"use client";

import React, { useState } from "react";
import { Layers, Server, Database, Zap, Cpu, ArrowRight, Shield, Globe } from "lucide-react";

export const ArchitectureMap: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<string>("express");

  const layers = {
    react: {
      title: "ReactJS / Next.js Client",
      subtitle: "Browser & Mobile Clients",
      tech: "React 19, Axios, Tailwind, JWT Memory State",
      role: "Initiates authenticated HTTP requests, renders real-time WebSocket notifications, manages UI state, and stores HttpOnly session cookies.",
      code: `// React API Client:
const api = axios.create({
  baseURL: 'https://api.domain.com/v1',
  withCredentials: true // Sends HttpOnly refreshToken cookie!
});`,
    },
    nginx: {
      title: "Nginx Reverse Proxy & SSL",
      subtitle: "Edge Routing & Load Balancer",
      tech: "Nginx, Let's Encrypt SSL, Gzip, Rate Limiter",
      role: "Terminates HTTPS, applies edge rate limiting, serves static assets, compresses payloads, and reverse proxies port 443 to internal Node.js instances.",
      code: `location / {
  proxy_pass http://node_backend_upstream;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
}`,
    },
    express: {
      title: "Node.js + Express.js API",
      subtitle: "Application Core",
      tech: "Express.js, Zod, bcrypt, JWT, Mongoose, Multer",
      role: "Executes Clean Architecture: Routes validate schemas, Controllers handle HTTP transport, Services execute business rules, and Models query persistence.",
      code: `// Layered Domain Flow:
router.post('/orders', authenticate, validate(OrderSchema), orderController.create);`,
    },
    mongo: {
      title: "MongoDB Cluster",
      subtitle: "Document Persistence Layer",
      tech: "MongoDB 7.0+, Mongoose ODM, Replica Sets",
      role: "Stores collections (Users, Products, Orders), enforces schema constraints, manages compound search indexes, and executes ACID transactions.",
      code: `const session = await mongoose.startSession();
session.startTransaction();
// Atomic multi-document mutations`,
    },
    redis: {
      title: "Redis In-Memory Cache",
      subtitle: "Ultra-Fast Storage & Broker",
      tech: "Redis 7, Key-Value, TTL Expiry, Pub/Sub",
      role: "Serves cached JSON API responses in under 2ms, stores blacklist/revoked JWT tokens, and acts as message broker for BullMQ.",
      code: `await redis.setEx('cache:/products', 300, JSON.stringify(data));`,
    },
    jobs: {
      title: "BullMQ Background Workers",
      subtitle: "Asynchronous Queue Processing",
      tech: "BullMQ, Redis Queues, Worker Threads",
      role: "Processes deferred tasks (sending emails with Nodemailer, generating invoice PDFs, processing video uploads) without blocking HTTP API requests.",
      code: `const worker = new Worker('emailQueue', async job => {
  await sendTransactionalEmail(job.data);
});`,
    },
  };

  const active = layers[activeLayer as keyof typeof layers];

  return (
    <div className="w-full rounded-3xl bg-white border border-slate-200 p-6 flex flex-col shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              System Architecture
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Enterprise Topology
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900 mt-1">
            Full-Stack Backend Dataflow Blueprint
          </h3>
        </div>
        <span className="text-xs font-mono text-slate-500 hidden sm:block">
          Click any component to inspect its architecture
        </span>
      </div>

      {/* Interactive Topology Diagram */}
      <div className="py-8 flex flex-col items-center gap-3">
        {/* Step 1: React Frontend */}
        <button
          onClick={() => setActiveLayer("react")}
          className={`w-full max-w-md p-4 rounded-2xl border transition-all cursor-pointer text-center group shadow-2xs ${
            activeLayer === "react"
              ? "bg-blue-50 border-blue-400 shadow-sm scale-102"
              : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white"
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <Globe className="w-4 h-4 text-blue-600" />
            <h4 className="text-sm font-bold text-slate-900 font-mono">
              ReactJS / Next.js Frontend
            </h4>
          </div>
          <p className="text-[11px] text-slate-600">
            HTTP / REST / WebSocket Client (Browser &amp; Mobile)
          </p>
        </button>

        {/* Down Arrow */}
        <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
          <div className="w-0.5 h-6 bg-slate-300" />
          <span className="text-[10px] uppercase tracking-wider text-emerald-700 font-bold">
            HTTPS / TCP (Port 443)
          </span>
        </div>

        {/* Step 2: Nginx */}
        <button
          onClick={() => setActiveLayer("nginx")}
          className={`w-full max-w-md p-4 rounded-2xl border transition-all cursor-pointer text-center group shadow-2xs ${
            activeLayer === "nginx"
              ? "bg-emerald-50 border-emerald-500 shadow-sm scale-102"
              : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white"
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-emerald-600" />
            <h4 className="text-sm font-bold text-slate-900 font-mono">
              Nginx Reverse Proxy &amp; SSL
            </h4>
          </div>
          <p className="text-[11px] text-slate-600">
            TLS Termination · Rate Limiting · Gzip · Static Assets
          </p>
        </button>

        {/* Down Arrow */}
        <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
          <div className="w-0.5 h-6 bg-slate-300" />
          <span className="text-[10px] uppercase tracking-wider text-purple-700 font-bold">
            Internal Upstream (Port 5000)
          </span>
        </div>

        {/* Step 3: Node + Express */}
        <button
          onClick={() => setActiveLayer("express")}
          className={`w-full max-w-lg p-5 rounded-2xl border transition-all cursor-pointer text-center group shadow-2xs ${
            activeLayer === "express"
              ? "bg-purple-50 border-purple-400 shadow-sm scale-102"
              : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white"
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <Server className="w-5 h-5 text-purple-600" />
            <h4 className="text-base font-bold text-slate-900 font-mono">
              Node.js + Express.js Core
            </h4>
          </div>
          <p className="text-xs text-slate-600 font-mono">
            Routes ➔ Controllers ➔ Services ➔ Middleware ➔ Models
          </p>
        </button>

        {/* Split Arrows */}
        <div className="flex items-center justify-center gap-24 w-full max-w-md my-1 text-slate-400">
          <div className="w-0.5 h-6 bg-slate-300" />
          <div className="w-0.5 h-6 bg-slate-300" />
        </div>

        {/* Persistence Split (MongoDB + Redis) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
          {/* MongoDB */}
          <button
            onClick={() => setActiveLayer("mongo")}
            className={`p-4 rounded-2xl border transition-all cursor-pointer text-center shadow-2xs ${
              activeLayer === "mongo"
                ? "bg-green-50 border-green-500 shadow-sm scale-102"
                : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white"
            }`}
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <Database className="w-4 h-4 text-green-600" />
              <h4 className="text-xs font-bold text-slate-900 font-mono">
                MongoDB Atlas
              </h4>
            </div>
            <p className="text-[11px] text-slate-600">
              BSON Documents &amp; ACID Transactions
            </p>
          </button>

          {/* Redis */}
          <button
            onClick={() => setActiveLayer("redis")}
            className={`p-4 rounded-2xl border transition-all cursor-pointer text-center shadow-2xs ${
              activeLayer === "redis"
                ? "bg-rose-50 border-rose-400 shadow-sm scale-102"
                : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white"
            }`}
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-rose-600" />
              <h4 className="text-xs font-bold text-slate-900 font-mono">
                Redis Cache
              </h4>
            </div>
            <p className="text-[11px] text-slate-600">
              Sub-2ms In-Memory Caching &amp; Sessions
            </p>
          </button>
        </div>

        {/* Down to BullMQ */}
        <div className="w-0.5 h-6 bg-slate-300 my-1" />

        {/* Step 4: BullMQ Worker */}
        <button
          onClick={() => setActiveLayer("jobs")}
          className={`w-full max-w-md p-4 rounded-2xl border transition-all cursor-pointer text-center shadow-2xs ${
            activeLayer === "jobs"
              ? "bg-amber-50 border-amber-400 shadow-sm scale-102"
              : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white"
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <Cpu className="w-4 h-4 text-amber-600" />
            <h4 className="text-xs font-bold text-slate-900 font-mono">
              BullMQ Background Worker
            </h4>
          </div>
          <p className="text-[11px] text-slate-600">
            Email Delivery · PDF Generation · Job Retries
          </p>
        </button>
      </div>

      {/* Layer Detail Inspector */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 mt-4 flex flex-col md:flex-row items-start justify-between gap-6">
        <div className="space-y-2 max-w-md">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-slate-950 font-mono">
              {active.title}
            </h4>
            <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-200">
              {active.subtitle}
            </span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">{active.role}</p>
          <div className="text-[11px] font-mono text-slate-500">
            Tech: {active.tech}
          </div>
        </div>

        <div className="w-full md:w-auto bg-[#0b0f19] p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">
            Implementation Pattern:
          </div>
          <pre className="text-emerald-300">{active.code}</pre>
        </div>
      </div>
    </div>
  );
};
