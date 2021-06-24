import express from 'express';

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

import apiRoute from './api/routes/duckduckgo-route';
app.use('/api', apiRoute);

import apiDb from './api/routes/db-routes';
app.use('/api', apiDb);

app.listen(5000, () => {
  console.log('server is listening on port 5000');
});
