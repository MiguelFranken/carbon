import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Transfer } from '../transfer/transfer.entity';
import { Trait } from '../traits/trait.entity';

export type TokenId = number;
export type Length = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface IToken {
  id: TokenId;
  length: Length;
  balance: string;
  blockNumber: number;
}

@Entity()
export class Token extends BaseEntity implements IToken {
  constructor(partial: Partial<Token>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryColumn()
  id: TokenId;

  @Column({ default: 1 })
  length: Length;

  @Column({ type: 'decimal', precision: 65, scale: 0, default: 0 })
  balance: string;

  @Column({ default: null })
  blockNumber: number;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @OneToOne(() => Trait, (trait: Trait) => trait.token)
  @JoinColumn()
  trait: Trait;

  @OneToMany(() => Transfer, (transfer: Transfer) => transfer.token)
  transfers: Transfer[];
}
