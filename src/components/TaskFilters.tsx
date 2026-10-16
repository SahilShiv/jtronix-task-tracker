'use client';

import React from 'react';
import { TaskFilter } from '@/types/task';
import { Check, Clock, ListFilter, Search, X } from 'lucide-react';

interface TaskFiltersProps {
  currentFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  counts: {
    all: number;
    pending: number;
    completed: number;
  };
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  currentFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
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
      {/* Top Filter Selection Row & Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Segmented Filter Buttons */}
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-semibold text-slate-500">
            Filter by:
          </span>
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200/80">
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

        {/* Real-time Search Filter Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-9 pr-8 py-2 rounded-xl text-xs sm:text-sm bg-white border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder-slate-400 text-slate-900 transition-all"
            aria-label="Search tasks"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Current View Banner (matching Section 1.3 specification) */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          <span className="font-medium text-slate-700">Current View:</span>
          <span className="font-semibold text-blue-700">
            {currentViewLabel} {searchQuery ? `(matching "${searchQuery}")` : ''}
          </span>
        </div>
        <span className="text-slate-400">
          Showing {counts[currentFilter]} {counts[currentFilter] === 1 ? 'task' : 'tasks'}
        </span>
      </div>
    </div>
  );
};
