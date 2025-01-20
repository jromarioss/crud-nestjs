import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { IGetUserById } from "../interface/get-user-by-id";

@Injectable()
export class GetUserByIdService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async execute(id: number): Promise<IGetUserById> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id, status: 1 },
        include: { addresses: true }
      });

      if (!user) return null;

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.addresses[0].address,
        number: user.addresses[0].number,
        created_at: user.created_at.toString(),
      };
    } catch (error) {
      throw new InternalServerErrorException("Error interno no servidor!");
    }
  }
}