import { Module } from "@nestjs/common";
import * as S from "./services";
import * as C from "./controllers";

@Module({
  imports: [],
  controllers: [
    C.CreateAddressController,
  ],
  providers: [
    S.CreateAddressService,
    S.DeleteAddressService,
  ],
  exports: [
    S.DeleteAddressService
  ]
})
export class AddressesModule {}