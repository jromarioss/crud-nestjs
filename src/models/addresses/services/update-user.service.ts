import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { GetUserByIdService } from "./get-address-by-id.service";
import { UpdateAddressDTO } from "../dto/update-address.dto";

@Injectable()
export class UpdateUserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly getUserByIdService: GetUserByIdService,
  ) {}

  async execute(id: number, data: UpdateAddressDTO) {
    try {
      const user = await this.getUserByIdService.execute(id);
      if (!user) throw new NotFoundException("Id inválido!");
   
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          ...user,
          name: data.address ?? user.name,
        }
      })

      return true;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
    
      throw new InternalServerErrorException("Error interno no servidor!");
    }
  }
}