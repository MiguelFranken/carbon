import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IToken, Size, Token } from '../../../token/token.entity';
import { Repository } from 'typeorm';
import faker from 'faker';
import { TraitsService } from '../../../traits/traits.service';

@Injectable()
export class TokenSeederService {
  private logger: Logger = new Logger(TokenSeederService.name);

  private readonly tokens: IToken[];

  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private readonly traitsService: TraitsService,
    @Inject('NUMBER_OF_SEEDED_TOKENS') numberOfSeededTokens: number,
  ) {
    this.tokens = Array(numberOfSeededTokens)
      .fill(1)
      .map((item, i) => {
        const tokenId = i + 1;
        const rawSize = Math.min(
          faker.datatype.number({
            min: 1,
            max: 15,
          }),
          10,
        );
        const size = Math.ceil(rawSize) as Size;
        return {
          id: tokenId,
          size: size,
          balance: faker.datatype
            .number({
              min: 20000000000000000,
              max: 100000000000000000000,
            })
            .toString(),
          blockNumber: tokenId,
        };
      });
  }

  /**
   * Seed all tokens.
   *
   * @function
   */
  create(): Array<Promise<Token>> {
    return this.tokens.map(async (token: IToken) => {
      return await this.tokenRepository
        .findOne({ id: token.id })
        .then(async (dbToken) => {
          // We check if a token already exists.
          // If it does don't create a new one.
          if (dbToken) {
            this.logger.log(`Already in DB: ${token.id}`);
            return Promise.resolve(null);
          }
          try {
            const trait = await this.traitsService.findOrCreateForToken(
              token.id,
              token.size as Size,
            );
            return Promise.resolve(
              await this.tokenRepository.save(
                new Token({
                  ...token,
                  trait,
                }),
              ),
            );
          } catch (e) {
            this.logger.error(
              `Cannot create traits entry for token (${token.id}, ${token.size})`,
            );
            return Promise.reject(e);
          }
        })
        .catch((error) => {
          this.logger.error('Error occurred during tokens seeding');
          Promise.reject(error);
        });
    });
  }
}
