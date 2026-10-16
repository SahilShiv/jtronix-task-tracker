'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Task } from '@/types/task';
import { Trash2, Check, Pencil, X } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSaveEdit = () => {
    const trimmed = editTitle.trim();
    if (trimmed && trimmed !== task.title) {
      onEdit(task.id, trimmed);
    } else {
      setEditTitle(task.title);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      setEditTitle(task.title);
      setIsEditing(false);
    }
  };

  const priorityStyles = {
    high: 'bg-rose-50 text-rose-700 border-rose-200/80',
    medium: 'bg-amber-50 text-amber-700 border-amber-200/80',
    low: 'bg-slate-100 text-slate-600 border-slate-200/80',
  };

  return (
    <div
      className={`group flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border transition-all duration-150 ${
        task.completed
          ? 'bg-slate-50/60 border-slate-200/80 hover:bg-slate-50'
          : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-xs'
      }`}
    >
      {/* Left section: Checkbox + Title / Inline Edit */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <label
          htmlFor={`task-check-${task.id}`}
          className="relative flex items-center justify-center w-5 h-5 rounded-md cursor-pointer shrink-0 transition-transform active:scale-95"
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

        {isEditing ? (
          <div className="flex items-center gap-2 flex-1 mr-2">
            <input
              ref={inputRef}
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSaveEdit}
              className="w-full px-2.5 py-1 text-sm bg-white border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 text-slate-900"
              aria-label="Edit task title"
            />
            <button
              type="button"
              onMouseDown={handleSaveEdit}
              className="p-1 text-emerald-600 hover:bg-emerald-50 rounded-md"
              title="Save changes"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              type="button"
              onMouseDown={() => {
                setEditTitle(task.title);
                setIsEditing(false);
              }}
              className="p-1 text-slate-400 hover:bg-slate-100 rounded-md"
              title="Cancel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span
              onDoubleClick={() => !task.completed && setIsEditing(true)}
              onClick={() => onToggle(task.id)}
              className={`text-sm sm:text-base break-words cursor-pointer select-none transition-all ${
                task.completed
                  ? 'line-through text-slate-400'
                  : 'text-slate-800 font-medium hover:text-blue-700'
              }`}
              title="Click to toggle, double-click to edit"
            >
              {task.title}
            </span>

            {/* Optional Priority Tag */}
            {task.priority && (
              <span
                className={`hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border uppercase tracking-wider select-none shrink-0 ${
                  priorityStyles[task.priority] || priorityStyles.medium
                }`}
              >
                {task.priority}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Right section: Edit Pencil, Status Badge, Delete Button */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* Quick Edit Button (shown on hover) */}
        {!isEditing && !task.completed && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer focus:opacity-100"
            title="Edit task"
            aria-label="Edit task title"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Status Pill Badge */}
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
