import { Task } from '@/types/task';

export const STORAGE_KEY = 'jtronix_taskflow_tasks_v1';

// Initial sample tasks matching the JTRONIX Assessment specification
export const DEFAULT_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Complete project documentation',
    completed: true,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'task-2',
    title: 'Prepare for team meeting',
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 'task-3',
    title: 'Fix login issue',
    completed: true,
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
  {
    id: 'task-4',
    title: 'Design new feature wireframes',
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'task-5',
    title: 'Conduct frontend code review',
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

const EMPTY_TASKS: Task[] = [];
let cachedRaw: string | null = null;
let cachedTasks: Task[] = DEFAULT_TASKS;

const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (e) {
      console.error('Error notifying task listener', e);
    }
  });
}

/**
 * Returns the client-side snapshot of tasks from localStorage.
 * Caches by stringified payload to guarantee reference equality for useSyncExternalStore.
 */
export function getTasksSnapshot(): Task[] {
  if (typeof window === 'undefined') {
    return EMPTY_TASKS;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // First visit: seed default tasks
      const defaultRaw = JSON.stringify(DEFAULT_TASKS);
      window.localStorage.setItem(STORAGE_KEY, defaultRaw);
      cachedRaw = defaultRaw;
      cachedTasks = DEFAULT_TASKS;
      return cachedTasks;
    }

    if (raw !== cachedRaw) {
      cachedRaw = raw;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        cachedTasks = parsed.filter(
          (t): t is Task =>
            t &&
            typeof t.id === 'string' &&
            typeof t.title === 'string' &&
            typeof t.completed === 'boolean'
        );
      } else {
        cachedTasks = DEFAULT_TASKS;
      }
    }

    return cachedTasks;
  } catch (error) {
    console.error('Failed to read from localStorage:', error);
    return cachedTasks || DEFAULT_TASKS;
  }
}

/**
 * Server snapshot for SSR hydration safety
 */
export function getServerTasksSnapshot(): Task[] {
  return EMPTY_TASKS;
}

/**
 * Subscribes to storage changes (both intra-app and cross-tab storage events).
 */
export function subscribeToTasks(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);

  const handleStorageEvent = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      cachedRaw = null; // force re-parse
      onStoreChange();
    }
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorageEvent);
  }

  return () => {
    listeners.delete(onStoreChange);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', handleStorageEvent);
    }
  };
}

/**
 * Persists updated tasks to localStorage and notifies subscribers.
 */
export function updateTasksStorage(tasks: Task[]): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const serialized = JSON.stringify(tasks);
    cachedRaw = serialized;
    cachedTasks = tasks;
    window.localStorage.setItem(STORAGE_KEY, serialized);
    notifyListeners();
    return true;
  } catch (error) {
    console.error('Failed to save tasks to localStorage:', error);
    return false;
  }
}

/**
 * Helper to generate a unique task ID
 */
export function generateTaskId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `task-${crypto.randomUUID()}`;
  }
  return `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
