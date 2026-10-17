'use client';

import React from 'react';
import { Task } from '@/types/task';
import { SectionMode } from './AppHeader';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  filteredTasks: Task[];
  sectionMode: SectionMode;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  filteredTasks,
  sectionMode,
  onToggle,
  onDelete,
}) => {
  const isSection11 = sectionMode === '1.1';
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="w-full">
      {/* Section 1.1 Header */}
      {isSection11 && (
        <div className="mt-6 mb-3">
          <h2 className="text-base font-bold text-slate-800 tracking-tight">
            Tasks
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Total: {tasks.length} &nbsp;|&nbsp; Completed: {completedCount}
          </p>
        </div>
      )}

      {/* Task Items */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-10 px-4 text-slate-400 text-sm border border-dashed border-slate-200 rounded-xl">
          No tasks found.
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              sectionMode={sectionMode}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
