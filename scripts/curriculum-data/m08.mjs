/**
 * m08.mjs - Module 08: Express Middleware (13 topics)
 * Domain: Course Catalog API (Pipeline, Security Guards, Error Handling)
 */

export const M08 = [
  {
    id: "M08-01",
    number: "01",
    title: "What is Middleware?",
    khmerTitle: "អ្វីជា Middleware និងតួនាទីរបស់អនុគមន៍ next()",
    type: "concept",
    codeLanguage: "javascript",
    summary: `**Middleware** គឺជាអនុគមន៍ស្នូលនៃ Express Architecture។ វាអង្គុយនៅចន្លោះ Incoming Request និង Route Handler ចុងក្រោយ។

Middleware នីមួយៗមាន Signature បីយ៉ាង៖ \`(req, res, next)\`
1. **Execute Code**៖ អនុវត្ត Logic ណាមួយក៏បាន (logging, authentication, timing)
2. **Mutate Objects**៖ បន្ថែម Properties ថ្មីលើ \`req\` (ដូចជា \`req.user\` ឬ \`req.requestTime\`)
3. **End Cycle**៖ បញ្ចប់ Request ដោយបញ្ជូន Response (\`res.status(401).json(...)\`)
4. **Call next()**៖ ហៅ \`next()\` ដើម្បីបញ្ជូនបន្តទៅកាន់ Middleware បន្ទាប់ក្នុង Pipeline`,
    tip: "ចងចាំ៖ Middleware ត្រូវតែធ្វើរឿងមួយក្នុងចំណោមពីរ៖ (១) ហៅ `next()` ដើម្បីបន្តទៅមុខ ឬ (២) ផ្ញើ Response (`res.json()`) ដើម្បីបញ្ចប់ Request។ កុំឱ្យខកខានទាំងពីរឱ្យសោះ!",
    objective: "យល់ដឹងពីយន្តការ Request Pipeline និងតួនាទីរបស់ next()។",
    expectedOutcome: "ចេះបង្កើត Middleware ដំបូង និងដឹងពីរបៀបតុបតែង (Decorate) Request Object។",
    codeSnippet: `import express from "express";
const app = express();

// Step 1: Define custom Request Timestamp Middleware
const addTimestamp = (req, res, next) => {
  // 💡 Teaching Note: Mutating req to share data across handlers
  req.requestTime = new Date().toISOString();
  console.log(\`➡️ Incoming [\${req.method}] to \${req.url} at \${req.requestTime}\`);

  // Step 2: Pass control to the next middleware in pipeline!
  next();
};

// Step 3: Mount middleware globally
app.use(addTimestamp);

app.get("/api/v1/courses", (req, res) => {
  res.json({
    message: "Course catalog fetched",
    serverTime: req.requestTime // Accessible here!
  });
});`,
  },
  {
    id: "M08-02",
    number: "02",
    title: "Application-Level Middleware",
    khmerTitle: "ការប្រើប្រាស់ Application-Level Middleware (app.use)",
    type: "concept",
    codeLanguage: "javascript",
    summary: `**Application-Level Middleware** ត្រូវបានចងភ្ជាប់ទៅនឹង Instance នៃ \`app\` តាមរយៈ \`app.use()\` ឬ \`app.METHOD()\`។

លក្ខណៈពិសេស៖
* វាដំណើរការលើ **គ្រប់ Request ទាំងអស់** ដែលចូលមកកាន់ Server (បើដាក់ដោយគ្មាន Path Filter)
* ឬដំណើរការលើ Path Prefix ជាក់លាក់ (ឧ. \`app.use("/api/v1", ...)\`)
* ប្រើសម្រាប់ Cross-Cutting Concerns ដូចជា Security Headers, CORS, Body Parsing, និង Request Tracking`,
    tip: "ដាក់ Application-Level Middlewares នៅខាងលើគេបំផុតនៃ `app.js` ជានិច្ច មុននឹង Mount Routes ណាមួយ។",
    objective: "ចេះចុះបញ្ជី Global Middlewares លើ Express Application Instance។",
    expectedOutcome: "ដឹងពីរបៀបដំណើរការ Cross-cutting logic លើគ្រប់ API Requests។",
    codeSnippet: `import express from "express";
const app = express();

// Step 1: Global Application Middleware (Runs on EVERY request)
app.use((req, res, next) => {
  // Add custom response header identifying our backend
  res.setHeader("X-API-Powered-By", "Course-Engine-PRO");
  next();
});

// Step 2: Path-scoped Application Middleware (Runs only on /api/*)
app.use("/api", (req, res, next) => {
  console.log("🔒 Accessing API namespace");
  next();
});

app.get("/api/v1/courses", (req, res) => {
  res.json({ success: true, data: [] });
});`,
  },
  {
    id: "M08-03",
    number: "03",
    title: "Router-Level Middleware",
    khmerTitle: "ការប្រើប្រាស់ Router-Level Middleware សម្រាប់ការពារ Routes",
    type: "lab",
    codeLanguage: "javascript",
    summary: `**Router-Level Middleware** ត្រូវបានចងភ្ជាប់ទៅនឹង Instance នៃ \`express.Router()\` តាមរយៈ \`router.use()\`។

ភាពខុសគ្នាពី Application-Level Middleware៖
* វាមិនប៉ះពាល់ដល់ Routes ដទៃក្រៅពី Router របស់វាឡើយ
* ស័ក្តិសមបំផុតសម្រាប់ដាក់ Logic ជាក់លាក់លើ Resource មួយ ដូចជា ការផ្ទៀងផ្ទាត់សិទ្ធិលើ Course Management (\`/courses\`)`,
    tip: "ប្រើប្រាស់ Router-Level Middleware នៅពេលអ្នកចង់ការពារ Routes ទាំងអស់ក្នុង Router ជាក់លាក់មួយដោយមិនបាច់សរសេរ Guard លើគ្រប់ Endpoint ដោយដៃ។",
    objective: "ចេះ Scope Middleware ឱ្យដំណើរការតែក្នុង Router មួយជាក់លាក់។",
    expectedOutcome: "ការពារ Routes ក្នុង Resource Group បានយ៉ាងមានប្រសិទ្ធភាព។",
    codeSnippet: `import express from "express";
const app = express();
const courseRouter = express.Router();

// Step 1: Router-Level Middleware (Runs ONLY on courseRouter)
courseRouter.use((req, res, next) => {
  console.log("🎯 Course Router Guard: Inspecting request...");
  // 💡 Teaching Note: We can check headers or permissions specifically for courses
  req.resourceScope = "courses";
  next();
});

// Step 2: Route endpoints inside the router
courseRouter.get("/", (req, res) => {
  res.json({ message: "Courses list", scope: req.resourceScope });
});

courseRouter.post("/", (req, res) => {
  res.status(201).json({ message: "Course created", scope: req.resourceScope });
});

// Step 3: Mount router in main app
app.use("/api/v1/courses", courseRouter);`,
  },
  {
    id: "M08-04",
    number: "04",
    title: "Built-in Middleware",
    khmerTitle: "Middleware ដែលភ្ជាប់មកស្រាប់ជាមួយ Express (json, urlencoded, static)",
    type: "concept",
    codeLanguage: "javascript",
    summary: `Express ភ្ជាប់មកជាមួយ Built-in Middlewares សំខាន់ៗចំនួន ៣៖

1. **\`express.json()\`**៖ Parse incoming requests ដែលមាន JSON payloads (Content-Type: application/json)
2. **\`express.urlencoded()\`**៖ Parse incoming requests ដែលមាន URL-encoded payloads ពី HTML Forms
3. **\`express.static()\`**៖ បម្រើ Static Assets ដូចជា Images, CSS, ឬ Uploaded PDFs ចេញពី Directory ជាក់លាក់`,
    tip: "នៅក្នុង Express v4 ជំនាន់ដំបូង អ្នកត្រូវដំឡើង `body-parser` ដោយឡែក ប៉ុន្តែចាប់តាំងពី v4.16 មក ពួកវាត្រូវបាន Built-in ក្នុង `express` តែម្តង។",
    objective: "យល់ច្បាស់ពី Built-in Middlewares ទាំង ៣ របស់ Express។",
    expectedOutcome: "ចេះ Configure Body Parsers និង Static Asset Server យ៉ាងត្រឹមត្រូវ។",
    codeSnippet: `import express from "express";
import path from "node:path";
const app = express();

// Step 1: Built-in JSON Body Parser
app.use(express.json());

// Step 2: Built-in URL-encoded Form Parser
app.use(express.urlencoded({ extended: true }));

// Step 3: Built-in Static File Server (e.g. for course certificate PDFs / images)
app.use("/public", express.static("public"));

app.post("/test-payload", (req, res) => {
  res.json({ receivedBody: req.body });
});`,
  },
  {
    id: "M08-05",
    number: "05",
    title: "express.json() Deep Dive",
    khmerTitle: "ការស្វែងយល់ស៊ីជម្រៅពី express.json() និង Payload Limits",
    type: "lab",
    codeLanguage: "javascript",
    summary: `តាមលំនាំដើម ប្រសិនបើ Client បញ្ជូន JSON Payload ធំខុសប្រក្រតី (ឧ. 50MB) វានឹងធ្វើឱ្យ Server ចំណាយ Memory និង CPU ខ្លាំងដើម្បី Parse (បង្កហានិភ័យ **DoS Attack**)។

ការកំណត់ជម្រើសសុវត្ថិភាពសម្រាប់ \`express.json()\`៖
* **\`limit: "10kb"\`**៖ កំណត់ទំហំអតិបរមានៃ Body
* **Handle Syntax Errors**៖ ចាប់ Syntax Error នៅពេល Client ផ្ញើ Malformed JSON មិនត្រឹមត្រូវ`,
    tip: "ច្បាប់សុវត្ថិភាព Production៖ កំណត់ limit ត្រឹម `10kb` ឬ `100kb` សម្រាប់ JSON API ធម្មតា លើកលែងតែ Upload Endpoints។",
    objective: "ចេះកំណត់ Security Limits លើ express.json() និងការពារ DoS attacks។",
    expectedOutcome: "Server មានភាពធន់នឹង Invalid JSON និង Oversized Payload attacks។",
    codeSnippet: `import express from "express";
const app = express();

// Step 1: Configure express.json with strict size limit
app.use(express.json({ limit: "10kb" }));

// Step 2: Test Endpoint
app.post("/api/v1/courses", (req, res) => {
  res.status(201).json({ success: true, course: req.body });
});

// Step 3: Catch JSON Syntax Errors (e.g., malformed JSON sent by client)
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      error: "Malformed JSON payload. Please verify syntax."
    });
  }
  next(err);
});`,
  },
  {
    id: "M08-06",
    number: "06",
    title: "express.urlencoded()",
    khmerTitle: "ការគ្រប់គ្រង Form Submissions ជាមួយ express.urlencoded()",
    type: "lab",
    codeLanguage: "javascript",
    summary: `នៅពេលដែល Client បញ្ជូនទិន្នន័យពី HTML Form ស្តង់ដារ (Header \`Content-Type: application/x-www-form-urlencoded\`) យើងត្រូវប្រើ **\`express.urlencoded()\`**។

ភាពខុសគ្នារវាង Options៖
* **\`extended: false\`**៖ ប្រើ \`querystring\` library ដើមរបស់ Node (មិនគាំទ្រ Nested Objects ឡើយ)
* **\`extended: true\`**៖ ប្រើ \`qs\` library ដែលគាំទ្រ Complex / Nested Objects ដូចជា \`course[instructor][name]=Ratha\``,
    tip: "ជ្រើសរើស `{ extended: true }` ជានិច្ច ដើម្បីឱ្យ Server អាច Parse Nested Form Data បានពេញលេញ។",
    objective: "យល់ដឹងពីភាពខុសគ្នារវាង extended: true និង false ក្នុង Form Parsing។",
    expectedOutcome: "ចេះ Parse HTML Form submissions និងទាញយក Nested Properties។",
    codeSnippet: `import express from "express";
const app = express();

// Step 1: Enable urlencoded with extended: true for nested objects
app.use(express.urlencoded({ extended: true }));

// Step 2: Handle Form submission
// Simulated form submission: title=Node+Course&instructor[name]=Ratha
app.post("/submit-course-form", (req, res) => {
  console.log("Form Body:", req.body);
  // req.body.instructor.name is parsed into an object!
  res.status(200).json({
    success: true,
    received: req.body
  });
});`,
  },
  {
    id: "M08-07",
    number: "07",
    title: "Custom Middleware Development",
    khmerTitle: "ការបង្កើត Custom Middleware សម្រាប់ Course Validation",
    type: "lab",
    codeLanguage: "javascript",
    summary: `ការសរសេរ **Custom Middleware** អនុញ្ញាតឱ្យយើងស្រង់ចេញ (Extract) នូវ Reusable Logic ពី Route Handlers។

ឧទាហរណ៍៖ ការបង្កើត \`validateCoursePayload\` Middleware៖
* ពិនិត្យវត្តមាន \`req.body.title\` (មិនទទេ)
* ពិនិត្យ \`req.body.price\` (ជាលេខវិជ្ជមាន)
* ប្រសិនបើមិនត្រឹមត្រូវ ត្រឡប់ \`400 Bad Request\` ភ្លាមៗ
* ប្រសិនបើត្រឹមត្រូវ ហៅ \`next()\` ឱ្យទៅមុខបន្ត`,
    tip: "ការដាក់ Validation ក្នុង Middleware ជួយឱ្យ Controller ផ្តោតតែលើ Business Logic សុទ្ធសាធ (Single Responsibility Principle)។",
    objective: "ចេះបង្កើត Reusable Validation Middleware ដោយខ្លួនឯង។",
    expectedOutcome: "សរសេរ Middleware Guard ដែលការពារ Route ពីទិន្នន័យមិនត្រឹមត្រូវ។",
    codeSnippet: `import express from "express";
const app = express();
app.use(express.json());

// Step 1: Build Custom Course Validation Middleware
export const validateCoursePayload = (req, res, next) => {
  const { title, price } = req.body;

  // Check required title
  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({
      success: false,
      error: "Validation Error: 'title' must be a non-empty string"
    });
  }

  // Check price is positive number
  if (typeof price !== "number" || price < 0) {
    return res.status(400).json({
      success: false,
      error: "Validation Error: 'price' must be a positive number"
    });
  }

  // Step 2: Sanitize input and proceed
  req.body.title = title.trim();
  next(); // All valid! Move forward.
};

// Step 3: Plug middleware into POST route
app.post("/api/v1/courses", validateCoursePayload, (req, res) => {
  res.status(201).json({ success: true, course: req.body });
});`,
  },
  {
    id: "M08-08",
    number: "08",
    title: "Authentication Middleware",
    khmerTitle: "ការបង្កើត Authentication Middleware សម្រាប់ផ្ទៀងផ្ទាត់ Bearer Token",
    type: "lab",
    codeLanguage: "javascript",
    summary: `**Authentication Middleware (\`requireAuth\`)** ទទួលខុសត្រូវលើការផ្ទៀងផ្ទាត់អត្តសញ្ញាណរបស់អ្នកស្នើសុំ៖

1. អាន Header \`Authorization: Bearer <token>\` ពី \`req.headers\`
2. ពិនិត្យវត្តមាន និង Format នៃ Token (បើគ្មាន ត្រឡប់ \`401 Unauthorized\`)
3. ផ្ទៀងផ្ទាត់ Token (ឬ API Key)
4. ប្រសិនបើត្រឹមត្រូវ Attach ព័ត៌មាន User ទៅក្នុង \`req.user\` រួចហៅ \`next()\``,
    tip: "Header `Authorization` តែងតែចាប់ផ្តើមដោយពាក្យ `Bearer ` (មាន Space មួយ)។ ប្រើ `authHeader.split(' ')[1]` ដើម្បីដកយក Token សុទ្ធ។",
    objective: "ចេះបង្កើត Authentication Guard សម្រាប់ការពារ Private Endpoints។",
    expectedOutcome: "មានសមត្ថភាពការពារ Route ដោយផ្ទៀងផ្ទាត់ Token និង Pass req.user ទៅកាន់ Handlers។",
    codeSnippet: `import express from "express";
const app = express();
app.use(express.json());

// Step 1: Authentication Guard Middleware
export const requireAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");

  // Check header existence and Bearer prefix
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      error: "Access Denied: Missing or malformed Bearer authorization token"
    });
  }

  const token = authHeader.split(" ")[1];

  // Simulated token verification (we will integrate JWT in M16!)
  if (token !== "course-admin-secret-token") {
    return res.status(401).json({
      success: false,
      error: "Access Denied: Invalid or expired token"
    });
  }

  // Step 2: Attach authenticated user payload to request
  req.user = { id: 42, username: "ratha_admin", role: "admin" };
  next();
};

// Step 3: Protect Course creation route with requireAuth
app.post("/api/v1/courses", requireAuth, (req, res) => {
  res.status(201).json({
    message: "Course created successfully by instructor",
    author: req.user.username
  });
});`,
  },
  {
    id: "M08-09",
    number: "09",
    title: "Authorization Middleware (RBAC)",
    khmerTitle: "ការបង្កើត Authorization Middleware ផ្ទៀងផ្ទាត់សិទ្ធិ Role",
    type: "lab",
    codeLanguage: "javascript",
    summary: `បន្ទាប់ពី Authentication ដឹងថា **"អ្នកជានរណា"** ជំហានបន្ទាប់គឺ **Authorization** ដែលកំណត់ថា **"តើអ្នកមានសិទ្ធិធ្វើសកម្មភាពនេះដែរឬទេ"**។

**Role-Based Access Control (RBAC)** Middleware ត្រូវបានបង្កើតឡើងជា Higher-Order Function (\`restrictTo(...allowedRoles)\`) ដែលពិនិត្យ \`req.user.role\`៖
* ប្រសិនបើ Role មិនស្ថិតក្នុង Allowed Roles ត្រឡប់ \`403 Forbidden\`
* ប្រសិនបើត្រូវ ហៅ \`next()\``,
    tip: "ភាពខុសគ្នារវាង 401 និង 403៖ 401 Unauthorized (មិនទាន់ Login / គ្មាន Token) ចំណែក 403 Forbidden (បាន Login រួចរាល់ហើយ តែគ្មានសិទ្ធិគ្រប់គ្រាន់)។",
    objective: "ចេះបង្កើត Role-based authorization middleware ជាមួយ Higher-order function។",
    expectedOutcome: "ការពារ Admin/Instructor endpoints ពីការចូលប្រើប្រាស់ដោយសិស្សទូទៅ (Students)។",
    codeSnippet: `import express from "express";
const app = express();

// Mock requireAuth that sets req.user
const mockAuth = (req, res, next) => {
  req.user = { id: 1, role: "student" }; // Change to "admin" to test!
  next();
};

// Step 1: Role Authorization Higher-Order Middleware Factory
export const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    // 💡 Teaching Note: req.user is guaranteed by requireAuth
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: \`Forbidden: Role '\${req.user?.role}' does not have permission for this action\`
      });
    }
    next();
  };
};

// Step 2: Restrict Course deletion to "admin" only
app.delete("/api/v1/courses/:id", mockAuth, restrictTo("admin"), (req, res) => {
  res.status(200).json({ success: true, message: "Course deleted by Admin" });
});`,
  },
  {
    id: "M08-10",
    number: "10",
    title: "Logging Middleware",
    khmerTitle: "ការបង្កើត Structured HTTP Logger Middleware និងការប្រើប្រាស់ Morgan",
    type: "lab",
    codeLanguage: "javascript",
    summary: `នៅក្នុង Production ការកត់ត្រា (Logging) រាល់ HTTP Requests គឺចាំបាច់បំផុតសម្រាប់ **Debugging**, **Audit Trails**, និង **Performance Monitoring**។

យើងអាចបង្កើត Custom Structured Logger មួយដែលកត់ត្រា៖
* HTTP Method & URL Path
* HTTP Status Code នៃ Response
* រយៈពេលដំណើរការ (Duration in ms)
* Timestamp នៃ Request`,
    tip: "សម្រាប់គម្រោងធំៗ អ្នកអាចប្រើ Library ពេញនិយមដូចជា `morgan` សម្រាប់ Dev Logging ឬ `pino-http` សម្រាប់ High-performance JSON Logging។",
    objective: "ចេះបង្កើត HTTP Request Logging Middleware ដើម្បី Monitor Server Health។",
    expectedOutcome: "Console បង្ហាញព័ត៌មានលម្អិតនៃគ្រប់ Request យ៉ាងច្បាស់លាស់។",
    codeSnippet: `import express from "express";
const app = express();

// Step 1: Build Custom Structured HTTP Logger
const httpLogger = (req, res, next) => {
  const start = process.hrtime(); // High-resolution timer

  // Listen for the moment headers & payload are finalized
  res.on("finish", () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const durationMs = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);

    const logEntry = {
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      duration: \`\${durationMs}ms\`,
      ip: req.ip
    };

    console.log(\`[\${logEntry.timestamp}] \${logEntry.method} \${logEntry.path} -> \${logEntry.status} (\${logEntry.duration})\`);
  });

  next();
};

app.use(httpLogger);
app.get("/api/v1/courses", (req, res) => res.json({ courses: [] }));`,
  },
  {
    id: "M08-11",
    number: "11",
    title: "Centralized Error Middleware",
    khmerTitle: "ការបង្កើត Centralized Error Handling Middleware (4 Parameters)",
    type: "lab",
    codeLanguage: "javascript",
    summary: `Express កំណត់អត្តសញ្ញាណ **Error Handling Middleware** តាមរយៈការមាន Parameters ចំនួន ៤៖ **\`(err, req, res, next)\`**។

អត្ថប្រយោជន៍នៃ Centralized Error Handling៖
* ប្រមូលផ្តុំកំហុសទាំងអស់មកដោះស្រាយនៅកន្លែងតែមួយ
* បង្កើត Standardized Error Envelope (\`{ success: false, error: ... }\`)
* លាក់ Stack Trace នៅលើ **Production Environment** ដើម្បីសុវត្ថិភាព
* បង្ហាញ Stack Trace នៅលើ **Development Environment** សម្រាប់ងាយស្រួល Debug`,
    tip: "⚠️ សំខាន់បំផុត៖ Error Middleware ត្រូវតែមាន Parameter ទាំង ៤ គត់ (err, req, res, next) បើអ្នកសរសេរត្រឹម ៣ Express នឹងចាត់ទុកវាជា Middleware ធម្មតា!",
    objective: "ចេះបង្កើត Centralized Error Handling Middleware ស្តង់ដារ Production។",
    expectedOutcome: "ដោះស្រាយកំហុសបានស្អាត ដោយមិនធ្វើឱ្យ Server Crash ឬបែកធ្លាយ Stack Trace ទៅកាន់ Attackers។",
    codeSnippet: `import express from "express";
const app = express();

// Route that deliberately throws an error
app.get("/api/v1/crash-test", (req, res, next) => {
  const err = new Error("Database connection timed out");
  err.statusCode = 503;
  next(err); // 💡 Teaching Note: Pass error to centralized handler via next(err)!
});

// Step 1: Centralized Error-Handling Middleware (MUST HAVE 4 PARAMETERS)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === "production";

  // Step 2: Build Standardized Error Envelope
  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || "Internal Server Error",
      statusCode,
      // 🔒 Hide stack trace in production environment!
      ...(isProduction ? {} : { stack: err.stack })
    }
  });
});`,
  },
  {
    id: "M08-12",
    number: "12",
    title: "Middleware Execution Order",
    khmerTitle: "សារៈសំខាន់នៃលំដាប់លំដោយ Middleware Order",
    type: "concept",
    codeLanguage: "javascript",
    summary: `នៅក្នុង Express **លំដាប់លំដោយនៃការចុះបញ្ជី (Execution Order) គឺសំខាន់បំផុត!** Express ដំណើរការ Middlewares ពីលើចុះក្រោមតាមលំដាប់ដែលបានហៅ \`app.use()\`។

លំដាប់លំដោយស្តង់ដារ (Golden Order)៖
1. **Global Loggers & Security** (Morgan, Helmet, CORS)
2. **Body Parsers** (\`express.json()\`)
3. **Application Routes** (\`app.use("/api/v1/courses", courseRouter)\`)
4. **404 Not Found Handler** (ចាប់ URL ដែលគ្មាន Route ត្រូវ)
5. **Centralized Error Middleware** (\`(err, req, res, next)\` នៅក្រោមគេបង្អស់!)`,
    tip: "ប្រសិនបើអ្នកដាក់ Error Middleware នៅពីលើ Routes នោះវានឹងមិនអាចចាប់ Errors របស់ Routes ទាំងនោះបានឡើយ!",
    objective: "យល់ច្បាស់ពីលំដាប់លំដោយនៃការដាក់ Middlewares ក្នុង Express Application។",
    expectedOutcome: "រៀបចំ Middleware Pipeline តាមលំដាប់លំដោយត្រឹមត្រូវ ជៀសវាង Bugs អាថ៌កំបាំង។",
    codeSnippet: `import express from "express";
const app = express();

// 1. First: Body parsers & Logger
app.use(express.json());
app.use((req, res, next) => {
  console.log("1. Logger Executed");
  next();
});

// 2. Second: Routes
app.get("/api/v1/courses", (req, res) => {
  console.log("2. Route Handler Executed");
  res.json({ success: true, data: [] });
});

// 3. Third: Catch-all 404 Handler (For non-existent routes)
app.use((req, res, next) => {
  const err = new Error(\`Route \${req.originalUrl} not found\`);
  err.statusCode = 404;
  next(err);
});

// 4. Fourth (LAST): Centralized Error Handler
app.use((err, req, res, next) => {
  console.log("3. Error Handler Executed");
  res.status(err.statusCode || 500).json({ success: false, error: err.message });
});`,
  },
  {
    id: "M08-13",
    number: "13",
    title: "Middleware Best Practices",
    khmerTitle: "ការអនុវត្តល្អបំផុតសម្រាប់ប្រព័ន្ធ Middleware និង Async Handlers",
    type: "concept",
    codeLanguage: "javascript",
    summary: `បញ្ជីត្រួតពិនិត្យ (Best Practices Checklist) សម្រាប់ Express Middleware៖

1. **Always call next() or send response**៖ កុំទុកឱ្យ Request ព្យួរចោល
2. **Catch Async Errors (asyncHandler)**៖ Express 4 មិនទាន់ចាប់ Unhandled Promise Rejections ក្នុង async functions ដោយស្វ័យប្រវត្តិទេ (ត្រូវរុំដោយ Helper ឬ Try/Catch)
3. **Avoid mutating global state**៖ តុបតែងតែលើ \`req\` object
4. **Single Responsibility**៖ Middleware មួយ ធ្វើការងារមួយច្បាស់លាស់`,
    tip: "ការប្រើប្រាស់ `asyncHandler` helper function ជួយឱ្យអ្នកមិនបាច់សរសេរ `try/catch` ដដែលៗនៅក្នុងរាល់ Controller ឡើយ។",
    objective: "ចេះសរសេរ asyncHandler utility ដើម្បីកាត់បន្ថយ try/catch boilerplate។",
    expectedOutcome: "កូដ Middleware និង Controllers មានសុវត្ថិភាពខ្ពស់ មិនប្រឈមនឹង Unhandled Rejections។",
    codeSnippet: `import express from "express";
const app = express();

// Step 1: Enterprise asyncHandler Wrapper Utility
// Catches any rejected Promise and forwards error to next(err) automatically
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Step 2: Use asyncHandler without repetitive try/catch blocks!
app.get("/api/v1/courses/stats", asyncHandler(async (req, res) => {
  // Simulating async database call
  const stats = await Promise.resolve({ totalCourses: 42, activeEnrollments: 1250 });
  res.json({ success: true, data: stats });
}));

// Step 3: Centralized Error Handler catches any thrown errors
app.use((err, req, res, next) => {
  res.status(500).json({ success: false, error: err.message });
});`,
  },
];
