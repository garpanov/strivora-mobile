import { Injectable, NotFoundException, Inject, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { CreateExpenceDto, UpdateExpenceDto, ExpenseCategory } from "./expences.dto";


@Injectable()
export class ExpencesService {
    constructor(private prisma: PrismaService, @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

    async findOrThrow(id: number) {
        const expence = await this.prisma.expenseHistory.findUnique({ where: { id } });
        if (!expence) {
            throw new NotFoundException('Expense not found');
        }
        return expence;
    }

    async checkAuth(userId: number, jwtUserId: number) {
        if (userId !== jwtUserId) {
            throw new ForbiddenException('You are not allowed to access this expense');
        }
    }

    async getExpences(userId: number, jwtUserId: number) {
        await this.checkAuth(userId, jwtUserId);
        return this.prisma.expenseHistory.findMany({
            where: { userId },
        });
    }

    async createExpence(userId: number, data: CreateExpenceDto, jwtUserId: number) {
        await this.checkAuth(userId, jwtUserId);
        const expence = await this.prisma.expenseHistory.create({
            data: {
                userId,
                ...data,
            },
        });
        this.logger.info(`Expense created. ID: ${expence.id}, userID: ${userId}`);
        return expence;
    }

    async updateExpence(id: number, data: UpdateExpenceDto, jwtUserId: number) {
        const expence = await this.findOrThrow(id);
        await this.checkAuth(expence.userId, jwtUserId);
        const updatedExpence = await this.prisma.expenseHistory.update({
            where: { id },
            data: {
                ...data
            },
        });
        this.logger.info(`Expense updated. ID: ${updatedExpence.id}, userID: ${updatedExpence.userId}`);
        return updatedExpence;
    }

    async deleteExpence(id: number, jwtUserId: number) {
        const expence = await this.findOrThrow(id);
        await this.checkAuth(expence.userId, jwtUserId);
        const deletedExpence = await this.prisma.expenseHistory.delete({
            where: { id },
        });
        this.logger.info(`Expense deleted. ID: ${deletedExpence.id}, userID: ${deletedExpence.userId}`);
        return deletedExpence;
    }

}