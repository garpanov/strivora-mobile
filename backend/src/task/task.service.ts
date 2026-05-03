import { Injectable, Inject, NotFoundException, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { TaskStatus } from "../../../shared/types/task.dto";
import { CreateTaskDto, UpdateTaskDto } from "./task.dto";

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService, @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {
        this.prisma = prisma;
    }

    async findOrThrow(id: number) {
        const task = await this.prisma.task.findUnique({ where: { id } });
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        return task;
    }

    async checkAuth(userId: number, jwtIdUser: number) {
        if (userId !== jwtIdUser) {
            throw new ForbiddenException('You are not allowed to access this task');
        }
    }

    async getAllTasks(userId: number, jwtIdUser: number) {
        await this.checkAuth(userId, jwtIdUser);
        return this.prisma.task.findMany({
            where: {
                userId: userId,
            },
        });
    }

    async getStatusTasks(userId: number, status: TaskStatus, jwtIdUser: number) {
        await this.checkAuth(userId, jwtIdUser);
        return this.prisma.task.findMany({
            where: {
                userId: userId,
                status: status,
            },
        });
    }

    async createTask(userId: number, data: CreateTaskDto, jwtIdUser: number) {
        await this.checkAuth(userId, jwtIdUser);
        const task = await this.prisma.task.create({
            data: {
                ...data,
                userId: userId,
            },
        });
        this.logger.info(`Task created. ID: ${task.id}, userID: ${userId}`);
        return task;
    }

    async updateTask(taskId: number, userId: number, data: UpdateTaskDto, jwtIdUser: number) {
        await this.findOrThrow(taskId);
        await this.checkAuth(userId, jwtIdUser);
        const updatedTask = await this.prisma.task.update({
            where: { id: taskId, userId: userId },
            data,
        });
        this.logger.info(`Task updated. ID: ${updatedTask.id}, userID: ${updatedTask.userId}`);
        return updatedTask;
    }


    async deleteTask(taskId: number, userId: number, jwtIdUser: number) {
        await this.findOrThrow(taskId);
        await this.checkAuth(userId, jwtIdUser);
        const deletedTask = await this.prisma.task.delete({ where: { id: taskId, userId: userId } });
        this.logger.info(`Task deleted. ID: ${deletedTask.id}, userID: ${deletedTask.userId}`);
        return deletedTask;
    }

}