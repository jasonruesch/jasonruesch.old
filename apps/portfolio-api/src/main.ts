import { doAuth } from '@jasonruesch/auth';
import express from 'express';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.post('/auth', (req, res) => {
  res.send(doAuth());
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
