/**
 * modules-11-15.mjs
 * Complete detailed curriculum data for Modules 11 through 15 (76 topics)
 */

export const MODULES_11_15 = {
  M11: [
    {
      id: "M11-01", number: "01",
      title: "What is MongoDB?",
      khmerTitle: "អ្វីជាប្រព័ន្ធទិន្នន័យ MongoDB?",
      type: "concept", codeLanguage: "javascript",
      summary: "MongoDB is a modern, general-purpose, document-oriented NoSQL database. It stores data in flexible, JSON-like BSON (Binary JSON) documents, allowing data structures to evolve fluidly without rigid tabular migrations.",
      tip: "MongoDB's flexible schema makes it ideal for fast-moving startups and agile applications, but enforcing strong validation via schemas (like Mongoose) is critical for data integrity.",
      objective: "Understand MongoDB's document database model.",
      expectedOutcome: "Clear grasp of document-based persistence compared to relational tables.",
      codeSnippet: `// A MongoDB document looks and feels just like a native JavaScript object!
{
  "_id": "6648e58319f3a9e224e78891",
  "name": "Mechanical Keyboard",
  "price": 129.99,
  "inStock": true,
  "tags": ["hardware", "accessories"]
}`
    },
    {
      id: "M11-02", number: "02",
      title: "SQL vs NoSQL",
      khmerTitle: "ការប្រៀបធៀប SQL vs NoSQL",
      type: "concept", codeLanguage: "javascript",
      summary: "Relational SQL databases (PostgreSQL, MySQL) store data in strict tables with foreign keys and multi-table JOINs. Document NoSQL databases (MongoDB) store self-contained polymorphic documents, optimizing for horizontal sharding and fast single-query reads.",
      tip: "Use SQL for deeply relational financial ledgers requiring ACID across many tables; use MongoDB for hierarchical catalogs, user profiles, content management, and rapid prototyping.",
      objective: "Evaluate architectural trade-offs between SQL and NoSQL databases.",
      expectedOutcome: "Confident database selection based on workload characteristics.",
      codeSnippet: `/* SQL vs NoSQL Conceptual Comparison:
   SQL (PostgreSQL/MySQL):      NoSQL (MongoDB):
   - Database                   - Database
   - Table                      - Collection
   - Row / Record               - Document (BSON)
   - Column                     - Field
   - Foreign Key JOIN           - Embedded Document or $lookup Reference
*/`
    },
    {
      id: "M11-03", number: "03",
      title: "MongoDB Architecture",
      khmerTitle: "ស្ថាបត្យកម្មប្រព័ន្ធ MongoDB",
      type: "architecture", codeLanguage: "javascript",
      summary: "MongoDB achieves high availability through Replica Sets (automated failover between primary and secondary nodes) and horizontal scalability through Sharding (partitioning data collections across independent cluster nodes).",
      tip: "In production, always deploy a Replica Set with at least 3 nodes to ensure automated failover and zero downtime.",
      objective: "Understand MongoDB replica sets, sharding, and cluster architecture.",
      expectedOutcome: "Knowledge of enterprise MongoDB high availability patterns.",
      codeSnippet: `/* MongoDB Replica Set Architecture:
   [Client Request (Node.js)]
              │
              ▼
   ┌───────────────────────┐
   │    PRIMARY NODE       │ (Handles all Writes & primary Reads)
   └──────────┬────────────┘
              │ (Asynchronous Replication via Oplog)
        ┌─────┴─────┐
        ▼           ▼
   [SECONDARY] [SECONDARY] (High Availability & Read Scalability)
*/`
    },
    {
      id: "M11-04", number: "04",
      title: "Database",
      khmerTitle: "ការបង្កើត និងគ្រប់គ្រង Database",
      type: "concept", codeLanguage: "javascript",
      summary: "In MongoDB, a database is a physical container for collections. A single MongoDB server cluster can host multiple independent databases (e.g. `auth_db`, `ecommerce_db`).",
      tip: "In MongoDB, a database is created automatically the first time you insert a document into any of its collections.",
      objective: "Navigate and create MongoDB databases.",
      expectedOutcome: "Proficiency with database selection and namespace segregation.",
      codeSnippet: `// In MongoDB Shell (mongosh):
use ecommerce_db; // Switch or create database
db.getName();     // Confirms active database`
    },
    {
      id: "M11-05", number: "05",
      title: "Collections",
      khmerTitle: "ការគ្រប់គ្រង Collections",
      type: "concept", codeLanguage: "javascript",
      summary: "A collection is a grouping of MongoDB documents, analogous to a table in a relational database. Collections do not enforce a strict schema at the database engine level, allowing documents with different fields to coexist.",
      tip: "Always name collections with lowercase plural nouns (e.g. `users`, `products`, `orders`).",
      objective: "Create, inspect, and drop collections in MongoDB.",
      expectedOutcome: "Safe management of database collections.",
      codeSnippet: `// Create and inspect collections
db.createCollection("products");
show collections;
db.products.drop(); // Drop collection`
    },
    {
      id: "M11-06", number: "06",
      title: "Documents",
      khmerTitle: "រចនាសម្ព័ន្ធនៃ Document",
      type: "concept", codeLanguage: "javascript",
      summary: "A document is an individual record inside a MongoDB collection, composed of field-and-value pairs stored in Binary JSON (BSON). The maximum document size in MongoDB is 16MB.",
      tip: "The 16MB document size limit ensures that individual queries never exhaust server memory.",
      objective: "Understand BSON document structure and limits.",
      expectedOutcome: "Clean document modeling within BSON capacity limits.",
      codeSnippet: `// Document structure
{
  "_id": ObjectId("6648e58319f3a9e224e78891"),
  "title": "Node.js Masterclass",
  "author": "Sokha",
  "published": true,
  "views": 1540
}`
    },
    {
      id: "M11-07", number: "07",
      title: "Fields",
      khmerTitle: "ការកំណត់ Fields និងប្រភេទ BSON Data Types",
      type: "concept", codeLanguage: "javascript",
      summary: "Fields in documents are key-value pairs. Values can include all standard JSON types plus rich BSON types like Date, Decimal128, Binary data, and 12-byte ObjectIds.",
      tip: "Always store currency prices as integer cents (e.g. `$29.99` as `2999`) or BSON `Decimal128` to avoid floating-point math rounding errors.",
      objective: "Select appropriate BSON field types for domain data.",
      expectedOutcome: "Accurate type mapping avoiding floating point math bugs.",
      codeSnippet: `// BSON Data Types Example:
{
  "name": "Product Name",        // String
  "quantity": 50,                // Int32
  "priceInCents": 4999,          // Integer (safe currency)
  "createdAt": ISODate(),        // Date object
  "isActive": true               // Boolean
}`
    },
    {
      id: "M11-08", number: "08",
      title: "ObjectId",
      khmerTitle: "ការស្វែងយល់ពី ObjectId (12-byte BSON Identifier)",
      type: "concept", codeLanguage: "javascript",
      summary: "The default `_id` field in MongoDB is a 12-byte BSON ObjectId. It consists of a 4-byte timestamp, 5-byte random value, and a 3-byte incrementing counter, guaranteeing global uniqueness across distributed server nodes.",
      tip: "You can extract the exact creation timestamp from any ObjectId using `objectId.getTimestamp()` without storing a separate creation date field.",
      objective: "Understand the anatomy and advantages of distributed ObjectIds.",
      expectedOutcome: "Ability to extract timestamps and inspect ObjectIds.",
      codeSnippet: `// In mongosh:
const id = ObjectId("6648e58319f3a9e224e78891");
console.log("Timestamp embedded in ID:", id.getTimestamp());`
    },
    {
      id: "M11-09", number: "09",
      title: "Embedded Documents",
      khmerTitle: "ការបង្កប់ឯកសារ (Embedding / Denormalization)",
      type: "concept", codeLanguage: "javascript",
      summary: "Embedding stores related data directly inside a single document (e.g. storing address sub-documents inside a user document). This allows fetching all related data in a single high-speed query without JOINs.",
      tip: "Embed data when relationships are 1-to-few and the child data is always accessed together with the parent document.",
      objective: "Model 1-to-few relationships using embedded sub-documents.",
      expectedOutcome: "High-performance queries without relational overhead.",
      codeSnippet: `// Embedded Sub-Document pattern:
{
  "_id": ObjectId("..."),
  "name": "Dara",
  "shippingAddress": {
    "street": "123 Norodom Blvd",
    "city": "Phnom Penh",
    "country": "Cambodia"
  }
}`
    },
    {
      id: "M11-10", number: "10",
      title: "References",
      khmerTitle: "ការភ្ជាប់ទំនាក់ទំនងតាមរយៈ References (Normalization)",
      type: "concept", codeLanguage: "javascript",
      summary: "Referencing stores related data in separate collections and links them using the target document's `_id` (e.g. storing `userId` on an Order document). This prevents unbounded document growth.",
      tip: "Use references when the child dataset can grow indefinitely (1-to-millions) or when child data is shared across multiple parents.",
      objective: "Model 1-to-many and many-to-many relationships using document references.",
      expectedOutcome: "Normalized data models preventing unbounded 16MB document overflow.",
      codeSnippet: `// Referencing Pattern:
// User Document: { _id: ObjectId("U1"), name: "Dara" }
// Order Document:
{
  "_id": ObjectId("ORD_99"),
  "userId": ObjectId("U1"), // Reference to User collection
  "total": 150.00
}`
    },
    {
      id: "M11-11", number: "11",
      title: "MongoDB CRUD",
      khmerTitle: "ប្រតិបត្តិការ CRUD មូលដ្ឋានក្នុង MongoDB",
      type: "lab", codeLanguage: "javascript",
      summary: "Executing core queries using `insertOne()`, `insertMany()`, `find()`, `findOne()`, `updateOne()`, and `deleteOne()` in MongoDB.",
      tip: "Always use query filters with `deleteOne()` and `updateOne()` to avoid unintended mass modifications.",
      objective: "Perform CRUD operations via MongoDB query operators.",
      expectedOutcome: "Proficiency with native MongoDB query language.",
      codeSnippet: `// Insert
db.users.insertOne({ name: "Sokha", role: "admin" });

// Find
db.users.find({ role: "admin" });

// Update
db.users.updateOne({ name: "Sokha" }, { $set: { verified: true } });

// Delete
db.users.deleteOne({ name: "Sokha" });`
    },
    {
      id: "M11-12", number: "12",
      title: "MongoDB Compass",
      khmerTitle: "ការប្រើប្រាស់ GUI Tool (MongoDB Compass)",
      type: "lab", codeLanguage: "bash",
      summary: "MongoDB Compass is the official graphical user interface (GUI) for MongoDB, enabling visual querying, index management, document editing, and query performance analysis.",
      tip: "Use the 'Explain Plan' tab in Compass to visualize whether a query is performing a slow collection scan (COLLSCAN) or using an index (IXSCAN).",
      objective: "Inspect and manage databases visually using MongoDB Compass.",
      expectedOutcome: "Visual database administration and query performance profiling.",
      codeSnippet: `# Connect via Compass using connection URI:
mongodb://localhost:27017/my_database
# OR for Atlas Cloud:
mongodb+srv://user:pass@cluster.mongodb.net/my_database`
    },
    {
      id: "M11-13", number: "13",
      title: "MongoDB Atlas",
      khmerTitle: "ការរៀបចំ Cloud Database ជាមួយ MongoDB Atlas",
      type: "lab", codeLanguage: "bash",
      summary: "MongoDB Atlas is a fully managed cloud database service deployed on AWS, GCP, or Azure, providing automated backups, replication, monitoring, and scaling.",
      tip: "In Atlas, remember to configure the IP Access List (whitelist `0.0.0.0/0` during development or specific server static IPs in production).",
      objective: "Provision and connect a cloud MongoDB Atlas cluster.",
      expectedOutcome: "Live cloud database cluster ready for production deployments.",
      codeSnippet: `# Connect string format for MongoDB Atlas:
DATABASE_URL=mongodb+srv://admin_user:SecurePassword123@cluster0.abcde.mongodb.net/prod_db?retryWrites=true&w=majority`
    },
    {
      id: "M11-14", number: "14",
      title: "Database Design",
      khmerTitle: "គោលការណ៍រចនា Database (Embedding vs Referencing Rule)",
      type: "architecture", codeLanguage: "javascript",
      summary: "The fundamental rule of MongoDB schema design: 'Data that is accessed together should be stored together.' Design schemas around your application's query access patterns rather than purely abstract entity normalization.",
      tip: "Ask yourself: 'Will this array grow beyond 1,000 items?' If yes, use references; if no, embed.",
      objective: "Make informed architectural decisions between embedding and referencing.",
      expectedOutcome: "High-performance MongoDB schemas optimized for real-world application queries.",
      codeSnippet: `/* Schema Design Decision Framework:
   1:1  (User:Profile)     ➔ Embed inside parent document
   1:Few (Order:Items)      ➔ Embed array of sub-documents
   1:Many (Post:Comments)   ➔ Reference (comments store postId)
   1:Huge (Sensor:Logs)     ➔ Parent-reference (logs store sensorId)
*/`
    }
  ],

  M12: [
    {
      id: "M12-01", number: "01",
      title: "What is Mongoose?",
      khmerTitle: "អ្វីជា Mongoose ODM?",
      type: "concept", codeLanguage: "javascript",
      summary: "Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, translates between code objects and MongoDB representations, and coordinates middleware hooks.",
      tip: "Mongoose brings type-safety and business validation to MongoDB's schema-less engine.",
      objective: "Understand the role of Mongoose in Node.js backend development.",
      expectedOutcome: "Clear grasp of Object Data Modeling benefits.",
      codeSnippet: `import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, min: 0 }
});

export const Product = mongoose.model("Product", productSchema);`
    },
    {
      id: "M12-02", number: "02",
      title: "Installing Mongoose",
      khmerTitle: "ការដំឡើងកញ្ចប់ Mongoose",
      type: "lab", codeLanguage: "bash",
      summary: "Installing the official `mongoose` package in your Node.js application.",
      tip: "Always install Mongoose version 8+ for modern native Promises and ES Module compatibility.",
      objective: "Install and verify Mongoose in a backend project.",
      expectedOutcome: "Project configured with the official Mongoose library.",
      codeSnippet: `# Install Mongoose
npm install mongoose`
    },
    {
      id: "M12-03", number: "03",
      title: "Connecting MongoDB",
      khmerTitle: "ការភ្ជាប់ Express ទៅកាន់ MongoDB ជាមួយ mongoose.connect()",
      type: "lab", codeLanguage: "javascript",
      summary: "Establishing a resilient connection pool to MongoDB using `mongoose.connect()`, handling connection events and retry logic.",
      tip: "Always export a dedicated database connector module and call it before starting `app.listen()`.",
      objective: "Create a persistent database connection pool.",
      expectedOutcome: "Automated connection initialization with reconnect event listeners.",
      codeSnippet: `import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL);
    console.log(\`✅ MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Exit with failure
  }
};`
    },
    {
      id: "M12-04", number: "04",
      title: "Schema",
      khmerTitle: "ការបង្កើត និងរៀបចំ Mongoose Schema",
      type: "concept", codeLanguage: "javascript",
      summary: "A Mongoose Schema maps to a MongoDB collection and defines the shape of the documents, default values, validators, getters, and setters.",
      tip: "Use the `timestamps: true` schema option to automatically maintain `createdAt` and `updatedAt` Date fields.",
      objective: "Define structured schemas for application entities.",
      expectedOutcome: "Comprehensive schema definitions enforcing field structures.",
      codeSnippet: `import { Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true }
}, {
  timestamps: true // Auto-manages createdAt and updatedAt!
});`
    },
    {
      id: "M12-05", number: "05",
      title: "Model",
      khmerTitle: "ការបង្កើត Model ពី Schema",
      type: "concept", codeLanguage: "javascript",
      summary: "Models are fancy constructors compiled from Schema definitions. An instance of a model is called a document. Models are responsible for creating and reading documents from the underlying MongoDB database.",
      tip: "The first argument to `mongoose.model('User', schema)` is singular; Mongoose automatically creates the pluralized, lowercased collection `users`.",
      objective: "Compile Schemas into queryable Mongoose Models.",
      expectedOutcome: "Executable Models capable of querying the database.",
      codeSnippet: `import mongoose from "mongoose";

// Compiles into "users" collection in MongoDB
export const User = mongoose.model("User", userSchema);`
    },
    {
      id: "M12-06", number: "06",
      title: "Documents",
      khmerTitle: "ការគ្រប់គ្រង Mongoose Document Instances",
      type: "lab", codeLanguage: "javascript",
      summary: "A Mongoose document is an instance of a Model with built-in helper methods like `.save()`, `.remove()`, and `.isModified()`.",
      tip: "Use `.isModified('password')` in pre-save middleware to only hash passwords when the user actually changes their password.",
      objective: "Instantiate and mutate model document instances.",
      expectedOutcome: "Proficiency working with active document instances.",
      codeSnippet: `const user = new User({ name: "Sokha", email: "sokha@test.com" });
user.name = "Sokha Mean";
console.log("Is name modified?", user.isModified("name")); // true
await user.save();`
    },
    {
      id: "M12-07", number: "07",
      title: "Schema Types",
      khmerTitle: "ប្រភេទ BSON Types ក្នុង Mongoose (String, Number, Date, ObjectId)",
      type: "concept", codeLanguage: "javascript",
      summary: "Mongoose supports standard SchemaTypes: String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array, Decimal128, and Map.",
      tip: "Use `Schema.Types.ObjectId` with the `ref` option to establish relationships with other models.",
      objective: "Select accurate SchemaTypes for varied data attributes.",
      expectedOutcome: "Type-safe schema field definitions.",
      codeSnippet: `const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [{ productId: Schema.Types.ObjectId, quantity: Number }],
  paid: { type: Boolean, default: false },
  metadata: { type: Schema.Types.Mixed } // Freeform object
});`
    },
    {
      id: "M12-08", number: "08",
      title: "Default Values",
      khmerTitle: "ការកំណត់ Default Values ក្នុង Schema",
      type: "lab", codeLanguage: "javascript",
      summary: "Configuring default values that Mongoose automatically applies when creating new documents if the field is not provided.",
      tip: "You can pass a function to `default` (e.g. `default: () => Date.now() + 7*24*60*60*1000`) to compute dynamic default values.",
      objective: "Set static and dynamic default values on schema fields.",
      expectedOutcome: "Predictable initialization of document state.",
      codeSnippet: `const postSchema = new Schema({
  views: { type: Number, default: 0 },
  status: { type: String, default: "draft" },
  publishedAt: { type: Date, default: Date.now }
});`
    },
    {
      id: "M12-09", number: "09",
      title: "Required Fields",
      khmerTitle: "ការកំណត់ Required Fields និង Custom Error Messages",
      type: "lab", codeLanguage: "javascript",
      summary: "Marking fields as mandatory with custom validation error messages (`[true, 'Please provide an email address']`).",
      tip: "Always provide custom error messages in the array format `[true, 'Custom error message']` for friendly client responses.",
      objective: "Enforce required field rules with clear error messages.",
      expectedOutcome: "Rejection of incomplete documents with explicit error messages.",
      codeSnippet: `const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email address is strictly required"]
  }
});`
    },
    {
      id: "M12-10", number: "10",
      title: "Validation",
      khmerTitle: "ប្រព័ន្ធ Validation ភ្ជាប់ស្រាប់ (min, max, enum, match)",
      type: "lab", codeLanguage: "javascript",
      summary: "Mongoose provides built-in validators for strings (`enum`, `minlength`, `maxlength`, `match`), numbers (`min`, `max`), and dates.",
      tip: "Use the `enum` validator to restrict field values to a predetermined list of allowed strings (e.g. `['user', 'admin', 'instructor']`).",
      objective: "Utilize built-in validators to constrain document values.",
      expectedOutcome: "Enforcement of business constraints at the model layer.",
      codeSnippet: `const productSchema = new Schema({
  price: { type: Number, min: [0, "Price cannot be negative"] },
  role: {
    type: String,
    enum: { values: ["user", "admin", "guide"], message: "{VALUE} is not a valid role" },
    default: "user"
  }
});`
    },
    {
      id: "M12-11", number: "11",
      title: "Custom Validation",
      khmerTitle: "ការបង្កើត Custom Validators ក្នុង Mongoose",
      type: "lab", codeLanguage: "javascript",
      summary: "Writing custom synchronous or asynchronous validation functions for complex business checks (e.g. validating phone numbers or discount constraints).",
      tip: "Custom validator functions must return `true` if valid or `false` if invalid.",
      objective: "Implement custom domain validators on schema fields.",
      expectedOutcome: "Validation of complex business rules before persisting to database.",
      codeSnippet: `const userSchema = new Schema({
  phoneNumber: {
    type: String,
    validate: {
      validator: function(v) {
        return /^[0-9]{9,10}$/.test(v); // Cambodian phone number check
      },
      message: props => \`\${props.value} is not a valid phone number!\`
    }
  }
});`
    },
    {
      id: "M12-12", number: "12",
      title: "Timestamps",
      khmerTitle: "ការគ្រប់គ្រង Timestamps (createdAt & updatedAt)",
      type: "concept", codeLanguage: "javascript",
      summary: "Setting `{ timestamps: true }` in schema options causes Mongoose to automatically generate and maintain `createdAt` and `updatedAt` Date fields.",
      tip: "Never manually manage updated dates; let Mongoose timestamps handle it automatically on updates.",
      objective: "Enable automated audit timestamps on all entity models.",
      expectedOutcome: "Consistent creation and modification tracking across all database collections.",
      codeSnippet: `const schema = new Schema({ name: String }, { timestamps: true });
// Automatically adds:
// createdAt: Date
// updatedAt: Date`
    },
    {
      id: "M12-13", number: "13",
      title: "Querying",
      khmerTitle: "ការសរសេរ Mongoose Queries (find, findOne, findById)",
      type: "lab", codeLanguage: "javascript",
      summary: "Mongoose models provide rich query helpers: `find()`, `findOne()`, `findById()`, and chainable query builders like `.where()`, `.sort()`, `.select()`, and `.lean()`.",
      tip: "Always append `.lean()` to read-only queries (`Product.find().lean()`) to skip creating heavy Mongoose document instances, accelerating query execution by up to 5x.",
      objective: "Construct optimized database read queries.",
      expectedOutcome: "High-performance queries utilizing `.lean()` for read operations.",
      codeSnippet: `// High-performance read-only query
const activeProducts = await Product.find({ inStock: true })
  .select("name price category")
  .sort("-createdAt")
  .limit(10)
  .lean();`
    },
    {
      id: "M12-14", number: "14",
      title: "Creating Documents",
      khmerTitle: "ការបញ្ចូលឯកសារថ្មី (Model.create & new Model)",
      type: "lab", codeLanguage: "javascript",
      summary: "Creating documents using `Model.create(payload)` (which instantiates and saves in one step) versus `new Model(payload)` followed by `.save()`.",
      tip: "`Model.create()` accepts an array of objects to perform bulk insertions with validation.",
      objective: "Persist new documents to MongoDB.",
      expectedOutcome: "Clean entity creation with schema validation.",
      codeSnippet: `// Method 1: Direct create
const user = await User.create({ name: "Sokha", email: "sokha@test.com" });

// Method 2: Instantiate, mutate, save
const product = new Product({ name: "Phone" });
product.price = 599;
await product.save();`
    },
    {
      id: "M12-15", number: "15",
      title: "Reading Documents",
      khmerTitle: "ការទាញយកឯកសារ (Single & Multiple)",
      type: "lab", codeLanguage: "javascript",
      summary: "Retrieving records using specific criteria, projecting selected fields (`.select('+password')` or `.select('-__v')`), and checking existence.",
      tip: "Use `.select('-password')` by default on user models so confidential hashes are never sent to clients.",
      objective: "Read and project specific fields from documents.",
      expectedOutcome: "Secure data retrieval excluding sensitive fields.",
      codeSnippet: `// Find user by ID excluding internal fields
const user = await User.findById(userId).select("-password -__v");`
    },
    {
      id: "M12-16", number: "16",
      title: "Updating Documents",
      khmerTitle: "ការកែប្រែទិន្នន័យ (findByIdAndUpdate, updateOne)",
      type: "lab", codeLanguage: "javascript",
      summary: "Updating documents using `findByIdAndUpdate()`, `updateOne()`, and `updateMany()`. Configuring `{ new: true, runValidators: true }`.",
      tip: "By default, update queries do NOT run schema validators. You MUST pass `{ runValidators: true }` to enforce schema rules on updates!",
      objective: "Update existing documents while maintaining schema validation.",
      expectedOutcome: "Safe document mutation enforcing validation rules.",
      codeSnippet: `const updatedProduct = await Product.findByIdAndUpdate(
  productId,
  { $set: req.body },
  { new: true, runValidators: true } // Return updated doc & run validations!
);`
    },
    {
      id: "M12-17", number: "17",
      title: "Deleting Documents",
      khmerTitle: "ការលុបទិន្នន័យ (findByIdAndDelete, deleteOne)",
      type: "lab", codeLanguage: "javascript",
      summary: "Removing documents from collections using `findByIdAndDelete()`, `deleteOne()`, and `deleteMany()`.",
      tip: "In production systems, consider soft deletes (`isDeleted: true`) to preserve foreign-key relationships and order histories.",
      objective: "Delete records from database collections.",
      expectedOutcome: "Proper removal of database entities.",
      codeSnippet: `// Hard delete
await Product.findByIdAndDelete(productId);

// Soft delete (Alternative production pattern)
await Product.findByIdAndUpdate(productId, { isDeleted: true, deletedAt: new Date() });`
    },
    {
      id: "M12-18", number: "18",
      title: "Mongoose Methods",
      khmerTitle: "ការបង្កើត Instance Methods & Static Methods",
      type: "lab", codeLanguage: "javascript",
      summary: "Instance methods operate on an individual document instance (`user.comparePassword()`), while Static methods operate on the Model collection (`User.findByEmail()`).",
      tip: "Encapsulate authentication checks like password verification as an instance method on the User model.",
      objective: "Add custom domain logic directly onto Mongoose Models.",
      expectedOutcome: "Rich Domain Model encapsulation.",
      codeSnippet: `import bcrypt from "bcrypt";

// Instance method (operates on document instance):
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Static method (operates on model):
userSchema.statics.findByRole = function(role) {
  return this.find({ role });
};`
    },
    {
      id: "M12-19", number: "19",
      title: "Mongoose Middleware",
      khmerTitle: "Mongoose Hooks (Pre & Post Middleware)",
      type: "lab", codeLanguage: "javascript",
      summary: "Mongoose middleware (pre and post hooks) intercept execution during document lifecycle events like `save`, `validate`, `remove`, and `findOneAndUpdate`.",
      tip: "Use a `pre('save')` hook to automatically hash passwords before persisting to the database.",
      objective: "Implement automated lifecycle hooks on database models.",
      expectedOutcome: "Automated password hashing and data sanitization.",
      codeSnippet: `import bcrypt from "bcrypt";

userSchema.pre("save", async function(next) {
  // Only hash password if it was actually modified
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});`
    },
    {
      id: "M12-20", number: "20",
      title: "Population",
      khmerTitle: "ការភ្ជាប់ទំនាក់ទំនងឯកសារជាមួយ .populate()",
      type: "lab", codeLanguage: "javascript",
      summary: "Population is Mongoose's replacement for SQL JOINs. It automatically replaces specified document path references with the actual referenced documents from other collections.",
      tip: "Use field selection inside populate (`.populate('author', 'name email')`) to avoid fetching unwanted fields like passwords.",
      objective: "Resolve referenced documents using population.",
      expectedOutcome: "Seamless hydration of relational foreign key references.",
      codeSnippet: `// Replaces author ObjectId with the actual User document!
const post = await Post.findById(postId)
  .populate("author", "name email avatar")
  .populate("comments.user", "name");`
    }
  ],

  M13: [
    {
      id: "M13-01", number: "01",
      title: "Connecting Express to MongoDB",
      khmerTitle: "ការភ្ជាប់ Express App ទៅកាន់ MongoDB Database",
      type: "lab", codeLanguage: "javascript",
      summary: "Bootstrapping an Express application with persistent MongoDB connection pooling, verifying database availability before listening on the port.",
      tip: "Always connect to the database before calling `app.listen()` to guarantee no incoming requests hit an uninitialized database.",
      objective: "Wire Express server startup to MongoDB connection readiness.",
      expectedOutcome: "Resilient server startup with verified database connectivity.",
      codeSnippet: `import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;

await connectDB(); // Await DB connection first!
app.listen(PORT, () => console.log(\`Server on port \${PORT}\`));`
    },
    {
      id: "M13-02", number: "02",
      title: "Database Configuration",
      khmerTitle: "ការកំណត់រចនាសម្ព័ន្ធ Database Configuration",
      type: "architecture", codeLanguage: "javascript",
      summary: "Configuring MongoDB connection options: connection pool size, socket timeouts, keepAlive, and retry logic.",
      tip: "Configure `maxPoolSize: 50` in production to handle concurrent traffic without exhausting database connections.",
      objective: "Configure connection pooling options for high-concurrency production.",
      expectedOutcome: "Optimized database driver configuration.",
      codeSnippet: `const mongooseOptions = {
  maxPoolSize: 50,          // Maintain up to 50 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5s
  socketTimeoutMS: 45000,   // Close sockets after 45s of inactivity
};
await mongoose.connect(process.env.DATABASE_URL, mongooseOptions);`
    },
    {
      id: "M13-03", number: "03",
      title: "Environment Variables",
      khmerTitle: "ការគ្រប់គ្រង Database Credentials ក្នុង .env",
      type: "lab", codeLanguage: "bash",
      summary: "Securing database credentials, connection strings, replica set names, and authentication sources in environment variables.",
      tip: "Never commit database passwords or Atlas connection strings to source control.",
      objective: "Externalize all database connection strings into environment variables.",
      expectedOutcome: "Secure database credential management.",
      codeSnippet: `# .env configuration:
DATABASE_URL=mongodb+srv://admin:StrongPass99@cluster.net/shop_db
PORT=5000`
    },
    {
      id: "M13-04", number: "04",
      title: "Creating Models",
      khmerTitle: "ការបង្កើត និងរៀបចំ Data Models ក្នុងគម្រោង",
      type: "architecture", codeLanguage: "javascript",
      summary: "Defining structured Mongoose models for application entities (Users, Products, Categories, Orders) with schema indexes.",
      tip: "Create compound indexes on frequently co-queried fields (e.g. `{ category: 1, price: -1 }`).",
      objective: "Construct production entity models with appropriate indexes.",
      expectedOutcome: "Indexed, validated schema definitions ready for CRUD APIs.",
      codeSnippet: `// models/product.model.js
import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true, trim: true, index: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true }
}, { timestamps: true });

export const Product = model("Product", productSchema);`
    },
    {
      id: "M13-05", number: "05",
      title: "Creating Controllers",
      khmerTitle: "ការបង្កើត Controllers សម្រាប់ Database Endpoints",
      type: "lab", codeLanguage: "javascript",
      summary: "Authoring slim controller handlers that parse request inputs and orchestrate database responses.",
      tip: "Wrap controller functions in an async handler utility to eliminate redundant `try/catch` boilerplate.",
      objective: "Build controllers that handle HTTP parameters and return database results.",
      expectedOutcome: "Clean, consistent controller handlers.",
      codeSnippet: `export const getProducts = async (req, res, next) => {
  try {
    const products = await productService.listProducts(req.query);
    res.json({ success: true, data: products });
  } catch (err) {
    next(err);
  }
};`
    },
    {
      id: "M13-06", number: "06",
      title: "Creating Services",
      khmerTitle: "ការបង្កើត Services សម្រាប់អនុវត្ត Database Queries",
      type: "lab", codeLanguage: "javascript",
      summary: "Encapsulating Mongoose database queries, aggregations, and business checks inside dedicated service modules.",
      tip: "Services should be responsible for database transactions and business validations.",
      objective: "Isolate all database querying logic inside dedicated services.",
      expectedOutcome: "Reusable, testable database service functions.",
      codeSnippet: `// services/product.service.js
import { Product } from "../models/product.model.js";

export const listProducts = async (filters) => {
  const query = {};
  if (filters.category) query.category = filters.category;
  return await Product.find(query).lean();
};`
    },
    {
      id: "M13-07", number: "07",
      title: "CRUD API with MongoDB",
      khmerTitle: "ស្ថាបត្យកម្ម CRUD API ពេញលេញជាមួយ MongoDB",
      type: "architecture", codeLanguage: "javascript",
      summary: "End-to-end architecture connecting routes, controllers, services, and Mongoose models for a full CRUD resource.",
      tip: "Always use standard HTTP verbs and RESTful URL paths across all CRUD resources.",
      objective: "Assemble complete CRUD API flows from HTTP to MongoDB and back.",
      expectedOutcome: "Complete end-to-end CRUD capability for any application entity.",
      codeSnippet: `/* Complete CRUD Flow:
   1. Client: POST /api/v1/products -> 
   2. Route: validates body -> 
   3. Controller: extracts req.body -> 
   4. Service: calls Product.create() -> 
   5. DB: persists document -> 
   6. Client: receives 201 Created JSON
*/`
    },
    {
      id: "M13-08", number: "08",
      title: "Create Resource",
      khmerTitle: "ការអនុវត្ត Create Resource Endpoint",
      type: "lab", codeLanguage: "javascript",
      summary: "Implementing POST endpoints with payload validation, model persistence, and HTTP 201 responses.",
      tip: "Ensure unique constraints (like duplicate emails or slugs) are handled gracefully with 409 Conflict status codes.",
      objective: "Build resource creation APIs with duplicate error handling.",
      expectedOutcome: "Secure resource creation endpoints.",
      codeSnippet: `export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, data: product });
};`
    },
    {
      id: "M13-09", number: "09",
      title: "Get Resources",
      khmerTitle: "ការអនុវត្ត Get Collection Endpoint ជាមួយ Filters",
      type: "lab", codeLanguage: "javascript",
      summary: "Implementing GET list endpoints with query filtering, sorting, and pagination.",
      tip: "Always use `.lean()` on collection queries to conserve memory and boost performance.",
      objective: "Build scalable collection endpoints.",
      expectedOutcome: "Fast collection queries supporting client filters.",
      codeSnippet: `export const getProducts = async (req, res) => {
  const products = await Product.find(req.query).lean();
  res.json({ success: true, count: products.length, data: products });
};`
    },
    {
      id: "M13-10", number: "10",
      title: "Get Resource by ID",
      khmerTitle: "ការអនុវត្ត Get Single Resource by ID",
      type: "lab", codeLanguage: "javascript",
      summary: "Retrieving single resources by ObjectId with validation and 404 handling.",
      tip: "Verify `mongoose.isValidObjectId(req.params.id)` before querying to avoid 500 casting errors.",
      objective: "Implement single-entity retrieval endpoints with ID validation.",
      expectedOutcome: "Clean 404 responses for non-existent entities.",
      codeSnippet: `export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id).lean();
  if (!product) return res.status(404).json({ success: false, error: "Not Found" });
  res.json({ success: true, data: product });
};`
    },
    {
      id: "M13-11", number: "11",
      title: "Update Resource",
      khmerTitle: "ការអនុវត្ត Update Resource Endpoint (PATCH)",
      type: "lab", codeLanguage: "javascript",
      summary: "Updating resource fields using `findByIdAndUpdate()` with schema validation.",
      tip: "Always return the newly updated document using `{ new: true }`.",
      objective: "Build partial resource update endpoints.",
      expectedOutcome: "Safe, validated resource updates.",
      codeSnippet: `export const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  );
  if (!product) return res.status(404).json({ success: false, error: "Not Found" });
  res.json({ success: true, data: product });
};`
    },
    {
      id: "M13-12", number: "12",
      title: "Delete Resource",
      khmerTitle: "ការអនុវត្ត Delete Resource Endpoint (DELETE)",
      type: "lab", codeLanguage: "javascript",
      summary: "Deleting documents from MongoDB collections with HTTP 204 responses.",
      tip: "Always return `204 No Content` for successful deletes.",
      objective: "Build resource deletion endpoints.",
      expectedOutcome: "Clean resource removal.",
      codeSnippet: `export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ success: false, error: "Not Found" });
  res.status(204).send();
};`
    },
    {
      id: "M13-13", number: "13",
      title: "Search",
      khmerTitle: "ការអនុវត្ត Search Pipeline ជាមួយ Text Indexes",
      type: "lab", codeLanguage: "javascript",
      summary: "Implementing text search across MongoDB documents using `$regex` or `$text` indexes.",
      tip: "Compound text indexes across multiple fields (`title: 'text', description: 'text'`) allow searching across all product attributes.",
      objective: "Build multi-field search queries.",
      expectedOutcome: "Fast search endpoints for catalogs and directories.",
      codeSnippet: `export const searchProducts = async (req, res) => {
  const { q } = req.query;
  const products = await Product.find({
    $text: { $search: q }
  }).lean();
  res.json({ success: true, data: products });
};`
    },
    {
      id: "M13-14", number: "14",
      title: "Filtering",
      khmerTitle: "ការអនុវត្ត Advanced Filtering ($gte, $lte, $in)",
      type: "lab", codeLanguage: "javascript",
      summary: "Supporting advanced query filters using MongoDB operators (`$gte`, `$lte`, `$in`, `$ne`).",
      tip: "Transform incoming query parameters (`price[gte]=50`) into MongoDB operators (`{ price: { $gte: 50 } }`).",
      objective: "Translate URL query filters into MongoDB comparison operators.",
      expectedOutcome: "Rich filtering capabilities matching modern e-commerce standards.",
      codeSnippet: `// Converts ?price[gte]=100 into { price: { $gte: 100 } }
export const filterQuery = (queryObj) => {
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\\b(gte|gt|lte|lt|in)\\b/g, match => \`$\${match}\`);
  return JSON.parse(queryStr);
};`
    },
    {
      id: "M13-15", number: "15",
      title: "Sorting",
      khmerTitle: "ការអនុវត្ត Multi-field Sorting",
      type: "lab", codeLanguage: "javascript",
      summary: "Parsing comma-separated sorting directives into Mongoose sort options.",
      tip: "Always provide a stable fallback sort (e.g. `-_id` or `-createdAt`) so paginated results never change order unexpectedly.",
      objective: "Implement multi-field sorting.",
      expectedOutcome: "Deterministic, client-controlled result sorting.",
      codeSnippet: `export const buildSort = (sortParam) => {
  return sortParam ? sortParam.split(",").join(" ") : "-createdAt";
};`
    },
    {
      id: "M13-16", number: "16",
      title: "Pagination",
      khmerTitle: "ការអនុវត្ត Pagination និង Total Count Queries",
      type: "lab", codeLanguage: "javascript",
      summary: "Running concurrent pagination and document count queries with `Promise.all()` to halve endpoint response latency.",
      tip: "Running `find()` and `countDocuments()` concurrently with `Promise.all()` cuts query latency in half.",
      objective: "Write enterprise-grade query pipelines with search and pagination.",
      expectedOutcome: "Scalable list endpoints capable of filtering thousands of records.",
      codeSnippet: `export const getProducts = async (req, res) => {
  const { search, category, sort = "-createdAt", page = 1, limit = 10 } = req.query;
  const filter = {};
  
  if (search) filter.name = { $regex: search, $options: "i" };
  if (category) filter.category = category;

  const skip = (Number(page) - 1) * Number(limit);

  const [products, total] = await Promise.all([
    Product.find(filter).sort(sort).skip(skip).limit(Number(limit)),
    Product.countDocuments(filter)
  ]);

  res.json({ success: true, meta: { total, page: Number(page), pages: Math.ceil(total / limit) }, data: products });
};`
    },
    {
      id: "M13-17", number: "17",
      title: "Population",
      khmerTitle: "ការអនុវត្ត Relational Population ក្នុង API Responses",
      type: "lab", codeLanguage: "javascript",
      summary: "Populating foreign key references before dispatching JSON responses to clients.",
      tip: "Only populate necessary fields to avoid over-fetching and unnecessary database payload transfer.",
      objective: "Hydrate related entity data in API responses.",
      expectedOutcome: "Rich relational JSON responses without SQL JOINs.",
      codeSnippet: `const order = await Order.findById(orderId)
  .populate("user", "name email")
  .populate("items.product", "name price sku");`
    },
    {
      id: "M13-18", number: "18",
      title: "Database Error Handling",
      khmerTitle: "ការគ្រប់គ្រងកំហុស Database (CastError, DuplicateKey, ValidationError)",
      type: "lab", codeLanguage: "javascript",
      summary: "Translating MongoDB-specific driver errors (CastError, code 11000 duplicate key, ValidationError) into user-friendly HTTP 400/409/422 responses.",
      tip: "Catch MongoDB error code `11000` to inform users that an email or username already exists with a 409 status.",
      objective: "Translate low-level MongoDB driver errors into clean HTTP error payloads.",
      expectedOutcome: "Zero raw database stack traces leaked to clients.",
      codeSnippet: `export const handleDbError = (err) => {
  if (err.name === "CastError") {
    return { statusCode: 400, message: \`Invalid \${err.path}: \${err.value}\` };
  }
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return { statusCode: 409, message: \`Duplicate value for \${field}. Please use another value.\` };
  }
  return { statusCode: 500, message: "Database Error" };
};`
    },
    {
      id: "M13-19", number: "19",
      title: "API + Database Architecture",
      khmerTitle: "ស្ថាបត្យកម្ម API និង Database កម្រិត Enterprise",
      type: "architecture", codeLanguage: "javascript",
      summary: "Complete review of the enterprise database architecture: connection pooling, schema indexes, transactions, and layered separation.",
      tip: "Use MongoDB multi-document transactions when updating multiple collections that must succeed or fail together atomically.",
      objective: "Review complete database-backed API architecture.",
      expectedOutcome: "Holistic architectural mastery of Express + MongoDB backend development.",
      codeSnippet: `/* Enterprise DB-Backed API Architecture:
   [Client] ➔ [Express Route] ➔ [Controller] ➔ [Service] ➔ [Mongoose Model] ➔ [MongoDB]
*/`
    }
  ],

  M14: [
    {
      id: "M14-01", number: "01",
      title: "Why Validate Data?",
      khmerTitle: "ហេតុអ្វីត្រូវផ្ទៀងផ្ទាត់ទិន្នន័យ (Data Validation)?",
      type: "concept", codeLanguage: "javascript",
      summary: "Validating incoming data protects backend systems from invalid types, SQL/NoSQL injection, unexpected undefined errors, and corrupted database state. Never trust client input.",
      tip: "Validate data at the network edge in middleware before it ever reaches your controllers or database models.",
      objective: "Understand the security and stability necessity of input validation.",
      expectedOutcome: "Zero trust security approach to all incoming client payloads.",
      codeSnippet: `// BAD: Blindly trusting client input
app.post("/users", async (req, res) => {
  // If req.body is missing required fields, DB throws unhandled errors!
  await User.create(req.body);
});`
    },
    {
      id: "M14-02", number: "02",
      title: "Request Validation",
      khmerTitle: "យុទ្ធសាស្ត្រផ្ទៀងផ្ទាត់ Request (Body, Query, Params)",
      type: "concept", codeLanguage: "javascript",
      summary: "A complete request validation strategy validates all three input sources: `req.body` (payloads), `req.query` (filters), and `req.params` (identifiers).",
      tip: "Validate route params (e.g. checking that `:id` is a valid 24-character hexadecimal ObjectId) before querying the database.",
      objective: "Identify all client input vectors requiring validation.",
      expectedOutcome: "Comprehensive protection across body, query, and parameter vectors.",
      codeSnippet: `/* Three Input Vectors to Validate:
   1. req.body   -> Payloads on POST, PUT, PATCH
   2. req.query  -> Filters and pagination on GET
   3. req.params -> Resource identifiers in URL paths
*/`
    },
    {
      id: "M14-03", number: "03",
      title: "Body Validation",
      khmerTitle: "ការផ្ទៀងផ្ទាត់ Request Body",
      type: "lab", codeLanguage: "javascript",
      summary: "Enforcing required fields, string lengths, email formats, and number ranges on incoming request bodies.",
      tip: "Strip unpermitted fields from `req.body` to prevent mass assignment vulnerabilities.",
      objective: "Validate and sanitize request body payloads.",
      expectedOutcome: "Strict schema compliance for all incoming payloads.",
      codeSnippet: `// Validating body schema with Zod:
import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8)
});`
    },
    {
      id: "M14-04", number: "04",
      title: "Query Validation",
      khmerTitle: "ការផ្ទៀងផ្ទាត់ Query Parameters",
      type: "lab", codeLanguage: "javascript",
      summary: "Validating and coercing query string parameters (parsing numbers, enforcing allowable sort fields and limits).",
      tip: "Use Zod's `z.coerce.number()` to automatically parse string query parameters into numbers.",
      objective: "Validate query parameters and coerce types safely.",
      expectedOutcome: "Type-safe query parameters with safe pagination caps.",
      codeSnippet: `export const querySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  sort: z.enum(["createdAt", "-createdAt", "price", "-price"]).optional()
});`
    },
    {
      id: "M14-05", number: "05",
      title: "Parameter Validation",
      khmerTitle: "ការផ្ទៀងផ្ទាត់ Route Parameters (:id)",
      type: "lab", codeLanguage: "javascript",
      summary: "Ensuring route parameters match expected patterns (e.g. UUID or MongoDB ObjectId) before executing queries.",
      tip: "Rejecting invalid IDs at the middleware level avoids slow, wasted database queries.",
      objective: "Validate route parameter formats using regex or schema rules.",
      expectedOutcome: "Immediate 400 Bad Request responses for malformed IDs.",
      codeSnippet: `export const mongoIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId")
});`
    },
    {
      id: "M14-06", number: "06",
      title: "Validation Errors",
      khmerTitle: "ទម្រង់ឆ្លើយតបកំហុស Validation (Field-level feedback)",
      type: "lab", codeLanguage: "javascript",
      summary: "Formatting validation errors into field-level error messages so frontends can highlight the specific input fields that failed.",
      tip: "Return HTTP `422 Unprocessable Entity` or `400 Bad Request` with an array of issues.",
      objective: "Construct actionable field-level validation error responses.",
      expectedOutcome: "Clear, field-by-field error payloads for API consumers.",
      codeSnippet: `// Formatted error response
{
  "success": false,
  "error": "Validation failed",
  "issues": [
    { "field": "email", "message": "Invalid email address" },
    { "field": "password", "message": "Must be at least 8 characters" }
  ]
}`
    },
    {
      id: "M14-07", number: "07",
      title: "Joi",
      khmerTitle: "ការស្វែងយល់ពីបណ្ណាល័យ Joi Schema Validation",
      type: "concept", codeLanguage: "javascript",
      summary: "Joi is a powerful schema description language and data validator for JavaScript, widely used in legacy and enterprise Node.js services.",
      tip: "Joi is powerful for pure JavaScript projects, but Zod has largely superseded it for modern TypeScript and ESM applications.",
      objective: "Understand Joi schema definitions and validation methods.",
      expectedOutcome: "Familiarity with Joi schemas for maintaining legacy codebases.",
      codeSnippet: `import Joi from "joi";

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required()
});`
    },
    {
      id: "M14-08", number: "08",
      title: "Zod",
      khmerTitle: "ការប្រើប្រាស់បណ្ណាល័យ Zod ទំនើប",
      type: "lab", codeLanguage: "javascript",
      summary: "Zod is the modern TypeScript-first schema declaration and validation library. It supports static type inference, coercion, detailed error maps, and zero dependencies.",
      tip: "Use `z.infer<typeof schema>` to automatically generate TypeScript types from your validation schemas.",
      objective: "Define robust validation schemas using Zod.",
      expectedOutcome: "Type-safe validation schemas for backend requests.",
      codeSnippet: `import { z } from "zod";

export const productSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters"),
  price: z.number().positive("Price must be greater than zero"),
  category: z.string().min(1, "Category is required")
});`
    },
    {
      id: "M14-09", number: "09",
      title: "Validation Middleware",
      khmerTitle: "ការបង្កើត Reusable Validation Middleware",
      type: "lab", codeLanguage: "javascript",
      summary: "Creating a generic validation middleware factory that accepts a Zod schema and validates incoming requests before passing control to controllers.",
      tip: "A single reusable `validate()` middleware handles all schemas across your entire application.",
      objective: "Build a generic validation middleware factory.",
      expectedOutcome: "Clean, declarative route definitions with attached validation guards.",
      codeSnippet: `export const validate = (schema) => async (req, res, next) => {
  try {
    req.body = await schema.parseAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Validation failed",
      issues: error.errors.map(e => ({ field: e.path.join("."), message: e.message }))
    });
  }
};

// Route usage:
// router.post("/products", validate(productSchema), createProduct);`
    },
    {
      id: "M14-10", number: "10",
      title: "Sanitization",
      khmerTitle: "ការធ្វើ Data Sanitization ដើម្បីការពារ Injection",
      type: "lab", codeLanguage: "javascript",
      summary: "Sanitizing user inputs (trimming whitespaces, lowercasing emails, stripping HTML tags, escaping MongoDB operators) to prevent XSS and NoSQL injection.",
      tip: "Always trim and lowercase email strings to avoid duplicate account collisions caused by casing differences.",
      objective: "Implement automated data sanitization on incoming text.",
      expectedOutcome: "Clean, normalized input data stored in the database.",
      codeSnippet: `export const sanitizeEmail = (email) => {
  return typeof email === "string" ? email.trim().toLowerCase() : "";
};`
    },
    {
      id: "M14-11", number: "11",
      title: "Validation Best Practices",
      khmerTitle: "ការអនុវត្តល្អបំផុតសម្រាប់ Data Validation",
      type: "concept", codeLanguage: "javascript",
      summary: "Enterprise validation principles: validate early at the middleware boundary, return clean field-level error messages, strip unrecognized fields, and sanitize strings.",
      tip: "Combine middleware validation with Mongoose model validation for two layers of defense (Defense in Depth).",
      objective: "Adopt layered validation patterns across the application.",
      expectedOutcome: "Bulletproof data integrity across all endpoints.",
      codeSnippet: `/* Validation Defense in Depth:
   Layer 1: Express Middleware (Zod schema validates input structure)
   Layer 2: Controller / Service (Business logic rules & permissions)
   Layer 3: Mongoose Model (Database constraint enforcement)
*/`
    }
  ],

  M15: [
    {
      id: "M15-01", number: "01",
      title: "Types of Errors",
      khmerTitle: "ការយល់ដឹងអំពីប្រភេទនៃកំហុសក្នុង Server",
      type: "concept", codeLanguage: "javascript",
      summary: "Server errors fall into two distinct categories: Operational Errors (predictable runtime failures like invalid user input, expired tokens, missing resources) and Programmer Errors (bugs, syntax errors, reading properties of undefined).",
      tip: "Operational errors should be caught and returned as friendly JSON messages; programmer errors indicate bugs requiring developer fixes.",
      objective: "Distinguish operational errors from programming bugs.",
      expectedOutcome: "Clear error classification strategy for all server failures.",
      codeSnippet: `/* Error Classification:
   Operational Errors (Expected):
   - 400 Invalid email format
   - 404 User not found in DB
   - 401 Expired JWT token

   Programmer Errors (Bugs):
   - TypeError: Cannot read property of undefined
   - SyntaxError: Invalid JSON string
*/`
    },
    {
      id: "M15-02", number: "02",
      title: "JavaScript Errors",
      khmerTitle: "Native JavaScript Error Objects (Error, TypeError, SyntaxError)",
      type: "concept", codeLanguage: "javascript",
      summary: "Understanding the native JavaScript `Error` object, its `message`, `name`, and `stack` trace properties, and how subclasses like `TypeError` and `RangeError` behave.",
      tip: "Always pass a descriptive string to `new Error('Description')` to aid in debugging logs.",
      objective: "Utilize native JavaScript error objects and stack traces.",
      expectedOutcome: "Proficiency in inspecting error stacks for root-cause analysis.",
      codeSnippet: `const err = new Error("Database query timed out");
console.log("Error Name:", err.name);       // "Error"
console.log("Error Message:", err.message); // "Database query timed out"
console.log("Stack Trace:", err.stack);`
    },
    {
      id: "M15-03", number: "03",
      title: "HTTP Errors",
      khmerTitle: "ការផ្សារភ្ជាប់ Errors ជាមួយ HTTP Status Codes",
      type: "concept", codeLanguage: "javascript",
      summary: "Mapping application exceptions to accurate HTTP status codes: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 429 Too Many Requests, 500 Internal Server Error.",
      tip: "Never return HTTP 500 for a client error (e.g. invalid password); 500 indicates a server-side bug or service crash.",
      objective: "Assign accurate HTTP status codes to all operational exceptions.",
      expectedOutcome: "Standardized error code classification across the API.",
      codeSnippet: `// Mapping exceptions to status codes
const errorStatusMap = {
  ValidationError: 400,
  AuthenticationError: 401,
  ForbiddenError: 403,
  NotFoundError: 404,
  ConflictError: 409
};`
    },
    {
      id: "M15-04", number: "04",
      title: "Express Error Handling",
      khmerTitle: "យន្តការ Error Handling ក្នុង Express",
      type: "concept", codeLanguage: "javascript",
      summary: "Express uses a specialized four-argument middleware signature `(err, req, res, next)`. When an error is passed to `next(err)`, Express skips all remaining regular route handlers and jumps straight to the error middleware.",
      tip: "Always define error middleware at the very bottom of `app.js` after all routes have been registered.",
      objective: "Understand Express error propagation via next(err).",
      expectedOutcome: "Accurate implementation of Express error delegation.",
      codeSnippet: `app.get("/api/test", (req, res, next) => {
  const error = new Error("Something went wrong!");
  next(error); // Jumps directly to central error middleware!
});`
    },
    {
      id: "M15-05", number: "05",
      title: "Custom Error Classes",
      khmerTitle: "ការបង្កើត Custom AppError Class",
      type: "lab", codeLanguage: "javascript",
      summary: "Creating a custom `AppError` class that inherits from `Error`, encapsulating an HTTP status code, operational status flag, and capturing the stack trace.",
      tip: "Flagging custom errors with `this.isOperational = true` allows error middleware to distinguish known errors from unexpected crashes.",
      objective: "Build a reusable custom AppError class.",
      expectedOutcome: "Clean error instantiation with attached status codes.",
      codeSnippet: `export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = \`\${statusCode}\`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; // Marks this as a known, trusted error!

    Error.captureStackTrace(this, this.constructor);
  }
}`
    },
    {
      id: "M15-06", number: "06",
      title: "Error Middleware",
      khmerTitle: "ការបង្កើត Global Error Handling Middleware",
      type: "lab", codeLanguage: "javascript",
      summary: "Building the centralized error handling middleware that catches all unhandled exceptions, formats responses, and hides internal stack traces in production.",
      tip: "Check `process.env.NODE_ENV === 'production'` to strip stack traces before sending responses to clients.",
      objective: "Implement a centralized error handling middleware.",
      expectedOutcome: "Standardized JSON error responses across all failure cases.",
      codeSnippet: `export const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
};`
    },
    {
      id: "M15-07", number: "07",
      title: "Async Error Handling",
      khmerTitle: "ការគ្រប់គ្រងកំហុស Asynchronous (catchAsync Wrapper)",
      type: "lab", codeLanguage: "javascript",
      summary: "Eliminating repetitive `try/catch` blocks in controllers using a higher-order `catchAsync` wrapper function that catches rejected promises and forwards them to `next(err)`.",
      tip: "A 4-line `catchAsync` wrapper saves thousands of lines of try/catch boilerplate across an enterprise codebase.",
      objective: "Eliminate try/catch boilerplate using an async wrapper.",
      expectedOutcome: "Clean, concise controller functions.",
      codeSnippet: `// Higher-Order Function to eliminate try/catch
export const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// Clean controller without any try/catch!
export const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.json({ success: true, data: user });
});`
    },
    {
      id: "M15-08", number: "08",
      title: "Validation Errors",
      khmerTitle: "ការគ្រប់គ្រង និងកែច្នៃកំហុស Validation",
      type: "lab", codeLanguage: "javascript",
      summary: "Intercepting Zod and Mongoose validation errors inside the central error handler and converting them into clean, client-friendly error lists.",
      tip: "Transform raw validation error objects into an array of `{ field, message }` items for frontend forms.",
      objective: "Normalize validation errors into a standard schema.",
      expectedOutcome: "User-friendly validation error messages.",
      codeSnippet: `if (err.name === "ValidationError") {
  const issues = Object.values(err.errors).map(el => ({
    field: el.path,
    message: el.message
  }));
  return res.status(400).json({ success: false, error: "Validation Error", issues });
}`
    },
    {
      id: "M15-09", number: "09",
      title: "Database Errors",
      khmerTitle: "ការគ្រប់គ្រងកំហុស Database ក្នុង Central Handler",
      type: "lab", codeLanguage: "javascript",
      summary: "Handling MongoDB duplicate key errors (code 11000), cast errors (invalid ObjectId), and connection timeouts gracefully.",
      tip: "Never expose raw MongoDB database error messages to public API consumers.",
      objective: "Sanitize database errors before sending client responses.",
      expectedOutcome: "Secure error handling protecting internal database schema details.",
      codeSnippet: `// Handling MongoDB duplicate key (e.g. unique email)
if (err.code === 11000) {
  const value = Object.values(err.keyValue)[0];
  return res.status(409).json({
    success: false,
    error: \`Duplicate value '\${value}'. Please use another value.\`
  });
}`
    },
    {
      id: "M15-10", number: "10",
      title: "404 Errors",
      khmerTitle: "ការបង្កើត 404 Route Not Found Handler",
      type: "lab", codeLanguage: "javascript",
      summary: "Catching all unhandled URL routes using a wildcard fallback middleware (`app.all('*')`) that throws a 404 `AppError`.",
      tip: "Register the 404 catch-all route immediately after all route definitions and right before the global error handler.",
      objective: "Catch all unhandled API routes with a standard 404 response.",
      expectedOutcome: "Consistent 404 responses for invalid endpoints.",
      codeSnippet: `// 404 Catch-All Route (Must be placed after all active routes)
app.all("*", (req, res, next) => {
  next(new AppError(\`Cannot find \${req.method} \${req.originalUrl} on this server!\`, 404));
});`
    },
    {
      id: "M15-11", number: "11",
      title: "Production Error Responses",
      khmerTitle: "ការបែងចែកទម្រង់ Error រវាង Development និង Production",
      type: "lab", codeLanguage: "javascript",
      summary: "Sending detailed error information (stack trace, error name, raw details) in development, while returning generic, safe error messages in production.",
      tip: "Leaking stack traces in production exposes file paths, database schemas, and vulnerable libraries to attackers.",
      objective: "Implement environment-aware error responses.",
      expectedOutcome: "Rich debugging data locally with bulletproof security in production.",
      codeSnippet: `const sendDevError = (err, res) => {
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message,
    stack: err.stack,
    err
  });
};

const sendProdError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({ success: false, error: err.message });
  } else {
    // Unknown bug: don't leak details!
    res.status(500).json({ success: false, error: "Something went wrong!" });
  }
};`
    },
    {
      id: "M15-12", number: "12",
      title: "Error Logging",
      khmerTitle: "ការកត់ត្រាកំហុស (Logging) ជាមួយ Winston / Sentry",
      type: "architecture", codeLanguage: "javascript",
      summary: "Logging production errors to durable log files or cloud monitoring services (Sentry, Datadog) for instant alerting and post-mortem debugging.",
      tip: "Log programmer errors at the `'error'` level and operational errors at the `'warn'` level.",
      objective: "Integrate structured error logging for production monitoring.",
      expectedOutcome: "Instant visibility into server exceptions in production environments.",
      codeSnippet: `import winston from "winston";

const logger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "logs/error.log" })
  ]
});

// Inside error middleware:
logger.error({ message: err.message, stack: err.stack, url: req.url });`
    }
  ]
};
