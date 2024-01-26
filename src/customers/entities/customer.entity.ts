//import { Customer } from "src/customers/entities/customer.entity";
import { CommonEntityAttributes } from "src/bases/commonEntityAttributes";
import { TerminalPurchaseOrder } from "src/terminal-purchase-order/entities/terminal-purchase-order.entity";
import { Terminal } from "src/terminal/entities/terminal.entity";
import { Entity, OneToMany } from "typeorm";


@Entity('customers')
export class Customer extends CommonEntityAttributes {
    constructor() {
        super()
    }

    @OneToMany(() => Terminal, (terminal)=>terminal.customer)
    terminals: Terminal[]

    @OneToMany(() => TerminalPurchaseOrder, (order)=>order.customer)
    terminalPurchaseOrders: TerminalPurchaseOrder[]

}
