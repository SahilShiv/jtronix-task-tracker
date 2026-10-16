'use client';

import React from 'react';
import { CheckSquare, HardDrive, Sparkles } from 'lucide-react';

interface AppHeaderProps {
  appName?: string;
  subtitle?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  appName = 'Task Tracker',
  subtitle = 'A clearer way to get things done.',
}) => {
  return (
    <header className="w-full bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white shadow-md">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-white shadow-inner">
              <CheckSquare className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {appName}
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium bg-white/20 text-white px-2 py-0.5 rounded-full border border-white/20">
                  <Sparkles className="w-3 h-3" />
                  JTRONIX Edition
                </span>
              </div>
              <p className="text-xs sm:text-sm text-blue-100/90 font-medium mt-0.5">
                {subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center self-start sm:self-auto">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/10 hover:bg-white/15 border border-white/20 text-blue-50 backdrop-blur-sm transition-all"
              title="All tasks and completion statuses are automatically saved to your browser localStorage"
            >
              <HardDrive className="w-3.5 h-3.5 text-blue-200" />
              <span>Local Storage Active</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
