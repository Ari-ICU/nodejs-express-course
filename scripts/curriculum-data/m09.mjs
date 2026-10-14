/**
 * m09.mjs - Module 09: REST API Development (18 topics)
 * Domain: Course Catalog API (Enterprise REST Standards, Envelopes, Pagination, Search)
 */

export const M09 = [
  {
    id: "M09-01",
    number: "01",
    title: "What is REST?",
    khmerTitle: "អ្វីជាស្ថាបត្យកម្ម REST និង Uniform Interface?",
    type: "concept",
    codeLanguage: "javascript",
    summary: `**REST (Representational State Transfer)** គឺជាស្ថាបត្យកម្មរចនា API បែបស្តង់ដារដែលបង្កើតឡើងដោយ Roy Fielding ក្នុងឆ្នាំ ២០០០។

គោលគំនិតស្នូលនៃ REST ក្នុង Course Catalog API៖
* **Resources**៖ អ្វីៗគ្រប់យ៉ាងត្រូវបានចាត់ទុកជា Resource (ដូចជា \`courses\`, \`lessons\`, \`users\`)
* **Representations**៖ Client ទទួលបាន Representation នៃ Resource ជាទម្រង់ JSON
* **Statelessness**៖ Request នីមួយៗផ្ទុកនូវព័ត៌មានគ្រប់គ្រាន់ដើម្បីដំណើរការដោយខ្លួនឯង ដោយមិនពឹងផ្អែកលើ Session ក្នុង Memory របស់ Server ឡើយ`,
    tip: "REST មិនមែនជា Library ឬ Framework ទេ ប៉ុន្តែជា Architectural Style និងគោលការណ៍ណែនាំ (Guidelines) សម្រាប់ការរចនា Web APIs។",
    objective: "យល់ដឹងពីទស្សនវិជ្ជារបស់ REST Architecture។",
    expectedOutcome: "ដឹងពីរបៀបកំណត់ Resources និងរចនា APIs តាមបែបស្តង់ដារអន្តរជាតិ។",
    codeSnippet: `// Representation of Course Resource in REST (JSON)
// GET /api/v1/courses/101
{
  "id": 101,
  "title": "Full-Stack Node.js & Express Architecture",
  "instructor": "Ratha",
  "price": 49.99,
  "level": "intermediate",
  "published": true,
  "links": {
    "self": "/api/v1/courses/101",
    "lessons": "/api/v1/courses/101/lessons",
    "reviews": "/api/v1/courses/101/reviews"
  }
}`,
  },
  {
    id: "M09-02",
    number: "02",
    title: "REST Principles",
    khmerTitle: "គោលការណ៍គ្រឹះទាំង ៦ នៃ REST (6 Architectural Constraints)",
    type: "concept",
    codeLanguage: "javascript",
    summary: `API មួយត្រូវបានចាត់ទុកថាជា **RESTful** លុះត្រាតែវាគោរពតាមគោលការណ៍គ្រឹះទាំង ៦៖

1. **Client-Server Architecture**៖ បំបែក User Interface (React/Next.js) ចេញពី Data Storage (Express/MongoDB)
2. **Stateless**៖ Server មិនរក្សាទុក Client Context រវាង Requests ឡើយ
3. **Cacheable**៖ Response ត្រូវតែបញ្ជាក់ថាអាច Cache បានឬអត់តាមរយៈ HTTP Headers
4. **Uniform Interface**៖ រចនាសម្ព័ន្ធ URL និង HTTP Methods ដូចគ្នាទូទាំងប្រព័ន្ធ
5. **Layered System**៖ Client មិនបាច់ដឹងថាខ្លួនកំពុងតភ្ជាប់ផ្ទាល់ជាមួយ App Server, Proxy, ឬ Load Balancer ឡើយ
6. **Code on Demand (Optional)**៖ អាចបញ្ជូន Script ទៅ Execute លើ Client (កម្រប្រើក្នុង REST APIs)`,
    tip: "Statelessness គឺជាកត្តាសំខាន់បំផុតដែលអនុញ្ញាតឱ្យ Express APIs អាច Scale លើ Multi-server Clusters ឬ Docker Containers បានយ៉ាងងាយស្រួល។",
    objective: "ចងចាំ និងយល់ច្បាស់ពីលក្ខខណ្ឌគ្រឹះទាំង ៦ នៃ REST Architecture។",
    expectedOutcome: "សមត្ថភាពវាយតម្លៃ និងរចនា API ដែលស្របតាម REST Constraints។",
    codeSnippet: `import express from "express";
const app = express();

// 💡 Teaching Note: Demonstrating Cache-Control header (Cacheable Constraint)
app.get("/api/v1/courses", (req, res) => {
  // Instruct clients and CDNs to cache this public course catalog for 1 hour (3600s)
  res.setHeader("Cache-Control", "public, max-age=3600");

  res.json({
    success: true,
    data: [{ id: 1, title: "Modern JavaScript" }]
  });
});`,
  },
  {
    id: "M09-03",
    number: "03",
    title: "RESTful API Design",
    khmerTitle: "ការរចនា RESTful API ប្រកបដោយវិជ្ជាជីវៈ (URL Conventions)",
    type: "architecture",
    codeLanguage: "javascript",
    summary: `ច្បាប់មាសសម្រាប់ការរចនា **RESTful URIs**៖

* **ប្រើ Nouns មិនប្រើ Verbs**៖ \`/courses\` (✅) មិនមែន \`/getCourses\` (❌)
* **ប្រើ Plural Nouns (ពហុវចនៈ)**៖ \`/courses\`, \`/lessons\`, \`/users\`
* **ប្រើ Lowercase និង Hyphens**៖ \`/course-reviews\` មិនមែន \`/course_reviews\` ឬ \`/courseReviews\`
* **បង្ហាញ Hierarchy ដោយ Nested Paths**៖ \`/courses/:id/lessons\`
* **ប្រើ Query Parameters សម្រាប់ Actions បន្ថែម**៖ \`?sort=price&filter=published\``,
    tip: "ជៀសវាងការដាក់ Actions ក្នុង URL ដូចជា `/courses/123/delete` ព្រោះ HTTP Verb `DELETE /courses/123` បានបញ្ជាក់សកម្មភាពនោះរួចរាល់ហើយ។",
    objective: "ចេះរៀបចំ Name និង Hierarchy នៃ API Endpoints តាមស្តង់ដារវិជ្ជាជីវៈ។",
    expectedOutcome: "រចនា URIs ដែលមានភាពស៊ីសង្វាក់គ្នា (Consistent) និងងាយយល់។",
    codeSnippet: `/*
  ==============================================================
  PROFESSIONAL RESTFUL URL CONVENTIONS:
  ==============================================================
  ✅ GET    /api/v1/courses               (Fetch course collection)
  ✅ POST   /api/v1/courses               (Create new course)
  ✅ GET    /api/v1/courses/42            (Fetch specific course)
  ✅ PATCH  /api/v1/courses/42            (Update fields)
  ✅ DELETE /api/v1/courses/42            (Remove course)
  ✅ GET    /api/v1/courses/42/lessons    (Fetch lessons for course 42)

  ❌ BAD URL CONVENTIONS (Avoid at all costs):
  ❌ /api/v1/getAllCourses
  ❌ /api/v1/createNewCourse
  ❌ /api/v1/course/42/delete
  ❌ /api/v1/course_reviews_by_user
*/`,
  },
  {
    id: "M09-04",
    number: "04",
    title: "Resource Modeling",
    khmerTitle: "ការកំណត់ និងគ្រប់គ្រង Resources (Courses, Lessons, Categories)",
    type: "concept",
    codeLanguage: "javascript",
    summary: `នៅក្នុង Course API គំរូទិន្នន័យ (Resources) ត្រូវបានបែងចែកជា៖

1. **Courses (Top-level Resource)**៖ \`/api/v1/courses\`
2. **Lessons (Sub-resource របស់ Course)**៖ \`/api/v1/courses/:courseId/lessons\`
3. **Categories (Independent Resource)**៖ \`/api/v1/categories\`

ការរៀបចំ Resource Modeling ច្បាស់លាស់ជួយឱ្យ Schema Database និង API Routing មានភាពស៊ីសង្វាក់គ្នា។`,
    tip: "កុំធ្វើឱ្យ Nested Routes ជ្រៅលើសពី ២ កម្រិត (ឧ. `/authors/1/books/2/chapters/3/paragraphs` គឺជ្រៅពេក)។ ត្រូវបំប្លែងទៅជា `/chapters/3/paragraphs` វិញ។",
    objective: "ចេះកំណត់កម្រិត Hierarchy នៃ Resources ក្នុងប្រព័ន្ធ។",
    expectedOutcome: "រចនាសម្ព័ន្ធ Resource Models ងាយស្រួល Maintain និងមិនស្មុគស្មាញជ្រុល។",
    codeSnippet: `// Resource Schemas in Course Catalog Domain
export const CourseSchema = {
  id: "number",
  title: "string",
  slug: "string",           // e.g., "mastering-express-architecture"
  instructor: "string",
  price: "number",
  level: "beginner | intermediate | advanced",
  published: "boolean",
  categoryId: "number",
  createdAt: "ISO8601 string"
};

export const LessonSchema = {
  id: "number",
  courseId: "number",       // Foreign key reference
  title: "string",
  durationMinutes: "number",
  videoUrl: "string",
  orderIndex: "number"
};`,
  },
  {
    id: "M09-05",
    number: "05",
    title: "CRUD Operations Mapping",
    khmerTitle: "ប្រតិបត្តិការ CRUD និងការផ្សារភ្ជាប់ជាមួយ HTTP Verbs",
    type: "concept",
    codeLanguage: "javascript",
    summary: `ការផ្សារភ្ជាប់រវាង **CRUD (Database Operations)** និង **HTTP Verbs (Web Protocols)**៖

| CRUD Operation | HTTP Method | Endpoint | សកម្មភាពលើ Database |
|---|---|---|---|
| **Create** | \`POST\` | \`/api/v1/courses\` | \`INSERT INTO / Collection.create()\` |
| **Read (All)** | \`GET\` | \`/api/v1/courses\` | \`SELECT * / Collection.find()\` |
| **Read (One)** | \`GET\` | \`/api/v1/courses/:id\` | \`SELECT WHERE id / findById()\` |
| **Update (Full)** | \`PUT\` | \`/api/v1/courses/:id\` | \`REPLACE / findByIdAndReplace()\` |
| **Update (Partial)** | \`PATCH\` | \`/api/v1/courses/:id\` | \`UPDATE SET / findByIdAndUpdate()\` |
| **Delete** | \`DELETE\` | \`/api/v1/courses/:id\` | \`DELETE WHERE / findByIdAndDelete()\` |`,
    tip: "សិស្សភាគច្រើនតែងច្រឡំរវាង PUT និង PATCH៖ PUT ជំនួសទាំងស្រុង ចំណែក PATCH កែប្រែតែ Field ណាដែលផ្ញើមកប៉ុណ្ណោះ។",
    objective: "យល់ច្បាស់ពីការផ្គូផ្គងប្រតិបត្តិការ CRUD ទៅកាន់ HTTP Methods ក្នុង Express។",
    expectedOutcome: "សមត្ថភាពអនុវត្ត CRUD API ពេញលេញដោយគ្មានការភាន់ច្រឡំ។",
    codeSnippet: `import express from "express";
const router = express.Router();

// 💡 Teaching Note: Clean CRUD Mapping declaration
router.route("/")
  .get((req, res) => res.json({ op: "READ_ALL_COURSES" }))
  .post((req, res) => res.status(201).json({ op: "CREATE_COURSE" }));

router.route("/:id")
  .get((req, res) => res.json({ op: "READ_ONE_COURSE", id: req.params.id }))
  .put((req, res) => res.json({ op: "REPLACE_COURSE", id: req.params.id }))
  .patch((req, res) => res.json({ op: "PARTIAL_UPDATE_COURSE", id: req.params.id }))
  .delete((req, res) => res.status(204).send());

export default router;`,
  },
  {
    id: "M09-06",
    number: "06",
    title: "Production GET Endpoints",
    khmerTitle: "ការអនុវត្ត Production GET Endpoint ជាមួយ Metadata",
    type: "lab",
    codeLanguage: "javascript",
    summary: `Production GET Endpoint មិនគួរត្រឡប់ត្រឹមតែ Raw Array ឡើយ។ វាត្រូវត្រឡប់ Standard JSON Envelope ដែលមាន Metadata ច្បាស់លាស់៖

* \`success: true\` (Status indicator)
* \`count\` (ចំនួន Items ក្នុង Response)
* \`data\` (Array នៃ Resources)
* \`timestamp\` (ពេលវេលា Response ត្រូវបានបង្កើត)`,
    tip: "ការរុំ Array ក្នុង Object (`{ success: true, data: [...] }`) ក៏ជួយការពារពី JSON Hijacking Vulnerability ក្នុង Web Browsers ចាស់ៗផងដែរ។",
    objective: "ចេះសរសេរ Production GET Endpoint ជាមួយ Standard Response Envelope។",
    expectedOutcome: "ឆ្លើយតប Data ដែលមានរចនាសម្ព័ន្ធច្បាស់លាស់ ងាយស្រួល Consume ដោយ Frontend។",
    codeSnippet: `import express from "express";
const app = express();

const courses = [
  { id: 1, title: "Node.js Fundamentals", price: 29.99, level: "beginner" },
  { id: 2, title: "Express.js Architecture", price: 49.99, level: "advanced" }
];

// Production GET Endpoint
app.get("/api/v1/courses", (req, res) => {
  // Step 1: Query data from store
  const results = courses;

  // Step 2: Return standardized envelope with metadata
  return res.status(200).json({
    success: true,
    count: results.length,
    data: results,
    meta: {
      timestamp: new Date().toISOString(),
      apiVersion: "1.0.0"
    }
  });
});`,
  },
  {
    id: "M09-07",
    number: "07",
    title: "Production POST Endpoints",
    khmerTitle: "ការអនុវត្ត Production POST Endpoint និង Location Header",
    type: "lab",
    codeLanguage: "javascript",
    summary: `Production POST Endpoint ត្រូវអនុវត្តតាមលក្ខខណ្ឌវិជ្ជាជីវៈ៖

1. **Validation**៖ ពិនិត្យភាពត្រឹមត្រូវនៃ Payload
2. **Duplicate Prevention**៖ ពិនិត្យថាតើ Course Title នេះមានរួចហើយឬនៅ
3. **HTTP 201 Created**៖ ឆ្លើយតប Status 201
4. **Location Header**៖ កំណត់ Header \`Location: /api/v1/courses/:id\` ដែលចង្អុលបង្ហាញផ្លូវទៅកាន់ Resource ដែលទើបនឹងបង្កើតថ្មី`,
    tip: "Header `Location` គឺជា REST Standard ដែលជួយឱ្យ Client ដឹងភ្លាមៗពី URL នៃ Resource ថ្មីដោយមិនបាច់ទាយ។",
    objective: "ចេះបង្កើត Production-grade POST Endpoint ជាមួយ Location Header។",
    expectedOutcome: "Endpoint បង្កើតទិន្នន័យប្រកបដោយសុវត្ថិភាព និងអនុលោមតាម HTTP Specifications។",
    codeSnippet: `import express from "express";
const app = express();
app.use(express.json());

const courses = [{ id: 1, title: "Node.js Fundamentals" }];

app.post("/api/v1/courses", (req, res) => {
  const { title, price } = req.body;

  // Step 1: Validation
  if (!title || typeof title !== "string") {
    return res.status(400).json({ success: false, error: "Title is required" });
  }

  // Step 2: Prevent duplicates
  const exists = courses.some(c => c.title.toLowerCase() === title.toLowerCase());
  if (exists) {
    return res.status(409).json({ success: false, error: "A course with this title already exists" });
  }

  // Step 3: Create course entity
  const newCourse = { id: courses.length + 1, title, price: Number(price) || 0 };
  courses.push(newCourse);

  // Step 4: Set Location header & respond with 201 Created
  const resourceUrl = \`/api/v1/courses/\${newCourse.id}\`;
  res.setHeader("Location", resourceUrl);

  return res.status(201).json({
    success: true,
    data: newCourse,
    location: resourceUrl
  });
});`,
  },
  {
    id: "M09-08",
    number: "08",
    title: "Production PUT Endpoints",
    khmerTitle: "ការអនុវត្ត Production PUT Endpoint (Full Replacement)",
    type: "lab",
    codeLanguage: "javascript",
    summary: `ការអនុវត្ត **PUT Endpoint** តាមស្តង់ដារ RESTful៖

* ត្រូវពិនិត្យវត្តមាន Resource ជាមុនសិន (\`404 Not Found\` បើគ្មាន)
* ត្រូវទាមទារ (Enforce) នូវរាល់ Required Fields ទាំងអស់នៃ Resource
* ជំនួស Object ទាំងមូលក្នុង Data Store ដោយមិនបន្សល់ទុក Fields ចាស់ដែល Client មិនបានផ្ញើមកឡើយ`,
    tip: "ចងចាំ៖ PUT គឺជាការសរសេរជាន់លើទាំងស្រុង (Overwrite Entire Entity)។",
    objective: "ចេះបង្កើត PUT Handler ដែលគោរពតាមគោលការណ៍ Full Replacement។",
    expectedOutcome: "ជំនួស Resource ដោយជោគជ័យ និងឆ្លើយតប 200 OK ជាមួយ Updated Record។",
    codeSnippet: `import express from "express";
const app = express();
app.use(express.json());

let courses = [
  { id: 1, title: "Old Title", instructor: "Old Teacher", price: 10, published: false }
];

app.put("/api/v1/courses/:id", (req, res) => {
  const courseId = Number(req.params.id);
  const index = courses.findIndex(c => c.id === courseId);

  if (index === -1) {
    return res.status(404).json({ success: false, error: "Course not found" });
  }

  const { title, instructor, price, published } = req.body;

  // Validation: PUT requires ALL core properties
  if (!title || !instructor || price === undefined || published === undefined) {
    return res.status(400).json({
      success: false,
      error: "PUT requires full entity payload: title, instructor, price, and published status"
    });
  }

  // Overwrite completely
  courses[index] = { id: courseId, title, instructor, price: Number(price), published: Boolean(published) };
  return res.status(200).json({ success: true, data: courses[index] });
});`,
  },
  {
    id: "M09-09",
    number: "09",
    title: "Production PATCH Endpoints",
    khmerTitle: "ការអនុវត្ត Production PATCH Endpoint (Partial Updates)",
    type: "lab",
    codeLanguage: "javascript",
    summary: `ការអនុវត្ត **PATCH Endpoint** ប្រកបដោយប្រសិទ្ធភាពខ្ពស់៖

1. អាន \`req.body\`
2. ច្រោះយកតែ **Allowed Update Fields** (ជៀសវាង Mass Assignment Vulnerability កុំឱ្យ Client កែប្រែ \`id\` ឬ \`createdAt\`)
3. កែប្រែតែ Properties ដែលបានផ្តល់មក
4. រក្សាទុក \`updatedAt\` timestamp ថ្មី`,
    tip: "🔒 សុវត្ថិភាពខ្ពស់៖ កុំយក `req.body` ទាំងមូលទៅ Merge ដោយគ្មានការ Whitelist ឱ្យសោះ ព្រោះ User អាចលួចប្តូរ `role: 'admin'` ឬ `id` បាន (Mass Assignment Attack)!",
    objective: "ចេះអនុវត្ត PATCH Endpoint ដោយមាន Field Whitelisting ការពារ Mass Assignment។",
    expectedOutcome: "Endpoint កែប្រែទិន្នន័យមានសុវត្ថិភាពខ្ពស់ និងស្របតាមស្តង់ដារវិជ្ជាជីវៈ។",
    codeSnippet: `import express from "express";
const app = express();
app.use(express.json());

let courses = [{ id: 1, title: "Original Title", price: 29.99, published: false }];

app.patch("/api/v1/courses/:id", (req, res) => {
  const courseId = Number(req.params.id);
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return res.status(404).json({ success: false, error: "Course not found" });
  }

  // 🔒 Security: Only allow modifications on specific permitted fields (Whitelist)
  const allowedUpdates = ["title", "price", "published"];
  for (const key of Object.keys(req.body)) {
    if (allowedUpdates.includes(key)) {
      course[key] = req.body[key];
    }
  }

  course.updatedAt = new Date().toISOString();
  return res.status(200).json({ success: true, data: course });
});`,
  },
  {
    id: "M09-10",
    number: "10",
    title: "Production DELETE Endpoints",
    khmerTitle: "ការអនុវត្ត Production DELETE Endpoint (Soft Delete vs Hard Delete)",
    type: "lab",
    codeLanguage: "javascript",
    summary: `នៅក្នុង Production Applications មានយុទ្ធសាស្ត្រលុប ២ បែប៖

1. **Hard Delete**៖ លុប Record ចេញពី Database ទាំងស្រុង (\`courses.splice()\`)
2. **Soft Delete (អនុសាសន៍)**៖ មិនលុបទិន្នន័យចោលទេ គ្រាន់តែសម្គាល់ \`isDeleted: true\` និង \`deletedAt = new Date()\`។ វិធីនេះអនុញ្ញាតឱ្យយើង Restore ទិន្នន័យមកវិញបាន និងរក្សាប្រវត្តិ Transactions`,
    tip: "ប្រើប្រាស់ Status Code `200 OK` ប្រសិនបើអ្នកបញ្ជូន Deleted Entity ត្រឡប់មកវិញ ឬប្រើ `204 No Content` ប្រសិនបើអ្នកមិនបញ្ជូន Body ត្រឡប់ទៅវិញ។",
    objective: "ចេះសរសេរ DELETE Endpoint ទាំងទម្រង់ Hard Delete និង Soft Delete។",
    expectedOutcome: "យល់ច្បាស់ពីការគ្រប់គ្រងទិន្នន័យដែលបានលុបក្នុង Enterprise Architecture។",
    codeSnippet: `import express from "express";
const app = express();

let courses = [
  { id: 1, title: "Node.js Basics", isDeleted: false, deletedAt: null }
];

// Soft Delete Implementation (Recommended for Enterprise)
app.delete("/api/v1/courses/:id", (req, res) => {
  const courseId = Number(req.params.id);
  const course = courses.find(c => c.id === courseId && !c.isDeleted);

  if (!course) {
    return res.status(404).json({ success: false, error: "Course not found or already deleted" });
  }

  // Perform soft delete
  course.isDeleted = true;
  course.deletedAt = new Date().toISOString();

  return res.status(200).json({
    success: true,
    message: "Course has been soft-deleted successfully",
    data: { id: course.id, deletedAt: course.deletedAt }
  });
});`,
  },
  {
    id: "M09-11",
    number: "11",
    title: "HTTP Status Codes Taxonomy",
    khmerTitle: "តារាងចំណាត់ថ្នាក់ និងការជ្រើសរើស HTTP Status Codes",
    type: "concept",
    codeLanguage: "javascript",
    summary: `សៀវភៅណែនាំ Status Codes សម្រាប់ REST API Development៖

* **2xx Success**៖
  * \`200 OK\`៖ សំណើជោគជ័យ (GET, PUT, PATCH)
  * \`201 Created\`៖ បង្កើត Resource ថ្មីបានសម្រេច (POST)
  * \`204 No Content\`៖ ជោគជ័យតែគ្មាន Content ត្រឡប់មកវិញ (DELETE)
* **4xx Client Errors**៖
  * \`400 Bad Request\`៖ ទិន្នន័យមិនត្រឹមត្រូវតាម Schema
  * \`401 Unauthorized\`៖ មិនទាន់ Login / គ្មាន Token
  * \`403 Forbidden\`៖ បាន Login ហើយ តែគ្មានសិទ្ធិ
  * \`404 Not Found\`៖ រក Resource មិនឃើញ
  * \`409 Conflict\`៖ ទិន្នន័យជាន់គ្នា (ដូចជា Duplicate Email ឬ Slug)
* **5xx Server Errors**៖
  * \`500 Internal Server Error\`៖ Bug ក្នុង Server Code
  * \`503 Service Unavailable\`៖ Database គាំង ឬ Server កំពុង Maintenance`,
    tip: "ច្បាប់មាស៖ កុំត្រឡប់ 200 OK នៅពេលមានបញ្ហាឱ្យសោះ។ ការប្រើ Status Code ត្រឹមត្រូវជួយឱ្យ Frontend Developers អាច Handle Error Interceptors (Axios / TanStack Query) បានស្វ័យប្រវត្តិ។",
    objective: "ស្ទាត់ជំនាញក្នុងការផ្គូផ្គង HTTP Status Code ទៅនឹងស្ថានភាពនីមួយៗ។",
    expectedOutcome: "API មានភាពច្បាស់លាស់ ងាយស្រួល Debug និង Integration។",
    codeSnippet: `// Status Code Reference Helper
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};`,
  },
  {
    id: "M09-12",
    number: "12",
    title: "API Response Structure (JSON Envelope)",
    khmerTitle: "ទម្រង់ឆ្លើយតបស្តង់ដារ JSON Envelope ក្នុង REST APIs",
    type: "concept",
    codeLanguage: "javascript",
    summary: `**Standard JSON Envelope** គឺជាការរចនា Response Object ដែលមានភាពស៊ីសង្វាក់គ្នា (Consistent) លើគ្រប់ Endpoints ទាំងអស់នៃប្រព័ន្ធ។

រចនាសម្ព័ន្ធស្តង់ដារ៖
\`\`\`json
{
  "success": true,
  "count": 2,
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 42
  }
}
\`\`\``,
    tip: "ភាពស៊ីសង្វាក់គ្នានៃ JSON Envelope ជួយឱ្យ Frontend Team អាចសរសេរ TypeScript Interface តែមួយ (`ApiResponse<T>`) សម្រាប់ប្រើទូទាំង Frontend App។",
    objective: "ចេះរចនា និងអនុវត្ត JSON Response Envelope តាមស្តង់ដារឧស្សាហកម្ម។",
    expectedOutcome: "Frontend ទទួលបាន Response ដែលមានទម្រង់ Predictable និងងាយស្រួលបង្កើត UI State។",
    codeSnippet: `// Reusable Response Helper Utility
export const sendSuccess = (res, statusCode, data, meta = {}) => {
  return res.status(statusCode).json({
    success: true,
    count: Array.isArray(data) ? data.length : undefined,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta
    }
  });
};

// Usage in Route:
// sendSuccess(res, 200, courses, { page: 1, total: 42 });`,
  },
  {
    id: "M09-13",
    number: "13",
    title: "API Error Structure (Error Envelope)",
    khmerTitle: "ទម្រង់ឆ្លើយតបកំហុសស្តង់ដារ Error Envelope",
    type: "concept",
    codeLanguage: "javascript",
    summary: `នៅពេលមានបញ្ហា Server ត្រូវតែឆ្លើយតបតាម **Standardized Error Envelope** ជានិច្ច ដើម្បីឱ្យ Frontend អាច Parse និងបង្ហាញ Error Message ដល់ User បានច្បាស់លាស់។

រចនាសម្ព័ន្ធស្តង់ដារ៖
* \`success: false\`
* \`error.message\`៖ ការពន្យល់ខ្លី និងងាយយល់
* \`error.code\`៖ Unique Machine-readable Error Code (ឧ. \`COURSE_NOT_FOUND\`)
* \`error.details\`៖ Array នៃ Validation Errors (បើមាន)`,
    tip: "កុំបញ្ចេញ Raw Database Error Message (ដូចជា `E11000 duplicate key error...`) ទៅកាន់ Client ឱ្យសោះ ព្រោះវាជាហានិភ័យសន្តិសុខ (Information Leakage)។ ត្រូវបំប្លែងទៅជា Human-readable Message។",
    objective: "ចេះរៀបចំទម្រង់ Error Response Envelope តាមស្តង់ដារ Production។",
    expectedOutcome: "ផ្តល់ Error Messages ដែលមានសុវត្ថិភាព និងច្បាស់លាស់ដល់អ្នកប្រើប្រាស់។",
    codeSnippet: `// Reusable Error Helper Utility
export const sendError = (res, statusCode, message, errorCode = "BAD_REQUEST", details = null) => {
  return res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message,
      statusCode,
      details,
      timestamp: new Date().toISOString()
    }
  });
};

// Example Error Response sent by server:
/*
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "Validation failed for course creation",
    "statusCode": 400,
    "details": [
      { "field": "price", "message": "Price must be greater than 0" }
    ],
    "timestamp": "2026-10-14T10:00:00.000Z"
  }
}
*/`,
  },
  {
    id: "M09-14",
    number: "14",
    title: "Pagination (Limit & Offset/Skip)",
    khmerTitle: "ការរៀបចំ Pagination ជាមួយ Page, Limit និង Skip",
    type: "lab",
    codeLanguage: "javascript",
    summary: `ប្រសិនបើ Database មាន Courses ចំនួន ១០,០០០ យើងមិនអាចទាញយកទាំងអស់ក្នុង Request តែមួយបានឡើយ។ យើងត្រូវប្រើ **Pagination**។

រូបមន្តគណនា **Limit & Skip**៖
* \`page\` (ទំព័របច្ចុប្បន្ន ឧ. 1, 2, 3...)
* \`limit\` (ចំនួន Items ក្នុងមួយទំព័រ ឧ. 10)
* \`skip = (page - 1) * limit\`

Response ត្រូវត្រឡប់នូវ Pagination Metadata ដូចជា \`totalPages\`, \`currentPage\`, និង \`totalItems\`។`,
    tip: "កំណត់ Default Limit (ឧ. 10) និង Maximum Limit (ឧ. 100) ជានិច្ច ដើម្បីការពារ Client ពីការស្នើសុំ `?limit=1000000` ដែលអាចធ្វើឱ្យ Server អស់ Memory (OOM)។",
    objective: "ចេះសរសេរ Logic គណនា Pagination និងផ្តល់ Navigation Metadata។",
    expectedOutcome: "Endpoints អាចទាញយកទិន្នន័យជាទំព័រៗប្រកបដោយប្រសិទ្ធភាពខ្ពស់។",
    codeSnippet: `import express from "express";
const app = express();

// Mock store with 25 courses
const allCourses = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  title: \`Mastering Express Module \${i + 1}\`,
  price: 29 + i
}));

// GET /api/v1/courses?page=2&limit=5
app.get("/api/v1/courses", (req, res) => {
  // Step 1: Parse and sanitize page & limit
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 5)); // Max 50 items

  // Step 2: Calculate skip offset
  const skip = (page - 1) * limit;

  // Step 3: Slice data and calculate total pages
  const paginatedCourses = allCourses.slice(skip, skip + limit);
  const totalItems = allCourses.length;
  const totalPages = Math.ceil(totalItems / limit);

  return res.status(200).json({
    success: true,
    count: paginatedCourses.length,
    data: paginatedCourses,
    pagination: {
      currentPage: page,
      limit,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  });
});`,
  },
  {
    id: "M09-15",
    number: "15",
    title: "Filtering Query Parameters",
    khmerTitle: "ការបង្កើត Dynamic Query Filtering សម្រាប់ Categories និង Status",
    type: "lab",
    codeLanguage: "javascript",
    summary: `**Filtering** អនុញ្ញាតឱ្យ Client ច្រោះយកតែ Resources ណាដែលត្រូវនឹងលក្ខខណ្ឌជាក់លាក់ (ឧ. \`/api/v1/courses?level=beginner&published=true\`)។

ដំណាក់កាលអនុវត្ត Filtering៖
1. ចម្លង \`req.query\`
2. ដកចេញនូវ Reserved Query Keys (ដូចជា \`page\`, \`limit\`, \`sort\`, \`fields\`)
3. ផ្គូផ្គង Keys ដែលនៅសល់ជាមួយនឹង Properties នៃ Course`,
    tip: "បំប្លែង String Parameters ទៅជា Types ត្រឹមត្រូវ (ឧ. `published === 'true'` ទៅជា boolean, `price` ទៅជា number) មុននឹងប្រៀបធៀប។",
    objective: "ចេះបង្កើត Dynamic Filtering ដែលអាចគាំទ្រលក្ខខណ្ឌច្រើនក្នុងពេលតែមួយ។",
    expectedOutcome: "Client អាចស្វែងរកទិន្នន័យតាម Categories, Level, និង Price បានយ៉ាងរលូន។",
    codeSnippet: `import express from "express";
const app = express();

const courses = [
  { id: 1, title: "Node.js Basics", level: "beginner", published: true, price: 29 },
  { id: 2, title: "Express Architecture", level: "advanced", published: true, price: 49 },
  { id: 3, title: "Draft Course", level: "beginner", published: false, price: 19 }
];

app.get("/api/v1/courses", (req, res) => {
  let filtered = [...courses];
  const { level, published, maxPrice } = req.query;

  // Filter 1: By Difficulty Level
  if (level) {
    filtered = filtered.filter(c => c.level.toLowerCase() === level.toLowerCase());
  }

  // Filter 2: By Published status (boolean conversion)
  if (published !== undefined) {
    const isPublished = published === "true";
    filtered = filtered.filter(c => c.published === isPublished);
  }

  // Filter 3: By Maximum Price
  if (maxPrice) {
    filtered = filtered.filter(c => c.price <= Number(maxPrice));
  }

  res.json({ success: true, count: filtered.length, data: filtered });
});`,
  },
  {
    id: "M09-16",
    number: "16",
    title: "Searching with ReDoS Protection",
    khmerTitle: "ការស្វែងរកទិន្នន័យ (Search) និងការការពារពីការវាយប្រហារ ReDoS",
    type: "lab",
    codeLanguage: "javascript",
    summary: `**Search** អនុញ្ញាតឱ្យ Client វាយពាក្យស្វែងរកសេរី (\`?q=express\`) ដើម្បីស្វែងរកលើ Fields ច្រើនដំណាលគ្នា (ដូចជា \`title\` និង \`description\`)។

⚠️ **ការព្រមានសុវត្ថិភាព ReDoS (Regular Expression Denial of Service)**៖
* ប្រសិនបើ Client បញ្ជូន Regex Pattern ពិសេសដូចជា \`?q=(a+)+$\` ចូលទៅកាន់ \`new RegExp(req.query.q)\` ដោយផ្ទាល់ វានឹងបង្កឱ្យមាន **Catastrophic Backtracking** ដែលធ្វើឱ្យ Event Loop របស់ Node.js គាំងទាំងស្រុង!
* **ដំណោះស្រាយ**៖ ត្រូវតែ Escape តួអក្សរពិសេសនៃ Regex ជាមុនសិន។`,
    tip: "អនុវត្តមុខងារ Helper `escapeRegex()` ជានិច្ចមុននឹងបង្កើត `new RegExp()` ចេញពី User Input។",
    objective: "ចេះបង្កើត Search Endpoint ដែលមានសុវត្ថិភាពខ្ពស់ និងការពារ ReDoS Attacks។",
    expectedOutcome: "ស្វែងរកទិន្នន័យលើ Multiple Fields ដោយមិនប៉ះពាល់ដល់ Performance ឬ Server Security។",
    codeSnippet: `import express from "express";
const app = express();

const courses = [
  { id: 1, title: "Building Scalable APIs with Express.js", desc: "Enterprise architecture patterns" },
  { id: 2, title: "Full-Stack Node.js & React", desc: "Complete web app guide" },
  { id: 3, title: "Dockerizing Microservices", desc: "Container deployment pipelines" }
];

// 🔒 Helper: Escape regex special characters to prevent ReDoS attacks!
const escapeRegex = (text) => text.replace(/[.*+?^$\${}()|[\\]\\\\]/g, "\\\\$&");

// GET /api/v1/courses/search?q=express
app.get("/api/v1/courses/search", (req, res) => {
  const query = req.query.q;

  if (!query || typeof query !== "string") {
    return res.status(400).json({ success: false, error: "Query parameter 'q' is required" });
  }

  // Step 1: Escape untrusted user input safely
  const safePattern = escapeRegex(query.trim());
  const regex = new RegExp(safePattern, "i"); // "i" = case insensitive

  // Step 2: Search across multiple fields (title and desc)
  const matches = courses.filter(c => regex.test(c.title) || regex.test(c.desc));

  return res.status(200).json({
    success: true,
    searchTerm: query,
    count: matches.length,
    data: matches
  });
});`,
  },
  {
    id: "M09-17",
    number: "17",
    title: "Sorting (Ascending & Descending)",
    khmerTitle: "ការរៀបចំលំដាប់លំដោយ Sorting (Ascending & Descending)",
    type: "lab",
    codeLanguage: "javascript",
    summary: `**Sorting** អនុញ្ញាតឱ្យ Client តម្រៀបទិន្នន័យតាមលំដាប់លំដោយជាក់លាក់ (ឧ. \`?sort=price\` សម្រាប់តម្លៃទាបទៅខ្ពស់ ឬ \`?sort=-price\` សម្រាប់តម្លៃខ្ពស់មកទាប)។

អនុសញ្ញា RESTful Sorting៖
* សញ្ញាដក (\`-\`) នៅពីមុខ Field តំណាងឱ្យ **Descending Order** (\`sort=-price\`)
* គ្មានសញ្ញាដក តំណាងឱ្យ **Ascending Order** (\`sort=price\`)
* អាចគាំទ្រ Multi-field Sorting ដូចជា \`?sort=-price,title\``,
    tip: "ចងចាំ៖ `-price` (ពីថ្លៃមកថោក) និង `price` (ពីថោកទៅថ្លៃ) គឺជាស្តង់ដារដែលប្រើប្រាស់ទាំងក្នុង Mongoose និង REST APIs ពិភពលោក។",
    objective: "ចេះ Parse Sorting Query និងតម្រៀបទិន្នន័យតាមលំដាប់ឡើង ឬចុះ។",
    expectedOutcome: "Endpoint អាច Sort តាម Properties ច្រើនប្រកបដោយភាពបត់បែន។",
    codeSnippet: `import express from "express";
const app = express();

const courses = [
  { id: 1, title: "Z - Advanced Microservices", price: 99 },
  { id: 2, title: "A - Beginner JavaScript", price: 19 },
  { id: 3, title: "M - Intermediate Express", price: 49 }
];

// GET /api/v1/courses?sort=-price
app.get("/api/v1/courses", (req, res) => {
  let result = [...courses];
  const { sort } = req.query;

  if (sort && typeof sort === "string") {
    const isDescending = sort.startsWith("-");
    const field = isDescending ? sort.substring(1) : sort;

    result.sort((a, b) => {
      if (a[field] < b[field]) return isDescending ? 1 : -1;
      if (a[field] > b[field]) return isDescending ? -1 : 1;
      return 0;
    });
  }

  res.json({ success: true, count: result.length, data: result });
});`,
  },
  {
    id: "M09-18",
    number: "18",
    title: "API Versioning Strategies",
    khmerTitle: "ការគ្រប់គ្រងកំណែ API Versioning (URI vs Header) និង Deprecation",
    type: "concept",
    codeLanguage: "javascript",
    summary: `នៅពេលដែល API ត្រូវមាន Breaking Changes (ការផ្លាស់ប្តូរដែលធ្វើឱ្យ Clients ចាស់ដំណើរការលែងកើត) យើងត្រូវធ្វើ **API Versioning**។

យុទ្ធសាស្ត្រ Versioning ចម្បងៗ៖
1. **URI Path Versioning (ពេញនិយមបំផុត)**៖ \`/api/v1/courses\` និង \`/api/v2/courses\`
2. **Custom Header Versioning**៖ Header \`X-API-Version: 2.0\`
3. **Accept Header (Content Negotiation)**៖ \`Accept: application/vnd.company.v2+json\`

ការប្រកាស Deprecation៖ ប្រើ Header \`Sunset\` និង \`Deprecation\` លើ v1 ដើម្បីជូនដំណឹងឱ្យ Client Update ទៅកាន់ v2។`,
    tip: "URI Path Versioning (`/v1`, `/v2`) គឺជាវិធីដែលងាយស្រួលយល់ និងងាយស្រួល Debug បំផុតនៅក្នុង Express។",
    objective: "ចេះរៀបចំយុទ្ធសាស្ត្រ Versioning ដើម្បី Upgrade API ដោយមិនប៉ះពាល់ដល់អតិថិជនចាស់។",
    expectedOutcome: "ស្ថាបត្យកម្ម API ដែលគាំទ្រការវិវត្តន៍យូរអង្វែង (Long-term Evolution)។",
    codeSnippet: `import express from "express";
const app = express();

// Version 1 Router (Legacy)
const v1Router = express.Router();
v1Router.get("/courses", (req, res) => {
  // Inform clients that v1 is deprecated and will sunset
  res.setHeader("Deprecation", "true");
  res.setHeader("Sunset", "Wed, 31 Dec 2026 23:59:59 GMT");
  res.json({ version: "v1", data: ["Basic Course Title"] });
});

// Version 2 Router (Modern with enriched response)
const v2Router = express.Router();
v2Router.get("/courses", (req, res) => {
  res.json({ version: "v2", data: [{ id: 1, title: "Modern Course", price: 49 }] });
});

// Mount versions side-by-side
app.use("/api/v1", v1Router);
app.use("/api/v2", v2Router);`,
  },
];
