import { Global, Logger, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueService } from './queue.service';
import { EventConsumer } from './event.consumer';

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'event-queue',
    }),
  ],
  providers: [QueueService, EventConsumer],
  exports: [QueueService],
})
export class QueueModule {
  private readonly logger = new Logger(QueueModule.name);

  constructor() {
    this.logger.debug('Constructed QueueModule');
  }
}
