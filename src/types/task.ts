export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export type TaskFilter = 'all' | 'pending' | 'completed';

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  completionRate: number;
}
