/**
 * _modules.ts
 * Module-level metadata for the curriculum.
 * Topic content (summary, code snippets, tips) lives in src/content/<ModuleId>/<num>.mdx
 */

export type ModuleCategory =
  | "Fundamentals"
  | "Core & Async"
  | "Express & REST"
  | "Databases"
  | "Security & Auth"
  | "Architecture & DevOps"
  | "Advanced & Real-time"
  | "Projects";

export interface ModuleMeta {
  id: string;
  number: number;
  title: string;
  khmerTitle: string;
  category: ModuleCategory;
  accentColor: string;
  duration: string;
  description: string;
  /** Number of topic MDX files in src/content/<id>/ */
  topicCount: number;
}

export const MODULES: ModuleMeta[] = [
  {
    id: "M01", number: 1, title: "Introduction to Backend",
    khmerTitle: "សេចក្តីផ្តើមអំពីការអភិវឌ្ឍ Backend",
    category: "Fundamentals", accentColor: "#3b82f6", duration: "3 Hours",
    description: "Master backend foundations, client-server models, HTTP communication, and Node.js event-driven architecture.",
    topicCount: 12,
  },
  {
    id: "M02", number: 2, title: "Node.js Fundamentals",
    khmerTitle: "មូលដ្ឋានគ្រឹះ Node.js",
    category: "Fundamentals", accentColor: "#10b981", duration: "3.5 Hours",
    description: "Deep dive into npm, package.json, scripts, CommonJS vs ES Modules, process object, and environment configurations.",
    topicCount: 16,
  },
  {
    id: "M03", number: 3, title: "Node.js Core Modules",
    khmerTitle: "ម៉ូឌុលស្នូល Node.js (Core Modules)",
    category: "Core & Async", accentColor: "#f59e0b", duration: "4 Hours",
    description: "Deep mastery of Node's built-in APIs: fs, path, os, url, events, crypto, streams, Buffers, and directory operations.",
    topicCount: 14,
  },
  {
    id: "M04", number: 4, title: "Async Node.js",
    khmerTitle: "ប្រតិបត្តិការ Asynchronous ក្នុង Node.js",
    category: "Core & Async", accentColor: "#ec4899", duration: "4.5 Hours",
    description: "Master asynchronous JavaScript: Callbacks, Promises, async/await, libuv Event Loop phases, Microtasks, and non-blocking patterns.",
    topicCount: 12,
  },
  {
    id: "M05", number: 5, title: "HTTP with Node.js",
    khmerTitle: "ពិធីការ HTTP ជាមួយ Node.js",
    category: "Core & Async", accentColor: "#06b6d4", duration: "3.5 Hours",
    description: "HTTP protocol fundamentals, requests, responses, methods, status codes, query strings, headers, and native HTTP servers.",
    topicCount: 15,
  },
  {
    id: "M06", number: 6, title: "Express.js Fundamentals",
    khmerTitle: "មូលដ្ឋានគ្រឹះ Express.js",
    category: "Express & REST", accentColor: "#6366f1", duration: "4 Hours",
    description: "The premier Node.js web framework: Application instance, Request and Response objects, middleware concept, and structure.",
    topicCount: 14,
  },
  {
    id: "M07", number: 7, title: "Express Routing",
    khmerTitle: "ការរៀបចំ Routing ក្នុង Express.js",
    category: "Express & REST", accentColor: "#8b5cf6", duration: "4 Hours",
    description: "RESTful HTTP routes, params, queries, route groupings with express.Router(), nested routers, and clean route modularity.",
    topicCount: 14,
  },
  {
    id: "M08", number: 8, title: "Express Middleware",
    khmerTitle: "ប្រព័ន្ធ Middleware ក្នុង Express.js",
    category: "Express & REST", accentColor: "#a855f7", duration: "4.5 Hours",
    description: "Middleware architecture: Execution flow, built-in middleware, custom middleware, auth guards, logging, and error handlers.",
    topicCount: 13,
  },
  {
    id: "M09", number: 9, title: "REST API Development",
    khmerTitle: "ការអភិវឌ្ឍ RESTful API",
    category: "Express & REST", accentColor: "#d946ef", duration: "4.5 Hours",
    description: "REST principles, HTTP verbs, status codes, standard JSON response envelope, error structures, filtering, searching, and pagination.",
    topicCount: 18,
  },
  {
    id: "M10", number: 10, title: "Controllers & Services",
    khmerTitle: "ស្ថាបត្យកម្ម Controllers និង Services",
    category: "Express & REST", accentColor: "#f43f5e", duration: "4 Hours",
    description: "Separation of concerns, clean architecture, slim controllers, rich services, reusable business logic, and testability.",
    topicCount: 10,
  },
  {
    id: "M11", number: 11, title: "MongoDB Fundamentals",
    khmerTitle: "មូលដ្ឋានគ្រឹះ MongoDB",
    category: "Databases", accentColor: "#10b981", duration: "4.5 Hours",
    description: "Document databases vs SQL tables, Collections, Documents, BSON, ObjectId, Embedded documents vs References, and Atlas setup.",
    topicCount: 14,
  },
  {
    id: "M12", number: 12, title: "Mongoose ODM",
    khmerTitle: "ការប្រើប្រាស់ Mongoose ODM",
    category: "Databases", accentColor: "#059669", duration: "5 Hours",
    description: "Schemas, Models, Validation, Schema Types, Timestamps, Pre/Post Middleware (Hooks), Virtuals, and Population ($lookup).",
    topicCount: 20,
  },
  {
    id: "M13", number: 13, title: "Database API Development",
    khmerTitle: "ការអភិវឌ្ឍ Database CRUD API ពេញលេញ",
    category: "Databases", accentColor: "#14b8a6", duration: "5 Hours",
    description: "Complete MongoDB CRUD integration, dynamic filtering, multi-field search, sorting, limit/skip pagination, and connection pooling.",
    topicCount: 19,
  },
  {
    id: "M14", number: 14, title: "Data Validation",
    khmerTitle: "ការត្រួតពិនិត្យទិន្នន័យ (Data Validation)",
    category: "Security & Auth", accentColor: "#eab308", duration: "4 Hours",
    description: "Request validation with Zod and Joi: Body validation, Query validation, Params validation, sanitization, and error transformation.",
    topicCount: 11,
  },
  {
    id: "M15", number: 15, title: "Error Handling",
    khmerTitle: "ការគ្រប់គ្រងកំហុស (Error Handling)",
    category: "Security & Auth", accentColor: "#ef4444", duration: "4 Hours",
    description: "Custom Application Error classes, centralized Express error middleware, catching unhandled rejections, and production safety.",
    topicCount: 12,
  },
  {
    id: "M16", number: 16, title: "Authentication",
    khmerTitle: "ប្រព័ន្ធផ្ទៀងផ្ទាត់អត្តសញ្ញាណ (Authentication)",
    category: "Security & Auth", accentColor: "#3b82f6", duration: "5 Hours",
    description: "bcrypt password hashing, JSON Web Tokens (JWT), short-lived access tokens, refresh tokens, HttpOnly cookies, and logout flows.",
    topicCount: 14,
  },
  {
    id: "M17", number: 17, title: "Authorization (RBAC)",
    khmerTitle: "ការអនុញ្ញាតសិទ្ធិ (Role-Based Access Control)",
    category: "Security & Auth", accentColor: "#8b5cf6", duration: "3.5 Hours",
    description: "Role-Based Access Control (RBAC), permission matrices, admin guards, and resource ownership verification.",
    topicCount: 8,
  },
  {
    id: "M18", number: 18, title: "API Security",
    khmerTitle: "សុវត្ថិភាព API (API Security)",
    category: "Security & Auth", accentColor: "#dc2626", duration: "4 Hours",
    description: "Common vulnerabilities: CORS misconfigurations, Helmet security headers, rate limiting, NoSQL injection, XSS, and CSRF.",
    topicCount: 15,
  },
  {
    id: "M19", number: 19, title: "File Upload",
    khmerTitle: "ការ Upload ឯកសារ (File Upload)",
    category: "Express & REST", accentColor: "#0ea5e9", duration: "4 Hours",
    description: "Multipart/form-data, Multer configuration, image dimension validation, local disk storage, and Cloudflare R2 / AWS S3 uploads.",
    topicCount: 13,
  },
  {
    id: "M20", number: 20, title: "Email & Notifications",
    khmerTitle: "ប្រព័ន្ធផ្ញើ Email និងការជូនដំណឹង",
    category: "Advanced & Real-time", accentColor: "#f97316", duration: "3.5 Hours",
    description: "SMTP configuration, Nodemailer, transactional emails, HTML email templates, password resets, and verification tokens.",
    topicCount: 10,
  },
  {
    id: "M21", number: 21, title: "API Documentation",
    khmerTitle: "ឯកសារពិពណ៌នា API (OpenAPI / Swagger)",
    category: "Architecture & DevOps", accentColor: "#14b8a6", duration: "3.5 Hours",
    description: "OpenAPI 3.0 specifications, Swagger JSDoc, Swagger UI interactive documentation, and schema definitions.",
    topicCount: 10,
  },
  {
    id: "M22", number: 22, title: "API Testing",
    khmerTitle: "ការធ្វើតេស្ត API (Vitest & Supertest)",
    category: "Architecture & DevOps", accentColor: "#64748b", duration: "4.5 Hours",
    description: "Unit testing, integration testing, Supertest for HTTP endpoint testing, mock databases, and authentication testing.",
    topicCount: 13,
  },
  {
    id: "M23", number: 23, title: "API Development Tools",
    khmerTitle: "ឧបករណ៍អភិវឌ្ឍន៍ API (Postman & Scripts)",
    category: "Architecture & DevOps", accentColor: "#f97316", duration: "3 Hours",
    description: "Postman collections, environment variables, pre-request scripts, automated test assertions, and CI Newman integration.",
    topicCount: 10,
  },
  {
    id: "M24", number: 24, title: "Real-Time Features",
    khmerTitle: "មុខងារ Real-Time (WebSockets & Socket.IO)",
    category: "Advanced & Real-time", accentColor: "#06b6d4", duration: "4.5 Hours",
    description: "Full-duplex WebSocket communication, Socket.IO server and client, rooms, namespaces, online user presence, and real-time chat.",
    topicCount: 10,
  },
  {
    id: "M25", number: 25, title: "Performance & Caching",
    khmerTitle: "ការបង្កើនល្បឿន និង Caching (Redis)",
    category: "Advanced & Real-time", accentColor: "#ef4444", duration: "4.5 Hours",
    description: "Node.js profiling, MongoDB index optimization, compound indexes, response compression, and in-memory caching with Redis.",
    topicCount: 12,
  },
  {
    id: "M26", number: 26, title: "Background Jobs",
    khmerTitle: "ការងារដំណើរការនៅខាងក្រោយ (BullMQ & Queues)",
    category: "Advanced & Real-time", accentColor: "#8b5cf6", duration: "4.5 Hours",
    description: "Asynchronous task delegation, message queues, BullMQ with Redis, producers, workers, job retries, and scheduled cron jobs.",
    topicCount: 12,
  },
  {
    id: "M27", number: 27, title: "Backend Project Architecture",
    khmerTitle: "ស្ថាបត្យកម្មគម្រោង Backend កម្រិត Enterprise",
    category: "Architecture & DevOps", accentColor: "#10b981", duration: "4 Hours",
    description: "Standard enterprise backend directory structure, clean domain segregation, dependency injection patterns, and production scalability.",
    topicCount: 15,
  },
  {
    id: "M28", number: 28, title: "Production & Deployment",
    khmerTitle: "ការដាក់ឱ្យដំណើរការលើ Production (Docker, Nginx, CI/CD)",
    category: "Architecture & DevOps", accentColor: "#3b82f6", duration: "5 Hours",
    description: "Dockerizing Node.js, multi-stage Dockerfiles, Docker Compose (Node+Mongo+Redis), PM2 clustering, Nginx reverse proxy, HTTPS, and GitHub Actions CI/CD.",
    topicCount: 20,
  },
  {
    id: "M29", number: 29, title: "Real-World Projects",
    khmerTitle: "គម្រោងអនុវត្តជាក់ស្តែងទាំង ៦ (Real-World Projects)",
    category: "Projects", accentColor: "#10b981", duration: "10 Hours",
    description: "6 complete, production-grade applications from simple CRUD to full-scale multi-service architecture with Redis, Docker, and Swagger.",
    topicCount: 6,
  },
];
