import { Injectable, Inject, NotFoundException, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTipDto, UpdateTipDto, AISection } from "./tips.dto";
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class TipsService {
    constructor(private prisma: PrismaService, @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

    async findOrThrow(id: number) {
        const tip = await this.prisma.tipsAI.findUnique({ where: { id } })
        if (!tip) {
            throw new NotFoundException('Tip not found')
        }
        return tip
    }

    async checkAuth(userId: number, jwtUserId: number) {
        if (userId !== jwtUserId) {
            throw new ForbiddenException('You are not allowed to access this tip');
        }
    }

    async getTips(userId: number, jwtUserId: number) {
        await this.checkAuth(userId, jwtUserId);
        return this.prisma.tipsAI.findMany({
            where: { userId },
        });
    }

    async createTip(userId: number, data: CreateTipDto) {
        return this.prisma.tipsAI.create({
            data: {
                userId,
                ...data,
            },
        });
    }

    async updateTip(id: number, data: UpdateTipDto) {
        await this.findOrThrow(id);
        const updatedTip = await this.prisma.tipsAI.update({
            where: { id },
            data,
        });
        this.logger.info(`Tip updated. ID: ${updatedTip.id}, userID: ${updatedTip.userId}`);
        return updatedTip;
    }

    async deleteTip(id: number) {
        await this.findOrThrow(id);
        const deletedTip = await this.prisma.tipsAI.delete({ where: { id } });
        this.logger.info(`Tip deleted. ID: ${deletedTip.id}, userID: ${deletedTip.userId}`);
        return deletedTip;
    }

}