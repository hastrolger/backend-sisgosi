import { IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class CreateTerminalPurchaseOrderDto {
    @IsNotEmpty()
    @MinLength(4)
    code: string

    @IsNotEmpty()
    customer: string

    @IsNotEmpty()
    startWarrantyDate: Date

    @IsNotEmpty()
    endWarrantyDate: Date

    @IsOptional()
    description: string

}
