import 'reflect-metadata';
import { configure, getLogger } from 'log4js';
import express from 'express';
import LinkRoutes from './Modules/Link/Infra/Http/Routes/link.routes';
import ErrorHandlerMiddleware from './Shared/Infra/Http/Middleware/ErrorsHandlerMiddleware';
import { errors as CelebrateErrors } from 'celebrate';
import Injections from './Shared/Infra/Http/Injections';
import { PrismaClient } from '@prisma/client';

configure({
  appenders: {
    stdout: {
      type: 'stdout',
    },
  },
  categories: {
    default: {
      appenders: ['stdout'],
      level: 'debug',
    },
  },
});
const prisma = new PrismaClient();

const logger = getLogger('server');
const linkRoutes = new LinkRoutes();

const main = async () => {
  const app = express();

  const injections = new Injections();
  injections.register();

  app.use(express.json());
  app.use('/link', linkRoutes.register());

  app.use(CelebrateErrors());
  app.use(ErrorHandlerMiddleware);

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    logger.info(`Server running in http://localhost:${port}`);
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
