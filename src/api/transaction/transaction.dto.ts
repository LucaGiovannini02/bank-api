import { Type } from 'class-transformer';
import {
  IsDateString,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Max,
} from 'class-validator';
import { IsDateGreaterThan } from '../../utils/isDateGreaterThan.validator';

export class QueryTransactionsDTO {
  @IsOptional()
  @IsString()
  @IsMongoId()
  category: string;

  @IsOptional()
  @IsNumber()
  @Max(100)
  @Type(() => Number)
  number: number;

  @IsOptional()
  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  @IsDateGreaterThan('startDate')
  endDate: string;
}
