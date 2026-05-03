import { IsString, IsOptional, IsBoolean, IsEnum } from "class-validator";

export enum LanguageSettings {
  English = "English",
  Ukrainian = "Ukrainian",
  Russian = "Russian"
}

export class UpdateSettingsDto {
    @IsEnum(LanguageSettings)
    @IsOptional()
    language?: LanguageSettings;

    @IsString()
    @IsOptional()
    country?: string;

    @IsBoolean()
    @IsOptional()
    alertPhone?: boolean;
}