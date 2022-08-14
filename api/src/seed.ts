import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SeederService } from './database/seeders/seeder.service';
import { SeederModule } from './database/seeders/seeder.module';

async function bootstrap() {
  NestFactory.createApplicationContext(SeederModule)
    .then((appContext) => {
      const logger: Logger = new Logger('Seeder');
      const seeder = appContext.get(SeederService);
      logger.debug('Seeding...');
      seeder
        .seed()
        .then(() => {
          logger.debug('Seeding complete!');
        })
        .catch((error) => {
          logger.error('Seeding failed!');
          throw error;
        })
        .finally(() => appContext.close());
    })
    .catch((error) => {
      throw error;
    });
}
bootstrap();
