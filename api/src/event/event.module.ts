import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { EventService } from './event.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Module({
  imports: [],
  controllers: [],
  providers: [EventService],
})
export class EventModule implements OnModuleInit {
  private logger: Logger = new Logger(EventModule.name);

  constructor(private eventService: EventService) {}

  /**
   * Initially load all past events on blockchain that
   * we might have missed. After that listen for
   * blockchain events over websockets connection.
   */
  onModuleInit() {
    // resolve when all events were loaded
    this.loadPastMintEvents();
    this.loadPastTransferEvents();
    this.loadPastBalanceEvents();

    // resolve after listener are activated
    this.eventService.listenForTransferEvent();
    this.eventService.listenForMintEvent();
    this.eventService.listenForBalanceEvent();
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async loadPastTransferEvents() {
    await this.eventService.loadPastTransferEvents();
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async loadPastMintEvents() {
    await this.eventService.loadPastMintEvents();
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async loadPastBalanceEvents() {
    await this.eventService.loadPastBalanceEvents();
  }
}
