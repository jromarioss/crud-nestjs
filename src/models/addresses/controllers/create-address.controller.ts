import { Body, ConflictException, Controller, HttpCode, HttpStatus, InternalServerErrorException, Post } from "@nestjs/common";
import { CreateAddressService } from "../services";
import { CreateAddressDTO } from "../dto/create-address.dto";

@Controller("address")
export class CreateAddressController {
  constructor(private readonly createAddressService: CreateAddressService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post("create-address")
  async handle(@Body() data: CreateAddressDTO) {
    try {
      return await this.createAddressService.execute(data);
    } catch (error) {
      if (error instanceof ConflictException) throw error;

      throw new InternalServerErrorException(error);
    }
  }
}