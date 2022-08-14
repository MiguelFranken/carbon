import {
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  Controller,
  DefaultValuePipe,
  Get,
  Logger,
  Param,
  ParseBoolPipe,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { Pagination } from 'nestjs-typeorm-paginate';
import { TokenService } from './token.service';
import { Transfer } from '../transfer/transfer.entity';
import { Token, TokenId } from './token.entity';
import { GetTokensQuery } from './tokens.query';

@Controller('token')
export class TokenController {
  private readonly logger = new Logger(TokenController.name);

  constructor(private readonly tokenService: TokenService) {}

  @Get('count')
  getCount() {
    return this.tokenService.getCount();
  }

  @Get('decentiles')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(100)
  @CacheKey('decentiles')
  getDecentiles() {
    return this.tokenService.findDecentiles();
  }

  @Get('counts')
  getCountPerSize() {
    return this.tokenService.getCountPerSize();
  }

  @Get(':id')
  async show(
    @Query('includeLatestTransfer', new DefaultValuePipe(true), ParseBoolPipe)
    includeLatestTransfer = true,
    @Param('id', ParseIntPipe)
    id: TokenId,
  ) {
    return await this.tokenService.findOneOrFail(id, includeLatestTransfer);
  }

  @Get()
  async index(
    @Query(new ValidationPipe({ transform: true })) query: GetTokensQuery,
  ): Promise<Pagination<Token>> {
    const page = query.page;
    const limit = query.limit;

    return this.tokenService.findAllPaginated(
      {
        page,
        limit: limit > 100 ? 100 : limit,
        route: '/token',
      },
      query.order,
      query,
    );
  }

  @Get(':id/transfers')
  async transfers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(15), ParseIntPipe) limit: number,
    @Param('id', ParseIntPipe) id: TokenId,
  ): Promise<Pagination<Transfer>> {
    return this.tokenService.findAllTokenTransfers(id, {
      page,
      limit,
      route: `/token/${id}/transfers`,
    });
  }
}
