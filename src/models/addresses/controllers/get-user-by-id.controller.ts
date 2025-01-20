import { Controller, Get, HttpCode, HttpStatus, InternalServerErrorException, Param } from "@nestjs/common";
import { GetUserByIdService } from "../services/get-address-by-id.service";

@Controller("user")
export class GetUserByIdController {
  constructor(private readonly getUserByIdService: GetUserByIdService) {}

  @HttpCode(HttpStatus.CREATED)
  @Get("get-user-by-id/:id")
  async handle(@Param("id") id: string) {
    try {
      return await this.getUserByIdService.execute(Number(id));
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}