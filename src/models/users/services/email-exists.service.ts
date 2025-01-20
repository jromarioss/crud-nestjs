import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class EmailExistsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async execute(email: string) {
    try {
      const hasEMail = await this.prisma.user.findUnique({
        where: { email, status: 1 }
      });

      if (!hasEMail) return false;

      return true;
    } catch (error) {
      throw new InternalServerErrorException("Error interno no servidor!");
    }
  }
}