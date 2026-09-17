/**
 * modules-06-10.mjs
 * Complete detailed curriculum data for Modules 06 through 10 (69 topics)
 */

export const MODULES_06_10 = {
  M06: [
    {
      id: "M06-01", number: "01",
      title: "What is Express.js?",
      khmerTitle: "អ្វីជា Express.js និងហេតុអ្វីត្រូវប្រើវា?",
      type: "concept", codeLanguage: "javascript",
      summary: "Express.js is the de facto standard web application framework for Node.js. Designed as a minimal, flexible, and unopinionated abstraction layer on top of native `node:http`, it provides a powerful routing engine, middleware pipeline architecture, and comprehensive HTTP request/response helper utilities.",
      tip: "Express does not enforce strict folder structures or database conventions; adopting clean architectural boundaries (controllers and services) is essential to avoid spaghetti code.",
      objective: "Understand how Express abstracts native HTTP mechanics into an intuitive API.",
      expectedOutcome: "Comprehensive mental model of Express as a middleware pipeline.",
      codeSnippet: `import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Express.js API!" });
});

app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});`
    },
    {
      id: "M06-02", number: "02",
      title: "Why Express.js?",
      khmerTitle: "គុណសម្បត្តិនៃការប្រើប្រាស់ Express.js",
      type: "concept", codeLanguage: "javascript",
      summary: "Express dramatically simplifies backend engineering by eliminating hundreds of lines of boilerplate required in native `node:http`. Its massive ecosystem of tested middleware (CORS, Helmet, Morgan), simplicity, high speed, and vast community make it the industry baseline for Node backends.",
      tip: "Over 80% of enterprise Node.js APIs rely on Express or frameworks built on top of Express principles.",
      objective: "Contrast raw Node HTTP servers with Express.js productivity.",
      expectedOutcome: "Clear technical rationale for choosing Express for REST API development.",
      codeSnippet: `// Native HTTP: ~20 lines to parse JSON and route paths
// Express: 2 lines to do the same!
app.use(express.json());
app.post("/users", (req, res) => res.status(201).json(req.body));`
    },
    {
      id: "M06-03", number: "03",
      title: "Installing Express",
      khmerTitle: "ការដំឡើងកញ្ចប់ Express ក្នុងគម្រោង",
      type: "lab", codeLanguage: "bash",
      summary: "Installing Express via npm and configuring the project for ES Modules by declaring `\"type\": \"module\"` in `package.json`.",
      tip: "Install the latest Express release (`npm install express@latest`) and save it to direct dependencies.",
      objective: "Install and verify the Express package in a Node.js project.",
      expectedOutcome: "Working Express installation ready for server development.",
      codeSnippet: `# Initialize project and install Express
npm init -y
npm install express

# Verify package.json contains express
cat package.json`
    },
    {
      id: "M06-04", number: "04",
      title: "Express Application",
      khmerTitle: "ការបង្កើត Application Instance",
      type: "concept", codeLanguage: "javascript",
      summary: "Calling `express()` creates an application instance. The `app` object holds configuration settings, registers middleware pipelines, defines HTTP routes, and delegates listening sockets to the operating system.",
      tip: "Keep `app.js` dedicated to middleware configuration and route binding, and bind the network port in a separate `server.js` file for seamless testing.",
      objective: "Instantiate and configure the central Express application instance.",
      expectedOutcome: "Clean application initialization pattern separated from server listening.",
      codeSnippet: `// src/app.js
import express from "express";

const app = express();

// Application settings
app.disable("x-powered-by"); // Hide Express signature for security
app.use(express.json());

export default app;`
    },
    {
      id: "M06-05", number: "05",
      title: "Starting a Server",
      khmerTitle: "ការចាប់ផ្តើម Server ជាមួយ app.listen()",
      type: "lab", codeLanguage: "javascript",
      summary: "Binding the Express application to a TCP port using `app.listen()` allows the server to accept incoming network connections.",
      tip: "Always bind the port from `process.env.PORT` with a fallback to allow seamless deployment to container platforms like Docker, AWS, or Render.",
      objective: "Start an HTTP listener and verify connection availability.",
      expectedOutcome: "Running web server accessible over local network ports.",
      codeSnippet: `// src/server.js
import app from "./app.js";

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(\`🚀 Server running in \${process.env.NODE_ENV || "dev"} on port \${PORT}\`);
});`
    },
    {
      id: "M06-06", number: "06",
      title: "Request Object",
      khmerTitle: "ការស្វែងយល់ពី Request Object (req)",
      type: "concept", codeLanguage: "javascript",
      summary: "The `req` object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, cookies, and IP address. Express decorates Node's native `http.IncomingMessage` with intuitive helpers.",
      tip: "Use `req.get('Header-Name')` to retrieve headers in a case-insensitive manner.",
      objective: "Access all incoming client metadata through the request object.",
      expectedOutcome: "Mastery of `req.body`, `req.params`, `req.query`, and `req.headers`.",
      codeSnippet: `app.post("/api/items/:id", (req, res) => {
  console.log("Route param ID:", req.params.id);
  console.log("Query search:", req.query.search);
  console.log("Request payload:", req.body);
  console.log("Client IP:", req.ip);
  console.log("Auth header:", req.get("Authorization"));
  res.sendStatus(200);
});`
    },
    {
      id: "M06-07", number: "07",
      title: "Response Object",
      khmerTitle: "ការស្វែងយល់ពី Response Object (res)",
      type: "concept", codeLanguage: "javascript",
      summary: "The `res` object represents the HTTP response that an Express app sends when it gets an HTTP request. It provides chainable methods like `res.status()`, `res.json()`, `res.send()`, `res.cookie()`, and `res.redirect()`.",
      tip: "Always remember that `res.json()` or `res.send()` completes the response; trying to call them twice in one handler causes `ERR_HTTP_HEADERS_SENT`.",
      objective: "Utilize Express response helper methods to return varied data formats.",
      expectedOutcome: "Error-free response dispatching with proper HTTP headers.",
      codeSnippet: `app.get("/api/download", (req, res) => {
  // Setting headers and cookies
  res.cookie("sessionId", "xyz123", { httpOnly: true });
  res.setHeader("X-Custom-Header", "NodePulse");
  res.status(200).json({ success: true });
});`
    },
    {
      id: "M06-08", number: "08",
      title: "Middleware Concept",
      khmerTitle: "ទស្សនទាន Middleware ក្នុង Express",
      type: "concept", codeLanguage: "javascript",
      summary: "Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the `next` middleware function in the application's request-response cycle. They can execute code, make changes to request/response, end the cycle, or call `next()`.",
      tip: "If a middleware does not end the request-response cycle with `res.send()` or `res.json()`, it MUST call `next()`, otherwise the request hangs forever.",
      objective: "Understand how the sequential middleware pipeline processes incoming requests.",
      expectedOutcome: "Deep structural grasp of the Onion/Pipeline architecture in Express.",
      codeSnippet: `// Middleware structure
const myMiddleware = (req, res, next) => {
  console.log("Request received at:", new Date().toISOString());
  req.requestTime = Date.now(); // Mutate request
  next(); // Pass control to next handler in chain!
};`
    },
    {
      id: "M06-09", number: "09",
      title: "Routing",
      khmerTitle: "មូលដ្ឋានគ្រឹះនៃការរៀបចំ Routing",
      type: "concept", codeLanguage: "javascript",
      summary: "Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).",
      tip: "Define more specific routes before general wildcard or parameterized routes (e.g. `/users/profile` before `/users/:id`).",
      objective: "Structure URI routing endpoints in an Express application.",
      expectedOutcome: "Clean, unambiguous route resolution for all incoming endpoints.",
      codeSnippet: `app.get("/api/v1/products", (req, res) => {
  res.json({ products: [] });
});

app.post("/api/v1/products", (req, res) => {
  res.status(201).json({ message: "Product created" });
});`
    },
    {
      id: "M06-10", number: "10",
      title: "Route Handlers",
      khmerTitle: "ការសរសេរ Route Handlers ជាមួយ Callbacks ច្រើន",
      type: "lab", codeLanguage: "javascript",
      summary: "Route handlers can take the form of a function, an array of functions, or combinations of both. This allows chaining authentication guards and validation checks directly before the final controller function.",
      tip: "Pass multiple middleware functions to a route definition to enforce authentication and validation cleanly.",
      objective: "Chain middleware functions and controller handlers on a single route.",
      expectedOutcome: "Modular route definitions with reusable middleware guards.",
      codeSnippet: `const requireAuth = (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).json({ error: "Unauthorized" });
  next();
};

const validateBody = (req, res, next) => {
  if (!req.body.title) return res.status(400).json({ error: "Title required" });
  next();
};

// Chaining middleware directly on route
app.post("/api/posts", requireAuth, validateBody, (req, res) => {
  res.status(201).json({ id: 1, title: req.body.title });
});`
    },
    {
      id: "M06-11", number: "11",
      title: "HTTP Methods",
      khmerTitle: "ការប្រើប្រាស់ HTTP Methods ក្នុង Express",
      type: "concept", codeLanguage: "javascript",
      summary: "Express provides routing methods corresponding to all standard HTTP verbs: `app.get()`, `app.post()`, `app.put()`, `app.patch()`, `app.delete()`, as well as `app.all()` to catch all HTTP verbs on a route.",
      tip: "Use `app.all('*', (req, res) => res.status(404).json(...))` as the final route to catch unhandled endpoints.",
      objective: "Map REST operations to their respective Express HTTP method helpers.",
      expectedOutcome: "Proper HTTP verb semantics across all endpoints.",
      codeSnippet: `app.get("/users", listUsers);
app.post("/users", createUser);
app.put("/users/:id", replaceUser);
app.patch("/users/:id", updateUserFields);
app.delete("/users/:id", deleteUser);`
    },
    {
      id: "M06-12", number: "12",
      title: "JSON Responses",
      khmerTitle: "ការបញ្ជូនទិន្នន័យ JSON ជាមួយ res.json()",
      type: "lab", codeLanguage: "javascript",
      summary: "`res.json()` sends a JSON response. It converts the parameter to a JSON string using `JSON.stringify()`, automatically sets the `Content-Type` header to `application/json; charset=utf-8`, and formats null or undefined values safely.",
      tip: "Always prefer `res.json()` over `res.send()` when building REST APIs for explicit formatting.",
      objective: "Send formatted JSON data structures to clients.",
      expectedOutcome: "Consistent JSON serialization with proper charset headers.",
      codeSnippet: `app.get("/api/profile", (req, res) => {
  res.json({
    success: true,
    user: { id: 101, name: "Dara", verified: true }
  });
});`
    },
    {
      id: "M06-13", number: "13",
      title: "Status Codes",
      khmerTitle: "ការកំណត់លេខកូដឆ្លើយតបជាមួយ res.status()",
      type: "lab", codeLanguage: "javascript",
      summary: "`res.status(code)` sets the HTTP status for the response. It is a chainable method that should be coupled with `res.json()` or `res.send()`.",
      tip: "Always return `201 Created` for successful resource creations and `204 No Content` for successful deletes.",
      objective: "Combine status codes and JSON payloads fluently.",
      expectedOutcome: "Accurate HTTP status code signaling for all scenarios.",
      codeSnippet: `// 201 Created
res.status(201).json({ success: true, item: newItem });

// 400 Bad Request
res.status(400).json({ success: false, error: "Validation failed" });

// 204 No Content
res.status(204).send();`
    },
    {
      id: "M06-14", number: "14",
      title: "Express Project Structure",
      khmerTitle: "រចនាសម្ព័ន្ធគម្រោង Express.js កម្រិត Enterprise",
      type: "architecture", codeLanguage: "bash",
      summary: "Scalable enterprise layout for Express: decoupling routing logic from database execution and HTTP response writing across controllers, services, models, and middleware.",
      tip: "Never write database queries directly inside route callback functions; delegate to services.",
      objective: "Organize an Express project into modular, maintainable architectural directories.",
      expectedOutcome: "Clean, scalable project structure adhering to industry best practices.",
      codeSnippet: `src/
├── controllers/    # Request/Response orchestration
├── services/       # Business logic & Database transactions
├── routes/         # Express router definitions
├── middleware/     # Auth, error, logging middleware
├── models/         # Database models (Mongoose)
├── utils/          # Helper functions & custom errors
├── app.js          # Express app configuration
└── server.js       # Entry point & port binding`
    }
  ],

  M07: [
    {
      id: "M07-01", number: "01",
      title: "Basic Routes",
      khmerTitle: "ការបង្កើត Basic Routes",
      type: "concept", codeLanguage: "javascript",
      summary: "Basic routing matches a URI path and an HTTP method to a specific handler callback that returns data or executes business logic.",
      tip: "Keep route definitions declarative and delegate handler logic to dedicated controller functions.",
      objective: "Define basic static GET and POST routes in an Express application.",
      expectedOutcome: "Working static endpoints responding to HTTP requests.",
      codeSnippet: `app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date() });
});`
    },
    {
      id: "M07-02", number: "02",
      title: "GET Routes",
      khmerTitle: "ការបង្កើត GET Routes សម្រាប់ទាញយកទិន្នន័យ",
      type: "lab", codeLanguage: "javascript",
      summary: "GET routes retrieve resources without mutating database state. They support filtering and pagination via query parameters.",
      tip: "GET requests must never modify server state or mutate database records.",
      objective: "Implement read endpoints supporting collection and single-resource retrieval.",
      expectedOutcome: "Idempotent, cache-friendly data retrieval endpoints.",
      codeSnippet: `app.get("/api/v1/articles", async (req, res) => {
  const articles = await articleService.getAllArticles(req.query);
  res.json({ success: true, count: articles.length, data: articles });
});`
    },
    {
      id: "M07-03", number: "03",
      title: "POST Routes",
      khmerTitle: "ការបង្កើត POST Routes សម្រាប់បញ្ចូលទិន្នន័យ",
      type: "lab", codeLanguage: "javascript",
      summary: "POST routes receive data payloads from `req.body`, validate input schemas, persist new records into the database, and return a `201 Created` status code.",
      tip: "Always parse JSON with `express.json()` before accessing `req.body` in POST routes.",
      objective: "Build resource creation endpoints with input handling.",
      expectedOutcome: "Secure creation endpoints returning created entities with HTTP 201.",
      codeSnippet: `app.post("/api/v1/articles", async (req, res) => {
  const newArticle = await articleService.createArticle(req.body);
  res.status(201).json({ success: true, data: newArticle });
});`
    },
    {
      id: "M07-04", number: "04",
      title: "PUT Routes",
      khmerTitle: "ការបង្កើត PUT Routes សម្រាប់ជំនួសទិន្នន័យចាស់ទាំងស្រុង",
      type: "lab", codeLanguage: "javascript",
      summary: "PUT routes replace an entire resource with the provided payload. Any existing fields omitted from the request body are overwritten or reset to defaults.",
      tip: "Use PUT for complete replacements and PATCH for partial field updates.",
      objective: "Implement idempotent full-replacement update routes.",
      expectedOutcome: "Standardized resource replacement semantics.",
      codeSnippet: `app.put("/api/v1/users/:id", async (req, res) => {
  const updatedUser = await userService.replaceUser(req.params.id, req.body);
  res.json({ success: true, data: updatedUser });
});`
    },
    {
      id: "M07-05", number: "05",
      title: "PATCH Routes",
      khmerTitle: "ការបង្កើត PATCH Routes សម្រាប់កែប្រែទិន្នន័យមួយផ្នែក",
      type: "lab", codeLanguage: "javascript",
      summary: "PATCH routes update only the specific fields supplied in the request body (e.g. updating an email address or toggling a status flag) without affecting untouched fields.",
      tip: "PATCH is the preferred HTTP verb for updating partial resources in modern REST APIs.",
      objective: "Build partial update endpoints that modify only specified fields.",
      expectedOutcome: "Efficient entity mutation endpoints minimizing bandwidth and payload size.",
      codeSnippet: `app.patch("/api/v1/users/:id", async (req, res) => {
  const updatedUser = await userService.updateUserFields(req.params.id, req.body);
  res.json({ success: true, data: updatedUser });
});`
    },
    {
      id: "M07-06", number: "06",
      title: "DELETE Routes",
      khmerTitle: "ការបង្កើត DELETE Routes សម្រាប់លុបទិន្នន័យ",
      type: "lab", codeLanguage: "javascript",
      summary: "DELETE routes remove resources from storage. They typically return `204 No Content` or `200 OK` with confirmation metadata.",
      tip: "Consider implementing soft deletion (`deletedAt: Date`) in production to preserve audit trails and prevent catastrophic data loss.",
      objective: "Implement resource deletion endpoints with proper status codes.",
      expectedOutcome: "Reliable resource removal with HTTP 204 or 200 responses.",
      codeSnippet: `app.delete("/api/v1/articles/:id", async (req, res) => {
  await articleService.deleteArticle(req.params.id);
  res.status(204).send(); // 204 No Content
});`
    },
    {
      id: "M07-07", number: "07",
      title: "Route Parameters",
      khmerTitle: "ការទាញយក Route Parameters ពី URL (:id)",
      type: "concept", codeLanguage: "javascript",
      summary: "Route parameters are named URL segments used to capture values specified at their position in the URL. Captured values are populated in the `req.params` object.",
      tip: "Always validate that route parameters match expected formats (e.g. MongoDB ObjectId or integer IDs) to prevent database casting errors.",
      objective: "Extract dynamic route parameters from incoming request URLs.",
      expectedOutcome: "Precise parameter extraction for single-resource operations.",
      codeSnippet: `app.get("/api/v1/courses/:courseId/modules/:moduleId", (req, res) => {
  const { courseId, moduleId } = req.params;
  res.json({ courseId, moduleId });
});`
    },
    {
      id: "M07-08", number: "08",
      title: "Query Parameters",
      khmerTitle: "ការទាញយក Query Parameters (?page=1&sort=desc)",
      type: "concept", codeLanguage: "javascript",
      summary: "Query strings provide optional filtering, sorting, and pagination parameters, automatically parsed into the `req.query` object by Express.",
      tip: "Always sanitize query inputs and provide safe defaults (e.g. `const page = Math.max(1, Number(req.query.page) || 1)`).",
      objective: "Parse and sanitize query string parameters in list endpoints.",
      expectedOutcome: "Resilient list queries supporting dynamic client filtering.",
      codeSnippet: `app.get("/api/v1/products", (req, res) => {
  const { category, sort = "createdAt", page = "1", limit = "10" } = req.query;
  res.json({ filter: { category }, pagination: { page: Number(page), limit: Number(limit) } });
});`
    },
    {
      id: "M07-09", number: "09",
      title: "Multiple Routes",
      khmerTitle: "ការគ្រប់គ្រង Routes ច្រើនក្នុងកម្មវិធី",
      type: "concept", codeLanguage: "javascript",
      summary: "Managing multiple routes cleanly requires logical grouping so that URL paths remain intuitive, predictable, and maintainable as the application scales.",
      tip: "Define a consistent API version prefix (e.g. `/api/v1`) across all routes.",
      objective: "Organize extensive route collections without naming collisions.",
      expectedOutcome: "Clean, consistent API path namespaces across the entire project.",
      codeSnippet: `// Mounting domain routers under versioned namespaces
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);`
    },
    {
      id: "M07-10", number: "10",
      title: "express.Router()",
      khmerTitle: "ការបំបែក Routes ដោយប្រើ express.Router()",
      type: "lab", codeLanguage: "javascript",
      summary: "The `express.Router` class creates modular, mountable route handlers. A Router instance is a complete middleware and routing system, commonly referred to as a 'mini-app'.",
      tip: "Create a separate router file for each domain entity (e.g. `user.routes.js`, `auth.routes.js`).",
      objective: "Modularize routes into isolated router instances.",
      expectedOutcome: "Self-contained, testable routing modules for each resource.",
      codeSnippet: `// routes/product.routes.js
import { Router } from "express";

const router = Router();

router.route("/")
  .get(getProducts)
  .post(createProduct);

router.route("/:id")
  .get(getProductById)
  .patch(updateProduct)
  .delete(deleteProduct);

export default router;`
    },
    {
      id: "M07-11", number: "11",
      title: "Route Groups",
      khmerTitle: "ការរៀបចំ Route Groups ជាមួយ Common Prefixes",
      type: "lab", codeLanguage: "javascript",
      summary: "Mounting routers under common path prefixes (e.g. `/api/v1/auth`) eliminates redundant path typing inside the individual route definitions.",
      tip: "All middleware applied to a mounted router executes for every sub-route inside that group.",
      objective: "Group related endpoints under common prefixes and shared middleware guards.",
      expectedOutcome: "DRY routing declarations with scoped middleware protection.",
      codeSnippet: `// Mount admin router with shared admin authentication guard
import adminRouter from "./routes/admin.routes.js";
import { verifyAdmin } from "./middleware/auth.js";

app.use("/api/v1/admin", verifyAdmin, adminRouter);`
    },
    {
      id: "M07-12", number: "12",
      title: "Nested Routes",
      khmerTitle: "ការបង្កើត Nested Routes (Parent-Child Relationships)",
      type: "lab", codeLanguage: "javascript",
      summary: "Nested routes represent hierarchical relationships (e.g. `/tours/:tourId/reviews`). Express supports merging parent parameters into child routers using `{ mergeParams: true }`.",
      tip: "Always pass `{ mergeParams: true }` to `Router()` when mounting nested child routers so child handlers can access parent route parameters (like `:tourId`).",
      objective: "Construct hierarchical REST routes for parent-child data models.",
      expectedOutcome: "Accurate modeling of relational resources in RESTful endpoints.",
      codeSnippet: `// routes/review.routes.js
import { Router } from "express";

// mergeParams: true allows access to :tourId from parent route!
const router = Router({ mergeParams: true });

router.route("/")
  .get(getReviews)
  .post(createReview);

export default router;

// routes/tour.routes.js:
// router.use("/:tourId/reviews", reviewRouter);`
    },
    {
      id: "M07-13", number: "13",
      title: "Route Organization",
      khmerTitle: "ការរៀបចំរចនាសម្ព័ន្ធ Routes ក្នុងគម្រោងធំ",
      type: "architecture", codeLanguage: "javascript",
      summary: "In enterprise applications, an `index.js` routes aggregator combines all domain routers into a unified router module that is mounted onto the main Express app.",
      tip: "Keeping route files focused solely on path definitions and middleware bindings makes code reviews fast and transparent.",
      objective: "Aggregate multiple domain routers into a centralized router registry.",
      expectedOutcome: "Single clean mounting point for all application routes.",
      codeSnippet: `// routes/index.js
import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import orderRoutes from "./order.routes.js";

const apiRouter = Router();

apiRouter.use("/auth", authRoutes);
apiRouter.use("/users", userRoutes);
apiRouter.use("/orders", orderRoutes);

export default apiRouter;`
    },
    {
      id: "M07-14", number: "14",
      title: "RESTful Routes",
      khmerTitle: "គោលការណ៍ស្តង់ដារ RESTful Routes",
      type: "concept", codeLanguage: "javascript",
      summary: "RESTful routing strictly uses nouns (not verbs) in URL paths, pluralizes resource names, and leverages HTTP verbs to communicate the action to perform.",
      tip: "Never use actions in URLs like `/api/getUsers` or `/api/deleteUser/1`; use `GET /api/users` and `DELETE /api/users/1`.",
      objective: "Design industry-standard, predictable REST endpoint paths.",
      expectedOutcome: "Standardized RESTful API contracts following global conventions.",
      codeSnippet: `/* Standard REST Resource URLs:
   ✅ GET    /api/v1/products         (Get all products)
   ✅ POST   /api/v1/products         (Create product)
   ✅ GET    /api/v1/products/:id     (Get product details)
   ✅ PATCH  /api/v1/products/:id     (Update product)
   ✅ DELETE /api/v1/products/:id     (Delete product)
   ❌ GET    /api/v1/getAllProducts   (Anti-pattern: Verb in URL)
*/`
    }
  ],

  M08: [
    {
      id: "M08-01", number: "01",
      title: "What is Middleware?",
      khmerTitle: "អ្វីជា Middleware និងតួនាទីរបស់អនុគមន៍ next()",
      type: "concept", codeLanguage: "javascript",
      summary: "Middleware functions are the building blocks of an Express application. They sit between the incoming request and the final route handler, inspecting requests, modifying headers, verifying auth tokens, parsing bodies, and managing errors.",
      tip: "Always call `next()` or send a response with `res.json()`. Otherwise the HTTP connection hangs indefinitely.",
      objective: "Understand middleware chaining and execution order.",
      expectedOutcome: "Mastery of request interceptor pipelines.",
      codeSnippet: `// Request Logger Middleware
const requestLogger = (req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(\`[\${req.method}] \${req.originalUrl} - \${res.statusCode} (\${duration}ms)\`);
  });
  next(); // Pass control to the next middleware!
};

app.use(requestLogger);`
    },
    {
      id: "M08-02", number: "02",
      title: "Application Middleware",
      khmerTitle: "ការប្រើប្រាស់ Application-level Middleware (app.use)",
      type: "concept", codeLanguage: "javascript",
      summary: "Application-level middleware is bound to an instance of the `app` object using `app.use()` and `app.METHOD()`. It executes for every incoming request matching the path specification.",
      tip: "Mount global application middleware at the very top of `app.js` before any route definitions.",
      objective: "Configure application-wide request interceptors.",
      expectedOutcome: "Global security, parsing, and logging applied to all routes.",
      codeSnippet: `// Global application middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Path-scoped application middleware
app.use("/api", (req, res, next) => {
  console.log("API Access detected");
  next();
});`
    },
    {
      id: "M08-03", number: "03",
      title: "Router Middleware",
      khmerTitle: "ការប្រើប្រាស់ Router-level Middleware",
      type: "lab", codeLanguage: "javascript",
      summary: "Router-level middleware works identically to application-level middleware, but is bound to an instance of `express.Router()`. It only affects routes defined on that specific router.",
      tip: "Use router-level middleware to enforce authentication and authorization exclusively on private feature modules.",
      objective: "Scope middleware execution to specific feature routers.",
      expectedOutcome: "Isolated security controls without affecting public endpoints.",
      codeSnippet: `import { Router } from "express";
import { authenticate } from "./auth.js";

const accountRouter = Router();

// Middleware applied ONLY to routes inside accountRouter
accountRouter.use(authenticate);

accountRouter.get("/settings", getSettings);
accountRouter.patch("/password", updatePassword);`
    },
    {
      id: "M08-04", number: "04",
      title: "Built-in Middleware",
      khmerTitle: "Middleware ដែលភ្ជាប់មកស្រាប់ជាមួយ Express",
      type: "concept", codeLanguage: "javascript",
      summary: "Modern Express includes essential built-in middleware functions: `express.json()` (parses JSON bodies), `express.urlencoded()` (parses form data), and `express.static()` (serves static files like images and CSS).",
      tip: "Use `express.static('public')` to serve static uploaded files without writing manual file-serving routes.",
      objective: "Utilize built-in Express middleware for parsing and static asset delivery.",
      expectedOutcome: "Efficient handling of incoming payloads and static assets without external libraries.",
      codeSnippet: `// Serve static files from "public" directory
app.use(express.static("public"));

// Parse incoming payloads
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));`
    },
    {
      id: "M08-05", number: "05",
      title: "express.json()",
      khmerTitle: "ការប្រើប្រាស់ express.json() សម្រាប់ Body Parsing",
      type: "lab", codeLanguage: "javascript",
      summary: "`express.json()` is a built-in middleware based on `body-parser`. It parses incoming requests with JSON payloads and populates `req.body` with the resulting JavaScript object.",
      tip: "Always set a reasonable payload size limit (`{ limit: '10kb' }`) to protect your server from memory overflow attacks.",
      objective: "Configure JSON body parsing with payload size limits.",
      expectedOutcome: "Automatic population of `req.body` with security size caps.",
      codeSnippet: `// Restrict JSON payload size to 100kb for security
app.use(express.json({ limit: "100kb" }));

app.post("/api/echo", (req, res) => {
  res.json({ received: req.body });
});`
    },
    {
      id: "M08-06", number: "06",
      title: "express.urlencoded()",
      khmerTitle: "ការប្រើប្រាស់ express.urlencoded()",
      type: "lab", codeLanguage: "javascript",
      summary: "`express.urlencoded()` parses incoming requests with URL-encoded payloads (typically submitted from standard HTML `<form>` elements).",
      tip: "Always specify `{ extended: true }` to allow parsing rich objects and arrays using the `qs` library.",
      objective: "Parse HTML form submissions safely in Express.",
      expectedOutcome: "Seamless parsing of form payloads into `req.body`.",
      codeSnippet: `// Parses application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.post("/submit-form", (req, res) => {
  console.log("Form data:", req.body);
  res.redirect("/success");
});`
    },
    {
      id: "M08-07", number: "07",
      title: "Custom Middleware",
      khmerTitle: "ការបង្កើត Custom Middleware ផ្ទាល់ខ្លួន",
      type: "lab", codeLanguage: "javascript",
      summary: "Custom middleware functions encapsulate cross-cutting concerns (request timing, user context injection, audit logging, rate limiting) into reusable components.",
      tip: "Attach custom properties to `req` (e.g. `req.user`, `req.startTime`) to share contextual data across downstream middleware and controllers.",
      objective: "Author custom middleware functions that inspect and mutate request contexts.",
      expectedOutcome: "Reusable request processing utilities.",
      codeSnippet: `// Middleware to attach a unique Request ID for tracing logs
import crypto from "node:crypto";

export const requestIdMiddleware = (req, res, next) => {
  req.id = req.headers["x-request-id"] || crypto.randomUUID();
  res.setHeader("X-Request-Id", req.id);
  next();
};`
    },
    {
      id: "M08-08", number: "08",
      title: "Authentication Middleware",
      khmerTitle: "ការបង្កើត Authentication Middleware សម្រាប់ផ្ទៀងផ្ទាត់ JWT",
      type: "lab", codeLanguage: "javascript",
      summary: "Authentication middleware extracts the Bearer token from the `Authorization` header, verifies its cryptographic signature, decodes the user payload, and attaches `req.user`.",
      tip: "If the token is missing or invalid, return `401 Unauthorized` immediately and do NOT call `next()`.",
      objective: "Guard endpoints by verifying JWT access tokens.",
      expectedOutcome: "Secure endpoints with authenticated user context.",
      codeSnippet: `import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, error: "Authentication token required" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user context!
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: "Invalid or expired token" });
  }
};`
    },
    {
      id: "M08-09", number: "09",
      title: "Authorization Middleware",
      khmerTitle: "ការបង្កើត Authorization Middleware តាម Role",
      type: "lab", codeLanguage: "javascript",
      summary: "Authorization middleware inspects the authenticated user's role (e.g. `admin`, `moderator`) and verifies whether they have permission to access the requested resource.",
      tip: "Return `403 Forbidden` when the user is authenticated but lacks required permissions.",
      objective: "Implement Role-Based Access Control (RBAC) guards on routes.",
      expectedOutcome: "Fine-grained permission gating across administrative endpoints.",
      codeSnippet: `export const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: "Forbidden: Insufficient privileges"
      });
    }
    next();
  };
};

// Usage on route:
// router.delete("/users/:id", authenticate, restrictTo("admin"), deleteUser);`
    },
    {
      id: "M08-10", number: "10",
      title: "Logging Middleware",
      khmerTitle: "ការប្រើប្រាស់ Morgan និង Custom Logging Middleware",
      type: "lab", codeLanguage: "javascript",
      summary: "HTTP logging captures incoming request methods, URLs, status codes, response durations, and client IPs for monitoring and auditing.",
      tip: "Use the `morgan` library in development, and transition to structured JSON loggers like `winston` or `pino` in production.",
      objective: "Configure HTTP request logging for performance and security monitoring.",
      expectedOutcome: "Real-time visibility into incoming traffic and server response times.",
      codeSnippet: `import morgan from "morgan";

// In development: colorized concise output
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
} else {
  // In production: standard combined Apache log format
  app.use(morgan("combined"));
}`
    },
    {
      id: "M08-11", number: "11",
      title: "Error Middleware",
      khmerTitle: "ការបង្កើត Centralized Error Handling Middleware",
      type: "lab", codeLanguage: "javascript",
      summary: "Error-handling middleware functions have four arguments: `(err, req, res, next)`. Express identifies error middleware by arity (accepting 4 arguments) and skips all non-error middleware when `next(err)` is called.",
      tip: "Never leak the raw stack trace (`err.stack`) to clients in production environments to avoid disclosing security vulnerabilities.",
      objective: "Centralize application error handling into a single four-parameter middleware.",
      expectedOutcome: "Consistent, structured JSON error responses across all failure cases.",
      codeSnippet: `// Centralized Error Handling Middleware (MUST have 4 arguments!)
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(\`[\${req.method}] \${req.url} Error:\`, err);

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
};`
    },
    {
      id: "M08-12", number: "12",
      title: "Middleware Order",
      khmerTitle: "សារៈសំខាន់នៃលំដាប់លំដោយ Middleware Order",
      type: "concept", codeLanguage: "javascript",
      summary: "Middleware order in Express is strictly sequential. Requests flow top-to-bottom through middleware registered via `app.use()`. Security and parsing middleware must run before routes, and error middleware must be registered last.",
      tip: "Placing `express.json()` after route definitions will result in `req.body` being `undefined` in your handlers.",
      objective: "Arrange middleware registration in the correct execution order.",
      expectedOutcome: "Predictable execution pipeline free of undefined body or unhandled error bugs.",
      codeSnippet: `/* Standard Express Middleware Registration Order:
   1. Security headers (helmet, cors)
   2. Body parsers (express.json, express.urlencoded)
   3. Request logging (morgan)
   4. Application routes (app.use('/api', routes))
   5. 404 handler (Catch unhandled paths)
   6. Global error handler (errorHandler - ALWAYS LAST!)
*/`
    },
    {
      id: "M08-13", number: "13",
      title: "Middleware Best Practices",
      khmerTitle: "ការអនុវត្តល្អបំផុតសម្រាប់ប្រព័ន្ធ Middleware",
      type: "concept", codeLanguage: "javascript",
      summary: "Industry guidelines for middleware: keep functions focused on a single responsibility, handle errors promptly, never mutate global state, and encapsulate configurable middleware inside factory functions.",
      tip: "Use middleware factory functions (functions that return a middleware) to pass configuration options dynamically.",
      objective: "Apply enterprise patterns to author clean, modular middleware packages.",
      expectedOutcome: "Reusable, highly configurable middleware components.",
      codeSnippet: `// Middleware Factory Pattern:
export const rateLimiter = (options = { maxRequests: 100, windowMs: 60000 }) => {
  const requests = new Map();
  return (req, res, next) => {
    // Custom rate limit logic using options
    next();
  };
};`
    }
  ],

  M09: [
    {
      id: "M09-01", number: "01",
      title: "What is REST?",
      khmerTitle: "អ្វីជាស្ថាបត្យកម្ម REST?",
      type: "concept", codeLanguage: "javascript",
      summary: "Representational State Transfer (REST) is an architectural style for distributed hypermedia systems introduced by Roy Fielding. It relies on a stateless, client-server, cacheable communications protocol (HTTP).",
      tip: "REST is an architectural pattern, not a strict protocol; consistency across resource naming and status codes is what makes an API truly RESTful.",
      objective: "Understand the core concepts of Representational State Transfer.",
      expectedOutcome: "Solid grasp of REST architectural conventions.",
      codeSnippet: `/* REST Architecture Core Tenets:
   - Client-Server Separation
   - Statelessness (No client state stored on server)
   - Cacheability
   - Uniform Interface (Standard HTTP verbs & resource URIs)
   - Layered System (Proxies, gateways, caches)
*/`
    },
    {
      id: "M09-02", number: "02",
      title: "REST Principles",
      khmerTitle: "គោលការណ៍គ្រឹះទាំង ៦ នៃ REST",
      type: "concept", codeLanguage: "javascript",
      summary: "The six guiding constraints of REST: Client-Server, Stateless, Cacheable, Uniform Interface, Layered System, and Code on Demand. Adhering to these principles ensures scalability, portability, and reliability.",
      tip: "Statelessness enables simple horizontal scaling: any server instance in a cluster can handle any incoming request.",
      objective: "Apply the six foundational REST principles to API design.",
      expectedOutcome: "Scalable API architecture designed for distributed cloud deployment.",
      codeSnippet: `// Stateless Request Example:
// Every request carries its own credentials, eliminating sticky sessions
fetch("/api/v1/orders", {
  headers: {
    "Authorization": "Bearer eyJhbGciOi...",
    "Content-Type": "application/json"
  }
});`
    },
    {
      id: "M09-03", number: "03",
      title: "RESTful API Design",
      khmerTitle: "ការរចនា RESTful API ប្រកបដោយវិជ្ជាជីវៈ",
      type: "architecture", codeLanguage: "javascript",
      summary: "Effective REST API design uses lowercase plural nouns for resources (`/users`, `/orders`), handles relationships intuitively (`/users/5/orders`), and provides clean pagination, sorting, and filtering options.",
      tip: "Always use hyphens (kebab-case) in URLs rather than underscores or camelCase (e.g. `/order-items` instead of `/order_items`).",
      objective: "Design intuitive, developer-friendly REST API specifications.",
      expectedOutcome: "Professional REST endpoints following industry best practices.",
      codeSnippet: `/* RESTful URL Design Guide:
   Good: /api/v1/user-profiles
   Good: /api/v1/customers/12/invoices
   Bad:  /api/v1/getUserProfiles
   Bad:  /api/v1/invoices?customerId=12 (use nested URI if strictly owned)
*/`
    },
    {
      id: "M09-04", number: "04",
      title: "Resources",
      khmerTitle: "ការកំណត់ និងគ្រប់គ្រង Resources",
      type: "concept", codeLanguage: "javascript",
      summary: "In REST, a resource is any piece of information that can be named (a document, image, user account, product inventory, or transaction). Each resource is identified by a stable URI.",
      tip: "A resource representation is usually a JSON document, but the same resource could also be represented as XML or PDF via content negotiation.",
      objective: "Model application domain entities as discrete REST resources.",
      expectedOutcome: "Clear mapping between database schemas and public API resources.",
      codeSnippet: `// Resource representation
const userResource = {
  id: "USR_101",
  fullName: "Sokha Mean",
  email: "sokha@example.com",
  createdAt: "2026-09-17T05:00:00.000Z"
};`
    },
    {
      id: "M09-05", number: "05",
      title: "CRUD",
      khmerTitle: "ប្រតិបត្តិការ CRUD និងការផ្សារភ្ជាប់ជាមួយ HTTP",
      type: "concept", codeLanguage: "javascript",
      summary: "CRUD (Create, Read, Update, Delete) maps directly to the foundational HTTP methods: Create ➔ POST, Read ➔ GET, Update ➔ PUT/PATCH, Delete ➔ DELETE.",
      tip: "Keep CRUD endpoints consistent across all resources in your API to minimize the learning curve for frontend developers.",
      objective: "Implement complete CRUD operations for any business entity.",
      expectedOutcome: "Standardized CRUD capabilities across all API models.",
      codeSnippet: `/* CRUD to HTTP Verb Mapping:
   Create ➔ POST   /api/v1/products
   Read   ➔ GET    /api/v1/products / /api/v1/products/:id
   Update ➔ PATCH  /api/v1/products/:id
   Delete ➔ DELETE /api/v1/products/:id
*/`
    },
    {
      id: "M09-06", number: "06",
      title: "GET",
      khmerTitle: "ការអនុវត្ត GET Endpoint ស្តង់ដារ",
      type: "lab", codeLanguage: "javascript",
      summary: "Building GET endpoints for retrieving collections with filtering, as well as single resources by unique ID with proper 404 handling.",
      tip: "If a resource with the requested ID does not exist, return `404 Not Found` rather than an empty object or null with 200.",
      objective: "Implement robust single and collection retrieval routes.",
      expectedOutcome: "Accurate query handling and clean 404 responses for missing entities.",
      codeSnippet: `app.get("/api/v1/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, error: "Product not found" });
  }
  res.json({ success: true, data: product });
});`
    },
    {
      id: "M09-07", number: "07",
      title: "POST",
      khmerTitle: "ការអនុវត្ត POST Endpoint ស្តង់ដារ",
      type: "lab", codeLanguage: "javascript",
      summary: "Building POST endpoints that validate input data, create database records, generate unique IDs, and return HTTP `201 Created` with the newly created resource.",
      tip: "Set the `Location` response header to the URL of the newly created resource (`res.setHeader('Location', '/api/v1/products/' + item.id)`).",
      objective: "Build creation endpoints returning 201 Created status codes.",
      expectedOutcome: "Reliable resource creation with validation and location headers.",
      codeSnippet: `app.post("/api/v1/products", async (req, res) => {
  const newProduct = await Product.create(req.body);
  res.setHeader("Location", \`/api/v1/products/\${newProduct._id}\`);
  res.status(201).json({ success: true, data: newProduct });
});`
    },
    {
      id: "M09-08", number: "08",
      title: "PUT",
      khmerTitle: "ការអនុវត្ត PUT Endpoint ស្តង់ដារ",
      type: "lab", codeLanguage: "javascript",
      summary: "Building PUT endpoints that completely overwrite a resource with the new representation, returning 404 if the resource does not exist.",
      tip: "PUT operations must be idempotent: sending the exact same PUT payload multiple times must leave the resource in the exact same state.",
      objective: "Implement idempotent full resource replacement.",
      expectedOutcome: "Idempotent resource replacement adhering to HTTP RFC standards.",
      codeSnippet: `app.put("/api/v1/products/:id", async (req, res) => {
  const updated = await Product.findOneAndReplace({ _id: req.params.id }, req.body, { new: true, runValidators: true });
  if (!updated) return res.status(404).json({ success: false, error: "Product not found" });
  res.json({ success: true, data: updated });
});`
    },
    {
      id: "M09-09", number: "09",
      title: "PATCH",
      khmerTitle: "ការអនុវត្ត PATCH Endpoint ស្តង់ដារ",
      type: "lab", codeLanguage: "javascript",
      summary: "Building PATCH endpoints that update only the provided fields using MongoDB's `$set` operator while preserving all other existing attributes.",
      tip: "Always enable `{ new: true, runValidators: true }` in Mongoose when running update queries.",
      objective: "Implement partial resource updates.",
      expectedOutcome: "Flexible partial updates without unintentional data erasure.",
      codeSnippet: `app.patch("/api/v1/products/:id", async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  );
  if (!updated) return res.status(404).json({ success: false, error: "Product not found" });
  res.json({ success: true, data: updated });
});`
    },
    {
      id: "M09-10", number: "10",
      title: "DELETE",
      khmerTitle: "ការអនុវត្ត DELETE Endpoint ស្តង់ដារ",
      type: "lab", codeLanguage: "javascript",
      summary: "Building DELETE endpoints that remove resources from the database and return `204 No Content` upon successful deletion.",
      tip: "DELETE should be idempotent: deleting an already-deleted resource can return 204 or 404 depending on API contract conventions.",
      objective: "Implement resource deletion endpoints.",
      expectedOutcome: "Clean entity removal with proper HTTP 204 signaling.",
      codeSnippet: `app.delete("/api/v1/products/:id", async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ success: false, error: "Product not found" });
  res.status(204).send();
});`
    },
    {
      id: "M09-11", number: "11",
      title: "HTTP Status Codes",
      khmerTitle: "ការជ្រើសរើស Status Codes ត្រឹមត្រូវក្នុង REST APIs",
      type: "concept", codeLanguage: "javascript",
      summary: "Accurate status codes are essential: 200 (OK), 201 (Created), 204 (No Content), 400 (Bad Request / Validation), 401 (Unauthenticated), 403 (Forbidden), 404 (Not Found), 409 (Conflict), 422 (Unprocessable Entity), 500 (Internal Error).",
      tip: "Return `409 Conflict` when a user attempts to register with an email address that is already registered.",
      objective: "Map business failure and success states to accurate status codes.",
      expectedOutcome: "Predictable, transparent API signaling.",
      codeSnippet: `// Email collision:
if (emailExists) {
  return res.status(409).json({ success: false, error: "Email already registered" });
}`
    },
    {
      id: "M09-12", number: "12",
      title: "API Response Structure",
      khmerTitle: "ទម្រង់ឆ្លើយតបស្តង់ដារ JSON Envelope",
      type: "concept", codeLanguage: "javascript",
      summary: "Encapsulating all API responses inside a consistent JSON envelope structure (`{ success: true, data: ..., meta: ... }`) makes client consumption predictable across web and mobile apps.",
      tip: "Always include a boolean `success` flag at the root of the JSON response for fast frontend evaluation.",
      objective: "Standardize JSON response payloads across all controllers.",
      expectedOutcome: "Uniform response contract across the entire API.",
      codeSnippet: `// Standard Success Envelope
const response = {
  success: true,
  data: {
    id: "P_102",
    name: "Wireless Mouse",
    price: 29.99
  },
  meta: {
    timestamp: new Date().toISOString()
  }
};`
    },
    {
      id: "M09-13", number: "13",
      title: "API Error Structure",
      khmerTitle: "ទម្រង់ឆ្លើយតបកំហុសស្តង់ដារ Error Envelope",
      type: "concept", codeLanguage: "javascript",
      summary: "Standardizing error responses (`{ success: false, error: 'Message', details: [] }`) provides detailed feedback for form validation without exposing internal stack traces.",
      tip: "Include a field-by-field breakdown in `details` when validation fails so frontends can highlight specific inputs.",
      objective: "Construct standardized error payloads with field-level validation breakdowns.",
      expectedOutcome: "Actionable error messages for API consumers.",
      codeSnippet: `// Standard Error Envelope
const errorResponse = {
  success: false,
  error: "Validation Error",
  statusCode: 422,
  details: [
    { field: "email", message: "Invalid email format" },
    { field: "password", message: "Password must be at least 8 characters" }
  ]
};`
    },
    {
      id: "M09-14", number: "14",
      title: "Pagination",
      khmerTitle: "ការរៀបចំ Pagination (Limit & Skip)",
      type: "lab", codeLanguage: "javascript",
      summary: "Pagination breaks massive database collections into manageable pages using `page` and `limit` query parameters, preventing server memory crashes and slow page loads.",
      tip: "Always calculate total pages with `Math.ceil(totalCount / limit)` and include pagination metadata in the response.",
      objective: "Implement pagination using skip and limit parameters.",
      expectedOutcome: "High-throughput collection queries capable of handling millions of records.",
      codeSnippet: `app.get("/api/v1/items", async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Item.find().skip(skip).limit(limit),
    Item.countDocuments()
  ]);

  res.json({
    success: true,
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    data: items
  });
});`
    },
    {
      id: "M09-15", number: "15",
      title: "Filtering",
      khmerTitle: "ការបង្កើត Query Filtering សម្រាប់ Search & Categories",
      type: "lab", codeLanguage: "javascript",
      summary: "Filtering allows clients to query resources matching specific criteria (e.g. `?category=electronics&price[gte]=100&inStock=true`).",
      tip: "Never pass raw `req.query` directly into MongoDB queries; sanitize keys to prevent NoSQL injection.",
      objective: "Build flexible query filters supporting ranges and categories.",
      expectedOutcome: "Powerful, safe database query filtering.",
      codeSnippet: `app.get("/api/v1/products", async (req, res) => {
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  if (req.query.inStock) filter.inStock = req.query.inStock === "true";
  if (req.query.minPrice) filter.price = { $gte: Number(req.query.minPrice) };

  const products = await Product.find(filter);
  res.json({ success: true, count: products.length, data: products });
});`
    },
    {
      id: "M09-16", number: "16",
      title: "Searching",
      khmerTitle: "ការស្វែងរកទិន្នន័យ (Regex & Text Index Search)",
      type: "lab", codeLanguage: "javascript",
      summary: "Text searching across multiple resource fields (name, description) using case-insensitive regex or dedicated MongoDB full-text indexes.",
      tip: "Use MongoDB `$text` index search instead of regex for large datasets for logarithmic search speed.",
      objective: "Implement keyword search across database records.",
      expectedOutcome: "Fast text search across product catalogs and user directories.",
      codeSnippet: `app.get("/api/v1/search", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.json({ success: true, data: [] });

  // Case-insensitive regex search
  const results = await Product.find({
    name: { $regex: q, $options: "i" }
  }).limit(20);

  res.json({ success: true, count: results.length, data: results });
});`
    },
    {
      id: "M09-17", number: "17",
      title: "Sorting",
      khmerTitle: "ការរៀបចំលំដាប់លំដោយ Sorting (Ascending & Descending)",
      type: "lab", codeLanguage: "javascript",
      summary: "Sorting allows clients to control the presentation order of retrieved resources (`?sort=-createdAt,price`).",
      tip: "Use `-` prefix conventions (e.g. `sort=-price`) for descending order and plain field names for ascending.",
      objective: "Parse client sort strings into database sort directives.",
      expectedOutcome: "Flexible sorting across multiple entity fields.",
      codeSnippet: `// Handling sort strings: ?sort=-price,createdAt
app.get("/api/v1/products", async (req, res) => {
  let sortQuery = "-createdAt"; // Default newest first
  if (req.query.sort) {
    sortQuery = req.query.sort.split(",").join(" ");
  }

  const products = await Product.find().sort(sortQuery);
  res.json({ success: true, data: products });
});`
    },
    {
      id: "M09-18", number: "18",
      title: "API Versioning",
      khmerTitle: "ការគ្រប់គ្រងកំណែ API Versioning (URI vs Header)",
      type: "concept", codeLanguage: "javascript",
      summary: "API versioning allows developers to introduce breaking changes without disrupting existing mobile or web clients. URI path versioning (`/api/v1/`) is the most transparent and widely adopted method.",
      tip: "Always version your API from day one (start with `/api/v1`) to prevent painful migration refactors later.",
      objective: "Design backwards-compatible versioning schemes.",
      expectedOutcome: "Future-proof API architecture capable of supporting multiple client generations.",
      codeSnippet: `// Mounting versioned routes
import v1Routes from "./routes/v1/index.js";
import v2Routes from "./routes/v2/index.js";

app.use("/api/v1", v1Routes);
app.use("/api/v2", v2Routes);`
    }
  ],

  M10: [
    {
      id: "M10-01", number: "01",
      title: "Why Separate Business Logic?",
      khmerTitle: "ហេតុអ្វីត្រូវបំបែក Business Logic ចេញពី Controller?",
      type: "concept", codeLanguage: "javascript",
      summary: "Writing database queries, payment transactions, and email logic directly inside Express route callbacks creates tightly-coupled, untestable code. Separating business logic into dedicated services ensures code is testable, reusable across CLI scripts or background workers, and simple to maintain.",
      tip: "If you need to send a welcome email in a web route, CLI script, and background worker, a standalone `UserService` handles all three without duplicating code.",
      objective: "Understand the architectural benefits of decoupling HTTP transport from domain logic.",
      expectedOutcome: "Clear rationale for modular Layered Architecture.",
      codeSnippet: `// BAD: Controller does EVERYTHING (Tightly coupled to Express)
app.post("/users", async (req, res) => {
  // DB queries, password hashing, email sending all mixed into HTTP handler!
});

// GOOD: Controller delegates to reusable Service
app.post("/users", async (req, res, next) => {
  const user = await userService.registerUser(req.body);
  res.status(201).json({ success: true, data: user });
});`
    },
    {
      id: "M10-02", number: "02",
      title: "Controllers",
      khmerTitle: "តួនាទី និងទំនួលខុសត្រូវរបស់ Controllers",
      type: "concept", codeLanguage: "javascript",
      summary: "Controllers are the entry point of HTTP requests. Their sole responsibility is to extract data from `req` (params, query, body), validate inputs, delegate to domain services, and format the HTTP response with appropriate status codes.",
      tip: "A controller should never contain SQL queries or Mongoose `.find()` calls directly; keep controllers slim and services rich.",
      objective: "Write clean, slim controllers focused exclusively on HTTP mechanics.",
      expectedOutcome: "Readable controller handlers with zero direct database queries.",
      codeSnippet: `export const getProductById = async (req, res, next) => {
  try {
    const product = await productService.getById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};`
    },
    {
      id: "M10-03", number: "03",
      title: "Services",
      khmerTitle: "តួនាទី និងទំនួលខុសត្រូវរបស់ Services",
      type: "concept", codeLanguage: "javascript",
      summary: "Services encapsulate pure business logic, database queries, calculations, external API calls, and domain rules. Services never touch `req` or `res` objects.",
      tip: "Never pass `req` or `res` into a service method; pass only the specific data arguments (e.g. `userId, payload`) to maintain testability.",
      objective: "Implement transport-independent business logic services.",
      expectedOutcome: "Services that can be unit-tested without mocking Express HTTP objects.",
      codeSnippet: `// services/product.service.js
import { Product } from "../models/product.model.js";

export const getById = async (id) => {
  return await Product.findById(id).lean();
};

export const createProduct = async (productData) => {
  // Pure business logic: sanitize, compute discount, persist
  const priceWithTax = productData.price * 1.1;
  return await Product.create({ ...productData, priceWithTax });
};`
    },
    {
      id: "M10-04", number: "04",
      title: "Routes",
      khmerTitle: "តួនាទីនៃ Route Definitions",
      type: "concept", codeLanguage: "javascript",
      summary: "Routes serve purely as routing tables that map HTTP paths and verbs to middleware guards and controller handlers.",
      tip: "Route files should contain zero business logic—only URL path definitions and middleware bindings.",
      objective: "Maintain lean, declarative route definition files.",
      expectedOutcome: "Clean routing declarations reading like an API table of contents.",
      codeSnippet: `import { Router } from "express";
import * as productController from "../controllers/product.controller.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.get("/", productController.getAllProducts);
router.post("/", authenticate, productController.createProduct);

export default router;`
    },
    {
      id: "M10-05", number: "05",
      title: "Separation of Concerns",
      khmerTitle: "ការបែងចែកទំនួលខុសត្រូវ (Separation of Concerns)",
      type: "architecture", codeLanguage: "javascript",
      summary: "Separation of Concerns (SoC) mandates that distinct layers manage distinct aspects of software execution: Routes handle URL matching, Controllers handle HTTP transport, Services handle business rules, and Models handle data storage.",
      tip: "When a feature changes (e.g. switching from MongoDB to PostgreSQL), only the Service/Model layer changes, leaving routes and controllers untouched.",
      objective: "Enforce strict separation between routing, controllers, services, and models.",
      expectedOutcome: "Highly maintainable code with isolated change boundaries.",
      codeSnippet: `/* Layered Separation of Concerns:
   [HTTP Request]
         ▼
   [Route Definition]  --> Maps path to controller
         ▼
   [Controller]        --> Extracts req data & returns res.json()
         ▼
   [Service]           --> Business logic, rules, calculations
         ▼
   [Model / Database]  --> Queries & persists to MongoDB/PostgreSQL
*/`
    },
    {
      id: "M10-06", number: "06",
      title: "Controller-Service Architecture",
      khmerTitle: "ស្ថាបត្យកម្ម Controller-Service",
      type: "architecture", codeLanguage: "javascript",
      summary: "The Controller-Service Pattern is the gold standard for enterprise Express backends. It creates a unidirectional data flow from HTTP transport down into domain logic and persistence layers.",
      tip: "Controllers handle 'what to send back to the user', while Services handle 'how the business operates'.",
      objective: "Build a complete feature using the Controller-Service pattern.",
      expectedOutcome: "Production-grade separation of transport and business logic.",
      codeSnippet: `// controller:
export const register = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

// service:
export const registerUser = async (data) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new ConflictError("Email already in use");
  const hashed = await bcrypt.hash(data.password, 12);
  return await User.create({ ...data, password: hashed });
};`
    },
    {
      id: "M10-07", number: "07",
      title: "Reusable Business Logic",
      khmerTitle: "ការសរសេរ Business Logic ដែលអាចប្រើឡើងវិញបាន",
      type: "lab", codeLanguage: "javascript",
      summary: "By isolating logic in service functions, features like sending receipts, generating invoices, or charging credit cards can be triggered by API requests, cron jobs, or CLI scripts.",
      tip: "Services should be pure asynchronous functions that take raw JavaScript objects and return clean results.",
      objective: "Author service methods reusable across multiple application contexts.",
      expectedOutcome: "Single source of truth for business operations.",
      codeSnippet: `// Can be called by:
// 1. POST /api/orders controller
// 2. Scheduled Cron Job (auto-renewal)
// 3. Admin CLI tool
export const processOrderInvoice = async (orderId) => {
  const order = await Order.findById(orderId);
  const pdfBuffer = await generateInvoicePdf(order);
  await emailService.sendInvoice(order.customerEmail, pdfBuffer);
  return { processed: true, orderId };
};`
    },
    {
      id: "M10-08", number: "08",
      title: "Error Handling",
      khmerTitle: "ការគ្រប់គ្រងកំហុសក្នុង Service Layer",
      type: "lab", codeLanguage: "javascript",
      summary: "Services throw domain-specific custom errors (e.g. `NotFoundError`, `UnauthorizedError`) with status codes, which controllers forward to the central error middleware via `next(err)`.",
      tip: "Create custom error classes inheriting from `Error` with a `statusCode` property for clean status propagation.",
      objective: "Propagate domain errors from services to centralized error middleware.",
      expectedOutcome: "Clean, consistent error propagation without try/catch boilerplate.",
      codeSnippet: `export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// In service:
if (!product) throw new AppError("Product does not exist", 404);`
    },
    {
      id: "M10-09", number: "09",
      title: "Project Organization",
      khmerTitle: "ការរៀបចំ Directory និងឯកសារ Controller-Service",
      type: "architecture", codeLanguage: "bash",
      summary: "Organizing files by feature or technical layer with consistent naming conventions (`product.controller.js`, `product.service.js`, `product.routes.js`).",
      tip: "Keep related controller, service, and route files in close proximity or clearly paired naming.",
      objective: "Establish consistent naming and file structure standards.",
      expectedOutcome: "Intuitive file discovery across large team codebases.",
      codeSnippet: `src/
├── controllers/
│   ├── auth.controller.js
│   └── product.controller.js
├── services/
│   ├── auth.service.js
│   └── product.service.js
└── routes/
    ├── auth.routes.js
    └── product.routes.js`
    },
    {
      id: "M10-10", number: "10",
      title: "Backend Architecture Best Practices",
      khmerTitle: "ការអនុវត្តស្ថាបត្យកម្មល្អបំផុតសម្រាប់ Backend",
      type: "architecture", codeLanguage: "javascript",
      summary: "Enterprise principles for scalable backend development: dependency injection, single responsibility, environment isolation, database connection pooling, and continuous automated testing.",
      tip: "When code files grow beyond 250 lines, it is usually time to extract helper functions or split services.",
      objective: "Adopt industry-standard architectural best practices for maintainability.",
      expectedOutcome: "Maintainable, testable, and scalable enterprise backend codebase.",
      codeSnippet: `/* Enterprise Backend Architecture Checklist:
   ✅ Separation of Concerns (Routes -> Controllers -> Services -> Models)
   ✅ Centralized Error Handling (Single error middleware)
   ✅ Environment-driven Configuration (Never hardcode secrets)
   ✅ Input Validation (Zod schemas before controllers)
   ✅ Automated Integration Tests (Vitest + Supertest)
*/`
    }
  ]
};
