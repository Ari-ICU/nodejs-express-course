export const MODULES_01_05 = {
  "M01": [
    {
      "id": "M01-01",
      "number": "01",
      "title": "What is Backend Development?",
      "khmerTitle": "អ្វីជាការអភិវឌ្ឍ Backend?",
      "type": "concept",
      "codeLanguage": "javascript",
      "summary": "ការអភិវឌ្ឍ Backend ផ្តល់ថាមពលដល់ម៉ាស៊ីន Server-side ដែលលាក់នៅពីក្រោយកម្មវិធីទំនើប។ វាសម្របសម្រួល Business Logic ទំនាក់ទំនងជាមួយ Database គ្រប់គ្រង Authentication និង Session ដំណើរការការរួមបញ្ចូល API ខាងក្រៅ និងធានាភាពអាចរកបានខ្ពស់ សុវត្ថិភាពទិន្នន័យ និងភាពយឺតយ៉ាវទាបសម្រាប់ InterfaceClient ។",
      "codeSnippet": "// A minimal HTTP response conceptual model\n// Client sends Request -> Server executes business logic -> Server returns Response\nconst response = {\n  status: 200,\n  headers: { \"Content-Type\": \"application/json\" },\n  data: { user: \"Sokha\", role: \"Developer\", access: true }\n};"
    },
    {
      "id": "M01-02",
      "number": "02",
      "title": "Frontend vs Backend",
      "khmerTitle": "ភាពខុសគ្នារវាង Frontend និង Backend",
      "type": "concept",
      "codeLanguage": "javascript",
      "summary": "**Frontend** — ប្រតិបត្តិក្នុង browser របស់អ្នកប្រើ៖\n- បង្កើតជាមួយ HTML, CSS, JavaScript (React, Next.js, Vue)\n- បង្ហាញ UI (User Interface) ចលនា និង Form Inputs\n- គ្រប់គ្រងស្ថានភាពផ្នែកខាង Client និង Browser Cookies\n- ផ្ញើ Request ទៅ Backend តាមរយៈ HTTP/REST APIs\n- មាន **សូន្យភាពឯកជន** — Source Code ទាំងអស់អាចអានបានដោយអ្នកប្រើប្រាស់\n\n**Backend** — ដំណើរការលើ Server ឯកជនដែលមានសុវត្ថិភាព៖\n- បង្កើតឡើងដោយ Node.js, Express, Database (MongoDB, PostgreSQL)\n- អនុវត្ត Authentication Authorization និង Validation ទិន្នន័យ\n- ប្រតិបត្តិការអាន/សរសេរ Database ជាមួយនឹងប្រតិបត្តិការ ACID\n- ការពារអាថ៌កំបាំង API ឯកជន និងសោទូទាត់ដោយសុវត្ថិភាព\n- បញ្ជូន JSON Response ដែលមាន Sanitization ត្រឡប់ទៅ Client វិញ។",
      "codeSnippet": "// FRONTEND (Browser):\n// Fetches data, manages UI state, triggers visual renders\nconst res = await fetch(\"/api/v1/products\");\nconst products = await res.json();\n\n// BACKEND (Node.js Server):\n// Validates token, queries MongoDB, hides secret API keys\napp.get(\"/api/v1/products\", verifyToken, async (req, res) => {\n  const products = await Product.find({ published: true });\n  res.json({ success: true, data: products });\n});"
    },
    {
      "id": "M01-03",
      "number": "03",
      "title": "Client-Server Architecture",
      "khmerTitle": "ស្ថាបត្យកម្ម Client-Server",
      "type": "architecture",
      "codeLanguage": "javascript",
      "summary": "**ស្ថាបត្យកម្ម Client-Server** គឺជាគំរូកុំព្យូទ័រចែកចាយជាមូលដ្ឋានដែលផ្តល់ថាមពលដល់អ៊ីនធឺណិតទំនើប៖\n- **Client (ឧបករណ៍ជួរមុខ)**៖ Browser តាមអ៊ីនធឺណិត កម្មវិធីទូរស័ព្ទ និងឧបករណ៍ IoT ផ្តួចផ្តើម Request លើពិធីការបណ្តាញ (HTTP/HTTPS, TCP/IP) ។\n- ** Servers (Backend Hosts)**៖ Centralized Node.js + Express servers ផ្ទៀងផ្ទាត់ Request ពង្រឹង Business Logic និងការគណនា Response ។\n- ** Database & Cache **៖ ស្រទាប់តស៊ូដែលមានប្រសិទ្ធភាពខ្ពស់ (MongoDB, PostgreSQL) និង Cache ក្នុងអង្គចងចាំ (Redis) ផ្គត់ផ្គង់ទិន្នន័យតាមពេលវេលាជាក់ស្តែង។\n- **ទំនាក់ទំនង Stateless**៖ នៅក្នុង REST APIs Request នីមួយៗមានព័ត៌មានបញ្ជាក់ Authentication ពេញលេញ (JWT Bearer tokens) ដើម្បីដំណើរការដោយឯករាជ្យ។",
      "codeSnippet": "/* Client-Server Communication Flow:\n   [Mobile App / React App] \n            │ (HTTP Request / HTTPS)\n            ▼\n   [Reverse Proxy (Nginx)]\n            │\n            ▼\n   [Node.js Server (Express)]\n            │\n      ┌─────┴─────┐\n      ▼           ▼\n   [MongoDB]   [Redis Cache]\n*/"
    },
    {
      "id": "M01-04",
      "number": "04",
      "title": "What is Node.js?",
      "khmerTitle": "អ្វីទៅជា Node.js?",
      "type": "concept",
      "codeLanguage": "javascript",
      "summary": "**Node.js** គឺជាប្រភពបើកចំហរ បរិយាកាសដំណើរការ JavaScript ឆ្លងវេទិកា ដែលប្រតិបត្តិកូដនៅខាងក្រៅ Browser ៖\n- ** Asynchronous & Event-Driven **៖ APIs មិនទប់ស្កាត់។ Server មិនដែលរង់ចាំ API ដើម្បីបញ្ជូនទិន្នន័យមកវិញទេ មុនពេលដោះស្រាយកិច្ចការបន្ទាប់។\n- ** ដំណើរការដោយ Google V8 Engine**៖ ចងក្រង JavaScript ដោយផ្ទាល់ទៅក្នុងកូដម៉ាស៊ីន ដោយផ្តល់នូវល្បឿនប្រតិបត្តិលឿនបំផុត។\n- **Single-Threaded with Event Loop**: ដោះស្រាយការភ្ជាប់ដំណាលគ្នារាប់ពាន់នៃការតភ្ជាប់ក្នុងពេលដំណាលគ្នាដោយមិនមានការផ្លាស់ប្តូរបរិបទ Threads ។\n- **គ្មានការបណ្ដោះអាសន្ន (ការស្ទ្រីមទិន្នន័យ)**៖ ដំណើរការកម្មវិធី និងទិន្នន័យលទ្ធផលនៅក្នុងស្ទ្រីមជាបន្តបន្ទាប់ ដោយមិនមានការពន្យាពេលបណ្តោះអាសន្ន។\n- **ប្រព័ន្ធអេកូ NPM រស់រវើក**៖ កម្មវិធីគ្រប់គ្រងកញ្ចប់ Node ផ្តល់នូវ Collections ផ្តុំដ៏ធំបំផុតនៃបណ្ណាល័យប្រភពបើកចំហក្នុងការអភិវឌ្ឍកម្មវិធី។",
      "codeSnippet": "// Inspect your Node environment\nconsole.log(\"Node version:\", process.version);\nconsole.log(\"Platform:\", process.platform);\nconsole.log(\"Architecture:\", process.arch);\nconsole.log(\"Memory Usage:\", process.memoryUsage().heapUsed / 1024 / 1024, \"MB\");"
    },
    {
      "id": "M01-05",
      "number": "05",
      "title": "Why Node.js?",
      "khmerTitle": "ហេតុអ្វីត្រូវជ្រើសរើស Node.js?",
      "type": "concept",
      "codeLanguage": "javascript",
      "summary": "** ហេតុអ្វីបានជា Node.js គឺជាបច្ចេកវិទ្យា Go-To របស់សហគ្រាស៖**\n- **Unified JavaScript Stack**៖ ប្រើភាសាសរសេរកម្មវិធីមួយ (JS/TS) ឆ្លងកាត់សំណួរ Frontend, Backend, និង Database — បើកប្រភេទចែករំលែក SchemaValidation និងក្រុមបង្រួបបង្រួម។\n- ** ភាពស៊ីសង្វាក់គ្នាខ្ពស់ជាមួយនឹងការចំណាយទាប **៖ ស្ថាបត្យកម្មដែលមិនរារាំងអសមកាលដំណើរការការតភ្ជាប់ស្របគ្នារាប់ម៉ឺនជាមួយ RAM និងស៊ីភីយូតិចតួចបំផុត។\n- **Enterprise-Proven at Global Scale**: Mission-critical infrastructure for Netflix, PayPal, LinkedIn, Uber, NASA, និង Walmart ។\n- **JSON-Native Data Processing**៖ បំពង់បង្ហូរទិន្នន័យគ្មានថ្នេរពីការស្នើសុំរបស់ Client តាមរយៈផ្លូវ Express ទៅកាន់ឯកសារ MongoDB ដោយមិនមានការបំប្លែងទិន្នន័យដែលមានតម្លៃថ្លៃ។\n- **ពេលវេលាទៅទីផ្សាររហ័ស**៖ កញ្ចប់ដែលអាចប្រើឡើងវិញបានជាង 2+ លាននៅលើ NPM បង្កើនល្បឿនយ៉ាងខ្លាំងនៃវដ្តនៃការអភិវឌ្ឍផលិតផល។",
      "codeSnippet": "// Example: Sharing validation schemas across Frontend and Backend\nexport const validateUsername = (name) => {\n  return typeof name === \"string\" && name.trim().length >= 3 && name.trim().length <= 30;\n};"
    },
    {
      "id": "M01-06",
      "number": "06",
      "title": "Node.js Runtime",
      "khmerTitle": "បរិស្ថានប្រតិបត្តិការ Node.js Runtime",
      "type": "architecture",
      "codeLanguage": "javascript",
      "summary": "ពេលវេលាដំណើរការ Node.js មានម៉ាស៊ីន V8 របស់ Google (ចងក្រង JS ទៅជាកូដម៉ាស៊ីន) libuv (បណ្ណាល័យ C ដែលផ្តល់ Event Loop និងបណ្តុំ Threads) ការចង C++ ស្នូល និងម៉ូឌុល JavaScript API ដែលមានស្រាប់ (fs, http, crypto, path) ។",
      "codeSnippet": "/* Node.js Runtime Composition:\n┌───────────────────────────────────────────┐\n│              JavaScript Code              │\n├───────────────────────────────────────────┤\n│        Node.js Core API (fs, http)        │\n├───────────────────────────────────────────┤\n│         C++ Node.js Bindings              │\n├─────────────────────┬─────────────────────┤\n│   V8 Engine (JIT)   │    libuv (Event     │\n│   JavaScript Engine │    Loop & Threads)  │\n└─────────────────────┴─────────────────────┘\n*/"
    },
    {
      "id": "M01-07",
      "number": "07",
      "title": "Node.js Architecture",
      "khmerTitle": "ស្ថាបត្យកម្មប្រព័ន្ធ Node.js",
      "type": "architecture",
      "codeLanguage": "javascript",
      "summary": "Node.js ប្រើស្ថាបត្យកម្ម Single-Threaded Event Loop ។ ជាជាងការឧទ្ទិស Threads ប្រព័ន្ធប្រតិបត្តិការក្នុងមួយ Request (ដូចជា Apache ឬគំរូ Java/PHP ប្រពៃណី) Node ដំណើរការការតភ្ជាប់ចូលរាប់ពាន់នៅលើ Threads មេតែមួយដោយផ្ទេរភារកិច្ចអសមកាលទៅកម្មករ libuv ។",
      "codeSnippet": "/* Single Threaded Event Loop vs Multi-Threaded:\n   Multi-Threaded (Apache):  [Req 1 -> Thread 1]  [Req 2 -> Thread 2] (~2MB RAM/thread)\n   Single-Thread (Node.js): [Req 1, 2, 3... -> Single Event Loop -> Non-blocking I/O]\n*/"
    },
    {
      "id": "M01-08",
      "number": "08",
      "title": "Event-driven Architecture",
      "khmerTitle": "ស្ថាបត្យកម្មជំរុញដោយព្រឹត្តិការណ៍ (Event-driven)",
      "type": "concept",
      "codeLanguage": "javascript",
      "summary": "នៅក្នុង Event-Driven Architecture Server ស្តាប់ជានិច្ចសម្រាប់ព្រឹត្តិការណ៍ (Request HTTP ចូល Socket Connection ការបំពេញ Timers Response នៃ Database) និង Trigger ឧបករណ៍ដោះស្រាយ Callbacks មកវិញដែលពាក់ព័ន្ធនៅពេលដែលព្រឹត្តិការណ៍កើតឡើង។",
      "codeSnippet": "import { EventEmitter } from \"node:events\";\n\nconst orderEmitter = new EventEmitter();\n\n// Listener 1: Send confirmation email\norderEmitter.on(\"order:placed\", (order) => {\n  console.log(`Sending invoice email for order #${order.id}`);\n});\n\n// Listener 2: Update warehouse inventory\norderEmitter.on(\"order:placed\", (order) => {\n  console.log(`Deducting item ${order.item} from inventory`);\n});\n\n// Trigger event\norderEmitter.emit(\"order:placed\", { id: 9812, item: \"MacBook Pro\" });"
    },
    {
      "id": "M01-09",
      "number": "09",
      "title": "Non-blocking I/O",
      "khmerTitle": "ប្រតិបត្តិការមិនរាំងស្ទះ (Non-blocking I/O)",
      "type": "lab",
      "codeLanguage": "javascript",
      "summary": "ការមិនទប់ស្កាត់ I/O អនុញ្ញាតឱ្យ Node.js ចាប់ផ្តើមប្រតិបត្តិការមួយ (អានឯកសារឌីស សួរ Database ហៅច្រកផ្លូវបង់ប្រាក់ខាងក្រៅ) ហើយបន្តភ្លាមៗដើម្បីដោះស្រាយ Request ផ្សេងទៀតដោយមិនរង់ចាំឱ្យប្រតិបត្តិការបញ្ចប់។",
      "codeSnippet": "import fs from \"node:fs/promises\";\n\nconsole.log(\"1. Starting non-blocking read...\");\n\n// Initiates I/O and continues immediately\nfs.readFile(\"package.json\", \"utf-8\").then((data) => {\n  console.log(\"3. File read complete! Size:\", data.length, \"characters\");\n});\n\nconsole.log(\"2. Main thread continues serving other clients!\");"
    },
    {
      "id": "M01-10",
      "number": "10",
      "title": "Node.js Use Cases",
      "khmerTitle": "ករណីប្រើប្រាស់សមស្របសម្រាប់ Node.js",
      "type": "concept",
      "codeLanguage": "javascript",
      "summary": "Node.js គឺល្អសម្រាប់កម្មវិធី I/O-heavy, data-intensive, និង real-time applications ដូចជា REST APIs, GraphQL services, chat applications, streaming servers, microservices និង IoT dashboards ។ វាមិនសូវសមរម្យសម្រាប់ការគណនាស៊ីភីយូធ្ងន់ៗ ដូចជាការអ៊ិនកូដវីដេអូ ឬការហ្វឹកហ្វឺនគំរូការរៀនម៉ាស៊ីននៅលើខ្សែមេ។",
      "codeSnippet": "/* Ideal Node.js Workloads:\n   ✅ REST & GraphQL APIs (High concurrency, DB read/writes)\n   ✅ Real-time Chat & WebSockets (Socket.IO, notifications)\n   ✅ Streaming services (Audio/Video file pipelines)\n   ✅ Microservices & API Gateways (Fast HTTP proxying)\n   ❌ Heavy 3D Graphics Rendering (Blocks single thread)\n*/"
    },
    {
      "id": "M01-11",
      "number": "11",
      "title": "Installing Node.js",
      "khmerTitle": "ការដំឡើង Node.js ជាមួយ NVM",
      "type": "lab",
      "codeLanguage": "bash",
      "summary": "ការដំឡើង Node.js ដោយប្រើកម្មវិធីគ្រប់គ្រងកំណែ Node (NVM) អនុញ្ញាតឱ្យអ្នកអភិវឌ្ឍន៍ផ្លាស់ប្តូរយ៉ាងរលូនរវាងកំណែ Node ច្រើន (LTS ទល់នឹងបច្ចុប្បន្ន) ឆ្លងកាត់គម្រោង Client និង Server ផ្សេងៗគ្នា ដោយគ្មានបញ្ហា Authorization ឬជម្លោះប្រព័ន្ធ។",
      "codeSnippet": "# Install Node Version Manager (nvm)\ncurl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash\n\n# Install the latest Long-Term Support (LTS) version\nnvm install --lts\nnvm use --lts\n\n# Verify installation\nnode -v\nnpm -v"
    },
    {
      "id": "M01-12",
      "number": "12",
      "title": "Node.js Project Structure",
      "khmerTitle": "រចនាសម្ព័ន្ធ Folder គម្រោង Node.js",
      "type": "architecture",
      "codeLanguage": "bash",
      "summary": "គម្រោង Node.js ស្អាតចាប់ផ្តើមជាមួយនឹងប្លង់ដែលអាចទាយទុកជាមុនបាន៖ រក្សាឯកសារប្រភពនៅខាងក្នុង `src/` ញែកចំណុចចូល (`index.js`) តាមដានភាពអាស្រ័យនៅក្នុង `package.json` និងឯកសារជំហានរៀបចំក្នុង `README.md` ។",
      "codeSnippet": "my-backend-app/\n├── src/\n│   ├── config/       # Environment variables & DB connectors\n│   ├── controllers/  # HTTP request/response handlers\n│   ├── middleware/   # Auth, logging, rate limiting\n│   ├── models/       # Database schemas (Mongoose)\n│   ├── routes/       # Express route definitions\n│   ├── services/     # Pure business logic & database queries\n│   └── app.js        # Express app initialization\n├── tests/            # Automated Vitest / Supertest files\n├── .env.example      # Sample environment configuration\n├── package.json      # Dependencies and scripts\n└── server.js         # HTTP server entrypoint"
    }
  ],
  "M02": [
    {
      "id": "M02-01",
      "number": "01",
      "title": "Running JavaScript with Node.js",
      "khmerTitle": "ការដំណើរការ JavaScript ជាមួយ Node.js",
      "type": "lab",
      "codeLanguage": "bash",
      "summary": "ការដំណើរការ JavaScript តាមរយៈ \\`node\\` CLI ប្រតិបត្តិឯកសារដោយផ្ទាល់ប្រឆាំងនឹងម៉ាស៊ីន V8 និង APIs ប្រព័ន្ធប្រតិបត្តិការ ដោយផ្តល់នូវការចូលដំណើរការពេញលេញទៅកាន់ប្រព័ន្ធឯកសារ បណ្តាញ និងបរិស្ថានប្រព័ន្ធដោយគ្មានBrowserតាមអ៊ីនធឺណិត។",
      "codeSnippet": "# Run a JavaScript script directly\nnode app.js\n\n# Run with native file-watcher auto-reload (Node.js 18.11+)\nnode --watch app.js\n\n# Evaluate inline JavaScript expressions\nnode -e \"console.log('Today is:', new Date().toISOString())\""
    },
    {
      "id": "M02-02",
      "number": "02",
      "title": "Node.js REPL",
      "khmerTitle": "ការប្រើប្រាស់ Node.js REPL",
      "type": "lab",
      "codeLanguage": "bash",
      "summary": "Read-Eval-Print Loop (REPL) ផ្តល់នូវបរិយាកាសបន្ទាត់ពាក្យបញ្ជាអន្តរកម្មសម្រាប់ការធ្វើតេស្តយ៉ាងរហ័សនូវការបញ្ចេញមតិ JavaScript រុករក Node.js core APIs ក្បួនដោះស្រាយបំបាត់កំហុស និងគំនិតបង្កើតគំរូដោយមិនចាំបាច់បង្កើតឯកសារបណ្តោះអាសន្ន។",
      "codeSnippet": "# Launch the interactive REPL\n$ node\n> 10 + 25\n35\n> _ * 2\n70\n> crypto.randomUUID()\n'd5727670-6548-4df2-8cb6-02a8ebcfcdae'\n> .exit"
    },
    {
      "id": "M02-03",
      "number": "03",
      "title": "package.json",
      "khmerTitle": "ឯកសារកំណត់រចនាសម្ព័ន្ធ package.json",
      "type": "concept",
      "codeLanguage": "json",
      "summary": "ឯកសារ \\`package.json\\` គឺជាការបង្ហាញកណ្តាលនៃរាល់គម្រោង Node.js ។ វាកំណត់ទិន្នន័យមេតាគម្រោង ភាពអាស្រ័យ ស្គ្រីប ម៉ាស៊ីន ឃ្លាំង URL និងបញ្ជាក់ថាតើគម្រោងនេះប្រើម៉ូឌុល ES (\\`\"type\": \"module\"\\`) ឬ CommonJS ។",
      "codeSnippet": "{\n  \"name\": \"ecommerce-api\",\n  \"version\": \"1.0.0\",\n  \"type\": \"module\",\n  \"main\": \"src/server.js\",\n  \"scripts\": {\n    \"dev\": \"node --watch src/server.js\",\n    \"start\": \"NODE_ENV=production node src/server.js\",\n    \"test\": \"vitest run\"\n  },\n  \"engines\": {\n    \"node\": \">=20.0.0\"\n  }\n}"
    },
    {
      "id": "M02-04",
      "number": "04",
      "title": "npm",
      "khmerTitle": "ការគ្រប់គ្រងកញ្ចប់កូដជាមួយ npm",
      "type": "concept",
      "codeLanguage": "bash",
      "summary": "កម្មវិធីគ្រប់គ្រងកញ្ចប់ថ្នាំង (npm) គឺជាបញ្ជីឈ្មោះកញ្ចប់លំនាំដើម និងកម្មវិធីគ្រប់គ្រងកញ្ចប់បន្ទាត់ពាក្យបញ្ជាសម្រាប់ Node.js ។ វាសម្របសម្រួលការដំឡើង ការចែករំលែក ការធ្វើបច្ចុប្បន្នភាព និងសវនកម្មបណ្ណាល័យប្រភពបើកចំហរបស់ភាគីទីបីនៅទូទាំងកម្មវិធី។",
      "codeSnippet": "# Initialize a new package.json with defaults\nnpm init -y\n\n# Search registry packages\nnpm search express\n\n# Audit project dependencies for security advisories\nnpm audit\nnpm audit fix"
    },
    {
      "id": "M02-05",
      "number": "05",
      "title": "npm Scripts",
      "khmerTitle": "ការសរសេរ npm Scripts សម្រាប់ស្វ័យប្រវត្តិកម្ម",
      "type": "lab",
      "codeLanguage": "json",
      "summary": "ស្គ្រីប npm ផ្តល់នូវពាក្យបញ្ជាឈ្មោះក្លែងក្លាយផ្ទាល់ខ្លួនដើម្បីធ្វើកិច្ចការដដែលៗដោយស្វ័យប្រវត្តិ៖ ការចាប់ផ្តើម Server dev ដំណើរការសាកល្បង ដំណើរការការផ្លាស់ប្តូរ កូដស្រទាប់ និងការបង្កើតបណ្តុំផលិតកម្ម។",
      "codeSnippet": "{\n  \"scripts\": {\n    \"dev\": \"node --watch --env-file=.env src/server.js\",\n    \"start\": \"NODE_ENV=production node src/server.js\",\n    \"lint\": \"eslint src/\",\n    \"lint:fix\": \"eslint src/ --fix\",\n    \"test\": \"vitest run\",\n    \"test:watch\": \"vitest\"\n  }\n}"
    },
    {
      "id": "M02-06",
      "number": "06",
      "title": "Installing Packages",
      "khmerTitle": "ការដំឡើងកញ្ចប់បណ្ណាល័យ (Packages)",
      "type": "lab",
      "codeLanguage": "bash",
      "summary": "ការដំឡើងកញ្ចប់អនុញ្ញាតឱ្យអ្នកបញ្ចូលបណ្ណាល័យដែលសាកល្បងដោយសមរភូមិ (Express, Mongoose, Zod, bcrypt) ទៅក្នុងមូលដ្ឋានកូដរបស់អ្នក ដោយចាក់សោកំណែតាមន័យជាក់លាក់ ដើម្បីធានាបាននូវការស្ថាបនាស្របគ្នាលើការអភិវឌ្ឍ និងផលិតកម្ម។",
      "codeSnippet": "# Install a runtime dependency\nnpm install express dotenv cors\n\n# Install a specific version\nnpm install jsonwebtoken@9.0.2\n\n# Uninstall a package\nnpm uninstall lodash"
    },
    {
      "id": "M02-07",
      "number": "07",
      "title": "Dependencies",
      "khmerTitle": "ការពឹងផ្អែកចាំបាច់ (Dependencies)",
      "type": "concept",
      "codeLanguage": "json",
      "summary": "ភាពអាស្រ័យផលិតកម្មបានរាយនៅក្រោម `\\\"dependencies\\\"` are required for the application to function in production environments (e.g. web frameworks, database drivers, security utilities).",
      "codeSnippet": "{\n  \"dependencies\": {\n    \"bcrypt\": \"^5.1.1\",\n    \"cors\": \"^2.8.5\",\n    \"express\": \"^4.19.2\",\n    \"jsonwebtoken\": \"^9.0.2\",\n    \"mongoose\": \"^8.4.0\",\n    \"zod\": \"^3.23.8\"\n  }\n}"
    },
    {
      "id": "M02-08",
      "number": "08",
      "title": "Dev Dependencies",
      "khmerTitle": "ការពឹងផ្អែកសម្រាប់តែការអភិវឌ្ឍ (Dev Dependencies)",
      "type": "concept",
      "codeLanguage": "bash",
      "summary": "ភាពអាស្រ័យនៃការអភិវឌ្ឍដែលបានរាយបញ្ជីនៅក្រោម `\\\"devDependencies\\\"` are tooling packages used only during local development and testing (linters, test frameworks, type definitions, hot reloaders) and are excluded from production artifacts.",
      "codeSnippet": "# Install development-only tools\nnpm install -D vitest supertest eslint prettier\n\n# package.json result:\n# \"devDependencies\": {\n#   \"eslint\": \"^9.3.0\",\n#   \"supertest\": \"^7.0.0\",\n#   \"vitest\": \"^1.6.0\"\n# }"
    },
    {
      "id": "M02-09",
      "number": "09",
      "title": "node_modules",
      "khmerTitle": "ថតផ្ទុកកូដ node_modules",
      "type": "concept",
      "codeLanguage": "bash",
      "summary": "ថតឯកសារ `node_modules` ផ្ទុកកូដរូបវន្តដែលបានដំឡើងនៃភាពអាស្រ័យដោយផ្ទាល់ និងអន្តរកាលទាំងអស់។ ដោយសារតែវាអាចផលិតឡើងវិញបានតាមរយៈ `npm install` វាមិនគួរត្រូវបានប្តេជ្ញាចិត្តចំពោះ Git ទេ។",
      "codeSnippet": "# Ensure .gitignore has node_modules\necho \"node_modules/\" >> .gitignore\necho \".env\" >> .gitignore\n\n# Completely refresh dependencies if corrupted\nrm -rf node_modules package-lock.json\nnpm install"
    },
    {
      "id": "M02-10",
      "number": "10",
      "title": "package-lock.json",
      "khmerTitle": "សារៈសំខាន់នៃ package-lock.json",
      "type": "concept",
      "codeLanguage": "bash",
      "summary": "`package-lock.json` ចាក់សោកំណែពិតប្រាកដ លេខសម្គាល់សុចរិតភាព (SHA-512) និងដើមឈើពឹងផ្អែកដែលបានដាក់នៅលើប្រព័ន្ធរបស់អ្នក។ វាធានាថារាល់អ្នកអភិវឌ្ឍន៍ Server CI និងផលិតកម្ម Docker container ដំឡើងមែកធាងអាស្រ័យដូចគ្នា។",
      "codeSnippet": "# In CI/CD and Dockerfiles, ALWAYS use npm ci:\n# - Faster than npm install\n# - Throws error if package.json and package-lock.json are out of sync\n# - Never modifies the lockfile\nnpm ci --omit=dev"
    },
    {
      "id": "M02-11",
      "number": "11",
      "title": "CommonJS",
      "khmerTitle": "ប្រព័ន្ធម៉ូឌុល CommonJS (require / module.exports)",
      "type": "concept",
      "codeLanguage": "javascript",
      "summary": "CommonJS គឺជាប្រព័ន្ធម៉ូឌុលចាស់ដែលត្រូវបានរចនាឡើងដំបូងសម្រាប់ Node.js ។ វាផ្ទុកម៉ូឌុលធ្វើ Synchronous ដោយប្រើ \\`require()\\` និងបង្ហាញ API សាធារណៈតាមរយៈ \\`module.exports\\` ឬ \\`exports\\` ។",
      "codeSnippet": "// math.js (CommonJS export)\nfunction add(a, b) {\n  return a + b;\n}\nmodule.exports = { add };\n\n// app.js (CommonJS import)\nconst { add } = require(\"./math\");\nconsole.log(add(5, 10)); // 15"
    },
    {
      "id": "M02-12",
      "number": "12",
      "title": "ES Modules",
      "khmerTitle": "ប្រព័ន្ធម៉ូឌុលទំនើប ES Modules (import / export)",
      "type": "lab",
      "codeLanguage": "javascript",
      "summary": "ម៉ូឌុល ECMAScript (ESM) គឺជាប្រព័ន្ធម៉ូឌុលផ្លូវការស្តង់ដារនៃ JavaScript ។ វាគាំទ្រការវិភាគឋិតិវន្ត កម្រិតកំពូល \\`await\\` ការផ្ទុកអសមកាល និងវាក្យសម្ព័ន្ធបង្រួបបង្រួមនៅទូទាំង Frontend និង Backend ។",
      "codeSnippet": "// utils.js\nexport const calculateTax = (price, rate = 0.1) => price * rate;\nexport default function formatCurrency(amount) {\n  return `$${amount.toFixed(2)}`;\n}\n\n// server.js\nimport formatCurrency, { calculateTax } from \"./utils.js\";\n\n// Top-level await is natively supported in ESM!\nconst tax = calculateTax(100);\nconsole.log(\"Tax:\", formatCurrency(tax));"
    },
    {
      "id": "M02-13",
      "number": "13",
      "title": "Environment Variables",
      "khmerTitle": "អថេរកំណត់បរិស្ថាន (Environment Variables)",
      "type": "concept",
      "codeLanguage": "javascript",
      "summary": "អថេរបរិស្ថានខាងក្រៅកំណត់រចនាសម្ព័ន្ធថាមវន្ត (URL Database លេខច្រក សោសម្ងាត់ API កម្រិតកំណត់ហេតុ) ពី Source Code ដោយប្រកាន់ខ្ជាប់នូវ Methods កម្មវិធី 12-Factor សម្រាប់ការដាក់ពង្រាយពហុបរិស្ថានប្រកបដោយសុវត្ថិភាព។",
      "codeSnippet": "// Accessing environment variables via process.env\nconst PORT = process.env.PORT || 5000;\nconst DB_URI = process.env.DATABASE_URL;\nconst IS_PROD = process.env.NODE_ENV === \"production\";\n\nconsole.log(`Server starting on port ${PORT} in ${IS_PROD ? \"PROD\" : \"DEV\"} mode`);"
    },
    {
      "id": "M02-14",
      "number": "14",
      "title": ".env",
      "khmerTitle": "ការគ្រប់គ្រង .env ជាមួយបណ្ណាល័យ dotenv",
      "type": "lab",
      "codeLanguage": "javascript",
      "summary": "ឯកសារ `.env` រក្សាទុកអថេរបរិស្ថានតម្លៃសោមូលដ្ឋាន។ បណ្ណាល័យដូចជា `dotenv` ឬ Node.js ដើម `--env-file` ញែកឯកសារនេះនៅពេលចាប់ផ្តើម ហើយបញ្ចូល `process.env` ។",
      "codeSnippet": "# .env file:\n# PORT=5000\n# DATABASE_URL=mongodb://localhost:27017/shop\n# JWT_SECRET=super_secret_key_123\n\n// Loading via dotenv in code:\nimport \"dotenv/config\";\n\n// OR using native Node 20+ CLI argument (zero dependencies!):\n// node --env-file=.env server.js"
    },
    {
      "id": "M02-15",
      "number": "15",
      "title": "process",
      "khmerTitle": "វត្ថុប្រព័ន្ធ process ក្នុង Node.js",
      "type": "concept",
      "codeLanguage": "javascript",
      "summary": "វត្ថុ \\`process\\` សកលផ្តល់នូវការចូលដំណើរការកម្មវិធីទៅកាន់ដំណើរការ Node.js ដែលកំពុងដំណើរការ។ វាផ្តល់សិទ្ធិចូលប្រើព័ត៌មានពេលដំណើរការ ស្ទ្រីមបញ្ចូល/ទិន្នផលស្តង់ដារ ការប្រើប្រាស់អង្គចងចាំ ស្ថាបត្យកម្មស៊ីភីយូ និងដំណើរការព្រឹត្តិការណ៍Lifecycleដូចជាការបិទយ៉ាងប្រណិត។",
      "codeSnippet": "// Graceful shutdown handling\nprocess.on(\"SIGTERM\", async () => {\n  console.log(\"SIGTERM received. Closing database connections gracefully...\");\n  await db.disconnect();\n  server.close(() => {\n    console.log(\"HTTP server closed. Exiting process.\");\n    process.exit(0);\n  });\n});"
    },
    {
      "id": "M02-16",
      "number": "16",
      "title": "Command Line Arguments",
      "khmerTitle": "អាគុយម៉ង់បន្ទាត់ពាក្យបញ្ជា (Command Line Arguments)",
      "type": "lab",
      "codeLanguage": "javascript",
      "summary": "អាគុយម៉ង់បន្ទាត់ពាក្យបញ្ជាបានឆ្លងកាត់នៅពេលចាប់ផ្តើមស្គ្រីប (\\`node script.js --port 8080\\`) អាចចូលប្រើបានក្នុង \\`process.argv\\` ។ Node.js ទំនើបផ្តល់ \\`util.parseArgs()\\` ដើម្បីញែកទង់ ប៊ូលីន និងតម្លៃStringដើម។",
      "codeSnippet": "import { parseArgs } from \"node:util\";\n\nconst options = {\n  port: { type: \"string\", short: \"p\", default: \"5000\" },\n  migrate: { type: \"boolean\", default: false }\n};\n\nconst { values } = parseArgs({ options });\nconsole.log(\"Configured Port:\", values.port);\nconsole.log(\"Run Migration?\", values.migrate);"
    }
  ],
  "M03": [
    {
      "id": "M03-01",
      "number": "01",
      "title": "Node.js Core Modules",
      "khmerTitle": "ទិដ្ឋភាពទូទៅនៃ Core Modules",
      "type": "concept",
      "codeLanguage": "javascript",
      "summary": "ម៉ូឌុលស្នូលត្រូវបានចងក្រងដោយផ្ទាល់ទៅក្នុងប្រព័ន្ធគោលពីរ Node.js ដោយផ្តល់នូវការចូលប្រើកម្រិតទាបទៅកាន់ប្រព័ន្ធប្រតិបត្តិការ បណ្តាញ ហាតវែរគ្រីប និងប្រព័ន្ធឯកសារដោយមិនទាមទារកញ្ចប់ npm ខាងក្រៅ។",
      "codeSnippet": "// Preferred modern syntax with \"node:\" prefix\nimport fs from \"node:fs/promises\";\nimport path from \"node:path\";\nimport os from \"node:os\";\nimport crypto from \"node:crypto\";"
    },
    {
      "id": "M03-02",
      "number": "02",
      "title": "fs Module",
      "khmerTitle": "ម៉ូឌុលគ្រប់គ្រងឯកសារ fs Module",
      "type": "lab",
      "codeLanguage": "javascript",
      "summary": "ម៉ូឌុល \\`node:fs\\` ផ្ដល់នូវប្រព័ន្ធឯកសារដ៏ទូលំទូលាយ APIs ដើម្បីបង្កើត អាន ធ្វើបច្ចុប្បន្នភាព ប្តូរឈ្មោះ និងលុបឯកសារ និងថត ដោយផ្តល់ជូននូវInterfaceដែលផ្អែកលើSynchronous Callbacksមកវិញ និងPromises។",
      "codeSnippet": "import fs from \"node:fs/promises\";\n\n// Write a file\nawait fs.writeFile(\"app.log\", \"System started successfully\\n\", \"utf-8\");\n\n// Append data\nawait fs.appendFile(\"app.log\", \"User logged in\\n\");\n\n// Read content\nconst content = await fs.readFile(\"app.log\", \"utf-8\");\nconsole.log(content);"
    },
    {
      "id": "M03-03",
      "number": "03",
      "title": "path Module",
      "khmerTitle": "ម៉ូឌុលផ្លូវឯកសារ path Module",
      "type": "lab",
      "codeLanguage": "javascript",
      "summary": "ម៉ូឌុល \\`node:path\\` ផ្តល់ឧបករណ៍ប្រើប្រាស់ដំណោះស្រាយផ្លូវឆ្លងវេទិកា ដោះស្រាយផ្លូវបំបែកបានត្រឹមត្រូវ (\\`/\\` នៅលើ macOS/Linux ទល់នឹង \\`\\\\\\` នៅលើ Windows) ការគណនាផ្លូវដែលទាក់ទង និងទាញយកផ្នែកបន្ថែមឯកសារ។",
      "codeSnippet": "import path from \"node:path\";\n\n// Safe cross-platform path joining\nconst uploadPath = path.join(process.cwd(), \"public\", \"uploads\", \"avatar.png\");\n\n// Extract metadata\nconsole.log(\"Directory:\", path.dirname(uploadPath));\nconsole.log(\"Filename:\", path.basename(uploadPath));\nconsole.log(\"Extension:\", path.extname(uploadPath));"
    },
    {
      "id": "M03-04",
      "number": "04",
      "title": "os Module",
      "khmerTitle": "ម៉ូឌុលព័ត៌មានប្រព័ន្ធប្រតិបត្តិការ os Module",
      "type": "concept",
      "codeLanguage": "javascript",
      "summary": "ម៉ូឌុល \\`node:os\\` បង្ហាញរង្វាស់ផ្នែករឹងរបស់ប្រព័ន្ធប្រតិបត្តិការ៖ ចំនួនស្នូលស៊ីភីយូ ម៉ោងដំណើរការប្រព័ន្ធ អង្គចងចាំឥតគិតថ្លៃ/សរុប Interfaceបណ្តាញ និងស្ថាបត្យកម្មម៉ាស៊ីន ដែលមានសារៈសំខាន់សម្រាប់ការត្រួតពិនិត្យចង្កោម និងការត្រួតពិនិត្យសុខភាព។",
      "codeSnippet": "import os from \"node:os\";\n\nconsole.log(\"Hostname:\", os.hostname());\nconsole.log(\"CPU Cores:\", os.cpus().length);\nconsole.log(\"Free Memory:\", (os.freemem() / 1024 / 1024 / 1024).toFixed(2), \"GB\");\nconsole.log(\"Total Memory:\", (os.totalmem() / 1024 / 1024 / 1024).toFixed(2), \"GB\");\nconsole.log(\"System Uptime:\", (os.uptime() / 3600).toFixed(1), \"hours\");"
    },
    {
      "id": "M03-05",
      "number": "05",
      "title": "url Module",
      "khmerTitle": "ម៉ូឌុល URL និង SearchParams",
      "type": "lab",
      "codeLanguage": "javascript",
      "summary": "ថ្នាក់ \\`URL\\` និង \\`URLSearchParams\\` អនុលោមតាម WHATWG ផ្តល់នូវការវិភាគសុវត្ថិភាព សៀរៀល និងការរៀបចំQuery Stringសម្រាប់ HTTP ស្នើសុំ URLs ចូល និងការហៅ API ខាងក្រៅ។",
      "codeSnippet": "const myUrl = new URL(\"https://api.example.com/v1/users?role=admin&active=true\");\n\nconsole.log(\"Host:\", myUrl.hostname);\nconsole.log(\"Path:\", myUrl.pathname);\nconsole.log(\"Role param:\", myUrl.searchParams.get(\"role\"));\n\n// Appending query parameters safely\nmyUrl.searchParams.append(\"page\", \"2\");\nconsole.log(\"Updated URL:\", myUrl.toString());"
    },
    {
      "id": "M03-06",
      "number": "06",
      "title": "events Module",
      "khmerTitle": "ម៉ូឌុល Events",
      "type": "lab",
      "codeLanguage": "javascript",
      "summary": "ម៉ូឌុល \\`node:events\\` បង្កើតជាឆ្អឹងខ្នងនៃ Node.js ស្ថាបត្យកម្មដែលជំរុញដោយព្រឹត្តិការណ៍។ ស្ទើរតែរាល់ការស្ទ្រីម និងបណ្តាញភ្ជាប់វត្ថុនៅក្នុង Node (HTTP សំណើ រន្ធServer ស្ទ្រីម) ទទួលមរតកពី EventEmitter ។",
      "codeSnippet": "import { EventEmitter } from \"node:events\";\n\nconst serverEmitter = new EventEmitter();\n\nserverEmitter.on(\"user:signup\", (user) => {\n  console.log(\"Send welcome notification to:\", user.email);\n});\n\nserverEmitter.emit(\"user:signup\", { email: \"sokha@gmail.com\" });"
    },
    {
      "id": "M03-07",
      "number": "07",
      "title": "crypto Module",
      "khmerTitle": "ម៉ូឌុលគ្រីបតូហ្គ្រាហ្វ៊ី crypto Module",
      "type": "lab",
      "codeLanguage": "javascript",
      "summary": "ម៉ូឌុល \\`node:crypto\\` ផ្តល់នូវមុខងារគ្រីបគ្រីបកម្រិតផលិតកម្ម៖ បង្កើតបៃបៃចៃដន្យដែលមានសុវត្ថិភាពជាគ្រីប, UUIDs, សញ្ញា SHA-256, ហត្ថលេខា HMAC និងគូសោមិនស៊ីមេទ្រី។",
      "codeSnippet": "import crypto from \"node:crypto\";\n\n// Generate secure random reset token (hex)\nconst resetToken = crypto.randomBytes(32).toString(\"hex\");\n\n// Generate SHA-256 hash\nconst hash = crypto.createHash(\"sha256\").update(resetToken).digest(\"hex\");\n\nconsole.log(\"Token:\", resetToken);\nconsole.log(\"SHA-256 Hash:\", hash);"
    },
    {
      "id": "M03-08",
      "number": "08",
      "title": "stream Module",
      "khmerTitle": "ម៉ូឌុល Stream សម្រាប់ទិន្នន័យធំៗ",
      "type": "architecture",
      "codeLanguage": "javascript",
      "summary": "Streams ដំណើរការទិន្នន័យជាបណ្តើរៗ ជាជាងផ្ទុកឯកសារទាំងមូលទៅក្នុង RAM ។ នេះអនុញ្ញាតឱ្យកម្មវិធី Node.js ដំណើរការឯកសារទំហំជីហ្គា Bytes ការផ្សាយវីដេអូ និងការបោះចោល Database ជាមួយនឹងការប្រើប្រាស់អង្គចងចាំ ~ 20MB ថេរ។",
      "codeSnippet": "import fs from \"node:fs\";\nimport { pipeline } from \"node:stream/promises\";\nimport zlib from \"node:zlib\";\n\n// Compress a huge file using streams without loading it all in RAM\nawait pipeline(\n  fs.createReadStream(\"huge-log.txt\"),\n  zlib.createGzip(),\n  fs.createWriteStream(\"huge-log.txt.gz\")\n);\nconsole.log(\"Streaming compression complete!\");"
    },
    {
      "id": "M03-09",
      "number": "09",
      "title": "Buffer",
      "khmerTitle": "ទិន្នន័យប៊ីណារី Buffer",
      "type": "concept",
      "codeLanguage": "javascript",
      "summary": "\\`Buffer\\` តំណាង​ឱ្យ​កំណាត់​ទំហំ​ថេរ​នៃ​អង្គ​ចងចាំ​គោល​ពីរ​ដែល​បាន​បែងចែក​នៅ​ខាងក្រៅ​ឃ្លាំង JavaScript របស់ V8 ។ Buffers ត្រូវ​បាន​ប្រើ​ពេល​ដោះស្រាយ​ទិន្នន័យ​គោល​ពីរ​ឆៅ​ដូច​ជា​ឯកសារ​ដែល​បាន​ផ្ទុក​ឡើង​ buffers រូបភាព​ និង​ network TCP packets ។",
      "codeSnippet": "// Create buffer from string\nconst buf = Buffer.from(\"Node.js Backend\", \"utf-8\");\n\nconsole.log(\"Raw hex bytes:\", buf);\nconsole.log(\"Base64 representation:\", buf.toString(\"base64\"));\nconsole.log(\"Decoded back to string:\", buf.toString(\"utf-8\"));"
    },
    {
      "id": "M03-10",
      "number": "10",
      "title": "EventEmitter",
      "khmerTitle": "ការបង្កើត Custom EventEmitter Class",
      "type": "lab",
      "codeLanguage": "javascript",
      "summary": "ការចាត់ថ្នាក់រង \\`EventEmitter\\` អនុញ្ញាតឱ្យអ្នកបង្កើតថ្នាក់Servicesសហគ្រាស (ឧ. សេវាបង់ប្រាក់ សេវាការជូនដំណឹង) ដែលជូនដំណឹងដល់ផ្នែកផ្សេងទៀតនៃកម្មវិធីរបស់អ្នក នៅពេលដែលការផ្លាស់ប្តូរស្ថានភាពកើតឡើង។",
      "codeSnippet": "import { EventEmitter } from \"node:events\";\n\nclass PaymentGateway extends EventEmitter {\n  processPayment(amount, user) {\n    // Simulate transaction\n    setTimeout(() => {\n      this.emit(\"payment:success\", { transactionId: \"TX_1092\", amount, user });\n    }, 200);\n  }\n}\n\nconst gateway = new PaymentGateway();\ngateway.on(\"payment:success\", (tx) => console.log(\"Transaction verified:\", tx));\ngateway.processPayment(99.99, \"Sokha\");"
    },
    {
      "id": "M03-11",
      "number": "11",
      "title": "Working with Files",
      "khmerTitle": "ការគ្រប់គ្រងឯកសារក្នុង Server",
      "type": "lab",
      "codeLanguage": "javascript",
      "summary": "Server សហគ្រាសឧស្សាហ៍ផ្ទៀងផ្ទាត់អត្ថិភាពឯកសារ ពិនិត្យទិន្នន័យមេតា (ទំហំឯកសារ ពេលវេលាកែប្រែ Authorization) និងគ្រប់គ្រងថតបណ្តោះអាសន្ន មុនពេលផ្ទុកឯកសារទៅកន្លែងផ្ទុកពពក។",
      "codeSnippet": "import fs from \"node:fs/promises\";\n\ntry {\n  const stats = await fs.stat(\"package.json\");\n  console.log(\"Is File?\", stats.isFile());\n  console.log(\"Size in bytes:\", stats.size);\n  console.log(\"Last Modified:\", stats.mtime);\n} catch (err) {\n  if (err.code === \"ENOENT\") console.log(\"File does not exist!\");\n}"
    },
    {
      "id": "M03-12",
      "number": "12",
      "title": "Reading Files",
      "khmerTitle": "ការអានឯកសារ (Text & JSON)",
      "type": "lab",
      "codeLanguage": "javascript",
      "summary": "ការអានឯកសារកំណត់រចនាសម្ព័ន្ធ និងទ្រព្យសម្បត្តិអត្ថបទដោយភាពជឿជាក់ដោយប្រើ Methods async គ្រប់គ្រងការញែក JSON និងការអ៊ិនកូដតួអក្សរឱ្យបានត្រឹមត្រូវ។",
      "codeSnippet": "import fs from \"node:fs/promises\";\n\nasync function loadConfig() {\n  try {\n    const raw = await fs.readFile(\"./package.json\", \"utf-8\");\n    const pkg = JSON.parse(raw);\n    console.log(\"Loaded package:\", pkg.name, \"v\" + pkg.version);\n  } catch (error) {\n    console.error(\"Failed to load config:\", error.message);\n  }\n}\nloadConfig();"
    },
    {
      "id": "M03-13",
      "number": "13",
      "title": "Writing Files",
      "khmerTitle": "ការសរសេរ និងកែប្រែឯកសារ",
      "type": "lab",
      "codeLanguage": "javascript",
      "summary": "ការសរសេរទិន្នន័យដែលមានរចនាសម្ព័ន្ធ (កំណត់ហេតុ ការនាំចេញ ឯកសារ CSV) ដោយសុវត្ថិភាពទៅក្នុងថាសដែលមានលំនាំសរសេរអាតូម ដើម្បីជៀសវាងការខូចឯកសារ។",
      "codeSnippet": "import fs from \"node:fs/promises\";\n\nconst userLog = { userId: \"U_102\", action: \"LOGIN\", timestamp: new Date() };\n\n// Write formatted JSON\nawait fs.writeFile(\n  \"user-session.json\",\n  JSON.stringify(userLog, null, 2),\n  \"utf-8\"\n);\nconsole.log(\"Session saved successfully!\");"
    },
    {
      "id": "M03-14",
      "number": "14",
      "title": "Working with Directories",
      "khmerTitle": "ការគ្រប់គ្រង និងស្វែងរកថត Folders",
      "type": "lab",
      "codeLanguage": "javascript",
      "summary": "បង្កើត​ថត​ដដែលៗ រាយ​មាតិកា​ជាមួយ​ប្រភេទ​ឯកសារ និង​សម្អាត​ថត​បណ្ដោះអាសន្ន។",
      "codeSnippet": "import fs from \"node:fs/promises\";\n\n// Create nested directory safely\nawait fs.mkdir(\"public/uploads/avatars\", { recursive: true });\n\n// Read directory entries with types\nconst entries = await fs.readdir(\"src\", { withFileTypes: true });\nfor (const entry of entries) {\n  console.log(entry.isDirectory() ? \"📁 [DIR]\" : \"📄 [FILE]\", entry.name);\n}"
    }
  ],
  "M04": [
    {
      "id": "M04-01",
      "number": "01",
      "title": "Synchronous vs Asynchronous",
      "khmerTitle": "ការប្រៀបធៀប Synchronous និង Asynchronous",
      "type": "concept",
      "codeLanguage": "javascript",
      "summary": "កូដដែលធ្វើ Synchronous ប្រតិបត្តិតាមបន្ទាត់ដោយរារាំងការប្រតិបត្តិរហូតដល់ប្រតិបត្តិការបច្ចុប្បន្នបញ្ចប់។ កូដអសមកាលចុះឈ្មោះប្រតិបត្តិការជាមួយនឹងរយៈពេលដំណើរការមូលដ្ឋាន ហើយបន្តភ្លាមៗ ដំណើរការលទ្ធផលតាមរយៈ Callbacks មកវិញ Promises ឬធ្វើ Synchronous/រង់ចាំនៅពេលរួចរាល់។",
      "codeSnippet": "// Synchronous (BLOCKS the thread for 2 seconds):\n// const data = fs.readFileSync(\"heavy-file.bin\"); // Server is frozen!\n\n// Asynchronous (NON-BLOCKING):\nfs.readFile(\"heavy-file.bin\", (err, data) => {\n  console.log(\"Data loaded without freezing the server!\");\n});\nconsole.log(\"Server immediately keeps handling other clients!\");"
    },
    {
      "id": "M04-02",
      "number": "02",
      "title": "Callbacks",
      "khmerTitle": "មូលដ្ឋានគ្រឹះ Callbacks ក្នុង Node.js",
      "type": "concept",
      "codeLanguage": "javascript",
      "summary": "Callbacks មកវិញគឺជាមុខងារដែលបានបញ្ជូនជាអាគុយម៉ង់ទៅមុខងារអសមកាល ដែលហៅនៅពេលកិច្ចការផ្ទៃខាងក្រោយបញ្ចប់។ APIs ប្រពៃណី Node.js ធ្វើតាម error-first callback convention \\`(err, result) => {}\\`។",
      "codeSnippet": "import fs from \"node:fs\";\n\n// Node.js Error-First Callback pattern:\nfs.readFile(\"config.json\", \"utf-8\", (err, data) => {\n  if (err) {\n    console.error(\"Error reading file:\", err.message);\n    return;\n  }\n  console.log(\"File content:\", data);\n});"
    },
    {
      "id": "M04-03",
      "number": "03",
      "title": "Callback Problems",
      "khmerTitle": "បញ្ហា Callback Hell និង Inversion of Control",
      "type": "concept",
      "codeLanguage": "javascript",
      "summary": "ការដាក់ Callbacks មកវិញអសមកាលជាបន្តបន្ទាប់ច្រើនដងនាំទៅដល់ 'ពីរ៉ាមីតនៃសេចក្តីវិនាស' (Callback Hell) ធ្វើឱ្យកូដមិនអាចអានបាន ពិបាកក្នុងការតាមដាន និងងាយនឹងមានកំហុសដែលមិនអាចដោះស្រាយបាន។",
      "codeSnippet": "// The \"Pyramid of Doom\" (Anti-pattern):\ngetUser(userId, (err, user) => {\n  if (err) return handleErr(err);\n  getOrders(user.id, (err, orders) => {\n    if (err) return handleErr(err);\n    getInvoice(orders[0].id, (err, invoice) => {\n      if (err) return handleErr(err);\n      sendEmail(user.email, invoice, (err) => {\n        // Deeply nested, unmaintainable code!\n      });\n    });\n  });\n});"
    },
    {
      "id": "M04-04",
      "number": "04",
      "title": "Promises",
      "khmerTitle": "ស្ថាបត្យកម្ម Promises (Pending, Fulfilled, Rejected)",
      "type": "lab",
      "codeLanguage": "javascript",
      "summary": "Promise តំណាងឱ្យការបញ្ចប់ ឬបរាជ័យជាយថាហេតុនៃប្រតិបត្តិការអសមកាល និងតម្លៃលទ្ធផលរបស់វា។ Promises មានរដ្ឋផ្តាច់មុខចំនួនបី៖ រង់ចាំ បំពេញ ឬបដិសេធ។",
      "codeSnippet": "const verifyStock = (productId, quantity) => {\n  return new Promise((resolve, reject) => {\n    if (quantity <= 5) {\n      resolve({ available: true, productId });\n    } else {\n      reject(new Error(\"Insufficient warehouse stock\"));\n    }\n  });\n};\n\nverifyStock(\"P_99\", 2)\n  .then(res => console.log(\"Stock confirmed:\", res))\n  .catch(err => console.error(\"Order failed:\", err.message));"
    },
    {
      "id": "M04-05",
      "number": "05",
      "title": "async / await",
      "khmerTitle": "ការប្រើប្រាស់ async / await ទំនើប",
      "type": "lab",
      "codeLanguage": "javascript",
      "summary": "Syntactic sugar over Promises ដែលអនុញ្ញាតឱ្យអានកូដអសមកាល និងរៀបចំរចនាសម្ព័ន្ធដោយ Synchronous ។ មុខងារ Async តែងតែត្រឡប់ Promises ហើយ \\`await\\` ផ្អាកការប្រតិបត្តិរហូតដល់Promisesដោះស្រាយ។",
      "codeSnippet": "async function fetchDashboardData(userId) {\n  try {\n    // Run both queries concurrently!\n    const [user, orders] = await Promise.all([\n      db.users.findById(userId),\n      db.orders.find({ userId })\n    ]);\n    return { user, orders };\n  } catch (error) {\n    console.error(\"Dashboard query failed:\", error);\n    throw error;\n  }\n}"
    },
    {
      "id": "M04-06",
      "number": "06",
      "title": "Error Handling",
      "khmerTitle": "ការគ្រប់គ្រងកំហុស Asynchronous Error Handling",
      "type": "lab",
      "codeLanguage": "javascript",
      "summary": "ការដោះស្រាយកំហុសនៅក្នុងកូដអសមកាលដោយប្រើប្លុក \\`try/catch\\` និងការទទួលយកUnhandled RejectionsការពារការគាំងServer។",
      "codeSnippet": "process.on(\"unhandledRejection\", (reason, promise) => {\n  console.error(\"CRITICAL: Unhandled Promise Rejection at:\", promise, \"reason:\", reason);\n  // Gracefully log and restart process\n});\n\n// Always wrap async route logic in try/catch or async wrapper\nasync function handler(req, res, next) {\n  try {\n    const result = await riskyOperation();\n    res.json(result);\n  } catch (err) {\n    next(err); // Hand off to central error middleware\n  }\n}"
    },
    {
      "id": "M04-07",
      "number": "07",
      "title": "Event Loop",
      "khmerTitle": "ដំណើរការ Event Loop របស់ Node.js",
      "type": "architecture",
      "codeLanguage": "javascript",
      "summary": "libuv Event Loop គឺជាបេះដូងរបស់ Node.js ។ វាបន្តសំរបសំរួលការប្រតិបត្តិរវាងកូដ JavaScript និងប្រព័ន្ធប្រតិបត្តិការឆ្លងកាត់ដំណាក់កាលផ្សេងៗគ្នា៖ Timers រង់ចាំ Callbacks មកវិញ ការស្ទង់មតិ ពិនិត្យ (setImmediate) និងបិទ Callbacks មកវិញ។",
      "codeSnippet": "/* Libuv Event Loop Phases:\n   ┌───────────────────────────┐\n   │          Timers           │ (setTimeout, setInterval)\n   └─────────────┬─────────────┘\n   ┌─────────────┴─────────────┐\n   │     Pending Callbacks     │ (I/O callbacks deferred)\n   └─────────────┬─────────────┘\n   ┌─────────────┴─────────────┐\n   │           Poll            │ (Retrieve new I/O events; execute I/O)\n   └─────────────┬─────────────┘\n   ┌─────────────┴─────────────┐\n   │           Check           │ (setImmediate callbacks)\n   └─────────────┬─────────────┘\n   ┌─────────────┴─────────────┐\n   │      Close Callbacks      │ (socket.on('close'))\n   └───────────────────────────┘\n*/"
    },
    {
      "id": "M04-08",
      "number": "08",
      "title": "Event Queue",
      "khmerTitle": "ជួរការងារ Event Queue និង Task Queues",
      "type": "architecture",
      "codeLanguage": "javascript",
      "summary": "កិច្ចការ​អសមកាល​ដាក់​ការ​ហៅ​ត្រឡប់​របស់​ពួកគេ​ទៅ​លើ​ជួរ​កិច្ចការ​នៅ​ពេល I/O បញ្ចប់។ Event Loop ទាញ Callbacks មកវិញពីជួរទាំងនេះ ហើយប្រតិបត្តិពួកវានៅពេលណាដែលជង់ការហៅគឺទទេ។",
      "codeSnippet": "console.log(\"A: Stack execution\");\n\nsetTimeout(() => {\n  console.log(\"C: Task queue callback executed\");\n}, 0);\n\nconsole.log(\"B: Stack execution continues\");\n// Output order: A -> B -> C"
    },
    {
      "id": "M04-09",
      "number": "09",
      "title": "Microtasks",
      "khmerTitle": "ជួរការងារ Microtasks (process.nextTick & Promises)",
      "type": "lab",
      "codeLanguage": "javascript",
      "summary": "ជួរ Microtask (\\`process.nextTick\\` និងបានដោះស្រាយការហៅត្រលប់មកវិញដោយសន្យា) មានអាទិភាពខ្ពស់ជាងកិច្ចការម៉ាក្រូនៃ Event Loop (Timers I/O)។ Microtasks ត្រូវបានបង្ហូរទាំងស្រុងមុនពេល Event Loop ផ្លាស់ប្តូររវាងដំណាក់កាល។",
      "codeSnippet": "console.log(\"1. Synchronous\");\n\nsetTimeout(() => console.log(\"4. Macrotask (setTimeout)\"), 0);\n\nPromise.resolve().then(() => console.log(\"3. Microtask (Promise)\"));\n\nprocess.nextTick(() => console.log(\"2. NextTick Microtask\"));\n\n// Execution order: 1 -> 2 -> 3 -> 4"
    },
    {
      "id": "M04-10",
      "number": "10",
      "title": "Timers",
      "khmerTitle": "ការប្រើប្រាស់ Timers (setTimeout, setInterval, setImmediate)",
      "type": "lab",
      "codeLanguage": "javascript",
      "summary": "Node.js ផ្តល់ `setTimeout`, `setInterval`, និង `setImmediate`។ ខណៈពេលដែល `setTimeout(fn, 0)` ត្រូវបានធីកក្នុងដំណាក់កាលកម្មវិធីកំណត់ពេលវេលា `setImmediate(fn)` ដំណើរការក្នុងដំណាក់កាលពិនិត្យភ្លាមៗបន្ទាប់ពីការបោះឆ្នោត I/O ។",
      "codeSnippet": "import fs from \"node:fs\";\n\nfs.readFile(\"package.json\", () => {\n  // Inside I/O cycle: setImmediate ALWAYS fires first!\n  setTimeout(() => console.log(\"Timer phase: setTimeout\"), 0);\n  setImmediate(() => console.log(\"Check phase: setImmediate\"));\n});"
    },
    {
      "id": "M04-11",
      "number": "11",
      "title": "Non-blocking Operations",
      "khmerTitle": "ការធានាប្រតិបត្តិការមិនរាំងស្ទះ",
      "type": "lab",
      "codeLanguage": "javascript",
      "summary": "យុទ្ធសាស្រ្តដើម្បីការពារការបិទ Event Loop ៖ បំបែកការគណនា CPU ដ៏ធំទៅជាកំណាត់ជាមួយ \\`setImmediate\\` ដោយប្រើ Worker Threads សម្រាប់ការគណនាគណិតវិទ្យាធ្ងន់ៗ និងប្រើប្រាស់យ៉ាងតឹងរឹងនូវDatabaseអសមកាល និងកម្មវិធីបញ្ជាឯកសារ។",
      "codeSnippet": "// Chunking a large array calculation across Event Loop ticks\nfunction processLargeArrayInChunks(items, batchSize = 1000) {\n  let index = 0;\n  function processChunk() {\n    const end = Math.min(index + batchSize, items.length);\n    for (; index < end; index++) {\n      // Process item\n    }\n    if (index < items.length) {\n      setImmediate(processChunk); // Yield control back to Event Loop!\n    }\n  }\n  processChunk();\n}"
    },
    {
      "id": "M04-12",
      "number": "12",
      "title": "Async Best Practices",
      "khmerTitle": "ការអនុវត្តល្អបំផុតសម្រាប់ Async Node.js",
      "type": "concept",
      "codeLanguage": "javascript",
      "summary": "ច្បាប់សំខាន់ៗសម្រាប់ការសរសេរកូដ async ដែលអាចធ្វើមាត្រដ្ឋានបាន៖ កុំលាយ Callbacks មកវិញ និង Promises តែងតែត្រលប់មកវិញ ឬរង់ចាំ Promises កំណត់ពេលវេលាអស់ពេលសម្រាប់ Request HTTP ខាងក្រៅទាំងអស់ និងជៀសវាងការបង្កើត Promises ដែលមិនបានគ្រប់គ្រងអណ្តែត។",
      "codeSnippet": "// Using AbortController for timeout protection on external fetch\nconst controller = new AbortController();\nconst timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout\n\ntry {\n  const response = await fetch(\"https://api.partner.com/data\", {\n    signal: controller.signal\n  });\n  const data = await response.json();\n} catch (err) {\n  if (err.name === \"AbortError\") {\n    console.error(\"Request timed out after 3000ms!\");\n  }\n} finally {\n  clearTimeout(timeoutId);\n}"
    }
  ],
  "M05": [
    {
      "id": "M05-01",
      "number": "01",
      "title": "HTTP Fundamentals",
      "khmerTitle": "មូលដ្ឋានគ្រឹះពិធីការ HTTP និងដំណើរការ Request-Response",
      "type": "concept",
      "codeLanguage": "javascript",
      "summary": "Hypertext Transfer Protocol (HTTP) គឺជា Application Layer Protocol បែប Stateless ដែលផ្តល់ថាមពលដល់ World Wide Web ។ Client ធ្វើការផ្ញើ Request ដែលមាន HTTP Methods, Path (Routes), Headers និង Optional Body ។ បន្ទាប់មក Server ធ្វើការវាយតម្លៃ Request និងឆ្លើយតបមកវិញនូវ HTTP Status Codes, Response Headers និង JSON Payload ។",
      "codeSnippet": "/* Anatomy of an HTTP Request / Response:\n   CLIENT REQUEST:\n   POST /api/v1/orders HTTP/1.1\n   Host: api.store.com\n   Content-Type: application/json\n   Authorization: Bearer eyJhbGci...\n   {\"item\": \"Keyboard\", \"qty\": 1}\n\n   SERVER RESPONSE:\n   HTTP/1.1 201 Created\n   Content-Type: application/json\n   {\"success\": true, \"orderId\": \"ORD-55\"}\n*/"
    },
    {
      "id": "M05-02",
      "number": "02",
      "title": "HTTP Request",
      "khmerTitle": "រចនាសម្ព័ន្ធនៃ HTTP Request (req)",
      "type": "concept",
      "codeLanguage": "javascript",
      "summary": "Request HTTP រួមមាន HTTP Verbs (GET, POST ។",
      "codeSnippet": "import http from \"node:http\";\n\nconst server = http.createServer((req, res) => {\n  console.log(\"Method:\", req.method);\n  console.log(\"URL Path:\", req.url);\n  console.log(\"User-Agent:\", req.headers[\"user-agent\"]);\n  res.end(\"Request logged\");\n});"
    },
    {
      "id": "M05-03",
      "number": "03",
      "title": "HTTP Response",
      "khmerTitle": "រចនាសម្ព័ន្ធនៃ HTTP Response (res)",
      "type": "concept",
      "codeLanguage": "javascript",
      "summary": "HTTP Response ទំនាក់ទំនងស្ថានភាពនៃប្រតិបត្តិការដែលបានស្នើទៅកាន់ Client តាមរយៈ HTTP Status Codes 3 ខ្ទង់ សារស្ថានភាព Headers ឆ្លើយតប (កំណត់ការអ៊ិនកូដមាតិកា គោលការណ៍ Cache ច្បាប់សុវត្ថិភាព) និងទិន្នន័យឆ្លើយតប។",
      "codeSnippet": "import http from \"node:http\";\n\nconst server = http.createServer((req, res) => {\n  // Set status code and headers\n  res.writeHead(200, {\n    \"Content-Type\": \"application/json\",\n    \"X-Powered-By\": \"Node.js Native\"\n  });\n  // Send body and finalize response\n  res.end(JSON.stringify({ status: \"online\", timestamp: Date.now() }));\n});"
    },
    {
      "id": "M05-04",
      "number": "04",
      "title": "HTTP Methods",
      "khmerTitle": "កិរិយាស័ព្ទ HTTP (GET, POST, PUT, PATCH, DELETE)",
      "type": "concept",
      "codeLanguage": "javascript",
      "summary": "HTTP Methods ទំនាក់ទំនងតាមចេតនា៖ GET អានធនធានដោយគ្មានផលប៉ះពាល់ POST បង្កើតធនធានថ្មី PUT ជំនួសធនធានទាំងមូល PATCH អនុវត្តការអាប់ដេតដោយផ្នែក ហើយ DELETE លុបធនធាន។",
      "codeSnippet": "/* HTTP Methods Semantic Mapping:\n   GET    /api/users      -> Retrieve users (Safe, Idempotent)\n   POST   /api/users      -> Create user (Non-idempotent)\n   PUT    /api/users/1    -> Replace user completely (Idempotent)\n   PATCH  /api/users/1    -> Update specific fields (e.g. name only)\n   DELETE /api/users/1    -> Remove user (Idempotent)\n*/"
    },
    {
      "id": "M05-05",
      "number": "05",
      "title": "HTTP Headers",
      "khmerTitle": "សារៈសំខាន់នៃ HTTP Headers",
      "type": "concept",
      "codeLanguage": "javascript",
      "summary": "Headers HTTP អនុញ្ញាតឱ្យ Client និង Server ផ្លាស់ប្តូរទិន្នន័យមេតានៃការគ្រប់គ្រង៖ ការចរចាខ្លឹមសារ (\\`Accept\\`, \\`Content-Type\\`), Authentication (\\`Authorization\\`), Cache (\\`Cache-Control\\`, \\`ETag\\`) និងគោលការណ៍សុវត្ថិភាព (\\`CORS\\`, \\`CSP\\`)។",
      "codeSnippet": "// Reading Authorization header safely\nconst authHeader = req.headers[\"authorization\"]; // e.g. \"Bearer eyJhb...\"\n\nif (!authHeader || !authHeader.startsWith(\"Bearer \")) {\n  res.writeHead(401, { \"Content-Type\": \"application/json\" });\n  res.end(JSON.stringify({ error: \"Missing or invalid Bearer token\" }));\n}"
    },
    {
      "id": "M05-06",
      "number": "06",
      "title": "HTTP Status Codes",
      "khmerTitle": "លេខកូដស្ថានភាព HTTP Status Codes",
      "type": "concept",
      "codeLanguage": "javascript",
      "summary": "HTTP Status Codes ទាក់ទងលទ្ធផលនៃ Request ៖ 2xx បង្ហាញពីជោគជ័យ (200 OK, 201 Created, 204 No Content), 3xx Redirection (301, 304), 4xx Client Errors (400 Bad Request, 401 Unauthorized, 403 Forbidden, 402xx Uncessity), Notable 4024 Server កំហុស (500 កំហុសខាងក្នុង, 503 មិនអាចប្រើបាន) ។",
      "codeSnippet": "/* Standard HTTP Status Code Ranges:\n   200 OK           -> Standard successful response\n   201 Created      -> Resource successfully created (POST)\n   204 No Content   -> Successful action with no response body (DELETE)\n   400 Bad Request  -> Invalid client syntax or schema\n   401 Unauthorized -> Client must authenticate\n   403 Forbidden    -> Authenticated, but lacks required role/permission\n   404 Not Found    -> Resource does not exist\n   500 Server Error -> Unhandled server exception\n*/"
    },
    {
      "id": "M05-07",
      "number": "07",
      "title": "URL",
      "khmerTitle": "រចនាសម្ព័ន្ធ URL (Protocol, Host, Port, Path, Query)",
      "type": "concept",
      "codeLanguage": "javascript",
      "summary": "Uniform Resource Locators (URLs) កំណត់អត្តសញ្ញាណធនធានបណ្តាញតែមួយគត់។ URL ពេញលេញរួមបញ្ចូលពិធីការ (\\`https://\\`) ម៉ាស៊ីនដែន (\\`api.store.com\\`) ច្រកស្រេចចិត្ត (\\`:443\\`) ផ្លូវធនធាន (\\`/v1/products\\`) និងParamsសំណួរ (\\`?sort=desc\\`) ។",
      "codeSnippet": "import http from \"node:http\";\n\nhttp.createServer((req, res) => {\n  const parsed = new URL(req.url, `http://${req.headers.host}`);\n  console.log(\"Pathname:\", parsed.pathname); // e.g. /api/products\n  console.log(\"Search query:\", parsed.search); // e.g. ?page=2\n  res.end(\"Parsed\");\n});"
    },
    {
      "id": "M05-08",
      "number": "08",
      "title": "Query Parameters",
      "khmerTitle": "ការប្រើប្រាស់ Query Parameters សម្រាប់ Filter & Sort",
      "type": "lab",
      "codeLanguage": "javascript",
      "summary": "Params សំណួរលេចឡើងបន្ទាប់ពីកំណត់ព្រំដែន \\`?\\` ក្នុង URL (\\`/products?category=shoes&limit=10\\`) ។ ពួកវាត្រូវបានប្រើសម្រាប់ជម្រើសដែលមិនមែនជាឋានានុក្រម ដូចជាការត្រង Search Sorting និងការបញ្ចូលទំព័រ។",
      "codeSnippet": "const url = new URL(\"https://api.com/items?category=books&minPrice=15&inStock=true\");\n\nconst category = url.searchParams.get(\"category\"); // \"books\"\nconst minPrice = Number(url.searchParams.get(\"minPrice\")); // 15\nconst inStock = url.searchParams.get(\"inStock\") === \"true\"; // true\n\nconsole.log({ category, minPrice, inStock });"
    },
    {
      "id": "M05-09",
      "number": "09",
      "title": "Route Parameters",
      "khmerTitle": "ការប្រើប្រាស់ Route Parameters សម្រាប់កំណត់អត្តសញ្ញាណ",
      "type": "concept",
      "codeLanguage": "javascript",
      "summary": "Params ផ្លូវ (ឧ. \\`/users/:id\\` ឬ \\`/orders/:orderId\\`) ចាប់យកផ្នែកថាមវន្តដោយផ្ទាល់ពីផ្លូវ URL ដោយកំណត់អត្តសញ្ញាណធនធានពិសេសជាក់លាក់។",
      "codeSnippet": "/* Resource URL Strategy:\n   Route Parameter (Specific Resource ID):\n   GET /api/v1/orders/ORD-9821\n   \n   Query Parameter (Filter / Search Criteria):\n   GET /api/v1/orders?status=shipped&limit=20\n*/"
    },
    {
      "id": "M05-10",
      "number": "10",
      "title": "Request Body",
      "khmerTitle": "ការទទួលទិន្នន័យ Request Body តាមរយៈ Streams",
      "type": "lab",
      "codeLanguage": "javascript",
      "summary": "HTTP POST, PUT, និង PATCH ស្នើសុំបញ្ជូន Payload នៅក្នុងផ្នែក Request ។ នៅក្នុង Node.js ដើម Request Object (req) គឺជាការស្ទ្រីមដែលជំរុញដោយព្រឹត្តិការណ៍ដែលបញ្ចេញ \\`'data'\\` បណ្តុំបណ្តុំបណ្តោះអាសន្នរហូតដល់ព្រឹត្តិការណ៍ \\`'end'\\` ឆេះ។",
      "codeSnippet": "import http from \"node:http\";\n\nhttp.createServer((req, res) => {\n  if (req.method === \"POST\") {\n    let body = \"\";\n    req.on(\"data\", chunk => {\n      body += chunk.toString(); // Collect stream chunks\n    });\n    req.on(\"end\", () => {\n      console.log(\"Complete Body received:\", body);\n      res.end(\"Body parsed successfully\");\n    });\n  }\n});"
    },
    {
      "id": "M05-11",
      "number": "11",
      "title": "JSON",
      "khmerTitle": "ទម្រង់ទិន្នន័យ JSON ក្នុង Web APIs",
      "type": "concept",
      "codeLanguage": "javascript",
      "summary": "JavaScript Object Notation (JSON) គឺជាទម្រង់ផ្លាស់ប្តូរទិន្នន័យជាសកល ដែលប្រើដោយ RESTful APIs ទំនើប។ Node.js ញែក និងចងខ្សែ JSON ដោយ `JSON.parse()` និង `JSON.stringify()` ។",
      "codeSnippet": "function parseJsonSafely(rawJson) {\n  try {\n    return { data: JSON.parse(rawJson), error: null };\n  } catch (err) {\n    return { data: null, error: \"Invalid JSON format\" };\n  }\n}"
    },
    {
      "id": "M05-12",
      "number": "12",
      "title": "Content-Type",
      "khmerTitle": "សារៈសំខាន់នៃ Header Content-Type",
      "type": "concept",
      "codeLanguage": "javascript",
      "summary": "Headers \\`Content-Type\\` ជូនដំណឹងដល់អ្នកទទួលពីរបៀបបកស្រាយបៃបៃគោលពីរនៅក្នុងផ្នែកសំណើរ ឬការឆ្លើយតប (ឧ. \\`application/json\\`, \\`text/html\\`, \\`multipart/form-data\\`, \\`application/pdf\\`)។",
      "codeSnippet": "// Sending JSON\nres.writeHead(200, { \"Content-Type\": \"application/json\" });\nres.end(JSON.stringify({ success: true }));\n\n// Sending HTML\n// res.writeHead(200, { \"Content-Type\": \"text/html\" });\n// res.end(\"<h1>Welcome to API</h1>\");"
    },
    {
      "id": "M05-13",
      "number": "13",
      "title": "Creating an HTTP Server",
      "khmerTitle": "ការបង្កើត HTTP Server តាមរយៈ Native 'node:http'",
      "type": "lab",
      "codeLanguage": "javascript",
      "summary": "ម៉ូឌុល \\`node:http\\` ដែលភ្ជាប់មកជាមួយរបស់ Node ផ្តល់ \\`createServer()\\` ដែលអនុញ្ញាតឱ្យអ្នកធ្វើភ្លាមៗនូវServer TCP ដែលកំពុងស្តាប់ ដែលបញ្ជូនការភ្ជាប់ចូលដើម្បីស្នើសុំCallbacksពីអ្នកដោះស្រាយ។",
      "codeSnippet": "import http from \"node:http\";\n\nconst PORT = process.env.PORT || 4000;\n\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { \"Content-Type\": \"application/json\" });\n  res.end(JSON.stringify({ message: \"Hello from native Node.js HTTP server!\" }));\n});\n\nserver.listen(PORT, () => {\n  console.log(`Server running at http://localhost:${PORT}`);\n});"
    },
    {
      "id": "M05-14",
      "number": "14",
      "title": "Handling Requests",
      "khmerTitle": "ការគ្រប់គ្រងផ្លូវ Requests (Basic Routing)",
      "type": "lab",
      "codeLanguage": "javascript",
      "summary": "ការបញ្ជូន Request ដែលចូលមកក្នុង HTTP ឆៅតម្រូវឱ្យវាយតម្លៃលក្ខខណ្ឌ \\`req.url\\` និង \\`req.method\\` ដើម្បីបញ្ជូនចរាចរទៅកាន់ប្លុកBusiness Logicសមស្រប ដោយគូសបញ្ជាក់ពីមូលហេតុដែលក្របខ័ណ្ឌដូចជា Express ត្រូវបានបង្កើតឡើង។",
      "codeSnippet": "import http from \"node:http\";\n\nconst server = http.createServer((req, res) => {\n  const { pathname } = new URL(req.url, `http://${req.headers.host}`);\n\n  if (req.method === \"GET\" && pathname === \"/\") {\n    res.writeHead(200, { \"Content-Type\": \"application/json\" });\n    return res.end(JSON.stringify({ status: \"API Home\" }));\n  }\n\n  if (req.method === \"GET\" && pathname === \"/api/health\") {\n    res.writeHead(200, { \"Content-Type\": \"application/json\" });\n    return res.end(JSON.stringify({ healthy: true, uptime: process.uptime() }));\n  }\n\n  // 404 Fallback\n  res.writeHead(404, { \"Content-Type\": \"application/json\" });\n  res.end(JSON.stringify({ error: \"Route Not Found\" }));\n});"
    },
    {
      "id": "M05-15",
      "number": "15",
      "title": "Sending Responses",
      "khmerTitle": "ការបញ្ជូនទិន្នន័យត្រឡប់ទៅកាន់ Client",
      "type": "lab",
      "codeLanguage": "javascript",
      "summary": "ការបញ្ចប់ និងការផ្ញើ Response ទៅកាន់ Client ពាក់ព័ន្ធនឹងការសរសេរកូដស្ថានភាព Headers និងការដាក់ Serialization តួមុនពេលបិទការផ្សាយជាមួយ \\`res.end()\\`។",
      "codeSnippet": "import http from \"node:http\";\n\nconst server = http.createServer((req, res) => {\n  try {\n    const payload = { data: [1, 2, 3], timestamp: new Date() };\n    res.writeHead(200, { \"Content-Type\": \"application/json\" });\n    res.end(JSON.stringify(payload));\n  } catch (err) {\n    res.writeHead(500, { \"Content-Type\": \"application/json\" });\n    res.end(JSON.stringify({ error: \"Internal Server Error\" }));\n  }\n});"
    }
  ]
};
