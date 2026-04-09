// --------------------------------------------------------
// ChatBubble — message bubble for the Paradise Copilot
// --------------------------------------------------------
import { Bot, User } from 'lucide-react';

export default function ChatBubble({ message }) {
  const isAI = message?.role === 'ai';
  const content = message?.content || (typeof message === 'string' ? message : '');

  return (
    <div className={`flex gap-3 animate-fade-in ${isAI ? '' : 'flex-row-reverse'}`}>
      {/* Avatar */}
      <div
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
          isAI
            ? 'bg-accent-500/20 text-accent-400'
            : 'bg-paradise-600 text-paradise-200'
        }`}
      >
        {isAI ? <Bot size={16} /> : <User size={16} />}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isAI
            ? 'bg-paradise-700/60 text-paradise-100 rounded-tl-sm'
            : 'bg-accent-500/15 text-paradise-100 rounded-tr-sm border border-accent-500/10'
        }`}
      >
        {content}
      </div>
    </div>
  );
}
