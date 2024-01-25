import { CommonEntityAttributes } from "src/bases/commonEntityAttributes";
import { Terminal } from "src/terminal/entities/terminal.entity";
import { Entity, OneToMany } from "typeorm";

@Entity({name: 'terminal_statuses'})
export class TerminalStatus extends CommonEntityAttributes {
    constructor() {
        super()
    }

    @OneToMany(() => Terminal, (terminal) => terminal.terminalStatus)
    terminals: Terminal[]
}
