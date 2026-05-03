import { Controller, Get, Post, Patch, Param, Body, Query, UseGuards, Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { SettingsService } from "./settings.service";
import { UpdateSettingsDto } from "./settings.dto";

@UseGuards(AuthGuard("jwt"))
@Controller("settings")
export class SettingsController {
    constructor(private settingsService: SettingsService) {}
    
    @Get("/user/:userId")
    async getSettings(@Param("userId") userId: number, @Request() req) {
        return this.settingsService.getUserSettings(userId, req.user.userId);
    }

    @Patch("/update/user/:userId")
    async updateSettings(@Param("userId") userId: number, @Body() data: UpdateSettingsDto, @Request() req) {
        return this.settingsService.updateUserSettings(userId, data, req.user.userId);
    }
}