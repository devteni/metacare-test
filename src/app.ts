import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import apiRoutes from './routes/index.routes';

const app = express();

// Load swagger definitions
// const swaggerDefs =

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use('/api/v1', apiRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send(
    "<h1 align='center' style='color: saddlebrown; font-size: 5rem'>Welcome to Metacare </h1>",
  );
});

app.use('*', (req: Request, res: Response) => {
  res.send('<h1>Page not found! 404 :(</h1>');
});

export default app;
