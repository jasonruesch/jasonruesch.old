import type { NextApiRequest, NextApiResponse } from 'next';
import { createTransport } from 'nodemailer';
import { join, resolve } from 'path';
import { readFileSync } from 'fs';
import { compile } from 'handlebars';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;

  if (!body) {
    return res.status(400).json({ error: 'No email values were provided' });
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

    const transport = createTransport({
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

    const templateSource = readFileSync(templateFile, 'utf8');
    const template = compile(templateSource);
    const html = template({
      name: body.name,
      email: body.email,
      message: body.message,
    });

    const mailOptions = {
      from: '"Jason Ruesch" <noreply@jasonruesch.dev>',
      to: ['"Jason Ruesch" <jason.ruesch@me.com>'],
      subject: `[${templateName.toUpperCase()}] Jason Ruesch`,
      text: body.message,
      html,
    };

    const info = await transport.sendMail(mailOptions);

    console.debug('Message sent: %s', info.messageId);

    return res.status(200).json({ message: 'OK' });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({ error: error.message });
  }
}
