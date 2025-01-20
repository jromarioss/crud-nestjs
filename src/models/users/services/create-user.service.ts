import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateUserDTO } from "../dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { EmailExistsService } from "./email-exists.service";
import { hash } from "bcrypt";

@Injectable()
export class CreateUserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailExistsService: EmailExistsService,
  ) {}

  async execute(data: CreateUserDTO) {
    try {
      const emailExists = await this.emailExistsService.execute(data.email);

      if (emailExists) throw new ConflictException("E-mail já cadastrado!");
      const passwordHash = await hash(data.password, 6);

      const user = await this.prisma.user.create({
        data: { ...data, status: 1, password: passwordHash }
      });

      return user;
    } catch (error) {
      if (error instanceof ConflictException) throw error;

      throw new InternalServerErrorException("Error interno no servidor!");
    }
  }
}