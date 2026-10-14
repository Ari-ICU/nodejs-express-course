/**
 * m13.mjs - Module 12: Database API Development (19 topics)
 * Domain: Course Catalog API (Full End-to-End MongoDB CRUD, Filtering, Pagination, Search, Transactions)
 */

export const M12 = [
  {
    id: "M12-01",
    number: "01",
    title: "Express MongoDB Setup",
    khmerTitle: "ការភ្ជាប់ Express ជាមួយ MongoDB នៅពេល Server ចាប់ផ្តើម",
    type: "lab",
    codeLanguage: "javascript",
    summary: `ការភ្ជាប់ Express Application ជាមួយ MongoDB ឱ្យដំណើរការស្របគ្នា៖

លំដាប់លំដោយនៃការ Boot Server ត្រឹមត្រូវ៖
1. ហៅ \`await connectDB()\` ជាមុនសិន
2. នៅពេល MongoDB តភ្ជាប់ជោគជ័យ ទើបហៅ \`app.listen(PORT)\`

វិធីនេះធានាថា គ្មាន Request របស់ Client ណាមួយមកដល់ Server នៅពេលដែល Database មិនទាន់ Ready ឡើយ។`,
    codeSnippet: `// src/server.js
import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;

// Step 1: Connect to MongoDB first!
await connectDB();

// Step 2: Start Express HTTP listener after DB is connected
app.listen(PORT, () => {
  console.log(\`🚀 Course Catalog Server running on http://localhost:\${PORT}\`);
});`,
  },
  {
    id: "M12-02",
    number: "02",
    title: "Database Configuration Options",
    khmerTitle: "ការកំណត់រចនាសម្ព័ន្ធ Connection Pool ក្នុង Mongoose",
    type: "architecture",
    codeLanguage: "javascript",
    summary: `ការកំណត់ Connection Options ស្តង់ដារសម្រាប់ Production MongoDB Deployment៖

* **\`maxPoolSize: 50\`**៖ រក្សាទុក Socket Connections រហូតដល់ ៥០ សម្រាប់ដំណើរការ Concurrent Requests
* **\`serverSelectionTimeoutMS: 5000\`**៖ កំណត់រយៈពេល ៥ វិនាទីដើម្បីស្វែងរក Node ក្នុង Replica Set មុននឹង Timeout
* **\`socketTimeoutMS: 45000\`**៖ បិទ Socket ដែលអសកម្មក្រោយ ៤៥ វិនាទី`,
    codeSnippet: `// src/config/db.js
import mongoose from "mongoose";

const mongooseOptions = {
  maxPoolSize: 50,                // 💡 Up to 50 concurrent socket connections
  serverSelectionTimeoutMS: 5000, // Fail fast after 5 seconds if DB is down
  socketTimeoutMS: 45000,         // Close inactive sockets
};

export const connectDB = async () => {
  await mongoose.connect(process.env.DATABASE_URL, mongooseOptions);
};`,
  },
  {
    id: "M12-03",
    number: "03",
    title: "Environment Variables for Database",
    khmerTitle: "ការគ្រប់គ្រង Database Credentials ក្នុង .env",
    type: "lab",
    codeLanguage: "bash",
    summary: `សុវត្ថិភាព Database Credentials គឺជាកាតព្វកិច្ចចម្បងរបស់ Backend Developer៖

* មិនត្រូវ Commit Password ឬ Atlas Connection Strings ចូលទៅកាន់ Git Repo ជាដាច់ខាត
* ប្រើប្រាស់ \`.env.example\` សម្រាប់ចែករំលែក Template ទៅកាន់ Team
* ប្រើប្រាស់ \`dotenv\` ដើម្បី Load អថេរទៅក្នុង \`process.env\``,
    codeSnippet: `# .env (Never commit to Git!)
PORT=5000
NODE_ENV=development
DATABASE_URL=mongodb+srv://course_admin:SecretPass99@cluster0.net/course_catalog_db?retryWrites=true&w=majority

# .env.example (Safe to commit for team onboarding)
PORT=5000
NODE_ENV=development
DATABASE_URL=your_mongodb_connection_string_here`,
  },
  {
    id: "M12-04",
    number: "04",
    title: "Creating Course & Lesson Models",
    khmerTitle: "ការបង្កើត Data Models និង Indexes ក្នុងគម្រោង",
    type: "architecture",
    codeLanguage: "javascript",
    summary: `ការរៀបចំ Data Models សម្រាប់ Course Catalog API ដោយមាន **Indexes** សម្រាប់បង្កើនល្បឿន Query៖

* **Single Field Index**៖ \`title: { type: String, index: true }\`
* **Compound Index**៖ \`courseSchema.index({ level: 1, price: -1 })\` សម្រាប់បង្កើនល្បឿន Query ដែលច្រោះតាម Level និងតម្រៀបតាម Price ដំណាលគ្នា`,
    codeSnippet: `// src/models/course.model.js
import { Schema, model } from "mongoose";

const courseSchema = new Schema({
  title: { type: String, required: true, trim: true, index: true },
  slug: { type: String, required: true, unique: true },
  instructor: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  level: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" },
  published: { type: Boolean, default: false }
}, { timestamps: true });

// 💡 Teaching Note: Compound index for filtering by level and sorting by price!
courseSchema.index({ level: 1, price: -1 });

export const Course = model("Course", courseSchema);`,
  },
  {
    id: "M12-05",
    number: "05",
    title: "Course Controller with Database Operations",
    khmerTitle: "ការបង្កើត Controllers សម្រាប់ Database Endpoints",
    type: "lab",
    codeLanguage: "javascript",
    summary: `ការសរសេរ Course Controller ដែលភ្ជាប់ទៅកាន់ MongoDB Service Layer៖

លក្ខណៈស្តង់ដារ៖
* រុំដោយ \`asyncHandler\` ដើម្បីកាត់បន្ថយ \`try/catch\` boilerplate
* ទទួល \`req.body\` ឬ \`req.query\` រួចហៅ Service
* បញ្ជូន Standard JSON Envelope ត្រឡប់ទៅ Client`,
    codeSnippet: `// src/controllers/course.controller.js
import * as courseService from "../services/course.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// GET /api/v1/courses
export const getCourses = asyncHandler(async (req, res) => {
  const courses = await courseService.getAllCourses(req.query);
  res.status(200).json({ success: true, count: courses.length, data: courses });
});

// POST /api/v1/courses
export const createCourse = asyncHandler(async (req, res) => {
  const newCourse = await courseService.createCourse(req.body);
  res.status(201).json({ success: true, data: newCourse });
});`,
  },
  {
    id: "M12-06",
    number: "06",
    title: "Creating Course Routes",
    khmerTitle: "ការចងភ្ជាប់ Routes ទៅកាន់ Database Controllers",
    type: "lab",
    codeLanguage: "javascript",
    summary: `ការចងភ្ជាប់ Routes ក្នុង \`src/routes/course.routes.js\` ជាមួយ Controller Handlers តាមរយៈ \`express.Router()\`៖

រចនាសម្ព័ន្ធកូដស្អាតតាមរយៈ \`router.route()\`:
* \`router.route("/").get(getCourses).post(createCourse)\`
* \`router.route("/:id").get(getCourseById).patch(updateCourse).delete(deleteCourse)\``,
    codeSnippet: `// src/routes/course.routes.js
import express from "express";
import * as courseController from "../controllers/course.controller.js";

const router = express.Router();

router.route("/")
  .get(courseController.getCourses)
  .post(courseController.createCourse);

router.route("/:id")
  .get(courseController.getCourseById)
  .patch(courseController.updateCourse)
  .delete(courseController.deleteCourse);

export default router;`,
  },
  {
    id: "M12-07",
    number: "07",
    title: "Full CRUD API Integration",
    khmerTitle: "ការរួមបញ្ចូលប្រព័ន្ធ CRUD ពេញលេញជាមួយ MongoDB",
    type: "lab",
    codeLanguage: "javascript",
    summary: `ការរួមបញ្ចូលគ្រប់ស្រទាប់ (Routes -> Controllers -> Services -> MongoDB Model) ឱ្យក្លាយជា **Full Production CRUD API** ពេញលេញ៖

* **POST /courses** ➔ បង្កើត Course ក្នុង MongoDB
* **GET /courses** ➔ ទាញយកបញ្ជី Courses ពី MongoDB
* **GET /courses/:id** ➔ ទាញយក Course តាម ID
* **PATCH /courses/:id** ➔ កែប្រែទិន្នន័យ Course ក្នុង MongoDB
* **DELETE /courses/:id** ➔ លុប Course ចេញពី MongoDB`,
    codeSnippet: `// Service Layer (src/services/course.service.js)
import { Course } from "../models/course.model.js";

export const getAllCourses = async (query) => await Course.find(query);
export const getCourseById = async (id) => await Course.findById(id);
export const createCourse = async (data) => await Course.create(data);
export const updateCourse = async (id, data) => {
  return await Course.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
};
export const deleteCourse = async (id) => await Course.findByIdAndDelete(id);`,
  },
  {
    id: "M12-08",
    number: "08",
    title: "Creating Resources in MongoDB",
    khmerTitle: "ការបង្កើត Course ថ្មីក្នុង MongoDB (Course.create)",
    type: "lab",
    codeLanguage: "javascript",
    summary: `ការអនុវត្ត Service Function សម្រាប់បង្កើត Course Document ថ្មីក្នុង MongoDB៖

ជំហានអនុវត្ត៖
1. ទទួល \`courseData\`
2. ហៅ \`Course.create(courseData)\`
3. Mongoose ដំណើរការ Schema Validation និង Pre-save Hooks
4. បញ្ជូន Document ថ្មីដែលបាន Save ត្រឡប់មកវិញ`,
    codeSnippet: `// src/services/course.service.js
import { Course } from "../models/course.model.js";

export const createCourseService = async (courseData) => {
  // Step 1: Persist new course document to MongoDB
  const newCourse = await Course.create({
    title: courseData.title,
    instructor: courseData.instructor,
    price: courseData.price,
    level: courseData.level || "beginner"
  });

  return newCourse;
};`,
  },
  {
    id: "M12-09",
    number: "09",
    title: "Reading Resources from MongoDB",
    khmerTitle: "ការទាញយក Course ពី MongoDB (Course.find & findById)",
    type: "lab",
    codeLanguage: "javascript",
    summary: `ការទាញយក Course Documents ពី MongoDB តាមរយៈ Mongoose Queries៖

* ពិនិត្យវត្តមាន Course តាម \`_id\` ជាមួយ \`Course.findById(id)\`
* ប្រសិនបើរករកមិនឃើញ Throw Domain Error ភ្លាមៗ (កុំឱ្យ Controller ត្រូវ Check \`if (!course)\` ច្រើនដង)`,
    codeSnippet: `// src/services/course.service.js
import { Course } from "../models/course.model.js";
import { AppError } from "../errors/AppError.js";

export const getCourseByIdService = async (courseId) => {
  // Step 1: Query MongoDB collection by ObjectId
  const course = await Course.findById(courseId);

  // ⚠️ If not found in MongoDB -> Throw 404 AppError
  if (!course) {
    throw new AppError(\`Course with ID \${courseId} not found in database\`, 404);
  }

  return course;
};`,
  },
  {
    id: "M12-10",
    number: "10",
    title: "Updating Resources in MongoDB",
    khmerTitle: "ការកែប្រែ Course ក្នុង MongoDB (findByIdAndUpdate)",
    type: "lab",
    codeLanguage: "javascript",
    summary: `ការកែប្រែ Course ក្នុង MongoDB ដោយប្រើប្រាស់ \`Course.findByIdAndUpdate()\`៖

ជម្រើស Options ដ៏សំខាន់៖
* \`$set: updateData\`៖ កែប្រែតែ Fields ដែលបានបញ្ជូនមកប៉ុណ្ណោះ
* \`{ new: true }\`៖ ត្រឡប់ Updated Document ថ្មី
* \`{ runValidators: true }\`៖ បង្ខំឱ្យ Mongoose Run Schema Validation លើទិន្នន័យថ្មី`,
    codeSnippet: `// src/services/course.service.js
import { Course } from "../models/course.model.js";
import { AppError } from "../errors/AppError.js";

export const updateCourseService = async (courseId, updateData) => {
  const updated = await Course.findByIdAndUpdate(
    courseId,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!updated) {
    throw new AppError(\`Cannot update: Course \${courseId} not found\`, 404);
  }

  return updated;
};`,
  },
  {
    id: "M12-11",
    number: "11",
    title: "Deleting Resources & Cascading",
    khmerTitle: "ការលុប Course និងការលុប Cascading Lessons ក្នុង MongoDB",
    type: "lab",
    codeLanguage: "javascript",
    summary: `នៅពេលលុប Course មួយ យើងត្រូវគិតគូរដល់ **Parent-Child Cascading Cleanup**៖

នៅពេល Course ត្រូវបានលុប៖
1. លុប Course ចេញពី \`courses\` Collection
2. លុបរាល់ Lessons ទាំងអស់ដែលជាកូនរបស់ Course នោះ (\`Lesson.deleteMany({ courseId })\`) ជៀសវាងការបន្សល់ទុក Orphaned Records ក្នុង Database!`,
    codeSnippet: `// src/services/course.service.js
import { Course } from "../models/course.model.js";
import { Lesson } from "../models/lesson.model.js";
import { AppError } from "../errors/AppError.js";

export const deleteCourseWithLessons = async (courseId) => {
  // Step 1: Delete parent course
  const deletedCourse = await Course.findByIdAndDelete(courseId);
  if (!deletedCourse) {
    throw new AppError("Course not found", 404);
  }

  // Step 2: Cascading Delete all child lessons belonging to this course!
  const deletedLessons = await Lesson.deleteMany({ courseId });
  console.log(\`Deleted \${deletedLessons.deletedCount} associated lessons\`);

  return deletedCourse;
};`,
  },
  {
    id: "M12-12",
    number: "12",
    title: "Advanced MongoDB Queries",
    khmerTitle: "ការសរសេរ Advanced Queries ក្នុង Mongoose",
    type: "lab",
    codeLanguage: "javascript",
    summary: `Mongoose គាំទ្រការសរសេរ Method Chaining ដ៏មានឥទ្ធិពលសម្រាប់ Query Optimization៖

* **Filtering**៖ \`.find({ published: true })\`
* **Sorting**៖ \`.sort("-price")\`
* **Selecting Specific Fields**៖ \`.select("title price")\`
* **Pagination**៖ \`.skip(10).limit(5)\`
* **Execution**៖ \`.exec()\` ដើម្បីទទួលបាន Real Promise`,
    codeSnippet: `// src/services/course.service.js
import { Course } from "../models/course.model.js";

// Advanced Chained Query
export const getFeaturedCourses = async () => {
  return await Course.find({ published: true })
    .select("title price level instructor") // Field projection
    .sort("-price")                         // Sort descending by price
    .limit(10)                              // Top 10 only
    .lean();                                // 💡 Teaching Note: .lean() returns plain JS object for 3x faster speed!
};`,
  },
  {
    id: "M12-13",
    number: "13",
    title: "Dynamic Query Filtering",
    khmerTitle: "ការបង្កើត Dynamic Query Filtering ជាមួយ MongoDB Operators",
    type: "lab",
    codeLanguage: "javascript",
    summary: `ការបំប្លែង REST API Query Parameters ទៅជា **MongoDB Query Filter** ដោយស្វ័យប្រវត្តិ៖

បំប្លែង Parameter ពី URL ដូចជា \`price[gte]=20\` ទៅជា MongoDB Filter \`{ price: { $gte: 20 } }\`៖
1. ចម្លង \`req.query\`
2. ជំនួស \`gte\`, \`gt\`, \`lte\`, \`lt\` ដោយបន្ថែមសញ្ញា \`$\` នៅខាងមុខតាមរយៈ Regex`,
    codeSnippet: `// src/services/course.service.js
import { Course } from "../models/course.model.js";

export const filterCoursesService = async (queryString) => {
  // Step 1: Copy query and exclude pagination/sort reserved keys
  const queryObj = { ...queryString };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach(el => delete queryObj[el]);

  // Step 2: Advanced Filtering: Convert gte, gt, lte, lt to $gte, $gt, etc.
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\\b(gte|gt|lte|lt)\\b/g, match => \`$\${match}\`);

  // Step 3: Execute filtered MongoDB query
  const courses = await Course.find(JSON.parse(queryStr));
  return courses;
};`,
  },
  {
    id: "M12-14",
    number: "14",
    title: "Query Projection (.select())",
    khmerTitle: "ការជ្រើសរើស Fields ជាក់លាក់តាមរយៈ Query Projection",
    type: "lab",
    codeLanguage: "javascript",
    summary: `**Field Projection (\`.select()\`)** អនុញ្ញាតឱ្យ Client ជ្រើសរើសយកតែ Fields ណាដែលខ្លួនចង់បាន (ឧ. \`?fields=title,price\`)៖

អត្ថប្រយោជន៍ធំៗ៖
* កាត់បន្ថយ Network Bandwidth រវាង MongoDB និង Node.js
* ជៀសវាងការបញ្ជូន Sensitive Fields ទៅកាន់ Client (ដូចជា \`password\` ឬ Internal Notes)
* សញ្ញាដក (\`-\`) នៅពីមុខ Field មានន័យថាដក Field នោះចេញ (\`.select("-__v")\`)`,
    codeSnippet: `// src/services/course.service.js
import { Course } from "../models/course.model.js";

// Include only title, price, and level (exclude __v)
export const getCourseSummaries = async () => {
  return await Course.find()
    .select("title price level -__v");
};

// Dynamic Projection from URL: ?fields=title,price
export const getCoursesWithFields = async (fieldsQuery) => {
  let query = Course.find();
  if (fieldsQuery) {
    const fields = fieldsQuery.split(",").join(" ");
    query = query.select(fields);
  } else {
    query = query.select("-__v");
  }
  return await query;
};`,
  },
  {
    id: "M12-15",
    number: "15",
    title: "Sorting in MongoDB (.sort())",
    khmerTitle: "ការរៀបចំលំដាប់លំដោយ Sorting ក្នុង MongoDB",
    type: "lab",
    codeLanguage: "javascript",
    summary: `ការតម្រៀបទិន្នន័យក្នុង MongoDB តាមរយៈ **\`.sort()\`**៖

* **Ascending (ពីតូចទៅធំ)**៖ \`.sort("price")\` ឬ \`.sort({ price: 1 })\`
* **Descending (ពីធំទៅតូច)**៖ \`.sort("-price")\` ឬ \`.sort({ price: -1 })\`
* **Multi-field Sorting**៖ \`.sort("-price createdAt")\` (តម្រៀបតាមតម្លៃខ្ពស់មុន បើតម្លៃស្មើគ្នា តម្រៀបតាមថ្ងៃបង្កើតថ្មីបំផុត)`,
    codeSnippet: `// src/services/course.service.js
import { Course } from "../models/course.model.js";

// Sort dynamically from query: ?sort=-price,title
export const getSortedCourses = async (sortQuery) => {
  let query = Course.find();

  if (sortQuery) {
    const sortBy = sortQuery.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt"); // Default: Newest first
  }

  return await query;
};`,
  },
  {
    id: "M12-16",
    number: "16",
    title: "MongoDB Pagination (.skip() & .limit())",
    khmerTitle: "ការរៀបចំ Pagination ជាមួយ MongoDB skip() និង limit()",
    type: "lab",
    codeLanguage: "javascript",
    summary: `ការអនុវត្ត Pagination កម្រិត Production ជាមួយ MongoDB៖

* \`skip = (page - 1) * limit\`
* ប្រើ \`Course.countDocuments(filter)\` ដើម្បីរាប់ចំនួនសរុបនៃ Courses សម្រាប់គណនា \`totalPages\`
* ប្រើ \`.skip(skip).limit(limit)\` លើ Mongoose Query`,
    codeSnippet: `// src/services/course.service.js
import { Course } from "../models/course.model.js";

export const getPaginatedCourses = async (page = 1, limit = 10) => {
  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
  const skip = (pageNum - 1) * limitNum;

  // Step 1: Query paginated items and count in parallel
  const [courses, totalItems] = await Promise.all([
    Course.find().skip(skip).limit(limitNum).sort("-createdAt"),
    Course.countDocuments()
  ]);

  const totalPages = Math.ceil(totalItems / limitNum);

  return {
    courses,
    pagination: {
      currentPage: pageNum,
      limit: limitNum,
      totalItems,
      totalPages,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1
    }
  };
};`,
  },
  {
    id: "M12-17",
    number: "17",
    title: "Full-Text Search with Text Indexes",
    khmerTitle: "ការស្វែងរកទិន្នន័យតាមរយៈ MongoDB Text Index ($text)",
    type: "lab",
    codeLanguage: "javascript",
    summary: `ជំនួសឱ្យការប្រើ Regex យឺត MongoDB ផ្តល់នូវ **Full-Text Search Indexes** ដ៏មានអានុភាព៖

1. បង្កើត Text Index លើ Schema៖
   \`courseSchema.index({ title: "text", description: "text" })\`
2. ធ្វើការ Search ដោយប្រើ \`$text\` Operator៖
   \`Course.find({ $text: { $search: "express node" } })\`
3. គាំទ្រ Word Stemming, Case-insensitivity, និង Relevance Scoring!`,
    codeSnippet: `// src/models/course.model.js (Text Indexes)
// courseSchema.index({ title: "text", description: "text" });

import { Course } from "../models/course.model.js";

// Step 2: Full-text Search service function
export const searchCoursesService = async (searchTerm) => {
  // Query using MongoDB $text operator
  const courses = await Course.find(
    { $text: { $search: searchTerm } },
    { score: { $meta: "textScore" } } // Calculate search relevance score
  ).sort({ score: { $meta: "textScore" } }); // Sort by most relevant!

  return courses;
};`,
  },
  {
    id: "M12-18",
    number: "18",
    title: "Course & Lesson Relationships",
    khmerTitle: "ការគ្រប់គ្រងទំនាក់ទំនងរវាង Course និង Lessons ក្នុង Database",
    type: "lab",
    codeLanguage: "javascript",
    summary: `ការភ្ជាប់ទំនាក់ទំនង Parent-Child រវាង Course Collection និង Lesson Collection ក្នុង MongoDB៖

រចនាសម្ព័ន្ធ៖
* Course Document ផ្ទុកព័ត៌មានទូទៅនៃ Course
* Lesson Document ផ្ទុក \`courseId: { type: Schema.Types.ObjectId, ref: "Course" }\`
* សរសេរ Endpoint \`GET /api/v1/courses/:courseId/lessons\` ដោយ Query តាម \`{ courseId }\``,
    codeSnippet: `// src/services/course.service.js
import { Lesson } from "../models/lesson.model.js";
import { Course } from "../models/course.model.js";
import { AppError } from "../errors/AppError.js";

// GET /api/v1/courses/:courseId/lessons
export const getLessonsForCourse = async (courseId) => {
  // 1. Verify parent course exists
  const courseExists = await Course.exists({ _id: courseId });
  if (!courseExists) {
    throw new AppError("Course not found", 404);
  }

  // 2. Fetch all child lessons belonging to this course
  const lessons = await Lesson.find({ courseId }).sort("orderIndex");
  return lessons;
};`,
  },
  {
    id: "M12-19",
    number: "19",
    title: "Database Transactions (ACID in MongoDB)",
    khmerTitle: "ការប្រើប្រាស់ Database Transactions សម្រាប់ប្រតិបត្តិការ Atomic",
    type: "lab",
    codeLanguage: "javascript",
    summary: `**MongoDB Multi-Document Transactions** ផ្តល់នូវការធានា **ACID** ពេញលេញនៅពេលដែលអ្នកត្រូវកែប្រែ Documents ច្រើនក្នុងពេលតែមួយ។

ឧទាហរណ៍ជាក់ស្តែង៖ Course Enrollment Workflow
1. បង្កើត Enrollment Record
2. បន្ថែម Student Count លើ Course (\`$inc: { studentsCount: 1 }\`)
3. កាត់កង Balance / Create Invoice
4. ប្រសិនបើមានជំហានណាមួយបរាជ័យ (Fail) នោះ **Rollback** ការផ្លាស់ប្តូរទាំងអស់ត្រឡប់មកវិញដោយស្វ័យប្រវត្តិ (All-or-Nothing)!`,
    codeSnippet: `// src/services/enrollment.service.js
import mongoose from "mongoose";
import { Course } from "../models/course.model.js";
import { Enrollment } from "../models/enrollment.model.js";

export const enrollStudentTransaction = async (courseId, studentId) => {
  // Step 1: Start Mongoose Client Session
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Step 2: Create Enrollment Document inside session
    const [enrollment] = await Enrollment.create(
      [{ courseId, studentId, enrolledAt: new Date() }],
      { session }
    );

    // Step 3: Increment course student counter inside session
    await Course.findByIdAndUpdate(
      courseId,
      { $inc: { studentsCount: 1 } },
      { session }
    );

    // Step 4: Commit Transaction permanently to database
    await session.commitTransaction();
    return enrollment;
  } catch (error) {
    // ⚠️ On error: Abort transaction and rollback all database writes!
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession(); // Always end session!
  }
};`,
  },
];
