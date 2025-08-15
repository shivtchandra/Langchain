# Langchain

I built this project to explore and implement a lightweight LangChain-inspired system with both a backend agent and a simple offline debugging interface. It is designed to run locally, without relying on external cloud dependencies, while still being flexible enough to integrate with APIs or expand into more advanced AI workflows.

## Project Structure

```
Langchain/
│
├── node_modules/          # Installed dependencies
│
├── Offline_debugger/      # React-based offline debugging tool
│   ├── index.html         # Root HTML file for the debugger UI
│   └── src/
│       ├── App.css        # Styles for the main app component
│       ├── App.jsx        # Core React component for the debugger
│       ├── index.css      # Global styles
│       └── main.jsx       # Entry point for the React app
│
├── agent.js               # Core agent logic for handling requests and responses
├── package-lock.json      # Auto-generated dependency lock file
├── package.json           # Project metadata and scripts
├── server.js              # Backend server handling API routes and agent execution
```

## How It Works

* **agent.js**
  This file contains the logic for my AI agent — it processes incoming prompts, interacts with the necessary functions or models, and returns results. I designed it so that it can be run standalone or connected to the server for API access.

* **server.js**
  This runs a local HTTP server. It routes incoming requests to the agent and returns the processed responses. This setup allows me to test the system in a browser or through API calls.

* **Offline\_debugger**
  This is a separate React application that serves as a front-end testing and debugging tool. It lets me run prompts and view agent responses in a clean, interactive UI without needing a full cloud setup.

## Getting Started

1. **Install Dependencies**
   From the project root:

   ```bash
   npm install
   ```

2. **Run the Backend Server**

   ```bash
   node server.js
   ```

   This will start the local API server (default port can be set in the code).

3. **Run the Offline Debugger**

   ```bash
   cd Offline_debugger
   npm install
   npm run dev
   ```

   Then open the provided local URL in a browser (usually `http://localhost:5173/`).

## Why I Built It

I wanted a modular setup where:

* The **agent logic** is independent and reusable.
* The **server** acts as a lightweight API layer.
* The **offline debugger** provides a quick way to test without deploying.

This approach lets me experiment with prompt processing, API integrations, and UI features in a controlled local environment.

## Next Steps

* Add more tools and chains to the agent for complex workflows.
* Integrate authentication for secure API endpoints.
* Improve the debugger UI with request history and export options.

---

If you want, I can now extend this by adding **a section showing how a request flows from the debugger → server.js → agent.js → back to debugger**, so it reads like a full technical walkthrough. Would you like me to do that?
