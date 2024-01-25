import { IsNotEmpty, IsOptional } from "class-validator"

export class CreateTerminalTypeDto {
    @IsNotEmpty()
    name: string

    @IsOptional()
    description: string
}
