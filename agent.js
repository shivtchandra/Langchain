const { StateGraph } = require("@langchain/langgraph");
const { ChatOllama } = require("@langchain/community/chat_models/ollama");

const llm = new ChatOllama({ model: "llama3", format: "json" });

// The state definition remains the same
const graphState = {
  code: { value: null },
  error: { value: null },
  language:{ value:null},
  log: { value: (x, y) => x.concat(y), default: () => [] },
  test_passed: { value: null },
};

// --- NODES (with structured, timestamped logging) ---
async function analyzeNode(state) {
  const { code, error, language } = state;
  // **THE CHANGE:** Added a new rule to validate the language.
  const prompt = `You are an expert ${language} programmer. Your task is to fix a single bug.
  **RULES:**
  1. First, verify that the provided code is written in ${language}. If it is not, your JSON response must be: {"thought": "Error: The code does not match the selected language.", "fixed_code": ""}.
  2. If the language is correct, analyze the code and error.
  3. Your response MUST be a single, raw JSON object.
  4. The JSON object must have two keys: "thought" and "fixed_code".
  5. "thought": A brief, one-sentence explanation of the bug and your proposed fix.
  6. "fixed_code": The complete, corrected Python code with ONLY your single proposed fix applied.

  **Current Code:**
  \`\`\`${language}
  ${code}
  \`\`\`

  **Error Message:**
  "${error}"`;

  // ... rest of the function is the same
  const response = await llm.invoke(prompt);
  const analysis = JSON.parse(response.content);
  
  return {
    code: analysis.fixed_code,
    log: [{ 
      type: 'fix', 
      message: `${analysis.thought}`,
      code_snippet: analysis.fixed_code,
      timestamp: new Date().toISOString() 
    }],
  };
}


async function testNode(state) {
  const { code, error,language } = state;
  const prompt = `You are a "Code Tester" agent for the ${language} language. Your job is to determine if a proposed fix resolves the original error. Respond with a single JSON object with one key, "test_passed", which is a boolean (true or false). Your response MUST be a single, raw JSON object and nothing else. **Original Error Message:** "${error}" **Proposed Fixed Code:** \`\`\`python\n${code}\n\`\`\` Does the "Proposed Fixed Code" solve the "Original Error Message"?`;

  const response = await llm.invoke(prompt);
  const result = JSON.parse(response.content);
  
  // **THE FIX:** Return a structured log object
  return {
    test_passed: result.test_passed,
    log: [{ 
      type: 'thought', 
      message: `Testing the proposed fix... Passed: ${result.test_passed}`,
      timestamp: new Date().toISOString()
    }],
  };
}

// --- EDGES ---
function shouldContinue(state) {
  return state.test_passed ? "end" : "continue";
}

// --- Build Graph ---
async function runAgent(inputs) {
  const workflow = new StateGraph({ channels: graphState });

  workflow.addNode("analyze", analyzeNode);
  workflow.addNode("test", testNode);
  workflow.setEntryPoint("analyze");
  workflow.addEdge("analyze", "test");
  
  workflow.addConditionalEdges("test", shouldContinue, {
    continue: "analyze",
    end: "__end__",
  });

  const app = workflow.compile();
  const result = await app.invoke(inputs, { recursionLimit: 5 });
  return result;
}

module.exports = { runAgent };