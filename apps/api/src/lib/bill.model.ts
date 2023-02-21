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
  autoPaid: boolean;
  balance?: number | null;
  owner?: string | null;
  website?: string | null;
  username?: string | null;
  password?: string | null;
  createdAt: Date;
  updatedAt?: Date;
}
