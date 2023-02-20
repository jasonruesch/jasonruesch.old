export enum BillType {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export interface Bill {
  id: string;
  type: BillType;
  name: string;
  amount: number;
  dueDate: string;
  createdAt: Date;
  updatedAt?: Date;
}
