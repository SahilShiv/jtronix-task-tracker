'use client';

import React, { useState, useMemo, useSyncExternalStore } from 'react';
import { Task, TaskFilter, TaskStats as TaskStatsType } from '@/types/task';
import {
  getTasksSnapshot,
  getServerTasksSnapshot,
  subscribeToTasks,
  updateTasksStorage,
  generateTaskId,
} from '@/lib/task-storage';
import { AppHeader } from '@/components/AppHeader';
import { TaskForm } from '@/components/TaskForm';
import { TaskStats } from '@/components/TaskStats';
import { TaskFilters } from '@/components/TaskFilters';
import { TaskList } from '@/components/TaskList';
import { Toast } from '@/components/Toast';

export default function TaskTrackerPage() {
  // Sync with localStorage safely with React 19 external store hook
  const tasks = useSyncExternalStore(
    subscribeToTasks,
    getTasksSnapshot,
    getServerTasksSnapshot
  );

  const [currentFilter, setCurrentFilter] = useState<TaskFilter>('all');
  const [deletedTaskInfo, setDeletedTaskInfo] = useState<{
    task: Task;
    index: number;
  } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Derived Statistics (Total, Completed, Pending)
  const stats: TaskStatsType = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

    return {
      total,
      completed,
      pending,
      completionRate,
    };
  }, [tasks]);

  // Filtered tasks display according to current filter tab
  const filteredTasks = useMemo(() => {
    if (currentFilter === 'pending') {
      return tasks.filter((t) => !t.completed);
    }
    if (currentFilter === 'completed') {
      return tasks.filter((t) => t.completed);
    }
    return tasks;
  }, [tasks, currentFilter]);

  // Handlers for task mutations
  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: generateTaskId(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    updateTasksStorage([newTask, ...tasks]);
  };

  const handleToggleTask = (id: string) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    updateTasksStorage(updated);
  };

  const handleDeleteTask = (id: string) => {
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) return;

    const taskToDelete = tasks[taskIndex];
    const updated = tasks.filter((t) => t.id !== id);
    updateTasksStorage(updated);

    // Offer undo functionality
    setDeletedTaskInfo({ task: taskToDelete, index: taskIndex });
    setToastMessage(`Deleted "${taskToDelete.title}"`);
  };

  const handleUndoDelete = () => {
    if (!deletedTaskInfo) return;
    const { task, index } = deletedTaskInfo;
    const updated = [...tasks];
    updated.splice(index, 0, task);
    updateTasksStorage(updated);
    setDeletedTaskInfo(null);
    setToastMessage(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7fb] text-slate-900 font-sans antialiased">
      {/* 1. Header with Task Tracker branding */}
      <AppHeader />

      {/* 2. Main Dashboard Content inside unified Card */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-8 sm:py-12">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-8">
          {/* Add Task Input Form */}
          <TaskForm onAddTask={handleAddTask} />

          {/* Statistics Summary Box: Total, Completed, Pending */}
          <TaskStats stats={stats} />

          {/* Filter Controls, Auto-save indicator, and Current View Banner */}
          <TaskFilters
            currentFilter={currentFilter}
            onFilterChange={setCurrentFilter}
          />

          {/* Task List Items */}
          <TaskList
            filteredTasks={filteredTasks}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
          />
        </div>
      </main>

      {/* 3. Non-intrusive Undo Toast */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          onUndo={deletedTaskInfo ? handleUndoDelete : undefined}
          onClose={() => {
            setToastMessage(null);
            setDeletedTaskInfo(null);
          }}
        />
      )}
    </div>
  );
}
