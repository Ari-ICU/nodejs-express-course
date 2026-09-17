export interface ProjectSpec {
  id: string;
  number: string;
  title: string;
  khmerTitle: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Production Capstone";
  duration: string;
  tagline: string;
  summary: string;
  features: string[];
  techStack: string[];
  endpoints: {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    path: string;
    description: string;
    auth: boolean;
  }[];
  folderTree: string;
  databaseSchema: string;
  sampleController: string;
  deploymentNotes: string;
}

export const REAL_WORLD_PROJECTS: ProjectSpec[] = [
  {
    id: "project-01",
    number: "01",
    title: "Todo REST API",
    khmerTitle: "គម្រោងទី ១ ៖ Todo REST API",
    level: "Beginner",
    duration: "4 Hours",
    tagline: "The essential CRUD foundation with validation and error handling",
    summary: "A robust, fully-tested Todo REST API built with Node.js, Express, MongoDB, and Zod. Students master resource routing, pagination, input validation, and HTTP status codes.",
    features: [
      "Create Todo with title, description, priority, and due date",
      "Get all Todos with pagination (?page=1&limit=10)",
      "Filter Todos by completion status (?completed=true/false)",
      "Filter by priority (low, medium, high)",
      "Get single Todo by MongoDB ObjectId",
      "Update Todo status or title with PATCH",
      "Delete Todo with 204 or 200 response",
      "Zod schema validation middleware",
      "Centralized error handling middleware"
    ],
    techStack: ["Node.js", "Express.js", "MongoDB", "Mongoose", "Zod", "dotenv"],
    endpoints: [
      { method: "POST", path: "/api/v1/todos", description: "Create a new todo item", auth: false },
      { method: "GET", path: "/api/v1/todos", description: "List todos with filtering & pagination", auth: false },
      { method: "GET", path: "/api/v1/todos/:id", description: "Get specific todo details", auth: false },
      { method: "PATCH", path: "/api/v1/todos/:id", description: "Update status or content", auth: false },
      { method: "DELETE", path: "/api/v1/todos/:id", description: "Remove a todo item", auth: false }
    ],
    folderTree: `todo-api/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── todo.controller.js
│   ├── models/
│   │   └── todo.model.js
│   ├── routes/
│   │   └── todo.routes.js
│   ├── validators/
│   │   └── todo.schema.js
│   ├── middleware/
│   │   └── error.middleware.js
│   └── app.js
├── server.js
└── package.json`,
    databaseSchema: `const todoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  completed: { type: Boolean, default: false },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  dueDate: { type: Date }
}, { timestamps: true });`,
    sampleController: `export const getTodos = async (req, res, next) => {
  try {
    const { completed, priority, page = 1, limit = 10 } = req.query;
    const query = {};
    if (completed !== undefined) query.completed = completed === "true";
    if (priority) query.priority = priority;

    const skip = (page - 1) * limit;
    const [todos, total] = await Promise.all([
      Todo.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Todo.countDocuments(query)
    ]);

    res.json({
      success: true,
      meta: { total, page: Number(page), pages: Math.ceil(total / limit) },
      data: todos
    });
  } catch (err) {
    next(err);
  }
};`,
    deploymentNotes: "Deployable as a standalone Node.js container or directly to cloud VPS with PM2."
  },
  {
    id: "project-02",
    number: "02",
    title: "Student Management API",
    khmerTitle: "គម្រោងទី ២ ៖ Student Management API",
    level: "Intermediate",
    duration: "6 Hours",
    tagline: "Search-intensive API with Swagger OpenAPI documentation",
    summary: "University management system handling student profiles, academic departments, course enrollments, multi-criteria search, and automated OpenAPI Swagger interactive docs.",
    features: [
      "Student registration and academic profile management",
      "Multi-field regex search across student name, email, and student code",
      "Department and academic semester filtering",
      "Calculated GPA statistics and honors classification",
      "Relational Mongoose Population with Course and Faculty models",
      "Interactive Swagger UI at /api/docs with try-it-out capabilities",
      "Indexed database fields for sub-10ms search queries"
    ],
    techStack: ["Node.js", "Express.js", "MongoDB", "Mongoose", "Swagger-JSDoc", "Swagger-UI"],
    endpoints: [
      { method: "GET", path: "/api/v1/students", description: "Search students by name, email, department", auth: false },
      { method: "POST", path: "/api/v1/students", description: "Enroll a new student", auth: true },
      { method: "GET", path: "/api/v1/students/:id", description: "Get student academic record", auth: false },
      { method: "PUT", path: "/api/v1/students/:id", description: "Update student information", auth: true },
      { method: "DELETE", path: "/api/v1/students/:id", description: "Archive student record", auth: true },
      { method: "GET", path: "/api/docs", description: "Interactive Swagger API documentation", auth: false }
    ],
    folderTree: `student-api/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── swagger.js
│   ├── controllers/
│   │   └── student.controller.js
│   ├── models/
│   │   ├── student.model.js
│   │   └── department.model.js
│   ├── routes/
│   │   └── student.routes.js
│   └── app.js
└── server.js`,
    databaseSchema: `const studentSchema = new mongoose.Schema({
  studentCode: { type: String, required: true, unique: true, uppercase: true },
  name: { type: String, required: true, index: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
  gpa: { type: Number, min: 0, max: 4.0, default: 0.0 },
  status: { type: String, enum: ["active", "suspended", "graduated"], default: "active" }
}, { timestamps: true });`,
    sampleController: `/**
 * @openapi
 * /api/v1/students:
 *   get:
 *     summary: Search students with filters and pagination
 *     parameters:
 *       - in: query
 *         name: search
 *         schema: { type: string }
 */
export const searchStudents = async (req, res, next) => {
  try {
    const { search, department, minGpa, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { studentCode: { $regex: search, $options: "i" } }
      ];
    }
    if (department) filter.department = department;
    if (minGpa) filter.gpa = { $gte: Number(minGpa) };

    const students = await Student.find(filter)
      .populate("department", "name code")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ success: true, data: students });
  } catch (err) {
    next(err);
  }
};`,
    deploymentNotes: "Includes OpenAPI 3.0 export and Swagger JSON generation for frontend client SDK generation."
  },
  {
    id: "project-03",
    number: "03",
    title: "Authentication & Authorization API",
    khmerTitle: "គម្រោងទី ៣ ៖ Authentication & Authorization API",
    level: "Intermediate",
    duration: "7 Hours",
    tagline: "Industry-grade JWT, HttpOnly Cookies, and Role-Based Access Control",
    summary: "A production-grade authentication microservice implementing secure password hashing with bcrypt, dual-token architecture (Access + Refresh tokens), HttpOnly cookies, RBAC, and rate limiting.",
    features: [
      "User registration with cryptographic salt hashing (bcrypt 12 rounds)",
      "Secure login issuing 15-minute Access Token & 7-day Refresh Token",
      "HttpOnly, Secure, SameSite=Strict cookies protecting against XSS",
      "Refresh token rotation with database token revocation",
      "Role-Based Access Control (Admin, Instructor, Student)",
      "Forgot password flow with cryptographically random reset tokens",
      "Rate limiting on auth routes to block brute-force password guessing",
      "Protected route middleware with decoded user payload injection"
    ],
    techStack: ["Node.js", "Express.js", "MongoDB", "bcryptjs", "jsonwebtoken", "cookie-parser", "express-rate-limit"],
    endpoints: [
      { method: "POST", path: "/api/v1/auth/register", description: "Register new user account", auth: false },
      { method: "POST", path: "/api/v1/auth/login", description: "Authenticate and receive tokens", auth: false },
      { method: "POST", path: "/api/v1/auth/refresh-token", description: "Rotate access token via cookie", auth: false },
      { method: "POST", path: "/api/v1/auth/logout", description: "Revoke session and clear cookies", auth: true },
      { method: "POST", path: "/api/v1/auth/forgot-password", description: "Request password reset email", auth: false },
      { method: "POST", path: "/api/v1/auth/reset-password", description: "Set new password with token", auth: false },
      { method: "GET", path: "/api/v1/users/me", description: "Get current user profile", auth: true },
      { method: "GET", path: "/api/v1/admin/dashboard", description: "Admin-only metrics", auth: true }
    ],
    folderTree: `auth-api/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── auth.config.js
│   ├── controllers/
│   │   └── auth.controller.js
│   ├── services/
│   │   ├── auth.service.js
│   │   └── token.service.js
│   ├── models/
│   │   ├── user.model.js
│   │   └── session.model.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── rbac.middleware.js
│   └── routes/
│       └── auth.routes.js
└── server.js`,
    databaseSchema: `const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ["student", "instructor", "admin"], default: "student" },
  passwordResetToken: String,
  passwordResetExpires: Date
}, { timestamps: true });`,
    sampleController: `export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError("Invalid email or password", 401);
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ success: true, accessToken, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    next(err);
  }
};`,
    deploymentNotes: "Zero-trust session validation compatible with stateless microservices and frontends."
  },
  {
    id: "project-04",
    number: "04",
    title: "Product Management API",
    khmerTitle: "គម្រោងទី ៤ ៖ Product Management API ជាមួយ Cloudflare R2",
    level: "Advanced",
    duration: "8 Hours",
    tagline: "Multipart file uploads, categorization, price ranges, and sorting",
    summary: "Comprehensive commercial product catalog API with nested category hierarchies, Cloudflare R2 / AWS S3 multipart image uploads with Multer, price aggregation pipelines, and admin inventory control.",
    features: [
      "Product catalog with Category, Brand, Tags, and Inventory stock tracking",
      "Multipart/form-data image upload using Multer and streaming to Cloudflare R2",
      "Automatic file validation (JPEG, PNG, WebP only, max 5MB per file)",
      "Multi-dimensional filtering: category, price min/max, inStock, ratings",
      "Full-text search on title and description",
      "Dynamic sorting: price-asc, price-desc, newest, most-popular",
      "Admin-restricted product creation, updating, and asset deletion"
    ],
    techStack: ["Node.js", "Express.js", "MongoDB", "Mongoose", "Multer", "AWS SDK v3 / Cloudflare R2", "Swagger"],
    endpoints: [
      { method: "GET", path: "/api/v1/products", description: "Search, filter, and sort products", auth: false },
      { method: "GET", path: "/api/v1/products/:id", description: "Get product details with images", auth: false },
      { method: "POST", path: "/api/v1/products", description: "Create product with image upload (Admin)", auth: true },
      { method: "PATCH", path: "/api/v1/products/:id", description: "Update product or stock (Admin)", auth: true },
      { method: "DELETE", path: "/api/v1/products/:id", description: "Delete product and remove images from R2", auth: true }
    ],
    folderTree: `product-api/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── storage.js
│   ├── controllers/
│   │   └── product.controller.js
│   ├── models/
│   │   ├── product.model.js
│   │   └── category.model.js
│   ├── middleware/
│   │   └── upload.middleware.js
│   └── routes/
│       └── product.routes.js
└── server.js`,
    databaseSchema: `const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, lowercase: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  images: [{ url: String, key: String }],
  stock: { type: Number, default: 0, min: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 }
}, { timestamps: true });`,
    sampleController: `export const createProduct = async (req, res, next) => {
  try {
    const { title, price, category, stock } = req.body;
    const uploadedFiles = req.files; // From Multer

    const imageUploadPromises = uploadedFiles.map(file => uploadToR2(file));
    const images = await Promise.all(imageUploadPromises);

    const product = await Product.create({
      title,
      price: Number(price),
      category,
      stock: Number(stock),
      images
    });

    res.status(201).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};`,
    deploymentNotes: "Uses S3-compatible endpoints with public CDN delivery URLs for image acceleration."
  },
  {
    id: "project-05",
    number: "05",
    title: "E-Commerce Backend",
    khmerTitle: "គម្រោងទី ៥ ៖ ប្រព័ន្ធ E-Commerce Backend ពេញលេញ",
    level: "Advanced",
    duration: "10 Hours",
    tagline: "Cart, Wishlist, Multi-document ACID Transactions, Orders, and Stripe Webhooks",
    summary: "Enterprise-grade digital commerce engine powering real-world shopping carts, wishlists, order state machines, payment gateway webhooks, and atomic inventory locking via MongoDB transactions.",
    features: [
      "User authentication, profile addresses, and order history",
      "Persistent Shopping Cart with live price recalculation",
      "User Wishlist management",
      "ACID transactions: Atomically deduct inventory stock and generate order",
      "Payment integration with Stripe / Bakong QR checkout webhooks",
      "Automated transactional order confirmation emails with Nodemailer",
      "Admin order management dashboard (Pending -> Processing -> Shipped -> Delivered)"
    ],
    techStack: ["Node.js", "Express.js", "MongoDB", "Mongoose", "Stripe API", "Nodemailer", "Redis"],
    endpoints: [
      { method: "GET", path: "/api/v1/cart", description: "Get active user cart", auth: true },
      { method: "POST", path: "/api/v1/cart/items", description: "Add item to cart", auth: true },
      { method: "POST", path: "/api/v1/orders/checkout", description: "Atomic checkout with stock lock", auth: true },
      { method: "POST", path: "/api/v1/webhooks/stripe", description: "Handle payment confirmation", auth: false },
      { method: "GET", path: "/api/v1/orders/my-orders", description: "User order history", auth: true },
      { method: "PATCH", path: "/api/v1/admin/orders/:id", description: "Update shipping status", auth: true }
    ],
    folderTree: `ecommerce-backend/
├── src/
│   ├── config/
│   ├── controllers/
│   │   ├── cart.controller.js
│   │   └── order.controller.js
│   ├── services/
│   │   ├── checkout.service.js
│   │   └── payment.service.js
│   ├── models/
│   │   ├── order.model.js
│   │   └── cart.model.js
│   └── routes/
└── server.js`,
    databaseSchema: `const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    title: String,
    price: Number,
    quantity: Number
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["pending", "paid", "shipped", "delivered", "cancelled"], default: "pending" },
  paymentIntentId: String
}, { timestamps: true });`,
    sampleController: `export const processCheckout = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { items, shippingAddress } = req.body;
    let total = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId).session(session);
      if (!product || product.stock < item.quantity) {
        throw new AppError(\`Insufficient stock for \${product?.title || 'item'}\`, 400);
      }
      product.stock -= item.quantity;
      await product.save({ session });
      total += product.price * item.quantity;
    }

    const order = await Order.create([{
      user: req.user.id,
      items,
      totalAmount: total,
      shippingAddress
    }], { session });

    await session.commitTransaction();
    res.status(201).json({ success: true, order: order[0] });
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    session.endSession();
  }
};`,
    deploymentNotes: "Transactions require a MongoDB replica set (available standard on MongoDB Atlas or local 3-node docker-compose)."
  },
  {
    id: "project-06",
    number: "06",
    title: "Production REST API (Capstone)",
    khmerTitle: "គម្រោងទី ៦ ៖ Final Production REST API (Cap-Stone)",
    level: "Production Capstone",
    duration: "14 Hours",
    tagline: "The culmination of all 28 modules: Docker, Redis, BullMQ, Nginx, CI/CD, and Security",
    summary: "The ultimate flagship graduation project. Combines full Clean Architecture, Redis query caching, BullMQ asynchronous worker queues, Docker Compose multi-container stack, Nginx reverse proxy with SSL, Vitest test suites, and GitHub Actions CI/CD deployment.",
    features: [
      "Layered Controller-Service-Repository architecture with dependency separation",
      "Redis caching layer accelerating read operations by up to 100x",
      "BullMQ job queues for asynchronous email delivery and data reports",
      "Socket.IO real-time notification gateway",
      "Multi-container Docker Compose setup (Express, MongoDB, Redis, Worker)",
      "Nginx reverse proxy with rate limiting, gzip compression, and SSL",
      "Automated Vitest & Supertest unit and integration test suites",
      "GitHub Actions CI/CD pipeline building Docker images and running tests on push",
      "PM2 cluster mode with zero-downtime rolling reload"
    ],
    techStack: ["Node.js 22", "Express.js", "MongoDB", "Redis", "BullMQ", "Socket.IO", "Docker", "Nginx", "Vitest", "GitHub Actions"],
    endpoints: [
      { method: "GET", path: "/api/health", description: "Liveness and database/redis health check", auth: false },
      { method: "POST", path: "/api/v1/auth/login", description: "JWT session login", auth: false },
      { method: "GET", path: "/api/v1/analytics/report", description: "Generate PDF export via BullMQ queue", auth: true },
      { method: "GET", path: "/api/v1/products", description: "Redis-cached product search", auth: false },
      { method: "POST", path: "/api/v1/broadcast", description: "Real-time Socket.IO notification", auth: true }
    ],
    folderTree: `production-api/
├── .github/
│   └── workflows/
│       └── ci.yml
├── docker/
│   ├── Dockerfile
│   ├── Dockerfile.worker
│   └── nginx.conf
├── docker-compose.yml
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── redis.js
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── middleware/
│   ├── jobs/
│   │   ├── email.queue.js
│   │   └── email.worker.js
│   ├── sockets/
│   │   └── socket.server.js
│   └── app.js
├── tests/
│   └── api.test.js
├── server.js
└── package.json`,
    databaseSchema: `// Scalable compound indexes for high-throughput queries:
productSchema.index({ category: 1, price: 1 });
productSchema.index({ title: "text", description: "text" });
orderSchema.index({ user: 1, createdAt: -1 });`,
    sampleController: `export const getCachedProducts = async (req, res, next) => {
  try {
    const cacheKey = \`products:\${req.originalUrl}\`;
    const cached = await redis.get(cacheKey);
    if (cached) {
      res.set("X-Cache", "HIT");
      return res.json(JSON.parse(cached));
    }

    const products = await productService.getProducts(req.query);
    await redis.setEx(cacheKey, 300, JSON.stringify(products));
    
    res.set("X-Cache", "MISS");
    res.json(products);
  } catch (err) {
    next(err);
  }
};`,
    deploymentNotes: "Ready for one-command deployment via `docker compose up -d` on any Ubuntu 24.04 LTS server."
  }
];
