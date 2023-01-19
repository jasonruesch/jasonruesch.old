import nodemailer from 'nodemailer';
import { join, resolve } from 'path';
import { readFileSync } from 'fs';
import handlebars from 'handlebars';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(request: any, response: any) {
  const body = request.body;

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

    const templateName = body.template;
    const templateFile = resolve(
      join(process.cwd(), 'templates/emails'),
      `${templateName.toLowerCase()}.html`
    );

    console.debug('templateFile', templateFile);

    const templateSource = readFileSync(templateFile, 'utf8');
    const template = handlebars.compile(templateSource);
    const html = template({
      name: body.name,
      email: body.email,
      message: body.message,
    });

    const mailOptions = {
      from: 'portfolio@jasonruesch.dev',
      to: ['jason.ruesch@me.com'],
      subject: `[${templateName.toUpperCase()}] Portfolio`,
      text: body.message,
      html,
    };

    const info = await transport.sendMail(mailOptions);

    console.debug('Message sent: %s', info.messageId);

    return response.status(200).json({ error: '' });
  } catch (error) {
    console.error(error);

    return response
      .status(error.statusCode || 500)
      .json({ error: error.message });
  }
}
