import { useState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import SpinnerIcon from '@/components/icons/SpinnerIcon';
import Notification from '@/components/Notification';
import ProfileImage from '@/components/ProfileImage';
import Layout from '@/components/Layout';

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
    <Layout>
      <ProfileImage />

      <div className="mx-auto max-w-screen-sm space-y-4">
        <h1 className="text-center">Get In Touch</h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-y-1 sm:grid-cols-2 sm:gap-x-8"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name{' '}
              <span className="material-icons !text-xs text-red-500">
                emergency
              </span>
            </label>
            <div className="relative mt-1 rounded-md">
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                className={clsx(
                  'focus:border-primary focus:ring-primary placeholder-neutral-inverse border-neutral-border focus:text-on-background block w-full rounded-md border bg-white py-2 px-3 text-sm focus:outline-none focus:ring-1 dark:bg-black sm:text-sm',
                  !!errors.name && touched.name
                    ? '!border-red-300 pr-10 !text-red-900 focus:!border-red-500 focus:!ring-red-500 dark:!text-red-400 dark:focus:!text-red-900'
                    : ''
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
              Email{' '}
              <span className="material-icons !text-xs text-red-500">
                emergency
              </span>
            </label>
            <div className="relative mt-1 rounded-md">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className={clsx(
                  'focus:border-primary focus:ring-primary placeholder-neutral-inverse border-neutral-border focus:text-on-background block w-full rounded-md border bg-white py-2 px-3 text-sm focus:outline-none focus:ring-1 dark:bg-black sm:text-sm',
                  !!errors.email && touched.email
                    ? '!border-red-300 pr-10 !text-red-900 focus:!border-red-500 focus:!ring-red-500 dark:!text-red-400 dark:focus:!text-red-900'
                    : ''
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
              Message{' '}
              <span className="material-icons !text-xs text-red-500">
                emergency
              </span>
            </label>
            <div className="relative mt-1 rounded-md">
              <textarea
                name="message"
                id="message"
                rows={2}
                className={clsx(
                  'focus:border-primary focus:ring-primary placeholder-neutral-inverse border-neutral-border focus:text-on-background block w-full rounded-md border bg-white py-2 px-3 text-sm focus:outline-none focus:ring-1 dark:bg-black sm:text-sm',
                  !!errors.message && touched.message
                    ? '!border-red-300 pr-10 !text-red-900 focus:!border-red-500 focus:!ring-red-500 dark:!text-red-400 dark:focus:!text-red-900'
                    : ''
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
              className="btn-primary w-full"
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
    </Layout>
  );
}

export default Contact;
