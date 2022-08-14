import { Global, Module } from '@nestjs/common';
import { TraitsService } from './traits.service';
import { TraitsController } from './traits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trait } from './trait.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Trait])],
  controllers: [TraitsController],
  providers: [TraitsService],
  exports: [TraitsService],
})
export class TraitsModule {}
