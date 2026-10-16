'use client';

import React from 'react';
import { Layers, CheckCircle2, Clock } from 'lucide-react';
import { TaskStats as TaskStatsType } from '@/types/task';

interface TaskStatsProps {
  stats: TaskStatsType;
}

export const TaskStats: React.FC<TaskStatsProps> = ({ stats }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5">
      <div className="grid grid-cols-3 divide-x divide-slate-100">
        {/* Total Tasks */}
        <div className="px-2 sm:px-4 first:pl-0">
          <div className="flex items-center gap-1.5 text-slate-500 mb-1">
            <Layers className="w-4 h-4 text-slate-400 hidden sm:inline-block" />
            <span className="text-xs sm:text-sm font-medium text-slate-600">Total Tasks</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-800">
              {stats.total}
            </span>
          </div>
        </div>

        {/* Completed */}
        <div className="px-2 sm:px-4">
          <div className="flex items-center gap-1.5 text-emerald-600 mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 hidden sm:inline-block" />
            <span className="text-xs sm:text-sm font-semibold text-emerald-700">Completed</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-emerald-600">
              {stats.completed}
            </span>
            <span className="text-xs text-emerald-600/80 font-medium hidden md:inline">
              {stats.total > 0 ? `${stats.completionRate}%` : '0%'}
            </span>
          </div>
        </div>

        {/* Pending */}
        <div className="px-2 sm:px-4 last:pr-0">
          <div className="flex items-center gap-1.5 text-amber-600 mb-1">
            <Clock className="w-4 h-4 text-amber-500 hidden sm:inline-block" />
            <span className="text-xs sm:text-sm font-semibold text-amber-700">Pending</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-amber-600">
              {stats.pending}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
