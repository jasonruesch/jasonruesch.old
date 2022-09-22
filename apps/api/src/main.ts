/**
 * This is not a production server!
 */

import * as jsonServer from 'json-server';
import * as auth from 'json-server-auth';
import { expenses, users } from './data';

const ROUTES = {
  api: '/api/v1.0',
};

const app = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router({ expenses, users });

const rules = auth.rewriter({
  // Permission rules
  users: 600,
  expenses: 640,
});

// /!\ Bind the router db to the app
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(app as any).db = router.db;

app.use(middlewares);
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
app.use(jsonServer.bodyParser);

app.get(ROUTES.api, (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

// You must apply the middlewares in the following order
app.use(ROUTES.api, rules);
app.use(ROUTES.api, auth);
app.use(ROUTES.api, router);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
