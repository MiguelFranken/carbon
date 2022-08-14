import { Controller, Get, Param } from '@nestjs/common';
import { TraitsService } from './traits.service';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { TokenId } from '../token/token.entity';

@Controller('traits')
export class TraitsController {
  constructor(private readonly traitsService: TraitsService) {}

  @Get()
  findAll() {
    return this.traitsService.findAll();
  }

  @Get('token/:id')
  findOneByTokenId(@Param('id', ParseIntPipe) tokenId: TokenId) {
    return this.traitsService.findTraitsForTokenIdOrFail(tokenId);
  }
}
