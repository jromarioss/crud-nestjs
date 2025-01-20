import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class GetUserByIdService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async execute(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id, status: 1 },
      });

      if (!user) return null;

      return user
    } catch (error) {
      throw new InternalServerErrorException("Error interno no servidor!");
    }
  }
}