'use client';

import React from 'react';
import { TaskFilter } from '@/types/task';
import { SectionMode } from './AppHeader';
import { Cloud, CalendarCheck } from 'lucide-react';

interface TaskFiltersProps {
  sectionMode: SectionMode;
  currentFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  sectionMode,
  currentFilter,
  onFilterChange,
}) => {
  const isSection12 = sectionMode === '1.2';
  const isSection13 = sectionMode === '1.3';

  const filterLabel =
    currentFilter === 'all'
      ? 'All Tasks'
      : currentFilter === 'pending'
      ? 'Pending Tasks'
      : 'Completed Tasks';

  return (
    <div className="w-full mb-4">
      {/* Filter Row */}
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center gap-2.5">
          <span className="text-xs sm:text-sm font-medium text-slate-500">
            Filter by:
          </span>

          {isSection12 ? (
            // Section 1.2 pill buttons
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onFilterChange('all')}
                className={`px-3.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  currentFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => onFilterChange('pending')}
                className={`px-3.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  currentFilter === 'pending'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Pending
              </button>
              <button
                type="button"
                onClick={() => onFilterChange('completed')}
                className={`px-3.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  currentFilter === 'completed'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Completed
              </button>
            </div>
          ) : (
            // Section 1.3 tabs style matching Image 3
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onFilterChange('all')}
                className={`px-2.5 py-1 text-xs font-medium cursor-pointer transition-colors ${
                  currentFilter === 'all'
                    ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => onFilterChange('pending')}
                className={`px-3.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  currentFilter === 'pending'
                    ? 'bg-blue-600 text-white border border-blue-600'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Pending
              </button>
              <button
                type="button"
                onClick={() => onFilterChange('completed')}
                className={`px-3.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  currentFilter === 'completed'
                    ? 'bg-blue-600 text-white border border-blue-600'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Completed
              </button>
            </div>
          )}
        </div>

        {/* Section 1.3 Auto-saving status indicator */}
        {isSection13 && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-normal">
            <Cloud className="w-3.5 h-3.5 text-slate-400" />
            <span>Auto-saving enabled</span>
          </div>
        )}
      </div>

      {/* Section 1.3 Current View Banner */}
      {isSection13 && (
        <div className="mt-3.5 flex items-center gap-2 px-3.5 py-2.5 bg-slate-50/90 border border-slate-200/70 rounded-xl text-xs text-slate-700 font-medium">
          <CalendarCheck className="w-4 h-4 text-slate-400 shrink-0" />
          <span>Current View: {filterLabel}</span>
        </div>
      )}
    </div>
  );
};
