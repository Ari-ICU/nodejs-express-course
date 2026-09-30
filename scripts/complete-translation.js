const fs = require("fs");
const path = require("path");

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// Master technical term restoration dictionary
// Restores machine-translated Khmer words back to standard professional English terms
function restoreTechnicalTerms(text) {
  if (!text) return text;

  return text
    // Architecture & Core Roles
    .replace(/កម្មវិធីខាងក្រោយ|ផ្នែកខាងក្រោយ/g, "Backend")
    .replace(/កម្មវិធីខាងមុខ|ផ្នែកខាងមុខ/g, "Frontend")
    .replace(/ការអភិវឌ្ឍន៍\s*Backend|ការអភិវឌ្ឍន៍Backend/g, "ការអភិវឌ្ឍ Backend")
    .replace(/ការអភិវឌ្ឍន៍\s*Frontend|ការអភិវឌ្ឍន៍Frontend/g, "ការអភិវឌ្ឍ Frontend")
    .replace(/ការអភិវឌ្ឍន៍/g, "ការអភិវឌ្ឍ")
    .replace(/ម៉ាស៊ីនមេ/g, "Server")
    .replace(/ម៉ាស៊ីនភ្ញៀវ/g, "Client")
    .replace(/ផ្នែកខាង\s*Server|Server\s*ខាង/g, "Server-side")
    .replace(/ផ្នែកខាង\s*Client|Client\s*ខាង/g, "Client-side")
    .replace(/កម្មវិធីរុករក/g, "Browser")
    .replace(/ខូគី\s*Browser|Browser\s*Cookies/g, "Browser Cookies")
    .replace(/ខូគី/g, "Cookies")
    .replace(/ចំណុចបញ្ចប់/g, "Endpoints")
    
    // Express & Architecture Components
    .replace(/ឧបករណ៍កណ្តាល|គ្រឿងកណ្តាល|មជ្ឈិមសម័យ/g, "Middleware")
    .replace(/ឧបករណ៍បញ្ជា/g, "Controllers")
    .replace(/សេវាកម្ម/g, "Services")
    .replace(/កិរិយាសព្ទ\s*HTTP|កិរិយាស័ព្ទ\s*HTTP/g, "HTTP Verbs")
    .replace(/ស្រោមសំបុត្រឆ្លើយតប|ស្រោមសំបុត្រ/g, "Response Envelope")
    .replace(/បឋមកថា/g, "Headers")
    .replace(/ខ្សែអក្សរសំណួរ/g, "Query String")
    .replace(/ប៉ារ៉ាម៉ែត្រ/g, "Params")
    .replace(/សុពលភាពរាងកាយ/g, "Body Validation")
    .replace(/សុពលភាព/g, "Validation")
    .replace(/អនាម័យ/g, "Sanitization")
    .replace(/អ្នកដោះស្រាយកំហុស/g, "Error Handler")
    .replace(/ការគ្រប់គ្រងកំហុស/g, "Error Handling")
    .replace(/ការកត់ត្រា/g, "Logging")
    .replace(/ការចាក់ថ្នាំអាស្រ័យ/g, "Dependency Injection")
    
    // Database & Mongoose
    .replace(/មូលដ្ឋានទិន្នន័យ/g, "Database")
    .replace(/កម្រងឯកសារ|ការប្រមូល/g, "Collections")
    .replace(/គ្រោងការណ៍/g, "Schema")
    .replace(/ចំនួនប្រជាជន/g, "Population")
    .replace(/ត្រាពេលវេលា/g, "Timestamps")
    .replace(/និម្មិត/g, "Virtuals")
    .replace(/ការចាក់\s*NoSQL/g, "NoSQL Injection")
    
    // Async & Event Loop
    .replace(/រង្វិលជុំព្រឹត្តិការណ៍|ព្រឹត្តិការណ៍រង្វិលជុំ/g, "Event Loop")
    .replace(/ការហៅត្រឡប់/g, "Callbacks")
    .replace(/ការសន្យា/g, "Promises")
    .replace(/អសមកាលកម្ម\/រង់ចាំ/g, "Async/Await")
    .replace(/អសមកាលកម្ម/g, "Asynchronous")
    .replace(/សមកាលកម្ម/g, "Synchronous")
    .replace(/ខ្សែស្រឡាយ/g, "Threads")
    .replace(/មីក្រូកិច្ចការ/g, "Microtasks")
    
    // Security & Auth
    .replace(/ការផ្ទៀងផ្ទាត់ភាពត្រឹមត្រូវ|ការផ្ទៀងផ្ទាត់/g, "Authentication")
    .replace(/ការអនុញ្ញាតសិទ្ធិ|ការអនុញ្ញាត/g, "Authorization")
    .replace(/មួកសុវត្ថិភាព/g, "Helmet")
    .replace(/ការកំណត់អត្រា/g, "Rate Limiting")
    .replace(/ឃ្លាំងសម្ងាត់/g, "Cache")
    
    // API Data Operations
    .replace(/ការសរសេរទំព័រ|ការបង់ទំព័រ/g, "Pagination")
    .replace(/តម្រង/g, "Filter")
    .replace(/ការស្វែងរក/g, "Search")
    .replace(/ការតម្រៀប/g, "Sorting")
    .replace(/កូដប្រភព/g, "Source Code")
    .replace(/ទម្រង់បញ្ចូល/g, "Form Inputs")
    .replace(/ចំណុចប្រទាក់អ្នកប្រើ/g, "UI (User Interface)")
    .replace(/ចំណុចប្រទាក់/g, "Interface")
    .replace(/ការបដិសេធដែលមិនបានដោះស្រាយ/g, "Unhandled Rejections")
    .replace(/ការលើកលែងដែលមិនបានចាប់បាន/g, "Uncaught Exceptions");
}

