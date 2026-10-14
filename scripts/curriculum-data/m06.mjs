/**
 * m06.mjs - Module 06: Express.js Fundamentals (14 topics)
 * Domain: Course Catalog API (Introducing the Foundation)
 */

export const M06 = [
  {
    id: "M06-01",
    number: "01",
    title: "What is Express.js?",
    khmerTitle: "អ្វីជា Express.js និងមូលដ្ឋានគ្រឹះ Web Framework",
    type: "concept",
    codeLanguage: "javascript",
    summary: `**Express.js** គឺជា Fast, Unopinionated, និង Minimalist Web Framework ស្តង់ដារសម្រាប់ Node.js។

Express ដើរតួជា Abstraction Layer ដ៏មានឥទ្ធិពលលើ Native \`node:http\` module ដោយផ្តល់ជូននូវ៖
* **Robust Routing System**៖ ងាយស្រួល Map HTTP Methods (GET, POST, etc.) ទៅកាន់ URL Endpoints
* **Middleware Pipeline Architecture**៖ ស្ទាក់ចាប់ និងដំណើរការ Requests ជាដំណាក់កាលៗ
* **Streamlined HTTP Helpers**៖ មុខងារជំនួយដូចជា \`res.json()\`, \`req.body\`, និង \`res.status()\`

នៅក្នុង Course នេះ យើងនឹងអភិវឌ្ឍ **Course Catalog API** មួយដែលចាប់ផ្តើមពី Server ដំបូង រហូតដល់ Enterprise Architecture។`,
    codeSnippet: `// Step 1: Import Express framework
import express from "express";

// Step 2: Initialize Express application instance
const app = express();
const PORT = process.env.PORT || 5000;

// Step 3: Define Root Route for Course Catalog API
app.get("/", (req, res) => {
  // 💡 Teaching Note: res.json() automatically sets Content-Type: application/json
  res.json({
    message: "Welcome to Course Catalog API!",
    version: "1.0.0",
    status: "healthy"
  });
});

// Step 4: Start the HTTP server listener
app.listen(PORT, () => {
  console.log(\`🚀 Server is running on http://localhost:\${PORT}\`);
});`,
  },
  {
    id: "M06-02",
    number: "02",
    title: "Why Express.js?",
    khmerTitle: "ហេតុអ្វីត្រូវជ្រើសរើស Express.js ជំនួស Native HTTP?",
    type: "concept",
    codeLanguage: "javascript",
    summary: `ការប្រៀបធៀបរវាង **Native node:http** និង **Express.js**៖

* **Native node:http**៖ តម្រូវឱ្យសរសេរ Boilerplate Code រាប់សិបជួរ — ត្រូវ Parse URL ដោយដៃ, Buffer Body chunks ដោយដៃ, Check Methods ដោយ \`if/else\`, និងកំណត់ Headers ដោយផ្ទាល់។
* **Express.js**៖ កាត់បន្ថយ Boilerplate ទាំងស្រុងត្រឹម ២-៣ ជួរខ្លី និងផ្តល់ Ecosystem នៃ Middlewares ធំទូលាយ (CORS, Morgan, Helmet)។

Express គឺជាមូលដ្ឋានគ្រឹះ (De facto Standard) នៃ Node.js Backend អស់រយៈពេលជាងមួយទសវត្សរ៍។`,
    codeSnippet: `// ❌ NATIVE NODE.JS HTTP (Lots of boilerplate)
// let body = "";
// req.on("data", chunk => body += chunk);
// req.on("end", () => {
//   const parsed = JSON.parse(body);
//   res.writeHead(201, { "Content-Type": "application/json" });
//   res.end(JSON.stringify(parsed));
// });

// ✅ EXPRESS.JS (Clean, declarative, and easy to explain!)
import express from "express";
const app = express();

// Step 1: Enable built-in JSON body parser
app.use(express.json());

// Step 2: Directly access parsed body via req.body
app.post("/api/v1/courses", (req, res) => {
  // 💡 Teaching Note: req.body is already a JavaScript object ready to use!
  res.status(201).json({ success: true, course: req.body });
});`,
  },
  {
    id: "M06-03",
    number: "03",
    title: "Installing Express",
    khmerTitle: "ការបង្កើត Project និងដំឡើង Express ជាមួយ ES Modules",
    type: "lab",
    codeLanguage: "bash",
    summary: `ការចាប់ផ្តើមគម្រោង Express ថ្មីដោយប្រើប្រាស់ **ES Modules** (\`import/export\`) ទំនើប៖

1. **Initialize Project**៖ បង្កើត \`package.json\` តាមរយៈ \`npm init -y\`
2. **Install Express**៖ ដំឡើងកញ្ចប់ \`express\`
3. **Configure ESM**៖ បន្ថែម \`"type": "module"\` ក្នុង \`package.json\`
4. **Dev Script**៖ ប្រើ \`node --watch\` ដើម្បី Auto-restart Server រាល់ពេលកែប្រែកូដ`,
    codeSnippet: `# Step 1: Initialize project
mkdir course-catalog-api && cd course-catalog-api
npm init -y

# Step 2: Install Express package
npm install express

# Step 3: Configure package.json for ES Modules
npm pkg set type="module"
npm pkg set scripts.dev="node --watch src/server.js"

# Step 4: Run the development server
npm run dev`,
  },
  {
    id: "M06-04",
    number: "04",
    title: "Express Application",
    khmerTitle: "ការបង្កើត Application Instance ក្នុង src/app.js",
    type: "concept",
    codeLanguage: "javascript",
    summary: `នៅក្នុង Professional Software Engineering យើងមិនគួរបញ្ចូល Server Port Binding និង Route Configuration ក្នុងឯកសារតែមួយឡើយ។

* **src/app.js**៖ បង្កើត \`express()\` instance, កំណត់ Global Middlewares, Bind Routes, និង Export \`app\`។
* **src/server.js**៖ Import \`app\` និងដំណើរការ \`app.listen(PORT)\`។

ការបំបែកបែបនេះអនុញ្ញាតឱ្យយើងសរសេរ **Automated Integration Tests (Supertest)** ដោយមិនចាំបាច់កាន់កាប់ Network Port ពិតប្រាកដ។`,
    codeSnippet: `// src/app.js
import express from "express";

// Step 1: Instantiate Express application
const app = express();

// Step 2: Security & Configuration
app.disable("x-powered-by"); // 💡 Teaching Note: Security best practice

// Step 3: Register global middleware
app.use(express.json());

// Step 4: Base Health-check Route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "UP", timestamp: new Date().toISOString() });
});

// Step 5: Export app (ready for server.js & unit tests)
export default app;`,
  },
  {
    id: "M06-05",
    number: "05",
    title: "Starting a Server",
    khmerTitle: "ការដំណើរការ Server ក្នុង src/server.js និង Graceful Shutdown",
    type: "lab",
    codeLanguage: "javascript",
    summary: `ឯកសារ **src/server.js** ទទួលខុសត្រូវលើ Network Layer៖

1. **Port Binding**៖ អាន Port ពី \`process.env.PORT\` ជាមួយ Fallback \`5000\`
2. **Listener Activation**៖ ហៅ \`app.listen()\`
3. **Graceful Shutdown**៖ ចាប់សញ្ញា \`SIGTERM\` និង \`SIGINT\` ដើម្បីបិទ Connections ដោយសុវត្ថិភាពនៅពេល Deploy លើ Docker/Kubernetes`,
    codeSnippet: `// src/server.js
import app from "./app.js";

// Step 1: Environment-driven port configuration
const PORT = process.env.PORT || 5000;

// Step 2: Start listening for incoming connections
const server = app.listen(PORT, () => {
  console.log(\`🚀 Course API Server listening on http://localhost:\${PORT}\`);
});

// Step 3: Graceful Shutdown handling (Production Grade)
const shutdown = (signal) => {
  console.log(\`Received \${signal}. Closing HTTP server gracefully...\`);
  server.close(() => {
    console.log("HTTP server closed. Exiting process.");
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));`,
  },
  {
    id: "M06-06",
    number: "06",
    title: "Request Object (req)",
    khmerTitle: "ការស្វែងយល់ពី Request Object (req) និង Properties សំខាន់ៗ",
    type: "concept",
    codeLanguage: "javascript",
    summary: `**Request Object (\`req\`)** តំណាងឱ្យ HTTP Request ដែល Client បញ្ជូនមក Server។ Express បានពង្រីក Native Node Request ដោយផ្តល់នូវ Properties សំខាន់ៗចំនួន ៥៖

1. **\`req.params\`**៖ Dynamic URL segments (ឧ. \`/courses/:id\`)
2. **\`req.query\`**៖ Query String Parameters (ឧ. \`?level=beginner&limit=10\`)
3. **\`req.body\`**៖ JSON Payload ដែល Client ផ្ញើមកក្នុង POST/PUT/PATCH
4. **\`req.headers\`** / **\`req.get('Header-Name')\`**៖ HTTP Request Headers
5. **\`req.ip\`**៖ IP Address របស់ Client`,
    codeSnippet: `import express from "express";
const app = express();
app.use(express.json());

// Step 1: Inspect all parts of an incoming Course Request
app.post("/api/v1/courses/:id", (req, res) => {
  // 💡 Teaching Note: Walk students through each req property
  console.log("1. Route Parameter (id):", req.params.id);
  console.log("2. Query Parameter (filter):", req.query.includeReviews);
  console.log("3. Request Body (payload):", req.body);
  console.log("4. Authorization Header:", req.get("Authorization"));
  console.log("5. Client IP Address:", req.ip);

  // Step 2: Send acknowledgement response
  res.status(200).json({
    success: true,
    message: "Request analyzed successfully",
    receivedId: req.params.id
  });
});`,
  },
  {
    id: "M06-07",
    number: "07",
    title: "Response Object (res)",
    khmerTitle: "ការស្វែងយល់ពី Response Object (res) និង Helper Methods",
    type: "concept",
    codeLanguage: "javascript",
    summary: `**Response Object (\`res\`)** គ្រប់គ្រងការបញ្ជូនទិន្នន័យត្រឡប់ទៅកាន់ Client វិញ។

Methods សំខាន់ៗដែលត្រូវប្រើជាប្រចាំ៖
* **\`res.status(code)\`**៖ កំណត់ HTTP Status Code (អាចសរសេរ Chaining បាន)
* **\`res.json(data)\`**៖ បំប្លែងទិន្នន័យទៅជា JSON String និងកំណត់ Content-Type ដោយស្វ័យប្រវត្តិ
* **\`res.send(data)\`**៖ ផ្ញើ Text, HTML, ឬ Buffer
* **\`res.set(header, value)\`**៖ កំណត់ Custom Response Header
* **\`res.sendStatus(code)\`**៖ ផ្ញើតែ Status Code ជាមួយ Status Text ស្តង់ដារ`,
    codeSnippet: `import express from "express";
const app = express();

app.get("/api/v1/courses/latest", (req, res) => {
  // Step 1: Set Custom Response Headers
  res.set("X-API-Version", "1.0.0");
  res.set("Cache-Control", "public, max-age=3600");

  // Step 2: Return formatted Course data
  const sampleCourse = {
    id: "c-101",
    title: "Mastering Node.js & Express",
    price: 49.99,
    published: true
  };

  // 💡 Teaching Note: Method Chaining res.status().json()
  // ⚠️ Always return if followed by other logic!
  return res.status(200).json({
    success: true,
    data: sampleCourse
  });
});`,
  },
  {
    id: "M06-08",
    number: "08",
    title: "Middleware Concept",
    khmerTitle: "ទស្សនទាន Middleware ក្នុង Express និង Request Pipeline",
    type: "concept",
    codeLanguage: "javascript",
    summary: `**Middleware** គឺជាអនុគមន៍ដែលអង្គុយនៅចន្លោះ Incoming Request និង Route Handler ចុងក្រោយ។

Middleware នីមួយៗទទួលបាន Parameters ចំនួន ៣៖ \`(req, res, next)\`
* វាអាចពិនិត្យ ឬកែប្រែ \`req\` និង \`res\`
* វាអាចបញ្ចប់ Request ភ្លាមៗ (ឧ. បើ Unauthorized)
* ឬហៅ \`next()\` ដើម្បីបញ្ជូនបន្តទៅកាន់ Middleware បន្ទាប់ក្នុង Pipeline`,
    codeSnippet: `import express from "express";
const app = express();

// Step 1: Define a Request Timer Middleware
const requestTimer = (req, res, next) => {
  const startTime = Date.now();

  // 💡 Teaching Note: Attach custom property to req object
  req.receivedAt = new Date().toISOString();

  // Listen to response finish event to calculate elapsed time
  res.on("finish", () => {
    const duration = Date.now() - startTime;
    console.log(\`[\${req.method}] \${req.originalUrl} - \${res.statusCode} (\${duration}ms)\`);
  });

  // Step 2: Pass control to the next handler!
  next();
};

// Step 3: Register middleware globally
app.use(requestTimer);

app.get("/api/v1/ping", (req, res) => {
  res.json({ message: "pong", receivedAt: req.receivedAt });
});`,
  },
  {
    id: "M06-09",
    number: "09",
    title: "Routing Fundamentals",
    khmerTitle: "មូលដ្ឋានគ្រឹះនៃការរៀបចំ Routing ក្នុង Express",
    type: "concept",
    codeLanguage: "javascript",
    summary: `**Routing** គឺជាយន្តការកំណត់ថាតើ Application ត្រូវឆ្លើយតបយ៉ាងដូចម្តេចចំពោះ Client Request ទៅកាន់ Endpoint ជាក់លាក់មួយ (URI Path + HTTP Method)។

ទម្រង់ទូទៅ៖ \`app.METHOD(PATH, HANDLER)\`
* \`app.get("/api/v1/courses", handler)\` សម្រាប់ទាញយកទិន្នន័យ
* \`app.post("/api/v1/courses", handler)\` សម្រាប់បង្កើតទិន្នន័យថ្មី
* \`app.delete("/api/v1/courses/:id", handler)\` សម្រាប់លុបទិន្នន័យ`,
    codeSnippet: `import express from "express";
const app = express();
app.use(express.json());

// In-memory data store for teaching
const courses = [
  { id: 1, title: "Node.js Basics", price: 29 },
  { id: 2, title: "Express Deep Dive", price: 39 }
];

// Step 1: GET all courses
app.get("/api/v1/courses", (req, res) => {
  res.status(200).json({ success: true, count: courses.length, data: courses });
});

// Step 2: POST a new course
app.post("/api/v1/courses", (req, res) => {
  const newCourse = { id: courses.length + 1, ...req.body };
  courses.push(newCourse);
  res.status(201).json({ success: true, data: newCourse });
});`,
  },
  {
    id: "M06-10",
    number: "10",
    title: "Route Handlers & Callback Chains",
    khmerTitle: "ការសរសេរ Route Handlers ជាមួយ Callbacks ច្រើន",
    type: "lab",
    codeLanguage: "javascript",
    summary: `Route មួយក្នុង Express អាចទទួល Handlers ឬ Callbacks ច្រើនបន្តបន្ទាប់គ្នា (Chained Callbacks)។

លំនាំនេះមានសារៈសំខាន់ខ្លាំងក្នុងការបំបែកកូដ៖
1. **Handler ទី ១ (Validator)**៖ ផ្ទៀងផ្ទាត់ទិន្នន័យបញ្ចូល
2. **Handler ទី ២ (Business Logic)**៖ អនុវត្តការងារ និងបញ្ជូន Response ត្រឡប់ទៅវិញ`,
    codeSnippet: `import express from "express";
const app = express();
app.use(express.json());

// Step 1: Middleware Callback for validation
const validateCoursePayload = (req, res, next) => {
  const { title, price } = req.body;
  if (!title || typeof price !== "number") {
    // ⚠️ Validation failed -> Stop request immediately!
    return res.status(400).json({
      success: false,
      error: "Title (string) and Price (number) are required"
    });
  }
  next(); // Payload valid -> Proceed!
};

// Step 2: Main Route Handler Callback
const createCourseHandler = (req, res) => {
  const created = { id: Date.now(), ...req.body };
  res.status(201).json({ success: true, data: created });
};

// Step 3: Chain callbacks together on the route
app.post("/api/v1/courses", validateCoursePayload, createCourseHandler);`,
  },
  {
    id: "M06-11",
    number: "11",
    title: "HTTP Methods in Express",
    khmerTitle: "ការប្រើប្រាស់ HTTP Methods (GET, POST, PUT, PATCH, DELETE)",
    type: "concept",
    codeLanguage: "javascript",
    summary: `HTTP Methods កំណត់នូវសកម្មភាព (Intent) របស់ Client លើ Resource៖

* **GET**៖ អានទិន្នន័យ (Safe & Idempotent)
* **POST**៖ បង្កើត Resource ថ្មី
* **PUT**៖ ជំនួស Resource ចាស់ទាំងស្រុង (Full Replace)
* **PATCH**៖ កែប្រែតែ Properties មួយចំនួន (Partial Update)
* **DELETE**៖ លុប Resource ចេញ`,
    codeSnippet: `import express from "express";
const app = express();
app.use(express.json());

// 💡 Teaching Note: Complete CRUD mapping on Course Resource
app.get("/api/v1/courses", (req, res) => res.json({ action: "GET all courses" }));
app.get("/api/v1/courses/:id", (req, res) => res.json({ action: \`GET course \${req.params.id}\` }));
app.post("/api/v1/courses", (req, res) => res.status(201).json({ action: "CREATE course" }));
app.put("/api/v1/courses/:id", (req, res) => res.json({ action: \`REPLACE course \${req.params.id}\` }));
app.patch("/api/v1/courses/:id", (req, res) => res.json({ action: \`UPDATE course \${req.params.id}\` }));
app.delete("/api/v1/courses/:id", (req, res) => res.status(204).send());`,
  },
  {
    id: "M06-12",
    number: "12",
    title: "JSON Responses",
    khmerTitle: "ការបញ្ជូនទិន្នន័យ JSON តាមរយៈ res.json()",
    type: "lab",
    codeLanguage: "javascript",
    summary: `ក្នុង RESTful API ទំនើប ទម្រង់ឆ្លើយតបស្តង់ដារគឺ **JSON (JavaScript Object Notation)**។

\`res.json()\` ផ្តល់នូវអត្ថប្រយោជន៍ធំៗ ៣៖
1. កំណត់ Header \`Content-Type: application/json; charset=utf-8\`
2. បំប្លែង JavaScript Object/Array ទៅជា JSON String ដោយ \`JSON.stringify()\`
3. គាំទ្រការផ្ញើ \`null\`, \`boolean\`, \`number\`, ឬ \`object\``,
    codeSnippet: `import express from "express";
const app = express();

app.get("/api/v1/courses/catalog", (req, res) => {
  // Step 1: Prepare data payload
  const catalog = [
    { id: 1, title: "Modern JavaScript", instructor: "Ratha", students: 120 },
    { id: 2, title: "Backend Architecture", instructor: "Dara", students: 85 }
  ];

  // Step 2: Send structured JSON envelope
  res.status(200).json({
    success: true,
    count: catalog.length,
    data: catalog,
    timestamp: new Date().toISOString()
  });
});`,
  },
  {
    id: "M06-13",
    number: "13",
    title: "HTTP Status Codes",
    khmerTitle: "ការជ្រើសរើស HTTP Status Codes ត្រឹមត្រូវក្នុង Express",
    type: "lab",
    codeLanguage: "javascript",
    summary: `HTTP Status Codes ប្រាប់ Client ពីលទ្ធផលនៃ Request៖

* **200 OK**៖ សំណើជោគជ័យ
* **201 Created**៖ Resource ថ្មីត្រូវបានបង្កើតដោយជោគជ័យ
* **204 No Content**៖ សកម្មភាពជោគជ័យតែគ្មានទិន្នន័យត្រឡប់ទៅវិញ (DELETE)
* **400 Bad Request**៖ Client បញ្ជូនទិន្នន័យខុសទម្រង់
* **404 Not Found**៖ រកមិនឃើញ Resource ដែលស្នើសុំ
* **500 Internal Server Error**៖ កំហុសបច្ចេកទេសលើ Server`,
    codeSnippet: `import express from "express";
const app = express();
app.use(express.json());

const courses = [{ id: 1, title: "Docker for Node Devs" }];

// GET single course with 200 or 404
app.get("/api/v1/courses/:id", (req, res) => {
  const courseId = Number(req.params.id);
  const course = courses.find(c => c.id === courseId);

  // ⚠️ If course not found -> Return 404 Not Found
  if (!course) {
    return res.status(404).json({
      success: false,
      error: \`Course with ID \${courseId} not found\`
    });
  }

  // ✅ Found -> Return 200 OK
  return res.status(200).json({ success: true, data: course });
});`,
  },
  {
    id: "M06-14",
    number: "14",
    title: "Express Project Structure",
    khmerTitle: "រចនាសម្ព័ន្ធ Project Express.js កម្រិត Enterprise",
    type: "architecture",
    codeLanguage: "bash",
    summary: `រចនាសម្ព័ន្ធ Project ស្អាត និង Scalable សម្រាប់ Enterprise Node.js Backend៖

* **src/server.js**៖ Entry Point សម្រាប់ Listen Port
* **src/app.js**៖ Express App Configuration & Middlewares
* **src/routes/**៖ Route Definitions (URL mapping)
* **src/controllers/**៖ Request/Response Handlers
* **src/services/**៖ Business Logic & Database queries
* **src/middlewares/**៖ Custom Middlewares (Auth, Error, Logger)
* **src/config/**៖ Environment Configurations`,
    codeSnippet: `# Standard Enterprise Express Project Layout
course-catalog-api/
├── package.json
├── .env.example
├── src/
│   ├── app.js               # Express application instance & middlewares
│   ├── server.js            # Server entry point (app.listen)
│   ├── routes/              # Route mapping definitions
│   │   ├── index.js
│   │   └── course.routes.js
│   ├── controllers/         # Request handling & HTTP orchestration
│   │   └── course.controller.js
│   ├── services/            # Pure business logic & database queries
│   │   └── course.service.js
│   └── middlewares/         # Auth, validation, & error handling
│       ├── auth.middleware.js
│       └── error.middleware.js`,
  },
];
