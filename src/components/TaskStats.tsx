'use client';

import React from 'react';
import { TaskStats as TaskStatsType } from '@/types/task';

interface TaskStatsProps {
  stats: TaskStatsType;
}

export const TaskStats: React.FC<TaskStatsProps> = ({ stats }) => {
  return (
    <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 my-5">
      <div className="grid grid-cols-3 divide-x divide-slate-200/70 text-left">
        {/* Total Tasks */}
        <div className="px-3 sm:px-4 first:pl-2">
          <p className="text-xs text-slate-500 font-medium">Total Tasks</p>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
            {stats.total}
          </p>
        </div>

        {/* Completed */}
        <div className="px-3 sm:px-4">
          <p className="text-xs text-slate-500 font-medium">Completed</p>
          <p className="text-xl sm:text-2xl font-bold text-emerald-600 mt-0.5">
            {stats.completed}
          </p>
        </div>

        {/* Pending */}
        <div className="px-3 sm:px-4 last:pr-2">
          <p className="text-xs text-slate-500 font-medium">Pending</p>
          <p className="text-xl sm:text-2xl font-bold text-amber-500 mt-0.5">
            {stats.pending}
          </p>
        </div>
      </div>
    </div>
  );
};
