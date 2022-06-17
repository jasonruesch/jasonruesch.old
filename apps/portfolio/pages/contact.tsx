import Link from 'next/link';
import { useState } from 'react';

import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Notification } from '../components';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function Contact({ className }) {
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
    <>
      <main
        className={`mx-auto flex h-screen max-w-screen-sm flex-col items-center justify-center space-y-4 p-4 sm:px-6 lg:px-8 ${className}`}
      >
        <h1 className="font-heading text-4xl font-bold">Get In Touch</h1>

        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <div>
            <div className="grid grid-cols-1 gap-y-1 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className={`bg-surface text-on-surface block w-full rounded-md shadow-sm sm:text-sm ${
                      !!errors.name && touched.name
                        ? 'border-error text-error placeholder-error focus:border-error focus:ring-error pr-10'
                        : 'focus:ring-primary focus:border-primary border-neutral placeholder-neutral'
                    }`}
                    placeholder="Jane Doe"
                    required
                    aria-invalid={!!errors.name && touched.name}
                    aria-describedby={
                      !!errors.name && touched.name ? 'name-error' : ''
                    }
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {!!errors.name && touched.name && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ExclamationCircleIcon
                        className="text-error h-5 w-5"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>
                <p className="text-error mt-1 h-5 text-sm" id="name-error">
                  {!!errors.name && touched.name && errors.name}
                </p>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="email" className="block text-sm font-bold">
                  Email address
                </label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className={`bg-surface text-on-surface block w-full rounded-md shadow-sm sm:text-sm ${
                      !!errors.email && touched.email
                        ? 'border-error text-error placeholder-error focus:border-error focus:ring-error pr-10'
                        : 'focus:ring-primary focus:border-primary border-neutral placeholder-neutral'
                    }`}
                    placeholder="you@example.com"
                    required
                    aria-invalid={!!errors.email && touched.email}
                    aria-describedby={
                      !!errors.email && touched.email ? 'email-error' : ''
                    }
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {!!errors.email && touched.email && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ExclamationCircleIcon
                        className="text-error h-5 w-5"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>
                <p className="text-error mt-1 h-5 text-sm" id="email-error">
                  {!!errors.email && touched.email && errors.email}
                </p>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="message" className="block text-sm font-bold">
                  Message
                </label>
                <div className="relative mt-1">
                  <textarea
                    name="message"
                    id="message"
                    autoComplete="message"
                    className={`bg-surface text-on-surface block w-full rounded-md shadow-sm sm:text-sm ${
                      !!errors.message && touched.message
                        ? 'border-error text-error placeholder-error focus:border-error focus:ring-error pr-10'
                        : 'focus:ring-primary focus:border-primary border-neutral placeholder-neutral'
                    }`}
                    placeholder="Your message"
                    required
                    aria-invalid={!!errors.message && touched.message}
                    aria-describedby={
                      !!errors.message && touched.message ? 'message-error' : ''
                    }
                    value={values.message}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  ></textarea>
                  {!!errors.message && touched.message && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ExclamationCircleIcon
                        className="text-error h-5 w-5"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>
                <p className="text-error mt-1 h-5 text-sm" id="message-error">
                  {!!errors.message && touched.message && errors.message}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-end">
              <Link href="/">
                <a className="border-neutral bg-surface text-on-surface focus:ring-primary rounded-md border py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
                  Cancel
                </a>
              </Link>
              <button
                type="submit"
                className="bg-primary text-on-primary focus:ring-primary disabled:bg-primary-300 ml-3 inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:text-neutral-600"
                disabled={!dirty || !isValid || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      role="status"
                      className="fill-primary mr-3 h-4 w-4 motion-safe:animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send'
                )}
              </button>
            </div>
          </div>
        </form>
      </main>

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
    </>
  );
}

export default Contact;
