import { faker } from '@faker-js/faker';
import * as _ from 'lodash';
import { Bill, BillType } from '../../../lib/bill.model';

export const bills = _.times<Bill>(10, () => {
  const type = faker.helpers.arrayElement<BillType>([
    BillType.MONTHLY,
    BillType.YEARLY,
  ]);
  const isYearly = type === BillType.YEARLY;
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'numeric',
  };
  const year = new Date().getFullYear();
  const dueDate = isYearly
    ? faker.date
        .between(new Date(year, 0, 1), new Date(year + 1, 11, 31))
        .toLocaleString('en-US', dateOptions)
    : faker.datatype.number({ min: 1, max: 31 }).toString();

  return {
    id: faker.datatype.uuid(),
    type,
    name: faker.company.name(),
    amount: faker.datatype.float({ min: 0, max: 1000, precision: 2 }),
    dueDate,
    createdAt: faker.date.past(),
  };
});

export default bills;
