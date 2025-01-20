import { Body, Controller, HttpCode, HttpStatus, InternalServerErrorException, NotFoundException, Param, Patch } from "@nestjs/common";
import { UpdateAddressDTO } from "../dto/update-address.dto";
import { UpdateUserService } from "../services/update-user.service";

@Controller("user")
export class UpdateUserController {
  constructor(private readonly updateUserService: UpdateUserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Patch("update-user/:id")
  async handle(@Param("id") id: string, @Body() data: UpdateAddressDTO) {
    try {
      return await this.updateUserService.execute(Number(id), data);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException(error);
    }
  }
}