import { IsString, IsEnum, IsOptional, IsDate, IsNumber } from "class-validator"
import { Transform } from "class-transformer"
import {TaskPriority, TaskStatus} from "../../../shared/types/task.dto"

export class CreateTaskDto {
    @IsString()
    name: string;

    @IsString()
    description?: string;

    @IsEnum(TaskPriority)
    priority: TaskPriority;

    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus;

    @IsDate()
    @Transform(({ value }) => new Date(value))
    dateEnd: Date;
}

export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()   
    description?: string;

    @IsEnum(TaskPriority)
    @IsOptional()
    priority?: TaskPriority;

    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus;

    @IsDate()
    @IsOptional()
    @Transform(({ value }) => new Date(value))
    dateEnd?: Date;
}
