import { Bill, BillType } from './bill.model';

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const toCurrency = (value?: number) =>
  value !== null
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value)
    : '';

export const toOrdinalString = (number) => {
  let suffix = 'th';
  if (number <= 3 || number >= 21) {
    switch (number % 10) {
      case 1:
        suffix = 'st';
        break;
      case 2:
        suffix = 'nd';
        break;
      case 3:
        suffix = 'rd';
        break;
      default:
        suffix = 'th';
        break;
    }
  }
  return `${number}${suffix}`;
};

export const minDueDate = (type?: BillType) => {
  const year = new Date().getFullYear();

  if (type === BillType.YEARLY) {
    return new Date(year, 0, 1);
  }

  const month = new Date().getMonth();
  const day = 1;

  return new Date(year, month, day);
};

export const maxDueDate = (type?: BillType) => {
  const year = new Date().getFullYear();

  if (type === BillType.YEARLY) {
    return new Date(year + 1, 11, 31);
  }

  const month = new Date().getMonth() + 1;
  const day = 0;

  return new Date(year, month, day);
};

export const parseDueDate = ({ type, dueDate }: Bill) => {
  if (type === BillType.YEARLY) {
    const year = new Date().getFullYear();
    const [month, day] = dueDate.split('/').map(Number);

    return new Date(year, month - 1, day);
  }

  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const day = Number(dueDate);

  return new Date(year, month, day);
};

export const dateOptions: Intl.DateTimeFormatOptions = {
  dateStyle: 'full',
  timeStyle: 'medium',
};
