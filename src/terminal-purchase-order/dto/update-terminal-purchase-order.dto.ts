import { PartialType } from '@nestjs/mapped-types';
import { CreateTerminalPurchaseOrderDto } from './create-terminal-purchase-order.dto';

export class UpdateTerminalPurchaseOrderDto extends PartialType(CreateTerminalPurchaseOrderDto) {}
