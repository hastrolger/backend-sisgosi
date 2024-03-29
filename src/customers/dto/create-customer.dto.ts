import { IsNotEmpty, IsOptional, MinLength } from "class-validator"

export class CreateCustomerDto {
    @IsNotEmpty()
    @MinLength(5)
    name: string

    @IsOptional()
    description: string
}
