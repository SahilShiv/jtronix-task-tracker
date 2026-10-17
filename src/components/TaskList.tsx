'use client';

import React from 'react';
import { Task } from '@/types/task';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  filteredTasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  filteredTasks,
  onToggle,
  onDelete,
}) => {
  return (
    <div className="w-full">
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
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
