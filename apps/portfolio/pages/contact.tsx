import { useState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import SpinnerIcon from '@/components/icons/SpinnerIcon';
import Notification from '@/components/Notification';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function Contact() {
  const validationSchema = Yup.object({
    name: Yup.string().required('Your name is required.'),
    email: Yup.string()
      .required('Your email address is required.')
      .email('Your email address is invalid.'),
    message: Yup.string().required('Your message is required.'),
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    values,
    errors,
    isSubmitting,
    isValid,
    dirty,
  } = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      // console.log(JSON.stringify(values, null, 2));

      await sleep(500);

      try {
        const response = await fetch('/api/email', {
          body: JSON.stringify({ ...values, template: 'contact' }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });
        const { error } = await response.json();

        if (error) {
          throw new Error(error);
        }

        resetForm();
        setShowSuccess(true);
      } catch (error) {
        console.log(error);
        setShowError(true);
      }
    },
  });

  return (
    <div className="mx-auto max-w-screen-sm space-y-1 sm:space-y-4">
      <h1 className="text-center text-2xl font-bold sm:text-4xl">
        Get In Touch
      </h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-y-1 sm:grid-cols-2 sm:gap-x-8"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <div className="relative mt-1 rounded-md shadow-sm dark:shadow-black">
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="name"
              className={clsx(
                !!errors.name && touched.name
                  ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500'
                  : 'focus:border-primary focus:ring-primary border-neutral-300 text-neutral-900 dark:border-neutral-600 dark:text-white',
                'block w-full rounded-md bg-white py-3 px-4 dark:bg-neutral-900 sm:text-sm'
              )}
              placeholder="Jane Smith"
              required
              aria-invalid={!!errors.name && touched.name}
              aria-describedby={
                !!errors.name && touched.name ? 'name-error' : ''
              }
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
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
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <div className="relative mt-1 rounded-md shadow-sm dark:shadow-black">
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              className={clsx(
                !!errors.email && touched.email
                  ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500'
                  : 'focus:border-primary focus:ring-primary border-neutral-300 text-neutral-900 dark:border-neutral-600 dark:text-white',
                'block w-full rounded-md bg-white py-3 px-4 dark:bg-neutral-900 sm:text-sm'
              )}
              placeholder="you@example.com"
              required
              aria-invalid={!!errors.email && touched.email}
              aria-describedby={
                !!errors.email && touched.email ? 'email-error' : ''
              }
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {!!errors.email && touched.email && (
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ExclamationCircleIcon
                  className="h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
          <p className="mt-1 h-5 text-sm text-red-600" id="email-error">
            {!!errors.email && touched.email && errors.email}
          </p>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="block text-sm font-medium">
            Message
          </label>
          <div className="relative mt-1 rounded-md shadow-sm dark:shadow-black">
            <textarea
              name="message"
              id="message"
              rows={2}
              className={clsx(
                !!errors.message && touched.message
                  ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500'
                  : 'focus:border-primary focus:ring-primary border-neutral-300 text-neutral-900 dark:border-neutral-600 dark:text-white',
                'block w-full rounded-md bg-white py-3 px-4 dark:bg-neutral-900 sm:text-sm'
              )}
              placeholder="How can I help?"
              required
              aria-invalid={!!errors.message && touched.message}
              aria-describedby={
                !!errors.message && touched.message ? 'message-error' : ''
              }
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {!!errors.message && touched.message && (
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ExclamationCircleIcon
                  className="h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
          <p className="mt-1 h-5 text-sm text-red-600" id="message-error">
            {!!errors.message && touched.message && errors.message}
          </p>
        </div>
        <div className="mt-1 sm:col-span-2">
          <button
            type="submit"
            className="focus:ring-primary inline-flex w-full items-center justify-center rounded-md border border-transparent bg-cyan-600 px-6 py-3 text-base font-medium text-black shadow-sm hover:bg-cyan-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-cyan-300 disabled:text-neutral-500 dark:bg-violet-500 dark:hover:bg-violet-600 dark:disabled:bg-violet-300 dark:disabled:text-neutral-600"
            disabled={!dirty || !isValid || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <SpinnerIcon className="fill-primary mr-3 h-4 w-4" />
                Sending...
              </>
            ) : (
              <>Let&apos;s talk</>
            )}
          </button>
        </div>
      </form>

      <Notification
        type="success"
        show={showSuccess}
        onHide={() => setShowSuccess(false)}
      >
        Thank you for your message!
      </Notification>
      <Notification
        type="error"
        show={showError}
        onHide={() => setShowError(false)}
      >
        Something went wrong. Please try again.
      </Notification>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      shouldShowProfileImage: true,
    },
  };
}

export default Contact;
