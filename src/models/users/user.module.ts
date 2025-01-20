import { forwardRef, Module } from "@nestjs/common";
import * as S from "./services";
import * as C from "./controllers";
import * as M from "../"

@Module({
  imports: [
    forwardRef(() => M.AddressesModule)
  ],
  controllers: [
    C.CreateUserController,
    C.GetUserByIdController,
    C.GetUsersController,
    C.DeleteUserController,
    C.UpdateUserController,
  ],
  providers: [
    S.CreateUserService,
    S.EmailExistsService,
    S.GetUserByIdService,
    S.GetUsersService,
    S.DeleteUserService,
    S.UpdateUserService,
  ]
})
export class UserModule {}