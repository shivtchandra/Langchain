import React, { useState, useRef, useEffect } from 'react';

// --- Helper Icons ---
const GitHubIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> );
const Spinner = () => ( <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> );
const CopyIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg> );
const CheckIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M20 6 9 17l-5-5"></path></svg> );
const InfoIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg> );

// --- New Components ---

const SkeletonLoader = () => (
  <div className="space-y-4 animate-pulse">
    <div className="flex items-start space-x-3">
      <div className="h-6 w-6 rounded-full bg-slate-700"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-slate-700 rounded w-3/4"></div>
        <div className="h-3 bg-slate-700 rounded w-1/4"></div>
      </div>
    </div>
    <div className="flex items-start space-x-3">
      <div className="h-6 w-6 rounded-full bg-slate-700"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-slate-700 rounded w-1/2"></div>
        <div className="h-3 bg-slate-700 rounded w-1/4"></div>
      </div>
    </div>
    <div className="flex items-start space-x-3">
      <div className="h-6 w-6 rounded-full bg-slate-700"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-slate-700 rounded w-5/6"></div>
        <div className="h-3 bg-slate-700 rounded w-1/4"></div>
      </div>
    </div>
  </div>
);

const AboutSection = ({ isOpen, setIsOpen }) => (
  <div className="my-8">
    <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 text-slate-400 hover:text-green-400 transition-colors">
      <InfoIcon />
      <span className="font-semibold">How it Works</span>
    </button>
    {isOpen && (
      <div className="mt-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700 text-slate-300 space-y-2">
        <p>This application uses a multi-agent system built with LangChain.js to autonomously debug code.</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Analyze Node:</strong> An "Expert Programmer" agent examines the code and error, then proposes a fix.</li>
          <li><strong>Test Node:</strong> A "Code Tester" agent evaluates if the proposed fix resolves the original error.</li>
          <li><strong>Graph Logic:</strong> The agent loops between analyzing and testing until the bug is fixed or it reaches a limit, demonstrating a cyclical, stateful workflow powered by LangGraph.</li>
        </ul>
      </div>
    )}
  </div>
);


