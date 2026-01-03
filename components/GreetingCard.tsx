
import React from 'react';
import { GreetingVariant } from '../types';

interface GreetingCardProps {
  variant: GreetingVariant;
}

const GreetingCard: React.FC<GreetingCardProps> = ({ variant }) => {
  return (
    <div className="glass p-6 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 group cursor-default">
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-blue-400 transition-colors">
          {variant.language}
        </span>
        <span className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity">👋</span>
      </div>
      <h3 className="text-3xl font-bold mb-2 group-hover:scale-105 transition-transform origin-left">
        {variant.text}
      </h3>
      <p className="text-slate-400 text-sm mb-4 italic">"{variant.pronunciation}"</p>
      <div className="pt-4 border-t border-slate-700/50">
        <p className="text-slate-300 text-sm leading-relaxed">
          {variant.context}
        </p>
      </div>
    </div>
  );
};

export default GreetingCard;
