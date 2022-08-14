import { Injectable, Logger } from '@nestjs/common';
import { BlockchainService } from '../blockchain/blockchain.service';
import { TokenService } from '../token/token.service';
import { TransferService } from '../transfer/transfer.service';
import { TraitsService } from '../traits/traits.service';
import { QueueService } from '../queue/queue.service';

type BlockchainEvent = 'PermanentURI' | 'Transfer' | 'Mint';

@Injectable()
export class EventService {
  private logger: Logger = new Logger(EventService.name);

  constructor(
    private blockchainService: BlockchainService,
    private tokenService: TokenService,
    private transferService: TransferService,
    private traitService: TraitsService,
    private queueService: QueueService,
  ) {}

  async loadPastTransferEvents(): Promise<void> {
    const lastHandledBlock = await this.tokenService.findLastHandledBlock();
    return this.loadPastEvents(
      'Transfer',
      lastHandledBlock ? lastHandledBlock + 1 : 0,
      this.onTransfer,
    );
  }

  async loadPastMintEvents(): Promise<void> {
    const lastHandledBlock = await this.tokenService.findLastHandledBlock();
    return this.loadPastEvents(
      'PermanentURI',
      lastHandledBlock ? lastHandledBlock + 1 : 0,
      this.onMint,
    );
  }

  async loadPastBalanceEvents(): Promise<void> {
    const lastHandledBlock = await this.tokenService.findLastHandledBlock();
    return this.loadPastEvents(
      'Mint',
      lastHandledBlock ? lastHandledBlock + 1 : 0,
      this.onBalance,
    );
  }

  listenForTransferEvent(): Promise<void> {
    return this.listenForEvent('Transfer', this.onTransfer);
  }

  listenForMintEvent(): Promise<void> {
    return this.listenForEvent('PermanentURI', this.onMint);
  }

  listenForBalanceEvent(): Promise<void> {
    return this.listenForEvent('Mint', this.onBalance);
  }

  private async onMint(eventInfo) {
    await this.queueService.addPermanentURIEvent(eventInfo);
  }

  private async onBalance(eventInfo) {
    await this.queueService.addBalanceEvent(eventInfo);
  }

  private async onTransfer(eventInfo) {
    await this.queueService.addTransferEvent(eventInfo);
  }

  public async loadPastEvents(
    eventName: BlockchainEvent,
    from: number,
    onEventHandler,
    onErrorHandler?,
  ) {
    const onError = onErrorHandler ?? this.onEventError;
    await this.blockchainService.getPastEvents(
      {
        params: {
          fromBlock: from ?? 0,
        },
      },
      eventName,
      async (error, event) => {
        if (error) {
          await onError.bind(this)(error);
        } else {
          await onEventHandler.bind(this)(event);
        }
      },
    );
  }

  public async listenForEvent(
    eventName: BlockchainEvent,
    onEventHandler,
    onErrorHandler?,
  ) {
    const onError = onErrorHandler ?? this.onEventError;
    await this.blockchainService.handleEvent(
      {},
      eventName,
      async (error, event) => {
        if (error) {
          await onError.bind(this)(error);
        } else {
          await onEventHandler.bind(this)(event);
        }
      },
    );
  }

  private async onEventError(error) {
    this.logger.error('Cannot handle received blockchain event');
    this.logger.error(error);
  }
}
