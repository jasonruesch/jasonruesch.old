import * as jsonServer from 'json-server';
import { v4 as uuid } from 'uuid';
import authRoutes from './auth/index';
// import authHandler from './auth/nextauth';
import { bills } from './data/bills';

const data = {
  bills,
};

const server = jsonServer.create();
const router = jsonServer.router(data);
const middlewares = jsonServer.defaults();

// Override router's createId to return a UUID instead of an integer
router.db._.mixin({
  createId: () => uuid(),
});

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

authRoutes(server);
// server.use('/api/auth', authHandler);

server.use('/api/bills', (req, _, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = new Date();
  } else if (req.method === 'PUT') {
    req.body.updatedAt = new Date();
  }

  // Continue to JSON Server router
  next();
});

// Use default router
server.use('/api', router);

const port = process.env.PORT || 3333;
server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
