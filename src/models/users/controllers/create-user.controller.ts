import { Body, ConflictException, Controller, HttpCode, HttpStatus, InternalServerErrorException, Post } from "@nestjs/common";
import { CreateUserService } from "../services";
import { CreateUserDTO } from "../dto/create-user.dto";

@Controller("user")
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post("create-user")
  async handle(@Body() data: CreateUserDTO) {
    try {
      return await this.createUserService.execute(data);
    } catch (error) {
      if (error instanceof ConflictException) throw error;

      throw new InternalServerErrorException(error);
    }
  }
}