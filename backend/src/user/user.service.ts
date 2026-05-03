import { Injectable, Inject, NotFoundException, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDto } from "./user.dto";
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { SettingsService } from "src/settings/settings.service";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService, @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger, private settingsService: SettingsService) {}

    async findOrThrow(id: number) {
        const user = await this.prisma.user.findUnique({ where: { id } })
        if (!user) {
            throw new NotFoundException('User not found')
        }
        return user
    }

    async checkAuth(id: number, jwtUserId: number) {
        if (id !== jwtUserId) {
            throw new ForbiddenException('You are not allowed to access this user');
        }
    }

    async getUserInfo(id: number, jwtUserId: number) {
        const user = await this.findOrThrow(id);
        await this.checkAuth(id, jwtUserId);

        const { password, email, dateCreated, ...rest } = user;
        const settings = await this.settingsService.getUserSettings(id, jwtUserId);
        return { ...rest, settings };
    }

    async updateUser(id: number, dto: UpdateUserDto, userId: number) {
        await this.findOrThrow(id);
        await this.checkAuth(id, userId);
        
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: dto,
        });
        this.logger.info(`User updated. ID: ${updatedUser.id}`);
        return updatedUser;
    }
}