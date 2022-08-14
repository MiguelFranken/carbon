import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Token } from '../token/token.entity';

export interface ITrait {
  id: number;
  size: string;
  top: boolean;
}

@Entity()
export class Trait extends BaseEntity implements ITrait {
  constructor(partial?: Partial<ITrait>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Token, (token: Token) => token.trait)
  token: Token;

  // TODO MF: Add more traits here

  @Column({ nullable: true })
  size: string;

  @Column({ nullable: true })
  top: boolean;
}