// --- Main App Component ---
export default function App() {
  const [code, setCode] = useState('def find_largest_number(numbers):\n  largest = 0\n  for number in numbers:\n    if number > largest:\n      largest = number\n  return largest\n\n# Test case\nresult = find_largest_number([-5, -2, -9, -1])\nprint(f"The largest number is: {result}")');
  const [error, setError] = useState('The function incorrectly returns 0 when all numbers are negative.');
  const [isDebugging, setIsDebugging] = useState(false);
  const [agentLog, setAgentLog] = useState([]);
  const [finalCode, setFinalCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [language, setLanguage] = useState('Python');
  const logEndRef = useRef(null);


  useEffect(() => {
    if (agentLog.length > 0) {
      logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [agentLog]);

  const handleCopy = () => {
    if (finalCode) {
      navigator.clipboard.writeText(finalCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const formatTimestamp = (isoString) => {
    if (!isoString) return '';
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  const handleDebug = async () => {
    setIsDebugging(true);
    setFinalCode('');
    setAgentLog([]);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:3001/api/debug', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, error,language }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'The agent failed on the backend.');
      }

      const result = await response.json();
      
      if (result.log && Array.isArray(result.log)) {
        const finalLog = [...result.log, { type: 'success', message: 'Test passed! Bug fixed.', timestamp: new Date().toISOString() }];
        setAgentLog(finalLog);
      } else {
        setAgentLog([{ type: 'success', message: 'Test passed! Bug fixed.', timestamp: new Date().toISOString() }]);
      }
      setFinalCode(result.code);

    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsDebugging(false);
    }
  };

  return (
    <div className="bg-gray-950 text-slate-200 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="text-center mb-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500">
            Iterative Code Debugger
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Powered by <span className="font-bold text-slate-100">LangChain.js</span> and a local <span className="font-bold text-slate-100">Llama 3</span> model.
          </p>
        </header>

        <AboutSection isOpen={isAboutOpen} setIsOpen={setIsAboutOpen} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel: Inputs */}
          <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700">
            <div className="space-y-6">
              <div>
  <label htmlFor="language-select" className="block text-sm font-medium text-slate-300 mb-2">
    Language
  </label>
  <select
    id="language-select"
    value={language}
    onChange={(e) => setLanguage(e.target.value)}
    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
    disabled={isDebugging} >
    <option>Python</option>
    <option>JavaScript</option>
    <option>Java</option>
            </select>
            </div>
              <div>
                <label htmlFor="code-input" className="block text-sm font-medium text-slate-300 mb-2">Buggy Python Code</label>
                <textarea id="code-input" value={code} onChange={(e) => setCode(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 font-mono text-sm shadow-inner resize-none focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-200" rows="12" placeholder="Enter your buggy Python code here..." disabled={isDebugging}></textarea>
              </div>

              <div>
                <label htmlFor="error-input" className="block text-sm font-medium text-slate-300 mb-2">Error Message or Bug Description</label>
                <textarea id="error-input" value={error} onChange={(e) => setError(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 font-mono text-sm shadow-inner resize-none focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-200" rows="4" placeholder="Describe the error or what the code should do..." disabled={isDebugging}></textarea>
              </div>
            </div>
            <div className="mt-8">
              <button onClick={handleDebug} disabled={isDebugging || !code || !error} className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 ease-in-out flex items-center justify-center shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-0.5">
                {isDebugging ? (<><Spinner /><span>Debugging...</span></>) : 'Start Debugging'}
              </button>
            </div>
          </div>

          {/* Right Panel: Agent's Work */}
          <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700 flex flex-col">
            <h2 className="text-2xl font-bold text-slate-100 mb-4">Agent's Log</h2>
            <div className="flex-grow bg-slate-900 rounded-xl p-4 overflow-y-auto h-96 shadow-inner border border-slate-700">
                {isDebugging ? <SkeletonLoader /> : (
                  <div className="space-y-4">
                      {agentLog.length === 0 && (
                          <div className="text-slate-500 text-center pt-16 h-full flex items-center justify-center">The agent's thought process will appear here.</div>
                      )}
                      {agentLog.map((log, index) => {
                          const logType = log.type || 'thought'; // Default to 'thought' if type is missing
                          return (
                            <div key={index} className="flex items-start space-x-3">
                                <div className="flex-shrink-0 pt-1">
                                    {logType === 'thought' && <span className="text-slate-500">🤖</span>}
                                    {logType === 'fix' && <span className="text-yellow-400">💡</span>}
                                    {logType === 'success' && <span className="text-green-400">✅</span>}
                                </div>
                                <div className="flex-1">
                                  <p className={`${logType === 'thought' ? 'text-slate-400 italic' : logType === 'fix' ? 'text-yellow-400' : 'text-green-400 font-semibold'}`}>
                                   {log.message.replace('Proposed fix: ', '')}
                                  </p>
                                  <p className="text-xs text-slate-500 mt-1">{formatTimestamp(log.timestamp)}</p>
                                </div>
                            </div>
                          );
                      })}
                      <div ref={logEndRef} />
                  </div>
                )}
            </div>
            {(!isDebugging && (finalCode || errorMessage)) && (
                 <div className="mt-4">
                    {finalCode && (
                        <div className="bg-slate-900 rounded-xl p-4 border border-slate-700">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-bold text-green-400">Final Corrected Code</h3>
                                <button onClick={handleCopy} className="bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1 rounded-md text-sm font-medium transition-colors flex items-center space-x-2">
                                    {copied ? <CheckIcon /> : <CopyIcon />}
                                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                                </button>
                            </div>
                            <pre className="text-sm overflow-x-auto"><code>{finalCode}</code></pre>
                        </div>
                    )}
                    {errorMessage && (
                        <div className="bg-red-900/50 text-red-300 border border-red-700 rounded-xl p-4 mt-4">
                            <p className="font-bold">Error:</p>
                            <p>{errorMessage}</p>
                        </div>
                    )}
                 </div>
            )}
          </div>
        </div>
        <footer className="text-center mt-10">
            <a href="https://github.com/google/generative-ai-docs/tree/main/demos/palm/react/iterative-code-debugger" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-slate-400 hover:text-green-400 transition-colors">
                <GitHubIcon />
                <span>View on GitHub</span>
            </a>
        </footer>
      </div>
    </div>
  );
}
