import { IsString, IsEnum, IsOptional } from "class-validator";

export enum AISection {
  YesterdayTasks = "YesterdayTasks",
  MonthFinances = "MonthFinances",
  YesterdayAnalise = "YesterdayAnalise"
}

export class CreateTipDto {
    @IsString()
    description: string;

    @IsEnum(AISection)
    section: AISection;
}

export class UpdateTipDto {
    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(AISection)
    @IsOptional()
    section?: AISection;
}
