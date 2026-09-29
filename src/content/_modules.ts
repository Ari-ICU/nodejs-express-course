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
    description: "មូលដ្ឋានគ្រឹះBackendមេ ម៉ូដែលម៉ាស៊ីនភ្ញៀវ ទំនាក់ទំនង HTTP និងស្ថាបត្យកម្មដែលជំរុញដោយព្រឹត្តិការណ៍ Node.js ។",
    topicCount: 12,
  },
  {
    id: "M02", number: 2, title: "Node.js Fundamentals",
    khmerTitle: "មូលដ្ឋានគ្រឹះ Node.js",
    category: "Fundamentals", accentColor: "#10b981", duration: "3.5 Hours",
    description: "ចូលជ្រៅទៅក្នុង npm, package.json, scripts, CommonJS vs ES Modules, process object, and environment configurations។",
    topicCount: 16,
  },
  {
    id: "M03", number: 3, title: "Node.js Core Modules",
    khmerTitle: "ម៉ូឌុលស្នូល Node.js (Core Modules)",
    category: "Core & Async", accentColor: "#f59e0b", duration: "4 Hours",
    description: "ភាពស្ទាត់ជំនាញយ៉ាងស៊ីជម្រៅនៃ APIs ដែលភ្ជាប់មកជាមួយ Node៖ fs, path, os, url, events, crypto, streams, Buffers និងប្រតិបត្តិការថត។",
    topicCount: 14,
  },
  {
    id: "M04", number: 4, title: "Async Node.js",
    khmerTitle: "ប្រតិបត្តិការ Asynchronous ក្នុង Node.js",
    category: "Core & Async", accentColor: "#ec4899", duration: "4.5 Hours",
    description: "មេ JavaScript អសមកាលកម្ម៖ ការហៅត្រឡប់ ការសន្យា ការធ្វើសមកាលកម្ម/រង់ចាំ ដំណាក់កាល libuv ព្រឹត្តិការណ៍រង្វិលជុំ មីក្រូកិច្ចការ និងលំនាំមិនទប់ស្កាត់។",
    topicCount: 12,
  },
  {
    id: "M05", number: 5, title: "HTTP with Node.js",
    khmerTitle: "ពិធីការ HTTP ជាមួយ Node.js",
    category: "Core & Async", accentColor: "#06b6d4", duration: "3.5 Hours",
    description: "មូលដ្ឋានគ្រឹះពិធីការ HTTP សំណើ ការឆ្លើយតប វិធីសាស្ត្រ លេខកូដស្ថានភាព ខ្សែអក្សរសំណួរ បឋមកថា និងServer HTTP ដើម។",
    topicCount: 15,
  },
  {
    id: "M06", number: 6, title: "Express.js Fundamentals",
    khmerTitle: "មូលដ្ឋានគ្រឹះ Express.js",
    category: "Express & REST", accentColor: "#6366f1", duration: "4 Hours",
    description: "ក្របខ័ណ្ឌគេហទំព័រ Node.js បឋម៖ កម្មវិធីឧទាហរណ៍ វត្ថុសំណើ និងការឆ្លើយតប គំនិតឧបករណ៍កណ្តាល និងរចនាសម្ព័ន្ធ។",
    topicCount: 14,
  },
  {
    id: "M07", number: 7, title: "Express Routing",
    khmerTitle: "ការរៀបចំ Routing ក្នុង Express.js",
    category: "Express & REST", accentColor: "#8b5cf6", duration: "4 Hours",
    description: "RESTful HTTP routes, params, queries, route grouping with express.Router(), routers nested, and clean route modularity.",
    topicCount: 14,
  },
  {
    id: "M08", number: 8, title: "Express Middleware",
    khmerTitle: "ប្រព័ន្ធ Middleware ក្នុង Express.js",
    category: "Express & REST", accentColor: "#a855f7", duration: "4.5 Hours",
    description: "ស្ថាបត្យកម្ម Middleware៖ លំហូរប្រតិបត្តិ គ្រឿងកណ្តាលដែលភ្ជាប់មកជាមួយ គ្រឿងកណ្តាលផ្ទាល់ខ្លួន ឆ្មាំផ្ទៀងផ្ទាត់ ការកត់ត្រា និងអ្នកដោះស្រាយកំហុស។",
    topicCount: 13,
  },
  {
    id: "M09", number: 9, title: "REST API Development",
    khmerTitle: "ការអភិវឌ្ឍ RESTful API",
    category: "Express & REST", accentColor: "#d946ef", duration: "4.5 Hours",
    description: "គោលការណ៍ REST កិរិយាសព្ទ HTTP លេខកូដស្ថានភាព ស្រោមសំបុត្រឆ្លើយតប JSON ស្តង់ដារ រចនាសម្ព័ន្ធកំហុស តម្រង ការស្វែងរក និងការសរសេរទំព័រ។",
    topicCount: 18,
  },
  {
    id: "M10", number: 10, title: "Controllers & Services",
    khmerTitle: "ស្ថាបត្យកម្ម Controllers និង Services",
    category: "Express & REST", accentColor: "#f43f5e", duration: "4 Hours",
    description: "ការបែងចែកកង្វល់ ស្ថាបត្យកម្មស្អាត ឧបករណ៍បញ្ជាស្ដើង សេវាកម្មសម្បូរបែប តក្កវិជ្ជាអាជីវកម្មដែលអាចប្រើឡើងវិញបាន និងអាចសាកល្បងបាន។",
    topicCount: 10,
  },
  {
    id: "M11", number: 11, title: "MongoDB Fundamentals",
    khmerTitle: "មូលដ្ឋានគ្រឹះ MongoDB",
    category: "Databases", accentColor: "#10b981", duration: "4.5 Hours",
    description: "មូលដ្ឋានទិន្នន័យឯកសារធៀបនឹងតារាង SQL, ការប្រមូល, ឯកសារ, BSON, ObjectId, ឯកសារដែលបានបង្កប់ធៀបនឹងឯកសារយោង និងការដំឡើង Atlas ។",
    topicCount: 14,
  },
  {
    id: "M12", number: 12, title: "Mongoose ODM",
    khmerTitle: "ការប្រើប្រាស់ Mongoose ODM",
    category: "Databases", accentColor: "#059669", duration: "5 Hours",
    description: "គ្រោងការណ៍ គំរូ សុពលភាព ប្រភេទនៃគ្រោងការណ៍ ត្រាពេលវេលា មុន/ប្រកាស មជ្ឈិមសម័យ (ទំពក់) និម្មិត និងចំនួនប្រជាជន (រកមើល $)។",
    topicCount: 20,
  },
  {
    id: "M13", number: 13, title: "Database API Development",
    khmerTitle: "ការអភិវឌ្ឍ Database CRUD API ពេញលេញ",
    category: "Databases", accentColor: "#14b8a6", duration: "5 Hours",
    description: "បញ្ចប់ការរួមបញ្ចូល MongoDB CRUD, តម្រងថាមវន្ត, ការស្វែងរកពហុវាល, ការតម្រៀប, ការកំណត់/រំលងទំព័រ និងការរួមបញ្ចូលការតភ្ជាប់។",
    topicCount: 19,
  },
  {
    id: "M14", number: 14, title: "Data Validation",
    khmerTitle: "ការត្រួតពិនិត្យទិន្នន័យ (Data Validation)",
    category: "Security & Auth", accentColor: "#eab308", duration: "4 Hours",
    description: "ស្នើសុំសុពលភាពជាមួយ Zod និង Joi៖ សុពលភាពរាងកាយ សុពលភាពសំណួរ សុពលភាពប៉ារ៉ាម៉ែត្រ អនាម័យ និងការផ្លាស់ប្តូរកំហុស។",
    topicCount: 11,
  },
  {
    id: "M15", number: 15, title: "Error Handling",
    khmerTitle: "ការគ្រប់គ្រងកំហុស (Error Handling)",
    category: "Security & Auth", accentColor: "#ef4444", duration: "4 Hours",
    description: "ថ្នាក់កំហុសកម្មវិធីផ្ទាល់ខ្លួន កំហុសកណ្តាល Express កណ្តាល ការចាប់យកការបដិសេធដែលមិនបានដោះស្រាយ និងសុវត្ថិភាពផលិតកម្ម។",
    topicCount: 12,
  },
  {
    id: "M16", number: 16, title: "Authentication",
    khmerTitle: "ប្រព័ន្ធផ្ទៀងផ្ទាត់អត្តសញ្ញាណ (Authentication)",
    category: "Security & Auth", accentColor: "#3b82f6", duration: "5 Hours",
    description: "bcrypt hashing password, JSON Web Tokens (JWT), short-lived access tokens, refresh tokens, HttpOnly cookies, and logout flows។",
    topicCount: 14,
  },
  {
    id: "M17", number: 17, title: "Authorization (RBAC)",
    khmerTitle: "ការអនុញ្ញាតសិទ្ធិ (Role-Based Access Control)",
    category: "Security & Auth", accentColor: "#8b5cf6", duration: "3.5 Hours",
    description: "ការគ្រប់គ្រងការចូលប្រើប្រាស់ដោយផ្អែកលើតួនាទី (RBAC) ម៉ាទ្រីសការអនុញ្ញាត ឆ្មាំគ្រប់គ្រង និងការផ្ទៀងផ្ទាត់កម្មសិទ្ធិធនធាន។",
    topicCount: 8,
  },
  {
    id: "M18", number: 18, title: "API Security",
    khmerTitle: "សុវត្ថិភាព API (API Security)",
    category: "Security & Auth", accentColor: "#dc2626", duration: "4 Hours",
    description: "ភាពងាយរងគ្រោះទូទៅ៖ ការកំណត់រចនាសម្ព័ន្ធខុស CORS, បឋមកថាសុវត្ថិភាពមួកសុវត្ថិភាព, ការកំណត់អត្រា, ការចាក់ NoSQL, XSS និង CSRF ។",
    topicCount: 15,
  },
  {
    id: "M19", number: 19, title: "File Upload",
    khmerTitle: "ការ Upload ឯកសារ (File Upload)",
    category: "Express & REST", accentColor: "#0ea5e9", duration: "4 Hours",
    description: "Multipart/form-data, Multer configuration, image dimension validation, local disk storage, and Cloudflare R2/AWS S3 uploads ។",
    topicCount: 13,
  },
  {
    id: "M20", number: 20, title: "Email & Notifications",
    khmerTitle: "ប្រព័ន្ធផ្ញើ Email និងការជូនដំណឹង",
    category: "Advanced & Real-time", accentColor: "#f97316", duration: "3.5 Hours",
    description: "ការកំណត់រចនាសម្ព័ន្ធ SMTP, Nodemailer, អ៊ីមែលប្រតិបត្តិការ, គំរូអ៊ីមែល HTML, កំណត់ពាក្យសម្ងាត់ឡើងវិញ និងនិមិត្តសញ្ញាផ្ទៀងផ្ទាត់។",
    topicCount: 10,
  },
  {
    id: "M21", number: 21, title: "API Documentation",
    khmerTitle: "ឯកសារពិពណ៌នា API (OpenAPI / Swagger)",
    category: "Architecture & DevOps", accentColor: "#14b8a6", duration: "3.5 Hours",
    description: "លក្ខណៈបច្ចេកទេសរបស់ OpenAPI 3.0, Swagger JSDoc, ឯកសារអន្តរកម្ម Swagger UI និងនិយមន័យគ្រោងការណ៍។",
    topicCount: 10,
  },
  {
    id: "M22", number: 22, title: "API Testing",
    khmerTitle: "ការធ្វើតេស្ត API (Vitest & Supertest)",
    category: "Architecture & DevOps", accentColor: "#64748b", duration: "4.5 Hours",
    description: "ការធ្វើតេស្តឯកតា ការធ្វើតេស្តរួមបញ្ចូល Supertest សម្រាប់ការធ្វើតេស្តចុង HTTP មូលដ្ឋានទិន្នន័យក្លែងក្លាយ និងការធ្វើតេស្តផ្ទៀងផ្ទាត់។",
    topicCount: 13,
  },
  {
    id: "M23", number: 23, title: "API Development Tools",
    khmerTitle: "ឧបករណ៍អភិវឌ្ឍន៍ API (Postman & Scripts)",
    category: "Architecture & DevOps", accentColor: "#f97316", duration: "3 Hours",
    description: "ការប្រមូល Postman អថេរបរិស្ថាន ស្គ្រីបស្នើសុំជាមុន ការអះអាងសាកល្បងស្វ័យប្រវត្តិ និងការរួមបញ្ចូល CI Newman ។",
    topicCount: 10,
  },
  {
    id: "M24", number: 24, title: "Real-Time Features",
    khmerTitle: "មុខងារ Real-Time (WebSockets & Socket.IO)",
    category: "Advanced & Real-time", accentColor: "#06b6d4", duration: "4.5 Hours",
    description: "ការទំនាក់ទំនង WebSocket ពីរជាន់ពេញ, Server Socket.IO និងម៉ាស៊ីនភ្ញៀវ, បន្ទប់, ចន្លោះឈ្មោះ, វត្តមានអ្នកប្រើប្រាស់អនឡាញ និងការជជែកតាមពេលវេលាជាក់ស្តែង។",
    topicCount: 10,
  },
  {
    id: "M25", number: 25, title: "Performance & Caching",
    khmerTitle: "ការបង្កើនល្បឿន និង Caching (Redis)",
    category: "Advanced & Real-time", accentColor: "#ef4444", duration: "4.5 Hours",
    description: "ការបង្កើតទម្រង់ Node.js ការបង្កើនប្រសិទ្ធភាពលិបិក្រម MongoDB លិបិក្រមសមាសធាតុ ការបង្ហាប់ការឆ្លើយតប និងឃ្លាំងសម្ងាត់ក្នុងអង្គចងចាំជាមួយ Redis ។",
    topicCount: 12,
  },
  {
    id: "M26", number: 26, title: "Background Jobs",
    khmerTitle: "ការងារដំណើរការនៅខាងក្រោយ (BullMQ & Queues)",
    category: "Advanced & Real-time", accentColor: "#8b5cf6", duration: "4.5 Hours",
    description: "គណៈប្រតិភូកិច្ចការអសមកាល, ជួរសារ, BullMQ ជាមួយ Redis, អ្នកផលិត, កម្មករ, ការព្យាយាមម្តងទៀត និងការងារ cron ដែលបានកំណត់ពេល។",
    topicCount: 12,
  },
  {
    id: "M27", number: 27, title: "Backend Project Architecture",
    khmerTitle: "ស្ថាបត្យកម្មគម្រោង Backend កម្រិត Enterprise",
    category: "Architecture & DevOps", accentColor: "#10b981", duration: "4 Hours",
    description: "រចនាសម្ព័នថតឯកសារខាងក្រោយរបស់សហគ្រាសស្តង់ដារ ការបែងចែកដែនស្អាត លំនាំចាក់ថ្នាំអាស្រ័យ និងទំហំផលិតកម្ម។",
    topicCount: 15,
  },
  {
    id: "M28", number: 28, title: "Production & Deployment",
    khmerTitle: "ការដាក់ឱ្យដំណើរការលើ Production (Docker, Nginx, CI/CD)",
    category: "Architecture & DevOps", accentColor: "#3b82f6", duration: "5 Hours",
    description: "Dockerizing Node.js, Multi-stage Dockerfiles, Docker Compose (Node+Mongo+Redis), PM2 clustering, Nginx reverse proxy, HTTPS, និង GitHub Actions CI/CD ។",
    topicCount: 20,
  },
  {
    id: "M29", number: 29, title: "Real-World Projects",
    khmerTitle: "គម្រោងអនុវត្តជាក់ស្តែងទាំង ៦ (Real-World Projects)",
    category: "Projects", accentColor: "#10b981", duration: "10 Hours",
    description: "កម្មវិធីកម្រិតផលិតកម្ម 6 ពេញលេញពី CRUD សាមញ្ញទៅស្ថាបត្យកម្មពហុសេវាកម្មពេញលេញជាមួយ Redis, Docker និង Swagger ។",
    topicCount: 6,
  },
];
