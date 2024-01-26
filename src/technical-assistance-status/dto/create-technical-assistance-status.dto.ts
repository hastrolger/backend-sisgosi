import { IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class CreateTechnicalAssistanceStatusDto {
    @IsNotEmpty()
    @MinLength(5)
    name: string;

    @IsOptional()
    description: string
}
