import { Controller, Get, HttpCode, HttpStatus, InternalServerErrorException, Param } from "@nestjs/common";
import { GetUsersService } from "../services/get-users.service";

@Controller("user")
export class GetUsersController {
  constructor(private readonly getUsersService: GetUsersService) {}

  @HttpCode(HttpStatus.CREATED)
  @Get("get-users")
  async handle() {
    try {
      return await this.getUsersService.execute();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}