async function translateWithGoogle(text) {
  const q = encodeURIComponent(text);
  const url = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=en&tl=km&q=${q}`;
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  });

  if (!res.ok) throw new Error(`Google returned HTTP ${res.status}`);
  const data = await res.json();
  if (Array.isArray(data) && typeof data[0] === "string") {
    return data[0];
  }
  if (Array.isArray(data) && Array.isArray(data[0])) {
    return data[0].map((item) => (Array.isArray(item) ? item[0] : item)).join("");
  }
  return null;
}

async function translateWithMyMemory(text) {
  const q = encodeURIComponent(text.slice(0, 500));
  const url = `https://api.mymemory.translated.net/get?q=${q}&langpair=en|km`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });
  if (!res.ok) throw new Error(`MyMemory returned HTTP ${res.status}`);
  const data = await res.json();
  return data?.responseData?.translatedText || null;
}

// Master list of technical terms to strictly preserve
const TECHNICAL_TERMS = [
  "JavaScript", "TypeScript", "Node.js", "Express.js", "Express", "npm", "npx",
  "Backend", "Frontend", "Fullstack", "Client", "Server", "Browser", "Database",
  "REST API", "RESTful", "REST", "API", "APIs", "Endpoint", "Endpoints",
  "Router", "Routes", "Routing", "Middleware", "Controller", "Controllers",
  "Service", "Services", "Repository", "Model", "Schema",
  "HTTP", "HTTPS", "Request", "Response", "Headers", "Body", "Payload",
  "Params", "Query", "Status Code", "JSON", "BSON", "ObjectId",
  "MongoDB", "PostgreSQL", "MySQL", "Redis", "Mongoose", "Atlas",
  "Authentication", "Authorization", "JWT", "Bearer Token", "bcrypt",
  "Cookies", "HttpOnly", "Session", "Sessions", "CORS", "Helmet", "Rate Limit",
  "Event Loop", "libuv", "Callbacks", "Callback", "Promises", "Promise",
  "Async/Await", "Asynchronous", "Synchronous", "Streams", "Buffers",
  "Docker", "Dockerfile", "Docker Compose", "CI/CD", "Nginx", "PM2",
  "Postman", "Newman", "Swagger", "OpenAPI", "Vitest", "Supertest",
  "Zod", "Joi", "Multer", "Nodemailer", "Socket.io", "WebSocket", "WebSockets",
  "BullMQ", "CRUD", "ACID", "Pagination", "Filter", "Sorting", "Cache", "Caching",
  "CommonJS", "ES Modules", "Microtasks", "Macrotasks"
];

