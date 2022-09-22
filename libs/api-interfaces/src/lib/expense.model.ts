export interface Expense {
  id: string;
  name: string;
  amount: number;
  due: Date;
  category?: string;
  description?: string;
}
