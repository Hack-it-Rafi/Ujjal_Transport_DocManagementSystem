
import express, { Application, Request, Response} from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();
// const port = 3000

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

const test = async(req: Request, res: Response) => {
  Promise.reject();
  const a = 10;
  res.send(a);
}
app.get('/', test);

app.use(globalErrorHandler);

app.use(notFound);

export default app;