async function translateText(rawText) {
  if (!rawText || !rawText.trim()) return rawText;
  if (/[\u1780-\u17FF]/.test(rawText)) {
    // Already Khmer, just refine technical terms!
    return restoreTechnicalTerms(rawText);
  }

  // 1. Protect inline backtick code snippets
  const codeTokens = [];
  let masked = rawText.replace(/`([^`]+)`/g, (_, code) => {
    codeTokens.push(code);
    return `__CODE_${codeTokens.length - 1}__`;
  });

  // 2. Protect major technical terms
  const techTokens = [];
  for (const term of TECHNICAL_TERMS) {
    const termRegex = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "g");
    masked = masked.replace(termRegex, (m) => {
      techTokens.push(m);
      return `__TECH_${techTokens.length - 1}__`;
    });
  }

  let translated = null;

  // Try Google clients5 with retry
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      translated = await translateWithGoogle(masked);
      if (translated) break;
    } catch (err) {
      await sleep(500 * (attempt + 1));
    }
  }

  // Fallback to MyMemory if needed
  if (!translated || !/[\u1780-\u17FF]/.test(translated)) {
    try {
      translated = await translateWithMyMemory(masked);
    } catch (_) {}
  }

  if (!translated) {
    console.warn(`Translation failed for text: "${rawText.slice(0, 40)}..."`);
    return rawText;
  }

  // 3. Restore protected technical terms
  techTokens.forEach((term, i) => {
    translated = translated.replace(new RegExp(`__TECH_${i}__`, "g"), term);
  });

  // 4. Restore protected code tokens
  codeTokens.forEach((code, i) => {
    translated = translated.replace(new RegExp(`__CODE_${i}__`, "g"), `\`${code}\``);
  });

  // 5. Cleanse any machine-translated Khmer words back to standard technical English
  return restoreTechnicalTerms(translated);
}

function extractMetaRange(content) {
  const startIdx = content.indexOf("export const meta = {");
  if (startIdx === -1) return null;
  const endIdx = content.indexOf("};", startIdx);
  if (endIdx === -1) return null;
  return { start: startIdx, end: endIdx + 2 };
}

async function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  const metaRange = extractMetaRange(content);
  if (!metaRange) return false;

  let metaText = content.slice(metaRange.start, metaRange.end);
  let changed = false;

  const fields = ["summary", "tip", "objective", "expectedOutcome"];

  for (const field of fields) {
    const regex = new RegExp(`(${field}:\\s*)(?:` + "`([\\s\\S]*?)`|" + '"((?:[^"\\\\]|\\\\.)*)"' + ")", "g");

    const matches = [...metaText.matchAll(regex)];
    for (const match of matches) {
      const fullMatch = match[0];
      const prefix = match[1];
      const isBacktick = match[2] !== undefined;
      const rawVal = isBacktick ? match[2] : match[3].replace(/\\"/g, '"').replace(/\\n/g, "\n");

      let processedVal = null;
      if (!/[\u1780-\u17FF]/.test(rawVal)) {
        // Needs translation
        await sleep(120);
        processedVal = await translateText(rawVal);
      } else {
        // Already Khmer: ensure technical terms are restored to English!
        const restored = restoreTechnicalTerms(rawVal);
        if (restored !== rawVal) {
          processedVal = restored;
        }
      }

      if (processedVal && processedVal !== rawVal) {
        let replacement;
        if (isBacktick || processedVal.includes("\n") || field === "summary") {
          const safeText = processedVal.replace(/`/g, "\\`");
          replacement = `${prefix}\`${safeText}\``;
        } else {
          const safeText = processedVal.replace(/"/g, '\\"').replace(/\n/g, "\\n");
          replacement = `${prefix}"${safeText}"`;
        }

        metaText = metaText.replace(fullMatch, () => replacement);
        changed = true;
      }
    }
  }

  if (changed) {
    const updatedContent = content.slice(0, metaRange.start) + metaText + content.slice(metaRange.end);
    fs.writeFileSync(filePath, updatedContent, "utf8");
    return true;
  }
  return false;
}

async function main() {
  const contentDir = path.join(process.cwd(), "src/content");
  const allFiles = [];

  function walk(dir) {
    for (const item of fs.readdirSync(dir)) {
      const full = path.join(dir, item);
      if (fs.statSync(full).isDirectory()) {
        walk(full);
      } else if (item.endsWith(".mdx")) {
        allFiles.push(full);
      }
    }
  }

  walk(contentDir);
  allFiles.sort();

  console.log(`Auditing and processing all ${allFiles.length} MDX files...`);
  console.log("Rule: Keep all technical words in English, translate explanations to natural Khmer.");

  let updatedCount = 0;
  for (let i = 0; i < allFiles.length; i++) {
    const f = allFiles[i];
    const rel = path.relative(process.cwd(), f);
    process.stdout.write(`[${i + 1}/${allFiles.length}] ${rel}... `);
    const updated = await processFile(f);
    if (updated) {
      updatedCount++;
      console.log("UPDATED ✓");
    } else {
      console.log("CLEAN");
    }
  }

  console.log(`\nComplete! Updated ${updatedCount} / ${allFiles.length} files.`);
}

main().catch(console.error);
