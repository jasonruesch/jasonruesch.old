import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import {
  LogoImageNeutral,
  Notification,
  PuffLoader,
} from '@jasonruesch/shared/ui';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/* eslint-disable-next-line */
export interface ContactProps {}

export function Contact(props: ContactProps) {
  const validationSchema = Yup.object({
    name: Yup.string().required('Your name is required.'),
    email: Yup.string()
      .required('Your email address is required.')
      .email('Your email address is invalid.'),
    message: Yup.string().required('Your message is required.'),
  });
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  }>();

  const onSubmit = async (values: {
    name: string;
    email: string;
    message: string;
  }) => {
    console.debug(JSON.stringify(values, null, 2));

    await sleep(500);

    try {
      const response = await fetch('/api/email', {
        body: JSON.stringify({ ...values, template: 'contact' }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      // fetch('/api/sms', {
      //   body: JSON.stringify({ ...values, template: 'contact' }),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   method: 'POST',
      // })

      const { error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      resetForm();
      setNotification({
        type: 'success',
        message: 'Thank you for your message!',
      });
    } catch (error) {
      console.error(error);
      setNotification({
        type: 'error',
        message: 'Something went wrong. Please try again.',
      });
    }
  };

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    isSubmitting,
    resetForm,
  } = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema,
    validateOnBlur: false,
    onSubmit,
  });

  return (
    <div className="mx-auto grid h-full max-w-xl pt-16 pb-40 sm:place-items-center sm:pb-16">
      <div className="w-full pt-6 sm:pt-0">
        <h1 className="mb-4">Get In Touch</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium">
                Name <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <div className="relative mt-1 rounded-md">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  className={clsx(
                    'block w-full rounded-md placeholder-neutral-400 dark:bg-neutral-900 dark:placeholder-neutral-500 sm:text-sm',
                    !!errors.name && touched.name
                      ? 'border-red-300 pr-10 text-red-900 focus:border-red-500 focus:ring-red-500 dark:border-red-600 dark:text-red-50 dark:focus:border-red-400 dark:focus:ring-red-400'
                      : 'border-neutral-300 focus:border-cyan-500 focus:ring-cyan-500 dark:border-neutral-600 dark:focus:border-violet-400 dark:focus:ring-violet-400'
                  )}
                  placeholder="Jane Doe"
                  required
                  aria-invalid={!!errors.name && touched.name}
                  aria-describedby={
                    !!errors.name && touched.name ? 'name-error' : ''
                  }
                  value={values.name}
                  onChange={handleChange}
                />
                {!!errors.name && touched.name && (
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500 dark:text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              <p
                className="mt-2 h-5 text-sm text-red-600 dark:text-red-300"
                id="name-error"
              >
                {!!errors.name && touched.name && errors.name}
              </p>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium">
                Email address{' '}
                <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <div className="relative mt-1 rounded-md">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={clsx(
                    'block w-full rounded-md placeholder-neutral-400 dark:bg-neutral-900 dark:placeholder-neutral-500 sm:text-sm',
                    !!errors.email && touched.email
                      ? 'border-red-300 pr-10 text-red-900 focus:border-red-500 focus:ring-red-500 dark:border-red-600 dark:text-red-50 dark:focus:border-red-400 dark:focus:ring-red-400'
                      : 'border-neutral-300 focus:border-cyan-500 focus:ring-cyan-500 dark:border-neutral-600 dark:focus:border-violet-400 dark:focus:ring-violet-400'
                  )}
                  placeholder="jane.doe@example.com"
                  required
                  aria-invalid={!!errors.email && touched.email}
                  aria-describedby={
                    !!errors.email && touched.email ? 'email-error' : ''
                  }
                  value={values.email}
                  onChange={handleChange}
                />
                {!!errors.email && touched.email && (
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500 dark:text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              <p
                className="mt-2 h-5 text-sm text-red-600 dark:text-red-300"
                id="email-error"
              >
                {!!errors.email && touched.email && errors.email}
              </p>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="message" className="block text-sm font-medium">
                Message{' '}
                <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <div className="relative mt-1 rounded-md">
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  className={clsx(
                    'block w-full rounded-md placeholder-neutral-400 dark:bg-neutral-900 dark:placeholder-neutral-500 sm:text-sm',
                    !!errors.message && touched.message
                      ? 'border-red-300 pr-10 text-red-900 focus:border-red-500 focus:ring-red-500 dark:border-red-600 dark:text-red-50 dark:focus:border-red-400 dark:focus:ring-red-400'
                      : 'border-neutral-300 focus:border-cyan-500 focus:ring-cyan-500 dark:border-neutral-600 dark:focus:border-violet-400 dark:focus:ring-violet-400'
                  )}
                  placeholder="How can I help?"
                  required
                  aria-invalid={!!errors.message && touched.message}
                  aria-describedby={
                    !!errors.message && touched.message ? 'message-error' : ''
                  }
                  value={values.message}
                  onChange={handleChange}
                />
                {!!errors.message && touched.message && (
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500 dark:text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              <p
                className="mt-2 h-5 text-sm text-red-600 dark:text-red-300"
                id="message-error"
              >
                {!!errors.message && touched.message && errors.message}
              </p>
            </div>
          </div>

          <div className="mt-2">
            <div className="flex justify-end">
              <button
                type="button"
                className="btn-secondary focus:ring-offset-neutral-100 dark:focus:ring-offset-neutral-800"
                onClick={() => resetForm()}
              >
                Reset
              </button>
              <button
                type="submit"
                className="btn-primary ml-3 focus:ring-offset-neutral-100 dark:focus:ring-offset-neutral-800"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <PuffLoader className="mr-3 h-4 w-4" />
                    Sending...
                  </>
                ) : (
                  <>Send</>
                )}
              </button>
            </div>
          </div>
        </form>

        <div className="absolute inset-x-0 bottom-0 h-40 py-14">
          <LogoImageNeutral className="mx-auto h-12 w-12" />
        </div>
      </div>

      {notification && (
        <Notification
          type={notification.type}
          onHide={() => setNotification(undefined)}
        >
          {notification.message}
        </Notification>
      )}
    </div>
  );
}

export default Contact;
