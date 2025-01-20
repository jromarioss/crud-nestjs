import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class DeleteAddressService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async execute(userId: number) {
    try {
      const address = await this.prisma.addresses.findFirst({
        where: { user_id : userId, status: 1 }
      })

      await this.prisma.addresses.update({
        where: { id: address.id },
        data: { ...address, status: 0 }
      })

      return true;
    } catch (error) {
      throw new InternalServerErrorException("Error interno no servidor!");
    }
  }
}