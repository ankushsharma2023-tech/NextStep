import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, ChevronLeft, MessageCircle, Send, Sparkles, X } from 'lucide-react';

const starterMessages = [
  {
    id: 1,
    role: 'assistant',
    text: 'Hi, I am Ankush AI. Ask me about careers, study plans, interviews, or what to improve next.',
  },
];

const quickPrompts = [
  'I am confused between frontend and data analyst.',
  'My interview preparation is weak.',
  'Tell me what skill I should learn first.',
  'I want advice for college reviews and placement.',
];

function getReply(message) {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('frontend') || lowerMessage.includes('data analyst')) {
    return 'Frontend is better if you enjoy UI, design, and React. Data Analyst is better if you like numbers, SQL, and dashboards. Start with the one that matches your daily interest, not just salary.';
  }

  if (lowerMessage.includes('interview') || lowerMessage.includes('placement')) {
    return 'Focus on 3 things: one strong project, core concepts, and daily problem solving. If your basics are weak, fix them first before chasing advanced topics.';
  }

  if (lowerMessage.includes('skill') || lowerMessage.includes('learn first')) {
    return 'Learn the foundation first: communication, basics of your chosen track, and one coding language. After that, move to projects and interview practice.';
  }

  if (lowerMessage.includes('college') || lowerMessage.includes('review')) {
    return 'For college reviews, comment on labs, faculty support, placements, internships, and peer culture. These are the most useful points for other students.';
  }

  if (lowerMessage.includes('anxiety') || lowerMessage.includes('stress') || lowerMessage.includes('confused')) {
    return 'Pick one track for 30 days, set a small weekly goal, and review progress every Sunday. Small consistent work beats switching plans every day.';
  }

  return 'Try to break the problem into one goal, one skill gap, and one next action. If you want, I can help you choose a roadmap, make a study plan, or review your college choice.';
}

export default function AnkushAiSidebar() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState(starterMessages);

  const canSend = useMemo(() => message.trim().length > 0, [message]);

  const sendMessage = (text) => {
    const trimmedText = text.trim();

    if (!trimmedText) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      role: 'user',
      text: trimmedText,
    };

    const assistantMessage = {
      id: Date.now() + 1,
      role: 'assistant',
      text: getReply(trimmedText),
    };

    setChat((current) => [...current, userMessage, assistantMessage]);
    setMessage('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {open ? (
          <motion.aside
            initial={{ opacity: 0, x: 24, y: 16 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 24, y: 16 }}
            transition={{ duration: 0.22 }}
            className="mb-4 w-[92vw] max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-[#09111f]/95 backdrop-blur-2xl"
            style={{ boxShadow: '0 30px 120px rgba(0, 0, 0, 0.55), 0 0 42px rgba(var(--accent-cyan), 0.08)' }}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r from-neonCyan to-neonPurple text-black">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neonCyan">Ankush AI</p>
                  <p className="text-xs text-gray-400">Career help and quick guidance</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/10 p-2 text-gray-300 transition hover:bg-white/5 hover:text-white"
                aria-label="Close Ankush AI"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-96 space-y-3 overflow-y-auto px-4 py-4">
              {chat.map((entry) => (
                <div
                  key={entry.id}
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${entry.role === 'user' ? 'ml-auto bg-gradient-to-r from-neonCyan to-neonPurple text-black' : 'bg-white/5 text-gray-100'}`}
                >
                  {entry.text}
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 px-4 py-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-left text-xs text-gray-300 transition hover:border-neonCyan/40 hover:text-white"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-3 py-2">
                <input
                  type="text"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && canSend) {
                      sendMessage(message);
                    }
                  }}
                  placeholder="Ask Ankush AI..."
                  className="flex-1 bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-gray-500"
                />
                <button
                  type="button"
                  onClick={() => sendMessage(message)}
                  disabled={!canSend}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-neonCyan to-neonPurple text-black transition disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="ml-auto flex items-center gap-3 rounded-full border border-white/10 bg-[#09111f]/95 px-4 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-neonCyan/40"
        style={{ boxShadow: '0 16px 60px rgba(0, 0, 0, 0.35), 0 0 24px rgba(var(--accent-cyan), 0.08)' }}
        aria-label="Toggle Ankush AI sidebar"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-neonCyan to-neonPurple text-black">
          <Sparkles className="h-4 w-4" />
        </span>
        <span>Ask Ankush AI</span>
        {open ? <ChevronLeft className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
      </button>
    </div>
  );
}