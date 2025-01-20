import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { GetUserByIdService } from "./get-user-by-id.service";
import { UpdateUserDTO } from "../dto/update-user.dto";

@Injectable()
export class UpdateUserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly getUserByIdService: GetUserByIdService,
  ) {}

  async execute(id: number, data: UpdateUserDTO) {
    try {
      const user = await this.getUserByIdService.execute(id);
      if (!user) throw new NotFoundException("Id inválido!");
   
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          ...user,
          
          name: data.name ?? user.name,
          email: data.email ?? user.email
        }
      })

      return true;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
    
      throw new InternalServerErrorException("Error interno no servidor!");
    }
  }
}