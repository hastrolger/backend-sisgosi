import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    firstName: string

    @IsNotEmpty()
    lastName: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    @MinLength(8)
    password: string

    @IsNotEmpty()
    isActive: boolean

    @IsOptional()
    description: string

    @IsNotEmpty()
    rol: string
}
