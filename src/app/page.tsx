'use client';

import React, { useState, useMemo, useSyncExternalStore } from 'react';
import { Task, TaskFilter, Priority, TaskStats as TaskStatsType } from '@/types/task';
import {
  getTasksSnapshot,
  getServerTasksSnapshot,
  subscribeToTasks,
  updateTasksStorage,
  generateTaskId,
} from '@/lib/task-storage';
import { AppHeader } from '@/components/AppHeader';
import { ProgressOverview } from '@/components/ProgressOverview';
import { TaskStats } from '@/components/TaskStats';
import { TaskForm } from '@/components/TaskForm';
import { TaskFilters } from '@/components/TaskFilters';
import { TaskList } from '@/components/TaskList';
import { AppFooter } from '@/components/AppFooter';
import { Toast } from '@/components/Toast';

export default function TaskTrackerPage() {
  // Use React 19 external store hook for safe SSR hydration & instant localStorage sync
  const tasks = useSyncExternalStore(
    subscribeToTasks,
    getTasksSnapshot,
    getServerTasksSnapshot
  );

  const [currentFilter, setCurrentFilter] = useState<TaskFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [deletedTaskInfo, setDeletedTaskInfo] = useState<{
    task: Task;
    index: number;
  } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Derived Statistics
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

  // Filter counts for badges
  const filterCounts = useMemo(() => {
    return {
      all: tasks.length,
      pending: stats.pending,
      completed: stats.completed,
    };
  }, [tasks.length, stats.pending, stats.completed]);

  // Filtered & Searched tasks display
  const filteredTasks = useMemo(() => {
    let result = tasks;

    // Apply status filter
    if (currentFilter === 'pending') {
      result = result.filter((t) => !t.completed);
    } else if (currentFilter === 'completed') {
      result = result.filter((t) => t.completed);
    }

    // Apply keyword search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((t) => t.title.toLowerCase().includes(q));
    }

    return result;
  }, [tasks, currentFilter, searchQuery]);

  // Handlers for task mutations
  const handleAddTask = (title: string, priority: Priority = 'medium') => {
    const newTask: Task = {
      id: generateTaskId(),
      title,
      completed: false,
      priority,
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

  const handleEditTask = (id: string, newTitle: string) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, title: newTitle } : t
    );
    updateTasksStorage(updated);
    setToastMessage('Task updated');
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

  const handleClearCompleted = () => {
    const completedTasks = tasks.filter((t) => t.completed);
    if (completedTasks.length === 0) return;

    const remainingTasks = tasks.filter((t) => !t.completed);
    updateTasksStorage(remainingTasks);
    setToastMessage(`Cleared ${completedTasks.length} completed tasks`);
    setDeletedTaskInfo(null);
  };

  const handleExportJSON = () => {
    if (tasks.length === 0) return;
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(tasks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `task-tracker-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setToastMessage('Tasks exported to JSON');
  };

  const handleResetFilters = () => {
    setCurrentFilter('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* 1. Header with branding and live date */}
      <AppHeader
        appName="Task Tracker"
        subtitle="A clearer way to get things done."
      />

      {/* 2. Main Dashboard Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Progress Overview */}
        <ProgressOverview
          total={stats.total}
          completed={stats.completed}
          completionRate={stats.completionRate}
        />

        {/* Statistics Cards */}
        <div className="mb-6">
          <TaskStats stats={stats} />
        </div>

        {/* Add Task Input Form */}
        <TaskForm onAddTask={handleAddTask} />

        {/* Filter Controls, Search Bar & Current View indicator */}
        <TaskFilters
          currentFilter={currentFilter}
          onFilterChange={setCurrentFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          counts={filterCounts}
        />

        {/* Task List / Empty States */}
        <TaskList
          tasks={tasks}
          filteredTasks={filteredTasks}
          filter={currentFilter}
          searchQuery={searchQuery}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
          onClearCompleted={handleClearCompleted}
          onResetFilter={handleResetFilters}
          onExportJSON={handleExportJSON}
        />
      </main>

      {/* 3. Footer */}
      <AppFooter />

      {/* 4. Non-intrusive Undo Toast */}
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
