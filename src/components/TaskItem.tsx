'use client';

import React from 'react';
import { Task } from '@/types/task';
import { Trash2, Check } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-between p-3 sm:p-3.5 bg-white border border-slate-200/90 rounded-xl transition-all duration-150 hover:border-slate-300">
      {/* Left: Custom Checkbox + Task Title */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          className={`w-5 h-5 rounded-md flex items-center justify-center transition-all cursor-pointer shrink-0 ${
            task.completed
              ? 'bg-blue-600 border border-blue-600 text-white'
              : 'border border-slate-300 bg-white hover:border-blue-400'
          }`}
          aria-label={`Mark "${task.title}" as ${
            task.completed ? 'pending' : 'completed'
          }`}
        >
          {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        <span
          onClick={() => onToggle(task.id)}
          className={`text-sm break-words cursor-pointer select-none leading-normal ${
            task.completed ? 'line-through text-slate-400' : 'text-slate-800'
          }`}
        >
          {task.title}
        </span>
      </div>

      {/* Right: Status Badge + Delete Button */}
      <div className="flex items-center gap-3 shrink-0 ml-3">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium select-none ${
            task.completed
              ? 'bg-emerald-50 text-emerald-600'
              : 'bg-amber-50 text-amber-600'
          }`}
        >
          {task.completed ? 'Completed' : 'Pending'}
        </span>

        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="p-1.5 rounded-lg bg-red-50/70 text-red-500 hover:bg-red-100 hover:text-red-600 transition-colors cursor-pointer"
          title={`Delete "${task.title}"`}
          aria-label={`Delete task "${task.title}"`}
        >
          <Trash2 className="w-4 h-4 stroke-[1.8]" />
        </button>
      </div>
    </div>
  );
};
