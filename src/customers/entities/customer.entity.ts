//import { Customer } from "src/customers/entities/customer.entity";
import { CommonEntityAttributes } from "src/bases/commonEntityAttributes";
import { Terminal } from "src/terminal/entities/terminal.entity";
import { Entity, OneToMany } from "typeorm";


@Entity('customers')
export class Customer extends CommonEntityAttributes {
    constructor() {
        super()
    }

    @OneToMany(() => Terminal, (terminal)=>terminal.customer)
    terminals: Terminal[]

}
