import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateAddressDTO {
  @IsInt()
  user_id: number;

  @IsString()
  address: string;

  @IsString()
  number: string;

  @IsOptional()
  @IsInt()
  status?: number;
}