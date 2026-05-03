import { IsString, IsEnum, IsOptional, IsDate, IsNumber } from "class-validator"
import { Transform } from "class-transformer"

enum LifeStatus {
  Family = 'Family',
  Job = 'Job',
  Study = 'Study',
}

export class CreateUserDto {
    @IsString()
    name: string

    @IsEnum(LifeStatus)
    @IsOptional()
    lifeStatus?: LifeStatus

    @IsNumber()
    @IsOptional()
    salary?: number

    @Transform(({ value }) => new Date(value))
    @IsDate()
    birthdate: Date
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsEnum(LifeStatus)
  @IsOptional()
  lifeStatus?: LifeStatus

  @IsNumber()
  @IsOptional()
  salary?: number

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsOptional()
  birthdate?: Date
}