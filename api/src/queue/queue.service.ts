import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  private readonly logger: Logger = new Logger(QueueService.name);

  constructor(@InjectQueue('event-queue') private queue: Queue) {
    this.logger.debug('Constructed QueueService');
  }

  addTransferEvent(data) {
    return this.queue.add('Transfer', data, {
      attempts: 6,
      delay: 1000,
      backoff: {
        type: 'exponential',
        delay: 500,
      },
    });
  }

  addBalanceEvent(data) {
    return this.queue.add('Balance', data, {
      attempts: 6,
      delay: 1000,
      backoff: {
        type: 'exponential',
        delay: 500,
      },
    });
  }

  addPermanentURIEvent(data) {
    return this.queue.add('Mint', data, {
      lifo: true,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 300,
      },
    });
  }
}
