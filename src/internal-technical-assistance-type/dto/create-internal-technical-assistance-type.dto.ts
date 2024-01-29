import { IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class CreateInternalTechnicalAssistanceTypeDto {
    @IsNotEmpty()
    technicalAssistanceType: string

    @IsNotEmpty()
    @MinLength(5)
    name: string;

    @IsOptional()
    description: string

}

