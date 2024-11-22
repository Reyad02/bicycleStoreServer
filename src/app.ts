import express, { Request, Response } from 'express';
import cors from 'cors';
import bicycleRouter from './app/modules/bicycle/bicycle.route';
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', bicycleRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
