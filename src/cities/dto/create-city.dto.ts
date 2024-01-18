import { IsNotEmpty, IsOptional, MinLength } from "class-validator"

export class CreateCityDto {
    @IsNotEmpty()
    @MinLength(5)
    name: string

    @IsOptional()
    description: string

    @IsNotEmpty()
    state: string
}


