/**
 * This is not a production server!
 */

import * as jsonServer from 'json-server';
import { faker } from '@faker-js/faker';
import * as _ from 'lodash';
import * as jwt from 'jsonwebtoken';
import { Task, User } from '@portfolio/data-access';

const server = jsonServer.create();

// Generate router data
const data: { users: User[]; tasks: Task[] } = {
  users: [
    {
      id: '1',
      email: 'test@user.com',
      password: 'test',
    },
  ],
  tasks: _.times(100, (n) => ({
    id: `${n + 1}`,
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    status: faker.helpers.arrayElement(['todo', 'in-progress', 'done']),
    priority: faker.helpers.arrayElement(['low', 'medium', 'high']),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    dueAt: faker.date.future(),
  })),
};

const router = jsonServer.router(data);
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

const SECRET_KEY =
  '0cb195c766555fd7207ea2653c38c8f8c972513480032d018d4f139127e38426';
const expiresIn = '1h';

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

// Check if the user exists in database
function isAuthenticated({ email, password }) {
  return (
    data.users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  );
}

// Login as one of the users from users.json
server.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (isAuthenticated({ email, password }) === false) {
    const status = 401;
    const message = 'Incorrect email or password';
    res.status(status).json({ status, message });
    return;
  }

  const accessToken = createToken({ email, password });
  res.status(200).json({ accessToken });
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(' ')[0] !== 'Bearer'
  ) {
    const status = 401;
    const message = 'Unauthorized';
    res.status(status).json({ status, message });
    return;
  }

  try {
    const verifyTokenResult = verifyToken(
      req.headers.authorization.split(' ')[1]
    );
    if (verifyTokenResult instanceof Error) {
      const status = 401;
      const message = 'AccessToken not provided';
      res.status(status).json({ status, message });
      return;
    }
    next();
  } catch (err) {
    const status = 401;
    const message = 'AccessToken is revoked';
    res.status(status).json({ status, message });
  }
});

// Example middleware to allow different paging parameters
// The parameters are assignd to json-server's default paging parameters: _page, _limit
server.use(/^(?!\/auth).*$/, (req, res, next) => {
  const { page, pageSize } = req.query;
  if (page) {
    req.query._page = page;
    delete req.query.page;
  }
  if (pageSize) {
    req.query._limit = pageSize;
    delete req.query.pageSize;
  }
  next();
});

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// server.use((req, res, next) => {
//   if (req.method === 'POST') {
//     req.body.createdAt = Date.now();
//   }
//   // Continue to JSON Server router
//   next();
// });

// Add this before server.use(router)
// server.use(
//   jsonServer.rewriter({
//     '/api/*': '/api/$1',
//   })
// );

// Use default router
server.use('/api', router);

const port = process.env.port || 3333;
server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
