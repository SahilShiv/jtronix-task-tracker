'use client';

import React from 'react';
import { Check } from 'lucide-react';

export const AppHeader: React.FC = () => {
  return (
    <header className="w-full bg-[#1f2d42] text-white shadow-xs">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 flex items-center">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center shadow-xs">
            <Check className="w-4 h-4 text-[#1f2d42] stroke-[3.2]" />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-white select-none">
            Task Tracker
          </h1>
        </div>
      </div>
    </header>
  );
};
