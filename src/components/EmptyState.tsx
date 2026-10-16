'use client';

import React from 'react';
import { TaskFilter } from '@/types/task';
import { ClipboardList, CheckCircle2, Clock } from 'lucide-react';

interface EmptyStateProps {
  filter: TaskFilter;
  hasAnyTasks: boolean;
  onResetFilter?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  filter,
  hasAnyTasks,
  onResetFilter,
}) => {
  if (!hasAnyTasks) {
    return (
      <div className="py-12 px-4 text-center">
        <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-xs">
          <ClipboardList className="w-7 h-7" />
        </div>
        <h3 className="text-base font-semibold text-slate-800 mb-1">
          No tasks created yet
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
          Type a task in the field above and press <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-700 font-mono text-[11px]">Enter</kbd> or click <strong>Add Task</strong> to begin.
        </p>
      </div>
    );
  }

  if (filter === 'pending') {
    return (
      <div className="py-12 px-4 text-center">
        <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-xs">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="text-base font-semibold text-slate-800 mb-1">
          All caught up!
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mb-3">
          You have no pending tasks remaining. Great job getting everything done!
        </p>
        {onResetFilter && (
          <button
            onClick={onResetFilter}
            className="text-xs font-medium text-blue-600 hover:text-blue-800 underline underline-offset-2 cursor-pointer"
          >
            View all tasks
          </button>
        )}
      </div>
    );
  }

  if (filter === 'completed') {
    return (
      <div className="py-12 px-4 text-center">
        <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shadow-xs">
          <Clock className="w-7 h-7" />
        </div>
        <h3 className="text-base font-semibold text-slate-800 mb-1">
          No completed tasks yet
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mb-3">
          Complete pending tasks by clicking their checkboxes to see them listed here.
        </p>
        {onResetFilter && (
          <button
            onClick={onResetFilter}
            className="text-xs font-medium text-blue-600 hover:text-blue-800 underline underline-offset-2 cursor-pointer"
          >
            View all tasks
          </button>
        )}
      </div>
    );
  }

  return null;
};
