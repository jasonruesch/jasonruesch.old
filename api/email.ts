import { VercelRequest, VercelResponse } from '@vercel/node';
import { readFileSync } from 'fs';
import * as handlebars from 'handlebars';
import * as nodemailer from 'nodemailer';
import { join, resolve } from 'path';

export default async (request: VercelRequest, response: VercelResponse) => {
  const body = request.body;

  if (!body) {
    return response
      .status(400)
      .json({ error: 'No email values were provided' });
  }

  console.debug(
    `Connecting to ${process.env.SMTP_HOST}:${process.env.SMTP_PORT}`
  );

  const isDevelopment = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';

  try {
    if (isDevelopment) {
      // We add this setting to tell nodemailer the host isn't secure during dev
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    }

    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const templatesPath = join(
      process.cwd(),
      isProduction ? 'public' : 'dist',
      'emails'
    );
    const templateName = body.template;
    const templateFile = resolve(
      templatesPath,
      `${templateName.toLowerCase()}.html`
    );

    console.debug('Using template file: %s', templateFile);

    const text = `Name: ${body.name}
Email address: ${body.email}
Message: ${body.message}`;

    const templateSource = readFileSync(templateFile, 'utf8');
    const template = handlebars.compile(templateSource);
    const html = template({
      name: body.name,
      email: body.email,
      message: body.message,
    });

    const mailOptions = {
      from: '"Jason Ruesch" <noreply@jasonruesch.dev>',
      to: ['"Jason Ruesch" <jason.ruesch@me.com>'],
      subject: `[${templateName.toUpperCase()}] Jason Ruesch`,
      text,
      html,
    };

    const info = await transport.sendMail(mailOptions);

    console.debug('Message sent: %s', info.messageId);

    return response.status(200).json({ message: 'OK' });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);

    return response.status(500).json({ error: error.message });
  }
};
