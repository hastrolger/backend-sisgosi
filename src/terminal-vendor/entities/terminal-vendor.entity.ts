import { CommonEntityAttributes } from "src/bases/commonEntityAttributes";
import { Entity } from "typeorm";

@Entity('terminal_vendors')
export class TerminalVendor extends CommonEntityAttributes{
    constructor(){
        super()
    }
}
