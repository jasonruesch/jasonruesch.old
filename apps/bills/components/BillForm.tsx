import { Switch } from '@headlessui/react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect } from 'react';
import CurrencyInput from 'react-currency-input-field';
import DatePicker from 'react-datepicker';
import * as Yup from 'yup';
import { Bill, BillType } from '../lib/bill.model';
import {
  dateOptions,
  maxDueDate,
  minDueDate,
  parseDueDate,
  queryString,
  sleep,
} from '../lib/utils';

export type BillFormProps = {
  onSave: (bill: Partial<Bill>) => void;
  bill?: Partial<Bill>;
};

export function BillForm({ onSave, bill: initialValues }: BillFormProps) {
  const router = useRouter();
  const { type: typeParam } = router.query;
  const type = typeParam ? (String(typeParam).toUpperCase() as BillType) : null;

  const validationSchema = Yup.object({
    type: Yup.string(),
    name: Yup.string().required('Name is required.'),
    amount: Yup.number().required('Amount is required.'),
    dueDate: Yup.string().required('Due date is required.'),
    autoPaid: Yup.boolean(),
    balance: Yup.number().nullable(),
    owner: Yup.string().nullable(),
    website: Yup.string().nullable(),
    username: Yup.string().nullable(),
    password: Yup.string().nullable(),
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    values: bill,
    errors,
    isSubmitting,
    isValid,
    dirty,
    resetForm,
  } = useFormik<Partial<Bill>>({
    initialValues: initialValues || { type: type || BillType.MONTHLY },
    validationSchema,
    onSubmit: async (values) => {
      // console.log(JSON.stringify(values, null, 2));

      await sleep(500);

      const bill: Partial<Bill> = {
        ...values,
        amount: +values.amount,
        balance: values.balance ? +values.balance : null,
      };

      onSave(bill);

      const query = router.query;
      delete query.filter; // Clear the filter before returning to the list
      router.push(`/${queryString(query, bill.type)}`);
    },
  });

  const handleNumberChange = (value: string, name?: string) => {
    handleChange({ target: { name, value } });
  };

  const handleTypeChange = (event: Partial<ChangeEvent<HTMLSelectElement>>) => {
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
    if (bill.type !== BillType.YEARLY && bill?.dueDate) {
      const day = Number(bill?.dueDate);
      const max = maxDueDate(bill.type);
      const maxDay = max.getDate();
      if (day > maxDay) {
        bill.dueDate = String(maxDay);
      }
    }
  }, [bill]);

  return (
    <form
      onSubmit={handleSubmit}
      className="divide-y divide-gray-200 lg:col-span-9"
    >
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Required details
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              The name of the bill and payment information are required.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-12 gap-x-6">
            <div className="col-span-12 sm:col-span-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-1 rounded-md">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Utility Co."
                  className={clsx(
                    'block w-full rounded-md placeholder-gray-400 sm:text-sm',
                    !!errors.name && touched.name
                      ? 'border-red-300 pr-10 text-red-900 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-cyan-500 focus:ring-cyan-500'
                  )}
                  aria-invalid={!!errors.name && touched.name}
                  aria-describedby={
                    !!errors.name && touched.name ? 'name-error' : ''
                  }
                  value={bill?.name || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  autoFocus
                />
                {!!errors.name && touched.name && (
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              <p className="mt-1 h-5 text-sm text-red-600" id="name-error">
                {!!errors.name && touched.name && errors.name}
              </p>
            </div>

            <div className="col-span-12 sm:col-span-6">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-1 rounded-md">
                <CurrencyInput
                  name="amount"
                  id="amount"
                  placeholder="$123.45"
                  className={clsx(
                    'block w-full rounded-md placeholder-gray-400 sm:text-sm',
                    !!errors.amount && touched.amount
                      ? 'border-red-300 pr-10 text-red-900 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-cyan-500 focus:ring-cyan-500'
                  )}
                  aria-invalid={!!errors.amount && touched.amount}
                  aria-describedby={
                    !!errors.amount && touched.amount ? 'amount-error' : ''
                  }
                  prefix={'$'}
                  decimalScale={2}
                  allowNegativeValue={false}
                  value={bill?.amount || ''}
                  onValueChange={handleNumberChange}
                  onBlur={handleBlur}
                  required
                />
                {!!errors.amount && touched.amount && (
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              <p className="mt-1 h-5 text-sm text-red-600" id="amount-error">
                {!!errors.amount && touched.amount && errors.amount}
              </p>
            </div>

            <div className="col-span-12 sm:col-span-6">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Type
              </label>
              <select
                name="type"
                id="type"
                className="mt-1 mb-6 block w-full rounded-md border-gray-300 placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:bg-gray-50 sm:text-sm"
                value={bill.type || (BillType.MONTHLY as string)}
                onChange={handleTypeChange}
                onBlur={handleBlur}
              >
                <option value={BillType.MONTHLY}>Monthly</option>
                <option value={BillType.YEARLY}>Yearly</option>
              </select>
            </div>

            <div className="col-span-12 sm:col-span-6">
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium text-gray-700"
              >
                Due Date <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-1 rounded-md">
                <DatePicker
                  name="dueDate"
                  id="dueDate"
                  placeholderText={
                    bill.type === BillType.YEARLY ? '6/15' : '15'
                  }
                  dateFormat={bill.type === BillType.YEARLY ? 'M/d' : 'd'}
                  minDate={minDueDate(bill.type)}
                  maxDate={maxDueDate(bill.type)}
                  showPopperArrow={false}
                  className={clsx(
                    'block w-full rounded-md placeholder-gray-400 sm:text-sm',
                    !!errors.dueDate && touched.dueDate
                      ? 'border-red-300 pr-10 text-red-900 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-cyan-500 focus:ring-cyan-500'
                  )}
                  aria-invalid={!!errors.dueDate && touched.dueDate}
                  aria-describedby={
                    !!errors.dueDate && touched.dueDate ? 'dueDate-error' : ''
                  }
                  selected={bill?.dueDate ? parseDueDate(bill) : null}
                  onChange={(date) => handleDueDateChange(date)}
                  onBlur={handleBlur}
                  required
                />
                {!!errors.dueDate && touched.dueDate && (
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              <p className="mt-1 h-5 text-sm text-red-600" id="dueDate-error">
                {!!errors.dueDate && touched.dueDate && errors.dueDate}
              </p>
            </div>

            <div className="col-span-12">
              <Switch.Group as="div" className="mt-1 mb-6 flex items-center">
                <Switch
                  className={clsx(
                    bill?.autoPaid ? 'bg-cyan-600' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2'
                  )}
                  checked={bill?.autoPaid || false}
                  onChange={(autoPaid) =>
                    handleChange({
                      target: { name: 'autoPaid', value: autoPaid },
                    })
                  }
                  onBlur={handleBlur}
                >
                  <span
                    aria-hidden="true"
                    className={clsx(
                      bill?.autoPaid ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                  />
                </Switch>
                <Switch.Label as="span" className="ml-3">
                  <span className="text-sm font-medium text-gray-700">
                    Auto-paid
                  </span>
                </Switch.Label>
              </Switch.Group>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Optional details
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Balance and website information are optional.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-12 gap-x-6">
            <div className="col-span-12 sm:col-span-6">
              <label
                htmlFor="balance"
                className="block text-sm font-medium text-gray-700"
              >
                Balance
              </label>
              <CurrencyInput
                id="balance"
                name="balance"
                placeholder="$1,234.56"
                className="mt-1 mb-6 block w-full rounded-md border-gray-300 placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                prefix={'$'}
                decimalScale={2}
                allowNegativeValue={false}
                value={bill?.balance || ''}
                onValueChange={handleNumberChange}
                onBlur={handleBlur}
              />
            </div>

            <div className="col-span-12 sm:col-span-6">
              <label
                htmlFor="owner"
                className="block text-sm font-medium text-gray-700"
              >
                Owner
              </label>
              <input
                type="text"
                name="owner"
                id="owner"
                placeholder="Jane"
                className="mt-1 mb-6 block w-full rounded-md border-gray-300 placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                value={bill?.owner || ''}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <div className="col-span-12 sm:col-span-6">
              <label
                htmlFor="website"
                className="block text-sm font-medium text-gray-700"
              >
                Website
              </label>
              <input
                type="text"
                name="website"
                id="website"
                placeholder="https://example.com"
                className="mt-1 mb-6 block w-full rounded-md border-gray-300 placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                value={bill?.website || ''}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <div className="col-span-12 sm:col-span-6">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="janedoe"
                className="mt-1 mb-6 block w-full rounded-md border-gray-300 placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                value={bill?.username || ''}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <div className="col-span-12 sm:col-span-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="text"
                name="password"
                id="password"
                placeholder="********"
                className="mt-1 mb-6 block w-full rounded-md border-gray-300 placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                value={bill?.password || ''}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            {bill?.id && (
              <div className="col-span-12 sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  Metadata
                </label>
                <div className="mt-2 mb-5 text-xs">
                  <table>
                    <tbody>
                      <tr>
                        <td>Created:</td>
                        <td className="pl-4">
                          {new Date(bill?.createdAt).toLocaleString(
                            'en-US',
                            dateOptions
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Modified:</td>
                        <td className="pl-4">
                          {bill?.updatedAt &&
                            new Date(bill?.updatedAt).toLocaleString(
                              'en-US',
                              dateOptions
                            )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="pt-5">
          <div className="flex flex-col py-2 px-4 sm:flex-row sm:justify-end sm:px-6">
            <Link
              href={`/${queryString(router.query, type)}`}
              className="order-4 mb-5 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:order-1 sm:mb-0 sm:w-auto"
            >
              Cancel
            </Link>
            <button
              type="button"
              className="order-3 mb-5 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:order-2 sm:mb-0 sm:ml-5 sm:w-auto"
              onClick={() => resetForm()}
            >
              Reset
            </button>
            {!bill?.id && (
              <button
                type="submit"
                className="order-2 mb-5 inline-flex w-full justify-center rounded-md border border-transparent bg-cyan-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 sm:order-3 sm:mb-0 sm:ml-5 sm:w-auto"
                disabled={!dirty || !isValid || isSubmitting}
                // onClick={() => setAddAnother(true)}
              >
                {isSubmitting ? (
                  <>
                    {/* <PuffLoader className="mr-3 h-4 w-4" /> */}
                    Sending...
                  </>
                ) : (
                  <>Save and add another</>
                )}
              </button>
            )}
            <button
              type="submit"
              className="order-1 mb-5 inline-flex w-full justify-center rounded-md border border-transparent bg-cyan-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 sm:order-4 sm:mb-0 sm:ml-5 sm:w-auto"
              disabled={!dirty || !isValid || isSubmitting}
              // onClick={() => setAddAnother(false)}
            >
              {isSubmitting ? (
                <>
                  {/* <PuffLoader className="mr-3 h-4 w-4" /> */}
                  Sending...
                </>
              ) : (
                <>Save</>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default BillForm;
