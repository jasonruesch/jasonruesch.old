import { faker } from '@faker-js/faker';
import * as _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { Bill } from './bill.model';

export const bills = _.times<Bill>(10, () => ({
  id: uuid(),
  name: faker.lorem.sentence(),
  amount: faker.datatype.number(),
  dueDate: faker.date.future().toISOString(),
}));

export default bills;
