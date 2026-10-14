/**
 * m07.mjs - Module 07: Express Routing (14 topics)
 * Domain: Course Catalog API (CRUD, Router, Nested Routing)
 */

export const M07 = [
  {
    id: "M07-01",
    number: "01",
    title: "Basic Routes",
    khmerTitle: "ការបង្កើត Basic Routes និងរៀបចំ Data Store",
    type: "concept",
    codeLanguage: "javascript",
    summary: `នៅក្នុង Module 07 យើងបន្តអភិវឌ្ឍ **Course Catalog API** ដោយបង្កើតប្រព័ន្ធ Routing ពេញលេញ។

Routing អនុញ្ញាតឱ្យយើងបែងចែក Endpoint នីមួយៗតាម HTTP Method និង Path៖
* \`GET /api/v1/courses\` សម្រាប់ទាញយក Course ទាំងអស់
* \`POST /api/v1/courses\` សម្រាប់បង្កើត Course ថ្មី

កូដខាងក្រោមបង្កើត In-memory Courses Data Store គំរូសម្រាប់ប្រើប្រាស់បន្តពេញមួយ Module នេះ។`,
    codeSnippet: `import express from "express";
const app = express();
app.use(express.json());

// Step 1: In-memory Courses Data Store (Unified Domain)
const courses = [
  { id: 1, title: "JavaScript Mastery", instructor: "Ratha", price: 29.99, published: true },
  { id: 2, title: "Full-Stack Express API", instructor: "Dara", price: 49.99, published: true }
];

// Step 2: Basic Root and Courses Endpoints
app.get("/api/v1/courses", (req, res) => {
  res.status(200).json({ success: true, count: courses.length, data: courses });
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));`,
  },
  {
    id: "M07-02",
    number: "02",
    title: "GET Routes",
    khmerTitle: "ការបង្កើត GET Routes សម្រាប់ទាញយកទិន្នន័យ (All & By ID)",
    type: "lab",
    codeLanguage: "javascript",
    summary: `**GET Routes** ប្រើសម្រាប់អាន (Retrieve) ទិន្នន័យដោយមិនកែប្រែស្ថានភាព Server ឬ Database (Safe & Idempotent)។

មាន ២ ទម្រង់សំខាន់៖
1. **GET Collection** (\`/api/v1/courses\`)៖ ទាញយកបញ្ជី Course ទាំងអស់
2. **GET Single Resource** (\`/api/v1/courses/:id\`)៖ ទាញយក Course ជាក់លាក់មួយតាមរយៈ ID`,
    codeSnippet: `import express from "express";
const app = express();

const courses = [
  { id: 1, title: "JavaScript Mastery", price: 29.99 },
  { id: 2, title: "Full-Stack Express API", price: 49.99 }
];

// Step 1: GET All Courses (Collection)
app.get("/api/v1/courses", (req, res) => {
  return res.status(200).json({
    success: true,
    count: courses.length,
    data: courses
  });
});

// Step 2: GET Single Course by ID
app.get("/api/v1/courses/:id", (req, res) => {
  const courseId = Number(req.params.id);
  const course = courses.find(c => c.id === courseId);

  // ⚠️ If course not found -> Return 404
  if (!course) {
    return res.status(404).json({
      success: false,
      error: \`Course with ID \${courseId} not found\`
    });
  }

  // ✅ Found -> Return 200
  return res.status(200).json({ success: true, data: course });
});`,
  },
  {
    id: "M07-03",
    number: "03",
    title: "POST Routes",
    khmerTitle: "ការបង្កើត POST Routes សម្រាប់បញ្ចូល Course ថ្មី",
    type: "lab",
    codeLanguage: "javascript",
    summary: `**POST Routes** ទទួល JSON Payload ពី Client តាមរយៈ \`req.body\` ដើម្បីបង្កើត Resource ថ្មី។

លំដាប់លំដោយនៃការងារ (Workflow)៖
1. អាន \`req.body\`
2. ផ្ទៀងផ្ទាត់ (Validate) ថាតើមានទិន្នន័យចាំបាច់ដែរឬទេ (\`title\`, \`price\`)
3. បង្កើត Course Object ថ្មីជាមួយ Unique ID
4. បញ្ចូលទៅក្នុង Data Store និងត្រឡប់ Status Code \`201 Created\``,
    codeSnippet: `import express from "express";
const app = express();
app.use(express.json()); // Essential body parser!

const courses = [{ id: 1, title: "JavaScript Mastery", price: 29.99 }];

// Step 1: POST Endpoint to create a new Course
app.post("/api/v1/courses", (req, res) => {
  const { title, instructor, price } = req.body;

  // Step 2: Validate required fields
  if (!title || price === undefined) {
    return res.status(400).json({
      success: false,
      error: "Both 'title' and 'price' are required fields"
    });
  }

  // Step 3: Instantiate new Course with unique ID
  const newCourse = {
    id: courses.length + 1,
    title,
    instructor: instructor || "Unknown",
    price: Number(price),
    published: false,
    createdAt: new Date().toISOString()
  };

  // Step 4: Persist and respond with 201 Created
  courses.push(newCourse);
  return res.status(201).json({ success: true, data: newCourse });
});`,
  },
  {
    id: "M07-04",
    number: "04",
    title: "PUT Routes",
    khmerTitle: "ការបង្កើត PUT Routes សម្រាប់ជំនួស Course ចាស់ទាំងស្រុង",
    type: "lab",
    codeLanguage: "javascript",
    summary: `**PUT Route** ត្រូវបានប្រើសម្រាប់ **Full Replacement** នៃ Resource ដែលមានស្រាប់។

គោលការណ៍ PUT៖
* Client ត្រូវតែផ្ញើ Properties ទាំងអស់នៃ Resource មក
* រាល់ Fields ណាដែលមិនបានផ្ញើមក នឹងត្រូវលុបចោល ឬជំនួសដោយ Default Values
* ប្រសិនបើ Course ID មិនមានក្នុង Data Store អាចត្រឡប់ \`404 Not Found\` (ឬបង្កើតថ្មីតាម REST convention)`,
    codeSnippet: `import express from "express";
const app = express();
app.use(express.json());

let courses = [
  { id: 1, title: "JavaScript Mastery", instructor: "Ratha", price: 29.99, published: true }
];

// Step 1: PUT Endpoint to fully replace Course entity
app.put("/api/v1/courses/:id", (req, res) => {
  const courseId = Number(req.params.id);
  const index = courses.findIndex(c => c.id === courseId);

  if (index === -1) {
    return res.status(404).json({ success: false, error: "Course not found" });
  }

  const { title, instructor, price, published } = req.body;
  if (!title || price === undefined) {
    return res.status(400).json({ success: false, error: "Missing required fields for PUT" });
  }

  // Step 2: Completely replace existing course object
  const replacedCourse = {
    id: courseId,
    title,
    instructor: instructor || "Unknown",
    price: Number(price),
    published: Boolean(published)
  };

  courses[index] = replacedCourse;
  return res.status(200).json({ success: true, data: replacedCourse });
});`,
  },
  {
    id: "M07-05",
    number: "05",
    title: "PATCH Routes",
    khmerTitle: "ការបង្កើត PATCH Routes សម្រាប់កែប្រែទិន្នន័យមួយផ្នែក",
    type: "lab",
    codeLanguage: "javascript",
    summary: `**PATCH Route** ប្រើសម្រាប់ **Partial Update** នៃ Resource។

Client បញ្ជូនតែ Properties ណាដែលខ្លួនចង់កែប្រែប៉ុណ្ណោះ (ឧទាហរណ៍៖ កែប្រែតែ \`price\` ឬប្តូរ \`published: true\`) ដោយរក្សាទុក Fields ផ្សេងទៀតដដែល។

លំនាំនេះជាអ្វីដែលត្រូវបានប្រើប្រាស់ញឹកញាប់បំផុតក្នុង Production APIs។`,
    codeSnippet: `import express from "express";
const app = express();
app.use(express.json());

let courses = [
  { id: 1, title: "JavaScript Mastery", instructor: "Ratha", price: 29.99, published: false }
];

// Step 1: PATCH Endpoint for partial update
app.patch("/api/v1/courses/:id", (req, res) => {
  const courseId = Number(req.params.id);
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return res.status(404).json({ success: false, error: "Course not found" });
  }

  // Step 2: Partially update only provided fields
  // 💡 Teaching Note: Keep original values for omitted fields!
  if (req.body.title !== undefined) course.title = req.body.title;
  if (req.body.price !== undefined) course.price = Number(req.body.price);
  if (req.body.published !== undefined) course.published = Boolean(req.body.published);
  course.updatedAt = new Date().toISOString();

  return res.status(200).json({ success: true, data: course });
});`,
  },
  {
    id: "M07-06",
    number: "06",
    title: "DELETE Routes",
    khmerTitle: "ការបង្កើត DELETE Routes សម្រាប់លុប Course ចេញពីប្រព័ន្ធ",
    type: "lab",
    codeLanguage: "javascript",
    summary: `**DELETE Routes** ទទួលខុសត្រូវលើការលុប Resource ចេញពីប្រព័ន្ធ។

ស្តង់ដារ Response សម្រាប់ DELETE៖
* **\`204 No Content\`**៖ ប្រសិនបើ Server មិនបញ្ជូន Response Body មកវិញ (Standard REST)
* **\`200 OK\`**៖ ប្រសិនបើ Server ចង់បញ្ជូន Message បញ្ជាក់ ឬបញ្ជូន Deleted Resource មកវិញ`,
    codeSnippet: `import express from "express";
const app = express();

let courses = [
  { id: 1, title: "JavaScript Mastery", price: 29.99 },
  { id: 2, title: "Full-Stack Express API", price: 49.99 }
];

// Step 1: DELETE Endpoint by ID
app.delete("/api/v1/courses/:id", (req, res) => {
  const courseId = Number(req.params.id);
  const index = courses.findIndex(c => c.id === courseId);

  // ⚠️ If course does not exist -> Return 404
  if (index === -1) {
    return res.status(404).json({ success: false, error: "Course not found" });
  }

  // Step 2: Remove from array using splice
  const [deletedCourse] = courses.splice(index, 1);

  // Step 3: Respond with 200 OK + confirmation
  return res.status(200).json({
    success: true,
    message: "Course deleted successfully",
    data: deletedCourse
  });
});`,
  },
  {
    id: "M07-07",
    number: "07",
    title: "Route Parameters (:id)",
    khmerTitle: "ការទាញយក និង Validate Route Parameters ពី URL",
    type: "concept",
    codeLanguage: "javascript",
    summary: `**Route Parameters** គឺជា Named URL Segments ដែលចាប់ផ្តើមដោយសញ្ញាចុចពីរ \`:\` ដូចជា \`/courses/:id\` ឬ \`/courses/:courseId/reviews/:reviewId\`។

ចំនុចសំខាន់ៗដែលត្រូវដឹង៖
* តម្លៃក្នុង \`req.params\` គឺជា **String** ជានិច្ច (ទោះជា URL ជាលេខ \`/courses/123\` ក៏ដោយ)
* ត្រូវប្រើ \`Number(req.params.id)\` ដើម្បីបំប្លែងទៅជា Number មុននឹងស្វែងរកក្នុង Array ឬ Database
* ពិនិត្យ \`isNaN(id)\` ដើម្បីជៀសវាង Invalid Query`,
    codeSnippet: `import express from "express";
const app = express();

// Step 1: Route with Multiple Dynamic Parameters
app.get("/api/v1/courses/:courseId/instructors/:instructorName", (req, res) => {
  // 💡 Teaching Note: Everything in req.params is a String!
  const courseId = Number(req.params.courseId);
  const instructorName = req.params.instructorName;

  // Step 2: Validate ID is a legitimate number
  if (isNaN(courseId)) {
    return res.status(400).json({
      success: false,
      error: "Invalid Course ID parameter: must be a valid number"
    });
  }

  return res.status(200).json({
    success: true,
    requestedCourseId: courseId,
    requestedInstructor: instructorName
  });
});`,
  },
  {
    id: "M07-08",
    number: "08",
    title: "Query Parameters (?filter=value)",
    khmerTitle: "ការទាញយក Query Parameters សម្រាប់ Filtering និង Limits",
    type: "concept",
    codeLanguage: "javascript",
    summary: `**Query Parameters** គឺជា Key-Value pairs ដែលស្ថិតនៅខាងក្រោយសញ្ញាសួរ \`?\` ក្នុង URL (ឧ. \`/api/v1/courses?level=beginner&limit=2\`)។

Query Parameters ត្រូវបានប្រើប្រាស់សម្រាប់៖
* **Filtering** (\`?level=beginner\`)
* **Sorting** (\`?sort=price\`)
* **Pagination** (\`?page=1&limit=10\`)

Express ធ្វើការ Parse ពួកវាចូលទៅក្នុង \`req.query\` Object ដោយស្វ័យប្រវត្តិ។`,
    codeSnippet: `import express from "express";
const app = express();

const courses = [
  { id: 1, title: "Node.js Basics", level: "beginner", price: 29 },
  { id: 2, title: "Express Pro", level: "advanced", price: 59 },
  { id: 3, title: "Docker Containerization", level: "beginner", price: 39 }
];

// Step 1: Endpoint supporting ?level=... and ?maxPrice=...
app.get("/api/v1/courses", (req, res) => {
  let result = [...courses];
  const { level, maxPrice } = req.query;

  // Step 2: Apply filter by level
  if (level) {
    result = result.filter(c => c.level.toLowerCase() === level.toLowerCase());
  }

  // Step 3: Apply filter by maximum price
  if (maxPrice) {
    result = result.filter(c => c.price <= Number(maxPrice));
  }

  return res.status(200).json({
    success: true,
    count: result.length,
    data: result
  });
});`,
  },
  {
    id: "M07-09",
    number: "09",
    title: "Route Chaining with app.route()",
    khmerTitle: "ការរៀបចំកូដកុំឱ្យស្ទួនតាមរយៈ app.route()",
    type: "concept",
    codeLanguage: "javascript",
    summary: `នៅពេលដែល Route Path មួយគាំទ្រ HTTP Methods ច្រើន (ឧ. \`/api/v1/courses\` គាំទ្រទាំង GET និង POST) ការសរសេរ \`app.get()\` និង \`app.post()\` ដោយសរសេរ Path ដដែលៗអាចធ្វើឱ្យកូដមិនសូវស្អាត។

Express ផ្តល់ជូន **\`app.route(path)\`** ដែលអនុញ្ញាតឱ្យយើង Chain Methods ចូលគ្នាបាន៖
\`\`\`javascript
app.route("/api/v1/courses")
  .get(getCourses)
  .post(createCourse);
\`\`\``,
    codeSnippet: `import express from "express";
const app = express();
app.use(express.json());

const courses = [{ id: 1, title: "Express API Mastery" }];

// Step 1: Chain collection routes on /api/v1/courses
app.route("/api/v1/courses")
  .get((req, res) => {
    res.json({ success: true, count: courses.length, data: courses });
  })
  .post((req, res) => {
    const newCourse = { id: courses.length + 1, ...req.body };
    courses.push(newCourse);
    res.status(201).json({ success: true, data: newCourse });
  });

// Step 2: Chain item routes on /api/v1/courses/:id
app.route("/api/v1/courses/:id")
  .get((req, res) => res.json({ action: \`Get course \${req.params.id}\` }))
  .patch((req, res) => res.json({ action: \`Update course \${req.params.id}\` }))
  .delete((req, res) => res.status(204).send());`,
  },
  {
    id: "M07-10",
    number: "10",
    title: "express.Router()",
    khmerTitle: "ការបំបែក Routes ឱ្យមានលក្ខណៈ Modularity ជាមួយ express.Router()",
    type: "lab",
    codeLanguage: "javascript",
    summary: `**\`express.Router()\`** គឺជា Mini-Express Application ឯករាជ្យមួយដែលមានសមត្ថភាពគ្រប់គ្រង Middlewares និង Routing ផ្ទាល់ខ្លួន។

អត្ថប្រយោជន៍ចម្បង៖
* បំបែក Routes តាម Resource ទៅក្នុង Files ដាច់ដោយឡែកពីគ្នា (ឧ. \`course.routes.js\`, \`user.routes.js\`)
* ងាយស្រួល Mount ចូលទៅកាន់ Base App ជាមួយ Path Prefix
* ជួយកាត់បន្ថយទំហំឯកសារ \`app.js\` មិនឱ្យក្លាយជា Spaghetti Code`,
    codeSnippet: `// src/routes/course.routes.js
import express from "express";

// Step 1: Create isolated router instance
const router = express.Router();

const courses = [{ id: 1, title: "Enterprise Express Architecture" }];

// Step 2: Define routes relative to the mount point
router.get("/", (req, res) => {
  res.json({ success: true, data: courses });
});

router.get("/:id", (req, res) => {
  const course = courses.find(c => c.id === Number(req.params.id));
  if (!course) return res.status(404).json({ success: false, error: "Course not found" });
  res.json({ success: true, data: course });
});

// Step 3: Export router
export default router;`,
  },
  {
    id: "M07-11",
    number: "11",
    title: "Route Groups & Mounting",
    khmerTitle: "ការរៀបចំ Route Groups និងការ Mount ក្នុង app.js",
    type: "lab",
    codeLanguage: "javascript",
    summary: `បន្ទាប់ពីបានបង្កើត Router តាម Modules រួចហើយ ជំហានបន្ទាប់គឺ **Mounting** ពួកវាចូលទៅកាន់ \`app.js\` ដោយប្រើប្រាស់ \`app.use(prefix, router)\`។

ឧទាហរណ៍៖
* \`app.use("/api/v1/courses", courseRouter)\`
* \`app.use("/api/v1/users", userRouter)\`

រាល់ Route ទាំងអស់នៅក្នុង \`courseRouter\` នឹងទទួលបាន Prefix \`/api/v1/courses\` ដោយស្វ័យប្រវត្តិ។`,
    codeSnippet: `// src/app.js
import express from "express";
import courseRouter from "./routes/course.routes.js";

const app = express();
app.use(express.json());

// Step 1: Mount Route Groups with clean API prefixes
// 💡 Teaching Note: All routes in courseRouter become prefixed with /api/v1/courses
app.use("/api/v1/courses", courseRouter);

// Step 2: Catch-all 404 Route Handler for undefined endpoints
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: \`Endpoint \${req.method} \${req.originalUrl} does not exist\`
  });
});

export default app;`,
  },
  {
    id: "M07-12",
    number: "12",
    title: "Nested Routes (mergeParams)",
    khmerTitle: "ការបង្កើត Nested Routes សម្រាប់ Parent-Child Relationships",
    type: "lab",
    codeLanguage: "javascript",
    summary: `នៅក្នុងពិភពពិត Resources ច្រើនតែមានទំនាក់ទំនង **Parent-Child (Hierarchical Relationship)** ជាមួយគ្នា។ ឧទាហរណ៍៖ Course មួយមាន Lessons ជាច្រើន៖
\`GET /api/v1/courses/:courseId/lessons\`

ដើម្បីឱ្យ Child Router (\`lessonRouter\`) អាចអាន Route Parameter របស់ Parent (\`:courseId\`) បាន យើងត្រូវកំណត់ **\`{ mergeParams: true }\`** ពេលបង្កើត Router!`,
    codeSnippet: `// src/routes/lesson.routes.js
import express from "express";

// Step 1: Enable mergeParams to inherit parent route parameters (:courseId)
const lessonRouter = express.Router({ mergeParams: true });

const lessons = [
  { id: 101, courseId: 1, title: "Introduction to Node.js" },
  { id: 102, courseId: 1, title: "Express Routing Deep Dive" }
];

// Step 2: GET all lessons belonging to a specific course
lessonRouter.get("/", (req, res) => {
  // 💡 Teaching Note: Accessing :courseId from parent route!
  const courseId = Number(req.params.courseId);
  const courseLessons = lessons.filter(l => l.courseId === courseId);

  res.status(200).json({
    success: true,
    courseId,
    count: courseLessons.length,
    data: courseLessons
  });
});

export default lessonRouter;`,
  },
  {
    id: "M07-13",
    number: "13",
    title: "Centralized Route Organization",
    khmerTitle: "ការរៀបចំ Directory នៃ Routes តាមរយៈ index.js",
    type: "architecture",
    codeLanguage: "javascript",
    summary: `នៅពេលដែល Project រីកធំឡើង និងមាន Routers រាប់សិប (Courses, Lessons, Users, Orders, Reviews) យើងគួរបង្កើត **Central Route Aggregator** មួយនៅ \`src/routes/index.js\`។

ឯកសារ \`index.js\` នេះនឹង Import Routers ទាំងអស់ រួច Mount ពួកវាតាម Category ឬ Version បន្ទាប់មក Export Router តែមួយគត់ទៅកាន់ \`app.js\`។`,
    codeSnippet: `// src/routes/index.js
import express from "express";
import courseRouter from "./course.routes.js";
import lessonRouter from "./lesson.routes.js";

const rootRouter = express.Router();

// Step 1: Register Course routes
rootRouter.use("/courses", courseRouter);

// Step 2: Register Nested Lesson routes under courses
// e.g., /api/v1/courses/:courseId/lessons
courseRouter.use("/:courseId/lessons", lessonRouter);

// Step 3: Export the central aggregator router
export default rootRouter;

// 💡 Teaching Note: In src/app.js, you only need one clean line:
// app.use("/api/v1", rootRouter);`,
  },
  {
    id: "M07-14",
    number: "14",
    title: "RESTful Routing Standards",
    khmerTitle: "តារាងសង្ខេបគោលការណ៍ស្តង់ដារ RESTful Routing",
    type: "concept",
    codeLanguage: "javascript",
    summary: `តារាងស្តង់ដារ Canonical RESTful Routes សម្រាប់ **Course Catalog API**៖

| HTTP Verb | URL Pattern | សកម្មភាព (Action) | Status Code |
|---|---|---|---|
| **GET** | \`/api/v1/courses\` | ទាញយកបញ្ជី Course ទាំងអស់ | 200 OK |
| **GET** | \`/api/v1/courses/:id\` | ទាញយក Course ជាក់លាក់មួយ | 200 / 404 |
| **POST** | \`/api/v1/courses\` | បង្កើត Course ថ្មី | 201 Created |
| **PUT** | \`/api/v1/courses/:id\` | ជំនួស Course ចាស់ទាំងស្រុង | 200 OK |
| **PATCH** | \`/api/v1/courses/:id\` | កែប្រែ Fields មួយចំនួន | 200 OK |
| **DELETE** | \`/api/v1/courses/:id\` | លុប Course ចេញ | 204 No Content |
| **GET** | \`/api/v1/courses/:id/lessons\` | ទាញយក Lessons របស់ Course | 200 OK |`,
    codeSnippet: `/* 
  CANONICAL RESTFUL DESIGN SUMMARY:
  -------------------------------------------------------------
  ✅ GET    /api/v1/courses             -> Read course catalog
  ✅ GET    /api/v1/courses/:id         -> Read single course
  ✅ POST   /api/v1/courses             -> Create new course
  ✅ PUT    /api/v1/courses/:id         -> Full replace course
  ✅ PATCH  /api/v1/courses/:id         -> Partial update course
  ✅ DELETE /api/v1/courses/:id         -> Delete course
  ✅ GET    /api/v1/courses/:id/lessons -> Nested child collection

  ❌ ANTI-PATTERNS (Avoid these):
  ❌ GET    /api/v1/getAllCourses
  ❌ POST   /api/v1/courses/delete/:id
  ❌ POST   /api/v1/courses/updatePrice
*/`,
  },
];
