//import { Customer } from "src/customers/entities/customer.entity";
import { CommonEntityAttributes } from "src/bases/commonEntityAttributes";
import { Entity } from "typeorm";


@Entity('customers')
export class Customer extends CommonEntityAttributes {
    constructor() {
        super()
    }

}
