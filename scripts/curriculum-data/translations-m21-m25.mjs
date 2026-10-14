/**
 * translations-m21-m25.mjs
 * Structured Khmer summaries with bullet points (- ) for Modules 21 through 25.
 * Follows AGENTS.md guidelines: keep technical terms in English, use natural Khmer for connective narrative.
 */

export const TRANSLATIONS_21_25 = {
  // ── M21: API Documentation (Swagger / OpenAPI) ────────────────────────────
  "M21-01": "សារៈសំខាន់នៃការបង្កើត API Documentation ក្នុងស្ថាបត្យកម្មទំនើប៖\n\n- **Formal API Contract**៖ ជាកិច្ចសន្យាផ្លូវការរវាង Backend Developers និង Frontend/Mobile Teams។\n- **កាត់បន្ថយពេលវេលាប្រាស្រ័យទាក់ទង**៖ ក្រុមការងារមិនបាច់សួរបញ្ជាក់ទម្រង់ Request/Response ឬ Headers ដដែលៗឡើយ។\n- **បង្កើនល្បឿនសមាហរណកម្ម**៖ ជួយឱ្យការធ្វើ Third-party Integrations និង Client SDK Generation មានភាពរហ័ស និងត្រឹមត្រូវ។",

  "M21-02": "ស្វែងយល់ពី OpenAPI Specification (OAS 3.0)៖\n\n- **Machine-readable Standard**៖ ស្តង់ដារកំណត់រចនាសម្ព័ន្ធ RESTful APIs ជាលក្ខណៈ JSON ឬ YAML ដោយឯករាជ្យពីភាសា Programming។\n- **សមាសធាតុចម្បង**៖ ពិពណ៌នាអំពី Base URLs, Paths, HTTP Verbs, Parameters, Request Bodies, និង Response Codes។\n- **Security Definitions**៖ កំណត់រចនាសម្ព័ន្ធ Security Schemes ដូចជា Bearer JWT, API Keys, និង OAuth2។",

  "M21-03": "ការស្វែងយល់ពីប្រព័ន្ធអេកូឡូស៊ី Swagger៖\n\n- **Swagger UI**៖ ឧបករណ៍បង្កើត Interactive Web Interface សម្រាប់ឱ្យ Developers អាន និងសាកល្បង Endpoints ដោយផ្ទាល់។\n- **Swagger Editor**៖ ឧបករណ៍សរសេរ និងផ្ទៀងផ្ទាត់កំហុស OpenAPI Specification (Syntax Validation)។\n- **Swagger Codegen**៖ បង្កើត Client SDKs និង Server Stubs ដោយស្វ័យប្រវត្តិតាមភាសាផ្សេងៗ (TypeScript, Swift, Java)។",

  "M21-04": "ការដំឡើង Swagger UI ក្នុង Express ជាមួយ swagger-ui-express៖\n\n- **Interactive Documentation Route**៖ បង្ហោះ Documentation លើ Endpoint ស្តង់ដារ `/api/docs`។\n- **swagger-ui-express & swagger-jsdoc**៖ អាន OpenAPI Comments ពី Codebase ឬអាន Static `swagger.yaml` File។\n- **Try It Out Feature**៖ អនុញ្ញាតឱ្យសាកល្បងផ្ញើ Request និងពិនិត្យ Live Responses ភ្លាមៗនៅលើ Browser។",

  "M21-05": "ការកំណត់ Schemas និង DTOs ក្នុង Swagger Components៖\n\n- **Centralized Components**៖ កំណត់ទម្រង់ Data Models ក្នុង `components.schemas` (Course, User, ErrorEnvelope)។\n- **Reusability**៖ ប្រើ `$ref: '#/components/schemas/Course'` ដើម្បីប្រើប្រាស់ឡើងវិញលើគ្រប់ Endpoints។\n- **Consistency**៖ ធានាថា Response Schema លើ Documentation ត្រូវគ្នាជាមួយ Mongoose Model ជានិច្ច។",

  "M21-06": "ការសរសេរឯកសារ Params, Query, និង Request Body៖\n\n- **Path Parameters**៖ កត់ត្រា URL Params (ឧ. `/courses/{id}`) រួមជាមួយ Type និង Validation (24 hex characters)។\n- **Query Parameters**៖ កត់ត្រា Filtering, Sorting, និង Pagination Options (ឧ. `?page=1&limit=10&sort=-createdAt`)។\n- **Request Body (JSON)**៖ បញ្ជាក់ Required Fields, Field Types, និង Example Payloads យ៉ាងលម្អិត។",

  "M21-07": "ការសរសេរឯកសារ HTTP Responses (200, 201, 400, 404, 500)៖\n\n- **Success Codes**៖ កត់ត្រា `200 OK` (សម្រាប់ Read/Update) និង `201 Created` (សម្រាប់ New Resource)។\n- **Client Error Codes**៖ កត់ត្រា `400 Bad Request` (Validation Failed), `401 Unauthorized`, និង `404 Not Found`។\n- **Example Payloads**៖ ផ្តល់ Example JSON Response ជាក់ស្តែងសម្រាប់ទាំងករណីជោគជ័យ និងករណីកំហុស។",

  "M21-08": "ការកត់ត្រា Auth Security Schemes (Bearer JWT & Cookies)៖\n\n- **Security Schemes**៖ កំណត់ Bearer Token តាមរយៈ `type: http, scheme: bearer, bearerFormat: JWT`។\n- **Authorize Button**៖ បង្កើតប៊ូតុង 'Authorize' លើ Swagger UI ឱ្យ Developer បញ្ចូល JWT ម្តងសម្រាប់តេស្តគ្រប់ Protected Endpoints។\n- **Cookie Authentication**៖ កត់ត្រា Cookie Security Schemes សម្រាប់ APIs ដែលប្រើ HttpOnly Cookies។",

  "M21-09": "ការរៀបចំទម្រង់ Error Response ជាលក្ខណៈស្តង់ដារក្នុង Swagger៖\n\n- **Standard Error Schema**៖ កំណត់ Error Envelope រួមមាន `status`, `message`, និង `errors` array។\n- **Predictable Errors**៖ ជួយឱ្យ Frontend Developers ដឹងជាមុននូវរាល់ Error Structures ដែល API អាចឆ្លើយតប។\n- **Consistent Integration**៖ សម្រួលដល់ការបង្កើត Global Axios/Fetch Interceptors លើ Client-side។",

  "M21-10": "ស្ថាបត្យកម្មប្រព័ន្ធ Documentation ពេញលេញកម្រិត Production៖\n\n- **Doc-as-Code**៖ ធ្វើបច្ចុប្បន្នភាពឯកសារស្របគ្នាជាមួយ Codebase ក្នុង Git Repository។\n- **CI/CD Integration**៖ Validate OpenAPI Syntax ដោយស្វ័យប្រវត្តិតាមរយៈ GitHub Actions មុនពេល Merge កូដ។\n- **Export Capabilities**៖ អនុញ្ញាតឱ្យ Export ជា OpenAPI JSON ឬ Postman Collection សម្រាប់ Third-party Partners។",

  // ── M22: Automated Testing (Vitest, Jest, Supertest) ───────────────────────
  "M22-01": "សារៈសំខាន់នៃការធ្វើតេស្ត API ដោយស្វ័យប្រវត្តិ (Automated Testing)៖\n\n- **Prevent Regressions**៖ ធានាថាកូដថ្មីមិនបង្កឱ្យខូចមុខងារចាស់ៗដែលកំពុងដំណើរការស្រាប់។\n- **Refactoring Confidence**៖ ផ្តល់ទំនុកចិត្តខ្ពស់ដល់ Developers ក្នុងការកែលម្អរចនាសម្ព័ន្ធកូដដោយមិនខ្លាចខូច។\n- **Continuous Delivery**៖ ជាឆ្អឹងខ្នងនៃ CI/CD Pipelines ជួយឱ្យការ Deploy ទៅកាន់ Production ប្រព្រឹត្តទៅដោយសុវត្ថិភាព។",

  "M22-02": "គោលការណ៍គ្រឹះនៃ Unit Testing៖\n\n- **Isolated Scope**៖ ធ្វើតេស្តមុខងារតូចៗដាច់ដោយឡែក (Pure Functions, Helper Utilities, Validation Rules)។\n- **គ្មាន External Dependencies**៖ មិនភ្ជាប់ទៅកាន់ Database, Network, ឬ External APIs ឡើយ។\n- **Execution Speed**៖ ដំណើរការលឿនបំផុត (គិតជា Milliseconds) ផ្តល់ Instant Feedback ដល់ Developer។",

  "M22-03": "គោលការណ៍ Integration Testing លើ API Endpoints៖\n\n- **Multi-component Scope**៖ ធ្វើតេស្តការធ្វើការរួមគ្នារវាង Controller, Middleware, Service, និង Database។\n- **Real HTTP Flow**៖ ផ្ទៀងផ្ទាត់ថាតើ Request មួយឆ្លងកាត់ Middleware Pipeline និង Persist ទិន្នន័យបានត្រឹមត្រូវឬទេ។\n- **High Confidence**៖ ផ្តល់ទំនុកចិត្តខ្ពស់បំផុតថា API Endpoints ដំណើរការដូចគ្នានឹងការហៅពី Client ពិតប្រាកដ។",

  "M22-04": "ការធ្វើតេស្ត HTTP API តាមបែបស្វ័យប្រវត្តិ៖\n\n- **HTTP Methods Verification**៖ តេស្តប្រតិបត្តិការ GET, POST, PATCH, និង DELETE។\n- **Status Codes & Headers**៖ ផ្ទៀងផ្ទាត់ HTTP Status Codes (200, 201, 400, 401, 404) និង Content-Type Headers។\n- **Payload Assertions**៖ ពិនិត្យភាពត្រឹមត្រូវនៃទិន្នន័យ JSON Body ដែលត្រឡប់មកវិញ។",

  "M22-05": "ការដំឡើង និងដំណើរការ Vitest ក្នុង Node.js៖\n\n- **Vite-powered Speed**៖ Test Runner ជំនាន់ថ្មីដែលមានល្បឿនលឿនបំផុត គាំទ្រ Native ES Modules ដោយផ្ទាល់។\n- **Jest-compatible API**៖ ប្រើ Syntax ដូចគ្នា (`describe`, `it`, `expect`, `vi`) ងាយស្រួលសរសេរ និងរៀនសូត្រ។\n- **Instant Watch Mode**៖ ដំណើរការឡើងវិញតែ Tests ដែលពាក់ព័ន្ធនឹង File ដែលបានកែប្រែ (HMR for Tests)។",

  "M22-06": "ការប្រៀបធៀប Jest និង Vitest ក្នុង Node.js Backends៖\n\n- **Jest**៖ ជាស្តង់ដារចាស់ទុំយូរអង្វែង ប៉ុន្តែជួបបញ្ហា Config ស្មុគស្មាញជាមួយ ES Modules និង TypeScript។\n- **Vitest**៖ ដំណើរការ Native ESM ភ្លាមៗ (Zero Config ESM) ប្រើ Memory តិចជាង និង Run Tests លឿនជាងច្រើន។\n- **Migration Simplicity**៖ អាចប្តូរពី Jest ទៅ Vitest បានយ៉ាងរហ័សដោយគ្រាន់តែប្តូរ imports និង CLI runner។",

  "M22-07": "ការធ្វើតេស្ត HTTP Requests ជាមួយ Supertest៖\n\n- **In-memory HTTP Server**៖ តេស្ត Express App លើ Node HTTP Interface ដោយមិនចាំបាច់បើក Network Port ពិតឡើយ។\n- **Fluent Chain API**៖ ប្រើ Syntax ច្បាស់លាស់ `.post('/api/v1/courses').send(payload).expect(201)`។\n- **Header & Cookie Testing**៖ គាំទ្រការផ្ញើ Authorization Headers និង Cookies យ៉ាងងាយស្រួល។",

  "M22-08": "ការធ្វើតេស្ត Controllers តាមរយៈ Supertest៖\n\n- **Controller Verification**៖ ផ្ទៀងផ្ទាត់ថា Controller ទទួល Parameters និង Query Strings បានត្រឹមត្រូវ។\n- **Response Envelope Validation**៖ ត្រួតពិនិត្យថា JSON Output មានទម្រង់ `{ status: 'success', data: { ... } }`។\n- **Error Code Propagation**៖ ធានាថាកំហុសត្រូវបានបម្លែងទៅជា Proper HTTP Error Codes។",

  "M22-09": "ការធ្វើតេស្ត Business Logic ក្នុង Service Layer៖\n\n- **Decoupled from HTTP**៖ តេស្ត Service Functions ដោយផ្ទាល់ដោយមិនចាំបាច់ប្រើ `req` និង `res` objects។\n- **Domain Logic Focus**៖ ផ្ទៀងផ្ទាត់ការគណនាស្មុគស្មាញ (ដូចជា Discount Calculation, Enrollment Validity)។\n- **Clean Edge Cases**៖ ធ្វើតេស្តករណី Edge Cases ផ្សេងៗបានយ៉ាងឆាប់រហ័ស និងហ្មត់ចត់។",

  "M22-10": "ការធ្វើតេស្ត CRUD Endpoints ពេញលេញ (Full CRUD Test Suite)៖\n\n- **Create (POST)**៖ បង្កើត Course ថ្មី និងរំពឹងទុក `201 Created` ជាមួយ `_id`។\n- **Read (GET)**៖ ទាញយកបញ្ជី Courses (200 OK) និង Single Course តាម ID។\n- **Update (PATCH)**៖ កែប្រែព័ត៌មាន Course និងផ្ទៀងផ្ទាត់ការផ្លាស់ប្តូរក្នុង Database។\n- **Delete (DELETE)**៖ លុប Course និងផ្ទៀងផ្ទាត់ថា Endpoint ឆ្លើយតប `204 No Content` ឬ `200 OK`។",

  "M22-11": "ការធ្វើតេស្ត Protected Endpoints ជាមួយ Authorization Headers៖\n\n- **Unauthenticated Test**៖ ផ្ញើ Request ដោយគ្មាន Token និងរំពឹងទុក `401 Unauthorized`។\n- **Forbidden Role Test**៖ ផ្ញើ Token របស់ Student ដើម្បីលុប Course និងរំពឹងទុក `403 Forbidden`។\n- **Authorized Test**៖ ផ្ញើ Admin/Instructor Token និងរំពឹងទុកជោគជ័យ `200 OK`។",

  "M22-12": "ការ Mock 3rd-party Services ជាមួយ `vi.fn()`៖\n\n- **Mock Expensive Calls**៖ ជំនួស Stripe Payments, AWS S3 Uploads, និង SendGrid Emails ដោយ Mocks។\n- **Fast & Isolated**៖ Tests ដំណើរការបានលឿន មិនបាត់បង់លុយលើ API Calls និងអាចរត់បានទោះគ្មាន Internet។\n- **Assertions on Spies**៖ ពិនិត្យថា Service ត្រូវបានហៅជាមួយ Arguments ត្រឹមត្រូវតាមរយៈ `expect(mockFn).toHaveBeenCalledWith(...)`។",

  "M22-13": "ការរៀបចំ Test Database ជាមួយ `mongodb-memory-server`៖\n\n- **In-memory MongoDB**៖ ដំណើរការ MongoDB Server ក្នុង RAM ទាំងស្រុង មានល្បឿនលឿនបំផុត។\n- **Isolated Data**៖ មិនប៉ះពាល់ដល់ Development Database ឬ Production Data ឡើយ។\n- **Tear Down & Cleanup**៖ លុបទិន្នន័យចោលទាំងអស់ក្រោយពេល Test Case នីមួយៗបញ្ចប់ (`afterEach`)។",

  // ── M23: Postman & Automated API Testing Workflow ─────────────────────────
  "M23-01": "ការស្វែងយល់ពីឧបករណ៍ Postman សម្រាប់ API Development៖\n\n- **Comprehensive API Platform**៖ ឧបករណ៍ឈានមុខគេសម្រាប់ការរចនា, សាកល្បង, និងចងក្រងឯកសារ API។\n- **Request Construction**៖ បង្កើត HTTP Requests ជាមួយ Headers, Query Params, និង Body Payloads យ៉ាងងាយស្រួល។\n- **Team Collaboration**៖ ចែករំលែក Workspaces និង Collections ជាមួយសមាជិកក្រុមការងារ។",

  "M23-02": "ការបង្កើត និងរៀបចំ API Collections ក្នុង Postman៖\n\n- **Organized Folders**៖ រៀបចំ Endpoints តាម Modules (Auth, Courses, Lessons, Enrollments)។\n- **Collection Runner**៖ ដំណើរការតេស្តរាល់ Requests ទាំងអស់ក្នុង Collection តាមលំដាប់លំដោយដោយស្វ័យប្រវត្ត។\n- **Documentation Generation**៖ បង្កើត Web API Documentation ដោយស្វ័យប្រវត្តិតាមរយៈ Collection Metadata។",

  "M23-03": "ការប្រើប្រាស់ Environment Variables ក្នុង Postman ({{base_url}})៖\n\n- **Dynamic Variables**៖ ប្រើ `{{base_url}}` ដើម្បីប្តូររវាង Local (`localhost:5000`), Staging, និង Production។\n- **Session Tokens**៖ រក្សាទុក `{{token}}` ជា Variable ដោយមិនបាច់ Copy-paste ដោយដៃរាល់ពេល Login ឡើយ។\n- **Data Isolation**៖ បែងចែក Environments ដាច់ដោយឡែកពីគ្នា ជៀសវាងការតេស្តប៉ះពាល់ Production Data។",

  "M23-04": "ការផ្ញើ និងត្រួតពិនិត្យ HTTP Requests ក្នុង Postman៖\n\n- **Request Config**៖ កំណត់ HTTP Verbs, Headers (`Content-Type`, `Authorization`), និង JSON Body។\n- **Response Inspection**៖ ពិនិត្យ HTTP Status Codes, Response Time (ms), Size, និង Pretty JSON Body។\n- **Visualizer & Cookies**៖ ពិនិត្យ Response Cookies និង Headers សម្រាប់ផ្ទៀងផ្ទាត់សុវត្ថិភាព។",

  "M23-05": "ការកំណត់ Authentication ស្វ័យប្រវត្តិតាមរយៈ Collection Variables៖\n\n- **Auto Token Capture**៖ សរសេរ Test Script ក្នុង Login Request ដើម្បីទាញយក Token៖ `pm.collectionVariables.set('token', pm.response.json().data.token)`។\n- **Inherit Auth**៖ កំណត់ Auth Type ជា 'Bearer Token' នៅកម្រិត Collection ជាមួយ Value `{{token}}`។\n- **Zero Manual Work**៖ គ្រប់ Endpoints ទាំងអស់នឹងប្រើប្រាស់ Token នោះដោយស្វ័យប្រវត្តិ។",

  "M23-06": "លំហូរនៃការធ្វើតេស្ត CRUD APIs ជាខ្សែសង្វាក់ក្នុង Postman៖\n\n- **1. Create (POST)**៖ បង្កើត Course និងចាប់យក ID ទុកក្នុង `{{courseId}}`។\n- **2. Read (GET)**៖ ហៅ `/api/v1/courses/{{courseId}}` ដើម្បីផ្ទៀងផ្ទាត់ទិន្នន័យ។\n- **3. Update (PATCH)**៖ កែប្រែព័ត៌មាន Course និងពិនិត្យមើល Changes។\n- **4. Delete (DELETE)**៖ លុប Course និងបញ្ជាក់ថា Status Code ឆ្លើយតប `200` ឬ `204`។",

  "M23-07": "ការធ្វើតេស្តកំហុសផ្សេងៗ (Negative Testing ក្នុង Postman)៖\n\n- **Missing Fields (400)**៖ ផ្ញើ Body ខ្វះ Required Data ដើម្បីផ្ទៀងផ្ទាត់ Zod Validation Error Envelope។\n- **Invalid ID (400)**៖ ផ្ញើ Invalid ObjectId (ឧ. `invalid-id-123`) និងពិនិត្យ CastError Response។\n- **Resource Not Found (404)**៖ ស្វែងរក Non-existent ID និងរំពឹងទុក `404 Not Found`។\n- **Unauthorized Access (401)**៖ ហៅ Endpoint ដោយគ្មាន Token និងរំពឹងទុក `401 Unauthorized`។",

  "M23-08": "ការសរសេរ Pre-request Scripts និង Test Scripts (Chai Assertions)៖\n\n- **Pre-request Scripts**៖ បង្កើត Dynamic Test Data (ដូចជា Random Email តាមរយៈ `Date.now()`) មុនពេល Request ចេញ។\n- **Test Scripts**៖ សរសេរ Assertion លើ Response តាមរយៈ Chai Syntax `pm.response.to.have.status(200)`។\n- **Body Assertion**៖ ផ្ទៀងផ្ទាត់ទិន្នន័យ JSON `pm.expect(pm.response.json().status).to.eql('success')`។",

  "M23-09": "ការប្រៀបធៀប និងការធ្វើសមាហរណកម្ម Swagger UI ជាមួយ Postman៖\n\n- **Import OpenAPI Spec**៖ Import Swagger JSON/YAML ចូលទៅក្នុង Postman ដោយផ្ទាល់ក្នុងរយៈពេល 2 វិនាទី។\n- **Instant Test Suite**៖ Postman បង្កើត Requests ទាំងអស់រួមទាំង Parameters និង Example Bodies ដោយស្វ័យប្រវត្ត។\n- **Complementary Roles**៖ Swagger UI ប្រើសម្រាប់ Public Interactive Docs ខណៈដែល Postman ប្រើសម្រាប់ Active Testing & Automation។",

  "M23-10": "ស្ថាបត្យកម្ម API Testing Workflow និង Newman CLI ក្នុង CI/CD៖\n\n- **Newman CLI**៖ Command-line Runner របស់ Postman សម្រាប់ដំណើរការ Collections ដោយគ្មាន GUI។\n- **CI/CD Integration**៖ បញ្ចូល Newman ទៅក្នុង GitHub Actions ដើម្បី Run Test Suite រាល់ពេលមាន Code Commit។\n- **Automated HTML Reports**៖ បង្កើត Test Reports និងបញ្ឈប់ Deployment ប្រសិនបើមាន Endpoint ណាមួយបរាជ័យ។",

  // ── M24: Real-time Applications with WebSockets & Socket.IO ───────────────
  "M24-01": "ស្វែងយល់ពីកម្មវិធី Real-time (Polling vs WebSockets)៖\n\n- **Short & Long Polling**៖ Client ត្រូវបើក HTTP Requests ថ្មីជាប្រចាំ បង្កើត Server Load និង Latency ខ្ពស់។\n- **WebSockets**៖ បង្កើត Full-Duplex Connection តែមួយ គ្មាន Header Overhead និងបញ្ជូនទិន្នន័យភ្លាមៗ (Instant Data)។\n- **Use Cases**៖ សមស្របសម្រាប់ Live Chat, Instant Notifications, Collaborative Editing, និង Real-time Dashboards។",

  "M24-02": "គោលការណ៍គ្រឹះនៃ WebSocket Protocol (RFC 6455)៖\n\n- **HTTP Handshake**៖ ចាប់ផ្តើមពី HTTP GET Request ជាមួយ Header `Upgrade: websocket`។\n- **Bi-directional TCP Stream**៖ បន្ទាប់ពី Upgrade ភាគីទាំងសងខាងអាចផ្ញើ Messages ទៅវិញទៅមកបានគ្រប់ពេល។\n- **Low Overhead**៖ គ្មាន HTTP Headers ធ្ងន់ៗក្នុងរាល់ Message ឡើយ ជួយសន្សំសំចៃ Bandwidth យ៉ាងច្រើន។",

  "M24-03": "ការស្វែងយល់ពីបណ្ណាល័យ Socket.IO៖\n\n- **More than Raw WebSockets**៖ Socket.IO ផ្តល់នូវ Features បន្ថែមលើសពី WebSocket ធម្មតា។\n- **Automatic Fallback**៖ ធ្លាក់មកប្រើ HTTP Long-polling ដោយស្វ័យប្រវត្ត ប្រសិនបើ WebSocket ត្រូវបាន Firewall បិទ។\n- **Built-in Reconnection**៖ ព្យាយាម Reconnect ដោយស្វ័យប្រវត្តិនៅពេលបាត់បង់ Network Connection។\n- **Rooms & Namespaces**៖ គាំទ្រការរៀបចំ Channels និង Private Rooms តាំងពីកំណើត។",

  "M24-04": "ការបង្កើត និងភ្ជាប់ Socket.IO ជាមួយ Express HTTP Server៖\n\n- **Attach to HTTP Server**៖ បង្កើត HTTP Server ដោយប្រើ `http.createServer(app)` រួចភ្ជាប់ជាមួយ Socket.IO `new Server(server)`។\n- **Shared Port**៖ ដំណើរការទាំង Express REST API និង Socket.IO Real-time Server លើ Port តែមួយ (ឧ. Port 5000)។\n- **CORS Setup**៖ កំណត់ Allowed Origins សម្រាប់ WebSockets ឱ្យត្រូវគ្នាជាមួយ Frontend Domain។",

  "M24-05": "ការភ្ជាប់ Client ទៅកាន់ Socket.IO Server៖\n\n- **Socket Client Library**៖ ប្រើប្រាស់ `import { io } from 'socket.io-client'` លើ Frontend។\n- **Connection Handshake**៖ ចាប់ផ្តើម Connection `const socket = io(SERVER_URL)`។\n- **Lifecycle Events**៖ ស្តាប់ Events សំខាន់ៗដូចជា `connect`, `disconnect`, និង `connect_error`។",

  "M24-06": "ការបញ្ជូន និងទទួល Events (Custom Events & Acknowledgments)៖\n\n- **Emit Events**៖ ប្រើ `socket.emit('event_name', data)` ដើម្បីបញ្ជូនសារ។\n- **Listen Events**៖ ប្រើ `socket.on('event_name', callback)` ដើម្បីទទួលទិន្នន័យមកដំណើរការ។\n- **Acknowledgments**៖ គាំទ្រ Call-and-Response Pattern ដើម្បីឱ្យ Client ដឹងច្បាស់ថា Server បានទទួល Message ដោយជោគជ័យ។",

  "M24-07": "ការគ្រប់គ្រង Channels តាមរយៈ Socket.IO Rooms៖\n\n- **Join Room**៖ ដាក់ Socket ចូលទៅក្នុង Room ជាក់លាក់ `socket.join('course:101')`។\n- **Broadcast to Room**៖ ផ្សាយសារទៅកាន់តែ Users ក្នុង Room នោះ `io.to('course:101').emit('new_message', data)`។\n- **Leave Room**៖ ដក Socket ចេញពី Room នៅពេល User ចាកចេញពី Course Page។",

  "M24-08": "ការបញ្ជូន Real-time Notifications ទៅកាន់អ្នកប្រើប្រាស់ជាក់លាក់៖\n\n- **User-specific Room**៖ ឱ្យ Socket ចូលទៅក្នុង Private Room តាម User ID `socket.join('user:' + userId)`។\n- **Targeted Notification**៖ បញ្ជូន Notification ទៅកាន់ User នោះដោយផ្ទាល់ `io.to('user:' + userId).emit('notification', alert)`។\n- **Multi-device Sync**៖ ប្រសិនបើ User បើកច្រើន Tabs ឬ Devices នោះរាល់ Devices ទាំងអស់ទទួលបាន Notification ស្របពេលគ្នា។",

  "M24-09": "ការតាមដានវត្តមាន Online Users (Presence Tracking)៖\n\n- **Track Connections**៖ កត់ត្រា User ID នៅពេលមាន `connection` event កើតឡើង។\n- **Handle Disconnect**៖ សម្អាត User ID ចេញនៅពេល Client ផ្តាច់ការតភ្ជាប់ (`disconnect` event)។\n- **Redis Sets Storage**៖ ប្រើ Redis Sets (`SADD`, `SREM`, `SMEMBERS`) ដើម្បីតាមដាន Online Users ឆ្លងកាត់ Scaled Servers។",

  "M24-10": "ស្ថាបត្យកម្មប្រព័ន្ធ Real-time Chat ពេញលេញ៖\n\n- **Real-time & Persistence**៖ ផ្ញើសារភ្លាមៗតាម Socket.IO និងកត់ត្រាទុកក្នុង MongoDB (`ChatMessage` collection)។\n- **Chat History API**៖ ផ្តល់ REST Endpoint សម្រាប់ទាញយកសារចាស់ៗ (Past Messages) ពេល User ទើបចូល Chat។\n- **Redis Adapter**៖ ប្រើ `@socket.io/redis-adapter` ដើម្បីធានាថា Real-time Messages អាចផ្សាយឆ្លងកាត់ Cluster Instances បានរលូន។",

  // ── M25: Performance, Optimization & Caching with Redis ───────────────────
  "M25-01": "ការស្វែងយល់ពីប្រសិទ្ធភាព និង Performance Metrics ក្នុង Node.js៖\n\n- **Single-Threaded Architecture**៖ Node.js ដំណើរការ JavaScript លើ Main Thread តែមួយ តាមរយៈ Event Loop។\n- **Key Metrics**៖ តាមដាន Response Time (p95, p99 Latency), Throughput (RPS), និង Memory/CPU Utilization។\n- **Non-blocking Rule**៖ ជៀសវាងការដំណើរការ CPU-heavy Tasks លើ Main Thread ដើម្បីកុំឱ្យ Server កកស្ទះ។",

  "M25-02": "ការទប់ស្កាត់ការស្ទះ Event Loop (Blocking the Event Loop)៖\n\n- **Common Blockers**៖ ការប្រើ Synchronous APIs (`fs.readFileSync`), ការ Parse JSON ធំៗ, និង ReDoS Vulnerable Regexes។\n- **ផលប៉ះពាល់ធ្ងន់ធ្ងរ**៖ នៅពេល Main Thread ជាប់រវល់ រាល់ Incoming Requests ទាំងអស់ត្រូវគាំងរង់ចាំ។\n- **ដំណោះស្រាយ**៖ ប្រើ Asynchronous Methods, បំបែក Large Computations, ឬប្រើ Worker Threads សម្រាប់ CPU-heavy Tasks។",

  "M25-03": "ការអនុវត្ត Async ល្អបំផុត (Promise.all vs Sequential Await)៖\n\n- **Sequential Execution (យឺត)**៖ ការសរសេរ `await` តគ្នាសម្រាប់ Queries ឯករាជ្យ ធ្វើឱ្យរយៈពេលរង់ចាំបូកបញ្ចូលគ្នា (T1 + T2)។\n- **Parallel Concurrency (លឿន)**៖ ប្រើ `await Promise.all([query1(), query2()])` ដើម្បីដំណើរការ Queries ស្របពេលគ្នា (ចំណាយពេលត្រឹម `max(T1, T2)`)។\n- **Error Resilience**៖ ប្រើ `Promise.allSettled()` នៅពេលមិនចង់ឱ្យបរាជ័យមួយប៉ះពាល់ដល់ Tasks ដទៃទៀត។",

  "M25-04": "ការបង្កើនល្បឿន MongoDB Queries ជាមួយ Lean និង Projections៖\n\n- **.lean() Optimization**៖ ត្រឡប់ Plain JavaScript Objects ជំនួសឱ្យ Heavy Mongoose Documents កាត់បន្ថយ Memory និង CPU រហូតដល់ 5-10 ដង។\n- **Field Projections**៖ ប្រើ `.select('title price thumbnail')` ដើម្បីទាញយកតែ Fields ចាំបាច់ កាត់បន្ថយទំហំ Network Transfer។\n- **Avoid N+1 Queries**៖ ប្រើ `.populate()` ដោយកំណត់ Projection ជាក់លាក់ ឬប្រើ `$lookup` ក្នុង Aggregations។",

  "M25-05": "ការបង្កើត និងគ្រប់គ្រង Database Indexes (Single & Compound)៖\n\n- **COLLSCAN vs IXSCAN**៖ បើគ្មាន Index MongoDB ត្រូវ Scan គ្រប់ Documents ទាំងអស់ (COLLSCAN)។ មាន Index ស្វែងរកតាម B-Tree (IXSCAN) O(log N)។\n- **Compound Indexes**៖ បង្កើត Index លើ Fields ច្រើនរួមគ្នា (ឧ. `{ category: 1, price: -1 }`) សម្រាប់ស្វែងរក និង Sort ក្នុងពេលតែមួយ។\n- **Query Analysis**៖ ប្រើ `.explain('executionStats')` ដើម្បីពិនិត្យមើល Execution Time និងចំនួន Documents Examined។",

  "M25-06": "យុទ្ធសាស្ត្រ Pagination (Offset vs Cursor-based Pagination)៖\n\n- **Offset-based (.skip & .limit)**៖ ងាយស្រួលអនុវត្ត ប៉ុន្តែយឺតលើទិន្នន័យធំៗព្រោះ Database ត្រូវ Scan ចោលរាល់ Previous Records។\n- **Cursor-based Pagination**៖ ប្រើប្រាស់ Last Record ID (`_id: { $gt: lastId }`) មានល្បឿនថេរ O(1) ជានិច្ច មិនថាក្នុងទំព័រទីប៉ុន្មានឡើយ។\n- **Industry Standard**៖ Cursor-based គឺជាជម្រើសស្តង់ដារសម្រាប់ Infinite Scroll និង Large Datasets។",

  "M25-07": "គោលការណ៍គ្រឹះនៃ Caching (Cache-Aside Pattern & TTL)៖\n\n- **Cache-Aside Pattern**៖ ពិនិត្យទិន្នន័យក្នុង Cache ជាមុន (Hit)។ បើគ្មាន ទាញយកពី Database (Miss) រួចរក្សាទុកក្នុង Cache សម្រាប់ Request បន្ទាប់។\n- **Time-To-Live (TTL)**៖ កំណត់អាយុកាលទិន្នន័យក្នុង Cache (ឧ. 1 ម៉ោង) ដើម្បីឱ្យ Cache ផុតកំណត់ដោយស្វ័យប្រវត្ត។\n- **Cache Invalidation**៖ លុប ឬកែប្រែ Cache Key ភ្លាមៗនៅពេលមានការ Update ឬ Delete ទិន្នន័យក្នុង Database។",

  "M25-08": "ការស្វែងយល់ពី In-Memory Data Store (Redis)៖\n\n- **In-Memory Speed**៖ ដំណើរការក្នុង RAM ទាំងស្រុង ផ្តល់ Read/Write Latency ក្រោម 1 Millisecond។\n- **Rich Data Structures**៖ គាំទ្រ Strings, Hashes (Objects), Lists, Sets, និង Sorted Sets។\n- **Use Cases**៖ ប្រើប្រាស់សម្រាប់ API Response Caching, User Sessions, Rate Limiting, និង Real-time Leaderboards។",

  "M25-09": "ការភ្ជាប់ និងប្រើប្រាស់ Redis ក្នុង Node.js (ioredis)៖\n\n- **ioredis Client**៖ បណ្ណាល័យ Node.js ដ៏រឹងមាំ គាំទ្រ Promises, Auto-reconnect, និង Cluster Mode។\n- **Basic Commands**៖ ប្រើ `await redis.get(key)`, `await redis.setex(key, ttl, value)`, និង `await redis.del(key)`។\n- **Connection Management**៖ គ្រប់គ្រង Redis Connection Pool និងស្តាប់ Events `connect`, `error`, និង `close`។",

  "M25-10": "ការបង្កើត Express Cache Middleware ជាមួយ Redis៖\n\n- **Dynamic Cache Keys**៖ បង្កើត Key ផ្អែកលើ Request URL (ឧ. `cache:courses:page=1:limit=10`)។\n- **Cache Hit Fast-path**៖ ឆ្លើយតប Cached JSON ត្រឡប់ទៅ Client ភ្លាមៗក្រោម 5ms ដោយមិនប៉ះពាល់ Database។\n- **Automatic Capture**៖ ចាប់យក JSON Response ដោយប្រើ Monkey-patching លើ `res.json` ដើម្បី Save ចូល Redis ពេល Cache Miss។",

  "M25-11": "ការបង្រួម HTTP Responses ជាមួយ compression (Gzip / Brotli)៖\n\n- **Response Compression**៖ បង្រួម JSON និង Text Responses មុនពេលបញ្ជូនតាមបណ្តាញ Internet។\n- **Bandwidth Reduction**៖ កាត់បន្ថយទំហំ Payload រហូតដល់ 70-80% ជួយសន្សំ Network Bandwidth យ៉ាងច្រើន។\n- **Express Integration**៖ ដំឡើងតាមរយៈ `app.use(compression())` ដំណើរការដោយស្វ័យប្រវត្តិលើគ្រប់ Responses។",

  "M25-12": "ការតាមដាន Performance តាមរយៈ APM (Prometheus & Grafana)៖\n\n- **Application Performance Monitoring (APM)**៖ តាមដានសុខភាព Server ក្នុង Production ជាប្រចាំ។\n- **Prometheus Metrics**៖ កត់ត្រា Metrics សំខាន់ៗដូចជា HTTP Requests Total, Duration Histogram, និង Active Connections។\n- **Grafana Dashboards**៖ បង្ហាញ Visual Charts និង Alerting System ជួយឱ្យដឹងពីបញ្ហាមុនពេលប៉ះពាល់ដល់ User។"
};
