import {
  Process,
  Processor,
  OnQueueFailed,
  OnQueueStalled,
  OnQueueError,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { TokenService } from '../token/token.service';
import { TransferService } from '../transfer/transfer.service';
import { Transfer } from '../transfer/transfer.entity';
import { BlockchainService } from '../blockchain/blockchain.service';
import { Token, TokenId } from '../token/token.entity';
import { TraitsService } from '../traits/traits.service';

@Processor('event-queue')
export class EventConsumer {
  private readonly logger = new Logger(EventConsumer.name);

  constructor(
    private tokenService: TokenService,
    private transferService: TransferService,
    private blockchainService: BlockchainService,
    private traitService: TraitsService,
  ) {}

  @OnQueueError()
  onQueueError(error: any) {
    this.logger.error(`Unexpected queue error occurred!`);
    this.logger.error(error);
  }

  @OnQueueStalled()
  onQueueStalled(job: Job) {
    this.logger.warn(`Job (${job.id}, ${job.name}) stalled`);
  }

  @OnQueueFailed()
  onQueueFailed(job: Job) {
    this.logger.error(
      `Job (${job.id}, ${job.name}) failed: ${job.failedReason}`,
    );
  }

  @Process('Balance')
  processBalanceEvent(job: Job) {
    return new Promise<void>(async (resolve, reject) => {
      const eventInfo = job.data;
      const id = eventInfo.id;
      const balance = eventInfo.balance;

      const existsToken = await this.tokenService.exists(id);

      if (!existsToken) {
        return reject({
          message: `Cannot save wallet balance for non-existing token ${id}.`,
        });
      }

      try {
        const token = await this.tokenService.findOneOrFail(id);
        if (+token.balance === 0) {
          token.balance = balance;
          await this.tokenService.create(token).then(() => {
            this.logger.log(`Updated balance for token ${id}`);
          });
        }
      } catch (e) {
        this.logger.log(`Cannot find or update token with id ${id}`);
        return reject(e);
      }

      return resolve();
    });
  }

  @Process('Transfer')
  processTransferEvent(job: Job) {
    return new Promise<void>(async (resolve, reject) => {
      const eventInfo = job.data;
      const id = eventInfo.id;
      const existsTransfer = await this.transferService.exists(id);

      if (existsTransfer) {
        return resolve();
      }

      const tokenId = eventInfo.tokenId;
      const existsToken = await this.tokenService.exists(tokenId);

      if (!existsToken) {
        return reject({
          message: `Cannot create transfer with id ${id} as token with id ${tokenId} does not exist.`,
        });
      }

      const transferData: Partial<Transfer> = {
        id,
        from: eventInfo.from,
        to: eventInfo.to,
        blockNumber: eventInfo.blockNumber,
      };

      try {
        transferData.token = await this.tokenService.findOneOrFail(tokenId);
      } catch (e) {
        this.logger.log(`Cannot find token with id ${tokenId}`);
        return reject(e);
      }

      const transfer = new Transfer(transferData);

      transfer.timestamp = new Date();
      try {
        const blockTimestamp = +(await this.blockchainService.getBlockTimestamp(
          transfer.blockNumber,
        ));
        transfer.timestamp = new Date(blockTimestamp * 1000);
      } catch (e) {
        this.logger.log('Cannot get block timestamp');
        return reject('Cannot get block timestamp');
      }

      try {
        await this.transferService.create(transfer).then(() => {
          this.logger.log(
            `Created new transfer entry for token ${transfer.token.id}`,
          );
        });
      } catch (e) {
        this.logger.log(`Cannot safe transfer entry with id ${transfer.id}`);
        return reject(e);
      }

      return resolve();
    });
  }

  @Process('Mint')
  processNewMintingEvent(job: Job) {
    return new Promise<void>(async (resolve, reject) => {
      const eventInfo = job.data;

      let length, tokenId: TokenId;

      try {
        const decodedValue = eventInfo._value
          .substring(0, eventInfo._value.length - 5)
          .split('_');
        length = decodedValue[0];
        tokenId = decodedValue[1];
      } catch (e) {
        this.logger.error(`Cannot decode event data`);
        return reject(e);
      }

      try {
        const exists = await this.tokenService.exists(tokenId);
        if (exists) {
          return resolve();
        }
      } catch (e) {
        this.logger.error(`Cannot check token existence`);
        return reject(e);
      }

      const tokenData: Partial<Token> = {
        id: tokenId,
        blockNumber: eventInfo.blockNumber,
        balance: '0', // is replaced when balance event is read
        length,
      };

      try {
        tokenData.trait = await this.traitService.createForToken(
          tokenId,
          length,
        );
      } catch (e) {
        this.logger.error(
          `Cannot store trait attributes for token with id ${tokenId}`,
        );
        return reject(e);
      }

      try {
        await this.tokenService.create(new Token(tokenData)).then(() => {
          this.logger.log(`Created token entry for token ${tokenData.id}`);
        });
      } catch (e) {
        if (e.code === 'ER_DUP_ENTRY') {
          return reject({
            message: `Token with id ${tokenId} already exists in database`,
          });
        }
        return reject(e);
      }

      return resolve();
    });
  }
}
