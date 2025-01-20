import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class GetUsersService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async execute() {
    try {
      const users = await this.prisma.user.findMany({
        where: { status: 1 }
      });

      if (users.length <= 0) return [];

      return users;
    } catch (error) {
      throw new InternalServerErrorException("Error interno no servidor!");
    }
  }
}