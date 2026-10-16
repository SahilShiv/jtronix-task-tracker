'use client';

import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

export const AppFooter: React.FC = () => {
  return (
    <footer className="mt-auto py-8 text-center text-xs text-slate-500 border-t border-slate-200/80 bg-white/50 backdrop-blur-xs">
      <div className="max-w-4xl mx-auto px-4 space-y-2">
        <div className="flex items-center justify-center gap-1.5 text-slate-600 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Built with React and Next.js · Your tasks stay in this browser.</span>
        </div>
        <p className="text-slate-400">
          Created for JTRONIX Frontend Internship Assessment with{' '}
          <Heart className="w-3 h-3 text-red-400 inline mx-0.5 fill-current" /> by Candidate
        </p>
      </div>
    </footer>
  );
};
