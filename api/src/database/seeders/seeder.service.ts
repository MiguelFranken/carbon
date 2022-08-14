import { Injectable, Logger } from '@nestjs/common';
import { TokenSeederService } from './tokens/token.seeder.service';
import { TransferSeederService } from './transfers/transfer.seeder.service';

@Injectable()
export class SeederService {
  private logger: Logger = new Logger(SeederService.name);

  constructor(
    private readonly tokensSeederService: TokenSeederService,
    private readonly transferSeederService: TransferSeederService,
  ) {}

  async seed() {
    await this.tokens()
      .then((completed) => {
        this.logger.debug('Successfully completed seeding tokens...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding tokens...');
        Promise.reject(error);
      });

    await this.transfers()
      .then((completed) => {
        this.logger.debug('Successfully completed seeding transfers...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding transfers...');
        Promise.reject(error);
      });
  }

  async tokens() {
    return await Promise.all(this.tokensSeederService.create())
      .then((createdTokens) => {
        this.logger.debug(
          'Number of tokens created : ' +
            // Remove all null values and return only created tokens.
            createdTokens.filter(
              (nullValueOrCreatedTokens) => nullValueOrCreatedTokens,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }

  async transfers() {
    return await Promise.all(this.transferSeederService.create())
      .then((createdTransfers) => {
        // Can also use this.logger.verbose('...');
        this.logger.debug(
          'Number of transfers created : ' +
            // Remove all null values and return only created transfers.
            createdTransfers.filter(
              (nullValueOrCreatedTokens) => nullValueOrCreatedTokens,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }
}
