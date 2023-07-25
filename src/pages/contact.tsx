import { Input, MessageImage, Page, Textarea } from '@/components';
import { Form } from 'react-router-dom';

interface Contact {
  name: string;
  email: string;
  message: string;
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updates = Object.fromEntries(formData as any) as Contact;
  console.log(updates);
  // const contact = await createContact(updates);
  // return redirect(`/contacts/${contact.id}`);
}

interface ContactPageProps {
  contact?: Contact;
}

export const ContactPage = ({ contact }: ContactPageProps) => {
  const resetForm = () => {
    const form = document.getElementById('contact-form') as HTMLFormElement;
    form.reset();
  };

  return (
    <>
      <Page>
        <div className="mx-auto w-full max-w-xl space-y-4">
          <MessageImage />

          <h1 className="font-display text-2xl font-medium text-neutral-500 dark:text-neutral-400 sm:text-4xl">
            Get In Touch
          </h1>
          <Form method="post" id="contact-form">
            <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <Input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  required
                  defaultValue={contact?.name}
                  // value={values.name}
                  // onChange={handleChange}
                  labelText="Name"
                  // errorText={!!errors.name && touched.name ? errors.name : ''}
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
                  defaultValue={contact?.email}
                  // value={values.email}
                  // onChange={handleChange}
                  labelText="Email address"
                  // errorText={!!errors.email && touched.email ? errors.email : ''}
                />
              </div>

              <div className="sm:col-span-2">
                <Textarea
                  rows={3}
                  name="message"
                  id="message"
                  placeholder="How can I help you?"
                  required
                  defaultValue={contact?.message}
                  // value={values.message}
                  // onChange={handleChange}
                  labelText="Message"
                  // errorText={
                  //   !!errors.message && touched.message ? errors.message : ''
                  // }
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
                  // disabled={isSubmitting}
                >
                  {/* {isSubmitting ? (
                  <>
                    <PuffLoader className="mr-3 inline h-4 w-4" />
                    Sending...
                  </>
                ) : (
                  <>Send</>
                )} */}
                  Send
                </button>
              </div>
            </div>
          </Form>
        </div>
      </Page>

      {/* {notification && (
        <Notification
          type={notification.type}
          onHide={() => setNotification(null)}
        >
          {notification.message}
        </Notification>
      )} */}
    </>
  );
};
