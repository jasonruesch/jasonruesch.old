export interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  createdAt: Date;
  updatedAt?: Date;
}
