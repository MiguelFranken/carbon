import { Global, Module } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transfer } from './transfer.entity';
import { TransferController } from './transfer.controller';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Transfer])],
  controllers: [TransferController],
  providers: [TransferService],
  exports: [TransferService],
})
export class TransferModule {}
