import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import handlebars from 'handlebars';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
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
      process.env.NODE_ENV === 'production'
        ? process.cwd()
        : serverRuntimeConfig.PROJECT_ROOT,
      'public/templates/email',
      `${templateName.toLowerCase()}.html`,
    );
    const templateSource = readFileSync(templateFile, 'utf8');
    const template = handlebars.compile(templateSource);
    const html = template({
      name: body.name,
      email: body.email,
      message: body.message,
    });

    const mailOptions = {
      from: `${body.name} <${body.email}>`,
      to: ['jason.ruesch@me.com'],
      subject: `[${templateName.toUpperCase()}] Portfolio`,
      text: body.message,
      html,
    };

    const info = await transport.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return response.status(200).json({ error: '' });
  } catch (error) {
    console.log(error);
    return response
      .status(error.statusCode || 500)
      .json({ error: error.message });
  }
}
