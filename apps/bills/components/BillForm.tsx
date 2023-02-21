import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CurrencyInput from 'react-currency-input-field';
import DatePicker from 'react-datepicker';
import * as Yup from 'yup';
import { Bill, BillType } from '../lib/bill.model';
import {
  dateOptions,
  maxDueDate,
  minDueDate,
  parseDueDate,
  sleep,
} from '../lib/utils';

export type BillFormProps = {
  onSave: (bill: Partial<Bill>) => void;
  bill?: Bill;
};

export function BillForm({ onSave, bill: initialValues }: BillFormProps) {
  const router = useRouter();

  const validationSchema = Yup.object({
    type: Yup.string(),
    name: Yup.string().required('Name is required.'),
    amount: Yup.string().required('Amount is required.'),
    dueDate: Yup.string().required('Due date is required.'),
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    // touched,
    values: bill,
    // errors,
    // isSubmitting,
    // isValid,
    // dirty,
    // resetForm,
  } = useFormik<Bill>({
    initialValues: initialValues ?? ({} as Bill),
    validationSchema,
    onSubmit: async (values) => {
      // console.log(JSON.stringify(values, null, 2));

      await sleep(500);

      onSave(values);
      router.push('/');
    },
  });

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange({ target: { name: 'dueDate', value: '' } });
    handleChange(event);
  };

  const handleDueDateChange = (date: Date) => {
    const day = date.getDate();
    let dueDate: string;

    if (bill.type === BillType.YEARLY) {
      const month = date.getMonth() + 1;
      dueDate = `${month}/${day}`;
    } else {
      dueDate = String(day);
    }

    handleChange({ target: { name: 'dueDate', value: dueDate } });
  };

  useEffect(() => {
    if (bill?.type !== BillType.YEARLY && bill?.dueDate) {
      const day = Number(bill.dueDate);
      const max = maxDueDate(bill.type);
      const maxDay = max.getDate();
      if (day > maxDay) {
        bill.dueDate = String(maxDay);
      }
    }
  }, [bill]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Stark Industries"
          className="rounded-md"
          value={bill?.name || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          autoFocus
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="amount">Amount</label>
        <CurrencyInput
          name="amount"
          id="amount"
          placeholder="$123.45"
          className="rounded-md"
          prefix={'$'}
          decimalScale={2}
          allowNegativeValue={false}
          value={bill?.amount || ''}
          onValueChange={(value) =>
            handleChange({ target: { name: 'amount', value } })
          }
          onBlur={handleBlur}
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="type">Type</label>
        <select
          name="type"
          id="type"
          className="rounded-md"
          value={bill?.type || (BillType.MONTHLY as string)}
          onChange={handleTypeChange}
          onBlur={handleBlur}
        >
          <option value={BillType.MONTHLY}>Monthly</option>
          <option value={BillType.YEARLY}>Yearly</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="dueDate">Due Date</label>
        <DatePicker
          name="dueDate"
          id="dueDate"
          placeholderText={bill?.type === BillType.YEARLY ? '6/15' : '15'}
          dateFormat={bill?.type === BillType.YEARLY ? 'M/d' : 'd'}
          minDate={minDueDate(bill?.type)}
          maxDate={maxDueDate(bill?.type)}
          showPopperArrow={false}
          className="rounded-md"
          selected={bill?.dueDate ? parseDueDate(bill) : null}
          onChange={(date) => handleDueDateChange(date)}
          onBlur={handleBlur}
          required
        />
      </div>

      <div className="flex justify-end">
        <Link
          href="/"
          className="border rounded-lg px-3 py-2 bg-gray-200 hover:bg-gray-300"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="ml-3 border rounded-lg px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white"
        >
          Save
        </button>
      </div>

      {bill?.id && (
        <div className="flex flex-col">
          <label>Metadata</label>
          <dl className="sm:grid sm:grid-cols-12 text-sm">
            <dt className="sm:col-span-3">ID:</dt>
            <dd className="sm:col-span-9 font-bold">{bill.id}</dd>
            <dt className="sm:col-span-3">Created:</dt>
            <dd className="sm:col-span-9 font-bold">
              {new Date(bill.createdAt).toLocaleString('en-US', dateOptions)}
            </dd>
            <dt className="sm:col-span-3">Updated:</dt>
            <dd className="sm:col-span-9 font-bold">
              {bill.updatedAt
                ? new Date(bill.updatedAt).toLocaleString('en-US', dateOptions)
                : 'Never'}
            </dd>
          </dl>
        </div>
      )}
    </form>
  );
}

export default BillForm;
