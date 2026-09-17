export interface LessonTopic {
  id: string; // e.g. "M01-01"
  number: string;
  title: string;
  khmerTitle: string;
  type: "concept" | "lab" | "architecture";
  summary: string;
  codeSnippet: string;
  codeLanguage?: string;
  tip?: string; // Pro Insight (គន្លឹះពិសេស សម្រាបអ្នកជំនាញ)
  objective?: string; // Objective (ការអនុវត្តជាក់ស្តែង)
  expectedOutcome?: string; // Expected Outcome (លទ្ធផលរំពឹងទុក)
}

export interface CourseModule {
  id: string;
  number: number;
  title: string;
  khmerTitle: string;
  category:
    | "Fundamentals"
    | "Core & Async"
    | "Express & REST"
    | "Databases"
    | "Security & Auth"
    | "Architecture & DevOps"
    | "Advanced & Real-time"
    | "Projects";
  accentColor: string; // Tailwind accent or hex
  description: string;
  duration: string;
  topics: LessonTopic[];
}

export const COURSE_MODULES: CourseModule[] = [
  {
    id: "M01",
    number: 1,
    title: "Introduction to Backend",
    khmerTitle: "សេចក្តីផ្តើមអំពីការអភិវឌ្ឍ Backend",
    category: "Fundamentals",
    accentColor: "#3b82f6",
    duration: "3 Hours",
    description: "Master backend foundations, client-server models, HTTP communication, and Node.js event-driven architecture.",
    topics: [
      {
        id: "M01-01",
        number: "01",
        title: "What is Backend Development?",
        khmerTitle: "អ្វីជាការអភិវឌ្ឍ Backend?",
        type: "concept",
        summary: "Backend development handles server-side logic, database interactions, user authentication, business rules, and API endpoints.",
        codeSnippet: `// A minimal HTTP response conceptual model
// Client sends Request -> Server executes logic -> Server returns Response
const response = {
  status: 200,
  headers: { "Content-Type": "application/json" },
  data: { user: "Sokha", role: "Developer", access: true }
};`,
        codeLanguage: "javascript",
        tip: "Backend focuses on reliability, security, data integrity, and throughput rather than UI aesthetics.",
        objective: "Understand how backend code operates silently behind every modern mobile & web application.",
        expectedOutcome: "Clear mental model of server responsibilities and request lifecycles."
      },
      {
        id: "M01-02",
        number: "02",
        title: "Frontend vs Backend",
        khmerTitle: "ភាពខុសគ្នារវាង Frontend និង Backend",
        type: "concept",
        summary: "Frontend runs inside the client browser (HTML, CSS, React), while Backend runs in protected server environments (Node.js, databases).",
        codeSnippet: `// FRONTEND (Browser):
// Fetches data, manages UI state, triggers visual renders
const res = await fetch("/api/v1/products");
const products = await res.json();

// BACKEND (Node.js Server):
// Validates token, queries MongoDB, hides secret API keys
app.get("/api/v1/products", verifyToken, async (req, res) => {
  const products = await Product.find({ published: true });
  res.json({ success: true, data: products });
});`,
        codeLanguage: "javascript",
        tip: "Never store secrets, passwords, or database credentials on the Frontend.",
        objective: "Differentiate client execution boundaries from server execution boundaries.",
        expectedOutcome: "Confident identification of which tasks belong to server vs client."
      },
      {
        id: "M01-03",
        number: "03",
        title: "Client-Server Architecture",
        khmerTitle: "ស្ថាបត្យកម្ម Client-Server",
        type: "architecture",
        summary: "The fundamental distributed system model where clients initiate requests and centralized servers process and respond.",
        codeSnippet: `/* Client-Server Communication Flow:
   [Mobile App / React App] 
            │ (HTTP Request / HTTPS)
            ▼
   [Reverse Proxy (Nginx)]
            │
            ▼
   [Node.js Server (Express)]
            │
      ┌─────┴─────┐
      ▼           ▼
   [MongoDB]   [Redis Cache]
*/`,
        codeLanguage: "javascript",
        tip: "Statelessness is key: each HTTP request must carry all the metadata needed to fulfill it.",
        objective: "Trace the path of an HTTP packet from user tap to database query and back.",
        expectedOutcome: "Understanding the role of proxies, application servers, and persistence layers."
      },
      {
        id: "M01-04",
        number: "04",
        title: "What is Node.js?",
        khmerTitle: "អ្វីទៅជា Node.js?",
        type: "concept",
        summary: "Node.js is an open-source, cross-platform JavaScript runtime environment built on Google Chrome's V8 JavaScript engine.",
        codeSnippet: `// Check your Node environment
console.log("Node Version:", process.version);
console.log("Platform:", process.platform);
console.log("Memory Usage:", process.memoryUsage());`,
        codeLanguage: "javascript",
        tip: "Node.js is neither a programming language nor a framework; it is an asynchronous C++ runtime wrapper for V8.",
        objective: "Inspect the Node.js runtime process object.",
        expectedOutcome: "Ability to run JavaScript outside the browser without window or DOM APIs."
      },
      {
        id: "M01-05",
        number: "05",
        title: "Why Node.js?",
        khmerTitle: "ហេតុអ្វីត្រូវជ្រើសរើស Node.js?",
        type: "concept",
        summary: "Unified full-stack language (JS everywhere), massive npm ecosystem, high I/O throughput, and fast prototyping.",
        codeSnippet: `// Unified Full-Stack: Share validation schemas between frontend and backend
import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
}); // Can be imported in React and Express!`,
        codeLanguage: "javascript",
        tip: "Node.js excels at I/O-intensive workloads like REST APIs, chat servers, streaming, and microservices.",
        objective: "Evaluate when to choose Node.js over multi-threaded runtimes like Java or Go.",
        expectedOutcome: "Strategic justification for Node.js in high-concurrency systems."
      },
      {
        id: "M01-06",
        number: "06",
        title: "Node.js Runtime",
        khmerTitle: "បរិស្ថានប្រតិបត្តិការ Node.js Runtime",
        type: "architecture",
        summary: "Combines V8 (JS engine), libuv (event loop & thread pool), and internal C++ bindings (fs, net, crypto).",
        codeSnippet: `// Node.js Architecture Layers:
// 1. JavaScript API (fs, http, path, events)
// 2. Node.js C++ Bindings (OpenSSL, zlib, c-ares)
// 3. V8 (Engine) & Libuv (Event Loop + 4-thread Pool)`,
        codeLanguage: "javascript",
        tip: "While JavaScript runs on a single thread, libuv offloads file system and crypto operations to a thread pool.",
        objective: "Deconstruct the internal components of the Node.js binary.",
        expectedOutcome: "Understand how single-threaded JS achieves multi-threaded background capability."
      },
      {
        id: "M01-07",
        number: "07",
        title: "Node.js Architecture",
        khmerTitle: "ស្ថាបត្យកម្មប្រព័ន្ធ Node.js",
        type: "architecture",
        summary: "Single-Threaded Event Loop architecture designed for massive concurrent network sockets without thread contention.",
        codeSnippet: `// Comparison:
// Thread-per-request (Apache/Tomcat): 10,000 connections = 10,000 threads (Gigabytes of RAM)
// Single-threaded Event Loop (Node.js): 10,000 connections handled by 1 thread with epoll/kqueue`,
        codeLanguage: "javascript",
        tip: "Avoid CPU-heavy mathematical computations on the main thread; offload to Worker Threads.",
        objective: "Map out the lifecycle of a request through the libuv event loop.",
        expectedOutcome: "Clear understanding of high-concurrency efficiency."
      },
      {
        id: "M01-08",
        number: "08",
        title: "Event-driven Architecture",
        khmerTitle: "ស្ថាបត្យកម្មជំរុញដោយព្រឹត្តិការណ៍ (Event-driven)",
        type: "concept",
        summary: "Systems react to events emitted by subjects, invoking registered callback handlers asynchronously.",
        codeSnippet: `import EventEmitter from "node:events";

const serverEmitter = new EventEmitter();

// Listener
serverEmitter.on("orderPlaced", (order) => {
  console.log("Dispatching email for order #", order.id);
});

// Trigger
serverEmitter.emit("orderPlaced", { id: "ORD-9021", total: 49.99 });`,
        codeLanguage: "javascript",
        tip: "Event emitters decouple modules, making code cleanly extendable.",
        objective: "Implement a decoupled event publisher and subscriber.",
        expectedOutcome: "Clean modular architecture using event listeners."
      },
      {
        id: "M01-09",
        number: "09",
        title: "Non-blocking I/O",
        khmerTitle: "ប្រតិបត្តិការមិនរាំងស្ទះ (Non-blocking I/O)",
        type: "lab",
        summary: "I/O operations (network, disk) return immediately without waiting, invoking callbacks or resolving promises when done.",
        codeSnippet: `import fs from "node:fs";

console.log("1. Starting read...");

// Non-blocking asynchronous readFile
fs.readFile("large-file.txt", "utf-8", (err, data) => {
  if (err) return console.error(err);
  console.log("3. File read complete! Size:", data.length);
});

console.log("2. Continuing other work immediately!");`,
        codeLanguage: "javascript",
        tip: "Never use sync methods like `fs.readFileSync` in production Express route handlers.",
        objective: "Observe execution order in asynchronous non-blocking calls.",
        expectedOutcome: "Predicting console output order accurately for non-blocking I/O."
      },
      {
        id: "M01-10",
        number: "10",
        title: "Node.js Use Cases",
        khmerTitle: "ករណីប្រើប្រាស់សមស្របសម្រាប់ Node.js",
        type: "concept",
        summary: "Ideal for REST/GraphQL APIs, Real-time chat (WebSockets), Streaming, IoT gateways, and BFF (Backend-For-Frontend).",
        codeSnippet: `// Typical Node.js Sweet Spots:
const useCases = [
  "RESTful & GraphQL API Gateways",
  "Real-time Chat & Collaboration (Socket.IO)",
  "Video / Audio Streaming Pipelines",
  "Microservices & Serverless Functions",
  "CLI Developer Tools (npm, vite, next)"
];`,
        codeLanguage: "javascript",
        tip: "For heavy CPU workloads (image processing, ML inference), combine Node.js with Python or Go microservices.",
        objective: "Match technical problem domains to optimal technology stacks.",
        expectedOutcome: "Solid architectural decision making."
      },
      {
        id: "M01-11",
        number: "11",
        title: "Installing Node.js",
        khmerTitle: "ការដំឡើង Node.js ជាមួយ NVM",
        type: "lab",
        summary: "Using Node Version Manager (NVM) or official installers to manage multiple LTS (Long-Term Support) versions.",
        codeSnippet: `# Install NVM (macOS / Linux)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Install and switch to latest LTS
nvm install --lts
nvm use --lts

# Verify active versions
node -v
npm -v`,
        codeLanguage: "bash",
        tip: "Always use even-numbered LTS versions (e.g. Node 20, 22, 24) for production systems.",
        objective: "Set up and manage Node versions cleanly using NVM.",
        expectedOutcome: "A healthy, version-isolated developer workstation."
      },
      {
        id: "M01-12",
        number: "12",
        title: "Node.js Project Structure",
        khmerTitle: "រចនាសម្ព័ន្ធ Folder គម្រោង Node.js",
        type: "architecture",
        summary: "Standard repository layout with src, config, routes, controllers, services, middleware, and tests.",
        codeSnippet: `my-backend-app/
├── package.json
├── package-lock.json
├── .env.example
├── .gitignore
├── src/
│   ├── config/        # DB, env, redis configurations
│   ├── controllers/   # Request/response mapping
│   ├── services/      # Business logic & db queries
│   ├── models/        # Mongoose/Prisma schemas
│   ├── routes/        # API endpoint definitions
│   ├── middleware/    # Auth, validation, error handler
│   ├── utils/         # Helpers & logger
│   └── app.js         # Express app initialization
└── server.js          # Entrypoint (port listen)`,
        codeLanguage: "bash",
        tip: "Keep `app.js` (Express configuration) separate from `server.js` (listening on port) for easy testability with Supertest.",
        objective: "Structure a modular, enterprise-grade backend directory.",
        expectedOutcome: "Scalable codebase ready for multi-developer collaboration."
      }
    ]
  },
  {
    id: "M02",
    number: 2,
    title: "Node.js Fundamentals",
    khmerTitle: "មូលដ្ឋានគ្រឹះ Node.js",
    category: "Fundamentals",
    accentColor: "#10b981",
    duration: "3.5 Hours",
    description: "Deep dive into npm, package.json, scripts, CommonJS vs ES Modules, process object, and environment configurations.",
    topics: [
      {
        id: "M02-01",
        number: "01",
        title: "Running JavaScript with Node.js",
        khmerTitle: "ការដំណើរការ JavaScript ជាមួយ Node.js",
        type: "lab",
        summary: "Execute scripts directly using `node <filename>` or with the experimental watch mode `node --watch`.",
        codeSnippet: `// index.js
const serverName = "NodePulse Core";
console.log(\`[SERVER] \${serverName} initialized at \${new Date().toISOString()}\`);

// Terminal:
// node index.js
// node --watch index.js (auto-reloads on file save!)`,
        codeLanguage: "javascript",
        tip: "Node 18+ has built-in `--watch` flag, eliminating the need for `nodemon` in simple projects.",
        objective: "Execute and live-reload JavaScript server scripts.",
        expectedOutcome: "Fast feedback loop during local development."
      },
      {
        id: "M02-02",
        number: "02",
        title: "Node.js REPL",
        khmerTitle: "ការប្រើប្រាស់ Node.js REPL",
        type: "lab",
        summary: "Read-Eval-Print-Loop provides an interactive shell for testing snippets, checking crypto hashes, and debugging.",
        codeSnippet: `# Open REPL
$ node
> crypto.randomUUID()
'550e8400-e29b-41d4-a716-446655440000'
> 2 ** 10
1024
> .exit`,
        codeLanguage: "bash",
        tip: "In the REPL, the special variable `_` (underscore) stores the result of the last evaluated expression.",
        objective: "Use the REPL for rapid prototyping and validation.",
        expectedOutcome: "Confidence in quick JavaScript experiments directly in terminal."
      },
      {
        id: "M02-03",
        number: "03",
        title: "package.json",
        khmerTitle: "ឯកសារកំណត់រចនាសម្ព័ន្ធ package.json",
        type: "concept",
        summary: "The project manifest storing metadata, dependencies, scripts, engine compatibility, and module format.",
        codeSnippet: `{
  "name": "ecommerce-api",
  "version": "1.0.0",
  "type": "module",
  "main": "src/server.js",
  "scripts": {
    "dev": "node --watch src/server.js",
    "start": "NODE_ENV=production node src/server.js",
    "test": "vitest run"
  },
  "engines": {
    "node": ">=20.0.0"
  }
}`,
        codeLanguage: "json",
        tip: 'Always set `"type": "module"` to write modern ES Module syntax (`import`/`export`) natively.',
        objective: "Craft a production-ready package.json configuration.",
        expectedOutcome: "Correct configuration of entry points, scripts, and module types."
      },
      {
        id: "M02-04",
        number: "04",
        title: "npm (Node Package Manager)",
        khmerTitle: "ការគ្រប់គ្រងកញ្ចប់កូដជាមួយ npm",
        type: "concept",
        summary: "The default package manager for Node.js, managing open-source registry downloads and dependency resolutions.",
        codeSnippet: `# Initialize project interactively or with defaults
npm init -y

# Search for packages
npm search express

# View package details
npm view mongoose version`,
        codeLanguage: "bash",
        tip: "Use `npm audit` periodically to scan your installed packages for known vulnerabilities.",
        objective: "Manage libraries efficiently via CLI.",
        expectedOutcome: "Mastery of npm lifecycle commands."
      },
      {
        id: "M02-05",
        number: "05",
        title: "npm Scripts",
        khmerTitle: "ការសរសេរ npm Scripts សម្រាប់ស្វ័យប្រវត្តិកម្ម",
        type: "lab",
        summary: "Automate builds, database migrations, linting, seedings, and test suites with custom npm scripts.",
        codeSnippet: `"scripts": {
  "predev": "npm run db:check",
  "dev": "node --watch src/server.js",
  "db:seed": "node scripts/seed.js",
  "lint": "eslint src/",
  "build": "tsc"
}`,
        codeLanguage: "json",
        tip: "Pre- and post-hooks run automatically before and after commands (e.g. `predev` runs before `npm run dev`).",
        objective: "Create chaining workflow scripts for full dev pipelines.",
        expectedOutcome: "Streamlined single-command project workflows."
      },
      {
        id: "M02-06",
        number: "06",
        title: "Installing Packages",
        khmerTitle: "ការដំឡើងកញ្ចប់បណ្ណាល័យ (Packages)",
        type: "lab",
        summary: "Installing runtime packages versus development tools with appropriate semantic versioning.",
        codeSnippet: `# Install runtime dependency
npm install express dotenv cors

# Install dev dependency
npm install -D nodemon vitest @types/node

# Install global CLI tool
npm install -g pm2`,
        codeLanguage: "bash",
        tip: "Avoid installing libraries globally (`-g`) whenever possible to prevent machine-level version conflicts.",
        objective: "Correctly categorize dependencies into runtime vs dev.",
        expectedOutcome: "Lean production deployment images."
      },
      {
        id: "M02-07",
        number: "07",
        title: "Dependencies",
        khmerTitle: "ការពឹងផ្អែកចាំបាច់ (Dependencies)",
        type: "concept",
        summary: "Packages required for the application to function in production (e.g., Express, Mongoose, bcrypt, jsonwebtoken).",
        codeSnippet: `"dependencies": {
  "bcryptjs": "^2.4.3",
  "cors": "^2.8.5",
  "dotenv": "^16.4.5",
  "express": "^4.19.2",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.3.0"
}`,
        codeLanguage: "json",
        tip: "The caret `^` allows non-breaking minor and patch upgrades; tilde `~` allows only patch upgrades.",
        objective: "Understand semantic versioning (SemVer: MAJOR.MINOR.PATCH).",
        expectedOutcome: "Avoid unexpected breaking changes during builds."
      },
      {
        id: "M02-08",
        number: "08",
        title: "Dev Dependencies",
        khmerTitle: "ការពឹងផ្អែកសម្រាប់តែការអភិវឌ្ឍ (Dev Dependencies)",
        type: "concept",
        summary: "Tools only needed during development (linters, test frameworks, TypeScript compiler). Omitted in production containers.",
        codeSnippet: `# In production container Dockerfile:
npm ci --only=production
# This skips all devDependencies, saving hundreds of Megabytes!`,
        codeLanguage: "bash",
        tip: "Ensure your production Docker build uses `NODE_ENV=production` to omit devDependencies.",
        objective: "Optimize deployment image size.",
        expectedOutcome: "Faster deployments and lower memory footprints."
      },
      {
        id: "M02-09",
        number: "09",
        title: "node_modules",
        khmerTitle: "ថតផ្ទុកកូដ node_modules",
        type: "concept",
        summary: "The directory where npm stores all downloaded third-party code and transitive dependencies.",
        codeSnippet: `# .gitignore
node_modules/
.env
dist/
coverage/`,
        codeLanguage: "bash",
        tip: "NEVER commit `node_modules` to Git! Always list it in `.gitignore`.",
        objective: "Understand node_modules resolution and git discipline.",
        expectedOutcome: "Clean Git repositories without multi-gigabyte bloat."
      },
      {
        id: "M02-10",
        number: "10",
        title: "package-lock.json",
        khmerTitle: "សារៈសំខាន់នៃ package-lock.json",
        type: "concept",
        summary: "Locks the exact dependency tree down to the specific commit/checksum, ensuring identical installs on all machines.",
        codeSnippet: `# Install exact locked versions (best for CI/CD)
npm ci

# Regular install (might update versions within SemVer range)
npm install`,
        codeLanguage: "bash",
        tip: "Always commit `package-lock.json` into version control and use `npm ci` in CI/CD pipelines.",
        objective: "Prevent 'works on my machine' dependency version discrepancies.",
        expectedOutcome: "Reproducible builds across local and cloud environments."
      },
      {
        id: "M02-11",
        number: "11",
        title: "CommonJS",
        khmerTitle: "ប្រព័ន្ធម៉ូឌុល CommonJS (require / module.exports)",
        type: "concept",
        summary: "The legacy Node.js module system using synchronous `require()` and `module.exports`.",
        codeSnippet: `// math.js
const add = (a, b) => a + b;
module.exports = { add };

// app.js
const { add } = require("./math");
console.log(add(5, 10)); // 15`,
        codeLanguage: "javascript",
        tip: "CommonJS is synchronous and cannot easily tree-shake unused exports.",
        objective: "Understand legacy CommonJS codebases and migration strategies.",
        expectedOutcome: "Ability to read and maintain legacy Node.js code."
      },
      {
        id: "M02-12",
        number: "12",
        title: "ES Modules",
        khmerTitle: "ប្រព័ន្ធម៉ូឌុលទំនើប ES Modules (import / export)",
        type: "lab",
        summary: "The official ECMAScript standard for modules supporting asynchronous loading, top-level await, and tree-shaking.",
        codeSnippet: `// utils/math.js
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;

// server.js
import { add } from "./utils/math.js";

// Top-level await is supported in ESM!
const connection = await connectDatabase();
console.log(add(10, 20));`,
        codeLanguage: "javascript",
        tip: 'In Node ESM, always include the file extension `.js` in relative imports: `import x from "./file.js";`.',
        objective: "Write modern ES Modules code with top-level await.",
        expectedOutcome: "Modern, standard-compliant JavaScript backend code."
      },
      {
        id: "M02-13",
        number: "13",
        title: "Environment Variables",
        khmerTitle: "អថេរកំណត់បរិស្ថាន (Environment Variables)",
        type: "concept",
        summary: "Dynamically configure ports, database credentials, JWT secrets, and external API keys outside the codebase.",
        codeSnippet: `// Access environment variables via process.env
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DATABASE_URL;
const NODE_ENV = process.env.NODE_ENV || "development";

if (!DB_URI) {
  throw new Error("DATABASE_URL must be defined!");
}`,
        codeLanguage: "javascript",
        tip: "Never hardcode passwords or API keys in source code.",
        objective: "Extract dynamic configuration into environment variables.",
        expectedOutcome: "Secure, 12-factor application configuration."
      },
      {
        id: "M02-14",
        number: "14",
        title: ".env & dotenv",
        khmerTitle: "ការគ្រប់គ្រង .env ជាមួយបណ្ណាល័យ dotenv",
        type: "lab",
        summary: "Store secrets in `.env` files for local development, with a documented `.env.example` committed to git.",
        codeSnippet: `# .env file
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shopdb
JWT_SECRET=super_secret_signing_key_9021
NODE_ENV=development

# In server.js (Node 20+ has native --env-file=.env flag!)
# node --env-file=.env server.js
# Or using dotenv:
import "dotenv/config";`,
        codeLanguage: "javascript",
        tip: "Always commit a `.env.example` file showing required keys with dummy values so teammates know what to configure.",
        objective: "Configure local secrets cleanly without leaking credentials.",
        expectedOutcome: "Zero secrets checked into git repositories."
      },
      {
        id: "M02-15",
        number: "15",
        title: "process Object",
        khmerTitle: "វត្ថុប្រព័ន្ធ process ក្នុង Node.js",
        type: "concept",
        summary: "Global object providing information and control over the current Node.js process, memory, signals, and uptime.",
        codeSnippet: `// Graceful shutdown handling
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Closing HTTP server gracefully...");
  server.close(() => {
    mongoose.connection.close();
    process.exit(0);
  });
});`,
        codeLanguage: "javascript",
        tip: "Listening to `SIGTERM` and `SIGINT` allows Kubernetes and Docker to shut down your app cleanly without dropping active requests.",
        objective: "Handle process signals and graceful termination.",
        expectedOutcome: "Zero-downtime rolling restart compatibility."
      },
      {
        id: "M02-16",
        number: "16",
        title: "Command Line Arguments",
        khmerTitle: "អាគុយម៉ង់បន្ទាត់ពាក្យបញ្ជា (Command Line Arguments)",
        type: "lab",
        summary: "Parse CLI arguments passed to `node app.js --port 8080 --mode test` using `process.argv` or `util.parseArgs`.",
        codeSnippet: `import { parseArgs } from "node:util";

const options = {
  port: { type: "string", short: "p", default: "3000" },
  env: { type: "string", short: "e", default: "dev" },
};

const { values } = parseArgs({ options });
console.log("Running on port:", values.port, "in mode:", values.env);`,
        codeLanguage: "javascript",
        tip: "Node 18.3+ has `node:util/parseArgs` built-in, no external libraries needed for argument parsing.",
        objective: "Build CLI-configurable server startup scripts.",
        expectedOutcome: "Flexible command-line parameter handling."
      }
    ]
  },
  {
    id: "M03",
    number: 3,
    title: "Node.js Core Modules",
    khmerTitle: "ម៉ូឌុលស្នូល Node.js (Core Modules)",
    category: "Core & Async",
    accentColor: "#f59e0b",
    duration: "4 Hours",
    description: "Deep mastery of Node's built-in APIs: fs, path, os, url, events, crypto, streams, Buffers, and directory operations.",
    topics: [
      {
        id: "M03-01",
        number: "01",
        title: "Node.js Core Modules",
        khmerTitle: "ទិដ្ឋភាពទូទៅនៃ Core Modules",
        type: "concept",
        summary: "Built-in packages compiled into the Node.js binary requiring no npm installation: `fs`, `path`, `os`, `http`, `crypto`, `events`.",
        codeSnippet: `// Use the 'node:' protocol prefix for clarity and performance
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import crypto from "node:crypto";`,
        codeLanguage: "javascript",
        tip: "Always prefix core module imports with `node:` (e.g. `node:fs`) to avoid collisions with any npm package of the same name.",
        objective: "Identify and import Node's native built-in standard library.",
        expectedOutcome: "Confidence using native APIs without bloated dependencies."
      },
      {
        id: "M03-02",
        number: "02",
        title: "fs Module",
        khmerTitle: "ម៉ូឌុលគ្រប់គ្រងឯកសារ fs Module",
        type: "lab",
        summary: "File system operations with synchronous, callback, and modern promise-based flavors (`node:fs/promises`).",
        codeSnippet: `import fs from "node:fs/promises";

// Asynchronous promise-based file write and read
await fs.writeFile("config.json", JSON.stringify({ theme: "dark" }));
const content = await fs.readFile("config.json", "utf-8");
console.log("Config read:", JSON.parse(content));`,
        codeLanguage: "javascript",
        tip: "Always prefer `node:fs/promises` with `async/await` in modern asynchronous code.",
        objective: "Perform non-blocking read/write disk operations.",
        expectedOutcome: "Safe and fast file operations."
      },
      {
        id: "M03-03",
        number: "03",
        title: "path Module",
        khmerTitle: "ម៉ូឌុលផ្លូវឯកសារ path Module",
        type: "lab",
        summary: "Cross-platform path resolution handling Windows backslashes (`\\`) and POSIX forward slashes (`/`).",
        codeSnippet: `import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Safe cross-platform path resolution
const uploadDir = path.join(__dirname, "uploads", "images", "avatar.png");
console.log("File extension:", path.extname(uploadDir)); // .png
console.log("Base name:", path.basename(uploadDir));       // avatar.png`,
        codeLanguage: "javascript",
        tip: "Never concatenate paths with string concatenation like `'uploads/' + file`; always use `path.join()` or `path.resolve()`.",
        objective: "Build platform-independent path strings.",
        expectedOutcome: "Code runs identically on Windows, macOS, and Linux."
      },
      {
        id: "M03-04",
        number: "04",
        title: "os Module",
        khmerTitle: "ម៉ូឌុលព័ត៌មានប្រព័ន្ធប្រតិបត្តិការ os Module",
        type: "concept",
        summary: "Inspect host hardware, CPU architecture, core counts, free memory, network interfaces, and system uptime.",
        codeSnippet: `import os from "node:os";

console.log("Platform:", os.platform());
console.log("CPUs count:", os.cpus().length);
console.log("Free Memory (MB):", Math.round(os.freemem() / 1024 / 1024));
console.log("Total Memory (MB):", Math.round(os.totalmem() / 1024 / 1024));`,
        codeLanguage: "javascript",
        tip: "Cluster workers and PM2 instances are typically sized based on `os.cpus().length`.",
        objective: "Extract machine resource specs for auto-scaling and clustering.",
        expectedOutcome: "Resource-aware server application design."
      },
      {
        id: "M03-05",
        number: "05",
        title: "url Module",
        khmerTitle: "ម៉ូឌុល URL និង SearchParams",
        type: "lab",
        summary: "Parse and construct standard URLs, query strings, protocols, and hostnames using the WHATWG URL API.",
        codeSnippet: `const myUrl = new URL("https://api.example.com:8080/v1/products?category=electronics&sort=asc");

console.log("Host:", myUrl.host);              // api.example.com:8080
console.log("Path:", myUrl.pathname);          // /v1/products
console.log("Sort Param:", myUrl.searchParams.get("sort")); // asc

myUrl.searchParams.append("limit", "20");
console.log("Modified:", myUrl.toString());`,
        codeLanguage: "javascript",
        tip: "Use the standard WHATWG `URL` class instead of legacy `url.parse()`.",
        objective: "Parse and manipulate query parameters safely.",
        expectedOutcome: "Sanitized URL generation and query parsing."
      },
      {
        id: "M03-06",
        number: "06",
        title: "events Module & EventEmitter",
        khmerTitle: "ម៉ូឌុល Events និង EventEmitter",
        type: "lab",
        summary: "Create custom event dispatchers for asynchronous decoupled messaging inside the application.",
        codeSnippet: `import { EventEmitter } from "node:events";

class PaymentGateway extends EventEmitter {
  processPayment(amount) {
    // Simulate transaction
    setTimeout(() => {
      this.emit("success", { amount, transactionId: "TX-892" });
    }, 100);
  }
}

const payment = new PaymentGateway();
payment.on("success", (data) => console.log("Receipt sent for", data));
payment.processPayment(99.00);`,
        codeLanguage: "javascript",
        tip: "Always remove listeners or use `.once()` when creating transient subscriptions to prevent memory leaks.",
        objective: "Build modular pub-sub event architectures.",
        expectedOutcome: "Decoupled software design with event channels."
      },
      {
        id: "M03-07",
        number: "07",
        title: "crypto Module",
        khmerTitle: "ម៉ូឌុលគ្រីបតូហ្គ្រាហ្វ៊ី crypto Module",
        type: "lab",
        summary: "Cryptographic algorithms: random UUIDs, SHA-256 hashing, HMAC signatures, and encryption.",
        codeSnippet: `import crypto from "node:crypto";

// Generate secure random tokens
const token = crypto.randomBytes(32).toString("hex");

// Create SHA-256 hash
const hash = crypto.createHash("sha256").update("my-password").digest("hex");

// Secure UUID
const uuid = crypto.randomUUID();`,
        codeLanguage: "javascript",
        tip: "Use `crypto.timingSafeEqual()` when verifying HMAC signatures or reset tokens to prevent timing attacks.",
        objective: "Generate cryptographically secure hashes and tokens.",
        expectedOutcome: "Tamper-proof token generation."
      },
      {
        id: "M03-08",
        number: "08",
        title: "stream Module",
        khmerTitle: "ម៉ូឌុល Stream សម្រាប់ទិន្នន័យធំៗ",
        type: "architecture",
        summary: "Process massive datasets chunk-by-chunk without loading the entire file into RAM (Readable, Writable, Transform).",
        codeSnippet: `import fs from "node:fs";
import { pipeline } from "node:stream/promises";
import zlib from "node:zlib";

// Compress a 5GB file using streams with constant ~20MB RAM usage!
await pipeline(
  fs.createReadStream("huge-log.txt"),
  zlib.createGzip(),
  fs.createWriteStream("huge-log.txt.gz")
);
console.log("Stream pipeline completed!");`,
        codeLanguage: "javascript",
        tip: "Streams prevent out-of-memory crashes when handling large file uploads or CSV exports.",
        objective: "Pipe large file streams using modern `pipeline()` promise.",
        expectedOutcome: "High-memory efficiency for multi-gigabyte data transfer."
      },
      {
        id: "M03-09",
        number: "09",
        title: "Buffer",
        khmerTitle: "ទិន្នន័យប៊ីណារី Buffer",
        type: "concept",
        summary: "Fixed-size chunks of raw memory allocated outside V8 for handling binary data, images, and network packets.",
        codeSnippet: `// Create buffer from string
const buf = Buffer.from("Hello Node.js!", "utf-8");
console.log("Hex bytes:", buf.toString("hex"));
console.log("Base64:", buf.toString("base64"));

// Allocate blank buffer
const blank = Buffer.alloc(10); // 10 bytes initialized with zeros`,
        codeLanguage: "javascript",
        tip: "Never use `Buffer.allocUnsafe()` unless you immediately overwrite every byte; it may expose old memory data.",
        objective: "Convert between UTF-8, Hex, and Base64 representations.",
        expectedOutcome: "Accurate handling of binary file uploads."
      },
      {
        id: "M03-10",
        number: "10",
        title: "Working with Files & Directories",
        khmerTitle: "ការគ្រប់គ្រងឯកសារ និង Folders",
        type: "lab",
        summary: "Creating directories recursively, listing files, checking existence, and removing folders safely.",
        codeSnippet: `import fs from "node:fs/promises";
import path from "node:path";

const targetDir = path.join(process.cwd(), "storage", "reports");

// Create nested directories if they don't exist
await fs.mkdir(targetDir, { recursive: true });

// Read directory contents
const files = await fs.readdir(targetDir);
console.log("Directory contents:", files);`,
        codeLanguage: "javascript",
        tip: "Pass `{ recursive: true }` to `mkdir` to create full directory trees without checking parent existence.",
        objective: "Perform robust directory creation and recursive traversal.",
        expectedOutcome: "Reliable local storage and upload folder management."
      }
    ]
  },
  {
    id: "M04",
    number: 4,
    title: "Async Node.js",
    khmerTitle: "ប្រតិបត្តិការ Asynchronous ក្នុង Node.js",
    category: "Core & Async",
    accentColor: "#ec4899",
    duration: "4.5 Hours",
    description: "Master asynchronous JavaScript: Callbacks, Promises, async/await, libuv Event Loop phases, Microtasks, and non-blocking patterns.",
    topics: [
      {
        id: "M04-01",
        number: "01",
        title: "Synchronous vs Asynchronous",
        khmerTitle: "ការប្រៀបធៀប Synchronous និង Asynchronous",
        type: "concept",
        summary: "Synchronous code halts thread execution until finished; Asynchronous code delegates work and continues execution.",
        codeSnippet: `// Synchronous (Blocks the entire server!)
const data = fs.readFileSync("heavy.txt");

// Asynchronous (Server continues serving 10,000 other users)
const data = await fs.readFile("heavy.txt");`,
        codeLanguage: "javascript",
        tip: "A single synchronous call in an Express handler freezes the entire server for ALL connected clients.",
        objective: "Distinguish blocking from non-blocking execution models.",
        expectedOutcome: "Elimination of accidental blocking calls."
      },
      {
        id: "M04-02",
        number: "02",
        title: "Callbacks & Callback Problems",
        khmerTitle: "Callbacks និងបញ្ហា 'Callback Hell'",
        type: "concept",
        summary: "Error-first callback conventions `(err, data) => {}` and why deeply nested callbacks cause unreadable, fragile code.",
        codeSnippet: `// The dreaded Callback Pyramid of Doom:
getUser(userId, (err, user) => {
  if (err) return handleError(err);
  getOrders(user.id, (err, orders) => {
    if (err) return handleError(err);
    getOrderDetails(orders[0].id, (err, details) => {
      // Hard to read, hard to catch errors!
    });
  });
});`,
        codeLanguage: "javascript",
        tip: "Modern Node code uses Promises and async/await; callbacks are legacy or low-level primitives.",
        objective: "Identify callback pyramid anti-patterns and refactor them.",
        expectedOutcome: "Refactoring callbacks to modern asynchronous syntax."
      },
      {
        id: "M04-03",
        number: "03",
        title: "Promises & async / await",
        khmerTitle: "Promises និងការប្រើប្រាស់ async / await",
        type: "lab",
        summary: "Representing future values with pending/fulfilled/rejected states, clean chaining, and linear async/await syntax.",
        codeSnippet: `// Modern, linear, readable flow
async function fetchCustomerDashboard(userId) {
  try {
    const user = await getUser(userId);
    // Parallel fetching for high performance!
    const [orders, notifications] = await Promise.all([
      getOrders(user.id),
      getNotifications(user.id)
    ]);
    return { user, orders, notifications };
  } catch (error) {
    console.error("Dashboard error:", error);
    throw error;
  }
}`,
        codeLanguage: "javascript",
        tip: "Use `Promise.all()` to run independent queries concurrently instead of awaiting them in sequential series.",
        objective: "Write clean async/await code with parallel execution optimizations.",
        expectedOutcome: "High-speed concurrent API route handlers."
      },
      {
        id: "M04-04",
        number: "04",
        title: "Event Loop & Phases",
        khmerTitle: "ដំណើរការ Libuv Event Loop និងដំណាក់កាលនីមួយៗ",
        type: "architecture",
        summary: "The 6 phases of libuv event loop: Timers -> Pending I/O -> Idle/Prepare -> Poll -> Check -> Close callbacks.",
        codeSnippet: `/* Libuv Event Loop Cycle:
   1. Timers (setTimeout, setInterval)
   2. Pending Callbacks (deferred OS I/O)
   3. Idle / Prepare (internal)
   4. Poll (retrieve new I/O events, sockets)
   5. Check (setImmediate callbacks)
   6. Close Callbacks (socket.on('close'))
   
   * Microtasks (process.nextTick, Promise) run between every phase!
*/`,
        codeLanguage: "javascript",
        tip: "`process.nextTick()` fires BEFORE the next event loop tick, even ahead of `Promise.then()`.",
        objective: "Trace execution priority through the event loop.",
        expectedOutcome: "Mastery of Node.js concurrency internals."
      },
      {
        id: "M04-05",
        number: "05",
        title: "Microtasks & Timers",
        khmerTitle: "ជួរការងារ Microtasks (Promises) និង Timers",
        type: "lab",
        summary: "Understanding the difference between macrotasks (`setTimeout`, `setImmediate`) and microtasks (`Promise.then`, `nextTick`).",
        codeSnippet: `console.log("1. Synchronous");

setTimeout(() => console.log("4. Timer Macrotask"), 0);
setImmediate(() => console.log("5. Immediate Macrotask"));

Promise.resolve().then(() => console.log("3. Promise Microtask"));
process.nextTick(() => console.log("2. NextTick Microtask"));

// Output: 1 -> 2 -> 3 -> 4 -> 5`,
        codeLanguage: "javascript",
        tip: "`process.nextTick` has the highest priority and drains completely before the event loop advances.",
        objective: "Demonstrate and predict microtask queue draining behavior.",
        expectedOutcome: "Zero race conditions in asynchronous initialization."
      }
    ]
  },
  {
    id: "M05",
    number: 5,
    title: "HTTP with Node.js",
    khmerTitle: "ពិធីការ HTTP ជាមួយ Node.js",
    category: "Core & Async",
    accentColor: "#06b6d4",
    duration: "3.5 Hours",
    description: "HTTP protocol fundamentals, requests, responses, methods, status codes, query strings, headers, and native HTTP servers.",
    topics: [
      {
        id: "M05-01",
        number: "01",
        title: "HTTP Fundamentals & Lifecycle",
        khmerTitle: "មូលដ្ឋានគ្រឹះពិធីការ HTTP និងដំណើរការ Request-Response",
        type: "concept",
        summary: "Stateless client-server protocol over TCP. Request headers, request body, status line, response headers, and payload.",
        codeSnippet: `/* Raw HTTP Request:
GET /api/v1/users?page=1 HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOi...
Accept: application/json

HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 48

{"status":"success","data":[{"id":1,"name":"Dev"}]}
*/`,
        codeLanguage: "javascript",
        tip: "Every request contains metadata in headers and optionally data in the body.",
        objective: "Inspect raw HTTP wire packets and protocol headers.",
        expectedOutcome: "Solid intuition for HTTP network transport."
      },
      {
        id: "M05-02",
        number: "02",
        title: "Creating Native HTTP Server",
        khmerTitle: "ការបង្កើត HTTP Server តាមរយៈ Native 'node:http'",
        type: "lab",
        summary: "Build an HTTP server using `node:http` to understand what Express abstracts away under the hood.",
        codeSnippet: `import http from "node:http";

const server = http.createServer((req, res) => {
  const { method, url } = req;
  
  if (url === "/api/health" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "healthy", uptime: process.uptime() }));
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
});

server.listen(4000, () => console.log("Server listening on port 4000"));`,
        codeLanguage: "javascript",
        tip: "Express is simply a lightweight wrapper around this exact `http.createServer()` mechanism.",
        objective: "Implement a barebones router and JSON responder in pure Node.",
        expectedOutcome: "Deep appreciation for Express.js convenience and middleware."
      },
      {
        id: "M05-03",
        number: "03",
        title: "Handling Request Body & Streams",
        khmerTitle: "ការទទួលទិន្នន័យ Request Body តាមរយៈ Data Chunks",
        type: "lab",
        summary: "In raw Node.js, `req` is a readable stream. Data arrives in binary chunks that must be gathered and parsed.",
        codeSnippet: `let body = "";

req.on("data", (chunk) => {
  body += chunk.toString();
});

req.on("end", () => {
  try {
    const parsedData = JSON.parse(body);
    console.log("Received POST JSON:", parsedData);
  } catch (err) {
    res.writeHead(400);
    res.end("Invalid JSON payload");
  }
});`,
        codeLanguage: "javascript",
        tip: "This stream-gathering is why Express requires `express.json()` middleware.",
        objective: "Understand how JSON bodies are streamed over TCP sockets.",
        expectedOutcome: "Clarity on body parser mechanics."
      }
    ]
  },
  {
    id: "M06",
    number: 6,
    title: "Express.js Fundamentals",
    khmerTitle: "មូលដ្ឋានគ្រឹះ Express.js",
    category: "Express & REST",
    accentColor: "#6366f1",
    duration: "4 Hours",
    description: "The premier Node.js web framework: Application instance, Request and Response objects, middleware concept, and structure.",
    topics: [
      {
        id: "M06-01",
        number: "01",
        title: "What is Express.js & Why Use It?",
        khmerTitle: "អ្វីជា Express.js និងហេតុអ្វីត្រូវប្រើវា?",
        type: "concept",
        summary: "Fast, unopinionated, minimalist web framework for Node.js offering robust routing, middleware pipelines, and HTTP utilities.",
        codeSnippet: `import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Express API!" });
});

app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});`,
        codeLanguage: "javascript",
        tip: "Express provides maximum freedom; organizing into clean controllers and services is key to avoiding spaghetti code.",
        objective: "Bootstrap a production Express server in under 10 lines of code.",
        expectedOutcome: "Running web server with HTTP request handling."
      },
      {
        id: "M06-02",
        number: "02",
        title: "Request & Response Objects",
        khmerTitle: "វត្ថុ Request (req) និង Response (res)",
        type: "concept",
        summary: "Mastering `req.params`, `req.query`, `req.body`, `req.headers`, and `res.status()`, `res.json()`, `res.send()`, `res.set()`.",
        codeSnippet: `app.post("/api/users/:role", (req, res) => {
  const { role } = req.params;          // Route parameter
  const { notify } = req.query;          // Query parameter ?notify=true
  const { name, email } = req.body;     // Parsed JSON body
  const authToken = req.headers.authorization; // Header

  res.status(201).json({
    success: true,
    user: { name, email, role },
    notified: notify === "true"
  });
});`,
        codeLanguage: "javascript",
        tip: "Always return `res.json()` or `res.end()` to prevent the client's HTTP request from hanging until timeout.",
        objective: "Extract parameters, query arguments, and body data with type safety.",
        expectedOutcome: "Complete mastery of request inspection and response construction."
      }
    ]
  },
  {
    id: "M07",
    number: 7,
    title: "Express Routing",
    khmerTitle: "ការរៀបចំ Routing ក្នុង Express.js",
    category: "Express & REST",
    accentColor: "#8b5cf6",
    duration: "4 Hours",
    description: "RESTful HTTP routes, params, queries, route groupings with express.Router(), nested routers, and clean route modularity.",
    topics: [
      {
        id: "M07-01",
        number: "01",
        title: "express.Router() & Route Modularization",
        khmerTitle: "ការបំបែក Routes ដោយប្រើ express.Router()",
        type: "lab",
        summary: "Organize API endpoints by business domain (e.g. `/api/v1/auth`, `/api/v1/users`, `/api/v1/products`).",
        codeSnippet: `// routes/product.routes.js
import { Router } from "express";
const router = Router();

router.route("/")
  .get(getProducts)
  .post(createProduct);

router.route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;

// app.js
app.use("/api/v1/products", productRoutes);`,
        codeLanguage: "javascript",
        tip: "Using `router.route('/path').get().post()` prevents duplicate URL path declarations.",
        objective: "Modularize routes into dedicated domain files.",
        expectedOutcome: "Clean, maintainable, scalable API endpoint hierarchy."
      },
      {
        id: "M07-02",
        number: "02",
        title: "Route Parameters & Query Parameters",
        khmerTitle: "ប៉ារ៉ាម៉ែត្រ Route និង Query Parameters",
        type: "concept",
        summary: "Use route parameters (`/products/:id`) for specific resource identification; use query parameters (`?category=tech&page=2`) for filtering/paging.",
        codeSnippet: `// GET /api/v1/courses/nodejs/lessons/07?view=compact
app.get("/api/v1/courses/:courseSlug/lessons/:lessonNumber", (req, res) => {
  const { courseSlug, lessonNumber } = req.params;
  const { view } = req.query;
  res.json({ course: courseSlug, lesson: Number(lessonNumber), viewMode: view || "full" });
});`,
        codeLanguage: "javascript",
        tip: "Route parameters are always returned as strings; convert to numbers or ObjectIds where appropriate.",
        objective: "Design semantic URLs adhering to REST conventions.",
        expectedOutcome: "Clean, intuitive URL structures for API consumers."
      }
    ]
  },
  {
    id: "M08",
    number: 8,
    title: "Express Middleware",
    khmerTitle: "ប្រព័ន្ធ Middleware ក្នុង Express.js",
    category: "Express & REST",
    accentColor: "#a855f7",
    duration: "4.5 Hours",
    description: "Middleware architecture: Execution flow, built-in middleware, custom middleware, auth guards, logging, and error handlers.",
    topics: [
      {
        id: "M08-01",
        number: "01",
        title: "What is Middleware & The next() Function",
        khmerTitle: "អ្វីជា Middleware និងតួនាទីរបស់អនុគមន៍ next()",
        type: "concept",
        summary: "Functions that have access to `req`, `res`, and the `next` function in the application's request-response cycle.",
        codeSnippet: `// Request Logger Middleware
const requestLogger = (req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(\`[\${req.method}] \${req.originalUrl} - \${res.statusCode} (\${duration}ms)\`);
  });
  next(); // Pass control to the next middleware!
};

app.use(requestLogger);`,
        codeLanguage: "javascript",
        tip: "Always call `next()` or send a response with `res.json()`. Otherwise the HTTP connection hangs indefinitely.",
        objective: "Understand middleware chaining and execution order.",
        expectedOutcome: "Mastery of request interceptor pipelines."
      },
      {
        id: "M08-02",
        number: "02",
        title: "Built-in & Third-Party Middleware",
        khmerTitle: "Middleware ដែលភ្ជាប់មកស្រាប់ និងកញ្ចប់ខាងក្រៅ",
        type: "lab",
        summary: "`express.json()`, `express.urlencoded()`, `cors()`, `helmet()`, and `morgan()`.",
        codeSnippet: `import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(helmet()); // Sets 15+ HTTP security headers
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json({ limit: "10mb" })); // Parse JSON payloads up to 10MB
app.use(express.urlencoded({ extended: true }));`,
        codeLanguage: "javascript",
        tip: "Order matters: security middleware like `helmet` and `cors` should run BEFORE your routes.",
        objective: "Configure a secure standard Express middleware stack.",
        expectedOutcome: "Production-ready base server security."
      }
    ]
  },
  {
    id: "M09",
    number: 9,
    title: "REST API Development",
    khmerTitle: "ការអភិវឌ្ឍ RESTful API",
    category: "Express & REST",
    accentColor: "#d946ef",
    duration: "4.5 Hours",
    description: "REST principles, HTTP verbs, status codes, standard JSON response envelope, error structures, filtering, searching, and pagination.",
    topics: [
      {
        id: "M09-01",
        number: "01",
        title: "REST Principles & HTTP Verbs",
        khmerTitle: "គោលការណ៍ REST និងកិរិយាស័ព្ទ HTTP",
        type: "concept",
        summary: "Resource-oriented endpoints: GET (retrieve), POST (create), PUT (replace), PATCH (partial update), DELETE (remove).",
        codeSnippet: `// Consistent REST design
// GET    /api/v1/articles        -> List articles
// POST   /api/v1/articles        -> Create new article
// GET    /api/v1/articles/:id    -> Get single article
// PATCH  /api/v1/articles/:id    -> Partial update
// DELETE /api/v1/articles/:id    -> Remove article`,
        codeLanguage: "javascript",
        tip: "Use nouns for resources (e.g. `/articles`, `/users`), never verbs like `/getArticles` or `/deleteUser`.",
        objective: "Design predictable RESTful API contracts.",
        expectedOutcome: "Industry-standard API naming and behavior."
      },
      {
        id: "M09-02",
        number: "02",
        title: "Standardized API Response & Pagination",
        khmerTitle: "ទម្រង់ឆ្លើយតបស្តង់ដារ និង Pagination",
        type: "lab",
        summary: "Consistent JSend/JSON-API envelopes with success boolean, data payload, meta information, and status codes.",
        codeSnippet: `// Consistent envelope pattern
res.status(200).json({
  success: true,
  statusCode: 200,
  meta: {
    page: 1,
    limit: 10,
    totalRecords: 142,
    totalPages: 15
  },
  data: items
});`,
        codeLanguage: "javascript",
        tip: "Always wrap array responses in a `{ data: [] }` property to allow future metadata additions without breaking clients.",
        objective: "Implement uniform response formatting across all endpoints.",
        expectedOutcome: "Predictable API consumption for frontend teams."
      }
    ]
  },
  {
    id: "M10",
    number: 10,
    title: "Controllers & Services",
    khmerTitle: "ស្ថាបត្យកម្ម Controllers និង Services",
    category: "Express & REST",
    accentColor: "#f43f5e",
    duration: "4 Hours",
    description: "Separation of concerns, clean architecture, slim controllers, rich services, reusable business logic, and testability.",
    topics: [
      {
        id: "M10-01",
        number: "01",
        title: "Separation of Concerns & Architecture",
        khmerTitle: "ការបែងចែកទំនួលខុសត្រូវ (Separation of Concerns)",
        type: "architecture",
        summary: "Routes handle URLs; Controllers handle HTTP request/response; Services execute business logic; Models interface with database.",
        codeSnippet: `// 1. Controller: ONLY handles HTTP inputs and responses
export const registerUser = async (req, res, next) => {
  try {
    const user = await authService.createUser(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

// 2. Service: Pure business logic, reusable in CLI, webhooks, or cron!
export const createUser = async (userData) => {
  const existing = await User.findOne({ email: userData.email });
  if (existing) throw new BadRequestError("Email already registered");
  const hashedPassword = await bcrypt.hash(userData.password, 12);
  return await User.create({ ...userData, password: hashedPassword });
};`,
        codeLanguage: "javascript",
        tip: "Never access `req` or `res` directly inside a Service; keep Services completely decoupled from the HTTP transport layer.",
        objective: "Decouple HTTP mechanics from business logic.",
        expectedOutcome: "Testable services that can be unit-tested without mocking Express."
      }
    ]
  },
  {
    id: "M11",
    number: 11,
    title: "MongoDB Fundamentals",
    khmerTitle: "មូលដ្ឋានគ្រឹះ MongoDB",
    category: "Databases",
    accentColor: "#10b981",
    duration: "4.5 Hours",
    description: "Document databases vs SQL tables, Collections, Documents, BSON, ObjectId, Embedded documents vs References, and Atlas setup.",
    topics: [
      {
        id: "M11-01",
        number: "01",
        title: "SQL vs NoSQL & MongoDB Architecture",
        khmerTitle: "ការប្រៀបធៀប SQL vs NoSQL និងស្ថាបត្យកម្ម MongoDB",
        type: "concept",
        summary: "NoSQL document stores format data as flexible JSON-like BSON documents, allowing nested objects and arrays without complex joins.",
        codeSnippet: `// A MongoDB Document (BSON):
{
  "_id": ObjectId("65f1a2b3c4d5e6f7a8b9c0d1"),
  "title": "MacBook Pro M3",
  "price": 1999.00,
  "tags": ["laptop", "apple", "hardware"],
  "specs": { "ram": "32GB", "storage": "1TB SSD" },
  "reviews": [
    { "user": "Chann", "rating": 5, "comment": "Blazing fast!" }
  ],
  "createdAt": ISODate("2026-03-15T08:00:00Z")
}`,
        codeLanguage: "javascript",
        tip: "Data that is queried together should generally be stored together (embedding), unless the array grows unbounded.",
        objective: "Design flexible document schemas.",
        expectedOutcome: "Understanding the balance between normalization and denormalization."
      },
      {
        id: "M11-02",
        number: "02",
        title: "Embedded Documents vs References",
        khmerTitle: "ការបង្កប់ឯកសារ (Embedding) vs ការយោង (Referencing)",
        type: "concept",
        summary: "One-to-Few relationships benefit from embedding; One-to-Many or Many-to-Many relationships require ObjectId references.",
        codeSnippet: `// 1. EMBEDDED: Order Items (never queried without their parent Order)
{
  orderNumber: "ORD-991",
  items: [{ productId: "...", qty: 2, price: 49.99 }]
}

// 2. REFERENCED: User Posts (a user may write 100,000 posts)
{
  title: "Building Microservices",
  author: ObjectId("65f1a2b3c4d5e6f7a8b9c0d1") // Reference to User collection
}`,
        codeLanguage: "javascript",
        tip: "Avoid MongoDB 16MB document size limit by referencing collections when data can grow indefinitely.",
        objective: "Choose between embedding and referencing with confidence.",
        expectedOutcome: "High-performance database schema architecture."
      }
    ]
  },
  {
    id: "M12",
    number: 12,
    title: "Mongoose ODM",
    khmerTitle: "ការប្រើប្រាស់ Mongoose ODM",
    category: "Databases",
    accentColor: "#059669",
    duration: "5 Hours",
    description: "Schemas, Models, Validation, Schema Types, Timestamps, Pre/Post Middleware (Hooks), Virtuals, and Population ($lookup).",
    topics: [
      {
        id: "M12-01",
        number: "01",
        title: "Schema & Model Definition",
        khmerTitle: "ការបង្កើត Schema និង Model ជាមួយ Mongoose",
        type: "lab",
        summary: "Define strongly-typed document structures, validation rules, default values, and indexes.",
        codeSnippet: `import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: [true, "Product name is required"], trim: true },
  slug: { type: String, unique: true, lowercase: true },
  price: { type: Number, required: true, min: [0, "Price cannot be negative"] },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  isFeatured: { type: Boolean, default: false }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically!
});

export const Product = mongoose.model("Product", productSchema);`,
        codeLanguage: "javascript",
        tip: "Always enable `{ timestamps: true }` in your schema options to track record creation and modification times.",
        objective: "Construct validated Mongoose models.",
        expectedOutcome: "Bulletproof data schemas with automated timestamps."
      },
      {
        id: "M12-02",
        number: "02",
        title: "Mongoose Middleware & Population",
        khmerTitle: "Mongoose Hooks (Pre/Post) និង Population",
        type: "lab",
        summary: "Use `pre('save')` hooks to hash passwords, and `.populate()` to automatically join referenced documents.",
        codeSnippet: `// Pre-save hook to hash passwords
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Population: Joins User author into Post
const post = await Post.findById(postId).populate("author", "name email avatar");`,
        codeLanguage: "javascript",
        tip: "Only select necessary fields in `populate('field', 'name avatar')` to avoid over-fetching database records.",
        objective: "Implement automated lifecycle hooks and cross-collection joins.",
        expectedOutcome: "Automated hashing and optimized database joins."
      }
    ]
  },
  {
    id: "M13",
    number: 13,
    title: "Database API Development",
    khmerTitle: "ការអភិវឌ្ឍ Database CRUD API ពេញលេញ",
    category: "Databases",
    accentColor: "#14b8a6",
    duration: "5 Hours",
    description: "Complete MongoDB CRUD integration, dynamic filtering, multi-field search, sorting, limit/skip pagination, and connection pooling.",
    topics: [
      {
        id: "M13-01",
        number: "01",
        title: "Full CRUD API Implementation",
        khmerTitle: "ការអនុវត្ត CRUD API ពេញលេញ",
        type: "lab",
        summary: "Create, Read with filtering/search/pagination, Update, and Delete with proper HTTP status codes and error handling.",
        codeSnippet: `export const getProducts = async (req, res) => {
  const { search, category, sort = "-createdAt", page = 1, limit = 10 } = req.query;
  const filter = {};
  
  if (search) filter.name = { $regex: search, $options: "i" };
  if (category) filter.category = category;

  const skip = (Number(page) - 1) * Number(limit);

  const [products, total] = await Promise.all([
    Product.find(filter).sort(sort).skip(skip).limit(Number(limit)),
    Product.countDocuments(filter)
  ]);

  res.json({ success: true, meta: { total, page: Number(page), pages: Math.ceil(total / limit) }, data: products });
};`,
        codeLanguage: "javascript",
        tip: "Always run `find()` and `countDocuments()` concurrently with `Promise.all()` to halve your response latency.",
        objective: "Write enterprise-grade query pipelines with search and pagination.",
        expectedOutcome: "Scalable list endpoints capable of filtering thousands of records."
      }
    ]
  },
  {
    id: "M14",
    number: 14,
    title: "Data Validation",
    khmerTitle: "ការត្រួតពិនិត្យទិន្នន័យ (Data Validation)",
    category: "Security & Auth",
    accentColor: "#eab308",
    duration: "4 Hours",
    description: "Request validation with Zod and Joi: Body validation, Query validation, Params validation, sanitization, and error transformation.",
    topics: [
      {
        id: "M14-01",
        number: "01",
        title: "Request Validation with Zod",
        khmerTitle: "ការប្រើប្រាស់ Zod Schema Validation Middleware",
        type: "lab",
        summary: "Validate request bodies, params, and queries before your controller is even touched.",
        codeSnippet: `import { z } from "zod";

export const CreateUserSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters")
  })
});

// Middleware Factory
export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({ body: req.body, query: req.query, params: req.params });
    next();
  } catch (err) {
    return res.status(400).json({ success: false, errors: err.errors.map(e => e.message) });
  }
};`,
        codeLanguage: "javascript",
        tip: "Validate data at the edge before touching your database to protect against invalid data, injection, and wasted CPU cycles.",
        objective: "Build schema-driven validation middleware.",
        expectedOutcome: "100% type-safe and validated endpoint inputs."
      }
    ]
  },
  {
    id: "M15",
    number: 15,
    title: "Error Handling",
    khmerTitle: "ការគ្រប់គ្រងកំហុស (Error Handling)",
    category: "Security & Auth",
    accentColor: "#ef4444",
    duration: "4 Hours",
    description: "Custom Application Error classes, centralized Express error middleware, catching unhandled rejections, and production safety.",
    topics: [
      {
        id: "M15-01",
        number: "01",
        title: "Custom AppError & Centralized Error Middleware",
        khmerTitle: "Custom AppError Class និង Error Middleware កណ្តាល",
        type: "lab",
        summary: "Eliminate repetitive try/catch blocks with an async wrapper and centralized error handling middleware.",
        codeSnippet: `// utils/AppError.js
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Distinguishes bugs from operational errors
    Error.captureStackTrace(this, this.constructor);
  }
}

// middleware/error.middleware.js (must have 4 arguments!)
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
};`,
        codeLanguage: "javascript",
        tip: "Never leak the raw stack trace (`err.stack`) in production environments; it exposes file paths and internal logic to attackers.",
        objective: "Implement a clean centralized error management system.",
        expectedOutcome: "Zero server crashes from unhandled errors."
      }
    ]
  },
  {
    id: "M16",
    number: 16,
    title: "Authentication",
    khmerTitle: "ប្រព័ន្ធផ្ទៀងផ្ទាត់អត្តសញ្ញាណ (Authentication)",
    category: "Security & Auth",
    accentColor: "#3b82f6",
    duration: "5 Hours",
    description: "bcrypt password hashing, JSON Web Tokens (JWT), short-lived access tokens, refresh tokens, HttpOnly cookies, and logout flows.",
    topics: [
      {
        id: "M16-01",
        number: "01",
        title: "Password Hashing with bcrypt",
        khmerTitle: "ការ Hash ពាក្យសម្ងាត់ជាមួយ bcrypt",
        type: "lab",
        summary: "One-way cryptographic hashing with automated salt generation to protect passwords against rainbow table attacks.",
        codeSnippet: `import bcrypt from "bcryptjs";

// Hashing with salt factor of 12 (computationally expensive to brute-force)
const salt = await bcrypt.genSalt(12);
const hashedPassword = await bcrypt.hash(rawPassword, salt);

// Comparing on login
const isMatch = await bcrypt.compare(submittedPassword, user.password);
if (!isMatch) throw new AppError("Invalid email or password", 401);`,
        codeLanguage: "javascript",
        tip: "Never store plaintext passwords! A salt round of 10 to 12 provides the optimal balance between security and server latency.",
        objective: "Safely hash and verify user passwords.",
        expectedOutcome: "Zero plaintext credentials in database."
      },
      {
        id: "M16-02",
        number: "02",
        title: "JWT & HttpOnly Refresh Token Cookies",
        khmerTitle: "JWT Tokens និង HttpOnly Cookies សម្រាប់ Refresh Tokens",
        type: "lab",
        summary: "Issue a 15-minute Access Token for API requests, and an HttpOnly SameSite Refresh Token in cookies to combat XSS.",
        codeSnippet: `import jwt from "jsonwebtoken";

// Issue Access Token (short-lived: 15m)
const accessToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" });

// Issue Refresh Token (long-lived: 7d)
const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

// Set in HttpOnly cookie (inaccessible to JavaScript XSS attacks!)
res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000
});

res.json({ success: true, accessToken });`,
        codeLanguage: "javascript",
        tip: "Storing refresh tokens in `HttpOnly` cookies prevents stolen credentials even if an attacker executes XSS on the frontend.",
        objective: "Implement resilient JWT auth with automatic token refreshing.",
        expectedOutcome: "Industry-grade authentication resilient against XSS."
      }
    ]
  },
  {
    id: "M17",
    number: 17,
    title: "Authorization (RBAC)",
    khmerTitle: "ការអនុញ្ញាតសិទ្ធិ (Role-Based Access Control)",
    category: "Security & Auth",
    accentColor: "#8b5cf6",
    duration: "3.5 Hours",
    description: "Role-Based Access Control (RBAC), permission matrices, admin guards, and resource ownership verification.",
    topics: [
      {
        id: "M17-01",
        number: "01",
        title: "Role-Based Access Control Middleware",
        khmerTitle: "Middleware គ្រប់គ្រងសិទ្ធិតាម Role",
        type: "lab",
        summary: "Restrict endpoint execution based on user roles (`admin`, `instructor`, `student`).",
        codeSnippet: `export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You do not have permission to perform this action", 403));
    }
    next();
  };
};

// Protect route for Admins only:
router.delete("/users/:id", authenticate, authorize("admin"), deleteUser);`,
        codeLanguage: "javascript",
        tip: "401 means Unauthenticated (who are you?); 403 means Forbidden (I know who you are, but you cannot access this).",
        objective: "Guard administrative routes using role-based assertions.",
        expectedOutcome: "Strict role isolation across sensitive API endpoints."
      }
    ]
  },
  {
    id: "M18",
    number: 18,
    title: "API Security",
    khmerTitle: "សុវត្ថិភាព API (API Security)",
    category: "Security & Auth",
    accentColor: "#dc2626",
    duration: "4 Hours",
    description: "Common vulnerabilities: CORS misconfigurations, Helmet security headers, rate limiting, NoSQL injection, XSS, and CSRF.",
    topics: [
      {
        id: "M18-01",
        number: "01",
        title: "Rate Limiting & NoSQL Injection Protection",
        khmerTitle: "ការទប់ស្កាត់ Rate Limit និង NoSQL Injection",
        type: "lab",
        summary: "Prevent brute-force attacks on login routes with `express-rate-limit` and sanitize MongoDB query objects with `express-mongo-sanitize`.",
        codeSnippet: `import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";

// Rate limit: Max 5 login attempts per 15 minutes per IP
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: "Too many login attempts. Please try again after 15 minutes." }
});

// Protect against NoSQL injection: strips out prohibited "$" and "." characters
app.use(mongoSanitize());`,
        codeLanguage: "javascript",
        tip: "Attackers can send `{\"password\": {\"$ne\": null}}` to bypass MongoDB password checks if input is unsanitized.",
        objective: "Harden APIs against brute-force attacks and query injection.",
        expectedOutcome: "Bulletproof defense against common automated bot attacks."
      }
    ]
  },
  {
    id: "M19",
    number: 19,
    title: "File Upload",
    khmerTitle: "ការ Upload ឯកសារ (File Upload)",
    category: "Express & REST",
    accentColor: "#0ea5e9",
    duration: "4 Hours",
    description: "Multipart/form-data, Multer configuration, image dimension validation, local disk storage, and Cloudflare R2 / AWS S3 uploads.",
    topics: [
      {
        id: "M19-01",
        number: "01",
        title: "File Upload with Multer & Cloudflare R2",
        khmerTitle: "ការ Upload រូបភាពជាមួយ Multer និង Cloudflare R2",
        type: "lab",
        summary: "Accept image files, validate MIME types and sizes, generate unique file keys, and upload to S3-compatible cloud buckets.",
        codeSnippet: `import multer from "multer";

const storage = multer.memoryStorage(); // Keep in memory to stream directly to S3/R2

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new AppError("Only image files are allowed!", 400), false);
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter
});

// Route:
router.post("/avatar", authenticate, upload.single("avatar"), uploadAvatarController);`,
        codeLanguage: "javascript",
        tip: "Never store user uploads on local container disks in production; container rebuilds will erase the files. Use S3 or Cloudflare R2.",
        objective: "Build cloud-ready multipart file upload pipelines.",
        expectedOutcome: "Scalable object storage integration."
      }
    ]
  },
  {
    id: "M20",
    number: 20,
    title: "Email & Notifications",
    khmerTitle: "ប្រព័ន្ធផ្ញើ Email និងការជូនដំណឹង",
    category: "Advanced & Real-time",
    accentColor: "#f97316",
    duration: "3.5 Hours",
    description: "SMTP configuration, Nodemailer, transactional emails, HTML email templates, password resets, and verification tokens.",
    topics: [
      {
        id: "M20-01",
        number: "01",
        title: "Transactional Email with Nodemailer",
        khmerTitle: "ការផ្ញើ Email ជាមួយ Nodemailer និង HTML Templates",
        type: "lab",
        summary: "Send branded transactional emails (welcome messages, password reset links) via SMTP gateways like Resend or SendGrid.",
        codeSnippet: `import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendResetPasswordEmail = async (email, resetUrl) => {
  await transporter.sendMail({
    from: '"NodePulse Security" <noreply@nodepulse.com>',
    to: email,
    subject: "Reset your password (valid for 10 minutes)",
    html: \`<p>Click here to reset: <a href="\${resetUrl}">Reset Password</a></p>\`
  });
};`,
        codeLanguage: "javascript",
        tip: "Always send emails asynchronously through background queues so the HTTP request completes immediately without waiting 2 seconds for SMTP.",
        objective: "Integrate SMTP transactional emails.",
        expectedOutcome: "Automated account verification and password reset workflows."
      }
    ]
  },
  {
    id: "M21",
    number: 21,
    title: "API Documentation",
    khmerTitle: "ឯកសារពិពណ៌នា API (OpenAPI / Swagger)",
    category: "Architecture & DevOps",
    accentColor: "#14b8a6",
    duration: "3.5 Hours",
    description: "OpenAPI 3.0 specifications, Swagger JSDoc, Swagger UI interactive documentation, and schema definitions.",
    topics: [
      {
        id: "M21-01",
        number: "01",
        title: "Interactive Swagger UI Setup",
        khmerTitle: "ការរៀបចំ Swagger UI សម្រាប់ Express",
        type: "lab",
        summary: "Generate interactive web documentation directly from JSDoc code comments using `swagger-jsdoc` and `swagger-ui-express`.",
        codeSnippet: `import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Course REST API", version: "1.0.0" },
    servers: [{ url: "http://localhost:5000/api/v1" }]
  },
  apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));`,
        codeLanguage: "javascript",
        tip: "A well-documented Swagger UI allows frontend developers and QA engineers to test endpoints without bothering backend developers.",
        objective: "Serve interactive API documentation at `/api/docs`.",
        expectedOutcome: "Self-documenting, testable API interfaces."
      }
    ]
  },
  {
    id: "M22",
    number: 22,
    title: "API Testing",
    khmerTitle: "ការធ្វើតេស្ត API (Vitest & Supertest)",
    category: "Architecture & DevOps",
    accentColor: "#64748b",
    duration: "4.5 Hours",
    description: "Unit testing, integration testing, Supertest for HTTP endpoint testing, mock databases, and authentication testing.",
    topics: [
      {
        id: "M22-01",
        number: "01",
        title: "Integration Testing with Vitest & Supertest",
        khmerTitle: "ការធ្វើតេស្ត Integration ជាមួយ Vitest និង Supertest",
        type: "lab",
        summary: "Spin up memory test databases and execute real HTTP assertions against your Express app without opening a real port.",
        codeSnippet: `import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../src/app.js";

describe("POST /api/v1/todos", () => {
  it("should create a new todo and return 201 Created", async () => {
    const res = await request(app)
      .post("/api/v1/todos")
      .send({ title: "Learn Vitest", completed: false });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe("Learn Vitest");
  });
});`,
        codeLanguage: "javascript",
        tip: "Export your Express `app` without `app.listen()` so `supertest(app)` can execute tests instantly in memory.",
        objective: "Write automated integration test suites for endpoints.",
        expectedOutcome: "High code confidence and regression prevention."
      }
    ]
  },
  {
    id: "M23",
    number: 23,
    title: "API Development Tools",
    khmerTitle: "ឧបករណ៍អភិវឌ្ឍន៍ API (Postman & Scripts)",
    category: "Architecture & DevOps",
    accentColor: "#f97316",
    duration: "3 Hours",
    description: "Postman collections, environment variables, pre-request scripts, automated test assertions, and CI Newman integration.",
    topics: [
      {
        id: "M23-01",
        number: "01",
        title: "Postman Collections & Auto-Token Injection",
        khmerTitle: "ការប្រើប្រាស់ Postman Collection និង Script ចាប់ Token",
        type: "lab",
        summary: "Automatically save JWT tokens into Postman environment variables upon login for seamless authenticated requests.",
        codeSnippet: `// Postman Tests Tab (Runs automatically after Login request):
const response = pm.response.json();
if (response.accessToken) {
  pm.environment.set("jwt_token", response.accessToken);
  console.log("Token automatically saved to environment!");
}

// In subsequent requests Headers:
// Authorization: Bearer {{jwt_token}}`,
        codeLanguage: "javascript",
        tip: "Export your Postman collections to your Git repository so the whole engineering team shares the exact same test suites.",
        objective: "Create synchronized team API collections with test assertions.",
        expectedOutcome: "Rapid debugging and zero manual token copy-pasting."
      }
    ]
  },
  {
    id: "M24",
    number: 24,
    title: "Real-Time Features",
    khmerTitle: "មុខងារ Real-Time (WebSockets & Socket.IO)",
    category: "Advanced & Real-time",
    accentColor: "#06b6d4",
    duration: "4.5 Hours",
    description: "Full-duplex WebSocket communication, Socket.IO server and client, rooms, namespaces, online user presence, and real-time chat.",
    topics: [
      {
        id: "M24-01",
        number: "01",
        title: "Socket.IO Server & Room Broadcasts",
        khmerTitle: "ការបង្កើត Socket.IO Server និងការផ្ញើក្នុងបន្ទប់ Rooms",
        type: "lab",
        summary: "Attach Socket.IO to an HTTP server and broadcast real-time events to specific chat rooms or user IDs.",
        codeSnippet: `import { createServer } from "node:http";
import { Server } from "socket.io";
import app from "./app.js";

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  socket.on("sendMessage", ({ roomId, message, sender }) => {
    // Broadcast ONLY to clients in this specific room!
    io.to(roomId).emit("newMessage", { message, sender, timestamp: new Date() });
  });
});`,
        codeLanguage: "javascript",
        tip: "Socket.IO has built-in reconnection, fallback to long-polling, and automatic room management, making it far superior to raw WebSockets.",
        objective: "Implement real-time bi-directional chat communication.",
        expectedOutcome: "Live instant notifications and collaborative features."
      }
    ]
  },
  {
    id: "M25",
    number: 25,
    title: "Performance & Caching",
    khmerTitle: "ការបង្កើនល្បឿន និង Caching (Redis)",
    category: "Advanced & Real-time",
    accentColor: "#ef4444",
    duration: "4.5 Hours",
    description: "Node.js profiling, MongoDB index optimization, compound indexes, response compression, and in-memory caching with Redis.",
    topics: [
      {
        id: "M25-01",
        number: "01",
        title: "Redis Response Caching Middleware",
        khmerTitle: "ការប្រើប្រាស់ Redis Caching ដើម្បីកាត់បន្ថយបន្ទុក Database",
        type: "lab",
        summary: "Cache expensive database query responses in in-memory Redis keys with automated TTL expiration.",
        codeSnippet: `import { createClient } from "redis";
const redisClient = createClient({ url: process.env.REDIS_URL });
await redisClient.connect();

export const cache = (ttlSeconds = 300) => async (req, res, next) => {
  const key = \`cache:\${req.originalUrl}\`;
  const cachedData = await redisClient.get(key);

  if (cachedData) {
    return res.json(JSON.parse(cachedData)); // Returns in 2ms instead of 150ms DB query!
  }

  // Intercept res.json to cache response
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    redisClient.setEx(key, ttlSeconds, JSON.stringify(body));
    return originalJson(body);
  };
  next();
};`,
        codeLanguage: "javascript",
        tip: "Remember to invalidate cache keys when mutating data (e.g. clear `cache:/api/v1/products*` when a new product is added).",
        objective: "Accelerate read endpoints by up to 100x using Redis caching.",
        expectedOutcome: "Sub-5ms response times under heavy concurrent loads."
      }
    ]
  },
  {
    id: "M26",
    number: 26,
    title: "Background Jobs",
    khmerTitle: "ការងារដំណើរការនៅខាងក្រោយ (BullMQ & Queues)",
    category: "Advanced & Real-time",
    accentColor: "#8b5cf6",
    duration: "4.5 Hours",
    description: "Asynchronous task delegation, message queues, BullMQ with Redis, producers, workers, job retries, and scheduled cron jobs.",
    topics: [
      {
        id: "M26-01",
        number: "01",
        title: "BullMQ Job Queues & Workers",
        khmerTitle: "ការប្រើប្រាស់ BullMQ សម្រាប់ Email Queue & Heavy Processing",
        type: "lab",
        summary: "Offload slow tasks (image resizing, video encoding, email broadcasts) to a separate background worker queue.",
        codeSnippet: `import { Queue, Worker } from "bullmq";

const connection = { host: "127.0.0.1", port: 6379 };

// 1. PRODUCER (in Express Route - responds in 5ms!):
export const emailQueue = new Queue("emailQueue", { connection });
await emailQueue.add("sendWelcome", { email: "student@example.com", name: "Dara" }, {
  attempts: 3,
  backoff: { type: "exponential", delay: 2000 }
});

// 2. WORKER (Runs in background process):
const worker = new Worker("emailQueue", async (job) => {
  console.log("Processing background job:", job.name);
  await sendActualEmail(job.data.email);
}, { connection });`,
        codeLanguage: "javascript",
        tip: "Queue backoffs ensure that temporary SMTP network hiccups automatically retry without dropping user emails.",
        objective: "Separate HTTP API response time from heavy processing tasks.",
        expectedOutcome: "Ultra-responsive API that never blocks on external services."
      }
    ]
  },
  {
    id: "M27",
    number: 27,
    title: "Backend Project Architecture",
    khmerTitle: "ស្ថាបត្យកម្មគម្រោង Backend កម្រិត Enterprise",
    category: "Architecture & DevOps",
    accentColor: "#10b981",
    duration: "4 Hours",
    description: "Standard enterprise backend directory structure, clean domain segregation, dependency injection patterns, and production scalability.",
    topics: [
      {
        id: "M27-01",
        number: "01",
        title: "Enterprise Clean Folder Structure",
        khmerTitle: "រចនាសម្ព័ន្ធ Folder ស្តង់ដារ Enterprise",
        type: "architecture",
        summary: "High-scale backend layout separating configuration, routes, controllers, services, models, middleware, validators, jobs, and utils.",
        codeSnippet: `src/
├── config/        # Environment, Database, Redis, Logger configs
├── routes/        # Express route definitions & versioning (v1, v2)
├── controllers/   # Request/response validation & HTTP serialization
├── services/      # Core business logic, computations, transactions
├── models/        # Mongoose/Prisma schema definitions & indexes
├── middleware/    # Auth, RBAC, error handling, rate limiting
├── validators/    # Zod schemas for request body & query validation
├── utils/         # Helper functions, formatters, custom error classes
├── jobs/          # BullMQ queue producers & background workers
├── database/      # Seeders, migrations, connection pool managers
└── app.js         # Express setup without listen (for Supertest)
server.js          # Port listening, clustering, and graceful shutdown`,
        codeLanguage: "bash",
        tip: "When code files grow beyond 250 lines, it is usually time to extract a helper service or utility module.",
        objective: "Adopt industry-standard directory layouts for multi-developer teams.",
        expectedOutcome: "Clean, predictable code navigation across large codebases."
      }
    ]
  },
  {
    id: "M28",
    number: 28,
    title: "Production & Deployment",
    khmerTitle: "ការដាក់ឱ្យដំណើរការលើ Production (Docker, Nginx, CI/CD)",
    category: "Architecture & DevOps",
    accentColor: "#3b82f6",
    duration: "5 Hours",
    description: "Dockerizing Node.js, multi-stage Dockerfiles, Docker Compose (Node+Mongo+Redis), PM2 clustering, Nginx reverse proxy, HTTPS, and GitHub Actions CI/CD.",
    topics: [
      {
        id: "M28-01",
        number: "01",
        title: "Multi-Stage Dockerfile for Node.js",
        khmerTitle: "ការសរសេរ Multi-Stage Dockerfile កម្រិត Production",
        type: "lab",
        summary: "Build ultra-lean, non-root production container images without leaking dev tools or source maps.",
        codeSnippet: `# Multi-stage Dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/node_modules ./node_modules
COPY src ./src
USER node
EXPOSE 5000
CMD ["node", "src/server.js"]`,
        codeLanguage: "dockerfile",
        tip: "Always run as non-root user `USER node` to prevent container breakout vulnerabilities.",
        objective: "Create secure, lightweight (~120MB) Docker containers.",
        expectedOutcome: "Fast, secure containerized deployments."
      },
      {
        id: "M28-02",
        number: "02",
        title: "Nginx Reverse Proxy & SSL Configuration",
        khmerTitle: "ការកំណត់រចនាសម្ព័ន្ធ Nginx Reverse Proxy និង SSL",
        type: "lab",
        summary: "Route incoming public traffic on port 80/443 through Nginx to internal Node.js cluster processes with gzip and rate limiting.",
        codeSnippet: `server {
    listen 80;
    server_name api.yourdomain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}`,
        codeLanguage: "bash",
        tip: "Nginx handles SSL termination and static file serving much faster than Node.js, freeing CPU cycles for business logic.",
        objective: "Configure a production reverse proxy with automated SSL certificate renewal.",
        expectedOutcome: "Secure HTTPS endpoint with load balancing capability."
      }
    ]
  },
  {
    id: "M29",
    number: 29,
    title: "Real-World Projects",
    khmerTitle: "គម្រោងអនុវត្តជាក់ស្តែងទាំង ៦ (Real-World Projects)",
    category: "Projects",
    accentColor: "#10b981",
    duration: "10 Hours",
    description: "6 complete, production-grade applications from simple CRUD to full-scale multi-service architecture with Redis, Docker, and Swagger.",
    topics: [
      {
        id: "M29-01",
        number: "01",
        title: "Project 01: Todo REST API",
        khmerTitle: "គម្រោងទី ១ ៖ Todo REST API",
        type: "lab",
        summary: "Build a complete Todo REST API with MongoDB, filtering, pagination, Zod validation, and error handling.",
        codeSnippet: `// Endpoints:
// POST   /api/v1/todos          -> Create Todo
// GET    /api/v1/todos          -> List Todos (with ?completed=true&page=1)
// GET    /api/v1/todos/:id      -> Get Single Todo
// PATCH  /api/v1/todos/:id      -> Update Todo
// DELETE /api/v1/todos/:id      -> Delete Todo`,
        codeLanguage: "javascript",
        tip: "Start by implementing the Zod validation schema before writing the controller.",
        objective: "Master fundamental REST CRUD patterns and schema validation.",
        expectedOutcome: "Clean, error-handled Todo API."
      },
      {
        id: "M29-02",
        number: "02",
        title: "Project 02: Student Management API",
        khmerTitle: "គម្រោងទី ២ ៖ Student Management API",
        type: "lab",
        summary: "Student CRUD with multi-field search (name, email, studentId), department filters, pagination, and Swagger UI documentation.",
        codeSnippet: `// Key Features:
// - Multi-field Regex Search
// - Grade & Course enrollment references
// - Auto-generated Swagger Documentation at /api/docs
// - MongoDB indexes on studentId and email`,
        codeLanguage: "javascript",
        tip: "Add compound indexes on `{ department: 1, gpa: -1 }` to make filtering and sorting lightning-fast.",
        objective: "Build search-intensive APIs with complete OpenAPI documentation.",
        expectedOutcome: "Interactive Swagger API with high query throughput."
      },
      {
        id: "M29-03",
        number: "03",
        title: "Project 03: Authentication API",
        khmerTitle: "គម្រោងទី ៣ ៖ Authentication & Authorization API",
        type: "lab",
        summary: "Complete user auth system: bcrypt hashing, JWT access tokens, HttpOnly cookie refresh tokens, role-based access, and password resets.",
        codeSnippet: `// Auth API Routes:
// POST /api/v1/auth/register
// POST /api/v1/auth/login
// POST /api/v1/auth/refresh-token
// POST /api/v1/auth/forgot-password
// POST /api/v1/auth/reset-password
// POST /api/v1/auth/logout`,
        codeLanguage: "javascript",
        tip: "Store hashed reset tokens in MongoDB with a 10-minute expiration index (`{ expireAfterSeconds: 600 }`).",
        objective: "Build a production auth microservice with refresh token rotation.",
        expectedOutcome: "Battle-tested authentication service."
      },
      {
        id: "M29-04",
        number: "04",
        title: "Project 04: Product Management API",
        khmerTitle: "គម្រោងទី ៤ ៖ Product Management API ជាមួយ File Upload",
        type: "lab",
        summary: "Product inventory management with Category relationships, image uploads via Multer, pricing filters, and role-based permissions.",
        codeSnippet: `// Upload product image with validation
router.post(
  "/",
  authenticate,
  authorize("admin"),
  upload.array("images", 5),
  createProductController
);`,
        codeLanguage: "javascript",
        tip: "Generate thumbnail images automatically during upload to save bandwidth on mobile devices.",
        objective: "Handle multipart uploads combined with relational Mongoose population.",
        expectedOutcome: "Robust catalog management system."
      },
      {
        id: "M29-05",
        number: "05",
        title: "Project 05: E-Commerce Backend",
        khmerTitle: "គម្រោងទី ៥ ៖ ប្រព័ន្ធ E-Commerce Backend ពេញលេញ",
        type: "lab",
        summary: "Users, Products, Categories, Cart, Wishlist, Order checkout, Payment webhook integration, and Admin analytics.",
        codeSnippet: `// Transactional checkout using MongoDB Sessions:
const session = await mongoose.startSession();
session.startTransaction();
try {
  // Deduct product stock
  // Create Order
  // Clear User Cart
  await session.commitTransaction();
} catch (err) {
  await session.abortTransaction();
  throw err;
}`,
        codeLanguage: "javascript",
        tip: "Use MongoDB multi-document transactions to ensure inventory stock is never oversold.",
        objective: "Build atomic e-commerce transaction workflows.",
        expectedOutcome: "Resilient digital commerce backend."
      },
      {
        id: "M29-06",
        number: "06",
        title: "Project 06: Final Production REST API",
        khmerTitle: "គម្រោងទី ៦ ៖ Final Production REST API (Cap-Stone)",
        type: "architecture",
        summary: "Full-scale production system: Express, MongoDB, Redis caching, BullMQ background queues, Docker Compose, Nginx, Vitest, CI/CD.",
        codeSnippet: `// Comprehensive Enterprise Stack
// - Node.js + Express (Clean Controller/Service)
// - MongoDB Replica Set with Mongoose ODM
// - Redis for Caching & BullMQ Queues
// - Docker Compose (Multi-container orchestration)
// - Nginx Reverse Proxy with HTTPS
// - Automated Vitest Integration Tests
// - GitHub Actions CI/CD pipeline`,
        codeLanguage: "javascript",
        tip: "This project brings together every single skill taught throughout the 28 prior modules into one deployable artifact.",
        objective: "Deploy a production-grade distributed backend system.",
        expectedOutcome: "Portfolio-grade, enterprise-ready software architecture."
      }
    ]
  }
];
