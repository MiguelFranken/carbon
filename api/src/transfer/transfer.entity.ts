import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Token } from '../token/token.entity';

export interface ITransfer {
  id: string;
  blockNumber: number;
  from: string;
  to: string;
}

@Entity()
export class Transfer extends BaseEntity implements ITransfer {
  constructor(partial: Partial<Transfer>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryColumn()
  id: string;

  @Column()
  blockNumber: number;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @ManyToOne(() => Token, (token: Token) => token.transfers, { cascade: true })
  token: Token;
}
