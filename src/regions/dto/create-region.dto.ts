import { IsNotEmpty, IsOptional, MinLength } from "class-validator"


export class CreateRegionDto {
    @IsNotEmpty()
    @MinLength(5)
    name: string

    @IsOptional()
    description: string
}
