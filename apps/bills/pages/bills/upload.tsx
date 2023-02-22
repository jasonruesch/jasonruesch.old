import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Papa from 'papaparse';
import * as Yup from 'yup';
import Layout from '../../components/Layout';
import { BillType } from '../../lib/bill.model';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const Upload = () => {
  const router = useRouter();
  const validationSchema = Yup.object({
    files: Yup.array().min(1, 'Choose at least one file'),
  });
  // const [notification, setNotification] = useState<{
  //   type: 'success' | 'error';
  //   message: string;
  // }>();

  const {
    handleSubmit,
    setFieldValue,
    handleBlur,
    touched,
    errors,
    isSubmitting,
    isValid,
    dirty,
  } = useFormik({
    initialValues: { files: [] },
    validationSchema,
    onSubmit: async (values) => {
      console.debug(JSON.stringify(values, null, 2));

      await sleep(500);

      try {
        const formatNumber = (value: string | null): number | null => {
          return value ? +value.replace('$', '').replace(',', '') : null;
        };

        const parseBill = (entry) => {
          const dueDate = entry['Due Date'];

          return {
            type: dueDate.includes('/') ? BillType.YEARLY : BillType.MONTHLY,
            name: entry.Name,
            amount: formatNumber(entry.Amount) as number,
            dueDate,
            autoPaid: entry['Auto-paid']?.toLowerCase() === 'true',
            balance: formatNumber(entry.Balance),
            owner: entry.Owner,
            website: entry.Website,
            username: entry.Username,
            password: entry.Password,
          };
        };

        const trim = (entry) => {
          Object.keys(entry).map(
            (k) =>
              (entry[k] =
                typeof entry[k] == 'string' ? entry[k].trim() : entry[k])
          );
          return entry;
        };

        const data = new FormData();
        values.files.forEach((file, index) => {
          console.log(file);
          const csv = Papa.parse(file, { header: true });
          console.log(csv);
          if (csv.data.length === 0) {
            console.error('File is empty.');
            // setNotification({
            //   type: 'error',
            //   message: 'Something went wrong. Please try again.',
            // });
            return;
          }

          const bills = csv.data
            .map(trim)
            .filter((entry) => entry.Name && entry.Amount && entry['Due Date'])
            .map(parseBill);

          data.append(`file${index}`, bills);
        });

        const response = await fetch('/api/bill/batch', {
          body: data,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          method: 'POST',
        });

        const { error } = await response.json();

        if (error) {
          throw new Error(error);
        }

        if (response.ok) {
          // setNotification({
          //   type: 'success',
          //   message: 'Thank you for your message!',
          // });
        } else {
          console.error('Something went wrong.');
          // setNotification({
          //   type: 'error',
          //   message: 'Something went wrong. Please try again.',
          // });
        }

        router.push(`/`);
      } catch (error) {
        console.error(error);
        // setNotification({
        //   type: 'error',
        //   message: 'Something went wrong. Please try again.',
        // });
      }
    },
  });

  const downloadCSVTemplate = () => {
    const data =
      'Name,Amount,Due Date,Auto-paid,Balance,Owner,Website,Username,Password';

    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'bills.csv');
    a.click();
  };

  return (
    <Layout>
      {/* Page header */}
      <div className="bg-white shadow">
        <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
            <div className="min-w-0 flex-1">
              <div className="flex items-center">
                <div>
                  <div className="flex items-center">
                    <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                      Upload bills
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
              <button
                className="inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                onClick={() => downloadCSVTemplate()}
              >
                Download CSV template
              </button>
            </div>
          </div>
        </div>
      </div>

      <form
        className="divide-y divide-gray-200 lg:col-span-9"
        onSubmit={handleSubmit}
      >
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mt-6 grid grid-cols-12 gap-6">
            <div className="col-span-12 sm:col-span-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Bills CSV file <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-1 rounded-md">
                <input
                  type="file"
                  name="files"
                  id="files"
                  accept=".csv"
                  className={clsx(
                    'block w-full rounded-md border bg-white py-2 px-3 placeholder-gray-400 sm:text-sm focus:outline-none',
                    !!errors.files && touched.files
                      ? 'border-red-300 pr-10 text-red-900 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-cyan-500 focus:ring-cyan-500'
                  )}
                  aria-describedby={
                    !!errors.files && touched.files ? 'file-error' : ''
                  }
                  onChange={(e) =>
                    setFieldValue('files', Array.from(e.target.files), true)
                  }
                  onBlur={handleBlur}
                  required
                />
                {!!errors.files && touched.files && (
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              <p className="mt-1 h-5 text-sm text-red-600" id="file-error">
                {!!errors.files &&
                  (touched.files as boolean) &&
                  (errors.files as string)}
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
          <div className="flex flex-col py-2 px-4 sm:flex-row sm:justify-end sm:px-6">
            <Link
              href="/"
              className="order-2 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:order-1 sm:mb-0 sm:w-auto"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="order-1 mb-5 inline-flex w-full justify-center rounded-md border border-transparent bg-cyan-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 sm:order-4 sm:mb-0 sm:ml-5 sm:w-auto"
              disabled={!dirty || !isValid || isSubmitting}
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
      </form>
    </Layout>
  );
};

export default Upload;
