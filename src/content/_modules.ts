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
    description: "ស្វែងយល់ពីមូលដ្ឋានគ្រឹះ Backend, Client-Server architecture, HTTP communication និង event-driven model នៃ Node.js។",
    topicCount: 12,
  },
  {
    id: "M02", number: 2, title: "Node.js Fundamentals",
    khmerTitle: "មូលដ្ឋានគ្រឹះ Node.js",
    category: "Fundamentals", accentColor: "#10b981", duration: "3.5 Hours",
    description: "ស្វែងយល់ស៊ីជម្រៅអំពី npm, package.json, scripts, CommonJS vs ES Modules, process object, និង environment configurations (.env)។",
    topicCount: 16,
  },
  {
    id: "M03", number: 3, title: "Node.js Core Modules",
    khmerTitle: "ម៉ូឌុលស្នូល Node.js (Core Modules)",
    category: "Core & Async", accentColor: "#f59e0b", duration: "4 Hours",
    description: "អនុវត្តការប្រើប្រាស់ Built-in Core APIs របស់ Node.js ដូចជា fs, path, os, url, events, crypto, streams, Buffers និង File system operations។",
    topicCount: 14,
  },
  {
    id: "M04", number: 4, title: "Async Node.js",
    khmerTitle: "ប្រតិបត្តិការ Asynchronous ក្នុង Node.js",
    category: "Core & Async", accentColor: "#ec4899", duration: "4.5 Hours",
    description: "គ្រប់គ្រង Asynchronous JavaScript៖ Callbacks, Promises, Async/Await, libuv phases, Event Loop, Microtasks និង Non-blocking I/O patterns។",
    topicCount: 12,
  },
  {
    id: "M05", number: 5, title: "HTTP with Node.js",
    khmerTitle: "ពិធីការ HTTP ជាមួយ Node.js",
    category: "Core & Async", accentColor: "#06b6d4", duration: "3.5 Hours",
    description: "មូលដ្ឋានគ្រឹះ HTTP protocol, Request & Response objects, HTTP Methods, Status Codes, Query Strings, Headers, និង Native HTTP Server ក្នុង Node.js។",
    topicCount: 15,
  },
  {
    id: "M06", number: 6, title: "Express.js Fundamentals",
    khmerTitle: "មូលដ្ឋានគ្រឹះ Express.js",
    category: "Express & REST", accentColor: "#6366f1", duration: "4 Hours",
    description: "ស្វែងយល់អំពី Web Framework ដ៏ពេញនិយម Express.js៖ Application instance, Request និង Response objects, Middleware concepts, និងរចនាសម្ព័ន្ធ Project។",
    topicCount: 14,
  },
  {
    id: "M07", number: 7, title: "Express Routing",
    khmerTitle: "ការរៀបចំ Routing ក្នុង Express.js",
    category: "Express & REST", accentColor: "#8b5cf6", duration: "4 Hours",
    description: "ស្វែងយល់ពី RESTful HTTP routes, params, queries, ការរៀបចំ route grouping ជាមួយ express.Router(), nested routers និងរចនាសម្ព័ន្ធ route modularity ស្អាត។",
    topicCount: 14,
  },
  {
    id: "M08", number: 8, title: "Express Middleware",
    khmerTitle: "ប្រព័ន្ធ Middleware ក្នុង Express.js",
    category: "Express & REST", accentColor: "#a855f7", duration: "4.5 Hours",
    description: "ស្ថាបត្យកម្ម Express Middleware៖ Execution flow, Built-in middleware, Custom middleware, Auth guards, Request logging និង Global error handlers។",
    topicCount: 13,
  },
  {
    id: "M09", number: 9, title: "REST API Development",
    khmerTitle: "ការអភិវឌ្ឍ RESTful API",
    category: "Express & REST", accentColor: "#d946ef", duration: "4.5 Hours",
    description: "គោលការណ៍ RESTful API, HTTP Verbs, Status Codes, Standard JSON Response envelopes, Error structures, Filters, Search និង Pagination។",
    topicCount: 18,
  },
  {
    id: "M10", number: 10, title: "Controllers & Services",
    khmerTitle: "ស្ថាបត្យកម្ម Controllers និង Services",
    category: "Express & REST", accentColor: "#f43f5e", duration: "4 Hours",
    description: "ការបែងចែក Separation of Concerns, Clean Architecture, Slim Controllers, Rich Services, Reusable Business Logic និង Testability។",
    topicCount: 10,
  },
  {
    id: "M11", number: 11, title: "MongoDB Fundamentals",
    khmerTitle: "មូលដ្ឋានគ្រឹះ MongoDB",
    category: "Databases", accentColor: "#10b981", duration: "4.5 Hours",
    description: "ស្វែងយល់ Document Database vs SQL Tables, Collections, Documents, BSON, ObjectId, Embedded documents vs References, និងការ Setup MongoDB Atlas។",
    topicCount: 14,
  },
  {
    id: "M12", number: 12, title: "Mongoose ODM",
    khmerTitle: "ការប្រើប្រាស់ Mongoose ODM",
    category: "Databases", accentColor: "#059669", duration: "5 Hours",
    description: "ការប្រើប្រាស់ Mongoose ODM៖ Schema, Model, Validation, SchemaTypes, Timestamps, Pre/Post Middleware (Hooks), Virtuals និង Population ($lookup)។",
    topicCount: 20,
  },
  {
    id: "M13", number: 13, title: "Database API Development",
    khmerTitle: "ការអភិវឌ្ឍ Database CRUD API ពេញលេញ",
    category: "Databases", accentColor: "#14b8a6", duration: "5 Hours",
    description: "ការអភិវឌ្ឍ MongoDB CRUD API ពេញលេញ៖ Dynamic filtering, Multi-field search, Sorting, Pagination (limit/skip) និង Database connection pooling។",
    topicCount: 19,
  },
  {
    id: "M14", number: 14, title: "Data Validation",
    khmerTitle: "ការត្រួតពិនិត្យទិន្នន័យ (Data Validation)",
    category: "Security & Auth", accentColor: "#eab308", duration: "4 Hours",
    description: "Request validation ជាមួយ Zod និង Joi៖ Body validation, Query validation, Params validation, Data sanitization និង Custom error formatting។",
    topicCount: 11,
  },
  {
    id: "M15", number: 15, title: "Error Handling",
    khmerTitle: "ការគ្រប់គ្រងកំហុស (Error Handling)",
    category: "Security & Auth", accentColor: "#ef4444", duration: "4 Hours",
    description: "Custom Application Error classes, Centralized Express error-handling middleware, Unhandled rejections, Uncaught exceptions និង Production security practices។",
    topicCount: 12,
  },
  {
    id: "M16", number: 16, title: "Authentication",
    khmerTitle: "ប្រព័ន្ធផ្ទៀងផ្ទាត់អត្តសញ្ញាណ (Authentication)",
    category: "Security & Auth", accentColor: "#3b82f6", duration: "5 Hours",
    description: "Password hashing ជាមួយ bcrypt, JSON Web Tokens (JWT), Access tokens, Refresh tokens, HttpOnly cookies, និង Logout flows សុវត្ថិភាព។",
    topicCount: 14,
  },
  {
    id: "M17", number: 17, title: "Authorization (RBAC)",
    khmerTitle: "ការអនុញ្ញាតសិទ្ធិ (Role-Based Access Control)",
    category: "Security & Auth", accentColor: "#8b5cf6", duration: "3.5 Hours",
    description: "Role-Based Access Control (RBAC), Permission matrix, Authorization middleware guards, និង Resource ownership verification។",
    topicCount: 8,
  },
  {
    id: "M18", number: 18, title: "API Security",
    khmerTitle: "សុវត្ថិភាព API (API Security)",
    category: "Security & Auth", accentColor: "#dc2626", duration: "4 Hours",
    description: "សុវត្ថិភាព API៖ CORS configurations, Helmet security headers, Rate limiting, NoSQL injection prevention, XSS និង CSRF protections។",
    topicCount: 15,
  },
  {
    id: "M19", number: 19, title: "File Upload",
    khmerTitle: "ការ Upload ឯកសារ (File Upload)",
    category: "Express & REST", accentColor: "#0ea5e9", duration: "4 Hours",
    description: "Multipart/form-data, Multer configuration, File type & dimension validation, Local disk storage, និង Cloudflare R2 / AWS S3 uploads។",
    topicCount: 13,
  },
  {
    id: "M20", number: 20, title: "Email & Notifications",
    khmerTitle: "ប្រព័ន្ធផ្ញើ Email និងការជូនដំណឹង",
    category: "Advanced & Real-time", accentColor: "#f97316", duration: "3.5 Hours",
    description: "SMTP configuration, Nodemailer, Transactional emails, HTML email templates, Password reset flows និង Verification tokens។",
    topicCount: 10,
  },
  {
    id: "M21", number: 21, title: "API Documentation",
    khmerTitle: "ឯកសារពិពណ៌នា API (OpenAPI / Swagger)",
    category: "Architecture & DevOps", accentColor: "#14b8a6", duration: "3.5 Hours",
    description: "OpenAPI 3.0 specification, Swagger JSDoc, Interactive Swagger UI documentation និង Schema definitions សម្រាប់ API។",
    topicCount: 10,
  },
  {
    id: "M22", number: 22, title: "API Testing",
    khmerTitle: "ការធ្វើតេស្ត API (Vitest & Supertest)",
    category: "Architecture & DevOps", accentColor: "#64748b", duration: "4.5 Hours",
    description: "Unit testing, Integration testing, Supertest សម្រាប់ HTTP endpoint tests, In-memory database testing, និង Mocking techniques។",
    topicCount: 13,
  },
  {
    id: "M23", number: 23, title: "API Development Tools",
    khmerTitle: "ឧបករណ៍អភិវឌ្ឍន៍ API (Postman & Scripts)",
    category: "Architecture & DevOps", accentColor: "#f97316", duration: "3 Hours",
    description: "Postman collections, Environment variables, Pre-request scripts, Automated test assertions, និង Newman CI test runner integration។",
    topicCount: 10,
  },
  {
    id: "M24", number: 24, title: "Real-Time Features",
    khmerTitle: "មុខងារ Real-Time (WebSockets & Socket.IO)",
    category: "Advanced & Real-time", accentColor: "#06b6d4", duration: "4.5 Hours",
    description: "Full-duplex WebSocket communication, Socket.IO Server & Client, Rooms, Namespaces, Online presence tracking និង Real-time chat system។",
    topicCount: 10,
  },
  {
    id: "M25", number: 25, title: "Performance & Caching",
    khmerTitle: "ការបង្កើនល្បឿន និង Caching (Redis)",
    category: "Advanced & Real-time", accentColor: "#ef4444", duration: "4.5 Hours",
    description: "Node.js profiling, MongoDB index optimization, Compound indexes, Response compression (gzip/brotli), និង In-memory caching ជាមួយ Redis។",
    topicCount: 12,
  },
  {
    id: "M26", number: 26, title: "Background Jobs",
    khmerTitle: "ការងារដំណើរការនៅខាងក្រោយ (BullMQ & Queues)",
    category: "Advanced & Real-time", accentColor: "#8b5cf6", duration: "4.5 Hours",
    description: "Asynchronous task delegation, Message queues, BullMQ ជាមួយ Redis, Producers, Workers, Automatic retries, និង Scheduled cron jobs។",
    topicCount: 12,
  },
  {
    id: "M27", number: 27, title: "Backend Project Architecture",
    khmerTitle: "ស្ថាបត្យកម្មគម្រោង Backend កម្រិត Enterprise",
    category: "Architecture & DevOps", accentColor: "#10b981", duration: "4 Hours",
    description: "Enterprise backend directory structure, Clean domain-driven separation, Dependency injection patterns, និង Scalable production codebases។",
    topicCount: 15,
  },
  {
    id: "M28", number: 28, title: "Production & Deployment",
    khmerTitle: "ការដាក់ឱ្យដំណើរការលើ Production (Docker, Nginx, CI/CD)",
    category: "Architecture & DevOps", accentColor: "#3b82f6", duration: "5 Hours",
    description: "Dockerizing Node.js, Multi-stage Dockerfiles, Docker Compose (Node + Mongo + Redis), PM2 clustering, Nginx reverse proxy, HTTPS, និង GitHub Actions CI/CD។",
    topicCount: 20,
  },
  {
    id: "M29", number: 29, title: "Real-World Projects",
    khmerTitle: "គម្រោងអនុវត្តជាក់ស្តែងទាំង ៦ (Real-World Projects)",
    category: "Projects", accentColor: "#10b981", duration: "10 Hours",
    description: "គម្រោងអនុវត្តកម្រិត Production ចំនួន ៦ ពេញលេញ ចាប់ពី Simple CRUD រហូតដល់ Multi-service architecture ជាមួយ Redis, Docker និង Swagger។",
    topicCount: 6,
  },
];
