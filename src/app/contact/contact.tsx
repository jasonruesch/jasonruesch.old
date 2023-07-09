import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { Footer, Notification, PuffLoader } from '@jasonruesch/shared/ui';
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
    <div className="grid h-full sm:place-items-center">
      <div className="mx-auto w-full max-w-xl pt-6 sm:pt-0">
        <h1 className="mb-4">Get In Touch</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <div className="group relative z-0 mt-2 w-full">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={clsx(
                    'peer block w-full appearance-none border-0 border-b-2 bg-transparent px-0 py-2.5 text-sm placeholder:invisible focus:outline-none focus:ring-0 focus:placeholder:visible',
                    !!errors.name && touched.name
                      ? 'border-red-300 text-red-900 focus:border-red-600 dark:border-red-600 dark:text-red-50 dark:focus:border-red-500'
                      : 'border-neutral-300 text-neutral-900 focus:border-cyan-600 dark:border-neutral-600 dark:text-white dark:focus:border-violet-500'
                  )}
                  autoComplete="name"
                  placeholder="Jane Doe"
                  required
                  aria-invalid={!!errors.name && touched.name}
                  aria-describedby={
                    !!errors.name && touched.name ? 'name-error' : ''
                  }
                  value={values.name}
                  onChange={handleChange}
                />
                <label
                  htmlFor="name"
                  className={clsx(
                    'absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium',
                    !!errors.name && touched.name
                      ? 'text-red-500 peer-focus:text-red-600 dark:text-red-400 dark:peer-focus:text-red-500'
                      : 'text-neutral-500 peer-focus:text-cyan-600 dark:text-neutral-400 dark:peer-focus:text-violet-500'
                  )}
                >
                  Name
                </label>
                {!!errors.name && touched.name && (
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500 dark:text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              <p
                className="mt-2 h-4 text-xs text-red-600 dark:text-red-300"
                id="name-error"
              >
                {!!errors.name && touched.name && errors.name}
              </p>
            </div>

            <div className="sm:col-span-3">
              <div className="group relative z-0 mt-2 w-full">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={clsx(
                    'peer block w-full appearance-none border-0 border-b-2 bg-transparent px-0 py-2.5 text-sm placeholder:invisible focus:outline-none focus:ring-0 focus:placeholder:visible',
                    !!errors.email && touched.email
                      ? 'border-red-300 text-red-900 focus:border-red-600 dark:border-red-600 dark:text-red-50 dark:focus:border-red-500'
                      : 'border-neutral-300 text-neutral-900 focus:border-cyan-600 dark:border-neutral-600 dark:text-white dark:focus:border-violet-500'
                  )}
                  placeholder="jane.doe@example.com"
                  autoComplete="email"
                  required
                  aria-invalid={!!errors.email && touched.email}
                  aria-describedby={
                    !!errors.email && touched.email ? 'email-error' : ''
                  }
                  value={values.email}
                  onChange={handleChange}
                />
                <label
                  htmlFor="email"
                  className={clsx(
                    'absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium',
                    !!errors.email && touched.email
                      ? 'text-red-500 peer-focus:text-red-600 dark:text-red-400 dark:peer-focus:text-red-500'
                      : 'text-neutral-500 peer-focus:text-cyan-600 dark:text-neutral-400 dark:peer-focus:text-violet-500'
                  )}
                >
                  Email address
                </label>
                {!!errors.email && touched.email && (
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500 dark:text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              <p
                className="mt-2 h-4 text-xs text-red-600 dark:text-red-300"
                id="email-error"
              >
                {!!errors.email && touched.email && errors.email}
              </p>
            </div>

            <div className="sm:col-span-6">
              <div className="group relative z-0 mt-2 w-full">
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  className={clsx(
                    'peer block w-full appearance-none border-0 border-b-2 bg-transparent px-0 py-2.5 text-sm placeholder:invisible focus:outline-none focus:ring-0 focus:placeholder:visible',
                    !!errors.message && touched.message
                      ? 'border-red-300 text-red-900 focus:border-red-600 dark:border-red-600 dark:text-red-50 dark:focus:border-red-500'
                      : 'border-neutral-300 text-neutral-900 focus:border-cyan-600 dark:border-neutral-600 dark:text-white dark:focus:border-violet-500'
                  )}
                  placeholder="How can I help you?"
                  required
                  aria-invalid={!!errors.message && touched.message}
                  aria-describedby={
                    !!errors.message && touched.message ? 'message-error' : ''
                  }
                  value={values.message}
                  onChange={handleChange}
                />
                <label
                  htmlFor="message"
                  className={clsx(
                    'absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium',
                    !!errors.message && touched.message
                      ? 'text-red-500 peer-focus:text-red-600 dark:text-red-400 dark:peer-focus:text-red-500'
                      : 'text-neutral-500 peer-focus:text-cyan-600 dark:text-neutral-400 dark:peer-focus:text-violet-500'
                  )}
                >
                  Message
                </label>
                {!!errors.message && touched.message && (
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500 dark:text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              <p
                className="mt-2 h-4 text-xs text-red-600 dark:text-red-300"
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

        <Footer className="pt-16 sm:pt-20" />
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
