import { IsNotEmpty, IsOptional, MinLength } from "class-validator"

export class CreateTerminalModelDto {
    @IsNotEmpty()
    @MinLength(5)
    name: string

    @IsOptional()
    description: string

    @IsNotEmpty()
    terminalVendor: string
}
