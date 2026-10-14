/**
 * translations-m26-m29.mjs
 * Structured Khmer summaries with bullet points (- ) for Modules 26 through 29.
 * Follows AGENTS.md guidelines: keep technical terms in English, use natural Khmer for connective narrative.
 */

export const TRANSLATIONS_26_29 = {
  // ── M26: Background Jobs & Queues (BullMQ & Redis) ────────────────────────
  "M26-01": "ការស្វែងយល់ពី Background Jobs ក្នុង Web Backend៖\n\n- **Non-blocking Architecture**៖ ដកការងារធ្ងន់ៗចេញពី HTTP Thread ដើម្បីកុំឱ្យ Client រង់ចាំយូរ។\n- **Common Background Tasks**៖ ការផ្ញើ Emails, ការ Resize រូបភាព, ការបង្កើត PDF Invoices, និងការដកប្រាក់។\n- **Fast HTTP Response**៖ Server បញ្ជូន Job ទៅកាន់ Queue រួចឆ្លើយតប `202 Accepted` ឬ `200 OK` ក្រោម 50ms។",

  "M26-02": "មូលហេតុចម្បងដែលត្រូវប្រើប្រាស់ Background Processing៖\n\n- **Prevent HTTP Timeouts**៖ ការពារបញ្ហា Gateway Timeout (504) នៅពេលប្រតិបត្តិការត្រូវការពេលលើសពី 30 វិនាទី។\n- **Fault Tolerance & Reliability**៖ Jobs មិនបាត់បង់ឡើយទោះបី Server Restart ដោយសារវាត្រូវបានរក្សាទុកក្នុង Redis។\n- **Controlled Concurrency**៖ កំណត់ចំនួនការងារដែលត្រូវដំណើរការស្របគ្នាឱ្យសមស្របតាម CPU និង RAM របស់ Server។",

  "M26-03": "គោលការណ៍គ្រឹះនៃ Message Queue (FIFO, Priority, Dead Letter)៖\n\n- **FIFO Model**៖ ដំណើរការតាមលំដាប់លំដោយ First-In, First-Out។\n- **Priority Queues**៖ អនុញ្ញាតឱ្យ Jobs សំខាន់ៗ (ឧ. Password Reset Email) ដំណើរការមុន Jobs ទូទៅ (Daily Marketing)។\n- **Dead Letter Queue (DLQ)**៖ កន្លែងស្តុកទុក Jobs ដែលបរាជ័យច្រើនដង ដើម្បីឱ្យ Developer ចូលពិនិត្យ និង Debug។",

  "M26-04": "តួនាទីរបស់ Redis ក្នុងប្រព័ន្ធ Message Queues៖\n\n- **In-Memory Speed & Durability**៖ ផ្តល់ throughput ខ្ពស់រាប់ម៉ឺន Jobs ក្នុងមួយវិនាទី រួមជាមួយ AOF Persistence។\n- **Atomic Operations**៖ ប្រើ Atomic Lua Scripts ធានាថាគ្មាន Job ពីរត្រូវ Worker ចាប់យកដំណើរការជាន់គ្នាឡើយ។\n- **Pub/Sub & Streams**៖ ផ្តល់យន្តការ Notification ភ្លាមៗរវាង Job Producers និង Workers។",

  "M26-05": "ការស្វែងយល់ពីបណ្ណាល័យ BullMQ ទំនើប៖\n\n- **Queue Class**៖ ប្រើប្រាស់ដោយ Producers ដើម្បីបន្ថែម Jobs (`queue.add(jobName, data)`)។\n- **Worker Class**៖ Process ដាច់ដោយឡែកដែលទាញយក និងដំណើរការ Tasks (`new Worker(queueName, processor)`)។\n- **QueueEvents Class**៖ ស្តាប់ Events ដូចជា `completed`, `failed`, និង `progress` សម្រាប់តាមដានស្ថានភាព។",

  "M26-06": "ការបង្កើត Job Producer ដើម្បីបញ្ជូន Tasks ទៅកាន់ Queue៖\n\n- **Controller Integration**៖ បន្ថែម Job ចូលទៅក្នុង Queue ពេលមាន API Request (ឧ. សិស្សទិញ Course ជោគជ័យ)។\n- **Job Options**៖ កំណត់ `attempts` (ចំនួនដង retry), `backoff` (ការពន្យារពេល), និង `delay` (ពន្យារពេលចាប់ផ្តើម)។\n- **Minimal Payload**៖ បញ្ជូនតែ Identifiers (ដូចជា `courseId`, `userId`) ដើម្បីកាត់បន្ថយទំហំ Redis Memory។",

  "M26-07": "ការបង្កើត Background Worker ដើម្បីទាញយក និងដំណើរការ Jobs៖\n\n- **Dedicated Process**៖ ដំណើរការជា Background Thread ឬ Worker Process ដោយឡែកពី HTTP Server។\n- **Concurrency Control**៖ កំណត់ចំនួន Jobs ដំណើរការស្របគ្នា (ឧ. `concurrency: 5`)។\n- **Clean Error Handling**៖ បោះ Error ពេលបរាជ័យដើម្បីឱ្យ BullMQ ដឹង និងរៀបចំ Retry ឡើងវិញ។",

  "M26-08": "ការតាមដាន Job Progress និងការបញ្ជូនទិន្នន័យត្រឡប់មកវិញ៖\n\n- **Progress Updates**៖ ហៅ `await job.updateProgress(percentage)` ក្នុងអំឡុងពេលដំណើរការ Task។\n- **Return Value**៖ ត្រឡប់លទ្ធផលសម្រេចចេញពី Processor Function (ដូចជា Uploaded S3 URL)។\n- **Real-time Reporting**៖ បញ្ជូន Progress ទៅកាន់ Frontend តាមរយៈ WebSockets ដើម្បីបង្ហាញ Progress Bar។",

  "M26-09": "យុទ្ធសាស្ត្រ Retry ជាមួយ Exponential Backoff៖\n\n- **Network Resilience**៖ ដោះស្រាយបញ្ហា Transient Errors (ដូចជា Network Flakes ឬ 3rd-party Outages)។\n- **Exponential Backoff**៖ បង្កើនរយៈពេលរង់ចាំទ្វេដងរាល់ពេល Retry (2s, 4s, 8s, 16s...)។\n- **Prevent Server Flooding**៖ ជៀសវាងការ Spam Requests ទៅកាន់ External SMTP ឬ Payment APIs ដែលកំពុងជួបបញ្ហា។",

  "M26-10": "ការគ្រប់គ្រង និងត្រួតពិនិត្យ Failed Jobs (Bull Board)៖\n\n- **Error Stack Traces**៖ កត់ត្រាមូលហេតុបរាជ័យលម្អិតនៃគ្រប់ Failed Jobs ក្នុង Redis។\n- **Bull Board Dashboard**៖ UI Dashboard សម្រាប់ពិនិត្យ Queues, មើល Payloads, និង Retrying Jobs ដោយចុចប៊ូតុងមួយ។\n- **Manual Intervention**៖ ជួយឱ្យ Support Team ឬ Developers អាចដោះស្រាយបញ្ហាទិន្នន័យបានទាន់ពេលវេលា។",

  "M26-11": "ការកំណត់ Scheduled Cron Jobs ក្នុង BullMQ (Repeatable Jobs)៖\n\n- **Cron Syntax Support**៖ កំណត់កាលវិភាគតាមរយៈ Cron Expression (ឧ. `'0 0 * * *'` សម្រាប់ពាក់កណ្តាលអធ្រាត្រ)។\n- **Distributed Scheduling**៖ ដំណើរការតែម្តងគត់ក្នុង Cluster ទោះបីមាន Workers រត់ច្រើន instances ក៏ដោយ។\n- **Routine Maintenance**៖ ប្រើសម្រាប់ Daily Reports, Database Backups, និងការសម្អាត Unverified Users។",

  "M26-12": "ស្ថាបត្យកម្ម Email Queue System ពេញលេញក្នុង Production៖\n\n- **End-to-End Pipeline**៖ Express Controller -> BullMQ Producer -> Redis -> Background Worker -> Nodemailer។\n- **High Throughput**៖ អាចបញ្ជូន Email រាប់ម៉ឺនច្បាប់ក្នុងមួយថ្ងៃដោយមិនធ្វើឱ្យ Web App យឺតឡើយ។\n- **Guaranteed Delivery**៖ ធានាថា Email គ្រប់ច្បាប់ត្រូវបានបញ្ជូនជោគជ័យ ១០០%។",

  // ── M27: Enterprise Backend Architecture ──────────────────────────────────
  "M27-01": "រចនាសម្ព័ន្ធ Folder ស្តង់ដារសម្រាប់ Enterprise Backend (Clean Layered Architecture) ដែលជាការវិវឌ្ឍពី MVC Pattern សម្រាប់ REST APIs៖\n\n- **Evolution from MVC**៖ នៅក្នុង REST APIs Model-View-Controller ត្រូវបានពង្រីក៖ Models (`models/`) គ្រប់គ្រង Data Schema, Controllers (`controllers/`) សម្របសម្រួល HTTP, Services (`services/`) ផ្ទុក Pure Business Logic ចំណែក View គឺ Decouple ទៅ Frontend (React/Next.js) តាមរយៈ JSON Response Envelopes។\n- **Separation of Concerns**៖ បែងចែកទំនួលខុសត្រូវកូដជាស្រទាប់ៗច្បាស់លាស់ (Routes, Controllers, Services, Models)។\n- **High Maintainability & Testability**៖ ងាយស្រួលពង្រីក និងថែទាំ ហើយស្រទាប់នីមួយៗអាចធ្វើ Unit Test និង Integration Test បានដោយឯករាជ្យ។",

  "M27-02": "តួនាទី និងការរៀបចំ Routes Layer៖\n\n- **HTTP Endpoint Mapping**៖ ផ្គូផ្គង HTTP Path និង Verbs (`router.get`, `router.post`) ទៅកាន់ Handlers។\n- **Skinny Routes Principle**៖ Routes ត្រូវតែរក្សាភាពសាមញ្ញ ដោយគ្រាន់តែភ្ជាប់ Middleware និងហៅ Controller ប៉ុណ្ណោះ។\n- **No Business Logic**៖ ដាច់ខាតមិនត្រូវសរសេរ Database Queries ឬ Core Business Logic ក្នុង Routes ឡើយ។",

  "M27-03": "តួនាទី និងការរៀបចំ Controllers Layer៖\n\n- **HTTP Request Coordinator**៖ ទទួល Parameters, Query Strings, និង Request Body ពី Client។\n- **Delegate to Services**៖ ហៅ Service Layer ដើម្បីអនុវត្ត Core Business Logic។\n- **Send HTTP Responses**៖ រៀបចំ Status Codes (200, 201) និង Format JSON Envelope ត្រឡប់ទៅ Client។",

  "M27-04": "តួនាទី និងការរៀបចំ Services Layer (Core Business Logic)៖\n\n- **Application Heart**៖ ផ្ទុក Business Rules ទាំងអស់របស់ Course Platform (Enrollment, Pricing, Access)។\n- **Decoupled from Express**៖ មិនប្រើ `req` និង `res` objects ឡើយ ធ្វើឱ្យងាយស្រួល Unit Test និង Reuse។\n- **Integrate External APIs**៖ ទំនាក់ទំនងជាមួយ Payment Gateways, Cloud Storage, និង Database Models។",

  "M27-05": "តួនាទី និងការរៀបចំ Models Layer (Mongoose Schemas)៖\n\n- **Data Schema Definition**៖ កំណត់រចនាសម្ព័ន្ធ Fields, Types, Defaults, និង Validation Rules។\n- **Database Indexes**៖ បង្កើត Single Field និង Compound Indexes សម្រាប់បង្កើនល្បឿន Query។\n- **Mongoose Hooks & Methods**៖ ប្រើ Pre/Post Hooks (Password Hashing) និង Custom Instance Methods។",

  "M27-06": "តួនាទី និងការរៀបចំ Middleware Layer (Auth, Guard, Logging)៖\n\n- **Request Interception**៖ ដំណើរការមុនពេល Request ទៅដល់ Controller (Authentication, Role Guards, Logging)។\n- **Centralized Error Handling**៖ ចាប់រាល់ Errors ទាំងអស់ និងបំប្លែងទៅជា Standard JSON Error Envelope។\n- **Reusable Security**៖ អនុវត្ត Rate Limiting, Helmet Headers, និង CORS Policies។",

  "M27-07": "តួនាទី និងការរៀបចំ Validators Layer (Zod Schemas)៖\n\n- **Strict Schema Validation**៖ កំណត់ Type-safe Schemas សម្រាប់ Params, Query, និង Body ជាមួយ Zod។\n- **Early Rejection**៖ បដិសេធ Request មិនត្រឹមត្រូវតាំងពីជំហានដំបូងមុនពេលទៅដល់ Controller។\n- **Data Sanitization**៖ កាត់បន្ថយហានិភ័យនៃ Malformed Data និង Mass Assignment Attacks។",

  "M27-08": "ការរៀបចំ Shared Utilities និង Helper Functions (Utils Layer)៖\n\n- **Pure Helpers**៖ ផ្ទុក Reusable Helper Functions ដូចជា `AppError`, Date Formatters, និង Pagination Helpers។\n- **No Side Effects**៖ Utilities ត្រូវតែជា Pure Functions ដែលអាច Reuse បានទូទាំង Codebase។\n- **Consistency**៖ ជួយឱ្យការគណនា និង Formatting មានស្តង់ដារដូចគ្នានៅគ្រប់ទីកន្លែង។",

  "M27-09": "ការគ្រប់គ្រង Centralized Configuration និង Environment Validation៖\n\n- **Type-safe Config Object**៖ ចងក្រង `process.env` ទាំងអស់ចូលទៅក្នុង Config Object តែមួយ (`config/index.ts`)។\n- **Startup Validation**៖ ពិនិត្យមើលថារាល់ Required Environment Variables ទាំងអស់មានវត្តមានពេល Server Boot។\n- **Fail-Fast Principle**៖ បញ្ឈប់ Server ភ្លាមៗប្រសិនបើខ្វះ Database URI ឬ JWT Secret Key។",

  "M27-10": "ការរៀបចំ Database Connection Pool និង Lifecycle Hooks៖\n\n- **Connection Management**៖ កំណត់ Pool Size, Keep-Alive, និង Reconnection Logic ក្នុង Mongoose។\n- **Event Listeners**៖ ស្តាប់ Events `connected`, `error`, និង `disconnected` ដើម្បីកត់ត្រា Logs។\n- **Graceful Teardown**៖ បិទ Database Connection ឱ្យបានត្រឹមត្រូវនៅពេល Server ទទួល `SIGTERM`។",

  "M27-11": "ការរៀបចំ Jobs Directory សម្រាប់ Background Queues និង Workers៖\n\n- **Queue Definitions**៖ រៀបចំ Email Queues, Media Processing Queues, និង Report Queues ដោយឡែកពីគ្នា។\n- **Worker Processors**៖ សរសេរ Processor Functions ក្នុង Folder ជាក់លាក់ ងាយស្រួល Maintain។\n- **Standalone Worker Entry**៖ អនុញ្ញាតឱ្យ Worker អាច Run ជា Standalone Process ក្នុង Docker Container។",

  "M27-12": "ការរៀបចំ Tests Directory (Unit, Integration, E2E)៖\n\n- **Test Organization**៖ បែងចែកជា `unit/` (សម្រាប់ Services/Utils) និង `integration/` (សម្រាប់ API Endpoints)។\n- **Test Helpers & Fixtures**៖ រៀបចំ Mock Data, Database Seeders, និង Auth Token Generators។\n- **Clean Coverage**៖ ធានាថា Core Business Logic និង Endpoints សំខាន់ៗមាន Test Coverage ខ្ពស់។",

  "M27-13": "ការរៀបចំឯកសារគម្រោង (README, ARCHITECTURE, OpenAPI)៖\n\n- **Project README**៖ ណែនាំពីរបៀប Setup, Install Dependencies, និង Run Local Development។\n- **Architecture Documentation**៖ គំនូសបំព្រួញប្រព័ន្ធ (System Diagrams), Data Flows, និង Database ERD។\n- **OpenAPI Specification**៖ ឯកសារ API Specs ដែល Update ស្របគ្នាជាមួយ Codebase ជានិច្ច។",

  "M27-14": "ការគ្រប់គ្រងបរិស្ថាន Development, Staging, Production៖\n\n- **Environment Separation**៖ បែងចែកការកំណត់តាមរយៈ `NODE_ENV` (Logs, CORS, DB Connections)។\n- **Staging Parity**៖ រៀបចំ Staging Environment ឱ្យដូចគ្នានឹង Production ដើម្បីធ្វើ Pre-release Testing។\n- **Zero Leaks**៖ ធានាថា Test Data ឬ Dev Keys មិនអាចឆ្លងចូល Production បានឡើយ។",

  "M27-15": "ស្ថាបត្យកម្ម Scalable Backend កម្រិត Enterprise (Full Architecture Blueprint)៖\n\n- **Stateless API Layer**៖ Web Nodes អាច Scale Out ផ្តេក (Horizontal Scaling) បានដោយសេរី។\n- **Shared Infrastructure**៖ ប្រើប្រាស់ Redis Cluster សម្រាប់ Cache/Queues និង MongoDB Replica Set សម្រាប់ High Availability។\n- **Full Observability**៖ រួមបញ្ចូល Centralized Logging, APM Monitoring, និង Automated CI/CD Pipelines។",

  // ── M28: Production Deployment, Docker & DevOps ────────────────────────────
  "M28-01": "ភាពខុសគ្នារវាងបរិស្ថាន Development និង Production៖\n\n- **Development Focus**៖ ផ្តោតលើ Developer Experience, Fast Hot-reloading, Verbose Logs, និង Detailed Errors។\n- **Production Focus**៖ ផ្តោតលើ Security, High Availability, Silent Error Details, និង Zero-downtime Uptime។\n- **Performance Tuning**៖ បិទ Dev Middleware និងបើកការបង្រួម Response (Compression & Caching)។",

  "M28-02": "ការគ្រប់គ្រង Environment Variables ក្នុង Production៖\n\n- **No .env in Git or Images**៖ ហាមដាច់ខាតមិនឱ្យ Commit ឯកសារ `.env` ចូល Git ឬ Build ចូល Docker Image ឡើយ។\n- **Cloud Secret Providers**៖ ប្រើប្រាស់ Docker Secrets, AWS SSM Parameter Store, ឬ Vault សម្រាប់ចាក់បញ្ចូល Secrets។\n- **Runtime Injections**៖ ចាក់បញ្ចូល Environment Variables ផ្ទាល់នៅពេល Container ចាប់ផ្តើមដំណើរការ។",

  "M28-03": "ការកំណត់រចនាសម្ព័ន្ធ Production (Graceful Shutdown & Keep-Alive)៖\n\n- **Graceful Shutdown**៖ ស្តាប់ Signal `SIGTERM` ដើម្បីបញ្ចប់ In-flight Requests មុននឹងបិទ Connections។\n- **Keep-Alive Timeouts**៖ កំណត់ Keep-Alive Timeout ឱ្យធំជាង Reverse Proxy (Nginx) ដើម្បីការពារ 502 Bad Gateway។\n- **Healthcheck Endpoints**៖ បង្កើត `/health` endpoint សម្រាប់ឱ្យ Load Balancer ពិនិត្យស្ថានភាព Server។",

  "M28-04": "ការកត់ត្រា Logs ប្រកបដោយស្តង់ដារជាមួយ Winston ឬ Pino៖\n\n- **Structured JSON Logging**៖ កត់ត្រា Logs ជាទម្រង់ JSON រួមជាមួយ Timestamp, Level, និង Metadata។\n- **Log Levels**៖ បែងចែកតាមកម្រិត `error`, `warn`, `info`, និង `debug`។\n- **Centralized Log Aggregation**៖ បញ្ជូន Logs ទៅកាន់ Elasticsearch, Logstash, ឬ Datadog សម្រាប់ងាយស្រួល Search។",

  "M28-05": "គោលការណ៍ Process Management ក្នុង Node.js (Cluster & Crash Recovery)៖\n\n- **Single-Thread Limit**៖ Node.js ដំណើរការលើ CPU Core តែមួយ ប្រសិនបើមិនប្រើ Process Manager។\n- **Automatic Restart**៖ ប្រព័ន្ធត្រូវ Restart Server ភ្លាមៗនៅពេលមាន Uncaught Exception កើតឡើង។\n- **Cluster Mode**៖ បង្កើត Workers ស្មើនឹងចំនួន CPU Cores ដើម្បីទាញយកសមត្ថភាព Hardware ទាំងមូល។",

  "M28-06": "ការគ្រប់គ្រង Server Process ជាមួយ PM2 Cluster Mode៖\n\n- **Cluster Scaling**៖ ប្រើ `pm2 start server.js -i max` ដើម្បីដំណើរការលើគ្រប់ CPU Cores ទាំងអស់។\n- **Zero-downtime Reload**៖ ប្រើ `pm2 reload all` ដើម្បី Update កូដថ្មីដោយមិនឱ្យសេវាធ្លាក់ចុះ (Zero Downtime)។\n- **Process Monitoring**៖ ប្រើ `pm2 monit` ដើម្បីតាមដាន Memory និង CPU Usage ជាក់ស្តែង។",

  "M28-07": "គោលការណ៍គ្រឹះនៃ Containerization ជាមួយ Docker៖\n\n- **Container Isolation**៖ ខ្ចប់ App រួមជាមួយ Dependencies, Node Runtime, និង OS Libraries ទៅក្នុង Image តែមួយ។\n- **Consistency Everywhere**៖ ធានាថាកូដដំណើរការដូចគ្នាបេះបិទលើម៉ាស៊ីន Dev, Staging, និង Production។\n- **Lightweight Virtualization**៖ ចែករំលែក Host OS Kernel ដំណើរការលឿន និងស៊ីធនធានតិចជាង Traditional VMs។",

  "M28-08": "ការបង្កើត Multi-stage Dockerfile សម្រាប់ Node.js៖\n\n- **Builder Stage**៖ ដំឡើង Build Tools, Dev Dependencies, និង Compile TypeScript Code។\n- **Runner Stage**៖ ចម្លងយកតែ Compiled Output និង Production Dependencies (`--omit=dev`)។\n- **Minimal Image Size**៖ ប្រើ Alpine Linux Base Image កាត់បន្ថយទំហំពី 1GB មកនៅត្រឹមក្រោម 150MB។",

  "M28-09": "ការរៀបចំ Multi-Container Stack ជាមួយ Docker Compose៖\n\n- **Complete Infrastructure**៖ កំណត់ Node.js API, MongoDB, Redis, និង Nginx ក្នុងឯកសារ `docker-compose.yml` តែមួយ។\n- **Single Command Startup**៖ បើកដំណើរការប្រព័ន្ធទាំងមូលតាមរយៈ `docker compose up -d`។\n- **Private Bridge Network**៖ Containers ទាក់ទងគ្នាដោយផ្ទាល់តាម Service Names (ឧ. `mongodb:27017`) ដោយសុវត្ថិភាព។",

  "M28-10": "ការ Build និង Run Node.js Production Container៖\n\n- **Non-root User**៖ ដំណើរការ Container ក្រោម `USER node` ដើម្បីទប់ស្កាត់ការទម្លុះ Host System។\n- **Production Command**៖ ប្រើ `CMD [\"node\", \"src/server.js\"]` (មិនប្រើ `npm start` ឡើយ ដើម្បីទទួល Signal ផ្ទាល់)។\n- **Container Healthcheck**៖ កំណត់ Healthcheck Command ឱ្យ Docker ដឹងនៅពេល Service មានបញ្ហា។",

  "M28-11": "ការរៀបចំ MongoDB Container ជាមួយ Persistent Volumes៖\n\n- **Named Volume**៖ ភ្ជាប់ Volume `volumes: mongodb_data:/data/db` ដើម្បីការពារកុំឱ្យបាត់បង់ទិន្នន័យពេល Restart។\n- **Root Authentication**៖ កំណត់ `MONGO_INITDB_ROOT_USERNAME` និង `PASSWORD` យ៉ាងតឹងរ៉ឹង។\n- **Automated Backup Strategy**៖ រៀបចំ Cron Job សម្រាប់ Export Data ជាប្រចាំតាមរយៈ `mongodump`។",

  "M28-12": "ការរៀបចំ Redis Container សម្រាប់ Caching និង Queues៖\n\n- **Persistent Redis**៖ បើកដំណើរការ AOF (Append Only File) តាមរយៈ Flag `--appendonly yes`។\n- **Password Protection**៖ កំណត់ Password សុវត្ថិភាពតាមរយៈ `--requirepass <secret>`។\n- **Dedicated Network**៖ ដាក់ Redis ក្នុង Private Docker Network មិនបើក Port ទៅកាន់សាធារណៈឡើយ។",

  "M28-13": "ការស្វែងយល់ពីតួនាទីរបស់ Nginx ក្នុង Production Architecture៖\n\n- **Reverse Proxy**៖ ឈរនៅពីមុខ Node.js API ដើម្បីទទួល Client Connections និងបញ្ជូនបន្ត។\n- **SSL/TLS Termination**៖ ទទួលខុសត្រូវលើការ Decrypt HTTPS ដោយកាត់បន្ថយបន្ទុក CPU លើ Node.js។\n- **Static Caching & Gzip**៖ បម្រើ Static Files និងបង្រួម Response Headers ប្រកបដោយល្បឿនលឿន។",

  "M28-14": "ការកំណត់រចនាសម្ព័ន្ធ Nginx Reverse Proxy (nginx.conf)៖\n\n- **proxy_pass Directive**៖ បញ្ជូន Requests ពី Port 80/443 ទៅកាន់ Node.js API Container (`http://api:5000`)។\n- **Forward Real Client Headers**៖ បញ្ជូន Headers `X-Real-IP`, `X-Forwarded-For`, និង `X-Forwarded-Proto`។\n- **Security Hardening**៖ បិទ Header `server_tokens` និងកំណត់ Buffer Sizes សមស្រប។",

  "M28-15": "ការដំឡើង HTTPS / SSL ដោយឥតគិតថ្លៃជាមួយ Certbot & Let's Encrypt៖\n\n- **Free SSL Certificates**៖ ប្រើប្រាស់ Let's Encrypt សម្រាប់បង្កើត SSL Certificate ដោយឥតគិតថ្លៃ។\n- **Automated Certbot**៖ ប្រើ Certbot Nginx Plugin សម្រាប់ដំឡើង និង Config SSL ក្នុងរយៈពេល 1 នាទី។\n- **Auto-Renewal**៖ កំណត់ Systemd Timer ឬ Cron Job សម្រាប់ Renew Certificate ដោយស្វ័យប្រវត្ត រៀងរាល់ 60 ថ្ងៃ។",

  "M28-16": "ការរៀបចំ និងដាក់ឱ្យដំណើរការលើ Virtual Private Server (VPS)៖\n\n- **VPS Providers**៖ ជ្រើសរើស DigitalOcean, AWS EC2, Hetzner, ឬ Linode តាមតម្រូវការ។\n- **SSH Key Authentication**៖ ភ្ជាប់ទៅកាន់ Server តាមរយៈ SSH Keys ដោយបិទ Password Authentication។\n- **Firewall Setup (UFW)**៖ បើកតែ Ports ចាំបាច់ (22 សម្រាប់ SSH, 80 សម្រាប់ HTTP, 443 សម្រាប់ HTTPS)។",

  "M28-17": "ការរៀបចំ Ubuntu Server (Security Hardening & Swap Memory)៖\n\n- **Dedicated Sudo User**៖ បង្កើត User ថ្មី និងបិទ Root SSH Access (`PermitRootLogin no`)។\n- **Swap Memory Configuration**៖ បង្កើត Swap Memory 2GB ទៅ 4GB ដើម្បីការពារ Node.js ពី Out-Of-Memory (OOM) Crashes។\n- **Fail2ban Protection**៖ ដំឡើង Fail2ban ដើម្បី Block IPs ដែលព្យាយាម Brute-force SSH Login ដោយស្វ័យប្រវត្ត។",

  "M28-18": "គោលការណ៍ Continuous Integration & Continuous Deployment (CI/CD)៖\n\n- **Continuous Integration (CI)**៖ ដំណើរការ Tests និង Linting ដោយស្វ័យប្រវត្ត រាល់ពេលមាន Code Commit ឬ Pull Request។\n- **Continuous Deployment (CD)**៖ Deploy កូដទៅកាន់ Production Server ដោយស្វ័យប្រវត្ត នៅពេល Tests Pass ទាំងអស់។\n- **Faster Release Cycles**៖ បង្កើនល្បឿនបញ្ចេញ Features ថ្មីៗដោយកាត់បន្ថយកំហុសរបស់មនុស្ស (Human Errors)។",

  "M28-19": "ការបង្កើត GitHub Actions Workflow សម្រាប់ Test និង Auto-deploy៖\n\n- **Automated Test Job**៖ Run `npm test` និង Lint លើ Ubuntu Runner ក្នុង GitHub Actions។\n- **Docker Build & Push**៖ Build Production Image រួច Push ទៅកាន់ GitHub Container Registry (GHCR)។\n- **Zero-downtime SSH Deploy**៖ SSH ទៅកាន់ VPS ដើម្បី Pull Image ថ្មី និង Reload Containers ដោយរលូន។",

  "M28-20": "បញ្ជីត្រួតពិនិត្យចុងក្រោយមុនពេល Launch (Production Go-Live Checklist)៖\n\n- **Security Audit**៖ ផ្ទៀងផ្ទាត់ HTTPS, CORS Whitelist, Rate Limiting, និង Helmet Headers។\n- **Backup Automation**៖ ធានាថា Database Backups ដំណើរការ និងបានតេស្ត Restore ជោគជ័យ។\n- **Monitoring & Alerts**៖ រៀបចំ Error Tracking (Sentry) និង Server Health Monitoring ត្រៀមខ្លួនរួចរាល់។",

  // ── M29: Capstone Projects ────────────────────────────────────────────────
  "M29-01": "គម្រោងទី ១ ៖ Todo REST API (Core Fundamentals)៖\n\n- **គោលដៅ**៖ កសាងគ្រឹះដំបូងនៃ RESTful API ជាមួយ Express និង MongoDB (Mongoose)។\n- **មុខងារស្នូល**៖ Full CRUD Operations លើ Todos, Schema Validation, និង Proper HTTP Status Codes។\n- **ស្ថាបត្យកម្ម**៖ អនុវត្ត Clean Error Envelope និង Centralized Error Handling Middleware។",

  "M29-02": "គម្រោងទី ២ ៖ Student Management API ជាមួយ Swagger (Documentation & Querying)៖\n\n- **គោលដៅ**៖ បង្កើត API គ្រប់គ្រងទិន្នន័យសិស្ស និងវគ្គសិក្សា ជាមួយ Interactive Documentation។\n- **មុខងារស្នូល**៖ Advanced Query Filtering, Field Projections, Dynamic Sorting, និង Pagination។\n- **ស្ថាបត្យកម្ម**៖ ដំឡើង Swagger UI លើ `/api/docs` ដោយកត់ត្រា Schemas, Parameters, និង Responses ពេញលេញ។",

  "M29-03": "គម្រោងទី ៣ ៖ Authentication & Authorization API (Enterprise Security)៖\n\n- **គោលដៅ**៖ កសាងប្រព័ន្ធសុវត្ថិភាពពេញលេញកម្រិត Production សម្រាប់ Course Platform។\n- **មុខងារស្នូល**៖ User Registration, Password Hashing (bcrypt), JWT Access & Refresh Tokens, និង HttpOnly Cookies។\n- **ស្ថាបត្យកម្ម**៖ Role-Based Access Control (RBAC) ជាមួយ Roles `student`, `instructor`, និង `admin` រួមទាំង Password Reset Flow។",

  "M29-04": "គម្រោងទី ៤ ៖ Course Media & File Upload Service (Media & Caching)៖\n\n- **គោលដៅ**៖ គ្រប់គ្រងការ Upload រូបភាព និងឯកសារ Course Syllabus ជាមួយ High Performance Caching។\n- **មុខងារស្នូល**៖ Multer Multipart Parsing, Image Validation, និង Cloudflare R2 / AWS S3 Integration។\n- **ស្ថាបត្យកម្ម**៖ Redis Response Caching Middleware សម្រាប់ Cache Course Catalog ឆ្លើយតបក្រោម 5ms។",

  "M29-05": "គម្រោងទី ៥ ៖ Course Platform Enrollment & Payments ជាមួយ Transactions (Complex Backend)៖\n\n- **គោលដៅ**៖ កសាងប្រព័ន្ធចុះឈ្មោះរៀន និងកាត់ប្រាក់ប្រកបដោយភាពត្រឹមត្រូវនៃទិន្នន័យ ១០០%។\n- **មុខងារស្នូល**៖ MongoDB Multi-document ACID Transactions សម្រាប់ដំណើរការការទិញ Course ដោយគ្មានកំហុសទិន្នន័យ។\n- **ស្ថាបត្យកម្ម**៖ Stripe Webhooks Integration និងការបញ្ជូន Email Invoices តាមរយៈ BullMQ Background Queue។",

  "M29-06": "គម្រោងទី ៦ ៖ Final Production Course Platform REST API Capstone (Production Deployment)៖\n\n- **គោលដៅ**៖ គម្រោងបញ្ចប់ការសិក្សាដ៏ធំបំផុត ដែលរួមបញ្ចូលគ្នានូវគ្រប់ជំនាញទាំងអស់ដែលបានរៀនក្នុងវគ្គសិក្សា។\n- **មុខងារស្នូល**៖ Complete Course Platform API Domain ជាមួយ Security Hardening, Automated Tests, និង Real-time Notifications។\n- **ស្ថាបត្យកម្ម**៖ Multi-stage Docker Containers, Docker Compose, Nginx Reverse Proxy, Redis Caching, និង CI/CD GitHub Actions Workflow ដាក់ឱ្យដំណើរការលើ VPS ពិតប្រាកដ។"
};
