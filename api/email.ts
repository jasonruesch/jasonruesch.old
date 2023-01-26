import { VercelRequest, VercelResponse } from '@vercel/node';
import * as nodemailer from 'nodemailer';
import { join, resolve } from 'path';
import { readFileSync } from 'fs';
import * as handlebars from 'handlebars';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const body = request.body;

  if (!body) {
    return response
      .status(400)
      .json({ error: 'No email values were provided' });
  }

  console.debug(
    `Connecting to ${process.env.SMTP_HOST}:${process.env.SMTP_PORT}`
  );

  try {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
      ignoreTLS: Boolean(process.env.SMTP_IGNORE_TLS || false),
    });

    const templatesPath = join(
      process.cwd(),
      process.env.NODE_ENV === 'production' ? 'public' : 'dist',
      'emails'
    );
    const templateName = body.template;
    const templateFile = resolve(
      templatesPath,
      `${templateName.toLowerCase()}.html`
    );

    console.debug('Using template file: %s', templateFile);

    const templateSource = readFileSync(templateFile, 'utf8');
    const template = handlebars.compile(templateSource);
    const html = template({
      name: body.name,
      email: body.email,
      message: body.message,
    });

    const mailOptions = {
      from: '"No Reply" <noreply@jasonruesch.dev>',
      to: ['"Jason Ruesch" <jason.ruesch@me.com>'],
      subject: `[${templateName.toUpperCase()}] Jason Ruesch`,
      text: body.message,
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
}
