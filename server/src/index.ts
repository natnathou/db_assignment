import express, { Response, Request } from 'express';

const app = express();

app.get('/api', (req: Request, res: Response) => {
  res.status(200).json({ message: 'ok' });
});

app.listen(5000, () => {
  console.log('server is listening on port 5000');
});
