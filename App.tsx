
import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import GreetingCard from './components/GreetingCard';
import { AppState, GreetingVariant } from './types';
import { getGeminiGreeting, getMultilingualGreetings } from './services/geminiService';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppState>(AppState.IDLE);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [variants, setVariants] = useState<GreetingVariant[]>([]);

  const fetchInitialData = useCallback(async () => {
    setStatus(AppState.LOADING);
    try {
      const data = await getMultilingualGreetings();
      setVariants(data);
      setStatus(AppState.IDLE);
    } catch (err) {
      console.error(err);
      setStatus(AppState.ERROR);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const handleSayHello = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setStatus(AppState.LOADING);
    try {
      const result = await getGeminiGreeting(prompt);
      setResponse(result);
      setStatus(AppState.CHATTING);
    } catch (err) {
      console.error(err);
      setStatus(AppState.ERROR);
    }
  };

  const reset = () => {
    setPrompt('');
    setResponse(null);
    setStatus(AppState.IDLE);
  };

  return (
    <Layout>
      <div className="text-center mb-16 max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          Napis <span className="gradient-text">Hello</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
          Experience the art of greeting. Ask Gemini to say hello in any style, 
          language, or persona you can imagine.
        </p>
      </div>

      <div className="w-full max-w-3xl glass p-8 rounded-3xl shadow-2xl mb-16">
        {status === AppState.CHATTING && response ? (
          <div className="space-y-6 animate-in fade-in duration-700">
            <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-2xl text-lg leading-relaxed text-blue-100">
              {response}
            </div>
            <button
              onClick={reset}
              className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all border border-slate-700"
            >
              Start Over
            </button>
          </div>
        ) : (
          <form onSubmit={handleSayHello} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Say hello like a 1920s jazz singer..."
                className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl py-5 px-6 text-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600"
                disabled={status === AppState.LOADING}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none text-slate-500">
                <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded">Enter</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={status === AppState.LOADING || !prompt.trim()}
              className={`w-full py-5 rounded-2xl text-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 ${
                status === AppState.LOADING || !prompt.trim()
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/20'
              }`}
            >
              {status === AppState.LOADING ? (
                <>
                  <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Thinking...
                </>
              ) : (
                'Generate Greeting'
              )}
            </button>
          </form>
        )}
      </div>

      <div className="w-full">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-slate-800"></div>
          <h2 className="text-xl font-medium text-slate-400 px-4">World Greetings</h2>
          <div className="h-px flex-1 bg-slate-800"></div>
        </div>
        
        {variants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {variants.map((variant, idx) => (
              <GreetingCard key={idx} variant={variant} />
            ))}
          </div>
        ) : status === AppState.LOADING ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-50">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass h-48 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500 italic">
            Connecting to Gemini to fetch cultural greetings...
          </div>
        )}
      </div>
    </Layout>
  );
};

export default App;
