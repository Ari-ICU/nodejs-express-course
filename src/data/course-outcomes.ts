export interface CourseOutcomeItem {
  id: number;
  title: string;
  khmerTitle: string;
  description: string;
  category: "Core API" | "Databases" | "Architecture & Security" | "DevOps & Production";
  skillsLearned: string[];
}

export const COURSE_OUTCOMES: CourseOutcomeItem[] = [
  {
    id: 1,
    title: "Build backend applications with Node.js",
    khmerTitle: "បង្កើតកម្មវិធី Backend ដោយប្រើប្រាស់ Node.js",
    description: "Understand the runtime, V8 engine, core modules, process handling, and environment configuration.",
    category: "Core API",
    skillsLearned: ["V8 Runtime", "Core Modules (fs, path, os)", "process.env", "NVM"]
  },
  {
    id: 2,
    title: "Build REST APIs with Express.js",
    khmerTitle: "បង្កើត RESTful APIs ជាមួយ Express.js",
    description: "Design modular route handlers, nested routers, and robust request/response pipelines.",
    category: "Core API",
    skillsLearned: ["express.Router()", "Route Parameters", "Query Strings", "JSON Serialization"]
  },
  {
    id: 3,
    title: "Design CRUD APIs",
    khmerTitle: "រចនាប្រព័ន្ធ CRUD APIs តាមស្តង់ដារ",
    description: "Implement resource endpoints adhering to idempotent HTTP methods and standardized status codes.",
    category: "Core API",
    skillsLearned: ["GET/POST/PUT/PATCH/DELETE", "Status Codes (200, 201, 204, 400, 404, 500)", "Resource Naming"]
  },
  {
    id: 4,
    title: "Work with MongoDB",
    khmerTitle: "ធ្វើការជាមួយ MongoDB NoSQL Database",
    description: "Model documents, handle ObjectIds, choose between embedding vs referencing, and use Compass/Atlas.",
    category: "Databases",
    skillsLearned: ["BSON Documents", "Collections", "ObjectId", "Embedded vs Referenced"]
  },
  {
    id: 5,
    title: "Use Mongoose for database operations",
    khmerTitle: "ប្រើប្រាស់ Mongoose ODM សម្រាប់ការគ្រប់គ្រងទិន្នន័យ",
    description: "Define schemas with validators, auto-timestamps, virtuals, pre/post hooks, and relational population.",
    category: "Databases",
    skillsLearned: ["Mongoose Schema", "Model Validation", "Pre-save Hooks", ".populate()"]
  },
  {
    id: 6,
    title: "Structure scalable backend applications",
    khmerTitle: "រៀបចំរចនាសម្ព័ន្ធកម្មវិធី Backend កម្រិត Enterprise",
    description: "Apply separation of concerns through clean Controller-Service-Repository architectural layers.",
    category: "Architecture & Security",
    skillsLearned: ["Separation of Concerns", "Slim Controllers", "Rich Services", "Modularity"]
  },
  {
    id: 7,
    title: "Implement authentication",
    khmerTitle: "បង្កើតប្រព័ន្ធផ្ទៀងផ្ទាត់អត្តសញ្ញាណ (Authentication)",
    description: "Hash passwords with bcrypt and manage access/refresh tokens with HttpOnly SameSite cookies.",
    category: "Architecture & Security",
    skillsLearned: ["bcrypt Salt Rounds", "JWT Access Tokens", "HttpOnly Cookies", "Refresh Token Rotation"]
  },
  {
    id: 8,
    title: "Implement authorization",
    khmerTitle: "បង្កើតប្រព័ន្ធគ្រប់គ្រងសិទ្ធិប្រើប្រាស់ (Authorization / RBAC)",
    description: "Restrict endpoint execution with Role-Based Access Control and user permission hierarchies.",
    category: "Architecture & Security",
    skillsLearned: ["RBAC Middleware", "User Roles", "Resource Ownership", "401 vs 403"]
  },
  {
    id: 9,
    title: "Secure REST APIs",
    khmerTitle: "ការពារសុវត្ថិភាព REST APIs ពីការវាយប្រហារ",
    description: "Harden headers with Helmet, configure CORS, throttle brute-force attacks, and sanitize against NoSQL injection.",
    category: "Architecture & Security",
    skillsLearned: ["Helmet Headers", "CORS Configuration", "express-rate-limit", "mongo-sanitize"]
  },
  {
    id: 10,
    title: "Validate API requests",
    khmerTitle: "ត្រួតពិនិត្យភាពត្រឹមត្រូវនៃទិន្នន័យ Request",
    description: "Assert request body, query parameters, and route parameters with declarative Zod schemas.",
    category: "Core API",
    skillsLearned: ["Zod Schemas", "Validation Middleware", "Data Coercion", "Formatted Error DTOs"]
  },
  {
    id: 11,
    title: "Handle errors properly",
    khmerTitle: "គ្រប់គ្រងកំហុស (Error Handling) ប្រកបដោយវិជ្ជាជីវៈ",
    description: "Centralize error middleware, distinguish operational vs programming bugs, and omit stack traces in production.",
    category: "Core API",
    skillsLearned: ["Custom AppError Class", "4-argument Error Middleware", "Unhandled Rejections", "Safe Production Responses"]
  },
  {
    id: 12,
    title: "Upload and manage files",
    khmerTitle: "Upload និងគ្រប់គ្រងឯកសារ (File Upload)",
    category: "Core API",
    skillsLearned: ["Multer Multipart", "File Size & MIME Filtering", "Cloudflare R2 / S3", "Image Optimization"],
    description: "Process multipart form data, validate MIME types, and stream assets directly to cloud object storage."
  },
  {
    id: 13,
    title: "Document APIs with Swagger",
    khmerTitle: "បង្កើតឯកសារ API ដោយស្វ័យប្រវត្តិតាមរយៈ Swagger / OpenAPI",
    description: "Generate interactive OpenAPI 3.0 documentation from code comments with live request testing.",
    category: "DevOps & Production",
    skillsLearned: ["OpenAPI 3.0", "Swagger-JSDoc", "Swagger UI Express", "Schema Definitions"]
  },
  {
    id: 14,
    title: "Test backend APIs",
    khmerTitle: "ធ្វើតេស្ត Backend APIs ដោយស្វ័យប្រវត្តិ",
    description: "Write automated unit and integration tests using Vitest and Supertest without starting a live HTTP port.",
    category: "DevOps & Production",
    skillsLearned: ["Vitest Runner", "Supertest HTTP Assertions", "Mocking", "Test Database Fixtures"]
  },
  {
    id: 15,
    title: "Use Redis for caching and background jobs",
    khmerTitle: "ប្រើប្រាស់ Redis សម្រាប់ Caching និង Background Jobs",
    description: "Accelerate query performance with in-memory Redis caching and execute deferred tasks with BullMQ.",
    category: "Architecture & Security",
    skillsLearned: ["Redis Key/Value", "Cache Invalidation", "TTL Expiry", "BullMQ Queues"]
  },
  {
    id: 16,
    title: "Build real-time features",
    khmerTitle: "បង្កើតមុខងារទំនាក់ទំនងផ្ទាល់ Real-Time",
    description: "Create bi-directional WebSocket event channels, handle rooms, and manage active user presence with Socket.IO.",
    category: "Architecture & Security",
    skillsLearned: ["Socket.IO Server", "Event Emitters", "Rooms & Namespaces", "Live Chat & Alerts"]
  },
  {
    id: 17,
    title: "Dockerize backend applications",
    khmerTitle: "វេចខ្ចប់កម្មវិធីជាមួយ Docker និង Docker Compose",
    description: "Write multi-stage production Dockerfiles and orchestrate Node, Mongo, and Redis containers together.",
    category: "DevOps & Production",
    skillsLearned: ["Multi-Stage Dockerfile", "Non-root Users", "docker-compose.yml", "Container Networking"]
  },
  {
    id: 18,
    title: "Deploy Node.js applications",
    khmerTitle: "ដាក់ដំណើរការកម្មវិធីលើ Cloud VPS / Ubuntu",
    description: "Set up Ubuntu VPS instances, configure Nginx reverse proxy, install SSL via Certbot, and manage processes with PM2.",
    category: "DevOps & Production",
    skillsLearned: ["Ubuntu Server", "PM2 Cluster Mode", "Nginx Reverse Proxy", "Let's Encrypt SSL"]
  },
  {
    id: 19,
    title: "Build production-ready backend systems",
    khmerTitle: "បង្កើតប្រព័ន្ធ Backend កម្រិត Production ពេញលេញ",
    description: "Deliver fault-tolerant, graceful-shutdown, monitored, and automated CI/CD software pipelines.",
    category: "DevOps & Production",
    skillsLearned: ["Graceful Shutdown (SIGTERM)", "Structured Logging (Pino)", "GitHub Actions CI/CD", "Health Probes"]
  },
  {
    id: 20,
    title: "Connect a ReactJS frontend to a Node.js + Express.js backend",
    khmerTitle: "តភ្ជាប់ ReactJS Frontend ជាមួយ Node.js + Express Backend",
    description: "Seamlessly integrate client apps via Axios/Fetch, handle CORS, store HttpOnly auth, and manage optimistic updates.",
    category: "Core API",
    skillsLearned: ["Axios Interceptors", "CORS Configuration", "Full-Stack State Management", "Error Propagation"]
  }
];

