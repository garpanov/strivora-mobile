import { Controller, Get, Post, Param, Body, Delete, Patch, ParseEnumPipe, UseGuards, Request, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { TaskService } from "./task.service";
import { TaskStatus } from "../../../shared/types/task.dto";
import { CreateTaskDto, UpdateTaskDto } from "./task.dto";

@UseGuards(AuthGuard("jwt"))
@Controller("tasks")
export class TaskController {
    constructor (private taskService: TaskService) {}

    @Get("/user/:userId/all")
    async getAllTasks(@Request() req, @Param("userId") userId: number) {
        return this.taskService.getAllTasks(userId, req.user.userId);
    }

    @Get("/user/:userId/status/:status")
    async getStatusTasks(@Request() req, @Param("userId") userId: number, @Param("status", new ParseEnumPipe(TaskStatus)) status: TaskStatus) {
        return this.taskService.getStatusTasks(userId, status, req.user.userId);
    }

    @Post("/user/:userId/new_task")
    async createTask(@Request() req, @Param("userId") userId: number, @Body() data: CreateTaskDto) {
        return this.taskService.createTask(userId, data, req.user.userId);
    }

    @Patch("/user/:userId/task/:taskId")
    async updateTask(@Request() req, @Param("taskId") taskId: number, @Param("userId") userId: number, @Body() data: UpdateTaskDto) {
        return this.taskService.updateTask(taskId, userId, data, req.user.userId);
    }

    @Delete("/user/:userId/task/:taskId")
    async deleteTask(@Request() req, @Param("taskId") taskId: number, @Param("userId") userId: number) {
        return this.taskService.deleteTask(taskId, userId, req.user.userId);
    }

}