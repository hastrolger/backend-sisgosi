import { IsNotEmpty, IsOptional } from "class-validator"

export class CreateTerminalLocationDto {
    @IsNotEmpty()
    name: string

    @IsOptional()
    description: string

}
