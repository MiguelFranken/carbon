import { Global, Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { TokenSeederModule } from './tokens/token.seeder.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { TransferSeederModule } from './transfers/transfer.seeder.module';
import { TraitsModule } from '../../traits/traits.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
          synchronize: false,
          dropSchema: false,
        }),
    }),
    TraitsModule,
    TokenSeederModule,
    TransferSeederModule,
  ],
  controllers: [],
  providers: [
    SeederService,
    {
      provide: 'NUMBER_OF_SEEDED_TOKENS',
      useValue: 20,
    },
  ],
  exports: [SeederService, 'NUMBER_OF_SEEDED_TOKENS'],
})
export class SeederModule {}
