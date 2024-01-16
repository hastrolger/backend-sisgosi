import { IsNotEmpty, IsOptional, MinLength } from "class-validator"

export class CreateRolDto {
    @IsNotEmpty()
    @MinLength(5)
    name: string

    @IsOptional()
    description: string
}