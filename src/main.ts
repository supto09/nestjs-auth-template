import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { useContainer } from 'class-validator';

import { AppModule } from '@/app.module';
import { instance } from '@/common/logger/winston.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: instance,
    }),
  });

  // class validator auto validate
  app.useGlobalPipes(new ValidationPipe());

  // enable DI for class-validator
  // this is an important step
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // setup swagger
  setupSwagger(app);

  await app.listen(3000);
}

const setupSwagger = (app: INestApplication) => {
  const sortedTags = ['Iam'];

  const documentBuilder = new DocumentBuilder()
    .setTitle('Nest Auth API Doc')
    .setDescription('Api documentation for Nest Auth Template')
    .setVersion('1.0');

  sortedTags.forEach((tag) => {
    documentBuilder.addTag(tag);
  });

  const config = documentBuilder.build();

  const options: SwaggerDocumentOptions = {};
  const document = SwaggerModule.createDocument(app, config, options);

  const customOptions: SwaggerCustomOptions = {};
  SwaggerModule.setup('api', app, document, customOptions);
};

bootstrap();
