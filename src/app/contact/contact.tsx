import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import {
  Input,
  Notification,
  NotificationOptions,
  PuffLoader,
  SendMessage,
  Textarea,
} from '../../components';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

interface FormValues {
  name: string;
  email: string;
  message: string;
}

export function Contact() {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Your name is required.'),
    email: Yup.string()
      .required('Your email address is required.')
      .email('Your email address is invalid.'),
    message: Yup.string().required('Your message is required.'),
  });
  const [notification, setNotification] = useState<NotificationOptions | null>(
    null
  );

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    isSubmitting,
    resetForm,
  } = useFormik<FormValues>({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema,
    validateOnBlur: false,
    onSubmit: async (values: FormValues) => {
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
    },
  });

  return (
    <>
      <div className="mx-auto w-full max-w-xl space-y-4">
        <SendMessage />
        {/* <EnvelopeOpenIcon className="relative mx-auto h-36 w-36 text-cyan-500 dark:text-violet-400" /> */}

        <h1 className="font-display text-2xl font-medium text-neutral-500 dark:text-neutral-400 sm:text-4xl">
          Get In Touch
        </h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <Input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                placeholder="Jane Doe"
                required
                value={values.name}
                onChange={handleChange}
                labelText="Name"
                errorText={!!errors.name && touched.name ? errors.name : ''}
              />
            </div>

            <div className="sm:col-span-1">
              <Input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                placeholder="jane.doe@example.com"
                required
                value={values.email}
                onChange={handleChange}
                labelText="Email address"
                errorText={!!errors.email && touched.email ? errors.email : ''}
              />
            </div>

            <div className="sm:col-span-2">
              <Textarea
                rows={3}
                name="message"
                id="message"
                placeholder="How can I help you?"
                required
                value={values.message}
                onChange={handleChange}
                labelText="Message"
                errorText={
                  !!errors.message && touched.message ? errors.message : ''
                }
              />
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
                    <PuffLoader className="mr-3 inline h-4 w-4" />
                    Sending...
                  </>
                ) : (
                  <>Send</>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {notification && (
        <Notification
          type={notification.type}
          onHide={() => setNotification(null)}
        >
          {notification.message}
        </Notification>
      )}
    </>
  );
}

export default Contact;
