/**
 * m10.mjs - Module 10: Controllers & Services (10 topics)
 * Domain: Course Catalog API (Enterprise 3-Tier Architecture Refactoring)
 */

export const M10 = [
  {
    id: "M10-01",
    number: "01",
    title: "Why Separate Business Logic?",
    khmerTitle: "ហេតុអ្វីត្រូវបំបែក Business Logic ចេញពី Controller?",
    type: "concept",
    codeLanguage: "javascript",
    summary: `នៅក្នុងគម្រោងដំបូងៗ អ្នកបង្កើតកម្មវិធីច្រើនតែសរសេរអ្វីៗទាំងអស់ (Validation, Database Queries, Email Sending, Payment Calculations) បញ្ចូលគ្នាក្នុង Route Callback តែមួយ — នេះហៅថា **"Fat Controller"** ឬ **Spaghetti Code**។

ផលប៉ះពាល់អវិជ្ជមាននៃ Fat Controller៖
* **ពិបាក Test (Untestable)**៖ អ្នកត្រូវ Mock ទាំង \`req\` និង \`res\` ទើបអាច Test Logic បាន
* **មិនអាចប្រើឡើងវិញបាន (Non-reusable)**៖ មិនអាចហៅ Logic ដដែលនោះពី Background Job ឬ CLI Tool បានឡើយ
* **ពិបាក Maintain**៖ ឯកសារមួយមានកូដរាប់ពាន់ជួរ ងាយនឹងបង្កើត Bugs

**ដំណោះស្រាយ**៖ បែងចែកជា ៣ ស្រទាប់ (3-Tier Architecture)៖ **Routes ➔ Controllers ➔ Services**។`,
    tip: "ច្បាប់មាសនៃ Clean Architecture៖ Controller គួរតែ 'ស្គម' (Slim Controller) ហើយ Service គួរតែ 'សម្បូរបែប' (Rich Service)។",
    objective: "យល់ដឹងពីគុណវិបត្តិនៃ Fat Controllers និងគុណសម្បត្តិនៃ 3-Tier Architecture។",
    expectedOutcome: "មានផ្នត់គំនិតស្ថាបត្យកម្មច្បាស់លាស់ក្នុងការបំបែកកូដឱ្យមានរបៀបរៀបរយ។",
    codeSnippet: `// ❌ ANTI-PATTERN: Fat Controller (Everything mixed together!)
app.post("/api/v1/courses/:id/enroll", async (req, res) => {
  // 1. Validation mixed in
  if (!req.body.studentId) return res.status(400).send();
  // 2. Direct MongoDB model query mixed in (Anti-pattern in controller)
  const course = await Course.findById(req.params.id);
  // 3. Discount calculation mixed in
  const price = course.price * 0.9;
  // 4. Payment processing mixed in
  await stripe.charges.create({ amount: price });
  // 5. Email receipt mixed in
  await mailer.sendReceipt();
  // 6. Response sending
  res.json({ enrolled: true });
});

// ✅ SOLUTION: Slim Controller (Orchestrator) + Rich Service (Business Logic)
`,
  },
  {
    id: "M10-02",
    number: "02",
    title: "Controllers (Request Orchestrators)",
    khmerTitle: "តួនាទី និងទំនួលខុសត្រូវរបស់ Controllers",
    type: "concept",
    codeLanguage: "javascript",
    summary: `**Controller** ដើរតួជា **Request Orchestrator (អ្នកសម្របសម្រួល HTTP)**៖

តួនាទីតែមួយគត់របស់ Controller៖
1. **Unpack HTTP Request**៖ ទាញយកទិន្នន័យពី \`req.body\`, \`req.params\`, \`req.query\`
2. **Delegate to Service**៖ បញ្ជូនទិន្នន័យទាំងនោះទៅឱ្យ Service Function ដំណើរការ
3. **Pack HTTP Response**៖ ទទួលលទ្ធផលពី Service រួចបញ្ជូនទៅកាន់ Client ជាមួយ Status Code សមស្រប (\`200\`, \`201\`)

Controller មិនត្រូវមាន Business Logic, MongoDB Queries ដោយផ្ទាល់ ឬ Payment Code ឡើយ!`,
    tip: "ប្រសិនបើអ្នកឃើញ Controller របស់អ្នកមានកូដច្រើនជាង ១៥-២០ ជួរ នោះមានន័យថាអ្នកកំពុងដាក់ Business Logic ខុសកន្លែងហើយ — ត្រូវរើវាទៅកាន់ Service វិញ។",
    objective: "ចេះសរសេរ Slim Controller ដែលផ្តោតតែលើ HTTP Orchestration។",
    expectedOutcome: "Controller មានភាពសាមញ្ញ ងាយស្រួលអាន និងស្អាត។",
    codeSnippet: `// src/controllers/course.controller.js
import * as courseService from "../services/course.service.js";

// Step 1: Slim Controller Handler for Fetching Courses
export const getAllCourses = async (req, res, next) => {
  try {
    // 1. Extract query parameters
    const { level, maxPrice } = req.query;

    // 2. Delegate purely to service layer
    const courses = await courseService.findAllCourses({ level, maxPrice });

    // 3. Send standard HTTP response
    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    next(error); // Forward to centralized error middleware!
  }
};`,
  },
  {
    id: "M10-03",
    number: "03",
    title: "Services (Pure Business Logic)",
    khmerTitle: "តួនាទី និងទំនួលខុសត្រូវរបស់ Service Layer",
    type: "concept",
    codeLanguage: "javascript",
    summary: `**Service Layer** គឺជាបេះដូងនៃ Application ដែលផ្ទុកនូវ **Business Rules និង Domain Logic ទាំងអស់**។

លក្ខណៈសម្បត្តិនៃ Service Function ល្អ៖
* **Pure JavaScript Functions**៖ ទទួល Pure Input (Objects, Strings, Numbers) និង Return Pure Output
* **គ្មានការពាក់ព័ន្ធនឹង HTTP**៖ មិនដែលឃើញពាក្យ \`req\` ឬ \`res\` ក្នុង Service ឡើយ
* **Throw Custom Domain Errors**៖ បោះកំហុស \`AppError\` នៅពេលខុសលក្ខខណ្ឌ Business Rule
* **100% Testable**៖ អាចសរសេរ Unit Test បានយ៉ាងងាយស្រួលដោយមិនបាច់ប្រើ Express ឬ Supertest!`,
    tip: "ច្បាប់តឹងរ៉ឹង៖ កុំ Import `express` ឬ Pass `req` ឬ `res` ចូលទៅក្នុង Service Layer ឱ្យសោះ!",
    objective: "ចេះបង្កើត Service Layer ដែលឯករាជ្យពី HTTP Framework។",
    expectedOutcome: "Business Logic មានភាពស្អាត អាចសាកល្បងដោយ Unit Tests បានយ៉ាងងាយស្រួល។",
    codeSnippet: `// src/services/course.service.js

// Simulated database data store
const courses = [
  { id: 1, title: "Modern JavaScript", price: 29.99, level: "beginner" },
  { id: 2, title: "Full-Stack Express", price: 49.99, level: "advanced" }
];

// Step 1: Pure Business Logic Service function (No req, no res!)
// 💡 Teaching Note: In Modules 11-13, this queries MongoDB via Mongoose Model:
// export const findAllCourses = async (filters = {}) => await Course.find(filters);
export const findAllCourses = async (filters = {}) => {
  let result = [...courses];

  if (filters.level) {
    result = result.filter(c => c.level === filters.level);
  }
  if (filters.maxPrice) {
    result = result.filter(c => c.price <= Number(filters.maxPrice));
  }

  return result;
};

// Step 2: Create Course Service with business validation
// 💡 Teaching Note: With MongoDB, this delegates to: await Course.create(courseData);
export const createCourse = async (courseData) => {
  if (courseData.price < 0) {
    throw new Error("Course price cannot be negative");
  }

  const newCourse = {
    id: courses.length + 1,
    ...courseData,
    createdAt: new Date().toISOString()
  };

  courses.push(newCourse);
  return newCourse;
};`,
  },
  {
    id: "M10-04",
    number: "04",
    title: "Routes (Declarative Route Mapping)",
    khmerTitle: "តួនាទីនៃ Route Definitions (Declarative Wiring)",
    type: "concept",
    codeLanguage: "javascript",
    summary: `នៅក្នុង 3-Tier Architecture ឯកសារ **Routes** គ្រាន់តែជាកន្លែង **Wiring (ភ្ជាប់ខ្សែរវាង URL, Middleware, និង Controller)** ប៉ុណ្ណោះ។

វាមិនផ្ទុក Logic ណាមួយឡើយ ក្រៅពីការប្រកាសយ៉ាងច្បាស់លាស់ (Declarative Syntax)៖
\`\`\`javascript
router.get("/:id", authGuard, courseController.getCourseById);
\`\`\`

រចនាសម្ព័ន្ធបែបនេះជួយឱ្យអ្នកណាក៏ដោយដែលបើកមើលឯកសារ Routes អាចយល់បានភ្លាមៗក្នុងរយៈពេល ៥ វិនាទីពី Endpoints ទាំងអស់នៃ Module។`,
    tip: "រក្សាឯកសារ Route ឱ្យខ្លី និងស្អាត។ វាមិនគួរមាន Callback Function លើសពី ៣ ជួរឡើយ។",
    objective: "ចេះរៀបចំ Route File ឱ្យមានលក្ខណៈ Declarative និងច្បាស់លាស់។",
    expectedOutcome: "Routes ដើរតួជាផែនទីបង្ហាញផ្លូវដ៏ស្អាតនៃ Application API។",
    codeSnippet: `// src/routes/course.routes.js
import express from "express";
import * as courseController from "../controllers/course.controller.js";

const router = express.Router();

// Step 1: Wire endpoints directly to controller methods
router.route("/")
  .get(courseController.getAllCourses)
  .post(courseController.createCourse);

router.route("/:id")
  .get(courseController.getCourseById)
  .put(courseController.updateCourse)
  .delete(courseController.deleteCourse);

export default router;`,
  },
  {
    id: "M10-05",
    number: "05",
    title: "Separation of Concerns (3-Tier)",
    khmerTitle: "ការបែងចែកទំនួលខុសត្រូវ (Separation of Concerns) តាម 3 ស្រទាប់",
    type: "architecture",
    codeLanguage: "javascript",
    summary: `ស្ថាបត្យកម្ម **Separation of Concerns (SoC)** ចែកចេញជា ៣ ស្រទាប់ច្បាស់លាស់៖

1. **Routing Layer (\`routes/\`)**៖
   * កំណត់ HTTP Method & URL Path
   * ភ្ជាប់ Middlewares (Auth, Validation)
2. **Controller Layer (\`controllers/\`)**៖
   * Unpack HTTP Request (\`req.body\`, \`req.params\`)
   * Pack HTTP Response (\`res.status(200).json()\`)
   * ដោះស្រាយ HTTP Status Codes
3. **Service Layer (\`services/\`)**៖
   * ផ្ទុក Business Logic, Calculations, Security Rules
   * ទំនាក់ទំនងជាមួយ MongoDB Database (Mongoose Models)`,
    tip: "ប្រសិនបើថ្ងៃក្រោយអ្នកចង់ប្តូរពី Express ទៅ Fastify ឬ Nest.js អ្នកគ្រាន់តែកែ Controller ប៉ុណ្ណោះ ចំណែក Service Layer ទាំងមូលនៅតែអាចប្រើប្រាស់បានដដែល ១០០%!",
    objective: "យល់ច្បាស់ពីលំហូរការងារ និងព្រំដែនទំនួលខុសត្រូវនៃស្រទាប់នីមួយៗ។",
    expectedOutcome: "សមត្ថភាពរចនា Codebase តាមស្តង់ដារស្ថាបត្យកម្មកម្រិតខ្ពស់។",
    codeSnippet: `/*
  ==============================================================
  DATA FLOW IN 3-TIER ARCHITECTURE (Node + Express + MongoDB):
  ==============================================================
  Client Request (HTTP GET /api/v1/courses)
        │
        ▼
  [ 1. Routing Layer ]        --> Matches URL, applies middlewares
        │
        ▼
  [ 2. Controller Layer ]     --> Extracts req.query, orchestrates
        │
        ▼
  [ 3. Service Layer ]        --> Executes business rules & calls Mongoose
        │
        ▼
  [ 4. MongoDB Database ]     --> Returns BSON Documents via Model.find()
        │
        ▲ (Data flows back up cleanly)
        │
  Client Response (JSON 200 OK)
  ==============================================================
*/`,
  },
  {
    id: "M10-06",
    number: "06",
    title: "Controller-Service Integration",
    khmerTitle: "ការរួមបញ្ចូល Controller និង Service ក្នុង Course Enrollment Workflow",
    type: "architecture",
    codeLanguage: "javascript",
    summary: `អនុវត្តជាក់ស្តែងនូវ **Complete Course Enrollment Workflow** ដោយរួមបញ្ចូលគ្នារវាង Controller និង Service៖

1. **Student ស្នើសុំចុះឈ្មោះចូលរៀន** (\`POST /courses/:id/enroll\`)
2. **Controller**៖ ដកស្រង់ \`courseId\` និង \`studentId\` ពី Request រួចបញ្ជូនទៅកាន់ Service
3. **Service**៖
   * ពិនិត្យថាតើ Course មានពិតមែនឬអត់
   * ពិនិត្យថាតើ Course ពេញហើយឬនៅ
   * គណនាតម្លៃបញ្ចុះតម្លៃ (Discount)
   * បញ្ចូលឈ្មោះ Student ទៅក្នុងបញ្ជី
4. **Controller**៖ ទទួលលទ្ធផលជោគជ័យ រួចឆ្លើយតប \`200 OK\` ជាមួយ Enrollment Receipt`,
    tip: "ការបំបែកបែបនេះធ្វើឱ្យកូដងាយស្រួលពន្យល់សិស្សជាជំហានៗ៖ ជំហានទី ១ (HTTP), ជំហានទី ២ (Logic), ជំហានទី ៣ (Result)។",
    objective: "ចេះសរសេរ Integration ពេញលេញរវាង Controller និង Service លើ Real-world Feature។",
    expectedOutcome: "បង្កើត Feature ដែលមានស្ថាបត្យកម្មស្អាត និងងាយស្រួលពង្រីក។",
    codeSnippet: `// 1. IN SERVICE (src/services/enrollment.service.js):
export const enrollStudentInCourse = async (courseId, student) => {
  // Business Rule 1: Validate course exists
  const course = await getCourseById(courseId);
  if (!course) throw new Error("Course not found");

  // Business Rule 2: Calculate pricing with student discount
  const finalPrice = student.isScholarship ? course.price * 0.5 : course.price;

  // Business Rule 3: Record enrollment
  const enrollment = {
    id: Date.now(),
    courseId,
    studentId: student.id,
    amountPaid: finalPrice,
    enrolledAt: new Date().toISOString()
  };

  return enrollment;
};

// 2. IN CONTROLLER (src/controllers/enrollment.controller.js):
export const handleEnrollment = async (req, res, next) => {
  try {
    const courseId = Number(req.params.id);
    const enrollment = await enrollStudentInCourse(courseId, req.user);
    res.status(201).json({ success: true, data: enrollment });
  } catch (err) {
    next(err);
  }
};`,
  },
  {
    id: "M10-07",
    number: "07",
    title: "Reusable Business Logic Across Contexts",
    khmerTitle: "ការសរសេរ Business Logic ដែលអាចប្រើឡើងវិញបានគ្រប់ Contexts",
    type: "lab",
    codeLanguage: "javascript",
    summary: `អត្ថប្រយោជន៍ដ៏អស្ចារ្យបំផុតនៃ Service Layer គឺ **Reusability (ការប្រើឡើងវិញ)**។

អនុគមន៍ \`generateCourseReport()\` នៅក្នុង Service អាចត្រូវបានហៅប្រើប្រាស់ដោយ៖
1. **Express HTTP Controller** (ពេល Admin ចុចមើលរបាយការណ៍លើ Dashboard)
2. **Scheduled Cron Job** (ផ្ញើ Email សង្ខេបរបាយការណ៍រៀងរាល់យប់ម៉ោង ១២)
3. **CLI Script / Seed Command** (ពេល Developer ដំណើរការតាម Terminal)`,
    tip: "ប្រសិនបើ Logic នោះស្ថិតនៅក្នុង Controller នោះ Cron Job ឬ CLI Tool នឹងមិនអាចហៅវាប្រើបានឡើយ ព្រោះគ្មាន `req` និង `res`!",
    objective: "យល់ច្បាស់ពីមូលហេតុដែល Service Logic ត្រូវតែឯករាជ្យពី HTTP Layer។",
    expectedOutcome: "ចេះបង្កើត Service Functions ដែលអាចហៅប្រើបានពីច្រើន Contexts (API, CLI, Cron)។",
    codeSnippet: `// src/services/course.service.js
export const calculateCourseMetrics = (courses) => {
  const totalRevenue = courses.reduce((sum, c) => sum + (c.price * (c.enrolledCount || 0)), 0);
  const totalStudents = courses.reduce((sum, c) => sum + (c.enrolledCount || 0), 0);
  return { totalRevenue, totalStudents, averagePrice: totalRevenue / (totalStudents || 1) };
};

// 💡 Teaching Note: Context 1: Express Controller
// export const getMetricsController = (req, res) => {
//   const metrics = calculateCourseMetrics(courses);
//   res.json({ success: true, data: metrics });
// };

// 💡 Teaching Note: Context 2: Daily Scheduled Cron Job
// cron.schedule("0 0 * * *", () => {
//   const metrics = calculateCourseMetrics(courses);
//   sendDailyReportEmail("admin@school.com", metrics);
// });`,
  },
  {
    id: "M10-08",
    number: "08",
    title: "Error Handling in Service Layer (AppError)",
    khmerTitle: "ការគ្រប់គ្រងកំហុសក្នុង Service Layer តាមរយៈ AppError Class",
    type: "lab",
    codeLanguage: "javascript",
    summary: `នៅក្នុង Service Layer នៅពេលមានកំហុសផ្នែក Business Logic (ដូចជា រក Course មិនឃើញ ឬ Course ពេញ) យើងមិនត្រូវហៅ \`res.status(404).json()\` ឡើយ។

**ដំណោះស្រាយស្តង់ដារ**៖ បង្កើត Custom **\`AppError\`** Class ដែលពង្រីកពី \`Error\` ដើមរបស់ JavaScript ដោយបន្ថែម \`statusCode\` និង \`isOperational\` flag។

បន្ទាប់មក Service គ្រាន់តែ \`throw new AppError("Course not found", 404)\` ហើយ Centralized Error Middleware នឹងចាប់យកទៅចាត់ចែងដោយស្វ័យប្រវត្តិ។`,
    tip: "`isOperational: true` បញ្ជាក់ថានេះជាកំហុសដែលយើងបានដឹងមុន (Expected Error ដូចជា Input ខុស ឬ NotFound) មិនមែនជា Bug បច្ចេកទេសដែលធ្វើឱ្យ Server Crash ឡើយ។",
    objective: "ចេះបង្កើត Custom AppError Class និង Throw ចេញពី Service Layer។",
    expectedOutcome: "ប្រព័ន្ធ Error Handling មានភាពស្អាត គ្មាន Try/Catch ស្ទួនៗក្នុងគ្រប់ Controller។",
    codeSnippet: `// Step 1: Enterprise Custom Application Error Class
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = \`\${statusCode}\`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; // Expected operational error
    Error.captureStackTrace(this, this.constructor);
  }
}

// Step 2: In Service Layer - Throw domain error cleanly!
export const getCourseById = (id, courses) => {
  const course = courses.find(c => c.id === id);
  if (!course) {
    throw new AppError(\`Course with ID \${id} does not exist\`, 404);
  }
  return course;
};

// Step 3: Controller simply passes error forward with asyncHandler!
// const course = getCourseById(req.params.id, courses);
// res.json({ success: true, data: course });`,
  },
  {
    id: "M10-09",
    number: "09",
    title: "Enterprise Project Organization",
    khmerTitle: "ការរៀបចំ Directory និងឯកសារ Controller-Service ក្នុងគម្រោងធំ",
    type: "architecture",
    codeLanguage: "bash",
    summary: `រចនាសម្ព័ន្ធ Folder ស្តង់ដារ Enterprise សម្រាប់ **Course Catalog API** បន្ទាប់ពី Refactoring ជាមួយ Controllers និង Services៖

* **src/routes/**៖ ផ្ទុកតែ Route Definitions
* **src/controllers/**៖ ផ្ទុក Controllers ដែលសម្របសម្រួល HTTP
* **src/services/**៖ ផ្ទុក Pure Business Logic
* **src/errors/**៖ ផ្ទុក \`AppError\` classes
* **src/middlewares/**៖ ផ្ទុក Auth, Validation, Logger, និង Central Error Handler`,
    tip: "អនុវត្តការដាក់ឈ្មោះឯកសារឱ្យស៊ីសង្វាក់គ្នា (Naming Consistency) ដូចជា `course.routes.js`, `course.controller.js`, និង `course.service.js` ដើម្បីងាយស្រួលស្វែងរក។",
    objective: "ចេះរៀបចំ Folder Structure សម្រាប់គម្រោងកម្រិត Enterprise។",
    expectedOutcome: "រចនាសម្ព័ន្ធឯកសារមានរបៀបរៀបរយ ស្របតាមឧស្សាហកម្ម Software Engineering។",
    codeSnippet: `course-catalog-api/
├── package.json
├── src/
│   ├── app.js                          # Express app configuration & middleware pipeline
│   ├── server.js                       # Server entry point (app.listen & shutdown)
│   ├── routes/
│   │   ├── index.js                    # Central API aggregator (/api/v1)
│   │   ├── course.routes.js            # Course endpoints mapping
│   │   └── lesson.routes.js            # Lesson endpoints mapping
│   ├── controllers/
│   │   ├── course.controller.js        # Slim HTTP controllers
│   │   └── lesson.controller.js
│   ├── services/
│   │   ├── course.service.js           # Reusable pure business logic
│   │   └── lesson.service.js
│   ├── errors/
│   │   └── AppError.js                 # Central domain error class
│   └── middlewares/
│       ├── auth.middleware.js          # requireAuth & restrictTo guards
│       ├── validate.middleware.js      # Input validators
│       └── error.middleware.js         # 4-parameter error handler`,
  },
  {
    id: "M10-10",
    number: "10",
    title: "Backend Architecture Best Practices",
    khmerTitle: "ការអនុវត្តស្ថាបត្យកម្មល្អបំផុតសម្រាប់ Enterprise Node.js Backend",
    type: "architecture",
    codeLanguage: "javascript",
    summary: `បញ្ជីត្រួតពិនិត្យស្ថាបត្យកម្ម (Architecture Review Checklist) សម្រាប់ Backend Engineers៖

1. **Separation of Concerns (SoC)**៖ Routes (HTTP mapping) ➔ Controllers (Orchestration) ➔ Services (Business Logic) ➔ Models (Data Access)
2. **Fail Fast & Validate Early**៖ ត្រួតពិនិត្យទិន្នន័យបញ្ចូលតាម Middleware មុនពេលទៅដល់ Controller
3. **Never Expose Sensitive Details**៖ លាក់ Stack Trace នៅលើ Production Environment
4. **Environment Isolation**៖ មិន Hardcode Secrets ឬ Ports (ប្រើប្រាស់ \`.env\`)
5. **Deterministic Testing**៖ សរសេរ Unit Tests លើ Service Layer និង Integration Tests (Supertest) លើ Endpoints`,
    tip: "នៅពេលដែលកូដក្នុងឯកសារមួយលើសពី ២០០-៣០០ ជួរ នោះជាសញ្ញាបញ្ជាក់ថាដល់ពេលត្រូវ Refactor និងបំបែកជា Services ឬ Utilities ហើយ។",
    objective: "ស្វែងយល់ពី Best Practices សំខាន់ៗសម្រាប់ការសរសេរ Backend ប្រកបដោយនិរន្តរភាព។",
    expectedOutcome: "មានសមត្ថភាពអភិវឌ្ឍ និងថែទាំ Enterprise Node.js/Express Backend ប្រកបដោយទំនុកចិត្ត។",
    codeSnippet: `/*
  ==============================================================
  ENTERPRISE NODE.JS ARCHITECTURE CHECKLIST:
  ==============================================================
  [x] 1. Layered Separation (Route -> Controller -> Service -> Model)
  [x] 2. Centralized Error Handling (Single 4-arg error middleware)
  [x] 3. Standard JSON Envelopes ({ success: true, data: ... })
  [x] 4. Defensive ReDoS Protection (Sanitized regex search)
  [x] 5. Safe Pagination (Bounded limits: default 10, max 50)
  [x] 6. Graceful Shutdown (SIGTERM/SIGINT server draining)
  [x] 7. Stateless Token Auth (Bearer JWT & RBAC guards)
  [x] 8. Automated Integration Tests (Supertest test runner)
  ==============================================================
*/`,
  },
];
