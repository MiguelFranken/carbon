import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITransfer, Transfer } from '../../../transfer/transfer.entity';
import { Token } from '../../../token/token.entity';
import faker from 'faker';

export interface ITransferWithTokenId extends ITransfer {
  tokenId: number;
}

@Injectable()
export class TransferSeederService {
  private logger: Logger = new Logger(TransferSeederService.name);

  private readonly transfers: ITransferWithTokenId[];

  constructor(
    @InjectRepository(Transfer)
    private readonly transferRepository: Repository<Transfer>,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    @Inject('NUMBER_OF_SEEDED_TOKENS') numberOfSeededTokens: number,
  ) {
    this.transfers = Array(numberOfSeededTokens)
      .fill(1)
      .map((item, i) => {
        const tokenId = i + 1;
        return {
          id: `log_${tokenId}`,
          blockNumber: tokenId,
          from: '0x0000000000000000000000000000000000000000',
          to: faker.finance.bitcoinAddress(),
          tokenId: tokenId,
        };
      });
  }

  /**
   * Seed all tokens.
   *
   * @function
   */
  create(): Array<Promise<Transfer>> {
    return this.transfers.map(async (transfer: ITransferWithTokenId) => {
      return await this.transferRepository
        .findOne({ id: transfer.id })
        .then(async (dbToken) => {
          // We check if a transfer already exists.
          // If it does don't create a new one.
          if (dbToken) {
            this.logger.log(`Already in DB: ${transfer.id}`);
            return Promise.resolve(null);
          }
          if (transfer.tokenId) {
            const token = await this.tokenRepository.findOne(transfer.tokenId);
            if (token === undefined) {
              this.logger.error('Cannot find token');
              return Promise.reject();
            }
            const transferDB = transfer as Partial<Transfer>;
            transferDB.token = token;
            return Promise.resolve(
              await this.transferRepository.save(transferDB),
            );
          } else {
            return Promise.resolve(
              await this.transferRepository.save(transfer),
            );
          }
        })
        .catch((error) => {
          this.logger.error('Error occurred during transfers seeding');
          Promise.reject(error);
        });
    });
  }
}
