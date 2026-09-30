# Content & Localization Rules: Do Not Translate Technical Words

When writing, editing, or translating educational course content (including Khmer explanations, markdown slides, MDX metadata, and lesson descriptions):

## 1. Technical Term Preservation
- **NEVER translate technical words or programming concepts into literal Khmer.** Keep them in their standard English industry form.
- Examples of terms that must remain in English:
  - **Architecture & Design**: `Response`, `Request`, `Error Envelope`, `Middleware`, `Payload`, `Endpoint`, `Route`, `Status Code`, `Pagination`, `Offset`, `Cursor`, `Limit`, `Skip`, `HATEOAS`, `Validation`, `Sanitization`, `Serialization`, `Deserialization`.
  - **Environments & Infrastructure**: `Production`, `Development`, `Environment` (NEVER translate to "បរិស្ថាន"), `Server`, `Client`, `Database`, `Cluster`, `Docker`, `CI/CD`, `Deploy`.
  - **Language & Runtime**: `Array` (do not translate to "អារេ"), `Object`, `String`, `Boolean`, `Promise`, `Async/Await`, `Callback`, `Event Loop`, `Memory`, `OOM (Out Of Memory)`, `Stack Trace`, `Error Object`, `CPU` (never write "ស៊ីភីយូ").
  - **Developer Actions**: `Debug`, `Parse`, `Log`, `Refactor`, `Build`, `Test`, `Commit`, `Push`, `PR (Pull Request)`.
  - **Security**: `Tokens`, `Authentication`, `Authorization`, `Attackers`, `Exploit`, `Vulnerability`, `SQL Injection`, `DoS`, `Rate Limiting`.

## 2. Natural Khmer Phrasing
- Use Khmer solely for instructional narrative, sentence connectors, and high-level educational context.
- Combine English technical terms naturally with Khmer sentence structure (e.g., `រៀបចំ Error Responses តាមទម្រង់ Error Envelope ដ៏ច្បាស់លាស់`, `ជៀសវាងការ expose Stack Trace នៅលើ Production environment`).
- When introducing a formal concept or category, you may include standard capitalized titles or abbreviations in parentheses if needed, but the technical noun itself must remain English.
