'use client';

import React from 'react';
import { Sparkles, CheckCheck } from 'lucide-react';

interface ProgressOverviewProps {
  total: number;
  completed: number;
  completionRate: number;
}

export const ProgressOverview: React.FC<ProgressOverviewProps> = ({
  total,
  completed,
  completionRate,
}) => {
  const isAllDone = total > 0 && completed === total;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
              My Tasks
            </h2>
            {isAllDone && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full animate-bounce">
                <CheckCheck className="w-3.5 h-3.5" /> All tasks completed!
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Track daily activities, manage progress, and accomplish your goals.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/70">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-medium text-slate-600">Completion:</span>
          <span className="text-sm font-bold text-slate-900">
            {completionRate}%
          </span>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200/50">
        <div
          role="progressbar"
          aria-valuenow={completionRate}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Task completion progress"
          className={`h-full rounded-full transition-all duration-500 ease-out ${
            isAllDone
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600'
          }`}
          style={{ width: `${completionRate}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium mt-2">
        <span>0%</span>
        <span>
          {completed} of {total} completed
        </span>
        <span>100%</span>
      </div>
    </div>
  );
};
