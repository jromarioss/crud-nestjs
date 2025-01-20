import { forwardRef, Module } from '@nestjs/common';
import * as Modules from "./models";
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => Modules.UserModule),
    forwardRef(() => Modules.AddressesModule),
  ]
})
export class AppModule {}
