export interface User {
  id: string;
  email: string;
  password: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
  dueAt: Date;
}
