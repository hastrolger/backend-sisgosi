import { CommonEntityAttributes } from "src/bases/commonEntityAttributes";
import { TerminalVendor } from "src/terminal-vendor/entities/terminal-vendor.entity";
import { Terminal } from "src/terminal/entities/terminal.entity";
import { DeepPartial, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity('terminal_models')
export class TerminalModel extends CommonEntityAttributes{
    constructor() {
        super()
    }

    @ManyToOne(() => TerminalVendor, (vendor) => vendor.terminalModels)
    @JoinColumn({name: 'terminal_vendor_id'})
    terminalVendor: DeepPartial<TerminalVendor>

    @OneToMany(() => Terminal, (terminal) => terminal.terminalModel)
    terminals: Terminal[]
}
