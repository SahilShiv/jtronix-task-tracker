'use client';

import React from 'react';
import { Task, TaskFilter } from '@/types/task';
import { TaskItem } from './TaskItem';
import { EmptyState } from './EmptyState';
import { CheckCheck } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  filteredTasks: Task[];
  filter: TaskFilter;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onClearCompleted: () => void;
  onResetFilter: () => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  filteredTasks,
  filter,
  onToggle,
  onDelete,
  onClearCompleted,
  onResetFilter,
}) => {
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-800">
            Tasks
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Total: {tasks.length} &nbsp;|&nbsp; Completed: {completedCount}
          </p>
        </div>

        {completedCount > 0 && (
          <button
            type="button"
            onClick={onClearCompleted}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-red-600 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
            title="Remove all completed tasks"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Clear Completed</span>
          </button>
        )}
      </div>

      {filteredTasks.length === 0 ? (
        <EmptyState
          filter={filter}
          hasAnyTasks={tasks.length > 0}
          onResetFilter={onResetFilter}
        />
      ) : (
        <div className="space-y-2.5">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
