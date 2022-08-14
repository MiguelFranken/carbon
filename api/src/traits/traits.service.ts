import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trait } from './trait.entity';
import { Repository } from 'typeorm';
import { Length, TokenId } from '../token/token.entity';
import fs from 'fs';
import { join } from 'path';

interface MetadataAttribute {
  trait_type: string;
  value: string;
}

@Injectable()
export class TraitsService {
  private logger: Logger = new Logger(TraitsService.name);

  constructor(
    @InjectRepository(Trait) private traitRepository: Repository<Trait>,
  ) {}

  findAll() {
    return this.traitRepository.find();
  }

  findOne(id: number) {
    return this.traitRepository.findOne(id);
  }

  async findTraitsForTokenIdOrFail(tokenId: TokenId) {
    const trait: Trait | undefined = await this.traitRepository
      .createQueryBuilder('trait')
      .leftJoinAndSelect('trait.token', 'token') // TODO MF: Use subquery to optimize join
      .where('token.id = :id', { id: tokenId })
      .select('trait')
      .getOneOrFail();
    return this.removeNullProperties(trait);
  }

  private removeNullProperties(obj) {
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      const hasProperties = value && Object.keys(value).length > 0;
      if (value === null) {
        delete obj[key];
      } else if (typeof value !== 'string' && hasProperties) {
        this.removeNullProperties(value);
      }
    });
    return obj;
  }

  async findOrCreateForToken(tokenId: TokenId, length: Length): Promise<Trait> {
    const trait: Trait | undefined = await this.traitRepository
      .createQueryBuilder('trait')
      .leftJoinAndSelect('trait.token', 'token') // TODO MF: Optimize join
      .where('token.id = :id', { id: tokenId })
      .getOne();
    if (trait === undefined) {
      return await this.createForToken(tokenId, length);
    } else {
      return trait;
    }
  }

  async createForToken(tokenId: TokenId, length: Length) {
    const path = join(
      process.cwd(),
      `/metadata/${length}/${tokenId}/metadata.json`,
    );

    return new Promise<Trait>((resolve, reject) => {
      fs.readFile(path, 'utf8', async (err, data) => {
        if (err) {
          this.logger.debug(err);
          reject(err);
        } else {
          const metadataJSON = JSON.parse(data);
          const attributes: MetadataAttribute[] = metadataJSON.attributes;

          const trait = new Trait();
          for (const attribute of attributes) {
            if (attribute.trait_type === undefined) {
              trait['top'] = true;
            } else {
              trait[attribute.trait_type.toLowerCase().replace(/ /g, '_')] =
                attribute.value;
            }
          }

          try {
            const savedTrait = await this.traitRepository.save(trait);
            resolve(savedTrait);
          } catch (e) {
            this.logger.error('Cannot save trait');
            reject(e);
          }
        }
      });
    });
  }
}
