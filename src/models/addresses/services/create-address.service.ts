import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateAddressDTO } from "../dto/create-address.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CreateAddressService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async execute(data: CreateAddressDTO) {
    try {
      const Address = await this.prisma.addresses.create({
        data: { ...data, status: 1 }
      });

      return Address;
    } catch (error) {
      throw new InternalServerErrorException("Error interno no servidor!");
    }
  }
}