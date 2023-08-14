// import type { VercelRequest, VercelResponse } from '@vercel/node';
// import twilio from 'twilio';

// export default (request: VercelRequest, response: VercelResponse) => {
//   const body = request.body;

//   if (!body) {
//     response.status(400).json({ error: 'No sms values were provided' });
//     return;
//   }

//   try {
//     const accountSid = process.env.TWILIO_ACCOUNT_SID;
//     const authToken = process.env.TWILIO_AUTH_TOKEN;
//     const client = twilio(accountSid, authToken);
//     const templateName = body.template;
//     // NOTE: Doesn't send if email is provided
//     const smsMessage = `${templateName.toUpperCase()}: ${body.name}, ${
//       body.message
//     }`;

//     const params = {
//       body: smsMessage,
//       messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
//       to: '+18015605930',
//     };
//     client.messages.create(params).then((info) => {
//       console.debug('Message sent: %s', info.sid);

//       response.status(200).json({ message: 'OK' });
//     });
//   } catch (error) {
//     console.error(error);

//     response.status(500).json({ error: error.message });
//   }
// };
