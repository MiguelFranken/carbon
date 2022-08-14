import {
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

  @IsIn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], { each: true })
  @Transform(({ value }) => `${value}`.split(',').map((str) => parseInt(str)))
  @IsOptional()
  size?: number[];
}
