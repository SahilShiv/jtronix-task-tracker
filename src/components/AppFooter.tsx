'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const AppFooter: React.FC = () => {
  return (
    <footer className="mt-auto py-6 text-center text-xs text-slate-500 border-t border-slate-200/80 bg-white/60 backdrop-blur-xs">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5 text-slate-600 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Task Tracker · Private & saved in this browser</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400 text-[11px]">
          <span>
            Shortcut: <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-600 font-mono">Enter</kbd> to add
          </span>
          <span>•</span>
          <span>Automated local persistence</span>
        </div>
      </div>
    </footer>
  );
};
