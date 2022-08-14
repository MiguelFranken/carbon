import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Token, TokenId } from './token.entity';
import { TransferService } from '../transfer/transfer.service';
import { Transfer } from '../transfer/transfer.entity';
import { GetTokensQuery } from './tokens.query';

type OrderBy = 'ASC' | 'DESC';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
    private transferService: TransferService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  public getCount() {
    return this.tokenRepository.count();
  }

  public getCountPerLength() {
    const queryBuilder = this.tokenRepository.createQueryBuilder('token');
    queryBuilder.groupBy('length');
    queryBuilder.select('length');
    queryBuilder.addSelect('COUNT(length)', 'count');
    return queryBuilder.getRawMany();
  }

  public findOne(id: TokenId) {
    return this.tokenRepository.findOne(id);
  }

  public async exists(id) {
    return (await this.tokenRepository.findOne(id)) !== undefined;
  }

  public async findOneOrFail(id: TokenId, includeLatestTransfer = false) {
    if (includeLatestTransfer) {
      return await this.getTokenWithLatestTransferQueryBuilder(
        id,
      ).getOneOrFail();
    }
    return await this.tokenRepository.findOneOrFail(id);
  }

  async findOneTokenOrCreate(id: TokenId) {
    let token = await this.tokenRepository.findOne(id);
    if (token === undefined) {
      token = new Token({
        id,
      });
      await this.tokenRepository.save(token);
    }
    return token;
  }

  public async findLastHandledBlock() {
    const queryBuilder = this.tokenRepository.createQueryBuilder('token');
    queryBuilder.select('MAX(token.blockNumber)', 'block');
    return (await queryBuilder.getRawOne()).block;
  }

  public findAllPaginated(
    options: IPaginationOptions,
    orderBy: OrderBy,
    queryParameters: GetTokensQuery,
  ): Promise<Pagination<Token>> {
    const queryBuilder = this.tokenRepository.createQueryBuilder('token');

    const whereCondition = [];
    const whereParameters: any = {};

    delete queryParameters['page'];
    delete queryParameters['limit'];
    delete queryParameters['order'];

    const filterKeyMap = {
      background: 'background_color',
    };

    const filterValueMap = {
      jizz: {
        'twist-jizz': "The Ol'Granny Twist Jizz",
      },
    };

    Object.keys(queryParameters).forEach((filterKey) => {
      const filterValues = queryParameters[filterKey];
      const localWhereConditions = [];
      filterValues.forEach((filterValue, index) => {
        const param = filterKey + '_' + index;
        const mappedFilterKey =
          filterKey in filterKeyMap ? filterKeyMap[filterKey] : filterKey;
        if (mappedFilterKey === 'top') {
          localWhereConditions.push(`trait.${mappedFilterKey} = true`);
        } else if (filterValue === 'none') {
          localWhereConditions.push(`trait.${mappedFilterKey} IS NULL`);
        } else {
          let mappedFilterValue = `${filterValue}`.split('-').join(' ');
          if (filterKey in filterValueMap) {
            if (filterValue in filterValueMap[filterKey]) {
              mappedFilterValue = filterValueMap[filterKey][filterValue];
            }
          }
          localWhereConditions.push(`trait.${mappedFilterKey} = :${param}`);
          whereParameters[param] = mappedFilterValue;
        }
      });
      whereCondition.push(`(${localWhereConditions.join(' OR ')})`);
    });

    if (whereCondition.length > 0) {
      const conditionConjunction = whereCondition.join(' AND ');

      queryBuilder.innerJoin(
        'token.trait',
        'trait',
        conditionConjunction,
        whereParameters,
      );
    }

    if (orderBy) {
      queryBuilder.orderBy('token.id', orderBy);
    }

    return paginate<Token>(queryBuilder, options);
  }

  public findDecentiles() {
    const query = this.tokenRepository
      .createQueryBuilder('token')
      .where('token.balance != 0')
      .distinctOn(['balance']) // skip duplicate balances
      .leftJoinAndMapOne(
        'token.rank',
        (qb) =>
          qb
            .select('id')
            .addSelect('NTILE(10) OVER(ORDER BY balance)', 'rank') // decentile rank
            .from(Token, 'tk'),
        'ranked',
        `ranked.id = token.id`,
      )
      .groupBy('rank')
      .select('rank')
      .addSelect('MIN(balance)', 'min')
      .addSelect('MAX(balance)', 'max');

    return query.cache('decentiles', 600000).getRawMany();
  }

  public findAllTokenTransfers(
    id: TokenId,
    options: IPaginationOptions,
  ): Promise<Pagination<Transfer>> {
    const queryBuilder = this.transferService.createFindAllByTokenIdQuery(id);
    return paginate<Transfer>(queryBuilder, options);
  }

  private getTokenWithLatestTransferQueryBuilder(
    id: TokenId,
  ): SelectQueryBuilder<Token> {
    return this.tokenRepository
      .createQueryBuilder('token')
      .where('token.id = :id', { id })
      .innerJoin(
        (qb) =>
          qb
            .select(['id', 'tokenId'])
            .from(Transfer, 'tr')
            .where('tr.tokenId = :tid', { tid: id })
            .orderBy({ 'tr.blockNumber': 'DESC' })
            .limit(1),
        'tr',
        'tr.tokenId = token.id',
      )
      .select('token')
      .leftJoinAndMapOne(
        'token.latestTransfer',
        'token.transfers',
        'transfer',
        `transfer.id = tr.id`,
      );
  }

  create(token: Token) {
    this.cacheManager.del('decentiles');
    return this.tokenRepository.save(token);
  }
}
