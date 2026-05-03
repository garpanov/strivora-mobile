import { IsString, IsOptional, IsDecimal, IsEnum, IsDate } from "class-validator";
import { Type } from "class-transformer";

export enum ExpenseCategory {
  Food = "Food",
  Entertainment = "Entertainment",
  Development = "Development"
}

export class CreateExpenceDto {
    @IsString()
    name: string;

    @IsDecimal()
    amount: string;

    @IsEnum(ExpenseCategory)
    category: ExpenseCategory;

    @Type(() => Date)
    @IsDate()
    @IsOptional()
    date?: Date;
}

export class UpdateExpenceDto {
    @IsString()
    name?: string;

    @IsDecimal()
    @IsOptional()
    amount?: string;

    @IsEnum(ExpenseCategory)
    @IsOptional()
    category?: ExpenseCategory;

    @Type(() => Date)
    @IsDate()
    @IsOptional()
    date?: Date;
}