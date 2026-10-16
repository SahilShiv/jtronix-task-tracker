export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority?: Priority;
  createdAt: string;
}

export type TaskFilter = 'all' | 'pending' | 'completed';

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  completionRate: number;
}
