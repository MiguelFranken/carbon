import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Token } from '../../../token/token.entity';
import { TokenSeederService } from './token.seeder.service';
import { Transfer } from '../../../transfer/transfer.entity';
import { Trait } from '../../../traits/trait.entity';

/**
 * Import and provide seeder classes for tokens.
 *
 * @module
 */
@Module({
  imports: [TypeOrmModule.forFeature([Token, Transfer, Trait])],
  providers: [TokenSeederService],
  exports: [TokenSeederService],
})
export class TokenSeederModule {}
