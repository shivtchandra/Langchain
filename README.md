# Langchain

This project implements a basic LangChain-powered application with a Node.js backend and a React-based **Offline Debugger** for testing and development.
It demonstrates how to set up an agent, expose it through an API, and provide a local interface for debugging.

---

## **Project Structure**

```
Langchain/
│
├── node_modules/            # Project dependencies
├── Offline_debugger/        # React-based debugger UI
│   ├── index.html
│   └── src/
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
│
├── agent.js                 # Core agent logic
├── server.js                # Node.js server entry point
├── package.json             # Project metadata and dependencies
├── package-lock.json        # Dependency lock file
```

---

## **Prerequisites**

* **Node.js** v16 or higher (v18+ recommended)
* **npm** (comes with Node.js) or Yarn

---

## **Installation**

Clone the repository and install dependencies:

```bash
git clone https://github.com/username/Langchain.git
cd Langchain
npm install
```

---

## **Running the Server**

Start the backend server:

```bash
node server.js
```

By default, the server will start locally (port configuration may be defined inside `server.js`).
You can access the API endpoints exposed by the agent from your browser or API client.

---

## **Running the Offline Debugger**

The Offline Debugger is a local UI for testing the agent without external dependencies.

```bash
cd Offline_debugger
npm install
npm run dev
```

This will start a local development server (usually on `http://localhost:5173/`).
Open the URL in your browser to interact with the agent visually.

---

## **Key Files**

* **`agent.js`** — Contains the main agent logic, including how prompts are processed and responses are generated.
* **`server.js`** — Sets up the HTTP server, routes requests, and connects to the agent.
* **`Offline_debugger/src/`** — React front-end for testing and debugging agent interactions.

---

## **Development Notes**

* **Customizing Agent Behavior:** Modify `agent.js` to change prompt handling, chain configuration, or API calls.
* **Server Configuration:** Adjust port or route handling in `server.js` as needed.
* **UI Changes:** Update `App.jsx` and related CSS files in the `Offline_debugger` folder for front-end modifications.

---

