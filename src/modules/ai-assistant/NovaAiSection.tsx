import React, { useState, useEffect, useRef } from 'react';
import { 
  AI_PROMPT_PRESETS, 
  AIPromptSuggestion 
} from '@/data/novaData';
import { 
  Cpu, 
  Sparkles, 
  Send, 
  ShieldAlert, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  AlertTriangle, 
  Clock, 
  Terminal, 
  CornerDownLeft,
  Bot,
  User,
  RotateCcw
} from 'lucide-react';
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

    // Generate smart context-aware response
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
    <section id="ai-assistant" className="relative py-24 bg-[#080D1A] border-t border-slate-800/80 overflow-hidden">
      
      {/* Background Neural Violet/Emerald Halo */}
      <div className="absolute top-1/2 right-1/4 w-[700px] h-[500px] bg-gradient-to-tr from-purple-500/10 via-emerald-500/10 to-transparent blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-400 mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>AUTONOMOUS TREASURY COPILOT</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              NOVA AI Intelligence
            </h2>
            <p className="text-slate-400 text-base max-w-xl mt-2">
              Deep heuristic modeling trained on pan-African currency velocity, real-time FX market microstructure, and automated fraud prevention.
            </p>
          </div>

          {/* Engine Status Tag */}
          <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 p-2.5 rounded-2xl self-start md:self-auto">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
            </span>
            <div className="text-xs">
              <span className="text-white font-bold block font-mono">Neural Engine v4.2</span>
              <span className="text-slate-400 text-[11px]">Real-Time Streaming Active</span>
            </div>
          </div>
        </div>

        {/* Preset Prompt Buttons */}
        <div className="mb-6">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
            Suggested Intelligence Scenarios (Click to Run)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {AI_PROMPT_PRESETS.map((preset) => {
              const isSelected = activePreset.id === preset.id;

              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-3.5 rounded-2xl text-left border transition-all duration-200 backdrop-blur-md group ${
                    isSelected
                      ? 'bg-purple-950/40 border-purple-500/60 shadow-lg shadow-purple-500/10 scale-[1.01]'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                      {preset.category}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-purple-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                    {preset.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                    {preset.prompt}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Chat Console Window */}
        <div className="rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-2xl">
          
          {/* Terminal Top Bar */}
          <div className="px-6 py-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono text-slate-400 border-l border-slate-800 pl-3">
                nova-ai-console ~ session_id: pan_africa_treasury_01
              </span>
            </div>

            <button
              onClick={() => {
                setMessages([messages[0]]);
                toast.info('Chat session history reset.');
              }}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 text-xs flex items-center gap-1 transition-colors"
              title="Reset conversation"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>

          {/* Conversation Feed */}
          <div className="p-6 space-y-6 max-h-[480px] overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* Assistant Avatar */}
                {msg.sender === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-500 to-cyan-500 p-[1.5px] flex-shrink-0 mt-0.5">
                    <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                      <Bot className="w-4 h-4 text-purple-300" />
                    </div>
                  </div>
                )}

                {/* Message Body */}
                <div
                  className={`max-w-2xl rounded-2xl p-4 text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-purple-600/30 border border-purple-500/40 text-white shadow-lg'
                      : 'bg-slate-950/70 border border-slate-800 text-slate-200 shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 mb-1.5 text-[11px] font-mono opacity-60">
                    <span>{msg.sender === 'user' ? 'Treasury Director' : 'NOVA Copilot'}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <p className="whitespace-pre-line text-sm">{msg.content}</p>

                  {/* Rich Data Card for Assistant */}
                  {msg.data && (
                    <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
                      
                      {/* Risk & Impact Metrics Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">Heuristic Risk:</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-bold font-mono ${
                              msg.data.riskScore === 'Low'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : msg.data.riskScore === 'Medium'
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            }`}
                          >
                            {msg.data.riskScore.toUpperCase()}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-emerald-300 font-mono">
                          {msg.data.impactMetric}
                        </span>
                      </div>

                      {/* Bulleted Insights */}
                      <ul className="space-y-1.5 text-xs text-slate-300 pl-1">
                        {msg.data.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-purple-400 mt-1">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Actionable Trigger */}
                      <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-300 font-medium">
                          {msg.data.recommendedAction}
                        </span>
                        <button
                          onClick={() => handleActionExecute(msg.data!.actionButtonText)}
                          className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-gradient-to-r from-purple-400 to-emerald-400 hover:from-purple-300 hover:to-emerald-300 transition-all shadow-md active:scale-95 flex-shrink-0"
                        >
                          {msg.data.actionButtonText}
                        </button>
                      </div>

                    </div>
                  )}
                </div>

                {/* User Avatar */}
                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-4 h-4 text-slate-300" />
                  </div>
                )}
              </div>
            ))}

            {/* Simulated Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 items-center text-slate-400 text-xs font-mono">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-purple-300 animate-pulse" />
                </div>
                <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                  <span className="ml-2 text-slate-400">NOVA AI reasoning...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Interactive Chat Input Form */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-3"
          >
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Ask NOVA AI anything about African currency rails, liquidity buffers, or counterparty settlement..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              disabled={!customInput.trim() || isTyping}
              className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white transition-all shadow-md active:scale-95 flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
};
