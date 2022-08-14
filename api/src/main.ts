import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { EntityNotFoundExceptionFilter } from './filters/entity-not-found-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());
  await app.listen(3001);
}
bootstrap().then(() => {
  return;
});
