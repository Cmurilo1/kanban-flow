export type Tag = 'Dev' | 'Design' | 'Bug' | 'Feature';
export type Priority = 'alta' | 'media' | 'baixa';
export type Status = 'todo' | 'progress' | 'review' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  tag: Tag;
  priority: Priority;
  status: Status;
  position: number;
  createdAt: string;
}

export interface Column {
  id: Status;
  title: string;
  color: string;
}
