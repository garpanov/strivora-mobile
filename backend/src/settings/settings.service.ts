import { Injectable, Inject, NotFoundException, ConflictException, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { UpdateSettingsDto } from "./settings.dto";

@Injectable()
export class SettingsService {
    constructor(private prisma: PrismaService, @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

    async findOrThrow(userId: number) {
        const settings = await this.prisma.settings.findUnique({ where: { userId } });
        if (!settings) {
            throw new NotFoundException('Settings not found');
        }
        return settings;
    }

    async notFoundOrThrowUser(userId: number) {
        const settings = await this.prisma.settings.findUnique({ where: { userId } });
        if (settings) {
            throw new ConflictException('Settings already exist');
        }
        return settings;
    }

    async checkAuth(userId: number, jwtIdUser: number) {
        if (userId !== jwtIdUser) {
            throw new ForbiddenException('You are not allowed to access these settings');
        }
    }

    async createUserSettings(userId: number) {
        await this.notFoundOrThrowUser(userId);

        const settings = await this.prisma.settings.create({
            data: { userId },
        });

        this.logger.info(`Settings created. userID: ${userId}`);
        return settings;
    }

    async getUserSettings(userId: number, jwtIdUser: number) {
        await this.findOrThrow(userId);
        await this.checkAuth(userId, jwtIdUser);
        return this.prisma.settings.findUnique({ where: { userId } });
    }

    async updateUserSettings(userId: number, data: UpdateSettingsDto, jwtIdUser: number) {
        await this.findOrThrow(userId);
        await this.checkAuth(userId, jwtIdUser);
        const updatedSettings = await this.prisma.settings.update({ where: { userId: userId }, data });
        this.logger.info('Settings updated. userID: ' + updatedSettings.userId);
        return updatedSettings;
    }
}