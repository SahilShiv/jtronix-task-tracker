'use client';

import React, { useState } from 'react';
import { Plus, AlertCircle, Flag } from 'lucide-react';
import { Priority } from '@/types/task';

interface TaskFormProps {
  onAddTask: (title: string, priority: Priority) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [inputTitle, setInputTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputTitle.trim();

    if (!trimmed) {
      setErrorMessage('Please enter a task title before adding.');
      return;
    }

    onAddTask(trimmed, priority);
    setInputTitle('');
    setErrorMessage(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
    if (errorMessage && e.target.value.trim().length > 0) {
      setErrorMessage(null);
    }
  };

  const priorities: { id: Priority; label: string; activeColor: string }[] = [
    { id: 'low', label: 'Low', activeColor: 'bg-slate-700 text-white' },
    { id: 'medium', label: 'Medium', activeColor: 'bg-amber-600 text-white' },
    { id: 'high', label: 'High', activeColor: 'bg-rose-600 text-white' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-slate-800">
          Add a New Task
        </h3>

        {/* Priority Selector */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs">
          <span className="text-slate-400 pl-1.5 pr-0.5 hidden sm:inline-flex items-center gap-1 font-medium">
            <Flag className="w-3 h-3" /> Priority:
          </span>
          {priorities.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPriority(p.id)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                priority === p.id
                  ? `${p.activeColor} shadow-xs`
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              id="task-input"
              type="text"
              value={inputTitle}
              onChange={handleChange}
              placeholder="Enter a new task..."
              className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder-slate-400 bg-slate-50/60 focus:bg-white focus:outline-none transition-all duration-150 ${
                errorMessage
                  ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                  : 'border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
              }`}
              aria-label="New task title"
              aria-invalid={errorMessage ? 'true' : 'false'}
              aria-describedby={errorMessage ? 'task-error-message' : undefined}
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm shadow-sm hover:shadow transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400 shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Task</span>
          </button>
        </div>

        {errorMessage && (
          <div
            id="task-error-message"
            role="alert"
            className="flex items-center gap-1.5 text-xs font-medium text-red-600 pt-1 pl-1 transition-opacity animate-in fade-in"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </form>
    </div>
  );
};
