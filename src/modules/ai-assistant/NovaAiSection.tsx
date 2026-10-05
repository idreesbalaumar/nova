import React, { useState, useEffect, useRef } from 'react';
import { 
  AI_PROMPT_PRESETS, 
  AIPromptSuggestion 
} from '@/data/novaData';
import { Icon } from '@iconify/react';
import { toast } from 'sonner';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  content: string;
  data?: AIPromptSuggestion['response'];
}

export const NovaAiSection: React.FC = () => {
  const [activePreset, setActivePreset] = useState<AIPromptSuggestion>(AI_PROMPT_PRESETS[0]);
  const [customInput, setCustomInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init_1',
      sender: 'assistant',
      timestamp: '12:45 UTC',
      content: 'Hello! I am NOVA AI, your pan-African autonomous treasury intelligence copilot. I continuously monitor liquidity corridors, counterparty settlements, FX volatility, and fraud anomalies across the continent. Select an analysis prompt or ask a custom question below.',
    },
    {
      id: 'init_2',
      sender: 'user',
      timestamp: '12:46 UTC',
      content: AI_PROMPT_PRESETS[0].prompt,
    },
    {
      id: 'init_3',
      sender: 'assistant',
      timestamp: '12:46 UTC',
      content: AI_PROMPT_PRESETS[0].response.summary,
      data: AI_PROMPT_PRESETS[0].response,
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSelectPreset = (preset: AIPromptSuggestion) => {
    setActivePreset(preset);
    setIsTyping(true);

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: preset.prompt,
    };

    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const assistantMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: preset.response.summary,
        data: preset.response,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 800);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim() || isTyping) return;

    const query = customInput.trim();
    setCustomInput('');
    setIsTyping(true);

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: query,
    };

    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      let responseObj: AIPromptSuggestion['response'] = {
        summary: `NOVA AI synthesis complete for query: "${query}". Analysis across 34 African clearing corridors indicates optimal settlement routes and zero systemic liquidity bottlenecks.`,
        details: [
          'Counterparty Health: All regional commercial banking switches (NIBSS, GhIPSS, KEPSS) are reporting 100% operational availability.',
          'Liquidity Depth: Combined reserves in Lagos, Nairobi, and London pools exceed $780M, well above the 99th percentile stress threshold.',
          'Recommendation: Maintain automated multi-currency rebalancing to benefit from overnight yield spreads.',
        ],
        riskScore: 'Low',
        recommendedAction: 'Automated treasury parameters remain within institutional guidelines.',
        actionButtonText: 'Apply Smart Allocation',
        impactMetric: 'Network SLA: 99.999%',
      };

      if (query.toLowerCase().includes('fraud') || query.toLowerCase().includes('unusual')) {
        responseObj.riskScore = 'Elevated';
        responseObj.summary = 'NOVA AI Anomaly Engine ran heuristic screening on 84,200 recent state transitions: No unauthorized withdrawal signatures detected. 2 low-confidence transactions were flagged and queued for 3-of-5 MPC threshold verification.';
      } else if (query.toLowerCase().includes('naira') || query.toLowerCase().includes('ngn') || query.toLowerCase().includes('lagos')) {
        responseObj.summary = 'Lagos settlement corridor telemetry: 14,240 TPS sustained with 24ms domestic finality. FX spreads on USD/NGN remain tight at 0.02% thanks to the automated liquidity buffer.';
      }

      const assistantMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: responseObj.summary,
        data: responseObj,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleActionExecute = (actionText: string) => {
    toast.success('Action Executed Successfully', {
      description: `${actionText} completed by NOVA Autonomous Treasury Engine.`,
    });
  };

  return (
    <section id="ai-assistant" className="relative py-20 bg-slate-100/60 dark:bg-[#080D1A] border-t border-slate-200 dark:border-slate-800/80 overflow-hidden transition-colors">
      
      {/* Background Neural Violet Halo */}
      <div className="absolute top-1/2 right-1/4 w-[700px] h-[500px] bg-gradient-to-tr from-purple-500/10 via-emerald-500/10 to-transparent blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-700 dark:text-purple-400 mb-2.5">
              <Icon icon="solar:cpu-bold" className="w-3.5 h-3.5 text-amber-500" />
              <span>AUTONOMOUS TREASURY COPILOT</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              NOVA AI Intelligence
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl mt-1.5">
              Deep heuristic modeling trained on pan-African currency velocity, real-time FX market microstructure, and automated fraud prevention.
            </p>
          </div>

          {/* Engine Status Tag */}
          <div className="flex items-center gap-3 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-2.5 rounded-lg self-start md:self-auto shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <div className="text-xs">
              <span className="text-slate-900 dark:text-white font-bold block font-mono">Neural Engine v4.2</span>
              <span className="text-slate-500 dark:text-slate-400 text-[11px]">Real-Time Streaming Active</span>
            </div>
          </div>
        </div>

        {/* Preset Prompt Buttons */}
        <div className="mb-5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2.5">
            Suggested Intelligence Scenarios (Click to Run)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {AI_PROMPT_PRESETS.map((preset) => {
              const isSelected = activePreset.id === preset.id;

              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-3 rounded-lg text-left border transition-all duration-200 group ${
                    isSelected
                      ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-400 dark:border-purple-500/60 shadow-sm ring-1 ring-purple-400'
                      : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded-sm bg-purple-500/10 text-purple-700 dark:text-purple-300">
                      {preset.category}
                    </span>
                    <Icon icon="solar:magic-stick-3-bold" className="w-3.5 h-3.5 text-amber-500 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                    {preset.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                    {preset.prompt}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Chat Console Window */}
        <div className="rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-2xl overflow-hidden backdrop-blur-2xl">
          
          {/* Terminal Top Bar */}
          <div className="px-5 py-3 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 border-l border-slate-200 dark:border-slate-800 pl-3">
                nova-ai-console ~ session_id: pan_africa_treasury_01
              </span>
            </div>

            <button
              onClick={() => {
                setMessages([messages[0]]);
                toast.info('Chat session history reset.');
              }}
              className="text-slate-500 hover:text-slate-900 dark:hover:text-white p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-xs flex items-center gap-1 transition-colors cursor-pointer"
              title="Reset conversation"
            >
              <Icon icon="solar:restart-bold" className="w-3 h-3" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>

          {/* Conversation Feed */}
          <div className="p-5 space-y-5 max-h-[440px] overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-md bg-gradient-to-tr from-amber-500 to-emerald-500 p-[1px] flex-shrink-0 mt-0.5">
                    <div className="w-full h-full bg-slate-900 rounded-[5px] flex items-center justify-center">
                      <Icon icon="solar:chat-round-dots-bold" className="w-3.5 h-3.5 text-amber-300" />
                    </div>
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-lg p-3.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 mb-1 text-[10px] font-mono opacity-60">
                    <span>{msg.sender === 'user' ? 'Treasury Director' : 'NOVA Copilot'}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <p className="whitespace-pre-line text-xs">{msg.content}</p>

                  {/* Rich Data Card */}
                  {msg.data && (
                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800/80 space-y-2.5">
                      
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">Heuristic Risk:</span>
                          <span
                            className={`px-1.5 py-0.5 rounded-sm text-[10px] font-bold font-mono ${
                              msg.data.riskScore === 'Low'
                                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                                : msg.data.riskScore === 'Medium'
                                ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20'
                                : 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20'
                            }`}
                          >
                            {msg.data.riskScore.toUpperCase()}
                          </span>
                        </div>
                        <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 font-mono">
                          {msg.data.impactMetric}
                        </span>
                      </div>

                      <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300 pl-0.5">
                        {msg.data.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-purple-500 mt-0.5">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 bg-white dark:bg-slate-900/60 p-2.5 rounded-md border border-slate-200 dark:border-slate-800">
                        <span className="text-[11px] text-slate-700 dark:text-slate-300 font-medium">
                          {msg.data.recommendedAction}
                        </span>
                        <button
                          onClick={() => handleActionExecute(msg.data!.actionButtonText)}
                          className="px-3 py-1 rounded text-xs font-bold text-slate-950 bg-gradient-to-r from-purple-400 to-emerald-400 hover:from-purple-300 hover:to-emerald-300 transition-all shadow-sm active:scale-95 flex-shrink-0"
                        >
                          {msg.data.actionButtonText}
                        </button>
                      </div>

                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-md bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon icon="solar:user-bold" className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-slate-500 text-xs font-mono">
                <div className="w-7 h-7 rounded-md bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                  <Icon icon="solar:chat-round-dots-bold" className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                </div>
                <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                  <span className="ml-2 text-slate-500 text-[11px]">NOVA AI reasoning...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Interactive Chat Input Form */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2.5"
          >
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Ask NOVA AI anything about African currency rails, liquidity buffers, or counterparty settlement..."
              className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md px-3.5 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              disabled={!customInput.trim() || isTyping}
              className="p-2 rounded-md bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 disabled:opacity-40 text-white transition-all shadow-sm active:scale-95 flex items-center justify-center cursor-pointer"
            >
              <Icon icon="solar:plain-bold" className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
};
