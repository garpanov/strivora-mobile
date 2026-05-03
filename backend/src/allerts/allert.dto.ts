import { IsString, IsEnum, IsOptional, IsBoolean } from "class-validator";

export enum AlertType {
  Tips = "Tips",
  Progress = "Progress",
  Update = "Update"
}

export class CreateAlertDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(AlertType)
  type: AlertType;
}

export class UpdateAlertDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(AlertType)
  @IsOptional()
  type?: AlertType;

  @IsBoolean()
  @IsOptional()
  processed?: boolean;
}
