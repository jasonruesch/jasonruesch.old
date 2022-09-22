import { faker } from '@faker-js/faker';
import * as _ from 'lodash';
import { Expense } from '@jasonruesch/api-interfaces';

const now = new Date();
const tenDaysAgo = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate() - 10
);

export const expenses: Expense[] = _.times(20, () => ({
  id: faker.datatype.uuid(),
  name: faker.company.name(),
  amount: Number(faker.finance.amount()),
  due: faker.date.soon(28, tenDaysAgo),
  category: faker.helpers.arrayElement(['food', 'travel', 'entertainment']),
  description: faker.lorem.sentence(),
}));
