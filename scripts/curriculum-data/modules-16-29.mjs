/**
 * modules-16-29.mjs
 * Complete detailed curriculum data for Modules 16 through 29
 */

export const MODULES_16_29 = {
  M16: [
    {
      id: "M16-01", number: "01",
      title: "Password Hashing with bcrypt",
      khmerTitle: "ការ Hash ពាក្យសម្ងាត់ជាមួយ bcrypt",
      type: "lab", codeLanguage: "javascript",
      summary: "Passwords must never be stored as plain text in a database. `bcrypt` is a battle-tested adaptive hashing algorithm that intentionally runs slowly to defeat brute-force and rainbow table attacks. It automatically generates and embeds a cryptographic salt into every hash, meaning two identical passwords produce completely different hash outputs. The `saltRounds` (work factor) controls computation time — 10 to 12 is the industry standard balancing security with response latency.",
      tip: "Never store plaintext passwords! A salt round of 10 to 12 provides the optimal balance between security and server latency. Do NOT use MD5 or SHA-256 for passwords — they are too fast and brute-forceable.",
      objective: "Safely hash and verify user passwords with bcrypt before persisting credentials.",
      expectedOutcome: "Zero plaintext credentials stored in the database; bcrypt-verified login flow.",
      codeSnippet: `import bcrypt from "bcryptjs";

// On Registration: Hash the password before saving
const salt = await bcrypt.genSalt(12);
const hashedPassword = await bcrypt.hash(rawPassword, salt);
await User.create({ email, password: hashedPassword });

// On Login: Compare submitted password to stored hash
const user = await User.findOne({ email });
if (!user) throw new AppError("Invalid credentials", 401);

const isMatch = await bcrypt.compare(submittedPassword, user.password);
if (!isMatch) throw new AppError("Invalid email or password", 401);

// Never return the hashed password in responses!
const { password: _, ...safeUser } = user.toObject();
res.json({ success: true, data: safeUser });`
    },
    {
      id: "M16-02", number: "02",
      title: "JWT & HttpOnly Refresh Token Cookies",
      khmerTitle: "JWT Tokens និង HttpOnly Cookies សម្រាប់ Refresh Tokens",
      type: "lab", codeLanguage: "javascript",
      summary: "JSON Web Tokens (JWT) are self-contained, cryptographically signed tokens that allow stateless authentication. A short-lived Access Token (15 minutes) travels in Authorization headers. A long-lived Refresh Token (7 days) lives in an HttpOnly cookie — inaccessible to JavaScript, defeating XSS credential theft. When the access token expires, the client silently exchanges the cookie-based refresh token for a new access token without re-login.",
      tip: "Storing refresh tokens in HttpOnly cookies prevents stolen credentials even if an attacker executes XSS on the frontend. Always set secure: true and sameSite: strict in production.",
      objective: "Implement resilient dual-token JWT authentication with automatic refresh and XSS protection.",
      expectedOutcome: "Industry-grade stateless authentication resilient against XSS attacks.",
      codeSnippet: `import jwt from "jsonwebtoken";

// Issue Access Token (short-lived: 15 minutes)
const accessToken = jwt.sign(
  { userId: user._id, role: user.role },
  process.env.JWT_ACCESS_SECRET,
  { expiresIn: "15m" }
);

// Issue Refresh Token (long-lived: 7 days)
const refreshToken = jwt.sign(
  { userId: user._id },
  process.env.JWT_REFRESH_SECRET,
  { expiresIn: "7d" }
);

// Store in HttpOnly cookie — inaccessible to JavaScript XSS attacks!
res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000
});

res.json({ success: true, accessToken });`
    }
  ],
  M17: [
    {
      id: "M17-01", number: "01",
      title: "Role-Based Access Control (RBAC)",
      khmerTitle: "ការគ្រប់គ្រងសិទ្ធិ (Role-Based Access Control)",
      type: "lab", codeLanguage: "javascript",
      summary: "Role-Based Access Control restricts system operations based on assigned user roles. Users carry a role field (user, admin, moderator) embedded in their JWT payload. A reusable restrictTo(...roles) middleware factory checks if the authenticated user's role is among permitted roles before granting access. This decouples authorization logic from route handlers, enabling centralized permission governance across the entire API.",
      tip: "Embed the role in the JWT payload to avoid an extra DB lookup per request. Still validate critical operations with a fresh DB query to catch role changes after token issuance.",
      objective: "Implement role-based route guards to enforce fine-grained authorization in Express APIs.",
      expectedOutcome: "Secure multi-role API where only authorized roles can access protected resources.",
      codeSnippet: `// middleware/auth.js

// 1. Verify JWT and attach user to request
export const protect = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) throw new AppError("Not authenticated", 401);

  const token = header.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  req.user = await User.findById(decoded.userId).select("-password");
  if (!req.user) throw new AppError("User no longer exists", 401);
  next();
};

// 2. Role Guard factory — restrictTo("admin") or restrictTo("admin", "moderator")
export const restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    throw new AppError("You do not have permission to perform this action", 403);
  }
  next();
};

// Usage in routes:
router.delete("/users/:id", protect, restrictTo("admin"), deleteUser);
router.patch("/posts/:id/approve", protect, restrictTo("admin", "moderator"), approvePost);`
    }
  ],
  M18: [
    {
      id: "M18-01", number: "01",
      title: "API Security: Helmet, CORS & Rate Limiting",
      khmerTitle: "សុវត្ថិភាព API: Helmet, CORS, Rate Limiting",
      type: "lab", codeLanguage: "javascript",
      summary: "Production APIs face constant attack vectors: clickjacking, XSS via response headers, DDoS via unrestricted requests, and unauthorized cross-origin requests. Helmet sets 14 HTTP security headers in one call. CORS enforces a strict allowlist of trusted origins. express-rate-limit blocks request flooding by IP. Combined, these three middleware layers form the baseline security posture for every public Node.js API.",
      tip: "Always configure CORS with an explicit origin allowlist in production — never use origin: '*' in authenticated APIs. Apply stricter rate limits to auth routes (max 10 per hour) vs general API routes (max 100 per 15 minutes).",
      objective: "Harden an Express API against common web vulnerabilities with standard security middleware.",
      expectedOutcome: "Production-hardened API with security headers, CORS enforcement, and request throttling.",
      codeSnippet: `import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

const app = express();

// 1. Helmet: Sets 14 security HTTP response headers
app.use(helmet());

// 2. CORS: Allow only trusted origins
app.use(cors({
  origin: ["https://myapp.com", "https://admin.myapp.com"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
}));

// 3. Rate Limiting: 100 requests per 15 minutes per IP
app.use("/api", rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, error: "Too many requests, please try again later." },
  standardHeaders: true,
}));

// 4. Stricter limit on auth endpoints
app.use("/api/v1/auth", rateLimit({ windowMs: 60 * 60 * 1000, max: 10 }));`
    }
  ],
  M19: [
    {
      id: "M19-01", number: "01",
      title: "File Uploads with Multer & Cloud Storage",
      khmerTitle: "ការ Upload ឯកសារ ជាមួយ Multer និង Cloud Storage",
      type: "lab", codeLanguage: "javascript",
      summary: "File uploads use multipart/form-data encoding rather than JSON. Multer is Express middleware that parses multipart bodies and exposes files as req.file or req.files. For production, files are streamed directly to cloud storage (Cloudflare R2 or AWS S3) instead of local disk. Always validate MIME type, enforce file size limits, and generate unique filenames using crypto.randomUUID() to prevent filename collisions and directory traversal attacks.",
      tip: "Never trust the originalname from the client — always generate unique filenames server-side. Validate the MIME type from the file buffer itself using the 'file-type' library, not just the client-reported mimetype.",
      objective: "Build a complete file upload pipeline from multipart parsing to cloud storage with validation.",
      expectedOutcome: "Secure file upload endpoint storing files in cloud storage with unique keys.",
      codeSnippet: `import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "node:crypto";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },     // 5MB max
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new AppError("Only JPEG, PNG, and WebP images allowed", 400));
    }
    cb(null, true);
  }
});

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: { accessKeyId: process.env.R2_KEY, secretAccessKey: process.env.R2_SECRET }
});

app.post("/api/v1/uploads/avatar", protect, upload.single("avatar"), async (req, res) => {
  const ext = req.file.mimetype.split("/")[1];
  const key = \`avatars/\${randomUUID()}.\${ext}\`;
  await s3.send(new PutObjectCommand({
    Bucket: process.env.R2_BUCKET, Key: key,
    Body: req.file.buffer, ContentType: req.file.mimetype
  }));
  res.status(201).json({ success: true, url: \`\${process.env.R2_PUBLIC_URL}/\${key}\` });
});`
    }
  ],
  M20: [
    {
      id: "M20-01", number: "01",
      title: "Email with Nodemailer & SMTP",
      khmerTitle: "ការផ្ញើ Email ជាមួយ Nodemailer និង SMTP",
      type: "lab", codeLanguage: "javascript",
      summary: "Transactional emails (verification, password reset, welcome messages) are a core backend responsibility. Nodemailer is the standard Node.js library for sending emails via SMTP. In production, use providers like Resend, SendGrid, or Mailgun for reliability and deliverability. Password reset flows require generating cryptographically secure tokens, storing their SHA-256 hash in the database, and sending the plain token in the email link — never store the plain token.",
      tip: "Always generate a cryptographically secure token (crypto.randomBytes(32).toString('hex')) for password reset links. Store only the SHA-256 hash of the token in your database, and set a short expiry (10-60 minutes) to limit attack windows.",
      objective: "Implement complete transactional email flows with secure token generation and HTML templates.",
      expectedOutcome: "Working email delivery system with password reset flow and verification emails.",
      codeSnippet: `import nodemailer from "nodemailer";
import crypto from "node:crypto";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});

// Forgot password flow
export const forgotPassword = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new AppError("No user with that email", 404);

  // Generate secure token — store only the hash
  const resetToken = crypto.randomBytes(32).toString("hex");
  user.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  await user.save({ validateBeforeSave: false });

  const resetURL = \`\${process.env.CLIENT_URL}/reset-password/\${resetToken}\`;
  await transporter.sendMail({
    from: '"Support" <no-reply@myapp.com>',
    to: user.email,
    subject: "Password Reset (expires in 10 minutes)",
    html: \`<p>Reset your password: <a href="\${resetURL}">\${resetURL}</a></p>\`
  });

  res.json({ success: true, message: "Reset link sent to email" });
});`
    }
  ],
  M21: [
    {
      id: "M21-01", number: "01",
      title: "API Documentation with OpenAPI & Swagger",
      khmerTitle: "ការសរសេរ API Documentation ជាមួយ OpenAPI Swagger",
      type: "lab", codeLanguage: "javascript",
      summary: "OpenAPI 3.0 is the industry standard for describing REST APIs in machine-readable YAML/JSON specification. swagger-jsdoc generates an OpenAPI spec from JSDoc annotations in your route files. swagger-ui-express renders an interactive documentation page at /api-docs where developers can explore endpoints, view schemas, and test calls directly from the browser. Self-documenting APIs reduce integration time and onboarding friction for frontend teams and external API consumers.",
      tip: "Maintain Swagger annotations alongside your route definitions — never let documentation drift from the actual implementation. Protect /api-docs with basic auth or IP allowlisting in production to prevent public exposure of internal API structure.",
      objective: "Generate comprehensive interactive API documentation automatically from code annotations.",
      expectedOutcome: "Self-documenting REST API with Swagger UI, schema definitions, and authentication support.",
      codeSnippet: `import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "My REST API", version: "1.0.0" },
    servers: [{ url: "http://localhost:5000/api/v1" }],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
      }
    }
  },
  apis: ["./src/routes/*.js"],
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// In your route file — JSDoc annotation:
/**
 * @swagger
 * /products:
 *   get:
 *     summary: List all products
 *     tags: [Products]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Paginated product list
 */
router.get("/products", protect, getProducts);`
    }
  ],
  M22: [
    {
      id: "M22-01", number: "01",
      title: "API Testing with Vitest & Supertest",
      khmerTitle: "ការធ្វើតេស្ត API ជាមួយ Vitest និង Supertest",
      type: "lab", codeLanguage: "javascript",
      summary: "Production APIs require automated tests to catch regressions. Vitest is a blazing-fast test runner with native ESM and Jest-compatible APIs. Supertest simulates HTTP requests against your Express app without starting a real server. Unit tests isolate service business logic; integration tests verify the full route → middleware → controller → database → response stack. Tests run in CI pipelines on every git push, preventing broken code from reaching production.",
      tip: "Use mongodb-memory-server for integration tests to avoid polluting your dev database. Reset the database between test suites with beforeEach hooks to ensure test isolation and reproducible results.",
      objective: "Write comprehensive unit and integration tests covering happy paths, validation, and auth failures.",
      expectedOutcome: "Automated test suite with coverage reporting integrated into CI/CD pipeline.",
      codeSnippet: `import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import { connectTestDB, disconnectTestDB, clearDB } from "./helpers/db.js";

beforeAll(async () => await connectTestDB());
afterAll(async () => await disconnectTestDB());

describe("Auth API", () => {
  it("POST /register — creates user and returns token", async () => {
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send({ name: "Sokha", email: "sokha@test.com", password: "Test1234!" });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("accessToken");
    expect(res.body.data.user.password).toBeUndefined(); // Never leak password
  });

  it("POST /login — rejects wrong password with 401", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "sokha@test.com", password: "WrongPass" });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it("GET /users/me — returns 401 without token", async () => {
    const res = await request(app).get("/api/v1/users/me");
    expect(res.status).toBe(401);
  });
});`
    }
  ],
  M23: [
    {
      id: "M23-01", number: "01",
      title: "API Development Tools: Postman",
      khmerTitle: "ការប្រើ Postman សម្រាប់ API Development",
      type: "lab", codeLanguage: "javascript",
      summary: "Postman is the industry-standard GUI tool for API development, manual testing, and documentation. Organize all endpoints in a Collection with folders per resource. Environment variables store base URLs and tokens across local, staging, and production environments. Pre-request scripts automatically refresh expired JWT tokens before each request. Test scripts assert response status, body structure, and data integrity — creating an automated regression suite runnable via Newman in CI pipelines.",
      tip: "Store your access token via a test script on the login endpoint: pm.environment.set('accessToken', json.accessToken). Then reference it in all requests as {{accessToken}}. This eliminates manual copy-pasting of tokens between requests.",
      objective: "Master Postman for professional API development with environments, scripts, and automated testing.",
      expectedOutcome: "Complete Postman collection with auto-token refresh and automated test assertions.",
      codeSnippet: `// Postman → Login Request → Tests tab (JavaScript)

// Auto-save token after login
pm.test("Login succeeds", () => pm.response.to.have.status(200));
const json = pm.response.json();
pm.environment.set("accessToken", json.accessToken);
pm.environment.set("tokenExpiry", Date.now() + 14 * 60 * 1000); // 14 min

// ---
// Any protected request → Pre-request Script (auto-refresh expired token):
const expiry = pm.environment.get("tokenExpiry");
if (!expiry || Date.now() > parseInt(expiry)) {
  pm.sendRequest({
    url: pm.environment.get("baseUrl") + "/auth/refresh",
    method: "POST"
  }, (err, res) => {
    const data = res.json();
    pm.environment.set("accessToken", data.accessToken);
    pm.environment.set("tokenExpiry", Date.now() + 14 * 60 * 1000);
  });
}

// ---
// Run entire collection via Newman in CI:
// npx newman run MyAPI.postman_collection.json \\
//   --environment production.postman_environment.json \\
//   --reporters cli,junit`
    }
  ],
  M24: [
    {
      id: "M24-01", number: "01",
      title: "Real-Time with WebSockets & Socket.IO",
      khmerTitle: "Real-Time Communication ជាមួយ WebSockets និង Socket.IO",
      type: "lab", codeLanguage: "javascript",
      summary: "Traditional HTTP is request-response: the client asks, server answers, connection closes. WebSockets establish a persistent full-duplex TCP connection allowing both server and client to push data at any time — essential for chat, live dashboards, collaborative editing, and multiplayer games. Socket.IO abstracts WebSocket with automatic reconnection, rooms (logical groups), namespaces (separated channels), and elegant event-driven APIs on both server and client.",
      tip: "Use Socket.IO rooms to group connections logically (socket.join(roomId)) rather than tracking socket IDs manually. The server broadcasts to all room members with io.to(roomId).emit(event, data) — clean and horizontally scalable with Redis adapter.",
      objective: "Build bidirectional real-time features with Socket.IO authentication, rooms, and broadcasting.",
      expectedOutcome: "Working real-time chat with room management, presence tracking, and typing indicators.",
      codeSnippet: `import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:3000", credentials: true }
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  socket.on("user:join", ({ userId, username }) => {
    onlineUsers.set(socket.id, { userId, username });
    io.emit("users:online", Array.from(onlineUsers.values()));
  });

  socket.on("room:join", (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit("room:message", {
      type: "system",
      text: \`\${onlineUsers.get(socket.id)?.username} joined\`
    });
  });

  socket.on("message:send", ({ roomId, text }) => {
    const user = onlineUsers.get(socket.id);
    io.to(roomId).emit("room:message", { user, text, time: new Date() });
  });

  socket.on("typing:start", ({ roomId }) =>
    socket.to(roomId).emit("typing:user", { user: onlineUsers.get(socket.id)?.username })
  );

  socket.on("disconnect", () => {
    onlineUsers.delete(socket.id);
    io.emit("users:online", Array.from(onlineUsers.values()));
  });
});

httpServer.listen(5000);`
    }
  ],
  M25: [
    {
      id: "M25-01", number: "01",
      title: "Performance & Caching with Redis",
      khmerTitle: "ការបង្កើនប្រសិទ្ធភាព API ជាមួយ Redis Cache",
      type: "lab", codeLanguage: "javascript",
      summary: "Redis is a lightning-fast in-memory data store that reduces database load for frequently accessed, slowly changing data. The cache-aside pattern: check Redis first (cache HIT → instant return), otherwise query MongoDB, store result in Redis with a TTL expiry (cache MISS → query + cache). MongoDB compound indexes are the second critical lever — they allow the database engine to find documents without scanning the entire collection, reducing query time from O(n) to O(log n).",
      tip: "Cache aggressively at the route level for read-heavy public endpoints. Always set TTL on cached data to prevent stale cache poisoning. Invalidate relevant cache keys on write operations (create/update/delete) to maintain consistency.",
      objective: "Implement Redis response caching and MongoDB index optimization for high-traffic APIs.",
      expectedOutcome: "API response times reduced from hundreds of milliseconds to under 5ms for cached routes.",
      codeSnippet: `import { createClient } from "redis";

const redis = createClient({ url: process.env.REDIS_URL });
await redis.connect();

// Cache-aside middleware factory
export const cacheRoute = (ttlSeconds = 60) => async (req, res, next) => {
  const cacheKey = \`cache:\${req.originalUrl}\`;
  const cached = await redis.get(cacheKey);

  if (cached) {
    console.log("CACHE HIT:", cacheKey);
    return res.json(JSON.parse(cached));
  }

  // Intercept res.json to store response in cache
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    redis.setEx(cacheKey, ttlSeconds, JSON.stringify(body));
    return originalJson(body);
  };
  next();
};

// Apply to public routes
router.get("/products", cacheRoute(60), getProducts);

// Invalidate cache on mutation
export const createProduct = catchAsync(async (req, res) => {
  const product = await Product.create(req.body);
  await redis.del("cache:/api/v1/products");  // Clear stale cache
  res.status(201).json({ success: true, data: product });
});

// Mongoose compound index for fast filtered queries:
productSchema.index({ category: 1, price: -1, createdAt: -1 });`
    }
  ],
  M26: [
    {
      id: "M26-01", number: "01",
      title: "Background Jobs with BullMQ",
      khmerTitle: "ការដំណើរការ Background Jobs ជាមួយ BullMQ",
      type: "lab", codeLanguage: "javascript",
      summary: "Long-running tasks (image processing, email campaigns, PDF generation) block the request-response cycle if executed synchronously. BullMQ provides a robust, Redis-backed job queue: producers add jobs to a queue instantly, dedicated worker processes execute them asynchronously in the background. Features include automatic retries with exponential backoff, job prioritization, cron scheduling, concurrency control, and dead-letter queues for failed job inspection.",
      tip: "Run BullMQ workers as separate Node.js processes — not inside the main Express process — so they don't compete for the event loop. This enables independent horizontal scaling of API servers and worker fleets.",
      objective: "Offload time-consuming operations to background job queues with retry and monitoring.",
      expectedOutcome: "Non-blocking API that delegates heavy work to resilient, monitored background workers.",
      codeSnippet: `import { Queue, Worker } from "bullmq";
import { redis } from "./config/redis.js";

// Producer: Add jobs instantly — don't await the work!
const emailQueue = new Queue("emails", { connection: redis });

export const register = async (req, res) => {
  const user = await User.create(req.body);

  // Add to queue and return immediately
  await emailQueue.add("welcome-email", {
    to: user.email, name: user.name
  }, {
    attempts: 3,
    backoff: { type: "exponential", delay: 2000 }  // 2s, 4s, 8s retries
  });

  res.status(201).json({ success: true, data: sanitizeUser(user) });
};

// Worker: Runs in a SEPARATE process
const emailWorker = new Worker("emails", async (job) => {
  const { to, name } = job.data;
  await sendWelcomeEmail({ to, name });
  console.log(\`Email sent to \${to}\`);
}, { connection: redis, concurrency: 5 });

emailWorker.on("failed", (job, err) => {
  console.error(\`Job \${job.id} failed after \${job.attemptsMade} attempts:\`, err.message);
});`
    }
  ],
  M27: [
    {
      id: "M27-01", number: "01",
      title: "Enterprise Backend Architecture",
      khmerTitle: "ស្ថាបត្យកម្ម Backend កម្រិត Enterprise",
      type: "architecture", codeLanguage: "javascript",
      summary: "Production Node.js backends require deliberate architectural organization to remain maintainable as teams grow. The feature-based layered architecture separates code by domain (users, products, orders) and responsibility (routes → controllers → services → models). This enables independent feature development, clean dependency patterns, isolated unit testing, and clear onboarding. Each layer has a single, well-defined responsibility — controllers handle HTTP I/O, services contain business logic, models interface with the database.",
      tip: "Place all business logic exclusively in the service layer. Controllers should be thin — they only parse req, call a service, and format res. This makes services independently testable without mocking HTTP objects, and reusable from CLI scripts, cron jobs, or webhooks.",
      objective: "Design a scalable, maintainable enterprise backend structure with strict separation of concerns.",
      expectedOutcome: "A clean, navigable codebase that scales from solo developer to a 10+ person engineering team.",
      codeSnippet: `/* Production Node.js Backend Directory Structure:

src/
├── config/
│   ├── database.js       # MongoDB connection with retry logic
│   └── redis.js          # Redis client singleton
├── middleware/
│   ├── auth.js           # protect() + restrictTo() guards
│   ├── errorHandler.js   # Global error middleware
│   └── rateLimiter.js    # Route-level rate limiters
├── modules/              # Feature-based domain modules
│   ├── users/
│   │   ├── user.model.js      # Mongoose schema + indexes
│   │   ├── user.service.js    # Business logic (pure JS, no req/res)
│   │   ├── user.controller.js # Thin HTTP handlers only
│   │   ├── user.routes.js     # Route + middleware composition
│   │   └── user.validation.js # Zod schemas per endpoint
│   ├── products/
│   └── orders/
├── lib/
│   ├── AppError.js       # Custom operational error class
│   ├── catchAsync.js     # try/catch wrapper for async handlers
│   ├── apiFeatures.js    # Filter, Sort, Paginate utility class
│   └── email.js          # Email sending helper
├── queues/
│   ├── email.queue.js    # Queue definitions
│   └── email.worker.js   # Worker (separate process)
└── app.js                # Express app + global middleware
*/`
    }
  ],
  M28: [
    {
      id: "M28-01", number: "01",
      title: "Dockerizing Node.js",
      khmerTitle: "ការ Containerize Node.js API ជាមួយ Docker",
      type: "lab", codeLanguage: "dockerfile",
      summary: "Docker packages your application and all dependencies into a portable, immutable container image that runs identically across development, CI pipelines, and production servers. A multi-stage Dockerfile uses a full Node.js image to install dependencies, then copies only production artifacts into a minimal Alpine final image — dramatically reducing size and attack surface. Docker Compose orchestrates Node.js + MongoDB + Redis as a unified local environment with a single command.",
      tip: "Always create a .dockerignore file excluding node_modules, .env, .git, and logs/ from the build context. This prevents baking secrets into images and speeds up build times significantly. Use a non-root user inside the container for security.",
      objective: "Package a Node.js Express API as a production-ready, multi-stage Docker container.",
      expectedOutcome: "Containerized API deployable to any cloud provider with docker compose up.",
      codeSnippet: `# Multi-stage Dockerfile for production Node.js

# Stage 1: Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Final production image (minimal)
FROM node:20-alpine AS runner
WORKDIR /app

# Non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 5000
ENV NODE_ENV=production

HEALTHCHECK --interval=30s --timeout=3s \\
  CMD wget -qO- http://localhost:5000/health || exit 1

CMD ["node", "src/app.js"]`
    },
    {
      id: "M28-02", number: "02",
      title: "Docker Compose, Nginx & CI/CD",
      khmerTitle: "Docker Compose, Nginx, និង GitHub Actions CI/CD",
      type: "lab", codeLanguage: "yaml",
      summary: "Docker Compose defines multi-container environments declaratively — a single docker-compose.yml links the Node.js API, MongoDB, and Redis with a shared network and health-checked startup order. Nginx acts as a reverse proxy and TLS terminator, routing HTTPS traffic to the Node.js container. GitHub Actions automates testing, Docker image building, pushing to a registry, and SSH deployment on every push to main — achieving continuous deployment from git push to live production.",
      tip: "Use depends_on with condition: service_healthy to ensure Node.js starts only after MongoDB and Redis pass their health checks. This eliminates race condition startup failures in fresh deployments.",
      objective: "Deploy a Node.js API with Docker Compose orchestration, Nginx reverse proxy, and CI/CD automation.",
      expectedOutcome: "Fully automated deployment pipeline: git push triggers tests, build, and production deployment.",
      codeSnippet: `# docker-compose.yml
services:
  api:
    build: .
    ports: ["5000:5000"]
    env_file: .env
    depends_on:
      mongo: { condition: service_healthy }
      redis: { condition: service_healthy }
    restart: unless-stopped

  mongo:
    image: mongo:7
    volumes: ["mongo_data:/data/db"]
    healthcheck:
      test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
      interval: 10s
      retries: 5

  redis:
    image: redis:7-alpine
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]

volumes:
  mongo_data:

# .github/workflows/deploy.yml
# on:
#   push:
#     branches: [main]
# jobs:
#   deploy:
#     steps:
#       - uses: actions/checkout@v4
#       - run: npm test
#       - run: docker build -t myapp .
#       - run: docker push registry.example.com/myapp
#       - run: ssh user@server "docker compose pull && docker compose up -d"`
    }
  ],
  M29: [
    {
      id: "M29-01", number: "01",
      title: "Project 01: Todo REST API",
      khmerTitle: "គម្រោងទី ១ ៖ Todo REST API",
      type: "lab", codeLanguage: "javascript",
      summary: "Build a complete, production-quality Todo REST API integrating Express routing, MongoDB + Mongoose persistence, Zod request validation, centralized error handling, and cursor-based pagination. This project solidifies CRUD fundamentals with real-world patterns: filtering by completed status, multi-field sorting, page/limit pagination with metadata, and proper HTTP status codes for each operation.",
      tip: "Start by defining the Zod validation schemas before writing controllers. Define what a valid request looks like first — this ensures your API has clear, consistent validation before any business logic is written.",
      objective: "Build a complete production REST CRUD API with validation, filtering, sorting, and pagination.",
      expectedOutcome: "Clean, fully error-handled Todo API ready for Docker deployment.",
      codeSnippet: `// GET /api/v1/todos?completed=true&sort=-createdAt&page=1&limit=10

export const getTodos = catchAsync(async (req, res) => {
  const { completed, sort = "-createdAt", page = 1, limit = 10 } = req.query;
  const filter = completed !== undefined ? { completed: completed === "true" } : {};

  const [todos, total] = await Promise.all([
    Todo.find(filter)
      .sort(sort)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit)),
    Todo.countDocuments(filter)
  ]);

  res.json({
    success: true,
    count: todos.length,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    data: todos
  });
});

// Routes: POST / → create, GET / → list, GET /:id → detail
//         PATCH /:id → update, DELETE /:id → remove
// Zod schema validates: title (string, min 1), completed (boolean, optional)`
    },
    {
      id: "M29-02", number: "02",
      title: "Project 02: Auth API with JWT",
      khmerTitle: "គម្រោងទី ២ ៖ Full Auth System ជាមួយ JWT",
      type: "lab", codeLanguage: "javascript",
      summary: "Build a complete authentication system: registration with bcrypt hashing, login with dual JWT tokens (access + refresh in HttpOnly cookie), protected /me endpoint, logout (clear cookie), forgot password (email token), and reset password. This is the authentication backbone shared by all subsequent projects. Test all edge cases: expired tokens, invalid signatures, missing auth headers, and wrong passwords.",
      tip: "Test your token expiry logic thoroughly — simulate expired access tokens, cookie-based refresh, and the full re-authentication cycle. Ensure your protect middleware handles all token error types gracefully with appropriate HTTP status codes.",
      objective: "Implement a complete, production-grade JWT authentication system with all standard flows.",
      expectedOutcome: "Secure authentication API: register, login, refresh, logout, forgot/reset password.",
      codeSnippet: `// Auth API endpoint map:
// POST /api/v1/auth/register          → Hash password, create user, return tokens
// POST /api/v1/auth/login             → Verify credentials, issue access + refresh tokens
// POST /api/v1/auth/refresh           → Exchange HttpOnly cookie for new access token
// POST /api/v1/auth/logout            → Clear refresh token cookie
// POST /api/v1/auth/forgot-password   → Generate reset token, send email
// PATCH /api/v1/auth/reset-password/:token → Validate token hash, update password
// GET  /api/v1/users/me               → Protected: return current user (no password)

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError("Invalid email or password", 401);
  }
  const accessToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
  return { user: sanitizeUser(user), accessToken, refreshToken };
};`
    },
    {
      id: "M29-03", number: "03",
      title: "Project 03: E-Commerce Product API",
      khmerTitle: "គម្រោងទី ៣ ៖ E-Commerce Catalog API",
      type: "lab", codeLanguage: "javascript",
      summary: "Build a full-featured e-commerce product catalog API with multi-image upload to Cloudflare R2, nested category management, full-text search with MongoDB $text index, compound indexes for fast queries, advanced filtering (price range, tags, stock), Redis response caching on public endpoints, and RBAC admin guards for write operations. Represents the real-world API patterns used by production e-commerce platforms.",
      tip: "Pre-index the fields you filter and sort most frequently: { category: 1, price: -1, inStock: 1 }. Apply the Redis cache-aside pattern on GET /products with a 60-second TTL, and invalidate the cache on every create/update/delete operation.",
      objective: "Build a complete product catalog API with search, filtering, image uploads, and Redis caching.",
      expectedOutcome: "High-performance product API with sub-10ms cached responses and admin RBAC.",
      codeSnippet: `// GET /api/v1/products?search=keyboard&category=hardware&minPrice=50&maxPrice=500&page=1

export const getProducts = catchAsync(async (req, res) => {
  const { search, category, minPrice, maxPrice, inStock, sort, page = 1, limit = 20 } = req.query;

  const filter = {};
  if (search) filter.$text = { $search: search };
  if (category) filter.category = new mongoose.Types.ObjectId(category);
  if (inStock === "true") filter.stock = { $gt: 0 };
  if (minPrice || maxPrice) filter.price = {
    ...(minPrice && { $gte: Number(minPrice) }),
    ...(maxPrice && { $lte: Number(maxPrice) })
  };

  const cacheKey = \`products:\${JSON.stringify(req.query)}\`;
  const cached = await redis.get(cacheKey);
  if (cached) return res.json(JSON.parse(cached));

  const products = await Product.find(filter)
    .sort(sort || "-createdAt")
    .skip((page - 1) * limit).limit(Number(limit))
    .populate("category", "name slug");

  const body = { success: true, count: products.length, data: products };
  await redis.setEx(cacheKey, 60, JSON.stringify(body));
  res.json(body);
});`
    },
    {
      id: "M29-04", number: "04",
      title: "Project 04: Real-Time Chat",
      khmerTitle: "គម្រោងទី ៤ ៖ Real-Time Chat Application",
      type: "lab", codeLanguage: "javascript",
      summary: "Build a complete real-time chat application combining REST API (room management, message history) and Socket.IO (real-time events). Features: JWT-authenticated WebSocket connections, persistent room management stored in MongoDB, message history with pagination, online presence tracking, typing indicators, and read receipts. Demonstrates the integration of RESTful and event-driven architectures into a unified backend.",
      tip: "Authenticate WebSocket connections using the Socket.IO io.use() middleware — pass the JWT in the socket.handshake.auth.token field from the client. This runs before any event handler and ensures every connection is authenticated.",
      objective: "Build a production chat system combining REST endpoints and Socket.IO real-time events.",
      expectedOutcome: "Full-featured chat with rooms, online presence, typing indicators, and persisted history.",
      codeSnippet: `// Authenticated Socket.IO chat

// Middleware: authenticate every WebSocket connection
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    socket.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch { next(new Error("Authentication failed")); }
});

io.on("connection", (socket) => {
  socket.on("room:join", async ({ roomId }) => {
    socket.join(roomId);
    const history = await Message.find({ room: roomId })
      .sort("-createdAt").limit(50).populate("sender", "name avatar");
    socket.emit("room:history", history.reverse());
    socket.to(roomId).emit("room:userJoined", socket.user.name);
  });

  socket.on("message:send", async ({ roomId, text }) => {
    const msg = await Message.create({ room: roomId, sender: socket.user._id, text });
    io.to(roomId).emit("message:new", await msg.populate("sender", "name avatar"));
  });

  socket.on("typing:start", ({ roomId }) =>
    socket.to(roomId).emit("typing:user", { name: socket.user.name, typing: true })
  );
});`
    },
    {
      id: "M29-05", number: "05",
      title: "Project 05: Job Queue & Notifications",
      khmerTitle: "គម្រោងទី ៥ ៖ Background Job Queue System",
      type: "lab", codeLanguage: "javascript",
      summary: "Build a notification and background job processing system using BullMQ with Redis. The system handles email campaigns, push notifications, scheduled reminders, and webhook delivery asynchronously. Features include priority queues (critical vs normal), retry with exponential backoff, Bull Board admin dashboard for job monitoring, and a Dead Letter Queue for failed job inspection and replay.",
      tip: "Separate queues by priority tier: critical (password resets, security alerts — max 1 concurrency, no rate limit), high (transactional emails — concurrency 5), default (marketing campaigns — concurrency 10 with outbound rate limiting).",
      objective: "Architect a production notification system with priority queues, retries, and admin monitoring.",
      expectedOutcome: "Scalable background job system handling async tasks with zero message loss and monitoring.",
      codeSnippet: `import { Queue, Worker, QueueEvents } from "bullmq";

const criticalQueue = new Queue("notifications:critical", { connection: redis });
const emailQueue = new Queue("notifications:email", { connection: redis });

// Producer: queue jobs instantly
export const sendNotification = async (type, payload, priority = "normal") => {
  const queue = priority === "critical" ? criticalQueue : emailQueue;
  return queue.add(type, payload, {
    priority: priority === "critical" ? 1 : 10,
    attempts: 5,
    backoff: { type: "exponential", delay: 1000 },
    removeOnComplete: { age: 24 * 3600 },
    removeOnFail: { age: 7 * 24 * 3600 }
  });
};

// Worker: processes in separate process
const worker = new Worker("notifications:email", async (job) => {
  switch (job.name) {
    case "welcome":  return sendWelcomeEmail(job.data);
    case "reset":    return sendResetEmail(job.data);
    case "campaign": return sendCampaignEmail(job.data);
    default: throw new Error(\`Unknown job type: \${job.name}\`);
  }
}, { connection: redis, concurrency: 10 });`
    },
    {
      id: "M29-06", number: "06",
      title: "Project 06: Full Production API (Capstone)",
      khmerTitle: "គម្រោងទី ៦ ៖ Full Production API Capstone",
      type: "lab", codeLanguage: "javascript",
      summary: "The capstone project integrates every concept from the entire course into a single production-grade application: Express REST API with authentication, RBAC, MongoDB + Mongoose, Redis caching, BullMQ jobs, Socket.IO real-time, file uploads, Swagger docs, Vitest integration tests, Docker containerization with Compose, Nginx reverse proxy, and GitHub Actions CI/CD. This codebase demonstrates senior backend engineering patterns and serves as a portfolio piece.",
      tip: "Before deploying, run through the production checklist: all env vars validated on startup, graceful shutdown handlers for SIGTERM/SIGINT, database connection pooling configured, rate limiting on all API routes, Helmet security headers, structured error logging to Sentry or Datadog, and health check endpoint at /health returning DB + Redis status.",
      objective: "Ship a complete, production-grade Node.js API integrating all course technologies end-to-end.",
      expectedOutcome: "A portfolio-ready, full-featured backend deployed to production with CI/CD automation.",
      codeSnippet: `// Production startup with graceful shutdown

import app from "./app.js";
import { connectDB } from "./config/database.js";
import { redis } from "./config/redis.js";
import { startWorkers, stopWorkers } from "./queues/index.js";

// Validate critical env vars on startup — fail fast!
const required = ["MONGODB_URI", "JWT_ACCESS_SECRET", "JWT_REFRESH_SECRET", "REDIS_URL"];
for (const key of required) {
  if (!process.env[key]) throw new Error(\`Missing required env var: \${key}\`);
}

const server = app.listen(process.env.PORT || 5000, async () => {
  await connectDB();
  await redis.connect();
  await startWorkers();
  console.log(\`Server running on port \${process.env.PORT || 5000} [\${process.env.NODE_ENV}]\`);
});

// Graceful shutdown — finish in-flight requests before exit
const shutdown = async (signal) => {
  console.log(\`\${signal}: shutting down gracefully...\`);
  server.close(async () => {
    await stopWorkers();
    await redis.quit();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10_000); // Force exit after 10s
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("unhandledRejection", (err) => { console.error(err); shutdown("UNCAUGHT"); });`
    }
  ]
};
