# Langchain Main Repository

This repository contains the core TypeScript/JavaScript source for multiple versions of a validation and parsing framework, along with an **offline debugger** front-end for interactive testing.  
The codebase is organized to support multiple release tracks (`v3`, `v4`, `v4-mini`, `union.ts`) and includes localized error messages, extensive test coverage, and developer tools.

---

## Features

- **Multiple Framework Versions**
  - `v3` — Older release, compiled JavaScript with type definitions.
  - `v4` — Latest stable release, organized into `classic`, `core`, `mini`, and `locales`.
  - `v4-mini` — A minimal build for lightweight usage.
  - `union.ts` — Utility and core helpers.

- **Helper Utilities**
  - Common parsing, type alias, and error utilities in `helpers/`.
  - Rich error message localization in `locales/` (supports 30+ languages).

- **Offline Debugger UI**
  - Located in `offline-degubber/`.
  - Built with React + Vite.
  - Allows testing and debugging parsing logic in a browser environment without network dependencies.

- **Extensive Tests**
  - Unit and integration tests in `tests/` directories for each version.
  - Covers parsing, coercion, schema validation, type checks, error handling, and localization.
---

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/shivtchandra/Langchain.git
cd Langchain-main
```
2. Install Dependencies
The repository uses npm or yarn for dependency management.

```bash
npm install
# or
yarn install
```

Building & Running
Run Tests
To verify functionality and run unit tests:
```
npm test
```
(The exact test command may be defined in package.json scripts.)

Run Offline Debugger
The offline debugger is a standalone React application for browser-based testing.
```
cd offline-degubber
npm install
npm run dev
```
Then open the provided localhost URL (usually http://localhost:5173/) in your browser.

Development Notes
TypeScript Source — The main validation logic is authored in TypeScript for type safety and transpiled to JavaScript for distribution.

Testing Framework — Tests appear to use a Node.js testing framework (e.g., Jest, Vitest).

Localization — To change default error messages, modify the desired locale file in locales/ and rebuild.
