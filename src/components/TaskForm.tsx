'use client';

import React, { useState } from 'react';
import { SectionMode } from './AppHeader';

interface TaskFormProps {
  sectionMode: SectionMode;
  onAddTask: (title: string) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ sectionMode, onAddTask }) => {
  const [inputTitle, setInputTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isSection11 = sectionMode === '1.1';
  const placeholder = isSection11 ? 'Enter a task...' : 'Enter a new task...';
  const buttonLabel = isSection11 ? 'Add' : 'Add Task';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputTitle.trim();

    if (!trimmed) {
      setErrorMessage('Please enter a task before adding.');
      return;
    }

    onAddTask(trimmed);
    setInputTitle('');
    setErrorMessage(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
    if (errorMessage && e.target.value.trim().length > 0) {
      setErrorMessage(null);
    }
  };

  return (
    <div className="w-full">
      {/* Section 1.1 displays "Add a New Task" heading */}
      {isSection11 && (
        <h2 className="text-base font-bold text-slate-800 mb-3 tracking-tight">
          Add a New Task
        </h2>
      )}

      <form onSubmit={handleSubmit} className="space-y-1.5">
        <div className="flex items-center gap-3">
          <input
            id="task-input"
            type="text"
            value={inputTitle}
            onChange={handleChange}
            placeholder={placeholder}
            className={`flex-1 px-4 py-2.5 rounded-lg border text-sm text-slate-800 placeholder-slate-400 bg-white transition-all duration-150 ${
              errorMessage
                ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none'
            }`}
            aria-label="New task title"
            aria-invalid={errorMessage ? 'true' : 'false'}
          />

          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm transition-colors duration-150 cursor-pointer shrink-0"
          >
            {buttonLabel}
          </button>
        </div>

        {errorMessage && (
          <p
            role="alert"
            className="text-xs text-red-500 pt-0.5 pl-1 font-medium animate-in fade-in"
          >
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
};
