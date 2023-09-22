import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class AddUserDTO {
  @IsString()
  nomeTitolare: string;

  @IsString()
  cognomeTitolare: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  @Matches(
    new RegExp('(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$'),
    {
      message: 'Password must contain at least 8 chars: 1 uppercase letter, 1 lowercase letter, 1 number or special character'
    }
  )
  password: string;
}

export class LoginDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}