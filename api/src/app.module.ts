import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getConnectionOptions } from 'typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { TokenModule } from './token/token.module';
import { TransferModule } from './transfer/transfer.module';
import { EventModule } from './event/event.module';
import { TraitsModule } from './traits/traits.module';
import { BlockchainModule } from './blockchain/blockchain.module';
import { BullModule } from '@nestjs/bull';
import { QueueModule } from './queue/queue.module';

const ENV = process.env.NODE_ENV; // ''development' or 'production'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
      ignoreEnvFile: !ENV || ENV !== 'development',
    }),
    BullModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: 6379,
        },
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    TokenModule,
    TransferModule,
    EventModule,
    TraitsModule,
    BlockchainModule,
    QueueModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
