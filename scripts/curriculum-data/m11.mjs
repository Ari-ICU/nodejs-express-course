/**
 * m11.mjs - Module 11: MongoDB Fundamentals (14 topics)
 * Domain: Course Catalog API (Transitioning from In-Memory to Real NoSQL Database)
 */

export const M11 = [
  {
    id: "M11-01",
    number: "01",
    title: "What is MongoDB?",
    khmerTitle: "អ្វីជាប្រព័ន្ធទិន្នន័យ MongoDB?",
    type: "concept",
    codeLanguage: "javascript",
    summary: `**MongoDB** គឺជា Database NoSQL បែប Document-oriented ដ៏ទំនើប និងពេញនិយមបំផុតសម្រាប់ Node.js Backend។

លក្ខណៈពិសេសចម្បងៗ៖
* រក្សាទុកទិន្នន័យជាឯកសារ **BSON (Binary JSON)** ដែលមានទម្រង់ដូចជា JavaScript Object ១០០%
* គាំទ្រ Dynamic & Flexible Schema — មិនចាំបាច់រៀបចំ Table Migrations តឹងរឹងដូច SQL ឡើយ
* ផ្តល់នូវ High Scalability តាមរយៈ Horizontal Sharding និង Automatic Failover Replicas

នៅក្នុង Course នេះ យើងនឹងភ្ជាប់ **Course Catalog API** ពី Modules 06-10 ទៅកាន់ MongoDB Database ពិតប្រាកដ។`,
    codeSnippet: `// A MongoDB document looks and feels just like a native JavaScript object!
{
  "_id": "6648e58319f3a9e224e78891",
  "title": "Full-Stack Node.js & Express Architecture",
  "instructor": "Ratha",
  "price": 49.99,
  "level": "intermediate",
  "published": true,
  "tags": ["nodejs", "express", "mongodb"],
  "createdAt": "2026-10-14T08:00:00.000Z"
}`,
  },
  {
    id: "M11-02",
    number: "02",
    title: "SQL vs NoSQL",
    khmerTitle: "ការប្រៀបធៀប SQL vs NoSQL",
    type: "concept",
    codeLanguage: "javascript",
    summary: `ការប្រៀបធៀបរវាង **Relational SQL Databases** និង **Document NoSQL Database (MongoDB)**៖

* **SQL Databases**៖ រក្សាទុកទិន្នន័យក្នុង Tables ដ៏តឹងរឹង (Rigid Schemas) ជាមួយ Foreign Keys និង Multi-table JOINs។
* **Document NoSQL Database (MongoDB)**៖ រក្សាទុកទិន្នន័យជាឯកសារ BSON Documents (JSON-like) ដែលមានភាពបត់បែនខ្ពស់ (Polymorphic) ងាយស្រួល Scale តាមបែប Horizontal Sharding និងមានល្បឿន Query លឿនបំផុតជាមួយ Node.js & Express។

នៅក្នុង Course នេះ យើងប្រើប្រាស់ **MongoDB** ជា Database ស្នូលជាមួយ Express តាមរយៈ **Mongoose ODM**។`,
    codeSnippet: `/* SQL vs NoSQL Conceptual Comparison:
   Relational SQL:              NoSQL (MongoDB - Used in this Course):
   -----------------------      -------------------------------------
   - Database                   - Database
   - Table                      - Collection
   - Row / Record               - Document (BSON)
   - Column                     - Field
   - Foreign Key JOIN           - Embedded Document or $lookup Reference
   - Rigid Table Migration      - Dynamic, Flexible Document Schema
*/`,
  },
  {
    id: "M11-03",
    number: "03",
    title: "MongoDB Architecture",
    khmerTitle: "ស្ថាបត្យកម្មប្រព័ន្ធ MongoDB (Replica Sets & Sharding)",
    type: "architecture",
    codeLanguage: "javascript",
    summary: `MongoDB សម្រេចបាននូវ High Availability និង Scalability តាមរយៈយន្តការពីរ៖

1. **Replica Sets (High Availability)**៖ ប្រព័ន្ធ cluster ដែលមានយ៉ាងហោចណាស់ ៣ Nodes (Primary ១ និង Secondary ២)។ Primary ទទួលខុសត្រូវលើ Writes ទាំងអស់ ហើយធ្វើ Replicate ទិន្នន័យទៅ Secondaries ដោយស្វ័យប្រវត្តិតាមរយៈ Oplog។
2. **Sharding (Horizontal Scalability)**៖ ការបំបែកទិន្នន័យជាចំណែកៗ (Partitions) ឆ្លងកាត់ Servers ច្រើននៅពេលទិន្នន័យកើនដល់រាប់លាន Records។`,
    codeSnippet: `/* MongoDB Replica Set Architecture for Course Catalog:
   [Express API Client (Node.js)]
              │
              ▼
   ┌───────────────────────┐
   │    PRIMARY NODE       │ (Handles Writes & Primary Reads)
   └──────────┬────────────┘
              │ (Asynchronous Replication via Oplog)
        ┌─────┴─────┐
        ▼           ▼
   [SECONDARY] [SECONDARY] (Auto Failover & Read Scalability)
*/`,
  },
  {
    id: "M11-04",
    number: "04",
    title: "Database in MongoDB",
    khmerTitle: "ការបង្កើត និងគ្រប់គ្រង Database (course_catalog_db)",
    type: "concept",
    codeLanguage: "bash",
    summary: `នៅក្នុង MongoDB **Database** គឺជា Container រូបវន្តសម្រាប់ផ្ទុក Collections ទាំងអស់។

ចំនុចពិសេសរបស់ MongoDB៖
* Database នឹងត្រូវបង្កើតឡើងដោយស្វ័យប្រវត្តិ នៅពេលដែលអ្នកបញ្ចូល Document ដំបូងបង្អស់ចូលទៅកាន់ Collection ណាមួយ
* Server មួយអាចផ្ទុក Databases ច្រើនដាច់ដោយឡែកពីគ្នា
* សម្រាប់ Course របស់យើង យើងនឹងប្រើប្រាស់ Database ឈ្មោះ **\`course_catalog_db\`**`,
    codeSnippet: `# Step 1: Open MongoDB Shell
mongosh

# Step 2: Switch or create Course Catalog Database
use course_catalog_db

# Step 3: Check currently selected database
db.getName()
# Output: course_catalog_db`,
  },
  {
    id: "M11-05",
    number: "05",
    title: "Collections in MongoDB",
    khmerTitle: "ការគ្រប់គ្រង Collections (courses, lessons, instructors)",
    type: "concept",
    codeLanguage: "javascript",
    summary: `**Collection** គឺជាបណ្តុំនៃ Documents ដែលប្រៀបដូចជា Table ក្នុង SQL ដែរ។

លក្ខណៈពិសេស៖
* Collections មិនបង្ខំ Strict Schema នៅកម្រិត Database Engine ឡើយ
* អនុសញ្ញាដាក់ឈ្មោះ៖ ប្រើ **Lowercase Plural Nouns** ជានិច្ច (ដូចជា \`courses\`, \`lessons\`, \`users\`)
* Collections ចម្បងក្នុង Course API របស់យើង៖ \`courses\`, \`lessons\`, និង \`users\``,
    codeSnippet: `// In mongosh:
// Step 1: Explicitly create collection
db.createCollection("courses");
db.createCollection("lessons");

// Step 2: List all collections in current database
show collections;
// Output: courses, lessons

// Step 3: Drop collection if needed
// db.courses.drop();`,
  },
  {
    id: "M11-06",
    number: "06",
    title: "Documents (BSON Structure)",
    khmerTitle: "រចនាសម្ព័ន្ធនៃ Document ក្នុង MongoDB",
    type: "concept",
    codeLanguage: "javascript",
    summary: `**Document** គឺជា Record នីមួយៗដែលស្ថិតក្នុង Collection។ វាត្រូវបានរក្សាទុកជាទម្រង់ **BSON (Binary JSON)**។

លក្ខណៈសម្បត្តិនៃ Document៖
* ផ្ទុកជា Field-and-Value pairs (ឧ. \`"title": "Node.js Basics"\`)
* ទំហំអតិបរមានៃ Document មួយគឺ **16 MB**
* Document នីមួយៗមាន Unique Primary Key ឈ្មោះ **\`_id\`** ដោយស្វ័យប្រវត្តិ`,
    codeSnippet: `// Sample Course Document in BSON representation
{
  "_id": ObjectId("6648e58319f3a9e224e78891"),
  "title": "Mastering Express.js Routing",
  "price": 39.99,
  "level": "intermediate",
  "tags": ["backend", "express", "javascript"],
  "instructor": {
    "name": "Ratha",
    "email": "ratha@example.com"
  },
  "isPublished": true,
  "createdAt": ISODate("2026-10-14T08:00:00Z")
}`,
  },
  {
    id: "M11-07",
    number: "07",
    title: "Fields & BSON Data Types",
    khmerTitle: "ការកំណត់ Fields និងប្រភេទ BSON Data Types",
    type: "concept",
    codeLanguage: "javascript",
    summary: `BSON គាំទ្រប្រភេទ Data Types សម្បូរបែបជាង JSON ធម្មតា៖

* **String**៖ អត្ថបទ UTF-8
* **NumberInt / NumberLong / Double**៖ លេខគត់ 32-bit, 64-bit, ឬ Floating point (តម្លៃ Price)
* **Boolean**៖ \`true\` ឬ \`false\`
* **Date**៖ 64-bit integer timestamp គិតជា milliseconds
* **ObjectId**៖ 12-byte Unique Identifier របស់ MongoDB
* **Array**៖ បញ្ជី Array នៃតម្លៃ ឬ Sub-documents
* **Null**៖ តម្លៃទទេ`,
    codeSnippet: `// Demonstrating varied BSON types in a Course Document
{
  "_id": ObjectId("6648e58319f3a9e224e78891"), // ObjectId
  "title": "Node.js & MongoDB Essentials",      // String
  "enrollmentCount": NumberInt(250),             // 32-bit Integer
  "price": 49.99,                                // Double
  "isFeatured": true,                            // Boolean
  "prerequisites": ["HTML", "JavaScript"],       // Array of Strings
  "publishedAt": ISODate("2026-10-14T00:00:00Z"),// Date
  "discountPrice": null                          // Null
}`,
  },
  {
    id: "M11-08",
    number: "08",
    title: "ObjectId Deep Dive",
    khmerTitle: "ការស្វែងយល់ពី ObjectId (12-byte BSON Identifier)",
    type: "concept",
    codeLanguage: "javascript",
    summary: `**ObjectId** គឺជា Primary Key លំនាំដើមរបស់ MongoDB។ វាមានទំហំ **12 Bytes (24 Hexadecimal Characters)**៖

រចនាសម្ព័ន្ធខាងក្នុងនៃ 12 Bytes៖
* **4 Bytes**៖ Timestamp (វិនាទីដែល Document ត្រូវបានបង្កើតឡើង)
* **5 Bytes**៖ Random Value (ម៉ាស៊ីន និង Process Identifier)
* **3 Bytes**៖ Incrementing Counter (រាប់ចំនួនកើនឡើងជាបន្តបន្ទាប់)

ដោយសារតែ ៤ Bytes ដំបូងជា Timestamp យើងអាចទាញយកពេលវេលាបង្កើតចេញពី \`_id\` បានដោយមិនបាច់បង្កើត Field ដាច់ដោយឡែកឡើយ!`,
    codeSnippet: `// ObjectId Decomposition (24 hex characters):
// "6648e583 19f3a9e224 e78891"
//  └─Time─┘ └──Random──┘ └Counter┘

// In mongosh:
const courseId = ObjectId("6648e58319f3a9e224e78891");
console.log("Created at:", courseId.getTimestamp());
// Output: 2024-05-18T17:35:31.000Z`,
  },
  {
    id: "M11-09",
    number: "09",
    title: "Embedded Documents (Denormalization)",
    khmerTitle: "ការបង្កប់ឯកសារ (Embedding / Denormalization)",
    type: "concept",
    codeLanguage: "javascript",
    summary: `នៅក្នុង MongoDB មានយុទ្ធសាស្ត្ររៀបចំទំនាក់ទំនង ២ បែប។ ទីមួយគឺ **Embedding (Denormalization)** ដែលជាការដាក់ Sub-documents នៅក្នុង Document មេតែមួយ។

ពេលណាគួរប្រើ Embedding សម្រាប់ Course API៖
* ទំនាក់ទំនង **1-to-Few** (ឧ. Course មួយមាន Course Requirements ចំនួន ៣-៥ ចំណុច ឬ Syllabus Summary)
* ទិន្នន័យដែលតែងតែអានជាមួយគ្នាជានិច្ចក្នុង Request តែមួយ
* ផ្តល់ល្បឿនអានលឿនបំផុតព្រោះមិនបាច់ធ្វើ JOIN ឬ $lookup`,
    codeSnippet: `// Embedded Document Pattern: Course with embedded Instructor Profile
{
  "_id": ObjectId("6648e58319f3a9e224e78891"),
  "title": "Mastering Node.js & Express",
  "price": 49.99,
  // 💡 Embedded sub-document: Always loaded together in 1 fast query!
  "instructor": {
    "name": "Ratha",
    "bio": "Senior Backend Architect",
    "avatar": "https://cdn.example.com/ratha.jpg"
  },
  "modules": [
    { "order": 1, "title": "Express Basics" },
    { "order": 2, "title": "MongoDB Mastery" }
  ]
}`,
  },
  {
    id: "M11-10",
    number: "10",
    title: "Document References (Normalization)",
    khmerTitle: "ការភ្ជាប់ទំនាក់ទំនងតាមរយៈ References (Normalization)",
    type: "concept",
    codeLanguage: "javascript",
    summary: `យុទ្ធសាស្ត្រទីពីរគឺ **Document References (Normalization)** ដែលរក្សាទុកឯកសារក្នុង Collections ដាច់ដោយឡែកពីគ្នា ហើយភ្ជាប់គ្នាដោយ **ObjectId**។

ពេលណាគួរប្រើ References សម្រាប់ Course API៖
* ទំនាក់ទំនង **1-to-Many** ធំៗ (ឧ. Course មួយមាន Lessons រាប់សិប)
* ទំនាក់ទំនង **Many-to-Many** (ឧ. សិស្សរាប់ពាន់នាក់ចុះឈ្មោះក្នុង Courses ច្រើន)
* ទិន្នន័យដែលត្រូវ Update ញឹកញាប់ដោយឯករាជ្យ (ជៀសវាងការ Update ច្រើនកន្លែង)`,
    codeSnippet: `// 1. Course Document (in "courses" collection)
{
  "_id": ObjectId("6648e58319f3a9e224e78891"),
  "title": "Enterprise Node.js Architecture",
  "instructorId": ObjectId("507f191e810c19729de860ea") // Reference to Users collection
}

// 2. Lesson Document (in "lessons" collection referencing parent course)
{
  "_id": ObjectId("6648e58319f3a9e224e78999"),
  "courseId": ObjectId("6648e58319f3a9e224e78891"), // 💡 Foreign reference to Course
  "title": "Introduction to Controller-Service Pattern",
  "durationMinutes": 15
}`,
  },
  {
    id: "M11-11",
    number: "11",
    title: "MongoDB Atlas Cloud Setup",
    khmerTitle: "ការបង្កើត និងរៀបចំ Cloud Database ជាមួយ MongoDB Atlas",
    type: "lab",
    codeLanguage: "bash",
    summary: `**MongoDB Atlas** គឺជា Fully-Managed Cloud Database Service ផ្លូវការរបស់ MongoDB ដែលដំណើរការលើ AWS, Google Cloud, ឬ Azure។

ជំហានបង្កើត Free M0 Cluster សម្រាប់ Course API៖
1. បង្កើត Account លើ [cloud.mongodb.com](https://cloud.mongodb.com)
2. បង្កើត Cluster (ជ្រើសរើស Cloud Provider និង Region ដែលជិតបំផុត ដូចជា Singapore)
3. បង្កើត Database User (Username & Secure Password)
4. Configure Network Access៖ Allow IP Address (\`0.0.0.0/0\` សម្រាប់ Development)
5. ចម្លង **Connection String URI** សម្រាប់ដាក់ក្នុង \`.env\``,
    codeSnippet: `# Standard MongoDB Atlas Connection String URI Format:
# mongodb+srv://<username>:<password>@<cluster-domain>/<database-name>?retryWrites=true&w=majority

# Example for our Course Catalog Project:
DATABASE_URL=mongodb+srv://course_admin:SuperSecretPass123@cluster0.abcde.mongodb.net/course_catalog_db?retryWrites=true&w=majority`,
  },
  {
    id: "M11-12",
    number: "12",
    title: "MongoDB Shell (mongosh) Basics",
    khmerTitle: "ការប្រើប្រាស់ mongosh សម្រាប់ CRUD Operations",
    type: "lab",
    codeLanguage: "javascript",
    summary: `**mongosh (MongoDB Shell)** គឺជា Interactive Command-line Interface ទំនើបសម្រាប់ Query និងគ្រប់គ្រង MongoDB។

Basic CRUD Commands សម្រាប់ Course Catalog៖
* **Create**៖ \`db.courses.insertOne({ title, price })\`
* **Read**៖ \`db.courses.find({ price: { $lte: 50 } })\`
* **Update**៖ \`db.courses.updateOne({ _id }, { $set: { published: true } })\`
* **Delete**៖ \`db.courses.deleteOne({ _id })\``,
    codeSnippet: `// Step 1: Insert sample course in mongosh
db.courses.insertOne({
  title: "Docker for Node Developers",
  price: 29.99,
  published: true
});

// Step 2: Find all published courses
db.courses.find({ published: true });

// Step 3: Update price using $set operator
db.courses.updateOne(
  { title: "Docker for Node Developers" },
  { $set: { price: 34.99, updatedAt: new Date() } }
);

// Step 4: Verify count
db.courses.countDocuments();`,
  },
  {
    id: "M11-13",
    number: "13",
    title: "MongoDB Compass GUI",
    khmerTitle: "ការប្រើប្រាស់ MongoDB Compass សម្រាប់ Visual Database Management",
    type: "lab",
    codeLanguage: "bash",
    summary: `**MongoDB Compass** គឺជា Official Graphical User Interface (GUI) របស់ MongoDB។

សមត្ថភាពសំខាន់ៗរបស់ Compass សម្រាប់ Developer៖
* **Visual Document Explorer**៖ មើល កែប្រែ បន្ថែម និងលុប Documents ដោយចុច Mouse
* **Query Bar & Filters**៖ សាកល្បង Query Filters ដូចជា \`{ price: { $gte: 30 } }\`
* **Performance Index Analyzer**៖ ពិនិត្យមើល Performance នៃ Queries និងបង្កើត Indexes
* **Schema Tab**៖ វិភាគ Types និងទម្រង់នៃ Fields ទាំងអស់ក្នុង Collection`,
    codeSnippet: `# Connect Compass to Local or Atlas Cluster:
# 1. Open MongoDB Compass
# 2. Paste connection string:
mongodb+srv://course_admin:password@cluster0.net/course_catalog_db

# 3. Click 'Connect'
# 4. Explore 'courses' and 'lessons' collections visually!`,
  },
  {
    id: "M11-14",
    number: "14",
    title: "Data Modeling Rules",
    khmerTitle: "គោលការណ៍រចនា Data Modeling សម្រាប់ MongoDB",
    type: "architecture",
    codeLanguage: "javascript",
    summary: `ច្បាប់មាសនៃ **MongoDB Data Modeling** សម្រាប់ High Performance APIs៖

1. **Model for Application Access Patterns**៖ រចនាទិន្នន័យផ្អែកលើរបៀបដែល Application ត្រូវអានទិន្នន័យ (Read-heavy vs Write-heavy)
2. **Favor Embedding unless there's a compelling reason**៖ បង្កប់ទិន្នន័យប្រសិនបើវាត្រូវបានអានជាមួយគ្នាជានិច្ច
3. **Avoid Unbounded Arrays**៖ កុំឱ្យ Array ក្នុង Document កើនឡើងគ្មានទីបញ្ចប់ (ហានិភ័យលើសទំហំ 16MB)
4. **Use References for Many-to-Many Relationships**៖ ប្រើ ObjectId References សម្រាប់ទំនាក់ទំនងធំៗ`,
    codeSnippet: `/* SUMMARY OF DATA MODELING PATTERNS:
   -------------------------------------------------------------
   1. 1-to-Few (Course -> Requirements)
      ➔ Embed as an Array of Strings: ["JavaScript Basics", "Git"]

   2. 1-to-Many (Course -> Lessons)
      ➔ Reference: Lessons store parent courseId: ObjectId("...")

   3. Many-to-Many (Users <-> Courses Enrollments)
      ➔ Separate Collection "enrollments" referencing both userId and courseId
   -------------------------------------------------------------
*/`,
  },
];
