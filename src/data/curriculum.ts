/**
 * curriculum.ts
 *
 * Complete syllabus and navigation metadata for all 29 modules.
 * In-depth lesson prose, interactive code snippets, tips, and objectives
 * live in individual MDX files under src/content/<ModuleId>/<TopicNumber>.mdx
 */

import { MODULES, type ModuleCategory } from "@/content/_modules";

export type { ModuleCategory };

export interface LessonTopic {
  id: string;        // e.g. "M01-01"
  number: string;    // e.g. "01"
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
    { id: "M02-01", number: "01", title: "Running JavaScript with Node.js", khmerTitle: "ការដំណើរការ JavaScript ជាមួយ Node.js", type: "lab", codeLanguage: "bash" },
    { id: "M02-02", number: "02", title: "Node.js REPL", khmerTitle: "ការប្រើប្រាស់ Node.js REPL", type: "lab", codeLanguage: "bash" },
    { id: "M02-03", number: "03", title: "package.json", khmerTitle: "ឯកសារកំណត់រចនាសម្ព័ន្ធ package.json", type: "concept", codeLanguage: "json" },
    { id: "M02-04", number: "04", title: "npm", khmerTitle: "ការគ្រប់គ្រងកញ្ចប់កូដជាមួយ npm", type: "concept", codeLanguage: "bash" },
    { id: "M02-05", number: "05", title: "npm Scripts", khmerTitle: "ការសរសេរ npm Scripts សម្រាប់ស្វ័យប្រវត្តិកម្ម", type: "lab", codeLanguage: "json" },
    { id: "M02-06", number: "06", title: "Installing Packages", khmerTitle: "ការដំឡើងកញ្ចប់បណ្ណាល័យ (Packages)", type: "lab", codeLanguage: "bash" },
    { id: "M02-07", number: "07", title: "Dependencies", khmerTitle: "ការពឹងផ្អែកចាំបាច់ (Dependencies)", type: "concept", codeLanguage: "json" },
    { id: "M02-08", number: "08", title: "Dev Dependencies", khmerTitle: "ការពឹងផ្អែកសម្រាប់តែការអភិវឌ្ឍ (Dev Dependencies)", type: "concept", codeLanguage: "bash" },
    { id: "M02-09", number: "09", title: "node_modules", khmerTitle: "ថតផ្ទុកកូដ node_modules", type: "concept", codeLanguage: "bash" },
    { id: "M02-10", number: "10", title: "package-lock.json", khmerTitle: "សារៈសំខាន់នៃ package-lock.json", type: "concept", codeLanguage: "bash" },
    { id: "M02-11", number: "11", title: "CommonJS", khmerTitle: "ប្រព័ន្ធម៉ូឌុល CommonJS (require / module.exports)", type: "concept", codeLanguage: "javascript" },
    { id: "M02-12", number: "12", title: "ES Modules", khmerTitle: "ប្រព័ន្ធម៉ូឌុលទំនើប ES Modules (import / export)", type: "lab", codeLanguage: "javascript" },
    { id: "M02-13", number: "13", title: "Environment Variables", khmerTitle: "អថេរកំណត់បរិស្ថាន (Environment Variables)", type: "concept", codeLanguage: "javascript" },
    { id: "M02-14", number: "14", title: ".env", khmerTitle: "ការគ្រប់គ្រង .env ជាមួយបណ្ណាល័យ dotenv", type: "lab", codeLanguage: "javascript" },
    { id: "M02-15", number: "15", title: "process", khmerTitle: "វត្ថុប្រព័ន្ធ process ក្នុង Node.js", type: "concept", codeLanguage: "javascript" },
    { id: "M02-16", number: "16", title: "Command Line Arguments", khmerTitle: "អាគុយម៉ង់បន្ទាត់ពាក្យបញ្ជា (Command Line Arguments)", type: "lab", codeLanguage: "javascript" },
  ],
  M03: [
    { id: "M03-01", number: "01", title: "Node.js Core Modules", khmerTitle: "ទិដ្ឋភាពទូទៅនៃ Core Modules", type: "concept", codeLanguage: "javascript" },
    { id: "M03-02", number: "02", title: "fs Module", khmerTitle: "ម៉ូឌុលគ្រប់គ្រងឯកសារ fs Module", type: "lab", codeLanguage: "javascript" },
    { id: "M03-03", number: "03", title: "path Module", khmerTitle: "ម៉ូឌុលផ្លូវឯកសារ path Module", type: "lab", codeLanguage: "javascript" },
    { id: "M03-04", number: "04", title: "os Module", khmerTitle: "ម៉ូឌុលព័ត៌មានប្រព័ន្ធប្រតិបត្តិការ os Module", type: "concept", codeLanguage: "javascript" },
    { id: "M03-05", number: "05", title: "url Module", khmerTitle: "ម៉ូឌុល URL និង SearchParams", type: "lab", codeLanguage: "javascript" },
    { id: "M03-06", number: "06", title: "events Module", khmerTitle: "ម៉ូឌុល Events", type: "lab", codeLanguage: "javascript" },
    { id: "M03-07", number: "07", title: "crypto Module", khmerTitle: "ម៉ូឌុលគ្រីបតូហ្គ្រាហ្វ៊ី crypto Module", type: "lab", codeLanguage: "javascript" },
    { id: "M03-08", number: "08", title: "stream Module", khmerTitle: "ម៉ូឌុល Stream សម្រាប់ទិន្នន័យធំៗ", type: "architecture", codeLanguage: "javascript" },
    { id: "M03-09", number: "09", title: "Buffer", khmerTitle: "ទិន្នន័យប៊ីណារី Buffer", type: "concept", codeLanguage: "javascript" },
    { id: "M03-10", number: "10", title: "EventEmitter", khmerTitle: "ការបង្កើត Custom EventEmitter Class", type: "lab", codeLanguage: "javascript" },
    { id: "M03-11", number: "11", title: "Working with Files", khmerTitle: "ការគ្រប់គ្រងឯកសារក្នុង Server", type: "lab", codeLanguage: "javascript" },
    { id: "M03-12", number: "12", title: "Reading Files", khmerTitle: "ការអានឯកសារ (Text & JSON)", type: "lab", codeLanguage: "javascript" },
    { id: "M03-13", number: "13", title: "Writing Files", khmerTitle: "ការសរសេរ និងកែប្រែឯកសារ", type: "lab", codeLanguage: "javascript" },
    { id: "M03-14", number: "14", title: "Working with Directories", khmerTitle: "ការគ្រប់គ្រង និងស្វែងរកថត Folders", type: "lab", codeLanguage: "javascript" },
  ],
  M04: [
    { id: "M04-01", number: "01", title: "Synchronous vs Asynchronous", khmerTitle: "ការប្រៀបធៀប Synchronous និង Asynchronous", type: "concept", codeLanguage: "javascript" },
    { id: "M04-02", number: "02", title: "Callbacks", khmerTitle: "មូលដ្ឋានគ្រឹះ Callbacks ក្នុង Node.js", type: "concept", codeLanguage: "javascript" },
    { id: "M04-03", number: "03", title: "Callback Problems", khmerTitle: "បញ្ហា Callback Hell និង Inversion of Control", type: "concept", codeLanguage: "javascript" },
    { id: "M04-04", number: "04", title: "Promises", khmerTitle: "ស្ថាបត្យកម្ម Promises (Pending, Fulfilled, Rejected)", type: "lab", codeLanguage: "javascript" },
    { id: "M04-05", number: "05", title: "async / await", khmerTitle: "ការប្រើប្រាស់ async / await ទំនើប", type: "lab", codeLanguage: "javascript" },
    { id: "M04-06", number: "06", title: "Error Handling", khmerTitle: "ការគ្រប់គ្រងកំហុស Asynchronous Error Handling", type: "lab", codeLanguage: "javascript" },
    { id: "M04-07", number: "07", title: "Event Loop", khmerTitle: "ដំណើរការ Event Loop របស់ Node.js", type: "architecture", codeLanguage: "javascript" },
    { id: "M04-08", number: "08", title: "Event Queue", khmerTitle: "ជួរការងារ Event Queue និង Task Queues", type: "architecture", codeLanguage: "javascript" },
    { id: "M04-09", number: "09", title: "Microtasks", khmerTitle: "ជួរការងារ Microtasks (process.nextTick & Promises)", type: "lab", codeLanguage: "javascript" },
    { id: "M04-10", number: "10", title: "Timers", khmerTitle: "ការប្រើប្រាស់ Timers (setTimeout, setInterval, setImmediate)", type: "lab", codeLanguage: "javascript" },
    { id: "M04-11", number: "11", title: "Non-blocking Operations", khmerTitle: "ការធានាប្រតិបត្តិការមិនរាំងស្ទះ", type: "lab", codeLanguage: "javascript" },
    { id: "M04-12", number: "12", title: "Async Best Practices", khmerTitle: "ការអនុវត្តល្អបំផុតសម្រាប់ Async Node.js", type: "concept", codeLanguage: "javascript" },
  ],
  M05: [
    { id: "M05-01", number: "01", title: "HTTP Fundamentals", khmerTitle: "មូលដ្ឋានគ្រឹះពិធីការ HTTP និងដំណើរការ Request-Response", type: "concept", codeLanguage: "javascript" },
    { id: "M05-02", number: "02", title: "HTTP Request", khmerTitle: "រចនាសម្ព័ន្ធនៃ HTTP Request (req)", type: "concept", codeLanguage: "javascript" },
    { id: "M05-03", number: "03", title: "HTTP Response", khmerTitle: "រចនាសម្ព័ន្ធនៃ HTTP Response (res)", type: "concept", codeLanguage: "javascript" },
    { id: "M05-04", number: "04", title: "HTTP Methods", khmerTitle: "កិរិយាស័ព្ទ HTTP (GET, POST, PUT, PATCH, DELETE)", type: "concept", codeLanguage: "javascript" },
    { id: "M05-05", number: "05", title: "HTTP Headers", khmerTitle: "សារៈសំខាន់នៃ HTTP Headers", type: "concept", codeLanguage: "javascript" },
    { id: "M05-06", number: "06", title: "HTTP Status Codes", khmerTitle: "លេខកូដស្ថានភាព HTTP Status Codes", type: "concept", codeLanguage: "javascript" },
    { id: "M05-07", number: "07", title: "URL", khmerTitle: "រចនាសម្ព័ន្ធ URL (Protocol, Host, Port, Path, Query)", type: "concept", codeLanguage: "javascript" },
    { id: "M05-08", number: "08", title: "Query Parameters", khmerTitle: "ការប្រើប្រាស់ Query Parameters សម្រាប់ Filter & Sort", type: "lab", codeLanguage: "javascript" },
    { id: "M05-09", number: "09", title: "Route Parameters", khmerTitle: "ការប្រើប្រាស់ Route Parameters សម្រាប់កំណត់អត្តសញ្ញាណ", type: "concept", codeLanguage: "javascript" },
    { id: "M05-10", number: "10", title: "Request Body", khmerTitle: "ការទទួលទិន្នន័យ Request Body តាមរយៈ Streams", type: "lab", codeLanguage: "javascript" },
    { id: "M05-11", number: "11", title: "JSON", khmerTitle: "ទម្រង់ទិន្នន័យ JSON ក្នុង Web APIs", type: "concept", codeLanguage: "javascript" },
    { id: "M05-12", number: "12", title: "Content-Type", khmerTitle: "សារៈសំខាន់នៃ Header Content-Type", type: "concept", codeLanguage: "javascript" },
    { id: "M05-13", number: "13", title: "Creating an HTTP Server", khmerTitle: "ការបង្កើត HTTP Server តាមរយៈ Native 'node:http'", type: "lab", codeLanguage: "javascript" },
    { id: "M05-14", number: "14", title: "Handling Requests", khmerTitle: "ការគ្រប់គ្រងផ្លូវ Requests (Basic Routing)", type: "lab", codeLanguage: "javascript" },
    { id: "M05-15", number: "15", title: "Sending Responses", khmerTitle: "ការបញ្ជូនទិន្នន័យត្រឡប់ទៅកាន់ Client", type: "lab", codeLanguage: "javascript" },
  ],
  M06: [
    { id: "M06-01", number: "01", title: "What is Express.js?", khmerTitle: "អ្វីជា Express.js និងហេតុអ្វីត្រូវប្រើវា?", type: "concept", codeLanguage: "javascript" },
    { id: "M06-02", number: "02", title: "Why Express.js?", khmerTitle: "គុណសម្បត្តិនៃការប្រើប្រាស់ Express.js", type: "concept", codeLanguage: "javascript" },
    { id: "M06-03", number: "03", title: "Installing Express", khmerTitle: "ការដំឡើងកញ្ចប់ Express ក្នុងគម្រោង", type: "lab", codeLanguage: "bash" },
    { id: "M06-04", number: "04", title: "Express Application", khmerTitle: "ការបង្កើត Application Instance", type: "concept", codeLanguage: "javascript" },
    { id: "M06-05", number: "05", title: "Starting a Server", khmerTitle: "ការចាប់ផ្តើម Server ជាមួយ app.listen()", type: "lab", codeLanguage: "javascript" },
    { id: "M06-06", number: "06", title: "Request Object", khmerTitle: "ការស្វែងយល់ពី Request Object (req)", type: "concept", codeLanguage: "javascript" },
    { id: "M06-07", number: "07", title: "Response Object", khmerTitle: "ការស្វែងយល់ពី Response Object (res)", type: "concept", codeLanguage: "javascript" },
    { id: "M06-08", number: "08", title: "Middleware Concept", khmerTitle: "ទស្សនទាន Middleware ក្នុង Express", type: "concept", codeLanguage: "javascript" },
    { id: "M06-09", number: "09", title: "Routing", khmerTitle: "មូលដ្ឋានគ្រឹះនៃការរៀបចំ Routing", type: "concept", codeLanguage: "javascript" },
    { id: "M06-10", number: "10", title: "Route Handlers", khmerTitle: "ការសរសេរ Route Handlers ជាមួយ Callbacks ច្រើន", type: "lab", codeLanguage: "javascript" },
    { id: "M06-11", number: "11", title: "HTTP Methods", khmerTitle: "ការប្រើប្រាស់ HTTP Methods ក្នុង Express", type: "concept", codeLanguage: "javascript" },
    { id: "M06-12", number: "12", title: "JSON Responses", khmerTitle: "ការបញ្ជូនទិន្នន័យ JSON ជាមួយ res.json()", type: "lab", codeLanguage: "javascript" },
    { id: "M06-13", number: "13", title: "Status Codes", khmerTitle: "ការកំណត់លេខកូដឆ្លើយតបជាមួយ res.status()", type: "lab", codeLanguage: "javascript" },
    { id: "M06-14", number: "14", title: "Express Project Structure", khmerTitle: "រចនាសម្ព័ន្ធគម្រោង Express.js កម្រិត Enterprise", type: "architecture", codeLanguage: "bash" },
  ],
  M07: [
    { id: "M07-01", number: "01", title: "Basic Routes", khmerTitle: "ការបង្កើត Basic Routes", type: "concept", codeLanguage: "javascript" },
    { id: "M07-02", number: "02", title: "GET Routes", khmerTitle: "ការបង្កើត GET Routes សម្រាប់ទាញយកទិន្នន័យ", type: "lab", codeLanguage: "javascript" },
    { id: "M07-03", number: "03", title: "POST Routes", khmerTitle: "ការបង្កើត POST Routes សម្រាប់បញ្ចូលទិន្នន័យ", type: "lab", codeLanguage: "javascript" },
    { id: "M07-04", number: "04", title: "PUT Routes", khmerTitle: "ការបង្កើត PUT Routes សម្រាប់ជំនួសទិន្នន័យចាស់ទាំងស្រុង", type: "lab", codeLanguage: "javascript" },
    { id: "M07-05", number: "05", title: "PATCH Routes", khmerTitle: "ការបង្កើត PATCH Routes សម្រាប់កែប្រែទិន្នន័យមួយផ្នែក", type: "lab", codeLanguage: "javascript" },
    { id: "M07-06", number: "06", title: "DELETE Routes", khmerTitle: "ការបង្កើត DELETE Routes សម្រាប់លុបទិន្នន័យ", type: "lab", codeLanguage: "javascript" },
    { id: "M07-07", number: "07", title: "Route Parameters", khmerTitle: "ការទាញយក Route Parameters ពី URL (:id)", type: "concept", codeLanguage: "javascript" },
    { id: "M07-08", number: "08", title: "Query Parameters", khmerTitle: "ការទាញយក Query Parameters (?page=1&sort=desc)", type: "concept", codeLanguage: "javascript" },
    { id: "M07-09", number: "09", title: "Multiple Routes", khmerTitle: "ការគ្រប់គ្រង Routes ច្រើនក្នុងកម្មវិធី", type: "concept", codeLanguage: "javascript" },
    { id: "M07-10", number: "10", title: "express.Router()", khmerTitle: "ការបំបែក Routes ដោយប្រើ express.Router()", type: "lab", codeLanguage: "javascript" },
    { id: "M07-11", number: "11", title: "Route Groups", khmerTitle: "ការរៀបចំ Route Groups ជាមួយ Common Prefixes", type: "lab", codeLanguage: "javascript" },
    { id: "M07-12", number: "12", title: "Nested Routes", khmerTitle: "ការបង្កើត Nested Routes (Parent-Child Relationships)", type: "lab", codeLanguage: "javascript" },
    { id: "M07-13", number: "13", title: "Route Organization", khmerTitle: "ការរៀបចំរចនាសម្ព័ន្ធ Routes ក្នុងគម្រោងធំ", type: "architecture", codeLanguage: "javascript" },
    { id: "M07-14", number: "14", title: "RESTful Routes", khmerTitle: "គោលការណ៍ស្តង់ដារ RESTful Routes", type: "concept", codeLanguage: "javascript" },
  ],
  M08: [
    { id: "M08-01", number: "01", title: "What is Middleware?", khmerTitle: "អ្វីជា Middleware និងតួនាទីរបស់អនុគមន៍ next()", type: "concept", codeLanguage: "javascript" },
    { id: "M08-02", number: "02", title: "Application Middleware", khmerTitle: "ការប្រើប្រាស់ Application-level Middleware (app.use)", type: "concept", codeLanguage: "javascript" },
    { id: "M08-03", number: "03", title: "Router Middleware", khmerTitle: "ការប្រើប្រាស់ Router-level Middleware", type: "lab", codeLanguage: "javascript" },
    { id: "M08-04", number: "04", title: "Built-in Middleware", khmerTitle: "Middleware ដែលភ្ជាប់មកស្រាប់ជាមួយ Express", type: "concept", codeLanguage: "javascript" },
    { id: "M08-05", number: "05", title: "express.json()", khmerTitle: "ការប្រើប្រាស់ express.json() សម្រាប់ Body Parsing", type: "lab", codeLanguage: "javascript" },
    { id: "M08-06", number: "06", title: "express.urlencoded()", khmerTitle: "ការប្រើប្រាស់ express.urlencoded()", type: "lab", codeLanguage: "javascript" },
    { id: "M08-07", number: "07", title: "Custom Middleware", khmerTitle: "ការបង្កើត Custom Middleware ផ្ទាល់ខ្លួន", type: "lab", codeLanguage: "javascript" },
    { id: "M08-08", number: "08", title: "Authentication Middleware", khmerTitle: "ការបង្កើត Authentication Middleware សម្រាប់ផ្ទៀងផ្ទាត់ JWT", type: "lab", codeLanguage: "javascript" },
    { id: "M08-09", number: "09", title: "Authorization Middleware", khmerTitle: "ការបង្កើត Authorization Middleware តាម Role", type: "lab", codeLanguage: "javascript" },
    { id: "M08-10", number: "10", title: "Logging Middleware", khmerTitle: "ការប្រើប្រាស់ Morgan និង Custom Logging Middleware", type: "lab", codeLanguage: "javascript" },
    { id: "M08-11", number: "11", title: "Error Middleware", khmerTitle: "ការបង្កើត Centralized Error Handling Middleware", type: "lab", codeLanguage: "javascript" },
    { id: "M08-12", number: "12", title: "Middleware Order", khmerTitle: "សារៈសំខាន់នៃលំដាប់លំដោយ Middleware Order", type: "concept", codeLanguage: "javascript" },
    { id: "M08-13", number: "13", title: "Middleware Best Practices", khmerTitle: "ការអនុវត្តល្អបំផុតសម្រាប់ប្រព័ន្ធ Middleware", type: "concept", codeLanguage: "javascript" },
  ],
  M09: [
    { id: "M09-01", number: "01", title: "What is REST?", khmerTitle: "អ្វីជាស្ថាបត្យកម្ម REST?", type: "concept", codeLanguage: "javascript" },
    { id: "M09-02", number: "02", title: "REST Principles", khmerTitle: "គោលការណ៍គ្រឹះទាំង ៦ នៃ REST", type: "concept", codeLanguage: "javascript" },
    { id: "M09-03", number: "03", title: "RESTful API Design", khmerTitle: "ការរចនា RESTful API ប្រកបដោយវិជ្ជាជីវៈ", type: "architecture", codeLanguage: "javascript" },
    { id: "M09-04", number: "04", title: "Resources", khmerTitle: "ការកំណត់ និងគ្រប់គ្រង Resources", type: "concept", codeLanguage: "javascript" },
    { id: "M09-05", number: "05", title: "CRUD", khmerTitle: "ប្រតិបត្តិការ CRUD និងការផ្សារភ្ជាប់ជាមួយ HTTP", type: "concept", codeLanguage: "javascript" },
    { id: "M09-06", number: "06", title: "GET", khmerTitle: "ការអនុវត្ត GET Endpoint ស្តង់ដារ", type: "lab", codeLanguage: "javascript" },
    { id: "M09-07", number: "07", title: "POST", khmerTitle: "ការអនុវត្ត POST Endpoint ស្តង់ដារ", type: "lab", codeLanguage: "javascript" },
    { id: "M09-08", number: "08", title: "PUT", khmerTitle: "ការអនុវត្ត PUT Endpoint ស្តង់ដារ", type: "lab", codeLanguage: "javascript" },
    { id: "M09-09", number: "09", title: "PATCH", khmerTitle: "ការអនុវត្ត PATCH Endpoint ស្តង់ដារ", type: "lab", codeLanguage: "javascript" },
    { id: "M09-10", number: "10", title: "DELETE", khmerTitle: "ការអនុវត្ត DELETE Endpoint ស្តង់ដារ", type: "lab", codeLanguage: "javascript" },
    { id: "M09-11", number: "11", title: "HTTP Status Codes", khmerTitle: "ការជ្រើសរើស Status Codes ត្រឹមត្រូវក្នុង REST APIs", type: "concept", codeLanguage: "javascript" },
    { id: "M09-12", number: "12", title: "API Response Structure", khmerTitle: "ទម្រង់ឆ្លើយតបស្តង់ដារ JSON Envelope", type: "concept", codeLanguage: "javascript" },
    { id: "M09-13", number: "13", title: "API Error Structure", khmerTitle: "ទម្រង់ឆ្លើយតបកំហុសស្តង់ដារ Error Envelope", type: "concept", codeLanguage: "javascript" },
    { id: "M09-14", number: "14", title: "Pagination", khmerTitle: "ការរៀបចំ Pagination (Limit & Skip)", type: "lab", codeLanguage: "javascript" },
    { id: "M09-15", number: "15", title: "Filtering", khmerTitle: "ការបង្កើត Query Filtering សម្រាប់ Search & Categories", type: "lab", codeLanguage: "javascript" },
    { id: "M09-16", number: "16", title: "Searching", khmerTitle: "ការស្វែងរកទិន្នន័យ (Regex & Text Index Search)", type: "lab", codeLanguage: "javascript" },
    { id: "M09-17", number: "17", title: "Sorting", khmerTitle: "ការរៀបចំលំដាប់លំដោយ Sorting (Ascending & Descending)", type: "lab", codeLanguage: "javascript" },
    { id: "M09-18", number: "18", title: "API Versioning", khmerTitle: "ការគ្រប់គ្រងកំណែ API Versioning (URI vs Header)", type: "concept", codeLanguage: "javascript" },
  ],
  M10: [
    { id: "M10-01", number: "01", title: "Why Separate Business Logic?", khmerTitle: "ហេតុអ្វីត្រូវបំបែក Business Logic ចេញពី Controller?", type: "concept", codeLanguage: "javascript" },
    { id: "M10-02", number: "02", title: "Controllers", khmerTitle: "តួនាទី និងទំនួលខុសត្រូវរបស់ Controllers", type: "concept", codeLanguage: "javascript" },
    { id: "M10-03", number: "03", title: "Services", khmerTitle: "តួនាទី និងទំនួលខុសត្រូវរបស់ Services", type: "concept", codeLanguage: "javascript" },
    { id: "M10-04", number: "04", title: "Routes", khmerTitle: "តួនាទីនៃ Route Definitions", type: "concept", codeLanguage: "javascript" },
    { id: "M10-05", number: "05", title: "Separation of Concerns", khmerTitle: "ការបែងចែកទំនួលខុសត្រូវ (Separation of Concerns)", type: "architecture", codeLanguage: "javascript" },
    { id: "M10-06", number: "06", title: "Controller-Service Architecture", khmerTitle: "ស្ថាបត្យកម្ម Controller-Service", type: "architecture", codeLanguage: "javascript" },
    { id: "M10-07", number: "07", title: "Reusable Business Logic", khmerTitle: "ការសរសេរ Business Logic ដែលអាចប្រើឡើងវិញបាន", type: "lab", codeLanguage: "javascript" },
    { id: "M10-08", number: "08", title: "Error Handling", khmerTitle: "ការគ្រប់គ្រងកំហុសក្នុង Service Layer", type: "lab", codeLanguage: "javascript" },
    { id: "M10-09", number: "09", title: "Project Organization", khmerTitle: "ការរៀបចំ Directory និងឯកសារ Controller-Service", type: "architecture", codeLanguage: "bash" },
    { id: "M10-10", number: "10", title: "Backend Architecture Best Practices", khmerTitle: "ការអនុវត្តស្ថាបត្យកម្មល្អបំផុតសម្រាប់ Backend", type: "architecture", codeLanguage: "javascript" },
  ],
  M11: [
    { id: "M11-01", number: "01", title: "What is MongoDB?", khmerTitle: "អ្វីជាប្រព័ន្ធទិន្នន័យ MongoDB?", type: "concept", codeLanguage: "javascript" },
    { id: "M11-02", number: "02", title: "SQL vs NoSQL", khmerTitle: "ការប្រៀបធៀប SQL vs NoSQL", type: "concept", codeLanguage: "javascript" },
    { id: "M11-03", number: "03", title: "MongoDB Architecture", khmerTitle: "ស្ថាបត្យកម្មប្រព័ន្ធ MongoDB", type: "architecture", codeLanguage: "javascript" },
    { id: "M11-04", number: "04", title: "Database", khmerTitle: "ការបង្កើត និងគ្រប់គ្រង Database", type: "concept", codeLanguage: "javascript" },
    { id: "M11-05", number: "05", title: "Collections", khmerTitle: "ការគ្រប់គ្រង Collections", type: "concept", codeLanguage: "javascript" },
    { id: "M11-06", number: "06", title: "Documents", khmerTitle: "រចនាសម្ព័ន្ធនៃ Document", type: "concept", codeLanguage: "javascript" },
    { id: "M11-07", number: "07", title: "Fields", khmerTitle: "ការកំណត់ Fields និងប្រភេទ BSON Data Types", type: "concept", codeLanguage: "javascript" },
    { id: "M11-08", number: "08", title: "ObjectId", khmerTitle: "ការស្វែងយល់ពី ObjectId (12-byte BSON Identifier)", type: "concept", codeLanguage: "javascript" },
    { id: "M11-09", number: "09", title: "Embedded Documents", khmerTitle: "ការបង្កប់ឯកសារ (Embedding / Denormalization)", type: "concept", codeLanguage: "javascript" },
    { id: "M11-10", number: "10", title: "References", khmerTitle: "ការភ្ជាប់ទំនាក់ទំនងតាមរយៈ References (Normalization)", type: "concept", codeLanguage: "javascript" },
    { id: "M11-11", number: "11", title: "MongoDB CRUD", khmerTitle: "ប្រតិបត្តិការ CRUD មូលដ្ឋានក្នុង MongoDB", type: "lab", codeLanguage: "javascript" },
    { id: "M11-12", number: "12", title: "MongoDB Compass", khmerTitle: "ការប្រើប្រាស់ GUI Tool (MongoDB Compass)", type: "lab", codeLanguage: "bash" },
    { id: "M11-13", number: "13", title: "MongoDB Atlas", khmerTitle: "ការរៀបចំ Cloud Database ជាមួយ MongoDB Atlas", type: "lab", codeLanguage: "bash" },
    { id: "M11-14", number: "14", title: "Database Design", khmerTitle: "គោលការណ៍រចនា Database (Embedding vs Referencing Rule)", type: "architecture", codeLanguage: "javascript" },
  ],
  M12: [
    { id: "M12-01", number: "01", title: "What is Mongoose?", khmerTitle: "អ្វីជា Mongoose ODM?", type: "concept", codeLanguage: "javascript" },
    { id: "M12-02", number: "02", title: "Installing Mongoose", khmerTitle: "ការដំឡើងកញ្ចប់ Mongoose", type: "lab", codeLanguage: "bash" },
    { id: "M12-03", number: "03", title: "Connecting MongoDB", khmerTitle: "ការភ្ជាប់ Express ទៅកាន់ MongoDB ជាមួយ mongoose.connect()", type: "lab", codeLanguage: "javascript" },
    { id: "M12-04", number: "04", title: "Schema", khmerTitle: "ការបង្កើត និងរៀបចំ Mongoose Schema", type: "concept", codeLanguage: "javascript" },
    { id: "M12-05", number: "05", title: "Model", khmerTitle: "ការបង្កើត Model ពី Schema", type: "concept", codeLanguage: "javascript" },
    { id: "M12-06", number: "06", title: "Documents", khmerTitle: "ការគ្រប់គ្រង Mongoose Document Instances", type: "lab", codeLanguage: "javascript" },
    { id: "M12-07", number: "07", title: "Schema Types", khmerTitle: "ប្រភេទ BSON Types ក្នុង Mongoose (String, Number, Date, ObjectId)", type: "concept", codeLanguage: "javascript" },
    { id: "M12-08", number: "08", title: "Default Values", khmerTitle: "ការកំណត់ Default Values ក្នុង Schema", type: "lab", codeLanguage: "javascript" },
    { id: "M12-09", number: "09", title: "Required Fields", khmerTitle: "ការកំណត់ Required Fields និង Custom Error Messages", type: "lab", codeLanguage: "javascript" },
    { id: "M12-10", number: "10", title: "Validation", khmerTitle: "ប្រព័ន្ធ Validation ភ្ជាប់ស្រាប់ (min, max, enum, match)", type: "lab", codeLanguage: "javascript" },
    { id: "M12-11", number: "11", title: "Custom Validation", khmerTitle: "ការបង្កើត Custom Validators ក្នុង Mongoose", type: "lab", codeLanguage: "javascript" },
    { id: "M12-12", number: "12", title: "Timestamps", khmerTitle: "ការគ្រប់គ្រង Timestamps (createdAt & updatedAt)", type: "concept", codeLanguage: "javascript" },
    { id: "M12-13", number: "13", title: "Querying", khmerTitle: "ការសរសេរ Mongoose Queries (find, findOne, findById)", type: "lab", codeLanguage: "javascript" },
    { id: "M12-14", number: "14", title: "Creating Documents", khmerTitle: "ការបញ្ចូលឯកសារថ្មី (Model.create & new Model)", type: "lab", codeLanguage: "javascript" },
    { id: "M12-15", number: "15", title: "Reading Documents", khmerTitle: "ការទាញយកឯកសារ (Single & Multiple)", type: "lab", codeLanguage: "javascript" },
    { id: "M12-16", number: "16", title: "Updating Documents", khmerTitle: "ការកែប្រែទិន្នន័យ (findByIdAndUpdate, updateOne)", type: "lab", codeLanguage: "javascript" },
    { id: "M12-17", number: "17", title: "Deleting Documents", khmerTitle: "ការលុបទិន្នន័យ (findByIdAndDelete, deleteOne)", type: "lab", codeLanguage: "javascript" },
    { id: "M12-18", number: "18", title: "Mongoose Methods", khmerTitle: "ការបង្កើត Instance Methods & Static Methods", type: "lab", codeLanguage: "javascript" },
    { id: "M12-19", number: "19", title: "Mongoose Middleware", khmerTitle: "Mongoose Hooks (Pre & Post Middleware)", type: "lab", codeLanguage: "javascript" },
    { id: "M12-20", number: "20", title: "Population", khmerTitle: "ការភ្ជាប់ទំនាក់ទំនងឯកសារជាមួយ .populate()", type: "lab", codeLanguage: "javascript" },
  ],
  M13: [
    { id: "M13-01", number: "01", title: "Connecting Express to MongoDB", khmerTitle: "ការភ្ជាប់ Express App ទៅកាន់ MongoDB Database", type: "lab", codeLanguage: "javascript" },
    { id: "M13-02", number: "02", title: "Database Configuration", khmerTitle: "ការកំណត់រចនាសម្ព័ន្ធ Database Configuration", type: "architecture", codeLanguage: "javascript" },
    { id: "M13-03", number: "03", title: "Environment Variables", khmerTitle: "ការគ្រប់គ្រង Database Credentials ក្នុង .env", type: "lab", codeLanguage: "bash" },
    { id: "M13-04", number: "04", title: "Creating Models", khmerTitle: "ការបង្កើត និងរៀបចំ Data Models ក្នុងគម្រោង", type: "architecture", codeLanguage: "javascript" },
    { id: "M13-05", number: "05", title: "Creating Controllers", khmerTitle: "ការបង្កើត Controllers សម្រាប់ Database Endpoints", type: "lab", codeLanguage: "javascript" },
    { id: "M13-06", number: "06", title: "Creating Services", khmerTitle: "ការបង្កើត Services សម្រាប់អនុវត្ត Database Queries", type: "lab", codeLanguage: "javascript" },
    { id: "M13-07", number: "07", title: "CRUD API with MongoDB", khmerTitle: "ស្ថាបត្យកម្ម CRUD API ពេញលេញជាមួយ MongoDB", type: "architecture", codeLanguage: "javascript" },
    { id: "M13-08", number: "08", title: "Create Resource", khmerTitle: "ការអនុវត្ត Create Resource Endpoint", type: "lab", codeLanguage: "javascript" },
    { id: "M13-09", number: "09", title: "Get Resources", khmerTitle: "ការអនុវត្ត Get Collection Endpoint ជាមួយ Filters", type: "lab", codeLanguage: "javascript" },
    { id: "M13-10", number: "10", title: "Get Resource by ID", khmerTitle: "ការអនុវត្ត Get Single Resource by ID", type: "lab", codeLanguage: "javascript" },
    { id: "M13-11", number: "11", title: "Update Resource", khmerTitle: "ការអនុវត្ត Update Resource Endpoint (PATCH)", type: "lab", codeLanguage: "javascript" },
    { id: "M13-12", number: "12", title: "Delete Resource", khmerTitle: "ការអនុវត្ត Delete Resource Endpoint (DELETE)", type: "lab", codeLanguage: "javascript" },
    { id: "M13-13", number: "13", title: "Search", khmerTitle: "ការអនុវត្ត Search Pipeline ជាមួយ Text Indexes", type: "lab", codeLanguage: "javascript" },
    { id: "M13-14", number: "14", title: "Filtering", khmerTitle: "ការអនុវត្ត Advanced Filtering ($gte, $lte, $in)", type: "lab", codeLanguage: "javascript" },
    { id: "M13-15", number: "15", title: "Sorting", khmerTitle: "ការអនុវត្ត Multi-field Sorting", type: "lab", codeLanguage: "javascript" },
    { id: "M13-16", number: "16", title: "Pagination", khmerTitle: "ការអនុវត្ត Pagination និង Total Count Queries", type: "lab", codeLanguage: "javascript" },
    { id: "M13-17", number: "17", title: "Population", khmerTitle: "ការអនុវត្ត Relational Population ក្នុង API Responses", type: "lab", codeLanguage: "javascript" },
    { id: "M13-18", number: "18", title: "Database Error Handling", khmerTitle: "ការគ្រប់គ្រងកំហុស Database (CastError, DuplicateKey, ValidationError)", type: "lab", codeLanguage: "javascript" },
    { id: "M13-19", number: "19", title: "API + Database Architecture", khmerTitle: "ស្ថាបត្យកម្ម API និង Database កម្រិត Enterprise", type: "architecture", codeLanguage: "javascript" },
  ],
  M14: [
    { id: "M14-01", number: "01", title: "Why Validate Data?", khmerTitle: "ហេតុអ្វីត្រូវផ្ទៀងផ្ទាត់ទិន្នន័យ (Data Validation)?", type: "concept", codeLanguage: "javascript" },
    { id: "M14-02", number: "02", title: "Request Validation", khmerTitle: "យុទ្ធសាស្ត្រផ្ទៀងផ្ទាត់ Request (Body, Query, Params)", type: "concept", codeLanguage: "javascript" },
    { id: "M14-03", number: "03", title: "Body Validation", khmerTitle: "ការផ្ទៀងផ្ទាត់ Request Body", type: "lab", codeLanguage: "javascript" },
    { id: "M14-04", number: "04", title: "Query Validation", khmerTitle: "ការផ្ទៀងផ្ទាត់ Query Parameters", type: "lab", codeLanguage: "javascript" },
    { id: "M14-05", number: "05", title: "Parameter Validation", khmerTitle: "ការផ្ទៀងផ្ទាត់ Route Parameters (:id)", type: "lab", codeLanguage: "javascript" },
    { id: "M14-06", number: "06", title: "Validation Errors", khmerTitle: "ទម្រង់ឆ្លើយតបកំហុស Validation (Field-level feedback)", type: "lab", codeLanguage: "javascript" },
    { id: "M14-07", number: "07", title: "Joi", khmerTitle: "ការស្វែងយល់ពីបណ្ណាល័យ Joi Schema Validation", type: "concept", codeLanguage: "javascript" },
    { id: "M14-08", number: "08", title: "Zod", khmerTitle: "ការប្រើប្រាស់បណ្ណាល័យ Zod ទំនើប", type: "lab", codeLanguage: "javascript" },
    { id: "M14-09", number: "09", title: "Validation Middleware", khmerTitle: "ការបង្កើត Reusable Validation Middleware", type: "lab", codeLanguage: "javascript" },
    { id: "M14-10", number: "10", title: "Sanitization", khmerTitle: "ការធ្វើ Data Sanitization ដើម្បីការពារ Injection", type: "lab", codeLanguage: "javascript" },
    { id: "M14-11", number: "11", title: "Validation Best Practices", khmerTitle: "ការអនុវត្តល្អបំផុតសម្រាប់ Data Validation", type: "concept", codeLanguage: "javascript" },
  ],
  M15: [
    { id: "M15-01", number: "01", title: "Types of Errors", khmerTitle: "ការយល់ដឹងអំពីប្រភេទនៃកំហុសក្នុង Server", type: "concept", codeLanguage: "javascript" },
    { id: "M15-02", number: "02", title: "JavaScript Errors", khmerTitle: "Native JavaScript Error Objects (Error, TypeError, SyntaxError)", type: "concept", codeLanguage: "javascript" },
    { id: "M15-03", number: "03", title: "HTTP Errors", khmerTitle: "ការផ្សារភ្ជាប់ Errors ជាមួយ HTTP Status Codes", type: "concept", codeLanguage: "javascript" },
    { id: "M15-04", number: "04", title: "Express Error Handling", khmerTitle: "យន្តការ Error Handling ក្នុង Express", type: "concept", codeLanguage: "javascript" },
    { id: "M15-05", number: "05", title: "Custom Error Classes", khmerTitle: "ការបង្កើត Custom AppError Class", type: "lab", codeLanguage: "javascript" },
    { id: "M15-06", number: "06", title: "Error Middleware", khmerTitle: "ការបង្កើត Global Error Handling Middleware", type: "lab", codeLanguage: "javascript" },
    { id: "M15-07", number: "07", title: "Async Error Handling", khmerTitle: "ការគ្រប់គ្រងកំហុស Asynchronous (catchAsync Wrapper)", type: "lab", codeLanguage: "javascript" },
    { id: "M15-08", number: "08", title: "Validation Errors", khmerTitle: "ការគ្រប់គ្រង និងកែច្នៃកំហុស Validation", type: "lab", codeLanguage: "javascript" },
    { id: "M15-09", number: "09", title: "Database Errors", khmerTitle: "ការគ្រប់គ្រងកំហុស Database ក្នុង Central Handler", type: "lab", codeLanguage: "javascript" },
    { id: "M15-10", number: "10", title: "404 Errors", khmerTitle: "ការបង្កើត 404 Route Not Found Handler", type: "lab", codeLanguage: "javascript" },
    { id: "M15-11", number: "11", title: "Production Error Responses", khmerTitle: "ការបែងចែកទម្រង់ Error រវាង Development និង Production", type: "lab", codeLanguage: "javascript" },
    { id: "M15-12", number: "12", title: "Error Logging", khmerTitle: "ការកត់ត្រាកំហុស (Logging) ជាមួយ Winston / Sentry", type: "architecture", codeLanguage: "javascript" },
  ],
  M16: [
    { id: "M16-01", number: "01", title: "Password Hashing with bcrypt", khmerTitle: "ការ Hash ពាក្យសម្ងាត់ជាមួយ bcrypt", type: "lab", codeLanguage: "javascript" },
    { id: "M16-02", number: "02", title: "JWT & HttpOnly Refresh Token Cookies", khmerTitle: "JWT Tokens និង HttpOnly Cookies សម្រាប់ Refresh Tokens", type: "lab", codeLanguage: "javascript" },
  ],
  M17: [
    { id: "M17-01", number: "01", title: "Role-Based Access Control (RBAC)", khmerTitle: "ការគ្រប់គ្រងសិទ្ធិ (Role-Based Access Control)", type: "lab", codeLanguage: "javascript" },
  ],
  M18: [
    { id: "M18-01", number: "01", title: "API Security: Helmet, CORS & Rate Limiting", khmerTitle: "សុវត្ថិភាព API: Helmet, CORS, Rate Limiting", type: "lab", codeLanguage: "javascript" },
  ],
  M19: [
    { id: "M19-01", number: "01", title: "File Uploads with Multer & Cloud Storage", khmerTitle: "ការ Upload ឯកសារ ជាមួយ Multer និង Cloud Storage", type: "lab", codeLanguage: "javascript" },
  ],
  M20: [
    { id: "M20-01", number: "01", title: "Email with Nodemailer & SMTP", khmerTitle: "ការផ្ញើ Email ជាមួយ Nodemailer និង SMTP", type: "lab", codeLanguage: "javascript" },
  ],
  M21: [
    { id: "M21-01", number: "01", title: "API Documentation with OpenAPI & Swagger", khmerTitle: "ការសរសេរ API Documentation ជាមួយ OpenAPI Swagger", type: "lab", codeLanguage: "javascript" },
  ],
  M22: [
    { id: "M22-01", number: "01", title: "API Testing with Vitest & Supertest", khmerTitle: "ការធ្វើតេស្ត API ជាមួយ Vitest និង Supertest", type: "lab", codeLanguage: "javascript" },
  ],
  M23: [
    { id: "M23-01", number: "01", title: "API Development Tools: Postman", khmerTitle: "ការប្រើ Postman សម្រាប់ API Development", type: "lab", codeLanguage: "javascript" },
  ],
  M24: [
    { id: "M24-01", number: "01", title: "Real-Time with WebSockets & Socket.IO", khmerTitle: "Real-Time Communication ជាមួយ WebSockets និង Socket.IO", type: "lab", codeLanguage: "javascript" },
  ],
  M25: [
    { id: "M25-01", number: "01", title: "Performance & Caching with Redis", khmerTitle: "ការបង្កើនប្រសិទ្ធភាព API ជាមួយ Redis Cache", type: "lab", codeLanguage: "javascript" },
  ],
  M26: [
    { id: "M26-01", number: "01", title: "Background Jobs with BullMQ", khmerTitle: "ការដំណើរការ Background Jobs ជាមួយ BullMQ", type: "lab", codeLanguage: "javascript" },
  ],
  M27: [
    { id: "M27-01", number: "01", title: "Enterprise Backend Architecture", khmerTitle: "ស្ថាបត្យកម្ម Backend កម្រិត Enterprise", type: "architecture", codeLanguage: "javascript" },
  ],
  M28: [
    { id: "M28-01", number: "01", title: "Dockerizing Node.js", khmerTitle: "ការ Containerize Node.js API ជាមួយ Docker", type: "lab", codeLanguage: "dockerfile" },
    { id: "M28-02", number: "02", title: "Docker Compose, Nginx & CI/CD", khmerTitle: "Docker Compose, Nginx, និង GitHub Actions CI/CD", type: "lab", codeLanguage: "yaml" },
  ],
  M29: [
    { id: "M29-01", number: "01", title: "Project 01: Todo REST API", khmerTitle: "គម្រោងទី ១ ៖ Todo REST API", type: "lab", codeLanguage: "javascript" },
    { id: "M29-02", number: "02", title: "Project 02: Auth API with JWT", khmerTitle: "គម្រោងទី ២ ៖ Full Auth System ជាមួយ JWT", type: "lab", codeLanguage: "javascript" },
    { id: "M29-03", number: "03", title: "Project 03: E-Commerce Product API", khmerTitle: "គម្រោងទី ៣ ៖ E-Commerce Catalog API", type: "lab", codeLanguage: "javascript" },
    { id: "M29-04", number: "04", title: "Project 04: Real-Time Chat", khmerTitle: "គម្រោងទី ៤ ៖ Real-Time Chat Application", type: "lab", codeLanguage: "javascript" },
    { id: "M29-05", number: "05", title: "Project 05: Job Queue & Notifications", khmerTitle: "គម្រោងទី ៥ ៖ Background Job Queue System", type: "lab", codeLanguage: "javascript" },
    { id: "M29-06", number: "06", title: "Project 06: Full Production API (Capstone)", khmerTitle: "គម្រោងទី ៦ ៖ Full Production API Capstone", type: "lab", codeLanguage: "javascript" },
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
