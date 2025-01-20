import { BadRequestException, Controller, Get, HttpCode, HttpStatus, InternalServerErrorException, NotFoundException, Param, Patch } from "@nestjs/common";
import { DeleteUserService } from "../services";

@Controller("user")
export class DeleteUserController {
  constructor(private readonly deleteUserService: DeleteUserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Patch("delete-user/:id")
  async handle(@Param("id") id: string) {
    try {
      return await this.deleteUserService.execute(Number(id));
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException(error);
    }
  }
}