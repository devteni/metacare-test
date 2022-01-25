import express, { Application, Request, Response } from 'express';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import apiRoutes from './routes/index.routes';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(express.static('public'));

const swaggerJSDoc = YAML.load(`${process.cwd()}/docs.yaml`);

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerJSDoc, { explorer: true }),
);

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
