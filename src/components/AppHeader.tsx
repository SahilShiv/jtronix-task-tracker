'use client';

import React from 'react';
import { CheckSquare } from 'lucide-react';

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
        <div className="flex items-center space-x-3.5">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-white shadow-sm">
            <CheckSquare className="w-6 h-6 stroke-[2.3]" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
              {appName}
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/90 font-medium mt-0.5">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
