/**
 * m12.mjs - Module 10: Mongoose ODM (20 topics)
 * Domain: Course Catalog API (Mongoose Schema, Model, CRUD, Hooks, Virtuals, Population)
 */

export const M10 = [
  {
    id: "M10-01",
    number: "01",
    title: "What is Mongoose?",
    khmerTitle: "អ្វីជា Mongoose ODM និងអត្ថប្រយោជន៍លើ Node.js",
    type: "concept",
    codeLanguage: "javascript",
    summary: `**Mongoose** គឺជា **Object Data Modeling (ODM)** Library ដ៏មានឥទ្ធិពលបំផុតសម្រាប់ MongoDB និង Node.js។

Mongoose ផ្តល់នូវអត្ថប្រយោជន៍ធំៗ ៤៖
1. **Schema Definition**៖ កំណត់រចនាសម្ព័ន្ធទិន្នន័យច្បាស់លាស់ ជួយការពារទិន្នន័យមិនឱ្យរញ៉េរញ៉ៃ
2. **Built-in Validation**៖ ត្រួតពិនិត្យប្រភេទទិន្នន័យមុនពេល Save ទៅកាន់ Database
3. **Middleware Hooks**៖ ដំណើរការកូដស្វ័យប្រវត្តិកំឡុង Lifecycle (\`pre('save')\`, \`post('save')\`)
4. **Population ($lookup replacement)**៖ ភ្ជាប់ទំនាក់ទំនងឯកសាររវាង Collections យ៉ាងងាយស្រួល`,
    codeSnippet: `import mongoose, { Schema } from "mongoose";

// Step 1: Define Course Schema with Mongoose ODM
const courseSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true, min: 0 }
});

// Step 2: Compile Model
export const Course = mongoose.model("Course", courseSchema);`,
  },
  {
    id: "M10-02",
    number: "02",
    title: "Installing Mongoose",
    khmerTitle: "ការដំឡើងកញ្ចប់ Mongoose ក្នុង Node.js Project",
    type: "lab",
    codeLanguage: "bash",
    summary: `ការដំឡើងកញ្ចប់ **\`mongoose\`** ក្នុង Course API Project តាមរយៈ npm៖

* ដំឡើងជំនាន់ចុងក្រោយ (\`mongoose@latest\`)
* Mongoose ជំនាន់ v8+ គាំទ្រ ES Modules (\`import/export\`) និង Native JavaScript Promises ដោយមិនបាច់ប្រើ Callbacks ទៀតឡើយ`,
    codeSnippet: `# Install Mongoose into the course-catalog-api project
npm install mongoose

# Verify installation in package.json
cat package.json | grep mongoose`,
  },
  {
    id: "M10-03",
    number: "03",
    title: "Connecting MongoDB",
    khmerTitle: "ការភ្ជាប់ Express ទៅកាន់ MongoDB ជាមួយ mongoose.connect()",
    type: "lab",
    codeLanguage: "javascript",
    summary: `ការបង្កើត Connection Module ដាច់ដោយឡែកនៅ **\`src/config/db.js\`** ដើម្បីភ្ជាប់ទៅកាន់ MongoDB តាមរយៈ \`mongoose.connect()\`៖

គោលការណ៍សំខាន់ៗ៖
* អាន Connection URI ពី \`process.env.DATABASE_URL\`
* ប្រើប្រាស់ \`try/catch\` ដើម្បីចាប់កំហុសនៅពេល Database មិនអាចតភ្ជាប់បាន
* ត្រួតពិនិត្យ Connection Events (\`connected\`, \`error\`, \`disconnected\`)`,
    codeSnippet: `// src/config/db.js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL);
    console.log(\`✅ MongoDB Connected: \${conn.connection.host} / \${conn.connection.name}\`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1); // 💡 Teaching Note: Exit process on DB failure in production
  }
};

// Event Listeners for connection lifecycle
mongoose.connection.on("disconnected", () => console.warn("⚠️ MongoDB disconnected!"));
mongoose.connection.on("reconnected", () => console.log("🔄 MongoDB reconnected!"));`,
  },
  {
    id: "M10-04",
    number: "04",
    title: "Mongoose Schema",
    khmerTitle: "ការកំណត់រចនាសម្ព័ន្ធ CourseSchema ជាមួយ mongoose.Schema",
    type: "concept",
    codeLanguage: "javascript",
    summary: `**Schema** គឺជាប្លង់មេ (Blueprint) ដែលកំណត់ថាតើ Document នីមួយៗក្នុង Collection ត្រូវមាន Fields អ្វីខ្លះ ប្រភេទ Data Type ណា និងលក្ខខណ្ឌ Validation យ៉ាងដូចម្តេច។

ការរៀបចំ \`courseSchema\` សម្រាប់ Course API របស់យើង៖
* \`title\` (String)
* \`instructor\` (String)
* \`price\` (Number)
* \`level\` (String)
* \`published\` (Boolean)`,
    codeSnippet: `// src/models/course.schema.js
import { Schema } from "mongoose";

// Step 1: Define Schema Blueprint
export const courseSchema = new Schema({
  title: {
    type: String,
    required: [true, "Course title is required"],
    trim: true
  },
  instructor: {
    type: String,
    required: [true, "Instructor name is required"]
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"]
  },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner"
  },
  published: {
    type: Boolean,
    default: false
  }
});`,
  },
  {
    id: "M10-05",
    number: "05",
    title: "Mongoose Model",
    khmerTitle: "ការបង្កើត Model តាមរយៈ mongoose.model()",
    type: "concept",
    codeLanguage: "javascript",
    summary: `**Model** គឺជា Wrapper ដែលចងភ្ជាប់ Schema ទៅនឹង MongoDB Collection ជាក់ស្តែង។

របៀបដែល Mongoose បង្កើត Collection Name ដោយស្វ័យប្រវត្តិ៖
* នៅពេលអ្នកប្រកាស \`mongoose.model("Course", courseSchema)\`
* Mongoose នឹងយកឈ្មោះ \`"Course"\` ទៅធ្វើជា **Lowercase Plural** ដោយស្វ័យប្រវត្តិ គឺ **\`"courses"\`**!`,
    codeSnippet: `// src/models/course.model.js
import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true }
});

// Step 1: Compile Schema into Model
// 💡 Teaching Note: "Course" compiles to collection name "courses"
export const Course = mongoose.model("Course", courseSchema);`,
  },
  {
    id: "M10-06",
    number: "06",
    title: "SchemaTypes in Mongoose",
    khmerTitle: "ការស្វែងយល់ពី SchemaTypes ទាំងអស់ក្នុង Mongoose",
    type: "concept",
    codeLanguage: "javascript",
    summary: `Mongoose ផ្តល់នូវ **SchemaTypes** ស្តង់ដារជាច្រើន៖

* **\`String\`**៖ អត្ថបទ (គាំទ្រ \`trim\`, \`lowercase\`, \`uppercase\`, \`minlength\`, \`maxlength\`)
* **\`Number\`**៖ លេខ (គាំទ្រ \`min\`, \`max\`)
* **\`Boolean\`**៖ តម្លៃពិត ឬមិនពិត
* **\`Date\`**៖ កាលបរិច្ឆេទ
* **\`Buffer\`**៖ ទិន្នន័យ Binary
* **\`Schema.Types.ObjectId\`**៖ សោ Foreign Reference ទៅកាន់ Document ផ្សេង
* **\`Array\`**៖ បញ្ជីទិន្នន័យ ឬ Sub-documents`,
    codeSnippet: `import { Schema, model } from "mongoose";

const courseDetailsSchema = new Schema({
  title: { type: String, trim: true, required: true },
  durationHours: { type: Number, min: 1 },
  isCertificateIncluded: { type: Boolean, default: true },
  releaseDate: { type: Date, default: Date.now },
  tags: [{ type: String, lowercase: true }], // Array of lowercase strings
  instructorId: { type: Schema.Types.ObjectId, ref: "User" } // Reference to User Model!
});

export const CourseDetails = model("CourseDetails", courseDetailsSchema);`,
  },
  {
    id: "M10-07",
    number: "07",
    title: "Schema Validation in Mongoose",
    khmerTitle: "ការត្រួតពិនិត្យទិន្នន័យតាមរយៈ Built-in Validators",
    type: "concept",
    codeLanguage: "javascript",
    summary: `Mongoose អនុវត្ត **Validation** នៅកម្រិត Application មុនពេល Document ត្រូវបានបញ្ជូនទៅ Save ក្នុង MongoDB។

Built-in Validators សំខាន់ៗ៖
* **\`min\` និង \`max\`** សម្រាប់ Numbers
* **\`minlength\` និង \`maxlength\`** សម្រាប់ Strings
* **\`enum\`** សម្រាប់កំណត់តម្លៃជម្រើសថេរ (Fixed Choices)
* **\`match\`** សម្រាប់ត្រួតពិនិត្យ Regular Expression (Regex)`,
    codeSnippet: `import { Schema } from "mongoose";

export const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: [5, "Title must be at least 5 characters long"],
    maxlength: [100, "Title cannot exceed 100 characters"]
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Course price cannot be negative"],
    max: [999, "Course price cannot exceed $999"]
  },
  level: {
    type: String,
    enum: {
      values: ["beginner", "intermediate", "advanced"],
      message: "{VALUE} is not a valid course level"
    }
  }
});`,
  },
  {
    id: "M10-08",
    number: "08",
    title: "Required Fields & Custom Messages",
    khmerTitle: "ការកំណត់ Required Fields និង Custom Error Messages",
    type: "lab",
    codeLanguage: "javascript",
    summary: `ការកំណត់ Required Field ក្នុង Mongoose អាចសរសេរបាន ២ របៀប៖

* សាមញ្ញ៖ \`required: true\` (បង្ហាញ Error Message លំនាំដើមរបស់ Mongoose)
* **វិជ្ជាជីវៈ (អនុសាសន៍)**៖ ផ្តល់នូវ Custom Error Message តាមរយៈ Array៖
  \`required: [true, "Custom error message here"]\`

វិធីនេះជួយឱ្យ Error Response របស់ API មានភាពរួសរាយ និងងាយយល់សម្រាប់ Client។`,
    codeSnippet: `import { Schema } from "mongoose";

export const courseSchema = new Schema({
  title: {
    type: String,
    required: [true, "A course must have an official title"]
  },
  slug: {
    type: String,
    required: [true, "URL slug is strictly required for SEO"]
  },
  instructor: {
    type: String,
    required: [true, "Course must be assigned to an instructor"]
  }
});`,
  },
  {
    id: "M10-09",
    number: "09",
    title: "Default Values in Schema",
    khmerTitle: "ការកំណត់ Default Values ក្នុង Schema",
    type: "concept",
    codeLanguage: "javascript",
    summary: `ប្រសិនបើ Client មិនបានបញ្ជូន Field ណាមួយមកទេ Mongoose នឹងបំពេញ **Default Value** ដោយស្វ័យប្រវត្តិតាមការកំណត់របស់យើងក្នុង Schema។

អាចជា៖
* តម្លៃថេរ (Static value)៖ \`default: false\`, \`default: "beginner"\`
* អនុគមន៍ (Dynamic function)៖ \`default: Date.now\``,
    codeSnippet: `import { Schema } from "mongoose";

export const courseSchema = new Schema({
  title: { type: String, required: true },
  published: { type: Boolean, default: false }, // Default unpublished
  level: { type: String, default: "beginner" },
  viewsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now } // Dynamic timestamp function
});`,
  },
  {
    id: "M10-10",
    number: "10",
    title: "Timestamps Option",
    khmerTitle: "ការប្រើប្រាស់ Option { timestamps: true }",
    type: "lab",
    codeLanguage: "javascript",
    summary: `ជំនួសឱ្យការបង្កើត Fields \`createdAt\` និង \`updatedAt\` ដោយដៃ Mongoose ផ្តល់ Option **\`{ timestamps: true }\`** ដែលជាដំណោះស្រាយដ៏ឆ្លាតវៃ។

មុខងារស្វ័យប្រវត្តិ៖
* បន្ថែម \`createdAt\` កាលបរិច្ឆេទដែល Document ត្រូវបានបង្កើតដំបូង
* បន្ថែម និងកែប្រែ \`updatedAt\` ដោយស្វ័យប្រវត្តិកំឡុងពេល \`save()\` ឬ \`findByIdAndUpdate()\` នីមួយៗ`,
    codeSnippet: `import { Schema, model } from "mongoose";

// Step 1: Pass { timestamps: true } as the second argument to Schema
const courseSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true }
}, {
  timestamps: true // Automatically manages createdAt and updatedAt!
});

export const Course = model("Course", courseSchema);`,
  },
  {
    id: "M10-11",
    number: "11",
    title: "Mongoose Virtuals",
    khmerTitle: "ការបង្កើត Virtual Properties (Computed Fields)",
    type: "concept",
    codeLanguage: "javascript",
    summary: `**Virtuals** គឺជា Document Properties ដែលអ្នកអាចអាន ឬសរសេរបាន ប៉ុន្តែពួកវា **មិនត្រូវបានរក្សាទុកលើ MongoDB Database ឡើយ** (វាត្រូវបានគណនានៅពេល Run-time)។

ឧទាហរណ៍ជាក់ស្តែងលើ Course API៖
* គណនាតម្លៃបញ្ចុះតម្លៃ \`discountedPrice\`
* គណនា \`durationHours\` ចេញពី \`durationMinutes\`
* ត្រូវកំណត់ \`{ virtuals: true }\` ក្នុង \`toJSON\` Option ដើម្បីឱ្យវាបង្ហាញពេលផ្ញើ Response ទៅកាន់ Client`,
    codeSnippet: `import { Schema, model } from "mongoose";

const courseSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercent: { type: Number, default: 10 }
}, {
  toJSON: { virtuals: true }, // 💡 Include virtuals when converting to JSON!
  toObject: { virtuals: true }
});

// Step 1: Define Virtual Property for Final Price
courseSchema.virtual("finalPrice").get(function() {
  // "this" points to the current document
  return Number((this.price * (1 - this.discountPercent / 100)).toFixed(2));
});

export const Course = model("Course", courseSchema);`,
  },
  {
    id: "M10-12",
    number: "12",
    title: "CRUD with Mongoose",
    khmerTitle: "ទិដ្ឋភាពទូទៅនៃប្រតិបត្តិការ CRUD ជាមួយ Mongoose",
    type: "concept",
    codeLanguage: "javascript",
    summary: `Mongoose ផ្តល់ជូននូវ Methods សម្បូរបែបសម្រាប់ប្រតិបត្តិការ CRUD លើ MongoDB៖

* **Create**៖ \`Model.create()\`, \`new Model()\` + \`save()\`
* **Read**៖ \`Model.find()\`, \`Model.findById()\`, \`Model.findOne()\`
* **Update**៖ \`Model.findByIdAndUpdate()\`, \`Model.updateOne()\`
* **Delete**៖ \`Model.findByIdAndDelete()\`, \`Model.deleteOne()\`

Methods ទាំងអស់នេះ Return **Mongoose Query Promises** ដែលគាំទ្រ Async/Await យ៉ាងរលូន។`,
    codeSnippet: `/* MONGOOSE CRUD CHEATSHEET FOR COURSE API:
   -------------------------------------------------------------
   CREATE:  const newCourse = await Course.create(req.body);
   READ:    const courses   = await Course.find({ published: true });
   READ 1:  const course    = await Course.findById(id);
   UPDATE:  const updated   = await Course.findByIdAndUpdate(id, req.body, { new: true });
   DELETE:  await Course.findByIdAndDelete(id);
   -------------------------------------------------------------
*/`,
  },
  {
    id: "M10-13",
    number: "13",
    title: "Creating Documents",
    khmerTitle: "ការបញ្ចូល Document ថ្មី (Course.create & new Course)",
    type: "lab",
    codeLanguage: "javascript",
    summary: `មាន ២ របៀបក្នុងការបង្កើត Document ថ្មីក្នុង Mongoose៖

1. **\`Course.create(data)\` (ពេញនិយមបំផុត)**៖ ខ្លី រហ័ស និងធ្វើ Validation រួច Save ទៅកាន់ MongoDB ក្នុងមួយជំហាន
2. **\`new Course(data)\` + \`course.save()\`**៖ ផ្តល់ភាពបត់បែននៅពេលអ្នកចង់កែប្រែ Properties ខ្លះសិនមុននឹង Save`,
    codeSnippet: `import { Course } from "./models/course.model.js";

// Method 1: Direct Course.create() (Recommended for Services)
export const addCourse = async (courseData) => {
  const course = await Course.create({
    title: courseData.title,
    instructor: courseData.instructor,
    price: courseData.price
  });
  console.log("Created Course ID:", course._id);
  return course;
};

// Method 2: new Course() instance + save()
export const addCourseWithCustomLogic = async (courseData) => {
  const course = new Course(courseData);
  // Custom business modification before saving:
  course.title = course.title.toUpperCase();
  await course.save();
  return course;
};`,
  },
  {
    id: "M10-14",
    number: "14",
    title: "Finding Documents",
    khmerTitle: "ការទាញយក Documents (find, findById, findOne)",
    type: "lab",
    codeLanguage: "javascript",
    summary: `Methods សំខាន់ៗទាំង ៣ សម្រាប់អានទិន្នន័យពី MongoDB៖

1. **\`Course.find(filter)\`**៖ ត្រឡប់ Array នៃ Documents (ត្រឡប់ \`[]\` បើគ្មាន)
2. **\`Course.findById(id)\`**៖ ស្វែងរកតាម \`_id\` ដោយផ្ទាល់ (ត្រឡប់ \`null\` បើគ្មាន)
3. **\`Course.findOne(filter)\`**៖ ស្វែងរក Document ដំបូងបង្អស់ដែលត្រូវនឹងលក្ខខណ្ឌ`,
    codeSnippet: `import { Course } from "./models/course.model.js";

// 1. Fetch all published courses
const allPublished = await Course.find({ published: true });

// 2. Fetch single course by ID
const course = await Course.findById("6648e58319f3a9e224e78891");
if (!course) {
  console.log("Course not found!");
}

// 3. Find unique course by title slug
const uniqueCourse = await Course.findOne({ slug: "mastering-express" });`,
  },
  {
    id: "M10-15",
    number: "15",
    title: "Query Filter Operators ($gte, $lte, $in)",
    khmerTitle: "ការប្រើប្រាស់ Query Filter Operators ក្នុង Mongoose",
    type: "lab",
    codeLanguage: "javascript",
    summary: `MongoDB Filter Operators ដ៏មានឥទ្ធិពល៖

* **Comparison**៖ \`$gt\` (>), \`$gte\` (>=), \`$lt\` (<), \`$lte\` (<=), \`$ne\` (!=)
* **Inclusion**៖ \`$in: [...]\` (ផ្គូផ្គងតម្លៃណាមួយក្នុង Array)
* **Logical**៖ \`$or: [...]\`, \`$and: [...]\``,
    codeSnippet: `import { Course } from "./models/course.model.js";

// Filter: Price between $20 and $60, and level is beginner or intermediate
const filteredCourses = await Course.find({
  price: { $gte: 20, $lte: 60 },
  level: { $in: ["beginner", "intermediate"] },
  published: true
});

// Logical OR Query: Free courses OR Special promo courses
const promoCourses = await Course.find({
  $or: [
    { price: 0 },
    { isPromo: true }
  ]
});`,
  },
  {
    id: "M10-16",
    number: "16",
    title: "Updating Documents in Mongoose",
    khmerTitle: "ការកែប្រែទិន្នន័យ (findByIdAndUpdate & runValidators)",
    type: "lab",
    codeLanguage: "javascript",
    summary: `Method ពេញនិយមបំផុតសម្រាប់កែប្រែ Document គឺ **\`Course.findByIdAndUpdate(id, update, options)\`**។

Options ដ៏សំខាន់ដែលមិនអាចខ្វះបាន៖
* **\`new: true\`**៖ ត្រឡប់ Document ថ្មីដែលបានកែប្រែរួច (តាមលំនាំដើម Mongoose ត្រឡប់ Document ចាស់មុនកែប្រែ)
* **\`runValidators: true\`**៖ បង្ខំឱ្យ Mongoose ដំណើរការ Schema Validation ឡើងវិញលើ Fields ថ្មី!`,
    codeSnippet: `import { Course } from "./models/course.model.js";

export const updateCourseService = async (courseId, updateData) => {
  // Step 1: Update with critical options enabled
  const updatedCourse = await Course.findByIdAndUpdate(
    courseId,
    { $set: updateData },
    {
      new: true,           // 💡 Return the modified document!
      runValidators: true  // 💡 Crucial: Enforce schema validation rules on updates!
    }
  );

  return updatedCourse;
};`,
  },
  {
    id: "M10-17",
    number: "17",
    title: "Deleting Documents",
    khmerTitle: "ការលុបទិន្នន័យ (findByIdAndDelete & Soft Deletes)",
    type: "lab",
    codeLanguage: "javascript",
    summary: `ការលុប Document ជាមួយ Mongoose៖

1. **Hard Delete**៖ \`Course.findByIdAndDelete(courseId)\`
2. **Soft Delete (អនុសាសន៍ Production)**៖ \`Course.findByIdAndUpdate(courseId, { isDeleted: true, deletedAt: new Date() })\``,
    codeSnippet: `import { Course } from "./models/course.model.js";

// Hard Delete: Permanently purged from MongoDB
export const purgeCourse = async (id) => {
  return await Course.findByIdAndDelete(id);
};

// Soft Delete: Preserves record for audit/recovery
export const softDeleteCourse = async (id) => {
  return await Course.findByIdAndUpdate(
    id,
    { isDeleted: true, deletedAt: new Date() },
    { new: true }
  );
};`,
  },
  {
    id: "M10-18",
    number: "18",
    title: "Mongoose Methods (Instance & Static)",
    khmerTitle: "ការបង្កើត Instance Methods និង Static Methods",
    type: "lab",
    codeLanguage: "javascript",
    summary: `Mongoose អនុញ្ញាតឱ្យយើងសរសេរ Custom Domain Methods លើ Model ដោយផ្ទាល់៖

* **Instance Methods (\`methods\`)**៖ ដំណើរការលើ Document ជាក់លាក់មួយ (ឧ. \`course.publishCourse()\`)
* **Static Methods (\`statics\`)**៖ ដំណើរការលើ Model Collection ទាំងមូល (ឧ. \`Course.findTopRated()\`)`,
    codeSnippet: `import { Schema, model } from "mongoose";

const courseSchema = new Schema({
  title: String,
  published: { type: Boolean, default: false },
  rating: { type: Number, default: 0 }
});

// Step 1: Instance Method (operates on 1 document)
courseSchema.methods.publish = async function() {
  this.published = true;
  return await this.save();
};

// Step 2: Static Method (operates on the Model collection)
courseSchema.statics.findTopRated = function(minRating = 4.5) {
  return this.find({ rating: { $gte: minRating } });
};

export const Course = model("Course", courseSchema);`,
  },
  {
    id: "M10-19",
    number: "19",
    title: "Mongoose Middleware (Pre & Post Hooks)",
    khmerTitle: "ការប្រើប្រាស់ Mongoose Pre & Post Hooks",
    type: "lab",
    codeLanguage: "javascript",
    summary: `**Mongoose Middleware (Hooks)** អនុញ្ញាតឱ្យយើងស្ទាក់ចាប់ (Intercept) Document មុន ឬក្រោយពេល Save, Validate, ឬ Remove។

ករណីប្រើប្រាស់ជាក់ស្តែងសម្រាប់ Course API៖
* **\`pre('save')\`**៖ បង្កើត SEO URL Slug ស្វ័យប្រវត្តិចេញពី \`title\`
* **\`pre('save')\`**៖ ធ្វើ Password Hashing មុននឹង Save User Document
* **\`post('save')\`**៖ កត់ត្រា Audit Log ឬផ្ញើ Notification បន្ទាប់ពី Save ជោគជ័យ`,
    codeSnippet: `import { Schema, model } from "mongoose";

const courseSchema = new Schema({
  title: { type: String, required: true },
  slug: String
});

// Step 1: Pre-save hook to generate URL Slug automatically!
courseSchema.pre("save", function(next) {
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
  next();
});

export const Course = model("Course", courseSchema);`,
  },
  {
    id: "M10-20",
    number: "20",
    title: "Mongoose Population (.populate())",
    khmerTitle: "ការភ្ជាប់ទំនាក់ទំនងឯកសារជាមួយ .populate()",
    type: "lab",
    codeLanguage: "javascript",
    summary: `**Population** គឺជាជម្រើសជំនួស SQL JOINs ក្នុង Mongoose។

ដំណើរការការងារ៖
* Lesson Document រក្សាទុកតែ \`courseId: ObjectId("...")\` ប៉ុណ្ណោះ
* នៅពេលហៅ \`.populate("courseId")\` Mongoose នឹង Query ទៅកាន់ \`courses\` Collection ដោយស្វ័យប្រវត្តិតាមរយៈ \`$lookup\` ហើយជំនួស \`courseId\` ដោយ Course Document ពេញលេញ!`,
    codeSnippet: `import { Lesson } from "./models/lesson.model.js";

// Fetch lesson and automatically populate parent Course data
export const getLessonWithCourse = async (lessonId) => {
  // 💡 Teaching Note: Replaces courseId ObjectId with full Course Document!
  const lesson = await Lesson.findById(lessonId)
    .populate("courseId", "title instructor price level");

  return lesson;
};`,
  },
];
