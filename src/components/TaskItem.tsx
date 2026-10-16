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
    <div
      className={`group flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border transition-all duration-150 ${
        task.completed
          ? 'bg-slate-50/50 border-slate-200/70 hover:bg-slate-50'
          : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-xs'
      }`}
    >
      {/* Left side: Checkbox + Task Title */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <label
          htmlFor={`task-check-${task.id}`}
          className="relative flex items-center justify-center w-5 h-5 rounded-md cursor-pointer shrink-0 transition-colors"
        >
          <input
            id={`task-check-${task.id}`}
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="sr-only peer"
            aria-label={`Mark "${task.title}" as ${
              task.completed ? 'pending' : 'completed'
            }`}
          />
          <div
            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
              task.completed
                ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                : 'border-slate-300 bg-white hover:border-blue-500 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-400'
            }`}
          >
            {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </div>
        </label>

        <span
          onClick={() => onToggle(task.id)}
          className={`text-sm sm:text-base break-words cursor-pointer select-none transition-all ${
            task.completed
              ? 'line-through text-slate-400'
              : 'text-slate-700 font-medium hover:text-blue-700'
          }`}
          title={task.title}
        >
          {task.title}
        </span>
      </div>

      {/* Right side: Status Badge + Delete Button */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Status Label Pill */}
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold select-none border transition-colors ${
            task.completed
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-amber-50 text-amber-700 border-amber-200'
          }`}
        >
          {task.completed ? 'Completed' : 'Pending'}
        </span>

        {/* Delete Button */}
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="p-1.5 sm:p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-300"
          title="Delete task"
          aria-label={`Delete task "${task.title}"`}
        >
          <Trash2 className="w-4 h-4 stroke-[2]" />
        </button>
      </div>
    </div>
  );
};
