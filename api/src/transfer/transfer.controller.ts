import {
  Controller,
  DefaultValuePipe,
  Get,
  Logger,
  Param,
  Query,
} from '@nestjs/common';
import { TransferService } from './transfer.service';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Transfer } from './transfer.entity';

type OrderBy = 'ASC' | 'DESC';

@Controller('transfer')
export class TransferController {
  private readonly logger = new Logger(TransferController.name);

  constructor(private readonly transferService: TransferService) {}

  @Get('count')
  getTokenCount() {
    return this.transferService.getCount();
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.transferService.findOneOrFail(id);
  }

  @Get()
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('address') address: string,
    @Query('orderBy') orderBy: OrderBy,
  ): Promise<Pagination<Transfer>> {
    limit = limit > 100 ? 100 : limit;
    return this.transferService.findAllPaginated(
      {
        page,
        limit,
        route: '/transfer',
      },
      address,
      orderBy,
    );
  }
}
