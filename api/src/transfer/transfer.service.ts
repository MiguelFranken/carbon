import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transfer } from './transfer.entity';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { TokenId } from '../token/token.entity';

type OrderBy = 'ASC' | 'DESC';

@Injectable()
export class TransferService {
  constructor(
    @InjectRepository(Transfer)
    private transferRepository: Repository<Transfer>,
  ) {}

  public getCount() {
    return this.transferRepository.count();
  }

  public async exists(id) {
    return (await this.transferRepository.findOne(id)) !== undefined;
  }

  public findOneOrFail(id) {
    return this.transferRepository.findOneOrFail(id);
  }

  public createFindAllByTokenIdQuery(id: TokenId) {
    return this.transferRepository
      .createQueryBuilder('transfer')
      .where('transfer.tokenId = :id', { id });
  }

  public findAllPaginated(
    options: IPaginationOptions,
    address?: string,
    orderBy?: OrderBy,
  ): Promise<Pagination<Transfer>> {
    const queryBuilder = this.transferRepository.createQueryBuilder('transfer');
    if (address) {
      queryBuilder.where(
        'transfer.from like :address OR transfer.to like :address',
        {
          address: `%${address}%`,
        },
      );
    }
    if (orderBy) {
      queryBuilder.orderBy('token.blockNumber', orderBy);
    }
    queryBuilder.leftJoinAndMapOne('transfer.token', 'transfer.token', 'token');
    return paginate<Transfer>(queryBuilder, options);
  }

  public create(transfer: Transfer) {
    return this.transferRepository.save(transfer);
  }
}
