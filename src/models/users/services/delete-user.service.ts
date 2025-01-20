import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { GetUserByIdService } from "./get-user-by-id.service";

@Injectable()
export class DeleteUserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly getUserByIdService: GetUserByIdService,
  ) {}

  async execute(id: number) {
    try {
      const user = await this.getUserByIdService.execute(id);
      if (!user) throw new NotFoundException("Id inválido!");

      await this.prisma.user.update({
        where: { id: user.id },
        data: { ...user, status: 0 },
      });

      return true;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
    
      throw new InternalServerErrorException("Error interno no servidor!");
    }
  }
}