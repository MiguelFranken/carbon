import { CacheModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Token]), CacheModule.register()],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
