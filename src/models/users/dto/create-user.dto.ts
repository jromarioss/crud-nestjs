import { IsEmail, IsInt, IsOptional, IsString } from "class-validator";

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsInt()
  status?: number;
}