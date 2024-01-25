import { CommonEntityAttributes } from "src/bases/commonEntityAttributes";
import { Terminal } from "src/terminal/entities/terminal.entity";
import { Entity, OneToMany } from "typeorm";

@Entity({name: 'terminal_types'})
export class TerminalType extends CommonEntityAttributes{
    constructor() {
        super()
    }

    @OneToMany(() => Terminal, (terminal) => terminal.terminalType)
    terminals: Terminal[]
}
