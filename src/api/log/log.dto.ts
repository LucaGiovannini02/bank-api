import { IsOptional, IsString } from "class-validator";

export class AddLogDTO {
    @IsString()
    @IsOptional()
    ip: string;
}