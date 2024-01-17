import { IsNotEmpty, MinLength, IsOptional } from "class-validator"

export class UpdateRolDto {
    @IsNotEmpty()
    @MinLength(5)
    name: string

    @IsOptional()
    description: string
}