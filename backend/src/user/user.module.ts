import { Module } from "@nestjs/common";
import { UserController } from "./user.controler";
import { UserService } from "./user.service";
import { SettingsService } from "src/settings/settings.service";


@Module({
    controllers: [UserController],
    providers: [UserService, SettingsService],
})
export class UserModule {}