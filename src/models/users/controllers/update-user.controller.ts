import { Body, Controller, Get, HttpCode, HttpStatus, InternalServerErrorException, NotFoundException, Param, Patch } from "@nestjs/common";
import { UpdateUserDTO } from "../dto/update-user.dto";
import { UpdateUserService } from "../services/update-user.service";

@Controller("user")
export class UpdateUserController {
  constructor(private readonly updateUserService: UpdateUserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Patch("update-user/:id")
  async handle(@Param("id") id: string, @Body() data: UpdateUserDTO) {
    try {
      return await this.updateUserService.execute(Number(id), data);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException(error);
    }
  }
}