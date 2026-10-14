/**
 * translations-m16-m20.mjs
 * Structured Khmer summaries with bullet points (- ) for Modules 16 through 20.
 * Follows AGENTS.md guidelines: keep technical terms in English, use natural Khmer for connective narrative.
 */

export const TRANSLATIONS_16_20 = {
  // ── M16: Authentication & Authorization ────────────────────────────────────
  "M16-01": "ភាពខុសគ្នាសំខាន់រវាង Authentication និង Authorization ក្នុងស្ថាបត្យកម្ម Backend៖\n\n- **Authentication (AuthN) — «តើអ្នកជានរណា?» (Who are you?)**៖ ផ្ទៀងផ្ទាត់អត្តសញ្ញាណអ្នកប្រើប្រាស់តាមរយៈ Credentials (Email, Password, Token)។ បើមិនត្រឹមត្រូវ Server ឆ្លើយតប `401 Unauthorized`។\n- **Authorization (AuthZ) — «តើអ្នកមានសិទ្ធិធ្វើអ្វីខ្លះ?» (What can you do?)**៖ វាយតម្លៃលើ Roles និង Permissions ធៀបនឹង Resources (ដូចជា Admin, Instructor, Student)។ បើគ្មានសិទ្ធិ Server ឆ្លើយតប `403 Forbidden`។\n- **លំដាប់លំដោយ (Execution Order)**៖ ក្នុង Backend Flow ត្រូវតែឆ្លងកាត់ Authentication ឱ្យជោគជ័យជាមុនសិន ទើប Authorization អាចចាប់ផ្តើមវាយតម្លៃបាន។",

  "M16-02": "គោលការណ៍គ្រឹះនៃ Password Hashing ក្នុងប្រព័ន្ធសុវត្ថិភាព៖\n\n- **One-Way Cryptographic Function**៖ បំប្លែង Plaintext Password ទៅជា String ប្រវែងថេរ ដែលមិនអាចត្រឡប់ក្រោយវិញបាន (Irreversible)។\n- **ខុសគ្នាពី Encryption**៖ Encryption គឺជា Two-way (អាច Decrypt មកវិញដោយ Secret Key) ចំណែក Password ត្រូវតែប្រើ One-way Hashing ដាច់ខាត។\n- **ហាមដាច់ខាត**៖ មិនត្រូវរក្សាទុក Password ជា Plaintext ឬប្រើ Fast Hashes (MD5, SHA-1) ឡើយ ព្រោះងាយរងគ្រោះដោយ GPU Brute-force និង Rainbow Tables។",

  "M16-03": "ការប្រើប្រាស់បណ្ណាល័យ bcrypt ក្នុង Node.js៖\n\n- **Adaptive Hashing**៖ ផ្អែកលើ Blowfish Cipher ដែលមាន Configurable Work Factor (Cost ឬ Salt Rounds) អាចបង្កើនភាពស្មុគស្មាញតាមសម័យកាល Hardware។\n- **Recommended Cost Factor**៖ ប្រើ `12 rounds` សម្រាប់ Production (ដំណើរការប្រហែល 250-350ms ក្នុងមួយ Password)។\n- **Node.js Implementations**៖ ប្រើប្រាស់ `bcryptjs` (Pure JavaScript ងាយស្រួល Deploy) ឬ `bcrypt` (C++ Native Bindings ដំណើរការលឿន)។",

  "M16-04": "យន្តការ Salt និង Hashing ក្នុង bcrypt៖\n\n- **Salt គឺជាអ្វី?**៖ គឺជា Cryptographic Random String ដែលបង្កើតឡើងសម្រាប់បន្ថែមជាមួយ Password មុនពេល Hash។\n- **ទប់ស្កាត់ការវាយប្រហារ**៖ ការពារ Rainbow Tables និង Dictionary Attacks ទោះបី Users ពីរនាក់ប្រើ Password ដូចគ្នាក៏ Hash ខុសគ្នាដែរ។\n- **Single String Format**៖ bcrypt បង្កប់ Salt ទៅក្នុង Hashed String តែមួយ (`$2a$12$...`) ដែលធ្វើឱ្យការផ្ទៀងផ្ទាត់តាម `bcrypt.compare()` មានភាពងាយស្រួល។",

  "M16-05": "លំហូរនៃការចុះឈ្មោះអ្នកប្រើប្រាស់ (User Registration Flow)៖\n\n- **ទទួល និង Validate ទិន្នន័យ**៖ ទទួល Email និង Password ពី Request Body រួច Validate តាម Zod Schema។\n- **ត្រួតពិនិត្យ Email ស្ទួន**៖ ស្វែងរកក្នុង MongoDB ប្រសិនបើមានរួចហើយ ត្រូវឆ្លើយតប `409 Conflict`។\n- **Hash Password មុនពេល Save**៖ ប្រើ Mongoose Pre-save Hook ជាមួយ bcrypt ដើម្បី Hash Password ដោយស្វ័យប្រវត្តិ។\n- **លាក់ Password ពី Response**៖ កំណត់ `select: false` ក្នុង Schema ដើម្បីកុំឱ្យ Password ធ្លាយទៅកាន់ Client។",

  "M16-06": "លំហូរនៃការចូលប្រើប្រាស់ (User Login Flow)៖\n\n- **ទទួល Credentials**៖ ទទួល Email និង Password ពី Client។\n- **ស្វែងរក User ជាមួយ Password**៖ ប្រើ `User.findOne({ email }).select('+password')` ដើម្បីទាញយក Password Hash។\n- **ផ្ទៀងផ្ទាត់ជាមួយ bcrypt**៖ ប្រើ `await bcrypt.compare(password, user.password)`។ បើខុស បោះសារ Generic 'Invalid email or password' ដើម្បីការពារ User Enumeration។\n- **បង្កើត Token & Session**៖ បង្កើត JWT Access Token រួចបញ្ជូនត្រឡប់តាម JSON Body ឬ HttpOnly Cookie។",

  "M16-07": "រចនាសម្ព័ន្ធ និងទ្រឹស្តីនៃ JWT (JSON Web Token - RFC 7519)៖\n\n- **Header**៖ បញ្ជាក់ពី Algorithm (ដូចជា `HS256`) និង Token Type (`JWT`)។\n- **Payload**៖ ផ្ទុក Claims សំខាន់ៗដូចជា `userId`, `role`, និង `exp` (Expiration Time)។\n- **Signature**៖ បង្កើតឡើងដោយការ Hash (Header + Payload) ជាមួយ Secret Key របស់ Server ដើម្បីធានាភាពត្រឹមត្រូវ។\n- **Stateless Architecture**៖ Server មិនចាំបាច់ Query Database សម្រាប់រាល់ Request ឡើយ ជួយបង្កើន Performance ខ្ពស់។",

  "M16-08": "ការប្រើប្រាស់ Access Tokens ក្នុង API Security៖\n\n- **Short-lived Lifetime**៖ មានអាយុកាលខ្លី (ជាទូទៅ 15 នាទី ទៅ 1 ម៉ោង) ដើម្បីកាត់បន្ថយហានិភ័យនៅពេល Token ត្រូវបានលួច។\n- **Stateless Authorization**៖ ផ្ទុក User ID និង Role ក្នុង Payload ស្រាប់ ធ្វើឱ្យ Protected Routes អាចផ្ទៀងផ្ទាត់សិទ្ធិបានភ្លាមៗ។\n- **Bearer Scheme**៖ បញ្ជូនតាម HTTP Header ស្តង់ដារ `Authorization: Bearer <access_token>`។",

  "M16-09": "យន្តការ Refresh Tokens និង Token Rotation៖\n\n- **Long-lived Lifetime**៖ មានអាយុកាលវែង (7 ថ្ងៃ ទៅ 30 ថ្ងៃ) ប្រើសម្រាប់ស្នើសុំ Access Token ថ្មីដោយមិនបាច់ឱ្យ User វាយ Password ឡើងវិញ។\n- **HttpOnly Storage**៖ រក្សាទុកក្នុង HttpOnly Cookie ដោយសុវត្ថិភាព មិនអាចអានដោយ JavaScript ឡើយ។\n- **Token Rotation & Revocation**៖ ប្តូរ Refresh Token ថ្មីរាល់ពេលហៅ Refresh Endpoint និងអាច Revoke Token ចេញពី Database ភ្លាមៗពេល Logout។",

  "M16-10": "ការការពារ Credential ជាមួយ HttpOnly Cookies៖\n\n- **httpOnly: true**៖ ការពារ JavaScript លើ Frontend មិនឱ្យអាន Token ជួយទប់ស្កាត់ការលួច Token តាមរយៈ XSS Attacks។\n- **secure: true**៖ អនុញ្ញាតឱ្យ Browser បញ្ជូន Cookie តែតាមបណ្តាញ HTTPS ប៉ុណ្ណោះ។\n- **sameSite: 'strict' ឬ 'lax'**៖ ការពារការវាយប្រហារ Cross-Site Request Forgery (CSRF) ពី Website ខាងក្រៅ។",

  "M16-11": "យន្តការ Logout និង Cookie Invalidation៖\n\n- **សម្អាត Client Cookie**៖ Server កំណត់ Expire Date ទៅកាន់អតីតកាល (`res.clearCookie('token')` ឬ `res.cookie('token', '', { expires: new Date(0) })`)។\n- **Revoke Refresh Token**៖ លុប Refresh Token ចេញពី MongoDB ឬ Redis Store។\n- **Blacklist Access Token**៖ សម្រាប់ Enterprise Security រក្សាទុក Access Token ក្នុង Redis Blacklist រហូតដល់វា Expire។",

  "M16-12": "ការគ្រប់គ្រង Token Expiration និង Error Handling៖\n\n- **TokenExpiredError**៖ កើតឡើងនៅពេល `jwt.verify()` ឃើញពេលវេលាបច្ចុប្បន្នលើស `exp` timestamp។\n- **JsonWebTokenError**៖ កើតឡើងនៅពេល Signature មិនត្រឹមត្រូវ ឬ Token មានទម្រង់ខូចខាត (Malformed)។\n- **Standard Error Response**៖ ចាប់ Error ទាំងនេះក្នុង Error Middleware ហើយឆ្លើយតប `401 Unauthorized` ជាមួយ Error Code `TOKEN_EXPIRED` ដើម្បីឱ្យ Frontend ហៅ Refresh Flow។",

  "M16-13": "ការបង្កើត Authentication Middleware (`protect`)៖\n\n- **ទាញយក Token**៖ ចាប់យក JWT ពី `Authorization: Bearer <token>` Header ឬពី Request Cookies។\n- **ផ្ទៀងផ្ទាត់ Signature**៖ ហៅ `jwt.verify(token, process.env.JWT_SECRET)` ដើម្បី Decode Payload។\n- **ស្វែងរក User ក្នុង Database**៖ ពិនិត្យមើលថា User នៅមានវត្តមាន និងមិនទាន់ត្រូវបានលុប ឬ Ban។\n- **ភ្ជាប់ទៅ req.user**៖ ភ្ជាប់ User Document ទៅ `req.user` សម្រាប់ឱ្យ Controllers បន្ទាប់ប្រើប្រាស់។",

  "M16-14": "ការរៀបចំ Protected Routes ក្នុង Express Router៖\n\n- **Per-route Protection**៖ ដាក់ Middleware លើ Route ជាក់លាក់ `router.post('/courses', protect, createCourse)`។\n- **Router-wide Protection**៖ ប្រើ `router.use(protect)` នៅដើម Router ដើម្បីការពាររាល់ Endpoints ទាំងអស់ដែលនៅខាងក្រោមវា។\n- **Clean Architecture**៖ បំបែក Public Routes (Login, Register) និង Protected Routes (Profile, Courses) ឱ្យដាច់ពីគ្នា។",

  // ── M17: Role-Based Access Control (RBAC) ──────────────────────────────────
  "M17-01": "ការកំណត់ User Roles ក្នុង Mongoose Schema៖\n\n- **Enum Validation**៖ កំណត់បញ្ជី Roles ជាក់លាក់ក្នុង Schema ដូចជា `enum: ['student', 'instructor', 'admin']`។\n- **Default Role**៖ កំណត់ Default Value ជា `'student'` សម្រាប់រាល់គណនីដែលទើបចុះឈ្មោះថ្មី។\n- **Mass Assignment Protection**៖ ការពារ Field `role` មិនឱ្យ User កែប្រែដោយផ្ទាល់តាមរយៈ Update Profile Request ឡើយ។",

  "M17-02": "គោលការណ៍គ្រឹះនៃ Role-Based Access Control (RBAC)៖\n\n- **Roles**៖ តួនាទីជាក់លាក់ក្នុងស្ថាប័ន (Student, Instructor, Admin)។\n- **Permissions**៖ សិទ្ធិធ្វើសកម្មភាពលើ Resources (Read, Create, Update, Delete)។\n- **Scalable Management**៖ Permissions ត្រូវបានភ្ជាប់ជាមួយ Roles ហើយ Users ទទួលបានសិទ្ធិតាមរយៈ Role របស់ខ្លួន ជួយកាត់បន្ថយភាពស្មុគស្មាញក្នុង Enterprise Apps។",

  "M17-03": "ការគ្រប់គ្រងសិទ្ធិលម្អិត (Fine-Grained Permissions)៖\n\n- **Action-based Permissions**៖ កំណត់សិទ្ធិលើសកម្មភាពជាក់លាក់ ដូចជា `course:create`, `course:publish`, `user:ban`។\n- **High Granularity**៖ ផ្តល់ភាពបត់បែនខ្ពស់ជាង Role តែមួយមុខ អនុញ្ញាតឱ្យបង្កើត Custom Roles បានយ៉ាងងាយស្រួល។\n- **Decoupled Architecture**៖ កូដត្រួតពិនិត្យសិទ្ធិមិនបាច់កែប្រែទេ នៅពេលមានការផ្លាស់ប្តូរតួនាទីក្នុងស្ថាប័ន។",

  "M17-04": "ការការពារ Admin Routes ដោយឡែក៖\n\n- **Dedicated Admin Endpoints**៖ បម្រុងទុកសម្រាប់តែ Admin ដូចជា `/api/v1/admin/users` ឬ `/api/v1/admin/analytics`។\n- **Dual-layer Protection**៖ ត្រូវឆ្លងកាត់ទាំង `protect` (Authentication) និង `restrictTo('admin')` (Authorization)។\n- **Strict Error Envelope**៖ ប្រសិនបើ User ធម្មតាព្យាយាមហៅ Server ឆ្លើយតប `403 Forbidden` ភ្លាមៗ។",

  "M17-05": "ការរៀបចំ User Profile Routes និង Self-Service Actions៖\n\n- **Self-Service Endpoints**៖ Endpoints សម្រាប់ User គ្រប់គ្រងគណនីផ្ទាល់ខ្លួន ដូចជា `/api/v1/users/me`។\n- **ការពារ IDOR (Insecure Direct Object Reference)**៖ ប្រើប្រាស់ `req.user.id` ពី Token ដោយមិនពឹងផ្អែកលើ `:id` ពី URL ឡើយ។\n- **Security Boundary**៖ ទប់ស្កាត់ការមើល ឬកែប្រែ Profile របស់អ្នកដទៃដោយខុសច្បាប់។",

  "M17-06": "ការបង្កើត `restrictTo(...roles)` Middleware Factory៖\n\n- **Higher-Order Function**៖ ទទួល Roles ជា Arguments (ឧ. `restrictTo('admin', 'instructor')`) ហើយត្រឡប់ Middleware Function។\n- **Role Verification**៖ ពិនិត្យមើល `if (!roles.includes(req.user.role))`។\n- **HTTP 403 Response**៖ បោះ `AppError('Forbidden: You do not have permission', 403)` ប្រសិនបើតួនាទីមិនត្រូវគ្នា។",

  "M17-07": "ការផ្ទៀងផ្ទាត់កម្មសិទ្ធិនៃទិន្នន័យ (Resource Ownership Verification)៖\n\n- **គោលបំណង**៖ ធានាថា Instructor អាចកែប្រែ ឬលុបបានតែ Course ដែលខ្លួនបានបង្កើតប៉ុណ្ណោះ។\n- **Ownership Check**៖ ប្រៀបធៀប `course.instructor.toString() === req.user._id.toString()` មុននឹងបន្ត។\n- **Admin Override**៖ អនុញ្ញាតឱ្យ Admin មានសិទ្ធិ Bypass ដើម្បីជួយដោះស្រាយបញ្ហាគ្រប់គ្រងទិន្នន័យ។",

  "M17-08": "ស្ថាបត្យកម្មរចនា API ប្រកបដោយសុវត្ថិភាពតាមតួនាទី៖\n\n- **Middleware Chain**៖ រៀបចំ Pipeline ច្បាស់លាស់៖ `authenticate` -> `authorize(roles)` -> `checkOwnership` -> `controller`។\n- **Audit Logging**៖ កត់ត្រារាល់សកម្មភាពសំខាន់ៗរបស់ Admin (Admin Actions) សម្រាប់តាមដានសុវត្ថិភាព។\n- **Least Privilege Principle**៖ ផ្តល់សិទ្ធិតិចបំផុតត្រឹមតែកម្រិតចាំបាច់សម្រាប់បំពេញការងាររបស់អ្នកប្រើប្រាស់។",

  // ── M18: Security Best Practices ───────────────────────────────────────────
  "M18-01": "បញ្ហាសុវត្ថិភាពទូទៅក្នុង Web API ផ្អែកតាម OWASP API Security Top 10៖\n\n- **BOLA (Broken Object Level Authorization)**៖ User ចូលកែប្រែ Resource អ្នកដទៃតាមរយៈ IDOR។\n- **Broken Authentication**៖ Token អស់សុពលភាព ឬ Weak Secret Keys ដែលអាចទម្លុះបាន។\n- **Mass Assignment & Injection**៖ ការបញ្ចូល Fields ឬ NoSQL Operators ដោយគ្មានការ Validate ត្រឹមត្រូវ។\n- **Defense-in-Depth**៖ អនុវត្តយន្តការការពារច្រើនជាន់ទូទាំងប្រព័ន្ធ ដើម្បីកាត់បន្ថយហានិភ័យ។",

  "M18-02": "ការកំណត់ Cross-Origin Resource Sharing (CORS)៖\n\n- **Same-Origin Policy**៖ ច្បាប់សុវត្ថិភាពរបស់ Browser ដែលរារាំង Cross-origin Requests តាមលំនាំដើម។\n- **Whitelist Allowed Origins**៖ កំណត់តែ Domains ជាក់លាក់របស់ Frontend (ឧ. `https://mycourse.edu`) ក្នុង Production។\n- **ហាមដាច់ខាត**៖ មិនត្រូវបើក `origin: '*'` លើ Endpoints ដែលមាន Credentials (Cookies/Authorization Headers) ឡើយ។",

  "M18-03": "ការការពារ HTTP Headers ជាមួយ Helmet Middleware៖\n\n- **X-Frame-Options**៖ ការពារការវាយប្រហារ Clickjacking ដោយហាមឃាត់ការដាក់ API ក្នុង iframe។\n- **Content-Security-Policy (CSP)**៖ គ្រប់គ្រងប្រភព Scripts និង Assets ដែលអនុញ្ញាតឱ្យដំណើរការ។\n- **Hide Server Tech**៖ ដកចេញ Header `X-Powered-By: Express` ដោយស្វ័យប្រវត្តិដើម្បីបិទបាំងបច្ចេកវិទ្យា Server។",

  "M18-04": "ការកំណត់ចំនួន Request (Rate Limiting) ជាមួយ express-rate-limit៖\n\n- **ការពារ DoS Attacks**៖ ទប់ស្កាត់ការផ្ញើ Requests ហួសប្រមាណដែលធ្វើឱ្យ Server គាំង ឬកកស្ទះ។\n- **Global Limiter**៖ កំណត់កម្រិតទូទៅ (ឧ. 100 requests ក្នុង 15 នាទី សម្រាប់ IP មួយ)។\n- **HTTP 429 Status**៖ ឆ្លើយតប `429 Too Many Requests` នៅពេល Client ប្រើប្រាស់លើសកម្រិតកំណត់។",

  "M18-05": "ការទប់ស្កាត់ការវាយប្រហារ Brute-force លើ Login Routes៖\n\n- **Strict Rate Limiting**៖ កម្រិតយ៉ាងតឹងរ៉ឹងលើ `/api/v1/auth/login` (ឧ. 5 ដងក្នុង 15 នាទី)។\n- **Account Lockout**៖ ចាក់សោគណនីបណ្តោះអាសន្ននៅពេលវាយ Password ខុសច្រើនដងជាប់គ្នា។\n- **Progressive Delay**៖ បង្កើនរយៈពេលឆ្លើយតបបន្តិចម្តងៗរាល់ពេល Login បរាជ័យ ដើម្បីពន្យារពេល Botnets។",

  "M18-06": "ការការពារប្រព័ន្ធតាមរយៈ Input Validation ជាមួយ Zod៖\n\n- **First Line of Defense**៖ ត្រួតពិនិត្យទិន្នន័យទាំងអស់មុនពេលវាទៅដល់ Controller ឬ Database។\n- **Type & Format Checking**៖ ផ្ទៀងផ្ទាត់ Type, String Length, Email Format, និង Value Range។\n- **Strip Unknown Fields**៖ ជម្រះចោលនូវ Fields មិនស្គាល់ដោយស្វ័យប្រវត្តិតាមរយៈ `.strict()` ដើម្បីការពារ Mass Assignment។",

  "M18-07": "គោលការណ៍សុវត្ថិភាពពាក្យសម្ងាត់ (NIST Guidelines)៖\n\n- **Minimum Length**៖ កំណត់ប្រវែងយ៉ាងតិច 8 ទៅ 12 តួអក្សរ (ប្រវែងសំខាន់ជាងភាពស្មុគស្មាញ)។\n- **Check Leaked Passwords**៖ ពិនិត្យផ្ទៀងផ្ទាត់មិនឱ្យប្រើប្រាស់ Common Passwords (ដូចជា '12345678', 'password')។\n- **bcrypt Hashing**៖ ប្រើប្រាស់ Slow Cryptographic Hashing ជាមួយ 12 Salt Rounds ជានិច្ច។",

  "M18-08": "ការការពារសុវត្ថិភាព JWT (Algorithm Confusion & Secret Entropy)៖\n\n- **High Entropy Secrets**៖ ប្រើប្រាស់ Secret Key ប្រវែងយ៉ាងតិច 256-bit Random Strings។\n- **Explicit Algorithm**៖ បង្ខំកំណត់ Algorithm ជាក់លាក់ (`HS256` ឬ `RS256`) ការពារ 'none' algorithm bypass។\n- **Short Expiration**៖ កំណត់ Access Token ឱ្យផុតកំណត់លឿន (15 ទៅ 30 នាទី) និងមិនដាក់ Sensitive Data ក្នុង Payload ឡើយ។",

  "M18-09": "ការការពារសុវត្ថិភាព Cookies (HttpOnly, Secure, SameSite)៖\n\n- **httpOnly**៖ ទប់ស្កាត់ការលួច Token តាមរយៈ JavaScript និង XSS Attacks។\n- **secure**៖ បង្ខំឱ្យ Browser បញ្ជូន Cookie តែតាមបណ្តាញ HTTPS ប៉ុណ្ណោះ។\n- **sameSite**៖ កំណត់ `'strict'` ឬ `'lax'` ដើម្បីការពារការវាយប្រហារ Cross-Site Request Forgery (CSRF)។",

  "M18-10": "ការគ្រប់គ្រង Secret Keys និង Environment Variables ដោយសុវត្ថិភាព៖\n\n- **.env & .gitignore**៖ រក្សាទុក Secrets ក្នុង `.env` ហើយបន្ថែមចូលក្នុង `.gitignore` ដាច់ខាតមិនឱ្យចូល Git។\n- **Environment Validation**៖ Validate វត្តមានរបស់ Variables សំខាន់ៗនៅពេល Server ចាប់ផ្តើមដំណើរការ (Boot)។\n- **Cloud Secret Management**៖ ក្នុង Production ប្រើប្រាស់ Docker Secrets, AWS SSM, ឬ Vault។",

  "M18-11": "ការការពារទិន្នន័យសម្ងាត់ (Data Masking & Sanitization)៖\n\n- **Mongoose Exclusions**៖ ប្រើ `select: false` លើ Fields សម្ងាត់ដូចជា Password, Reset Tokens។\n- **Response Transforms**៖ ប្រើ `toJSON: { transform }` ដើម្បីដក `password` និង `__v` ចេញពី API Output។\n- **Log Masking**៖ មិនកត់ត្រា Password, Tokens, ឬ Credit Cards ចូលទៅក្នុង Server Logs ឡើយ។",

  "M18-12": "ការទប់ស្កាត់ការវាយប្រហារ NoSQL Injection៖\n\n- **NoSQL Injection Attack**៖ ការផ្ញើ Query Operators (ដូចជា `{\"username\": {\"$gt\": \"\"}}`) ដើម្បី Bypass Login។\n- **express-mongo-sanitize**៖ ប្រើ Middleware ដើម្បីជម្រះសញ្ញា `$` និង `.` ចេញពី Request Body និង Query Params។\n- **Schema Validation**៖ ធានាថា Input មាន Type ជា String ពិតប្រាកដមុននឹងយកទៅ Query Database។",

  "M18-13": "ការទប់ស្កាត់ការវាយប្រហារ Cross-Site Scripting (XSS)៖\n\n- **Stored XSS**៖ ការលួចបញ្ចូល Malicious JavaScript Code ទៅក្នុង Database (ដូចជា Course Description)។\n- **Input Sanitization**៖ ប្រើប្រាស់បណ្ណាល័យដូចជា `xss-clean` ឬ `DOMPurify` ដើម្បីជម្រះ Dangerous HTML Tags។\n- **Secure Headers & Cookies**៖ កំណត់ Content Security Policy និងប្រើប្រាស់ HttpOnly Cookies សម្រាប់ Auth Tokens។",

  "M18-14": "ការយល់ដឹង និងការពារ Cross-Site Request Forgery (CSRF)៖\n\n- **យន្តការវាយប្រហារ**៖ បង្ខំឱ្យ Browser របស់ Authenticated User ផ្ញើ State-changing Request ដោយមិនដឹងខ្លួន។\n- **SameSite Cookies**៖ ប្រើ `sameSite: 'lax'` ឬ `'strict'` ដែលជាមធ្យោបាយការពារដ៏មានប្រសិទ្ធភាពបំផុត។\n- **Custom Headers**៖ តម្រូវឱ្យមាន Header ដូចជា `X-Requested-With` ឬ `Authorization` ព្រោះ Cross-origin មិនអាចផ្ញើ Custom Headers ដោយគ្មាន CORS Preflight ឡើយ។",

  "M18-15": "គោលការណ៍គ្រឹះនៃស្ថាបត្យកម្ម API ប្រកបដោយសុវត្ថិភាព (Secure API Design)៖\n\n- **Defense-in-Depth**៖ រួមបញ្ចូលគ្រប់ស្រទាប់ការពារ (HTTPS, Helmet, Rate Limit, CORS, Zod Validation, Auth Middleware)។\n- **Fail Securely**៖ ប្រសិនបើមានកំហុសកើតឡើង ប្រព័ន្ធត្រូវបដិសេធជាមុន (Deny by default)។\n- **Centralized Error Envelope**៖ មិនបញ្ចេញ Database Error Messages ឬ Stack Traces ទៅកាន់ Client ក្នុង Production ឡើយ។",

  // ── M19: File Uploads & Media ──────────────────────────────────────────────
  "M19-01": "គោលការណ៍គ្រឹះនៃការ Upload ឯកសារក្នុង Web Backend៖\n\n- **Multipart Stream**៖ ឯកសារ Binary ត្រូវបានបញ្ជូនជា Stream តាមរយៈ HTTP `multipart/form-data`។\n- **Server-side Parsing**៖ Server ប្រើប្រាស់ Middleware (Multer) ដើម្បី Parse និងទាញយក File Buffer។\n- **Storage & Metadata**៖ រក្សាទុក File លើ Cloud Storage រួចកត់ត្រា File URL ទៅក្នុង MongoDB Document។",

  "M19-02": "ការស្វែងយល់ពីទម្រង់ Multipart Form Data៖\n\n- **Content-Type**៖ ប្រើប្រាស់ `multipart/form-data; boundary=----WebKitFormBoundary...`។\n- **Boundary Delimiter**៖ បែងចែករវាង File Data (Binary) និង Regular Form Fields (Text) ក្នុង HTTP Body តែមួយ។\n- **Streaming Parser**៖ តម្រូវឱ្យប្រើ Library ដូចជា Multer / Busboy ព្រោះ `express.json()` មិនអាច Parse Multipart បានឡើយ។",

  "M19-03": "ការដំឡើង និងកំណត់រចនាសម្ព័ន្ធ Multer Middleware៖\n\n- **Storage Engine**៖ ជ្រើសរើសរវាង `multer.memoryStorage()` (សម្រាប់ Cloud) ឬ `multer.diskStorage()` (សម្រាប់ Local)។\n- **Limits & Filters**៖ កំណត់ទំហំអតិបរមា (`fileSize`) និងប្រភេទ File (`fileFilter`)។\n- **Route Integration**៖ ប្រើ `upload.single('file')` ឬ `upload.array('files')` លើ Express Route Handlers។",

  "M19-04": "ការ Upload រូបភាព (Single & Multiple Image Uploads)៖\n\n- **Single Upload**៖ ប្រើ `upload.single('thumbnail')` សម្រាប់រូបភាព Course Thumbnail (ទទួលបាន `req.file`)។\n- **Multiple Uploads**៖ ប្រើ `upload.array('gallery', 5)` សម្រាប់រូបភាពច្រើនសន្លឹក (ទទួលបាន `req.files`)។\n- **Metadata Extraction**៖ ពិនិត្យ និងប្រើប្រាស់ Metadata ដូចជា `originalname`, `mimetype`, `size`, និង `buffer`។",

  "M19-05": "ការ Upload ឯកសារ PDF និង Office Documents៖\n\n- **Document Upload**៖ ប្រើ `upload.single('syllabus')` សម្រាប់ Course Syllabus ឬ Assignment PDFs។\n- **Strict MIME Type**៖ អនុញ្ញាតតែ `application/pdf` ដោយបដិសេធរាល់ Executable Files (`.exe`, `.sh`, `.js`)។\n- **Size Limit Allocation**៖ កំណត់ទំហំធំសមស្របសម្រាប់ Documents (ឧ. 10MB ទៅ 20MB)។",

  "M19-06": "ការផ្ទៀងផ្ទាត់ប្រភេទ និងភាពត្រឹមត្រូវនៃឯកសារ (File Validation)៖\n\n- **fileFilter Function**៖ ត្រួតពិនិត្យប្រភេទឯកសារមុនពេល Multer ទទួលយក File។\n- **MIME Type & Extension**៖ ផ្ទៀងផ្ទាត់ទាំង File Extension (`.jpg`, `.png`, `.pdf`) និង `file.mimetype`។\n- **Magic Bytes Verification**៖ ត្រួតពិនិត្យ File Signature ដើម្បីការពារ Attacker ប្តូរ Extension បន្លំប្រព័ន្ធ។",

  "M19-07": "ការកំណត់ទំហំអតិបរមានៃឯកសារ (File Size Limits & Error Handling)៖\n\n- **limits Configuration**៖ កំណត់ `fileSize: 5 * 1024 * 1024` (5MB) ក្នុង Multer Options។\n- **MulterError Handling**៖ ចាប់ `LIMIT_FILE_SIZE` ក្នុង Express Error Middleware។\n- **User-friendly Response**៖ ឆ្លើយតប `400 Bad Request` ជាមួយសារច្បាស់លាស់ «File size exceeds 5MB limit»។",

  "M19-08": "យុទ្ធសាស្ត្រជ្រើសរើសទីតាំងផ្ទុកឯកសារ (Local vs Cloud Storage)៖\n\n- **Local Disk Storage**៖ សមស្របសម្រាប់តែដំណាក់កាល Development ព្រោះមិនអាច Scale លើ Multi-instance Containers បាន។\n- **Cloud Object Storage (S3-Compatible)**៖ ស្តង់ដារ Production ដោយសារ Scalability គ្មានដែនកំណត់, ភាពធន់ខ្ពស់, និង CDN Integration។\n- **Stateless Server Principle**៖ រក្សា Server ឱ្យនៅជា Stateless ដោយមិនពឹងផ្អែកលើ Local Hard Disk ឡើយ។",

  "M19-09": "ការរៀបចំ Multer DiskStorage លើ Local Filesystem៖\n\n- **destination**៖ កំណត់ Folder ផ្ទុកឯកសារ (ឧ. `'uploads/courses/'`)។\n- **Unique Filename**៖ បង្កើតឈ្មោះ File មិនឱ្យជាន់គ្នាដោយប្រើ `crypto.randomUUID()` ឬ Timestamp + Extension។\n- **Static Serving**៖ បើកឱ្យទាញយកតាមរយៈ `app.use('/uploads', express.static('uploads'))` ក្នុង Development។",

  "M19-10": "ស្ថាបត្យកម្ម Cloud Object Storage (S3-Compatible)៖\n\n- **Buckets & Objects**៖ រក្សាទុក File ជា Objects ក្នុង Bucket ដោយប្រើ Unique Storage Key។\n- **High Availability & Durability**៖ ធានាសុវត្ថិភាពទិន្នន័យ 99.999999999% (11 9s durability)។\n- **Global CDN Distribution**៖ ចែកចាយរូបភាពតាមរយៈ CDN Edge Servers ជួយឱ្យ User ទាញយករូបភាពបានលឿនទូទាំងពិភពលោក។",

  "M19-11": "ការ Upload ឯកសារទៅ Cloudflare R2 ដោយប្រើ AWS SDK v3៖\n\n- **Zero Egress Fees**៖ Cloudflare R2 មិនគិតថ្លៃ Bandwidth ពេល User ទាញយករូបភាពឡើយ។\n- **S3Client & PutObjectCommand**៖ ប្រើ `@aws-sdk/client-s3` ជាមួយ Custom Endpoint របស់ R2។\n- **Direct Buffer Upload**៖ បញ្ជូន File Buffer ពី `Multer.memoryStorage()` ទៅកាន់ R2 ដោយមិនបាច់ Save លើ Disk។",

  "M19-12": "ការបង្កើត និងរក្សាទុក Image URLs ក្នុង Database៖\n\n- **Store URL or Key**៖ រក្សាទុក Public CDN URL ពេញលេញ ឬ Relative Key ក្នុង Mongoose Document (`course.thumbnail`)។\n- **Lean Document Size**៖ Database ផ្ទុកត្រឹមតែ String URL ទំហំតិចតួច មិនផ្ទុក Binary Data ធ្ងន់ៗឡើយ។\n- **Frontend Ready**៖ Frontend អាចយក URL ទៅបង្ហាញក្នុង `<img>` tag ដោយផ្ទាល់បានភ្លាមៗ។",

  "M19-13": "ការលុបឯកសារចាស់ៗ (File Deletion & Storage Cleanup)៖\n\n- **Prevent Orphaned Files**៖ លុប File ចាស់ចេញពី Storage នៅពេល User កែប្រែរូបភាពថ្មី ឬលុប Course ចោល។\n- **S3 DeleteObjectCommand**៖ ហៅ `DeleteObjectCommand` ដើម្បីលុប Object ចេញពី Cloud Storage Bucket។\n- **Mongoose Middleware Cleanup**៖ ប្រើ Mongoose `post('findOneAndDelete')` hook ដើម្បី Trigger ការលុប File ដោយស្វ័យប្រវត្តិ។",

  // ── M20: Email & Communications ───────────────────────────────────────────
  "M20-01": "ស្ថាបត្យកម្មប្រព័ន្ធផ្ញើ Email ក្នុង Web Application៖\n\n- **Decoupled Delivery**៖ ការផ្ញើ Email ត្រូវការពេលពី 1-3 វិនាទី ដូច្នេះមិនត្រូវ `await` ក្នុង HTTP Thread ឡើយ។\n- **Background Queueing**៖ បញ្ជូន Email Task ទៅកាន់ Message Queue (BullMQ) ដើម្បីឆ្លើយតបទៅ Client ក្រោម 50ms។\n- **High Reliability**៖ មានយន្តការ Retry ដោយស្វ័យប្រវត្តិនៅពេល SMTP Server ជួបបញ្ហារអាក់រអួល។",

  "M20-02": "ការស្វែងយល់ពី Simple Mail Transfer Protocol (SMTP)៖\n\n- **SMTP Protocol**៖ ពិធីការស្តង់ដារសម្រាប់បញ្ជូន Email ឆ្លងកាត់បណ្តាញ Internet (Port 587 សម្រាប់ TLS)។\n- **Development Sandbox**៖ ប្រើប្រាស់ Ethereal Email ឬ Mailtrap សម្រាប់ចាប់យក Email សាកល្បងដោយមិនបាច់ផ្ញើទៅ Inbox ពិត។\n- **Production Transactional Providers**៖ ប្រើប្រាស់ SendGrid, Resend, ឬ AWS SES សម្រាប់ Production Delivery ខ្ពស់។",

  "M20-03": "ការដំឡើង និងបង្កើត Nodemailer Transporter៖\n\n- **createTransport**៖ បង្កើត Transporter Configuration ដោយភ្ជាប់ជាមួយ SMTP Host, Port, និង Auth Credentials។\n- **Environment Variables**៖ គ្រប់គ្រង SMTP Username/Password តាមរយៈ `process.env` ដោយសុវត្ថិភាព។\n- **verify Connection**៖ ហៅ `transporter.verify()` នៅពេល Server Boot ដើម្បីត្រួតពិនិត្យថា SMTP Ready ឬអត់។",

  "M20-04": "ការផ្ញើ Email ជាមួយ Nodemailer (Text & HTML Format)៖\n\n- **sendMail Method**៖ ហៅ `await transporter.sendMail(mailOptions)` ដើម្បីបញ្ជូនសារ។\n- **Mail Options**៖ កំណត់ `from`, `to`, `subject`, `text` (Plain text fallback), និង `html` (Rich content)។\n- **Delivery Confirmation**៖ ទទួលបាន `info.messageId` សម្រាប់កត់ត្រាក្នុង Logs។",

  "M20-05": "ការបង្កើត Responsive HTML Email Templates៖\n\n- **Responsive Design**៖ រចនា Email ឱ្យបង្ហាញស្អាតទាំងលើ Mobile និង Desktop Email Clients។\n- **Template Engines**៖ ប្រើប្រាស់ Handlebars, Pug, ឬ React Email ដើម្បីបញ្ចូល Dynamic Variables (ឈ្មោះសិស្ស, Course Title)។\n- **Inline CSS**៖ ប្រើ Inline CSS Styles ព្រោះ Email Clients ភាគច្រើនមិនគាំទ្រ External Stylesheets ឡើយ។",

  "M20-06": "ការផ្ញើ Welcome Email បន្ទាប់ពីចុះឈ្មោះជោគជ័យ៖\n\n- **Automated Trigger**៖ ដំណើរការភ្លាមៗបន្ទាប់ពី User Document ត្រូវបានបង្កើតក្នុង Database។\n- **Personalized Message**៖ បញ្ចូលឈ្មោះ User និងតំណភ្ជាប់ណែនាំពីរបៀបចាប់ផ្តើមរៀនក្នុង Course Platform។\n- **Non-blocking Execution**៖ ផ្ញើតាមរយៈ Background Task ដើម្បីកុំឱ្យប៉ះពាល់ដល់ Registration Speed។",

  "M20-07": "លំហូរ Password Reset ជាមួយ Cryptographic Token៖\n\n- **Generate Crypto Token**៖ បង្កើត Random Token តាមរយៈ `crypto.randomBytes(32).toString('hex')`។\n- **Hash & Save with Expiry**៖ Hash Token រួចរក្សាទុកក្នុង MongoDB ជាមួយកាលបរិច្ឆេទផុតកំណត់ (10 នាទី)។\n- **Send Reset Link**៖ ផ្ញើ Reset URL ដែលមានផ្ទុក Unhashed Token តាមរយៈ Email ទៅកាន់ User។\n- **Verify & Update**៖ នៅពេល User ចុច Link Server Hash Token មកផ្ទៀងផ្ទាត់ជាមួយ Database មុននឹងអនុញ្ញាតឱ្យប្តូរ Password ថ្មី។",

  "M20-08": "ការផ្ទៀងផ្ទាត់អាសយដ្ឋាន Email (Email Verification)៖\n\n- **Verify Email Ownership**៖ បញ្ជាក់ថា Email ដែលបានចុះឈ្មោះគឺពិតជារបស់ User នោះ។\n- **Verification Token**៖ បង្កើត Verification Token និងផ្ញើតំណភ្ជាប់បញ្ជាក់តាម Email។\n- **Activate Account**៖ កែប្រែ `isEmailVerified: true` បន្ទាប់ពី User ចុច Link ដើម្បីអនុញ្ញាតឱ្យប្រើប្រាស់មុខងារពេញលេញ។",

  "M20-09": "ស្ថាបត្យកម្មប្រព័ន្ធ Notification (In-app & Email)៖\n\n- **Multi-channel Notifications**៖ គាំទ្រទាំង In-App Notifications (បញ្ជូនតាម WebSockets) និង Email Notifications។\n- **User Notification Preferences**៖ អនុញ្ញាតឱ្យ User អាចជ្រើសរើសបិទ/បើក Email Alerts តាមចំណង់ចំណូលចិត្ត។\n- **Centralized Service**៖ បង្កើត `NotificationService` តែមួយដើម្បីគ្រប់គ្រងការបញ្ជូនដំណឹងគ្រប់ទម្រង់។",

  "M20-10": "ការផ្ញើ Email តាមរយៈ Background Queues (BullMQ)៖\n\n- **Enqueue Job**៖ Controller បន្ថែម Job ចូលទៅក្នុង `emailQueue` ភ្លាមៗ (ចំណាយពេលត្រឹម 2-5ms)។\n- **Worker Processing**៖ Background Worker ទាញយក Job ពី Redis រួចហៅ Nodemailer ដើម្បីផ្ញើ Email។\n- **Automatic Retry**៖ ប្រសិនបើ SMTP ជួបបញ្ហា BullMQ នឹង Retry ដោយស្វ័យប្រវត្តិតាម Exponential Backoff។"
};
