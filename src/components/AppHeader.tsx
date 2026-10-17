'use client';

import React from 'react';
import { Check } from 'lucide-react';

export type SectionMode = '1.1' | '1.2' | '1.3';

interface AppHeaderProps {
  currentSection: SectionMode;
  onSectionChange: (section: SectionMode) => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  currentSection,
  onSectionChange,
}) => {
  // Section 1.1 uses bright royal blue, Section 1.2 & 1.3 use dark navy slate
  const headerBg =
    currentSection === '1.1' ? 'bg-[#2563eb]' : 'bg-[#1f2d42]';
  const iconColor =
    currentSection === '1.1' ? 'text-[#2563eb]' : 'text-[#1f2d42]';

  return (
    <header className={`w-full ${headerBg} text-white shadow-xs transition-colors duration-200`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Left: App Logo & Name */}
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center shadow-xs">
            <Check className={`w-4 h-4 ${iconColor} stroke-[3.2]`} />
          </div>
          <span className="text-lg font-bold tracking-tight text-white select-none">
            Task Tracker
          </span>
        </div>

        {/* Right: Section View Switcher */}
        <nav
          aria-label="Assessment Section Switcher"
          className="flex items-center gap-1 bg-black/20 p-1 rounded-lg text-xs"
        >
          <span className="text-white/60 px-1.5 font-medium hidden sm:inline text-[11px]">
            View:
          </span>
          <button
            type="button"
            onClick={() => onSectionChange('1.1')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
              currentSection === '1.1'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
            title="Section 1.1: Create and Display Tasks"
          >
            Sec 1.1
          </button>
          <button
            type="button"
            onClick={() => onSectionChange('1.2')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
              currentSection === '1.2'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
            title="Section 1.2: Manage Tasks"
          >
            Sec 1.2
          </button>
          <button
            type="button"
            onClick={() => onSectionChange('1.3')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
              currentSection === '1.3'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
            title="Section 1.3: Filter and Save Tasks"
          >
            Sec 1.3
          </button>
        </nav>
      </div>
    </header>
  );
};
