import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Token } from '../../../token/token.entity';
import { Transfer } from '../../../transfer/transfer.entity';
import { TransferSeederService } from './transfer.seeder.service';

/**
 * Import and provide seeder classes for transfers.
 *
 * @module
 */
@Module({
  imports: [TypeOrmModule.forFeature([Token, Transfer])],
  providers: [TransferSeederService],
  exports: [TransferSeederService],
})
export class TransferSeederModule {}
