import { IsNotEmpty, IsOptional } from "class-validator"

export class CreateTerminalDto {
    @IsNotEmpty()
    name: string

    @IsOptional()
    code: string

    @IsNotEmpty()
    serial: string

    @IsNotEmpty()
    terminalVendor: string

    @IsNotEmpty()
    terminalModel: string

    @IsNotEmpty()
    terminalType: string

    @IsNotEmpty()
    region: string

    @IsNotEmpty()
    state: string

    @IsNotEmpty()
    city: string

    @IsNotEmpty()
    direction: string

    @IsNotEmpty()
    terminalLocation: string

    @IsNotEmpty()
    customer: string

    @IsNotEmpty()
    terminalStatus: string

    @IsNotEmpty()
    os: string

    @IsNotEmpty()
    software: string

    @IsNotEmpty()
    ip: string

    @IsNotEmpty()
    netmask: string

    @IsNotEmpty()
    gateway: string

    @IsOptional()
    purchaseOrder: string
}
