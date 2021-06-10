import { Server } from 'http';
import * as serverlessExpress from 'aws-serverless-express';
import express from 'express';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Context } from 'aws-lambda';

let lambdaProxy: Server;

async function bootstrap() {
  const expressServer = express();
  expressServer.disable('x-powered-by');
  // Max api gateway request limit
  expressServer.use(express.json({ limit: '10mb' }));
  const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressServer));

  nestApp.enableCors();
  await nestApp.init();

  return serverlessExpress.createServer(expressServer);
}

export const handler = async (event: any, context: Context) => {
  if (!lambdaProxy) {
    lambdaProxy = await bootstrap();
  }
  if (event.source === 'serverless-plugin-warmup') {
    // tslint:disable-next-line: no-console
    console.log('Warmed up lambda', { event });
    return 'Lambda is warm!';
  }
  const response = await serverlessExpress.proxy(lambdaProxy, event, context, 'PROMISE').promise;
  // tslint:disable-next-line: no-console
  console.log('response', response);
  return response;
};
