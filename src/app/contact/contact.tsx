import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input, Textarea } from '../../components';

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

      // await sleep(500);

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

        console.log('sent successfully');
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="pt-16 pb-8 sm:mx-auto sm:grid sm:h-screen sm:max-w-xl sm:place-items-center sm:py-0">
      <div className="w-full space-y-4">
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
                    {/* <PuffLoader className="mr-3 h-4 w-4" /> */}
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
    </div>
  );
}

export default Contact;
