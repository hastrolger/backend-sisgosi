import { IsNotEmpty, IsOptional, MinLength } from "class-validator"

export class CreateTerminalVendorDto {
    @IsNotEmpty()
    @MinLength(5)
    name: string

    @IsOptional()
    description: string
}

