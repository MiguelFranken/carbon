import {
  IsBoolean,
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum TokenBackground {
  Black = 'black',
  Blue = 'blue',
  Yellow = 'yellow',
  Green = 'green',
  Purple = 'purple',
  Orange = 'orange',
  Pink = 'pink',
}

export enum TokenColor {
  Blue = 'blue',
  Yellow = 'yellow',
  Green = 'green',
  Purple = 'purple',
  Orange = 'orange',
  Pink = 'pink',
  Bone = 'bone',
  Wood = 'wood',
}

export enum TokenVein {
  None = 'none',
  Normal = 'normal',
  Crazy = 'crazy',
}

export enum TokenHair {
  None = 'none',
  Normal = 'normal',
  Hairy = 'not shaved',
  ExtraHairy = 'never shaved',
}

export enum TokenCondomType {
  None = 'none',
  Normal = 'normal',
  Jizzed = 'jizzed',
}

export enum TokenCondomColor {
  Blue = 'blue',
  Red = 'red',
  Yellow = 'yellow',
}

export enum TokenEichelPiercingType {
  None = 'none',
  Normal = 'normal',
  Ring = 'ring',
  Septum = 'septum',
}

export enum TokenEichelPiercingColor {
  Silver = 'silver',
  Gold = 'gold',
}

export enum TokenBallSackSleeve {
  None = 'none',
  Gray = 'gray',
}

export enum TokenBallSackRing {
  None = 'none',
  Silver = 'silver',
  Gold = 'gold',
}

export enum TokenHoverAddon {
  None = 'none',
  Holy = 'holy',
  Crown = 'crown',
}

export enum TokenJizz {
  None = 'none',
  FirstTimer = 'first-timer',
  ShotInTheSock = 'shot-in-the-sock',
  Granny = 'twist-jizz',
}

export enum TokenAura {
  None = 'none',
  Fire = 'fire',
  Blessing = 'blessing',
  Slime = 'slime',
}

export enum TokenLaser {
  None = 'none',
  Red = 'red',
  Green = 'green',
}

export enum TokenLaserBeam {
  None = '',
}

export class GetTokensQuery {
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @IsOptional()
  page = 1;

  @IsInt()
  @Type(() => Number)
  @Min(0)
  @Max(100)
  @IsOptional()
  limit = 10;

  @IsString()
  @IsOptional()
  @IsEnum(Order)
  order: any = Order.ASC;

  @IsIn(['true'], { each: true })
  @Transform(({ value }) => `${value}`.split(','))
  @IsOptional()
  top: string[];

  @IsOptional()
  @Transform(({ value }) => `${value}`.split(','))
  @IsEnum(TokenBackground, { each: true })
  background?: TokenBackground[];

  @IsIn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], { each: true })
  @Transform(({ value }) => `${value}`.split(',').map((str) => parseInt(str)))
  @IsOptional()
  length?: number[];

  @IsOptional()
  @Transform(({ value }) => `${value}`.split(','))
  @IsEnum(TokenColor, { each: true })
  color?: TokenColor[];

  @IsOptional()
  @Transform(({ value }) => `${value}`.split(','))
  @IsEnum(TokenVein, { each: true })
  vein?: TokenVein[];

  @IsOptional()
  @Transform(({ value }) =>
    `${value}`.split(',').map((hair) => hair.split('-').join(' ')),
  )
  @IsEnum(TokenHair, { each: true })
  pubic_hair?: TokenHair[];

  @IsOptional()
  @Transform(({ value }) => `${value}`.split(','))
  @IsEnum(TokenCondomType, { each: true })
  condom?: TokenCondomType[];

  @IsOptional()
  @Transform(({ value }) => `${value}`.split(','))
  @IsEnum(TokenCondomColor, { each: true })
  condom_color?: TokenCondomColor[];

  @IsOptional()
  @Transform(({ value }) => `${value}`.split(','))
  @IsEnum(TokenEichelPiercingType, { each: true })
  glans_piercing?: TokenEichelPiercingType[];

  @IsOptional()
  @Transform(({ value }) => `${value}`.split(','))
  @IsEnum(TokenEichelPiercingColor, { each: true })
  glans_piercing_color?: TokenEichelPiercingColor[];

  @IsIn([0, 1, 2, 3, 4], { each: true })
  @Transform(({ value }) => `${value}`.split(',').map((str) => parseInt(str)))
  @IsOptional()
  silver_penis_ring?: number[];

  @IsIn([0, 1, 2, 3, 4], { each: true })
  @Transform(({ value }) => `${value}`.split(',').map((str) => parseInt(str)))
  @IsOptional()
  golden_penis_ring?: number[];

  @IsIn([0, 1, 2, 3, 4], { each: true })
  @Transform(({ value }) => `${value}`.split(',').map((str) => parseInt(str)))
  @IsOptional()
  mini_silver_penis_ring?: number[];

  @IsIn([0, 1, 2, 3, 4], { each: true })
  @Transform(({ value }) => `${value}`.split(',').map((str) => parseInt(str)))
  @IsOptional()
  mini_golden_penis_ring?: number[];

  @IsOptional()
  @Transform(({ value }) => `${value}`.split(','))
  @IsEnum(TokenBallSackSleeve, { each: true })
  ballsack_sleeve?: TokenBallSackSleeve[];

  @IsOptional()
  @Transform(({ value }) => `${value}`.split(','))
  @IsEnum(TokenBallSackRing, { each: true })
  ballsack_ring?: TokenBallSackRing[];

  @IsOptional()
  @Transform(({ value }) => `${value}`.split(','))
  @IsEnum(TokenHoverAddon, { each: true })
  glans_hat?: TokenHoverAddon[];

  @IsOptional()
  @Transform(({ value }) => `${value}`.split(','))
  @IsEnum(TokenJizz, { each: true })
  jizz?: TokenJizz[];

  @IsOptional()
  @Transform(({ value }) => `${value}`.split(','))
  @IsEnum(TokenAura, { each: true })
  aura?: TokenAura[];

  @IsOptional()
  @Transform(({ value }) => `${value}`.split(','))
  @IsEnum(TokenLaser, { each: true })
  laser_beam?: TokenLaser[];
}
