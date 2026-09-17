/**
 * curriculum.ts
 *
 * Lean syllabus and navigation metadata for the 29 modules.
 * In-depth lesson prose, interactive code snippets, tips, and objectives
 * live in individual MDX files under src/content/<ModuleId>/<TopicNumber>.mdx
 */

import { MODULES, type ModuleCategory } from "@/content/_modules";

export type { ModuleCategory };

export interface LessonTopic {
  id: string; // e.g. "M01-01"
  number: string; // e.g. "01"
  title: string;
  khmerTitle: string;
  type: "concept" | "lab" | "architecture";
  codeLanguage?: string;
  summary?: string;
  codeSnippet?: string;
  tip?: string;
  objective?: string;
  expectedOutcome?: string;
}

export interface CourseModule {
  id: string;
  number: number;
  title: string;
  khmerTitle: string;
  category: ModuleCategory;
  accentColor: string;
  description: string;
  duration: string;
  topics: LessonTopic[];
}

const MODULE_TOPICS: Record<string, LessonTopic[]> = {
  M01: [
    { id: "M01-01", number: "01", title: "What is Backend Development?", khmerTitle: "អ្វីជាការអភិវឌ្ឍ Backend?", type: "concept", codeLanguage: "javascript" },
    { id: "M01-02", number: "02", title: "Frontend vs Backend", khmerTitle: "ភាពខុសគ្នារវាង Frontend និង Backend", type: "concept", codeLanguage: "javascript" },
    { id: "M01-03", number: "03", title: "Client-Server Architecture", khmerTitle: "ស្ថាបត្យកម្ម Client-Server", type: "architecture", codeLanguage: "javascript" },
    { id: "M01-04", number: "04", title: "What is Node.js?", khmerTitle: "អ្វីទៅជា Node.js?", type: "concept", codeLanguage: "javascript" },
    { id: "M01-05", number: "05", title: "Why Node.js?", khmerTitle: "ហេតុអ្វីត្រូវជ្រើសរើស Node.js?", type: "concept", codeLanguage: "javascript" },
    { id: "M01-06", number: "06", title: "Node.js Runtime", khmerTitle: "បរិស្ថានប្រតិបត្តិការ Node.js Runtime", type: "architecture", codeLanguage: "javascript" },
    { id: "M01-07", number: "07", title: "Node.js Architecture", khmerTitle: "ស្ថាបត្យកម្មប្រព័ន្ធ Node.js", type: "architecture", codeLanguage: "javascript" },
    { id: "M01-08", number: "08", title: "Event-driven Architecture", khmerTitle: "ស្ថាបត្យកម្មជំរុញដោយព្រឹត្តិការណ៍ (Event-driven)", type: "concept", codeLanguage: "javascript" },
    { id: "M01-09", number: "09", title: "Non-blocking I/O", khmerTitle: "ប្រតិបត្តិការមិនរាំងស្ទះ (Non-blocking I/O)", type: "lab", codeLanguage: "javascript" },
    { id: "M01-10", number: "10", title: "Node.js Use Cases", khmerTitle: "ករណីប្រើប្រាស់សមស្របសម្រាប់ Node.js", type: "concept", codeLanguage: "javascript" },
    { id: "M01-11", number: "11", title: "Installing Node.js", khmerTitle: "ការដំឡើង Node.js ជាមួយ NVM", type: "lab", codeLanguage: "bash" },
    { id: "M01-12", number: "12", title: "Node.js Project Structure", khmerTitle: "រចនាសម្ព័ន្ធ Folder គម្រោង Node.js", type: "architecture", codeLanguage: "bash" },
  ],
  M02: [
    { id: "M02-01", number: "01", title: "Running JavaScript with Node.js", khmerTitle: "ការដំណើរការ JavaScript ជាមួយ Node.js", type: "lab", codeLanguage: "javascript" },
    { id: "M02-02", number: "02", title: "Node.js REPL", khmerTitle: "ការប្រើប្រាស់ Node.js REPL", type: "lab", codeLanguage: "bash" },
    { id: "M02-03", number: "03", title: "package.json", khmerTitle: "ឯកសារកំណត់រចនាសម្ព័ន្ធ package.json", type: "concept", codeLanguage: "json" },
    { id: "M02-04", number: "04", title: "npm (Node Package Manager)", khmerTitle: "ការគ្រប់គ្រងកញ្ចប់កូដជាមួយ npm", type: "concept", codeLanguage: "bash" },
    { id: "M02-05", number: "05", title: "npm Scripts", khmerTitle: "ការសរសេរ npm Scripts សម្រាប់ស្វ័យប្រវត្តិកម្ម", type: "lab", codeLanguage: "json" },
    { id: "M02-06", number: "06", title: "Installing Packages", khmerTitle: "ការដំឡើងកញ្ចប់បណ្ណាល័យ (Packages)", type: "lab", codeLanguage: "bash" },
    { id: "M02-07", number: "07", title: "Dependencies", khmerTitle: "ការពឹងផ្អែកចាំបាច់ (Dependencies)", type: "concept", codeLanguage: "json" },
    { id: "M02-08", number: "08", title: "Dev Dependencies", khmerTitle: "ការពឹងផ្អែកសម្រាប់តែការអភិវឌ្ឍ (Dev Dependencies)", type: "concept", codeLanguage: "bash" },
    { id: "M02-09", number: "09", title: "node_modules", khmerTitle: "ថតផ្ទុកកូដ node_modules", type: "concept", codeLanguage: "bash" },
    { id: "M02-10", number: "10", title: "package-lock.json", khmerTitle: "សារៈសំខាន់នៃ package-lock.json", type: "concept", codeLanguage: "bash" },
    { id: "M02-11", number: "11", title: "CommonJS", khmerTitle: "ប្រព័ន្ធម៉ូឌុល CommonJS (require / module.exports)", type: "concept", codeLanguage: "javascript" },
    { id: "M02-12", number: "12", title: "ES Modules", khmerTitle: "ប្រព័ន្ធម៉ូឌុលទំនើប ES Modules (import / export)", type: "lab", codeLanguage: "javascript" },
    { id: "M02-13", number: "13", title: "Environment Variables", khmerTitle: "អថេរកំណត់បរិស្ថាន (Environment Variables)", type: "concept", codeLanguage: "javascript" },
    { id: "M02-14", number: "14", title: ".env & dotenv", khmerTitle: "ការគ្រប់គ្រង .env ជាមួយបណ្ណាល័យ dotenv", type: "lab", codeLanguage: "javascript" },
    { id: "M02-15", number: "15", title: "process Object", khmerTitle: "វត្ថុប្រព័ន្ធ process ក្នុង Node.js", type: "concept", codeLanguage: "javascript" },
    { id: "M02-16", number: "16", title: "Command Line Arguments", khmerTitle: "អាគុយម៉ង់បន្ទាត់ពាក្យបញ្ជា (Command Line Arguments)", type: "lab", codeLanguage: "javascript" },
  ],
  M03: [
    { id: "M03-01", number: "01", title: "Node.js Core Modules", khmerTitle: "ទិដ្ឋភាពទូទៅនៃ Core Modules", type: "concept", codeLanguage: "javascript" },
    { id: "M03-02", number: "02", title: "fs Module", khmerTitle: "ម៉ូឌុលគ្រប់គ្រងឯកសារ fs Module", type: "lab", codeLanguage: "javascript" },
    { id: "M03-03", number: "03", title: "path Module", khmerTitle: "ម៉ូឌុលផ្លូវឯកសារ path Module", type: "lab", codeLanguage: "javascript" },
    { id: "M03-04", number: "04", title: "os Module", khmerTitle: "ម៉ូឌុលព័ត៌មានប្រព័ន្ធប្រតិបត្តិការ os Module", type: "concept", codeLanguage: "javascript" },
    { id: "M03-05", number: "05", title: "url Module", khmerTitle: "ម៉ូឌុល URL និង SearchParams", type: "lab", codeLanguage: "javascript" },
    { id: "M03-06", number: "06", title: "events Module & EventEmitter", khmerTitle: "ម៉ូឌុល Events និង EventEmitter", type: "lab", codeLanguage: "javascript" },
    { id: "M03-07", number: "07", title: "crypto Module", khmerTitle: "ម៉ូឌុលគ្រីបតូហ្គ្រាហ្វ៊ី crypto Module", type: "lab", codeLanguage: "javascript" },
    { id: "M03-08", number: "08", title: "stream Module", khmerTitle: "ម៉ូឌុល Stream សម្រាប់ទិន្នន័យធំៗ", type: "architecture", codeLanguage: "javascript" },
    { id: "M03-09", number: "09", title: "Buffer", khmerTitle: "ទិន្នន័យប៊ីណារី Buffer", type: "concept", codeLanguage: "javascript" },
    { id: "M03-10", number: "10", title: "Working with Files & Directories", khmerTitle: "ការគ្រប់គ្រងឯកសារ និង Folders", type: "lab", codeLanguage: "javascript" },
  ],
  M04: [
    { id: "M04-01", number: "01", title: "Synchronous vs Asynchronous", khmerTitle: "ការប្រៀបធៀប Synchronous និង Asynchronous", type: "concept", codeLanguage: "javascript" },
    { id: "M04-02", number: "02", title: "Callbacks & Callback Problems", khmerTitle: "Callbacks និងបញ្ហា 'Callback Hell'", type: "concept", codeLanguage: "javascript" },
    { id: "M04-03", number: "03", title: "Promises & async / await", khmerTitle: "Promises និងការប្រើប្រាស់ async / await", type: "lab", codeLanguage: "javascript" },
    { id: "M04-04", number: "04", title: "Event Loop & Phases", khmerTitle: "ដំណើរការ Libuv Event Loop និងដំណាក់កាលនីមួយៗ", type: "architecture", codeLanguage: "javascript" },
    { id: "M04-05", number: "05", title: "Microtasks & Timers", khmerTitle: "ជួរការងារ Microtasks (Promises) និង Timers", type: "lab", codeLanguage: "javascript" },
  ],
  M05: [
    { id: "M05-01", number: "01", title: "HTTP Fundamentals & Lifecycle", khmerTitle: "មូលដ្ឋានគ្រឹះពិធីការ HTTP និងដំណើរការ Request-Response", type: "concept", codeLanguage: "javascript" },
    { id: "M05-02", number: "02", title: "Creating Native HTTP Server", khmerTitle: "ការបង្កើត HTTP Server តាមរយៈ Native 'node:http'", type: "lab", codeLanguage: "javascript" },
    { id: "M05-03", number: "03", title: "Handling Request Body & Streams", khmerTitle: "ការទទួលទិន្នន័យ Request Body តាមរយៈ Data Chunks", type: "lab", codeLanguage: "javascript" },
  ],
  M06: [
    { id: "M06-01", number: "01", title: "What is Express.js & Why Use It?", khmerTitle: "អ្វីជា Express.js និងហេតុអ្វីត្រូវប្រើវា?", type: "concept", codeLanguage: "javascript" },
    { id: "M06-02", number: "02", title: "Request & Response Objects", khmerTitle: "វត្ថុ Request (req) និង Response (res)", type: "concept", codeLanguage: "javascript" },
  ],
  M07: [
    { id: "M07-01", number: "01", title: "express.Router() & Route Modularization", khmerTitle: "ការបំបែក Routes ដោយប្រើ express.Router()", type: "lab", codeLanguage: "javascript" },
    { id: "M07-02", number: "02", title: "Route Parameters & Query Parameters", khmerTitle: "ប៉ារ៉ាម៉ែត្រ Route និង Query Parameters", type: "concept", codeLanguage: "javascript" },
  ],
  M08: [
    { id: "M08-01", number: "01", title: "What is Middleware & The next() Function", khmerTitle: "អ្វីជា Middleware និងតួនាទីរបស់អនុគមន៍ next()", type: "concept", codeLanguage: "javascript" },
    { id: "M08-02", number: "02", title: "Built-in & Third-Party Middleware", khmerTitle: "Middleware ដែលភ្ជាប់មកស្រាប់ និងកញ្ចប់ខាងក្រៅ", type: "lab", codeLanguage: "javascript" },
  ],
  M09: [
    { id: "M09-01", number: "01", title: "REST Principles & HTTP Verbs", khmerTitle: "គោលការណ៍ REST និងកិរិយាស័ព្ទ HTTP", type: "concept", codeLanguage: "javascript" },
    { id: "M09-02", number: "02", title: "Standardized API Response & Pagination", khmerTitle: "ទម្រង់ឆ្លើយតបស្តង់ដារ និង Pagination", type: "lab", codeLanguage: "javascript" },
  ],
  M10: [
    { id: "M10-01", number: "01", title: "Separation of Concerns & Architecture", khmerTitle: "ការបែងចែកទំនួលខុសត្រូវ (Separation of Concerns)", type: "architecture", codeLanguage: "javascript" },
  ],
  M11: [
    { id: "M11-01", number: "01", title: "SQL vs NoSQL & MongoDB Architecture", khmerTitle: "ការប្រៀបធៀប SQL vs NoSQL និងស្ថាបត្យកម្ម MongoDB", type: "concept", codeLanguage: "javascript" },
    { id: "M11-02", number: "02", title: "Embedded Documents vs References", khmerTitle: "ការបង្កប់ឯកសារ (Embedding) vs ការយោង (Referencing)", type: "concept", codeLanguage: "javascript" },
  ],
  M12: [
    { id: "M12-01", number: "01", title: "Schema & Model Definition", khmerTitle: "ការបង្កើត Schema និង Model ជាមួយ Mongoose", type: "lab", codeLanguage: "javascript" },
    { id: "M12-02", number: "02", title: "Mongoose Middleware & Population", khmerTitle: "Mongoose Hooks (Pre/Post) និង Population", type: "lab", codeLanguage: "javascript" },
  ],
  M13: [
    { id: "M13-01", number: "01", title: "Full CRUD API Implementation", khmerTitle: "ការអនុវត្ត CRUD API ពេញលេញ", type: "lab", codeLanguage: "javascript" },
  ],
  M14: [
    { id: "M14-01", number: "01", title: "Request Validation with Zod", khmerTitle: "ការប្រើប្រាស់ Zod Schema Validation Middleware", type: "lab", codeLanguage: "javascript" },
  ],
  M15: [
    { id: "M15-01", number: "01", title: "Custom AppError & Centralized Error Middleware", khmerTitle: "Custom AppError Class និង Error Middleware កណ្តាល", type: "lab", codeLanguage: "javascript" },
  ],
  M16: [
    { id: "M16-01", number: "01", title: "Password Hashing with bcrypt", khmerTitle: "ការ Hash ពាក្យសម្ងាត់ជាមួយ bcrypt", type: "lab", codeLanguage: "javascript" },
    { id: "M16-02", number: "02", title: "JWT & HttpOnly Refresh Token Cookies", khmerTitle: "JWT Tokens និង HttpOnly Cookies សម្រាប់ Refresh Tokens", type: "lab", codeLanguage: "javascript" },
  ],
  M17: [
    { id: "M17-01", number: "01", title: "Role-Based Access Control Middleware", khmerTitle: "Middleware គ្រប់គ្រងសិទ្ធិតាម Role", type: "lab", codeLanguage: "javascript" },
  ],
  M18: [
    { id: "M18-01", number: "01", title: "Rate Limiting & NoSQL Injection Protection", khmerTitle: "ការទប់ស្កាត់ Rate Limit និង NoSQL Injection", type: "lab", codeLanguage: "javascript" },
  ],
  M19: [
    { id: "M19-01", number: "01", title: "File Upload with Multer & Cloudflare R2", khmerTitle: "ការ Upload រូបភាពជាមួយ Multer និង Cloudflare R2", type: "lab", codeLanguage: "javascript" },
  ],
  M20: [
    { id: "M20-01", number: "01", title: "Transactional Email with Nodemailer", khmerTitle: "ការផ្ញើ Email ជាមួយ Nodemailer និង HTML Templates", type: "lab", codeLanguage: "javascript" },
  ],
  M21: [
    { id: "M21-01", number: "01", title: "Interactive Swagger UI Setup", khmerTitle: "ការរៀបចំ Swagger UI សម្រាប់ Express", type: "lab", codeLanguage: "javascript" },
  ],
  M22: [
    { id: "M22-01", number: "01", title: "Integration Testing with Vitest & Supertest", khmerTitle: "ការធ្វើតេស្ត Integration ជាមួយ Vitest និង Supertest", type: "lab", codeLanguage: "javascript" },
  ],
  M23: [
    { id: "M23-01", number: "01", title: "Postman Collections & Auto-Token Injection", khmerTitle: "ការប្រើប្រាស់ Postman Collection និង Script ចាប់ Token", type: "lab", codeLanguage: "javascript" },
  ],
  M24: [
    { id: "M24-01", number: "01", title: "Socket.IO Server & Room Broadcasts", khmerTitle: "ការបង្កើត Socket.IO Server និងការផ្ញើក្នុងបន្ទប់ Rooms", type: "lab", codeLanguage: "javascript" },
  ],
  M25: [
    { id: "M25-01", number: "01", title: "Redis Response Caching Middleware", khmerTitle: "ការប្រើប្រាស់ Redis Caching ដើម្បីកាត់បន្ថយបន្ទុក Database", type: "lab", codeLanguage: "javascript" },
  ],
  M26: [
    { id: "M26-01", number: "01", title: "BullMQ Job Queues & Workers", khmerTitle: "ការប្រើប្រាស់ BullMQ សម្រាប់ Email Queue & Heavy Processing", type: "lab", codeLanguage: "javascript" },
  ],
  M27: [
    { id: "M27-01", number: "01", title: "Enterprise Clean Folder Structure", khmerTitle: "រចនាសម្ព័ន្ធ Folder ស្តង់ដារ Enterprise", type: "architecture", codeLanguage: "bash" },
  ],
  M28: [
    { id: "M28-01", number: "01", title: "Multi-Stage Dockerfile for Node.js", khmerTitle: "ការសរសេរ Multi-Stage Dockerfile កម្រិត Production", type: "lab", codeLanguage: "dockerfile" },
    { id: "M28-02", number: "02", title: "Nginx Reverse Proxy & SSL Configuration", khmerTitle: "ការកំណត់រចនាសម្ព័ន្ធ Nginx Reverse Proxy និង SSL", type: "lab", codeLanguage: "bash" },
  ],
  M29: [
    { id: "M29-01", number: "01", title: "Project 01: Todo REST API", khmerTitle: "គម្រោងទី ១ ៖ Todo REST API", type: "lab", codeLanguage: "javascript" },
    { id: "M29-02", number: "02", title: "Project 02: Student Management API", khmerTitle: "គម្រោងទី ២ ៖ Student Management API", type: "lab", codeLanguage: "javascript" },
    { id: "M29-03", number: "03", title: "Project 03: Authentication API", khmerTitle: "គម្រោងទី ៣ ៖ Authentication & Authorization API", type: "lab", codeLanguage: "javascript" },
    { id: "M29-04", number: "04", title: "Project 04: Product Management API", khmerTitle: "គម្រោងទី ៤ ៖ Product Management API ជាមួយ File Upload", type: "lab", codeLanguage: "javascript" },
    { id: "M29-05", number: "05", title: "Project 05: E-Commerce Backend", khmerTitle: "គម្រោងទី ៥ ៖ ប្រព័ន្ធ E-Commerce Backend ពេញលេញ", type: "lab", codeLanguage: "javascript" },
    { id: "M29-06", number: "06", title: "Project 06: Final Production REST API", khmerTitle: "គម្រោងទី ៦ ៖ Final Production REST API (Cap-Stone)", type: "architecture", codeLanguage: "javascript" },
  ],
};

export const COURSE_MODULES: CourseModule[] = MODULES.map((mod) => ({
  id: mod.id,
  number: mod.number,
  title: mod.title,
  khmerTitle: mod.khmerTitle,
  category: mod.category,
  accentColor: mod.accentColor,
  duration: mod.duration,
  description: mod.description,
  topics: MODULE_TOPICS[mod.id] ?? [],
}));
