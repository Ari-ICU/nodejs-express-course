/**
 * modules-01-05.mjs
 * Complete detailed curriculum data for Modules 01 through 05 (69 topics)
 */

export const MODULES_01_05 = {
  M01: [
    {
      id: "M01-01", number: "01",
      title: "What is Backend Development?",
      khmerTitle: "អ្វីជាការអភិវឌ្ឍ Backend?",
      type: "concept", codeLanguage: "javascript",
      summary: "Backend development powers the hidden server-side engine behind modern applications. It coordinates business logic, communicates with databases, manages authentication and sessions, processes external API integrations, and ensures high availability, data security, and low latency for client interfaces.",
      codeSnippet: `// A minimal HTTP response conceptual model
// Client sends Request -> Server executes business logic -> Server returns Response
const response = {
  status: 200,
  headers: { "Content-Type": "application/json" },
  data: { user: "Sokha", role: "Developer", access: true }
};`
    },
    {
      id: "M01-02", number: "02",
      title: "Frontend vs Backend",
      khmerTitle: "ភាពខុសគ្នារវាង Frontend និង Backend",
      type: "concept", codeLanguage: "javascript",
      summary: "Frontend executes entirely inside the user's browser environment (HTML, CSS, React, Vue), rendering UI and managing interactive user state. Backend runs in secure, isolated server infrastructure (Node.js, databases, microservices), guarding secret API keys, enforcing business authorization, and handling durable storage.",
      codeSnippet: `// FRONTEND (Browser):
// Fetches data, manages UI state, triggers visual renders
const res = await fetch("/api/v1/products");
const products = await res.json();

// BACKEND (Node.js Server):
// Validates token, queries MongoDB, hides secret API keys
app.get("/api/v1/products", verifyToken, async (req, res) => {
  const products = await Product.find({ published: true });
  res.json({ success: true, data: products });
});`
    },
    {
      id: "M01-03", number: "03",
      title: "Client-Server Architecture",
      khmerTitle: "ស្ថាបត្យកម្ម Client-Server",
      type: "architecture", codeLanguage: "javascript",
      summary: "The foundational distributed systems model where clients (mobile apps, web browsers, IoT devices) initiate requests over TCP/IP and HTTP, and centralized server nodes authenticate, parse, query database clusters, and return formatted responses.",
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
*/`
    },
    {
      id: "M01-04", number: "04",
      title: "What is Node.js?",
      khmerTitle: "អ្វីទៅជា Node.js?",
      type: "concept", codeLanguage: "javascript",
      summary: "Node.js is an open-source, cross-platform JavaScript runtime environment built on Google Chrome's high-performance V8 JavaScript engine and libuv. It executes JavaScript outside the web browser, allowing developers to build lightning-fast, highly scalable network servers using JavaScript.",
      codeSnippet: `// Inspect your Node environment
console.log("Node version:", process.version);
console.log("Platform:", process.platform);
console.log("Architecture:", process.arch);
console.log("Memory Usage:", process.memoryUsage().heapUsed / 1024 / 1024, "MB");`
    },
    {
      id: "M01-05", number: "05",
      title: "Why Node.js?",
      khmerTitle: "ហេតុអ្វីត្រូវជ្រើសរើស Node.js?",
      type: "concept", codeLanguage: "javascript",
      summary: "Node.js empowers teams to use a unified language (JavaScript/TypeScript) across both client and server. Its asynchronous, non-blocking I/O architecture handles tens of thousands of concurrent connections on minimal hardware, making it the industry standard for APIs, microservices, and real-time platforms.",
      codeSnippet: `// Example: Sharing validation schemas across Frontend and Backend
export const validateUsername = (name) => {
  return typeof name === "string" && name.trim().length >= 3 && name.trim().length <= 30;
};`
    },
    {
      id: "M01-06", number: "06",
      title: "Node.js Runtime",
      khmerTitle: "បរិស្ថានប្រតិបត្តិការ Node.js Runtime",
      type: "architecture", codeLanguage: "javascript",
      summary: "The Node.js runtime consists of Google's V8 engine (compiling JS to machine code), libuv (a C library providing the event loop and thread pool), core C++ bindings, and built-in JavaScript API modules (fs, http, crypto, path).",
      codeSnippet: `/* Node.js Runtime Composition:
┌───────────────────────────────────────────┐
│              JavaScript Code              │
├───────────────────────────────────────────┤
│        Node.js Core API (fs, http)        │
├───────────────────────────────────────────┤
│         C++ Node.js Bindings              │
├─────────────────────┬─────────────────────┤
│   V8 Engine (JIT)   │    libuv (Event     │
│   JavaScript Engine │    Loop & Threads)  │
└─────────────────────┴─────────────────────┘
*/`
    },
    {
      id: "M01-07", number: "07",
      title: "Node.js Architecture",
      khmerTitle: "ស្ថាបត្យកម្មប្រព័ន្ធ Node.js",
      type: "architecture", codeLanguage: "javascript",
      summary: "Node.js uses a Single-Threaded Event Loop architecture. Rather than dedicating an operating system thread per request (like Apache or traditional Java/PHP models), Node processes thousands of incoming connections on a single main thread by delegating asynchronous tasks to libuv workers.",
      codeSnippet: `/* Single Threaded Event Loop vs Multi-Threaded:
   Multi-Threaded (Apache):  [Req 1 -> Thread 1]  [Req 2 -> Thread 2] (~2MB RAM/thread)
   Single-Thread (Node.js): [Req 1, 2, 3... -> Single Event Loop -> Non-blocking I/O]
*/`
    },
    {
      id: "M01-08", number: "08",
      title: "Event-driven Architecture",
      khmerTitle: "ស្ថាបត្យកម្មជំរុញដោយព្រឹត្តិការណ៍ (Event-driven)",
      type: "concept", codeLanguage: "javascript",
      summary: "In an event-driven architecture, the server constantly listens for events (incoming HTTP requests, socket connections, timer completions, database responses) and triggers associated callback handlers when events occur.",
      codeSnippet: `import { EventEmitter } from "node:events";

const orderEmitter = new EventEmitter();

// Listener 1: Send confirmation email
orderEmitter.on("order:placed", (order) => {
  console.log(\`Sending invoice email for order #\${order.id}\`);
});

// Listener 2: Update warehouse inventory
orderEmitter.on("order:placed", (order) => {
  console.log(\`Deducting item \${order.item} from inventory\`);
});

// Trigger event
orderEmitter.emit("order:placed", { id: 9812, item: "MacBook Pro" });`
    },
    {
      id: "M01-09", number: "09",
      title: "Non-blocking I/O",
      khmerTitle: "ប្រតិបត្តិការមិនរាំងស្ទះ (Non-blocking I/O)",
      type: "lab", codeLanguage: "javascript",
      summary: "Non-blocking I/O allows Node.js to initiate an operation (reading a disk file, querying a database, calling an external payment gateway) and immediately proceed to handle other requests without waiting for the operation to finish.",
      codeSnippet: `import fs from "node:fs/promises";

console.log("1. Starting non-blocking read...");

// Initiates I/O and continues immediately
fs.readFile("package.json", "utf-8").then((data) => {
  console.log("3. File read complete! Size:", data.length, "characters");
});

console.log("2. Main thread continues serving other clients!");`
    },
    {
      id: "M01-10", number: "10",
      title: "Node.js Use Cases",
      khmerTitle: "ករណីប្រើប្រាស់សមស្របសម្រាប់ Node.js",
      type: "concept", codeLanguage: "javascript",
      summary: "Node.js is ideal for I/O-heavy, data-intensive, and real-time applications such as REST APIs, GraphQL services, chat applications, streaming servers, microservices, and IoT dashboards. It is less suitable for heavy CPU computation like video encoding or machine learning model training on the main thread.",
      codeSnippet: `/* Ideal Node.js Workloads:
   ✅ REST & GraphQL APIs (High concurrency, DB read/writes)
   ✅ Real-time Chat & WebSockets (Socket.IO, notifications)
   ✅ Streaming services (Audio/Video file pipelines)
   ✅ Microservices & API Gateways (Fast HTTP proxying)
   ❌ Heavy 3D Graphics Rendering (Blocks single thread)
*/`
    },
    {
      id: "M01-11", number: "11",
      title: "Installing Node.js",
      khmerTitle: "ការដំឡើង Node.js ជាមួយ NVM",
      type: "lab", codeLanguage: "bash",
      summary: "Installing Node.js using Node Version Manager (NVM) allows developers to seamlessly switch between multiple Node versions (LTS vs Current) across different client and server projects without permission issues or system conflicts.",
      codeSnippet: `# Install Node Version Manager (nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Install the latest Long-Term Support (LTS) version
nvm install --lts
nvm use --lts

# Verify installation
node -v
npm -v`
    },
    {
      id: "M01-12", number: "12",
      title: "Node.js Project Structure",
      khmerTitle: "រចនាសម្ព័ន្ធ Folder គម្រោង Node.js",
      type: "architecture", codeLanguage: "bash",
      summary: "A professional Node.js backend organizes source code into modular layers: controllers, services, routes, models, middleware, validators, configuration, and utilities, strictly separating transport protocols from business domain rules.",
      codeSnippet: `my-backend-app/
├── src/
│   ├── config/       # Environment variables & DB connectors
│   ├── controllers/  # HTTP request/response handlers
│   ├── middleware/   # Auth, logging, rate limiting
│   ├── models/       # Database schemas (Mongoose)
│   ├── routes/       # Express route definitions
│   ├── services/     # Pure business logic & database queries
│   └── app.js        # Express app initialization
├── tests/            # Automated Vitest / Supertest files
├── .env.example      # Sample environment configuration
├── package.json      # Dependencies and scripts
└── server.js         # HTTP server entrypoint`
    }
  ],

  M02: [
    {
      id: "M02-01", number: "01",
      title: "Running JavaScript with Node.js",
      khmerTitle: "ការដំណើរការ JavaScript ជាមួយ Node.js",
      type: "lab", codeLanguage: "bash",
      summary: "Running JavaScript through the `node` CLI executes files directly against the V8 engine and operating system APIs, providing full access to filesystem, networking, and system environments without a web browser.",
      codeSnippet: `# Run a JavaScript script directly
node app.js

# Run with native file-watcher auto-reload (Node.js 18.11+)
node --watch app.js

# Evaluate inline JavaScript expressions
node -e "console.log('Today is:', new Date().toISOString())"`
    },
    {
      id: "M02-02", number: "02",
      title: "Node.js REPL",
      khmerTitle: "ការប្រើប្រាស់ Node.js REPL",
      type: "lab", codeLanguage: "bash",
      summary: "The Read-Eval-Print Loop (REPL) provides an interactive command-line environment for quickly testing JavaScript expressions, exploring Node.js core APIs, debugging algorithms, and prototyping ideas without creating temporary files.",
      codeSnippet: `# Launch the interactive REPL
$ node
> 10 + 25
35
> _ * 2
70
> crypto.randomUUID()
'd5727670-6548-4df2-8cb6-02a8ebcfcdae'
> .exit`
    },
    {
      id: "M02-03", number: "03",
      title: "package.json",
      khmerTitle: "ឯកសារកំណត់រចនាសម្ព័ន្ធ package.json",
      type: "concept", codeLanguage: "json",
      summary: "The `package.json` file is the central manifest of every Node.js project. It defines project metadata, dependencies, scripts, engines, repository URLs, and specifies whether the project uses ES Modules (`\"type\": \"module\"`) or CommonJS.",
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
}`
    },
    {
      id: "M02-04", number: "04",
      title: "npm",
      khmerTitle: "ការគ្រប់គ្រងកញ្ចប់កូដជាមួយ npm",
      type: "concept", codeLanguage: "bash",
      summary: "Node Package Manager (npm) is the default package registry and command-line package manager for Node.js. It facilitates installing, sharing, updating, and auditing third-party open-source libraries across applications.",
      codeSnippet: `# Initialize a new package.json with defaults
npm init -y

# Search registry packages
npm search express

# Audit project dependencies for security advisories
npm audit
npm audit fix`
    },
    {
      id: "M02-05", number: "05",
      title: "npm Scripts",
      khmerTitle: "ការសរសេរ npm Scripts សម្រាប់ស្វ័យប្រវត្តិកម្ម",
      type: "lab", codeLanguage: "json",
      summary: "npm scripts provide custom alias commands to automate repetitive tasks: starting dev servers, running test suites, executing migrations, linting code, and building production bundles.",
      codeSnippet: `{
  "scripts": {
    "dev": "node --watch --env-file=.env src/server.js",
    "start": "NODE_ENV=production node src/server.js",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}`
    },
    {
      id: "M02-06", number: "06",
      title: "Installing Packages",
      khmerTitle: "ការដំឡើងកញ្ចប់បណ្ណាល័យ (Packages)",
      type: "lab", codeLanguage: "bash",
      summary: "Installing packages allows you to incorporate battle-tested libraries (Express, Mongoose, Zod, bcrypt) into your codebase, locking specific semantic versions to ensure consistent builds across development and production.",
      codeSnippet: `# Install a runtime dependency
npm install express dotenv cors

# Install a specific version
npm install jsonwebtoken@9.0.2

# Uninstall a package
npm uninstall lodash`
    },
    {
      id: "M02-07", number: "07",
      title: "Dependencies",
      khmerTitle: "ការពឹងផ្អែកចាំបាច់ (Dependencies)",
      type: "concept", codeLanguage: "json",
      summary: "Production dependencies listed under `\"dependencies\"` are required for the application to function in production environments (e.g. web frameworks, database drivers, security utilities).",
      codeSnippet: `{
  "dependencies": {
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.4.0",
    "zod": "^3.23.8"
  }
}`
    },
    {
      id: "M02-08", number: "08",
      title: "Dev Dependencies",
      khmerTitle: "ការពឹងផ្អែកសម្រាប់តែការអភិវឌ្ឍ (Dev Dependencies)",
      type: "concept", codeLanguage: "bash",
      summary: "Development dependencies listed under `\"devDependencies\"` are tooling packages used only during local development and testing (linters, test frameworks, type definitions, hot reloaders) and are excluded from production artifacts.",
      codeSnippet: `# Install development-only tools
npm install -D vitest supertest eslint prettier

# package.json result:
# "devDependencies": {
#   "eslint": "^9.3.0",
#   "supertest": "^7.0.0",
#   "vitest": "^1.6.0"
# }`
    },
    {
      id: "M02-09", number: "09",
      title: "node_modules",
      khmerTitle: "ថតផ្ទុកកូដ node_modules",
      type: "concept", codeLanguage: "bash",
      summary: "The `node_modules` directory holds the installed physical code of all direct and transitive dependencies. Because it is reproducible via `npm install`, it should never be committed to Git.",
      codeSnippet: `# Ensure .gitignore has node_modules
echo "node_modules/" >> .gitignore
echo ".env" >> .gitignore

# Completely refresh dependencies if corrupted
rm -rf node_modules package-lock.json
npm install`
    },
    {
      id: "M02-10", number: "10",
      title: "package-lock.json",
      khmerTitle: "សារៈសំខាន់នៃ package-lock.json",
      type: "concept", codeLanguage: "bash",
      summary: "`package-lock.json` locks the exact versions, integrity hashes (SHA-512), and nested dependency trees installed on your system. It guarantees that every developer, CI server, and production Docker container installs the exact same dependency tree.",
      codeSnippet: `# In CI/CD and Dockerfiles, ALWAYS use npm ci:
# - Faster than npm install
# - Throws error if package.json and package-lock.json are out of sync
# - Never modifies the lockfile
npm ci --omit=dev`
    },
    {
      id: "M02-11", number: "11",
      title: "CommonJS",
      khmerTitle: "ប្រព័ន្ធម៉ូឌុល CommonJS (require / module.exports)",
      type: "concept", codeLanguage: "javascript",
      summary: "CommonJS is the legacy module system originally designed for Node.js. It loads modules synchronously using `require()` and exposes public APIs via `module.exports` or `exports`.",
      codeSnippet: `// math.js (CommonJS export)
function add(a, b) {
  return a + b;
}
module.exports = { add };

// app.js (CommonJS import)
const { add } = require("./math");
console.log(add(5, 10)); // 15`
    },
    {
      id: "M02-12", number: "12",
      title: "ES Modules",
      khmerTitle: "ប្រព័ន្ធម៉ូឌុលទំនើប ES Modules (import / export)",
      type: "lab", codeLanguage: "javascript",
      summary: "ECMAScript Modules (ESM) is the standardized official module system of JavaScript. It supports static analysis, top-level `await`, asynchronous loading, and unified syntax across frontend and backend environments.",
      codeSnippet: `// utils.js
export const calculateTax = (price, rate = 0.1) => price * rate;
export default function formatCurrency(amount) {
  return \`$\${amount.toFixed(2)}\`;
}

// server.js
import formatCurrency, { calculateTax } from "./utils.js";

// Top-level await is natively supported in ESM!
const tax = calculateTax(100);
console.log("Tax:", formatCurrency(tax));`
    },
    {
      id: "M02-13", number: "13",
      title: "Environment Variables",
      khmerTitle: "អថេរកំណត់បរិស្ថាន (Environment Variables)",
      type: "concept", codeLanguage: "javascript",
      summary: "Environment variables externalize dynamic configuration (database URLs, port numbers, API secret keys, log levels) from source code, adhering to the 12-Factor App methodology for secure multi-environment deployments.",
      codeSnippet: `// Accessing environment variables via process.env
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DATABASE_URL;
const IS_PROD = process.env.NODE_ENV === "production";

console.log(\`Server starting on port \${PORT} in \${IS_PROD ? "PROD" : "DEV"} mode\`);`
    },
    {
      id: "M02-14", number: "14",
      title: ".env",
      khmerTitle: "ការគ្រប់គ្រង .env ជាមួយបណ្ណាល័យ dotenv",
      type: "lab", codeLanguage: "javascript",
      summary: "The `.env` file stores local key-value environment variables. Libraries like `dotenv` or native Node.js `--env-file` parse this file at startup and populate `process.env`.",
      codeSnippet: `# .env file:
# PORT=5000
# DATABASE_URL=mongodb://localhost:27017/shop
# JWT_SECRET=super_secret_key_123

// Loading via dotenv in code:
import "dotenv/config";

// OR using native Node 20+ CLI argument (zero dependencies!):
// node --env-file=.env server.js`
    },
    {
      id: "M02-15", number: "15",
      title: "process",
      khmerTitle: "វត្ថុប្រព័ន្ធ process ក្នុង Node.js",
      type: "concept", codeLanguage: "javascript",
      summary: "The global `process` object provides programmatic access to the executing Node.js process. It gives access to runtime information, standard input/output streams, memory usage, CPU architecture, and process lifecycle events like graceful shutdown.",
      codeSnippet: `// Graceful shutdown handling
process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Closing database connections gracefully...");
  await db.disconnect();
  server.close(() => {
    console.log("HTTP server closed. Exiting process.");
    process.exit(0);
  });
});`
    },
    {
      id: "M02-16", number: "16",
      title: "Command Line Arguments",
      khmerTitle: "អាគុយម៉ង់បន្ទាត់ពាក្យបញ្ជា (Command Line Arguments)",
      type: "lab", codeLanguage: "javascript",
      summary: "Command line arguments passed when launching a script (`node script.js --port 8080`) are accessible in `process.argv`. Modern Node.js provides `util.parseArgs()` to parse flags, booleans, and string values natively.",
      codeSnippet: `import { parseArgs } from "node:util";

const options = {
  port: { type: "string", short: "p", default: "5000" },
  migrate: { type: "boolean", default: false }
};

const { values } = parseArgs({ options });
console.log("Configured Port:", values.port);
console.log("Run Migration?", values.migrate);`
    }
  ],

  M03: [
    {
      id: "M03-01", number: "01",
      title: "Node.js Core Modules",
      khmerTitle: "ទិដ្ឋភាពទូទៅនៃ Core Modules",
      type: "concept", codeLanguage: "javascript",
      summary: "Core modules are compiled directly into the Node.js binary, providing low-level access to the operating system, network, cryptographic hardware, and filesystem without requiring external npm packages.",
      codeSnippet: `// Preferred modern syntax with "node:" prefix
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import crypto from "node:crypto";`
    },
    {
      id: "M03-02", number: "02",
      title: "fs Module",
      khmerTitle: "ម៉ូឌុលគ្រប់គ្រងឯកសារ fs Module",
      type: "lab", codeLanguage: "javascript",
      summary: "The `node:fs` module provides comprehensive file system APIs to create, read, update, rename, and delete files and directories, offering synchronous, callback, and promise-based interfaces.",
      codeSnippet: `import fs from "node:fs/promises";

// Write a file
await fs.writeFile("app.log", "System started successfully\\n", "utf-8");

// Append data
await fs.appendFile("app.log", "User logged in\\n");

// Read content
const content = await fs.readFile("app.log", "utf-8");
console.log(content);`
    },
    {
      id: "M03-03", number: "03",
      title: "path Module",
      khmerTitle: "ម៉ូឌុលផ្លូវឯកសារ path Module",
      type: "lab", codeLanguage: "javascript",
      summary: "The `node:path` module provides cross-platform path resolution utilities, correctly resolving path separators (`/` on macOS/Linux vs `\\` on Windows), calculating relative paths, and extracting file extensions.",
      codeSnippet: `import path from "node:path";

// Safe cross-platform path joining
const uploadPath = path.join(process.cwd(), "public", "uploads", "avatar.png");

// Extract metadata
console.log("Directory:", path.dirname(uploadPath));
console.log("Filename:", path.basename(uploadPath));
console.log("Extension:", path.extname(uploadPath));`
    },
    {
      id: "M03-04", number: "04",
      title: "os Module",
      khmerTitle: "ម៉ូឌុលព័ត៌មានប្រព័ន្ធប្រតិបត្តិការ os Module",
      type: "concept", codeLanguage: "javascript",
      summary: "The `node:os` module exposes operating system hardware metrics: CPU core count, system uptime, free/total memory, network interfaces, and host architecture, which is vital for clustering and health-check monitoring.",
      codeSnippet: `import os from "node:os";

console.log("Hostname:", os.hostname());
console.log("CPU Cores:", os.cpus().length);
console.log("Free Memory:", (os.freemem() / 1024 / 1024 / 1024).toFixed(2), "GB");
console.log("Total Memory:", (os.totalmem() / 1024 / 1024 / 1024).toFixed(2), "GB");
console.log("System Uptime:", (os.uptime() / 3600).toFixed(1), "hours");`
    },
    {
      id: "M03-05", number: "05",
      title: "url Module",
      khmerTitle: "ម៉ូឌុល URL និង SearchParams",
      type: "lab", codeLanguage: "javascript",
      summary: "The WHATWG compliant `URL` and `URLSearchParams` classes provide safe parsing, serialization, and query string manipulation for incoming HTTP request URLs and external API calls.",
      codeSnippet: `const myUrl = new URL("https://api.example.com/v1/users?role=admin&active=true");

console.log("Host:", myUrl.hostname);
console.log("Path:", myUrl.pathname);
console.log("Role param:", myUrl.searchParams.get("role"));

// Appending query parameters safely
myUrl.searchParams.append("page", "2");
console.log("Updated URL:", myUrl.toString());`
    },
    {
      id: "M03-06", number: "06",
      title: "events Module",
      khmerTitle: "ម៉ូឌុល Events",
      type: "lab", codeLanguage: "javascript",
      summary: "The `node:events` module forms the backbone of Node.js event-driven architecture. Almost all streaming and networking objects in Node (HTTP requests, server sockets, streams) inherit from EventEmitter.",
      codeSnippet: `import { EventEmitter } from "node:events";

const serverEmitter = new EventEmitter();

serverEmitter.on("user:signup", (user) => {
  console.log("Send welcome notification to:", user.email);
});

serverEmitter.emit("user:signup", { email: "sokha@gmail.com" });`
    },
    {
      id: "M03-07", number: "07",
      title: "crypto Module",
      khmerTitle: "ម៉ូឌុលគ្រីបតូហ្គ្រាហ្វ៊ី crypto Module",
      type: "lab", codeLanguage: "javascript",
      summary: "The `node:crypto` module provides production-grade cryptographic functionality: generating cryptographically secure random bytes, UUIDs, SHA-256 hashes, HMAC signatures, and asymmetric key pairs.",
      codeSnippet: `import crypto from "node:crypto";

// Generate secure random reset token (hex)
const resetToken = crypto.randomBytes(32).toString("hex");

// Generate SHA-256 hash
const hash = crypto.createHash("sha256").update(resetToken).digest("hex");

console.log("Token:", resetToken);
console.log("SHA-256 Hash:", hash);`
    },
    {
      id: "M03-08", number: "08",
      title: "stream Module",
      khmerTitle: "ម៉ូឌុល Stream សម្រាប់ទិន្នន័យធំៗ",
      type: "architecture", codeLanguage: "javascript",
      summary: "Streams process data incrementally in chunks rather than buffering entire files into RAM. This allows Node.js applications to process gigabyte-sized files, video streams, and database dumps with constant ~20MB memory usage.",
      codeSnippet: `import fs from "node:fs";
import { pipeline } from "node:stream/promises";
import zlib from "node:zlib";

// Compress a huge file using streams without loading it all in RAM
await pipeline(
  fs.createReadStream("huge-log.txt"),
  zlib.createGzip(),
  fs.createWriteStream("huge-log.txt.gz")
);
console.log("Streaming compression complete!");`
    },
    {
      id: "M03-09", number: "09",
      title: "Buffer",
      khmerTitle: "ទិន្នន័យប៊ីណារី Buffer",
      type: "concept", codeLanguage: "javascript",
      summary: "A `Buffer` represents a fixed-size chunk of raw binary memory allocated outside V8's JavaScript heap. Buffers are used when handling raw binary data like uploaded files, image buffers, and network TCP packets.",
      codeSnippet: `// Create buffer from string
const buf = Buffer.from("Node.js Backend", "utf-8");

console.log("Raw hex bytes:", buf);
console.log("Base64 representation:", buf.toString("base64"));
console.log("Decoded back to string:", buf.toString("utf-8"));`
    },
    {
      id: "M03-10", number: "10",
      title: "EventEmitter",
      khmerTitle: "ការបង្កើត Custom EventEmitter Class",
      type: "lab", codeLanguage: "javascript",
      summary: "Subclassing `EventEmitter` allows you to create enterprise service classes (e.g. PaymentService, NotificationService) that notify other parts of your application when state changes occur.",
      codeSnippet: `import { EventEmitter } from "node:events";

class PaymentGateway extends EventEmitter {
  processPayment(amount, user) {
    // Simulate transaction
    setTimeout(() => {
      this.emit("payment:success", { transactionId: "TX_1092", amount, user });
    }, 200);
  }
}

const gateway = new PaymentGateway();
gateway.on("payment:success", (tx) => console.log("Transaction verified:", tx));
gateway.processPayment(99.99, "Sokha");`
    },
    {
      id: "M03-11", number: "11",
      title: "Working with Files",
      khmerTitle: "ការគ្រប់គ្រងឯកសារក្នុង Server",
      type: "lab", codeLanguage: "javascript",
      summary: "Enterprise servers frequently verify file existence, inspect metadata (file sizes, modification times, permissions), and manage temporary directories before uploading files to cloud storage.",
      codeSnippet: `import fs from "node:fs/promises";

try {
  const stats = await fs.stat("package.json");
  console.log("Is File?", stats.isFile());
  console.log("Size in bytes:", stats.size);
  console.log("Last Modified:", stats.mtime);
} catch (err) {
  if (err.code === "ENOENT") console.log("File does not exist!");
}`
    },
    {
      id: "M03-12", number: "12",
      title: "Reading Files",
      khmerTitle: "ការអានឯកសារ (Text & JSON)",
      type: "lab", codeLanguage: "javascript",
      summary: "Reading configuration files and text assets reliably using async methods, properly handling JSON parsing and character encodings.",
      codeSnippet: `import fs from "node:fs/promises";

async function loadConfig() {
  try {
    const raw = await fs.readFile("./package.json", "utf-8");
    const pkg = JSON.parse(raw);
    console.log("Loaded package:", pkg.name, "v" + pkg.version);
  } catch (error) {
    console.error("Failed to load config:", error.message);
  }
}
loadConfig();`
    },
    {
      id: "M03-13", number: "13",
      title: "Writing Files",
      khmerTitle: "ការសរសេរ និងកែប្រែឯកសារ",
      type: "lab", codeLanguage: "javascript",
      summary: "Writing structured data (logs, exports, CSV files) safely to disk with atomic write patterns to avoid file corruption.",
      codeSnippet: `import fs from "node:fs/promises";

const userLog = { userId: "U_102", action: "LOGIN", timestamp: new Date() };

// Write formatted JSON
await fs.writeFile(
  "user-session.json",
  JSON.stringify(userLog, null, 2),
  "utf-8"
);
console.log("Session saved successfully!");`
    },
    {
      id: "M03-14", number: "14",
      title: "Working with Directories",
      khmerTitle: "ការគ្រប់គ្រង និងស្វែងរកថត Folders",
      type: "lab", codeLanguage: "javascript",
      summary: "Creating directories recursively, listing contents with file types, and cleaning up temporary folders.",
      codeSnippet: `import fs from "node:fs/promises";

// Create nested directory safely
await fs.mkdir("public/uploads/avatars", { recursive: true });

// Read directory entries with types
const entries = await fs.readdir("src", { withFileTypes: true });
for (const entry of entries) {
  console.log(entry.isDirectory() ? "📁 [DIR]" : "📄 [FILE]", entry.name);
}`
    }
  ],

  M04: [
    {
      id: "M04-01", number: "01",
      title: "Synchronous vs Asynchronous",
      khmerTitle: "ការប្រៀបធៀប Synchronous និង Asynchronous",
      type: "concept", codeLanguage: "javascript",
      summary: "Synchronous code executes line-by-line, blocking execution until the current operation completes. Asynchronous code registers operations with the underlying runtime and continues immediately, processing the result via callbacks, Promises, or async/await when ready.",
      codeSnippet: `// Synchronous (BLOCKS the thread for 2 seconds):
// const data = fs.readFileSync("heavy-file.bin"); // Server is frozen!

// Asynchronous (NON-BLOCKING):
fs.readFile("heavy-file.bin", (err, data) => {
  console.log("Data loaded without freezing the server!");
});
console.log("Server immediately keeps handling other clients!");`
    },
    {
      id: "M04-02", number: "02",
      title: "Callbacks",
      khmerTitle: "មូលដ្ឋានគ្រឹះ Callbacks ក្នុង Node.js",
      type: "concept", codeLanguage: "javascript",
      summary: "A callback is a function passed as an argument to an asynchronous function, invoked when the background task completes. Traditional Node.js APIs follow the error-first callback convention `(err, result) => {}`.",
      codeSnippet: `import fs from "node:fs";

// Node.js Error-First Callback pattern:
fs.readFile("config.json", "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err.message);
    return;
  }
  console.log("File content:", data);
});`
    },
    {
      id: "M04-03", number: "03",
      title: "Callback Problems",
      khmerTitle: "បញ្ហា Callback Hell និង Inversion of Control",
      type: "concept", codeLanguage: "javascript",
      summary: "Nesting multiple sequential asynchronous callbacks leads to the 'Pyramid of Doom' (Callback Hell), making code unreadable, difficult to trace, and prone to unhandled errors.",
      codeSnippet: `// The "Pyramid of Doom" (Anti-pattern):
getUser(userId, (err, user) => {
  if (err) return handleErr(err);
  getOrders(user.id, (err, orders) => {
    if (err) return handleErr(err);
    getInvoice(orders[0].id, (err, invoice) => {
      if (err) return handleErr(err);
      sendEmail(user.email, invoice, (err) => {
        // Deeply nested, unmaintainable code!
      });
    });
  });
});`
    },
    {
      id: "M04-04", number: "04",
      title: "Promises",
      khmerTitle: "ស្ថាបត្យកម្ម Promises (Pending, Fulfilled, Rejected)",
      type: "lab", codeLanguage: "javascript",
      summary: "A Promise represents the eventual completion or failure of an asynchronous operation and its resulting value. Promises have three mutually exclusive states: pending, fulfilled, or rejected.",
      codeSnippet: `const verifyStock = (productId, quantity) => {
  return new Promise((resolve, reject) => {
    if (quantity <= 5) {
      resolve({ available: true, productId });
    } else {
      reject(new Error("Insufficient warehouse stock"));
    }
  });
};

verifyStock("P_99", 2)
  .then(res => console.log("Stock confirmed:", res))
  .catch(err => console.error("Order failed:", err.message));`
    },
    {
      id: "M04-05", number: "05",
      title: "async / await",
      khmerTitle: "ការប្រើប្រាស់ async / await ទំនើប",
      type: "lab", codeLanguage: "javascript",
      summary: "Syntactic sugar over Promises that allows asynchronous code to be read and structured synchronously. Async functions always return a Promise, and `await` pauses execution until the Promise settles.",
      codeSnippet: `async function fetchDashboardData(userId) {
  try {
    // Run both queries concurrently!
    const [user, orders] = await Promise.all([
      db.users.findById(userId),
      db.orders.find({ userId })
    ]);
    return { user, orders };
  } catch (error) {
    console.error("Dashboard query failed:", error);
    throw error;
  }
}`
    },
    {
      id: "M04-06", number: "06",
      title: "Error Handling",
      khmerTitle: "ការគ្រប់គ្រងកំហុស Asynchronous Error Handling",
      type: "lab", codeLanguage: "javascript",
      summary: "Handling errors in asynchronous code using `try/catch` blocks and catching unhandled rejections prevents server crashes.",
      codeSnippet: `process.on("unhandledRejection", (reason, promise) => {
  console.error("CRITICAL: Unhandled Promise Rejection at:", promise, "reason:", reason);
  // Gracefully log and restart process
});

// Always wrap async route logic in try/catch or async wrapper
async function handler(req, res, next) {
  try {
    const result = await riskyOperation();
    res.json(result);
  } catch (err) {
    next(err); // Hand off to central error middleware
  }
}`
    },
    {
      id: "M04-07", number: "07",
      title: "Event Loop",
      khmerTitle: "ដំណើរការ Event Loop របស់ Node.js",
      type: "architecture", codeLanguage: "javascript",
      summary: "The libuv Event Loop is the heart of Node.js. It continuously coordinates execution between JavaScript code and the operating system across distinct phases: Timers, Pending Callbacks, Poll, Check (setImmediate), and Close Callbacks.",
      codeSnippet: `/* Libuv Event Loop Phases:
   ┌───────────────────────────┐
   │          Timers           │ (setTimeout, setInterval)
   └─────────────┬─────────────┘
   ┌─────────────┴─────────────┐
   │     Pending Callbacks     │ (I/O callbacks deferred)
   └─────────────┬─────────────┘
   ┌─────────────┴─────────────┐
   │           Poll            │ (Retrieve new I/O events; execute I/O)
   └─────────────┬─────────────┘
   ┌─────────────┴─────────────┐
   │           Check           │ (setImmediate callbacks)
   └─────────────┬─────────────┘
   ┌─────────────┴─────────────┐
   │      Close Callbacks      │ (socket.on('close'))
   └───────────────────────────┘
*/`
    },
    {
      id: "M04-08", number: "08",
      title: "Event Queue",
      khmerTitle: "ជួរការងារ Event Queue និង Task Queues",
      type: "architecture", codeLanguage: "javascript",
      summary: "Asynchronous tasks place their callbacks onto task queues when I/O completes. The event loop pulls callbacks from these queues and executes them whenever the call stack is empty.",
      codeSnippet: `console.log("A: Stack execution");

setTimeout(() => {
  console.log("C: Task queue callback executed");
}, 0);

console.log("B: Stack execution continues");
// Output order: A -> B -> C`
    },
    {
      id: "M04-09", number: "09",
      title: "Microtasks",
      khmerTitle: "ជួរការងារ Microtasks (process.nextTick & Promises)",
      type: "lab", codeLanguage: "javascript",
      summary: "Microtask queues (`process.nextTick` and resolved Promise callbacks) have higher priority than the Event Loop macro-tasks (timers, I/O). Microtasks are drained completely before the Event Loop transitions between phases.",
      codeSnippet: `console.log("1. Synchronous");

setTimeout(() => console.log("4. Macrotask (setTimeout)"), 0);

Promise.resolve().then(() => console.log("3. Microtask (Promise)"));

process.nextTick(() => console.log("2. NextTick Microtask"));

// Execution order: 1 -> 2 -> 3 -> 4`
    },
    {
      id: "M04-10", number: "10",
      title: "Timers",
      khmerTitle: "ការប្រើប្រាស់ Timers (setTimeout, setInterval, setImmediate)",
      type: "lab", codeLanguage: "javascript",
      summary: "Node.js provides `setTimeout`, `setInterval`, and `setImmediate`. While `setTimeout(fn, 0)` is checked in the Timers phase, `setImmediate(fn)` runs in the Check phase immediately after I/O polling.",
      codeSnippet: `import fs from "node:fs";

fs.readFile("package.json", () => {
  // Inside I/O cycle: setImmediate ALWAYS fires first!
  setTimeout(() => console.log("Timer phase: setTimeout"), 0);
  setImmediate(() => console.log("Check phase: setImmediate"));
});`
    },
    {
      id: "M04-11", number: "11",
      title: "Non-blocking Operations",
      khmerTitle: "ការធានាប្រតិបត្តិការមិនរាំងស្ទះ",
      type: "lab", codeLanguage: "javascript",
      summary: "Strategies to prevent blocking the event loop: breaking massive CPU calculations into chunks with `setImmediate`, using Worker Threads for heavy computational math, and strictly using asynchronous database and file drivers.",
      codeSnippet: `// Chunking a large array calculation across Event Loop ticks
function processLargeArrayInChunks(items, batchSize = 1000) {
  let index = 0;
  function processChunk() {
    const end = Math.min(index + batchSize, items.length);
    for (; index < end; index++) {
      // Process item
    }
    if (index < items.length) {
      setImmediate(processChunk); // Yield control back to Event Loop!
    }
  }
  processChunk();
}`
    },
    {
      id: "M04-12", number: "12",
      title: "Async Best Practices",
      khmerTitle: "ការអនុវត្តល្អបំផុតសម្រាប់ Async Node.js",
      type: "concept", codeLanguage: "javascript",
      summary: "Essential rules for writing scalable async code: never mix callbacks and promises, always return or await promises, configure timeouts for all external HTTP requests, and avoid creating floating unhandled promises.",
      codeSnippet: `// Using AbortController for timeout protection on external fetch
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout

try {
  const response = await fetch("https://api.partner.com/data", {
    signal: controller.signal
  });
  const data = await response.json();
} catch (err) {
  if (err.name === "AbortError") {
    console.error("Request timed out after 3000ms!");
  }
} finally {
  clearTimeout(timeoutId);
}`
    }
  ],

  M05: [
    {
      id: "M05-01", number: "01",
      title: "HTTP Fundamentals",
      khmerTitle: "មូលដ្ឋានគ្រឹះពិធីការ HTTP និងដំណើរការ Request-Response",
      type: "concept", codeLanguage: "javascript",
      summary: "Hypertext Transfer Protocol (HTTP) is the stateless, application-layer protocol powering the World Wide Web. Clients send request packets containing a method, path, headers, and optional body; servers evaluate the request and return an HTTP status code, response headers, and payload.",
      codeSnippet: `/* Anatomy of an HTTP Request / Response:
   CLIENT REQUEST:
   POST /api/v1/orders HTTP/1.1
   Host: api.store.com
   Content-Type: application/json
   Authorization: Bearer eyJhbGci...
   {"item": "Keyboard", "qty": 1}

   SERVER RESPONSE:
   HTTP/1.1 201 Created
   Content-Type: application/json
   {"success": true, "orderId": "ORD-55"}
*/`
    },
    {
      id: "M05-02", number: "02",
      title: "HTTP Request",
      khmerTitle: "រចនាសម្ព័ន្ធនៃ HTTP Request (req)",
      type: "concept", codeLanguage: "javascript",
      summary: "An HTTP request consists of an HTTP verb (GET, POST, etc.), a target URL path, headers providing metadata (content types, client user-agents, auth tokens), query string parameters, and an optional payload body.",
      codeSnippet: `import http from "node:http";

const server = http.createServer((req, res) => {
  console.log("Method:", req.method);
  console.log("URL Path:", req.url);
  console.log("User-Agent:", req.headers["user-agent"]);
  res.end("Request logged");
});`
    },
    {
      id: "M05-03", number: "03",
      title: "HTTP Response",
      khmerTitle: "រចនាសម្ព័ន្ធនៃ HTTP Response (res)",
      type: "concept", codeLanguage: "javascript",
      summary: "An HTTP response communicates the status of the requested operation to the client via a 3-digit status code, status message, response headers (defining content encoding, caching policies, security rules), and response data.",
      codeSnippet: `import http from "node:http";

const server = http.createServer((req, res) => {
  // Set status code and headers
  res.writeHead(200, {
    "Content-Type": "application/json",
    "X-Powered-By": "Node.js Native"
  });
  // Send body and finalize response
  res.end(JSON.stringify({ status: "online", timestamp: Date.now() }));
});`
    },
    {
      id: "M05-04", number: "04",
      title: "HTTP Methods",
      khmerTitle: "កិរិយាស័ព្ទ HTTP (GET, POST, PUT, PATCH, DELETE)",
      type: "concept", codeLanguage: "javascript",
      summary: "HTTP methods communicate semantic intent: GET reads resources without side-effects, POST creates new resources, PUT replaces an entire resource, PATCH applies partial updates, and DELETE removes a resource.",
      codeSnippet: `/* HTTP Methods Semantic Mapping:
   GET    /api/users      -> Retrieve users (Safe, Idempotent)
   POST   /api/users      -> Create user (Non-idempotent)
   PUT    /api/users/1    -> Replace user completely (Idempotent)
   PATCH  /api/users/1    -> Update specific fields (e.g. name only)
   DELETE /api/users/1    -> Remove user (Idempotent)
*/`
    },
    {
      id: "M05-05", number: "05",
      title: "HTTP Headers",
      khmerTitle: "សារៈសំខាន់នៃ HTTP Headers",
      type: "concept", codeLanguage: "javascript",
      summary: "HTTP headers allow clients and servers to exchange control metadata: content negotiation (`Accept`, `Content-Type`), authentication (`Authorization`), caching (`Cache-Control`, `ETag`), and security policies (`CORS`, `CSP`).",
      codeSnippet: `// Reading Authorization header safely
const authHeader = req.headers["authorization"]; // e.g. "Bearer eyJhb..."

if (!authHeader || !authHeader.startsWith("Bearer ")) {
  res.writeHead(401, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Missing or invalid Bearer token" }));
}`
    },
    {
      id: "M05-06", number: "06",
      title: "HTTP Status Codes",
      khmerTitle: "លេខកូដស្ថានភាព HTTP Status Codes",
      type: "concept", codeLanguage: "javascript",
      summary: "HTTP status codes communicate the outcome of a request: 2xx indicates Success (200 OK, 201 Created, 204 No Content), 3xx Redirection (301, 304), 4xx Client Errors (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable Entity), and 5xx Server Errors (500 Internal Error, 503 Unavailable).",
      codeSnippet: `/* Standard HTTP Status Code Ranges:
   200 OK           -> Standard successful response
   201 Created      -> Resource successfully created (POST)
   204 No Content   -> Successful action with no response body (DELETE)
   400 Bad Request  -> Invalid client syntax or schema
   401 Unauthorized -> Client must authenticate
   403 Forbidden    -> Authenticated, but lacks required role/permission
   404 Not Found    -> Resource does not exist
   500 Server Error -> Unhandled server exception
*/`
    },
    {
      id: "M05-07", number: "07",
      title: "URL",
      khmerTitle: "រចនាសម្ព័ន្ធ URL (Protocol, Host, Port, Path, Query)",
      type: "concept", codeLanguage: "javascript",
      summary: "Uniform Resource Locators (URLs) uniquely identify network resources. A complete URL includes protocol (`https://`), domain host (`api.store.com`), optional port (`:443`), resource path (`/v1/products`), and query parameters (`?sort=desc`).",
      codeSnippet: `import http from "node:http";

http.createServer((req, res) => {
  const parsed = new URL(req.url, \`http://\${req.headers.host}\`);
  console.log("Pathname:", parsed.pathname); // e.g. /api/products
  console.log("Search query:", parsed.search); // e.g. ?page=2
  res.end("Parsed");
});`
    },
    {
      id: "M05-08", number: "08",
      title: "Query Parameters",
      khmerTitle: "ការប្រើប្រាស់ Query Parameters សម្រាប់ Filter & Sort",
      type: "lab", codeLanguage: "javascript",
      summary: "Query parameters appear after the `?` delimiter in a URL (`/products?category=shoes&limit=10`). They are used for non-hierarchical options such as filtering, searching, sorting, and pagination.",
      codeSnippet: `const url = new URL("https://api.com/items?category=books&minPrice=15&inStock=true");

const category = url.searchParams.get("category"); // "books"
const minPrice = Number(url.searchParams.get("minPrice")); // 15
const inStock = url.searchParams.get("inStock") === "true"; // true

console.log({ category, minPrice, inStock });`
    },
    {
      id: "M05-09", number: "09",
      title: "Route Parameters",
      khmerTitle: "ការប្រើប្រាស់ Route Parameters សម្រាប់កំណត់អត្តសញ្ញាណ",
      type: "concept", codeLanguage: "javascript",
      summary: "Route parameters (e.g. `/users/:id` or `/orders/:orderId`) capture dynamic segments directly from the URL path, identifying specific unique resources.",
      codeSnippet: `/* Resource URL Strategy:
   Route Parameter (Specific Resource ID):
   GET /api/v1/orders/ORD-9821
   
   Query Parameter (Filter / Search Criteria):
   GET /api/v1/orders?status=shipped&limit=20
*/`
    },
    {
      id: "M05-10", number: "10",
      title: "Request Body",
      khmerTitle: "ការទទួលទិន្នន័យ Request Body តាមរយៈ Streams",
      type: "lab", codeLanguage: "javascript",
      summary: "HTTP POST, PUT, and PATCH requests transmit payloads in the request body. In native Node.js, the request object is an event-driven stream that emits `'data'` buffer chunks until the `'end'` event fires.",
      codeSnippet: `import http from "node:http";

http.createServer((req, res) => {
  if (req.method === "POST") {
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString(); // Collect stream chunks
    });
    req.on("end", () => {
      console.log("Complete Body received:", body);
      res.end("Body parsed successfully");
    });
  }
});`
    },
    {
      id: "M05-11", number: "11",
      title: "JSON",
      khmerTitle: "ទម្រង់ទិន្នន័យ JSON ក្នុង Web APIs",
      type: "concept", codeLanguage: "javascript",
      summary: "JavaScript Object Notation (JSON) is the universal, language-agnostic data interchange format used by modern RESTful APIs. Node.js natively parses and stringifies JSON with `JSON.parse()` and `JSON.stringify()`.",
      codeSnippet: `function parseJsonSafely(rawJson) {
  try {
    return { data: JSON.parse(rawJson), error: null };
  } catch (err) {
    return { data: null, error: "Invalid JSON format" };
  }
}`
    },
    {
      id: "M05-12", number: "12",
      title: "Content-Type",
      khmerTitle: "សារៈសំខាន់នៃ Header Content-Type",
      type: "concept", codeLanguage: "javascript",
      summary: "The `Content-Type` header informs the recipient how to interpret the binary bytes in the request or response body (e.g. `application/json`, `text/html`, `multipart/form-data`, `application/pdf`).",
      codeSnippet: `// Sending JSON
res.writeHead(200, { "Content-Type": "application/json" });
res.end(JSON.stringify({ success: true }));

// Sending HTML
// res.writeHead(200, { "Content-Type": "text/html" });
// res.end("<h1>Welcome to API</h1>");`
    },
    {
      id: "M05-13", number: "13",
      title: "Creating an HTTP Server",
      khmerTitle: "ការបង្កើត HTTP Server តាមរយៈ Native 'node:http'",
      type: "lab", codeLanguage: "javascript",
      summary: "Node's built-in `node:http` module provides `createServer()`, allowing you to instantiate a listening TCP server that dispatches incoming connections to request handler callbacks.",
      codeSnippet: `import http from "node:http";

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Hello from native Node.js HTTP server!" }));
});

server.listen(PORT, () => {
  console.log(\`Server running at http://localhost:\${PORT}\`);
});`
    },
    {
      id: "M05-14", number: "14",
      title: "Handling Requests",
      khmerTitle: "ការគ្រប់គ្រងផ្លូវ Requests (Basic Routing)",
      type: "lab", codeLanguage: "javascript",
      summary: "Routing incoming requests in raw HTTP requires evaluating `req.url` and `req.method` conditionals to route traffic to appropriate logic blocks, highlighting why frameworks like Express were developed.",
      codeSnippet: `import http from "node:http";

const server = http.createServer((req, res) => {
  const { pathname } = new URL(req.url, \`http://\${req.headers.host}\`);

  if (req.method === "GET" && pathname === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "API Home" }));
  }

  if (req.method === "GET" && pathname === "/api/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ healthy: true, uptime: process.uptime() }));
  }

  // 404 Fallback
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route Not Found" }));
});`
    },
    {
      id: "M05-15", number: "15",
      title: "Sending Responses",
      khmerTitle: "ការបញ្ជូនទិន្នន័យត្រឡប់ទៅកាន់ Client",
      type: "lab", codeLanguage: "javascript",
      summary: "Finalizing and sending responses to clients involves writing status codes, headers, and serializing the body before closing the stream with `res.end()`.",
      codeSnippet: `import http from "node:http";

const server = http.createServer((req, res) => {
  try {
    const payload = { data: [1, 2, 3], timestamp: new Date() };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(payload));
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
});`
    }
  ]
};
