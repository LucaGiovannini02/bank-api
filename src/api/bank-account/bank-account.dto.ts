import { IsDateString, IsString } from "class-validator";

export class AddBankAccount {
    @IsDateString()
    openingDate: string;

    @IsString()
    iban: string;
}