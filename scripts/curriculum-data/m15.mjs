/**
 * m15.mjs - Module 15: Error Handling (12 topics)
 * Domain: Course Catalog API (AppError, Centralized Error Middleware, Mongoose & MongoDB Error Handlers)
 */

export const M15 = [
  {
    id: "M15-01",
    number: "01",
    title: "What is Error Handling?",
    khmerTitle: "ទស្សនវិជ្ជានៃការគ្រប់គ្រងកំហុស (Error Handling) ក្នុង Express",
    type: "concept",
    codeLanguage: "javascript",
    summary: `**Error Handling** គឺជាយន្តការស្ទាក់ចាប់ ដោះស្រាយ និងឆ្លើយតបចំពោះកំហុសបច្ចេកទេសទាំងអស់ដែលកើតឡើងក្នុង Application ដោយមិនធ្វើឱ្យ Server Crash ឬបែកធ្លាយព័ត៌មានរសើប។

គោលបំណងសំខាន់ៗ៖
* ធានាថា Server នៅតែបន្តដំណើរការបានរលូនទោះបីជាមានកំហុសលើ Request ណាមួយក៏ដោយ
* ឆ្លើយតបនូវ Standard Error Envelope ដ៏ច្បាស់លាស់ដល់ Client
* កត់ត្រា (Log) កំហុសសម្រាប់ Developer ងាយស្រួល Debug`,
    codeSnippet: `// Unified Error Architecture Flow:
// Controller/Service (throws error) ➔ next(err) ➔ [ Centralized Error Middleware ]
//                                                           │
//                                     ┌─────────────────────┴─────────────────────┐
//                                     ▼                                           ▼
//                          [ Development Mode ]                         [ Production Mode ]
//                          (Full Stack Trace)                           (Sanitized Envelope)`,
  },
  {
    id: "M15-02",
    number: "02",
    title: "Synchronous Errors",
    khmerTitle: "ការគ្រប់គ្រងកំហុសក្នុង Synchronous Code",
    type: "concept",
    codeLanguage: "javascript",
    summary: `នៅក្នុង Synchronous Code (កូដដែលដំណើរការតាមលំដាប់លំដោយធម្មតា) Express នឹងស្ទាក់ចាប់កំហុសដែល \`throw\` ដោយស្វ័យប្រវត្តិ ហើយបញ្ជូនវាទៅកាន់ Error Middleware ភ្លាមៗ។

ឧទាហរណ៍៖
\`\`\`javascript
app.get("/sync-error", (req, res) => {
  throw new Error("Something broke synchronously!"); // Express catches this automatically!
});
\`\`\``,
    codeSnippet: `import express from "express";
const app = express();

// Synchronous route handler
app.get("/api/v1/courses/sync-check", (req, res) => {
  if (!req.query.token) {
    // 💡 Synchronously thrown errors are automatically caught by Express!
    throw new Error("Missing required security verification token");
  }
  res.json({ success: true });
});`,
  },
  {
    id: "M15-03",
    number: "03",
    title: "Asynchronous Errors & asyncHandler",
    khmerTitle: "ការគ្រប់គ្រង Asynchronous Errors និងការប្រើប្រាស់ asyncHandler",
    type: "lab",
    codeLanguage: "javascript",
    summary: `⚠️ **បញ្ហាប្រឈមធំបំផុតក្នុង Express v4**៖ Express មិនអាចចាប់កំហុសដែលកើតឡើងក្នុង \`async/await\` functions ដោយស្វ័យប្រវត្តិឡើយ! ប្រសិនបើមាន Promise Rejection ហើយគ្មាន \`try/catch\` នោះ Server នឹងគាំង ឬកើតមាន UnhandledPromiseRejectionWarning។

**ដំណោះស្រាយស្តង់ដារឧស្សាហកម្ម**៖ ប្រើប្រាស់ **\`asyncHandler\` Utility** ដើម្បីរុំ Async Controllers ដោយស្វ័យប្រវត្តិ៖
\`const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);\` `,
    codeSnippet: `// src/utils/asyncHandler.js
export const asyncHandler = (fn) => (req, res, next) => {
  // 💡 Teaching Note: Guarantees that any rejected Promise is routed to next(err)!
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage in Course Controller (No try/catch needed!):
// export const getCourse = asyncHandler(async (req, res) => {
//   const course = await Course.findById(req.params.id);
//   res.json({ success: true, data: course });
// });`,
  },
  {
    id: "M15-04",
    number: "04",
    title: "Custom AppError Class",
    khmerTitle: "ការបង្កើត Custom AppError Class សម្រាប់ Domain Errors",
    type: "lab",
    codeLanguage: "javascript",
    summary: `កំហុស \`Error\` ដើមរបស់ JavaScript គ្មាន \`statusCode\` ឡើយ។ ដូច្នេះ យើងត្រូវបង្កើត Custom **\`AppError\`** Class ដែលស្នងមរតក (Extends) ពី \`Error\`៖

លក្ខណៈសម្បត្តិបន្ថែម៖
* \`statusCode\` (ឧ. \`400\`, \`401\`, \`404\`, \`409\`)
* \`status\` (\`"fail"\` សម្រាប់ 4xx, \`"error"\` សម្រាប់ 5xx)
* \`isOperational: true\` (បញ្ជាក់ថានេះជាកំហុសអាជីវកម្មដែលបានដឹងទុកជាមុន មិនមែនជា System Bug ឡើយ)
* \`Error.captureStackTrace(this, this.constructor)\``,
    codeSnippet: `// src/errors/AppError.js
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = \`\${statusCode}\`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; // 💡 Differentiates business errors from bugs!

    Error.captureStackTrace(this, this.constructor);
  }
}

// Example usage in Service:
// if (!course) throw new AppError("Course not found in database", 404);`,
  },
  {
    id: "M15-05",
    number: "05",
    title: "Centralized Global Error Handler",
    khmerTitle: "ការបង្កើត Global Error Handling Middleware (4 Parameters)",
    type: "lab",
    codeLanguage: "javascript",
    summary: `Global Error Middleware គឺជា Middleware ចុងក្រោយគេបង្អស់ក្នុង \`app.js\` ដែលមាន Parameters ទាំង ៤៖ **\`(err, req, res, next)\`**។

តួនាទីស្នូល៖
* ទទួលកំហុសទាំងអស់ដែលបញ្ជូនតាមរយៈ \`next(err)\`
* កំណត់ Status Code (Default: \`500 Internal Server Error\`)
* កសាង Standard Error Response Envelope`,
    codeSnippet: `// src/middlewares/error.middleware.js
export const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  console.error("💥 ERROR CAUGHT BY GLOBAL HANDLER:", err);

  res.status(statusCode).json({
    success: false,
    status,
    error: {
      message: err.message || "Something went wrong on the server",
      statusCode,
      timestamp: new Date().toISOString()
    }
  });
};`,
  },
  {
    id: "M15-06",
    number: "06",
    title: "Operational vs Programming Errors",
    khmerTitle: "ភាពខុសគ្នារវាង Operational Errors និង Programming Bugs",
    type: "concept",
    codeLanguage: "javascript",
    summary: `ការយល់ដឹងពីភាពខុសគ្នារវាងកំហុសទាំងពីរប្រភេទគឺសំខាន់បំផុតសម្រាប់ Backend Stability៖

1. **Operational Errors (កំហុសអាជីវកម្មដែលរំពឹងទុក)**៖
   * User បញ្ចូល Password ខុស, រក Course ID មិនឃើញ, Network Timeout
   * ដោះស្រាយដោយបញ្ជូន Message រួសរាយទៅកាន់ Client (Status 4xx)
2. **Programming Errors (Bugs ក្នុងកូដ)**៖
   * អាន Property លើ \`undefined\`, Syntax Error, Memory Leak
   * ត្រូវលាក់ព័ត៌មានពី Client (បញ្ជូនទូទៅ 500) និងកត់ត្រា Stack Trace សម្រាប់ Developer កែប្រែ!`,
    codeSnippet: `/* ERROR CLASSIFICATION COMPARISON:
   -------------------------------------------------------------
   Operational Error:    AppError("Course not found", 404)
                         ➔ isOperational: true ➔ Safe to show client!

   Programming Error:    TypeError: Cannot read property 'map' of undefined
                         ➔ isOperational: false ➔ Hide details on Prod!
   -------------------------------------------------------------
*/`,
  },
  {
    id: "M15-07",
    number: "07",
    title: "Catch-All 404 Route Handler",
    khmerTitle: "ការបង្កើត 404 Route Handler សម្រាប់ URL ដែលមិនមានក្នុងប្រព័ន្ធ",
    type: "lab",
    codeLanguage: "javascript",
    summary: `នៅពេល Client ហៅ URL ដែលមិនត្រឹមត្រូវ (ឧ. \`GET /api/v1/invalid-route\`) ប្រសិនបើយើងមិនមាន Catch-all Handler ទេ Express នឹងត្រឡប់ Default HTML 404 page ដែលមិនមែនជាទម្រង់ JSON REST API ឡើយ។

ដំណោះស្រាយ៖
* ដាក់ Catch-all Middleware នៅខាងក្រោម Route ទាំងអស់
* បង្កើត \`new AppError(\`Cannot find \${req.originalUrl} on this server!\`, 404)\`
* បញ្ជូនទៅកាន់ \`next(err)\``,
    codeSnippet: `import { AppError } from "./errors/AppError.js";

// Step 1: Place AFTER all valid routes in app.js
app.all("*", (req, res, next) => {
  // 💡 Teaching Note: Passes clean 404 AppError directly to global error handler!
  next(new AppError(\`Endpoint \${req.method} \${req.originalUrl} does not exist on this server\`, 404));
});`,
  },
  {
    id: "M15-08",
    number: "08",
    title: "Handling Mongoose Validation Errors",
    khmerTitle: "ការដោះស្រាយកំហុស Mongoose ValidationError",
    type: "lab",
    codeLanguage: "javascript",
    summary: `នៅពេលដែលទិន្នន័យមិនត្រូវតាម Schema Rules Mongoose នឹងបោះកំហុសឈ្មោះ **\`ValidationError\`** (Status Code 500 ជាលំនាំដើម)។

យើងត្រូវបង្កើត Handler ពិសេសមួយដើម្បីបំប្លែងវាឱ្យក្លាយជា **400 Bad Request** ដ៏ស្អាត៖
* ស្រង់យក Messages ចេញពី \`Object.values(err.errors)\`
* បង្កើត \`new AppError(message, 400)\``,
    codeSnippet: `import { AppError } from "../errors/AppError.js";

// Helper: Handle Mongoose Schema Validation Errors
export const handleMongooseValidationError = (err) => {
  // Extract all validation failure messages
  const errorMessages = Object.values(err.errors).map(el => el.message);
  const message = \`Invalid input data: \${errorMessages.join(". ")}\`;
  return new AppError(message, 400);
};

// In global error handler:
// if (err.name === "ValidationError") err = handleMongooseValidationError(err);`,
  },
  {
    id: "M15-09",
    number: "09",
    title: "Handling Mongoose CastError (Invalid ObjectId)",
    khmerTitle: "ការដោះស្រាយកំហុស Mongoose CastError លើ MongoDB ObjectId",
    type: "lab",
    codeLanguage: "javascript",
    summary: `នៅពេល Client បញ្ជូន ID មិនត្រូវតាមទម្រង់ 24 Hex Characters នៃ MongoDB ObjectId (ឧ. \`/api/v1/courses/invalid-id-123\`) Mongoose នឹងបោះកំហុស **\`CastError\`**។

ដំណោះស្រាយ៖
* ពិនិត្យ \`if (err.name === "CastError")\`
* បំប្លែងទៅជា Human-readable 400 Bad Request៖
  \`new AppError(\`Invalid \${err.path}: \${err.value}\`, 400)\``,
    codeSnippet: `import { AppError } from "../errors/AppError.js";

// Helper: Handle Invalid MongoDB ObjectId CastError
export const handleMongooseCastError = (err) => {
  const message = \`Invalid \${err.path}: '\${err.value}' is not a valid MongoDB ObjectId\`;
  return new AppError(message, 400);
};

// In global error handler:
// if (err.name === "CastError") err = handleMongooseCastError(err);`,
  },
  {
    id: "M15-10",
    number: "10",
    title: "Handling MongoDB Duplicate Key Errors (11000)",
    khmerTitle: "ការដោះស្រាយកំហុស MongoDB Duplicate Key Error (Code 11000)",
    type: "lab",
    codeLanguage: "javascript",
    summary: `នៅពេលដែល Client ព្យាយាមបង្កើត Course ដែលមាន Title ឬ Slug ជាន់គ្នាលើ Field ដែលមាន \`unique: true\` MongoDB Driver នឹងបោះកំហុសដែលមាន **\`code: 11000\`**។

ដំណោះស្រាយ៖
* ពិនិត្យ \`if (err.code === 11000)\`
* ស្រង់ឈ្មោះ Field ដែលស្ទួនចេញពី Error
* បញ្ជូន **\`409 Conflict\`** ត្រឡប់ទៅ Client៖
  \`new AppError(\`Duplicate field value: '\${value}'. Please use another value!\`, 409)\``,
    codeSnippet: `import { AppError } from "../errors/AppError.js";

// Helper: Handle MongoDB Duplicate Unique Field (Error code 11000)
export const handleMongoDuplicateKeyError = (err) => {
  // Extract duplicate field key and value from keyValue object
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  const message = \`Duplicate field error: Course with \${field} '\${value}' already exists. Please choose another.\`;
  return new AppError(message, 409); // 409 Conflict!
};

// In global error handler:
// if (err.code === 11000) err = handleMongoDuplicateKeyError(err);`,
  },
  {
    id: "M15-11",
    number: "11",
    title: "Production vs Development Error Responses",
    khmerTitle: "ការបែងចែកទម្រង់ Error Response រវាង Development និង Production",
    type: "architecture",
    codeLanguage: "javascript",
    summary: `នៅក្នុង Professional Architecture ទម្រង់ឆ្លើយតបនៃកំហុសត្រូវតែបែងចែកជា ២ ផ្អែកលើ **\`process.env.NODE_ENV\`**៖

1. **Development Environment (\`NODE_ENV=development\`)**៖
   * បង្ហាញ Stack Trace ពេញលេញ, Error Object ទាំងមូល, និង Original Message សម្រាប់ Developer ងាយស្រួល Debug
2. **Production Environment (\`NODE_ENV=production\`)**៖
   * លាក់ Stack Trace ទាំងស្រុង
   * បង្ហាញតែ Sanitized Error Message សម្រាប់ Operational Errors
   * ប្រសិនបើជា Programming Bug បញ្ជូនសារទូទៅ \`"Something went very wrong!"\``,
    codeSnippet: `// Send detailed error during Development
const sendErrorDev = (err, res) => {
  res.status(err.statusCode || 500).json({
    success: false,
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack // 💡 Stack trace exposed ONLY in development!
  });
};

// Send safe, sanitized error in Production
const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      error: { message: err.message }
    });
  } else {
    // Programming bug or unknown leak: don't leak details!
    console.error("ERROR 💥", err);
    res.status(500).json({
      success: false,
      error: { message: "Internal server error. Please try again later." }
    });
  }
};`,
  },
  {
    id: "M15-12",
    number: "12",
    title: "Unhandled Rejections & Uncaught Exceptions",
    khmerTitle: "ការចាប់កំហុស Unhandled Rejections និង Uncaught Exceptions",
    type: "architecture",
    codeLanguage: "javascript",
    summary: `រនាំងសុវត្ថិភាពចុងក្រោយបង្អស់ (Safety Net) សម្រាប់ Node.js Backend៖

1. **\`uncaughtException\`**៖ ចាប់កំហុស Sync Bugs ដែលកើតឡើងក្រៅ Express Handlers
2. **\`unhandledRejection\`**៖ ចាប់ Async Promises ដែល Reject ហើយគ្មាន \`.catch()\` (ដូចជា MongoDB Connection ធ្លាក់)
3. **Graceful Exit**៖ នៅពេលមាន Exception ធ្ងន់ធ្ងរ ត្រូវបិទ HTTP Server (\`server.close()\`) រួច \`process.exit(1)\` ដើម្បីឱ្យ Process Manager (PM2 / Docker / Kubernetes) Restart Container ថ្មីដែលស្អាត!`,
    codeSnippet: `// In src/server.js:
// 1. Safety net for unhandled Promise rejections (e.g. DB connection dropped)
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION! 💥 Shutting down gracefully...");
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1); // Exit process and let Docker/PM2 restart it!
  });
});

// 2. Safety net for synchronous uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION! 💥 Shutting down immediately...");
  console.error(err.name, err.message);
  process.exit(1);
});`,
  },
];
