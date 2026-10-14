/**
 * m14.mjs - Module 14: Data Validation (11 topics)
 * Domain: Course Catalog API (Zod Request Validation, Schemas, Middleware, Sanitization)
 */

export const M14 = [
  {
    id: "M14-01",
    number: "01",
    title: "What is Validation?",
    khmerTitle: "អ្វីជា Data Validation និងតួនាទីក្នុងការការពារ API?",
    type: "concept",
    codeLanguage: "javascript",
    summary: `**Data Validation** គឺជាដំណើរការត្រួតពិនិត្យ និងធានាថាទិន្នន័យដែល Client បញ្ជូនមក Server (Request Body, Query, ឬ Params) មានទម្រង់ត្រឹមត្រូវ ស្របតាមក្បួនច្បាប់ (Rules) និងមានសុវត្ថិភាព មុនពេលទៅដល់ Controller ឬ Database។

អត្ថប្រយោជន៍ចម្បងៗ៖
* ការពារប្រព័ន្ធពី Invalid Data ដែលអាចធ្វើឱ្យ Application Crash
* ការពារការវាយប្រហារ (Security Attacks) ដូចជា NoSQL Injection, XSS, និង Malformed Payloads
* ផ្តល់នូវ Feedback ច្បាស់លាស់ដល់អ្នកប្រើប្រាស់នៅពេលបំពេញ Form មិនត្រឹមត្រូវ`,
    codeSnippet: `// Concept: Request passes through Validation Guard before hitting Controller!
// Incoming Request ➔ [ Validation Middleware ] ➔ [ Controller ] ➔ [ Service ]
//                           │ (Invalid input?)
//                           ▼
//                  400 Bad Request Envelope!`,
  },
  {
    id: "M14-02",
    number: "02",
    title: "Client vs Server Validation",
    khmerTitle: "ភាពខុសគ្នារវាង Client-Side និង Server-Side Validation",
    type: "concept",
    codeLanguage: "javascript",
    summary: `ការប្រៀបធៀបរវាង Client-Side និង Server-Side Validation៖

* **Client-Side Validation (Frontend)**៖
  * ផ្តោតលើ **User Experience (UX)** (ផ្តល់ Feedback រហ័សពេល User កំពុងវាយ)
  * **គ្មានសុវត្ថិភាពឡើយ** — Attackers អាច Bypass Client-side validation ដោយងាយតាមរយៈ Postman ឬ cURL!
* **Server-Side Validation (Backend)**៖
  * ផ្តោតលើ **Security & Data Integrity**
  * ជារនាំងការពារចុងក្រោយដែលមិនអាច Bypass បានឡើយ`,
    codeSnippet: `/* Comparison Summary:
   -------------------------------------------------------------
   Client-Side Validation (React / Next.js)  ➔ For Instant UX
   Server-Side Validation (Express + Zod)    ➔ For True Security
   -------------------------------------------------------------
*/`,
  },
  {
    id: "M14-03",
    number: "03",
    title: "Schema-Based Validation",
    khmerTitle: "មូលហេតុដែលត្រូវប្រើ Schema Validation ជំនួស if/else",
    type: "concept",
    codeLanguage: "javascript",
    summary: `ការសរសេរ \`if/else\` ដោយដៃដើម្បី Validate រាល់ Properties ក្នុង Controller គឺជា Anti-Pattern (ពិបាកអាន ងាយនឹងភ្លេច Check និងស្ទួនកូដច្រើនកន្លែង)។

**Schema-Based Validation** ផ្តល់នូវដំណោះស្រាយដ៏អស្ចារ្យ៖
* កំណត់ច្បាប់ទិន្នន័យទាំងអស់ជា Declarative Schema តែមួយ
* បំបែក Logic នៃការត្រួតពិនិត្យទៅជា Reusable Middleware
* Auto-generate Error Messages ដែលមានរចនាសម្ព័ន្ធច្បាស់លាស់`,
    codeSnippet: `// ❌ Manual If/Else checks (Messy & error-prone):
// if (!req.body.title) return res.status(400).send("Title required");
// if (typeof req.body.price !== "number") return res.status(400).send("Invalid price");

// ✅ Declarative Schema Validation:
// courseValidationSchema.parse(req.body); // One clean line does it all!`,
  },
  {
    id: "M14-04",
    number: "04",
    title: "Introduction to Zod",
    khmerTitle: "ការស្វែងយល់ពីបណ្ណាល័យ Zod",
    type: "concept",
    codeLanguage: "javascript",
    summary: `**Zod** គឺជាបណ្ណាល័យ TypeScript/JavaScript Schema Declaration និង Validation ដ៏ពេញនិយមបំផុតនាពេលបច្ចុប្បន្ន។

ហេតុអ្វី Zod លេចធ្លោជាងគេ៖
* **Zero Dependencies** និងទំហំស្រាលខ្លាំង
* **Type Inference** ដ៏អស្ចារ្យ (អាចទាញយក Types ចេញពី Schema ដោយស្វ័យប្រវត្តិ)
* **Composable & Chainable** API (ងាយស្រួលសរសេរ \`z.string().min(5).max(100)\`)
* គាំទ្រទាំង Node.js, Express, React, និង Next.js`,
    codeSnippet: `# Install Zod library
npm install zod`,
  },
  {
    id: "M14-05",
    number: "05",
    title: "Defining Schemas with Zod",
    khmerTitle: "ការបង្កើត Course Schema ជាមួយ Zod (z.object)",
    type: "lab",
    codeLanguage: "javascript",
    summary: `ការបង្កើត Schema សម្រាប់ **Course Creation** ក្នុង Course API របស់យើង៖

ច្បាប់កំណត់ (Rules)៖
* \`title\`៖ String, ប្រវែងយ៉ាងតិច ៥ តួអក្សរ, អតិបរមា ១០០ តួអក្សរ
* \`price\`៖ Number វិជ្ជមាន (\`z.number().min(0)\`)
* \`level\`៖ Enum (\`"beginner"\`, \`"intermediate"\`, \`"advanced"\`)
* \`published\`៖ Boolean (Optional)`,
    codeSnippet: `// src/validations/course.validation.js
import { z } from "zod";

// Step 1: Define Course Creation Validation Schema
export const createCourseSchema = z.object({
  title: z
    .string({ required_error: "Course title is required" })
    .trim()
    .min(5, "Title must be at least 5 characters long")
    .max(100, "Title cannot exceed 100 characters"),
  instructor: z
    .string({ required_error: "Instructor name is required" })
    .trim()
    .min(2, "Instructor name must be at least 2 characters"),
  price: z
    .number({ required_error: "Price is required" })
    .min(0, "Price cannot be negative"),
  level: z
    .enum(["beginner", "intermediate", "advanced"], {
      errorMap: () => ({ message: "Level must be beginner, intermediate, or advanced" })
    })
    .default("beginner"),
  published: z.boolean().optional().default(false)
});`,
  },
  {
    id: "M14-06",
    number: "06",
    title: "Validating Request Body",
    khmerTitle: "ការត្រួតពិនិត្យ Request Body ជាមួយ Zod parse()",
    type: "lab",
    codeLanguage: "javascript",
    summary: `Zod ផ្តល់នូវ Methods ពីរសម្រាប់ធ្វើ Validation៖

1. **\`schema.parse(data)\`**៖ ប្រសិនបើទិន្នន័យត្រឹមត្រូវ ត្រឡប់ Parsed Data; ប្រសិនបើខុស នឹង **Throw ZodError** ភ្លាមៗ
2. **\`schema.safeParse(data)\`**៖ មិន Throw Error ទេ ប៉ុន្តែត្រឡប់ Object \`{ success: true, data }\` ឬ \`{ success: false, error }\``,
    codeSnippet: `import { createCourseSchema } from "./validations/course.validation.js";

// Test parsing with safeParse
const testPayload = {
  title: "Node API",
  instructor: "Ratha",
  price: -10 // Invalid price!
};

const result = createCourseSchema.safeParse(testPayload);

if (!result.success) {
  console.log("❌ Validation failed with issues:");
  console.log(result.error.issues);
} else {
  console.log("✅ Valid data:", result.data);
}`,
  },
  {
    id: "M14-07",
    number: "07",
    title: "Validating Request Params (MongoDB ObjectId)",
    khmerTitle: "ការ Validate Route Parameters និង MongoDB ObjectId",
    type: "lab",
    codeLanguage: "javascript",
    summary: `នៅពេល Client ហៅ Endpoint ដូចជា \`/api/v1/courses/:id\` ប្រសិនបើ Client បញ្ជូន ID មិនត្រឹមត្រូវ (ដូចជា \`/courses/abc\`) MongoDB នឹងបោះកំហុស **CastError**។

យើងអាច Validate \`req.params.id\` ជាមុនដោយប្រើ Zod Regex ផ្ទៀងផ្ទាត់ **24 Hexadecimal Characters** នៃ MongoDB ObjectId៖
\`z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId")\``,
    codeSnippet: `import { z } from "zod";

// Step 1: Define MongoDB ObjectId Validator Schema
export const mongoIdParamSchema = z.object({
  id: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId parameter format")
});

// Step 2: Test validation
const testParam = { id: "6648e58319f3a9e224e78891" }; // Valid 24 hex chars
const check = mongoIdParamSchema.safeParse(testParam);
console.log("Is valid ObjectId?", check.success); // true`,
  },
  {
    id: "M14-08",
    number: "08",
    title: "Validating Query Parameters",
    khmerTitle: "ការ Validate Query Parameters (Page, Limit, Sort)",
    type: "lab",
    codeLanguage: "javascript",
    summary: `Query Parameters ក្នុង \`req.query\` គឺតែងតែជា **Strings**។

Zod អនុញ្ញាតឱ្យយើងធ្វើទាំង **Type Coercion (បំប្លែង String ទៅជា Number)** និង **Validation** ក្នុងពេលតែមួយ៖
* \`z.coerce.number().min(1).default(1)\` សម្រាប់ \`page\`
* \`z.coerce.number().min(1).max(50).default(10)\` សម្រាប់ \`limit\``,
    codeSnippet: `import { z } from "zod";

export const courseQuerySchema = z.object({
  // 💡 z.coerce converts incoming URL String "?page=2" into Number 2!
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(10),
  level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  sort: z.string().optional()
});`,
  },
  {
    id: "M14-09",
    number: "09",
    title: "Generic Validation Middleware Factory",
    khmerTitle: "ការបង្កើត Validation Middleware Factory ប្រើបានគ្រប់ Endpoints",
    type: "lab",
    codeLanguage: "javascript",
    summary: `ការបង្កើត **Generic Validation Middleware Factory (\`validate\`)** ដែលអាច Validate ទាំង \`body\`, \`params\`, និង \`query\` ក្នុង Middleware តែមួយ៖

របៀបប្រើប្រាស់៖
\`\`\`javascript
router.post("/", validate({ body: createCourseSchema }), createCourse);
router.get("/:id", validate({ params: mongoIdParamSchema }), getCourseById);
\`\`\``,
    codeSnippet: `// src/middlewares/validate.middleware.js
export const validate = (schemas) => (req, res, next) => {
  try {
    // 1. Validate Body if schema provided
    if (schemas.body) {
      req.body = schemas.body.parse(req.body);
    }
    // 2. Validate Params if schema provided
    if (schemas.params) {
      req.params = schemas.params.parse(req.params);
    }
    // 3. Validate Query if schema provided
    if (schemas.query) {
      req.query = schemas.query.parse(req.query);
    }
    next(); // All valid!
  } catch (error) {
    // Pass ZodError to next(err) -> handled by centralized error middleware!
    next(error);
  }
};`,
  },
  {
    id: "M14-10",
    number: "10",
    title: "Formatting Validation Error Envelopes",
    khmerTitle: "ការរៀបចំទម្រង់ Error Response ចេញពី Zod Errors",
    type: "lab",
    codeLanguage: "javascript",
    summary: `នៅពេលដែល Validation បរាជ័យ Zod នឹង Throw \`ZodError\` ដែលផ្ទុកនូវ Array នៃ Issues។

យើងត្រូវបំប្លែង Zod Issues ទាំងនោះឱ្យក្លាយជា **Standard Error Envelope** ដ៏ស្អាត៖
\`\`\`json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed for course creation",
    "details": [
      { "field": "price", "message": "Price cannot be negative" }
    ]
  }
}
\`\`\``,
    codeSnippet: `import { ZodError } from "zod";

// Helper to format Zod errors into a clean array
export const formatZodErrors = (zodError) => {
  return zodError.issues.map(issue => ({
    field: issue.path.join("."),
    message: issue.message
  }));
};

// Example in centralized error handler:
// if (err instanceof ZodError) {
//   return res.status(400).json({
//     success: false,
//     error: {
//       code: "VALIDATION_ERROR",
//       message: "Invalid request payload",
//       details: formatZodErrors(err)
//     }
//   });
// }`,
  },
  {
    id: "M14-11",
    number: "11",
    title: "Data Sanitization & Stripping Unknown Fields",
    khmerTitle: "ការធ្វើ Data Sanitization និងការលុបចោល Unknown Fields",
    type: "concept",
    codeLanguage: "javascript",
    summary: `**Data Sanitization** គឺជាការសម្អាតទិន្នន័យចូល ដើម្បីលុបបំបាត់ Code ឬ Fields ដែលមិនគួរមាន៖

លក្ខណៈសំខាន់ៗ៖
1. **Stripping Unknown Keys**៖ Zod ធ្វើការ Strip រាល់ Fields ដែលមិនមានចែងក្នុង Schema ដោយស្វ័យប្រវត្តិកំឡុងពេល \`parse()\` (ការពារ Mass Assignment Attack)
2. **String Trimming**៖ លុប Blank Spaces ខាងដើម និងខាងចុង
3. **Escaping HTML/Scripts**៖ ការពារ Stored XSS Attacks មុនពេលរក្សាទុកទៅក្នុង MongoDB`,
    codeSnippet: `import { z } from "zod";

const courseSchema = z.object({
  title: z.string().trim(),
  price: z.number().min(0)
}); // By default in "strip" mode!

// Attacker tries to inject extra fields:
const maliciousPayload = {
  title: "  Mastering Express Security  ",
  price: 49.99,
  isAdmin: true, // ⚠️ Injected unauthorized property!
  role: "superadmin"
};

const cleanData = courseSchema.parse(maliciousPayload);

console.log("Sanitized & Stripped Output:", cleanData);
// Output: { title: "Mastering Express Security", price: 49.99 }
// (Injected fields are completely stripped out!)`,
  },
];
