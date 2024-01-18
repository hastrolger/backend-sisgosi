import { IsNotEmpty, IsOptional, MinLength } from "class-validator"

export class CreateStateDto {
    @IsNotEmpty()
    @MinLength(5)
    name: string

    @IsOptional()
    description: string

    @IsNotEmpty()
    region: string
}
