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
  length: string;
  background_color: string;
  color: string;
  vein: string;
  pubic_hair: string;
  condom: string;
  condom_color: string;
  glans_piercing: string;
  glans_piercing_color: string;
  silver_penis_ring: string;
  golden_penis_ring: string;
  mini_silver_penis_ring: string;
  mini_golden_penis_ring: string;
  ballsack_ring: string;
  ballsack_sleeve: string;
  glans_hat: string;
  jizz: string;
  aura: string;
  laser_beam: string;
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

  @Column({ nullable: true })
  length: string;

  @Column({ nullable: true })
  background_color: string;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  vein: string;

  @Column({ nullable: true })
  pubic_hair: string;

  @Column({ nullable: true })
  condom: string;

  @Column({ nullable: true })
  condom_color: string;

  @Column({ nullable: true })
  glans_piercing: string;

  @Column({ nullable: true })
  glans_piercing_color: string;

  @Column({ nullable: true })
  silver_penis_ring: string;

  @Column({ nullable: true })
  golden_penis_ring: string;

  @Column({ nullable: true })
  mini_silver_penis_ring: string;

  @Column({ nullable: true })
  mini_golden_penis_ring: string;

  @Column({ nullable: true })
  ballsack_ring: string;

  @Column({ nullable: true })
  ballsack_sleeve: string;

  @Column({ nullable: true })
  glans_hat: string;

  @Column({ nullable: true })
  jizz: string;

  @Column({ nullable: true })
  aura: string;

  @Column({ nullable: true })
  laser_beam: string;

  @Column({ nullable: true })
  top: boolean;
}
