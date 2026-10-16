'use client';

import React from 'react';
import { TaskFilter } from '@/types/task';
import { Check, Clock, ListFilter, CloudCheck } from 'lucide-react';

interface TaskFiltersProps {
  currentFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  counts: {
    all: number;
    pending: number;
    completed: number;
  };
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  currentFilter,
  onFilterChange,
  counts,
}) => {
  const filters: { id: TaskFilter; label: string; count: number; icon: React.ReactNode }[] = [
    {
      id: 'all',
      label: 'All',
      count: counts.all,
      icon: <ListFilter className="w-3.5 h-3.5" />,
    },
    {
      id: 'pending',
      label: 'Pending',
      count: counts.pending,
      icon: <Clock className="w-3.5 h-3.5" />,
    },
    {
      id: 'completed',
      label: 'Completed',
      count: counts.completed,
      icon: <Check className="w-3.5 h-3.5" />,
    },
  ];

  const currentViewLabel =
    currentFilter === 'all'
      ? 'All Tasks'
      : currentFilter === 'pending'
      ? 'Pending Tasks'
      : 'Completed Tasks';

  return (
    <div className="space-y-3 mb-4">
      {/* Top Filter Selection Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-semibold text-slate-500">
            Filter by:
          </span>
          <div className="inline-flex p-1 bg-slate-100/90 rounded-xl border border-slate-200/80">
            {filters.map((filter) => {
              const isActive = currentFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => onFilterChange(filter.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                  aria-pressed={isActive}
                >
                  {filter.icon}
                  <span>{filter.label}</span>
                  <span
                    className={`ml-1 text-[11px] px-1.5 py-0.2 rounded-full font-semibold ${
                      isActive
                        ? 'bg-blue-700/80 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {filter.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Auto-saving status indicator as seen in Section 1.3 */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <CloudCheck className="w-4 h-4 text-emerald-600" />
          <span>Auto-saving enabled</span>
        </div>
      </div>

      {/* Current View Banner (matching Section 1.3 screenshot) */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          <span className="font-medium text-slate-700">Current View:</span>
          <span className="font-semibold text-blue-700">{currentViewLabel}</span>
        </div>
        <span className="text-slate-400">
          Showing {counts[currentFilter]} {counts[currentFilter] === 1 ? 'task' : 'tasks'}
        </span>
      </div>
    </div>
  );
};
