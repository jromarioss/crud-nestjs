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
        where: { status: 1 },
        include: { addresses: true }
      });

      if (users.length <= 0) return [];

      return users.map((item) => {
        return {
          id: item.id,
          name: item.name,
          email: item.email,
          address: item.addresses[0].address,
          number: item.addresses[0].number,
          created_at: item.created_at.toString(),
        }
      });
    } catch (error) {
      throw new InternalServerErrorException("Error interno no servidor!");
    }
  }
}