export const FULL_STACK_ROADMAP_STEPS = [
  { step: "01", name: "HTML5", desc: "Semantic tags, forms & inputs", level: "Beginner" },
  { step: "02", name: "CSS3", desc: "Flexbox, Grid, responsive layouts & Tailwind", level: "Beginner" },
  { step: "03", name: "JavaScript ES6+", desc: "Async/await, destructuring, modules & array methods", level: "Beginner" },
  { step: "04", name: "ReactJS / Next.js", desc: "Components, hooks, state, routing & UI rendering", level: "Intermediate" },
  { step: "05", name: "Node.js Core", desc: "V8 runtime, libuv event loop, streams & file system", level: "Intermediate" },
  { step: "06", name: "Express.js", desc: "Routing, middleware pipelines & RESTful API contracts", level: "Intermediate" },
  { step: "07", name: "REST API Design", desc: "Resource endpoints, pagination, status codes & DTOs", level: "Intermediate" },
  { step: "08", name: "MongoDB & Mongoose", desc: "NoSQL document modeling, indexing, schemas & population", level: "Intermediate" },
  { step: "09", name: "Authentication & Security", desc: "JWT, bcrypt, HttpOnly cookies, RBAC, Helmet & Rate Limiting", level: "Advanced" },
  { step: "10", name: "Docker & Redis", desc: "Containerization, caching, BullMQ background queues", level: "Advanced" },
  { step: "11", name: "Production Deployment", desc: "Nginx reverse proxy, SSL, PM2 cluster & CI/CD automation", level: "Production" }
];
