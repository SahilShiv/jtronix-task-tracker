'use client';

import React from 'react';
import { TaskFilter } from '@/types/task';
import { Cloud, CalendarCheck } from 'lucide-react';

interface TaskFiltersProps {
  currentFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  currentFilter,
  onFilterChange,
}) => {
  const currentViewLabel =
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
        </div>

        {/* Auto-saving status indicator */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-normal select-none">
          <Cloud className="w-3.5 h-3.5 text-slate-400" />
          <span>Auto-saving enabled</span>
        </div>
      </div>

      {/* Current View Banner */}
      <div className="mt-3.5 flex items-center gap-2 px-3.5 py-2.5 bg-slate-50/90 border border-slate-200/70 rounded-xl text-xs text-slate-700 font-medium">
        <CalendarCheck className="w-4 h-4 text-slate-400 shrink-0" />
        <span>Current View: {currentViewLabel}</span>
      </div>
    </div>
  );
};
