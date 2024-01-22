import { CommonEntityAttributes } from "src/bases/commonEntityAttributes";
import { TerminalModel } from "src/terminal-model/entities/terminal-model.entity";
import { Entity, OneToMany } from "typeorm";

@Entity('terminal_vendors')
export class TerminalVendor extends CommonEntityAttributes{
    constructor(){
        super()
    }

    @OneToMany(()=> TerminalModel, (model) => model.terminalVendor)
    terminalModels: TerminalModel[];
}
