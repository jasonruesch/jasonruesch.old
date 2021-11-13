import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';
import { AppModule } from './app/app.module';
import 'firebase-admin';

const API_PREFIX = '/api';
const server = express();

function proxyUrl(req: express.Request, _, next: express.NextFunction) {
  // Fix rewriting for hosting on Firebase
  if (req.url.indexOf(API_PREFIX) === 0) {
    req.url = req.url.replace(API_PREFIX, '');
    if (!req.url) {
      req.url = '/';
    }
  }
  next();
}

async function bootstrap(server: express.Application) {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.use(proxyUrl);
  return app.init();
}

bootstrap(server)
  .then(() => Logger.log('Nest ready'))
  .catch((err) => Logger.error(err));

// Connect express server to Firebase Functions
export const api = functions.https.onRequest(server);
