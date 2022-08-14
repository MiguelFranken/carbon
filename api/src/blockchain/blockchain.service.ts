import { Injectable, Logger } from '@nestjs/common';
import Web3 from 'web3';
import * as CryptoCocks from '../contracts/abi/CryptoCocks.json';
import * as addresses from '../contracts/addresses.json';
import { BlockNumber } from 'web3-core';
import { CryptoCocks as CryptoCocksContract } from '../types/CryptoCocks';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BlockchainService {
  private readonly logger = new Logger(BlockchainService.name);

  private readonly cryptoCocksContract: CryptoCocksContract;
  private readonly cryptoCocksContractWs: CryptoCocksContract;

  private readonly web3: Web3;

  // las seen block
  private lastBlock: number;

  constructor(private configService: ConfigService) {
    const httpUri = configService.get('WEB3_HTTP_PROVIDER');
    const wsUri = configService.get('WEB3_WEBSOCKET_PROVIDER');

    const web3Http: Web3 = new Web3(new Web3.providers.HttpProvider(httpUri));
    const web3Ws: Web3 = new Web3(new Web3.providers.WebsocketProvider(wsUri));
    this.web3 = web3Http;

    const cryptoCocksAddress = addresses.CryptoCocks;
    const cryptoCocksAbi: any = CryptoCocks.abi;

    this.cryptoCocksContract = new web3Http.eth.Contract(
      cryptoCocksAbi,
      cryptoCocksAddress,
    ) as any;
    this.cryptoCocksContractWs = new web3Ws.eth.Contract(
      cryptoCocksAbi,
      cryptoCocksAddress,
    ) as any;

    // set last block
    this.web3.eth
      .getBlockNumber()
      .then((block: number) => (this.lastBlock = block));
  }

  /**
   * @dev Calls a read-only smart contract function
   */
  async get(env, action, ...data) {
    env.params.from = BlockchainService.getFrom(env);
    return {
      callAccount: env.params.from,
      callData: await this.cryptoCocksContract.methods[action](...data).call(
        env.params,
      ),
    };
  }

  async getBlockTimestamp(blockHashOrBlockNumber: BlockNumber | string) {
    const block = await this.web3.eth.getBlock(blockHashOrBlockNumber);
    return block.timestamp;
  }

  async handleEvent(env, event, callback) {
    const contract = this.cryptoCocksContractWs;
    if (env.params === undefined) {
      env.params = {};
    }
    env.params.fromBlock = this.getFromBlock(env);
    this.logger.debug(`Listening for event from block ${env.params.fromBlock}`);
    if (contract.events[event]) {
      contract.events[event](env.params, (error, result) => {
        let eventInfo;
        if (result === undefined || result === null) {
          this.logger.error('result is null');
        } else {
          eventInfo = Object.assign(
            {
              id: result.id,
              blockNumber: result.blockNumber,
              event: result.event,
            },
            result.returnValues,
          );
        }

        callback(error, eventInfo);
      });
    } else {
      throw `Contract "${env.contract}" does not contain event "${event}"`;
    }
  }

  async getPastEvents(env, event, callback) {
    return new Promise<void>(async (resolve, reject) => {
      env.params.toBlock = 'latest';
      this.logger.debug(
        `Getting past ${event} events from block ${env.params.fromBlock}...`,
      );
      await this.cryptoCocksContract.getPastEvents(
        event,
        env.params,
        async (error, events: any) => {
          let mappedEvents = [];
          try {
            if (events === undefined || events === null) {
              this.logger.error('result is null');
              reject('result is null');
            } else {
              mappedEvents = events.map((event) =>
                Object.assign(
                  {
                    id: event.id,
                    blockNumber: event.blockNumber,
                    event: event.event,
                  },
                  event.returnValues,
                ),
              );
            }
          } catch (e) {
            this.logger.debug('Could not handle past events');
          }
          this.logger.debug(
            `Found ${mappedEvents.length} past ${event} events`,
          );

          const promises = mappedEvents.map((event) => callback(error, event));
          await Promise.all(promises);
          resolve();
        },
      );
    });
  }

  private getFromBlock(env): string {
    return env &&
      env.params &&
      env.params.fromBlock &&
      typeof env.params.fromBlock === 'number'
      ? env.params.fromBlock
      : this.lastBlock ?? 'latest';
  }

  private static getFrom(env): string {
    return typeof env.params.from === 'string' ? env.params.from : 'latest';
  }
}
