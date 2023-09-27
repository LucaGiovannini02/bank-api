import {
  IsNumber,
  IsDate,
  IsString,
  IsMongoId,
  IsOptional,
} from 'class-validator';

export class CreateTransactionDTO {
  @IsNumber()
  amount: number;

  @IsDate()
  date: Date;

  @IsString()
  description: string;

  @IsMongoId()
  bankAccount: string;

  @IsMongoId()
  transactionCategory: string;
}

export class UpdateTransactionDTO {
  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsDate()
  @IsOptional()
  date?: Date;

  @IsString()
  @IsOptional()
  description?: string;

  @IsMongoId()
  @IsOptional()
  bankAccount?: string;

  @IsMongoId()
  @IsOptional()
  transactionCategory?: string;
}
