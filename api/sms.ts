import { VercelRequest, VercelResponse } from '@vercel/node';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const twilio = require('twilio');

export default async (request: VercelRequest, response: VercelResponse) => {
  const body = request.body;

  if (!body) {
    return response.status(400).json({ error: 'No sms values were provided' });
  }

  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);
    const templateName = body.template;
    // NOTE: Doesn't send if email is provided
    const smsMessage = `${templateName.toUpperCase()}: ${body.name}, ${
      body.message
    }`;

    const params = {
      body: smsMessage,
      messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
      to: '+18015605930',
    };
    const info = await client.messages.create(params);

    console.debug('Message sent: %s', info.sid);

    return response.status(200).json({ message: 'OK' });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);

    return response.status(500).json({ error: error.message });
  }
};
