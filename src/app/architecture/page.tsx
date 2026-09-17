"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ArchitectureMap } from "@/components/visualizers/architecture-map";
import { Layers, Server, Shield, Database, Cpu, CheckCircle2 } from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";

export default function ArchitecturePage() {
  const dockerComposeExample = `version: '3.8'

services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./docker/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./docker/ssl:/etc/letsencrypt:ro
    depends_on:
      - api

  api:
    build:
      context: .
      dockerfile: docker/Dockerfile
    environment:
      - NODE_ENV=production
      - PORT=5000
      - MONGO_URI=mongodb://mongo:27017/course_db
      - REDIS_URL=redis://redis:6379
    ports:
      - "5000:5000"
    depends_on:
      - mongo
      - redis

  worker:
    build:
      context: .
      dockerfile: docker/Dockerfile.worker
    environment:
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis

  mongo:
    image: mongo:7.0
    volumes:
      - mongo_data:/data/db

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  mongo_data:
  redis_data:`;

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-emerald-500/20 selection:text-emerald-900">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                System Design
              </span>
              <span className="text-xs font-mono text-slate-500">
                Module 27 &amp; Final Project 06
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-2">
              Enterprise Backend Architecture
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Scalable multi-tier topology: React Client ➔ Nginx Reverse Proxy ➔ Express.js Clean Architecture ➔ MongoDB + Redis ➔ BullMQ Worker Queues.
            </p>
          </div>

          {/* Master Interactive Topology Map */}
          <ArchitectureMap />

          {/* Docker Compose Multi-Container Orchestration */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-emerald-700">
                  Container Orchestration
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  Production Docker Compose Blueprint
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-500">
                docker-compose.yml
              </span>
            </div>

            <CodeBlock
              code={dockerComposeExample}
              language="dockerfile"
              filename="docker-compose.yml"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
