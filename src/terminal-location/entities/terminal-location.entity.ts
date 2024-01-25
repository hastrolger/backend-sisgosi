import { CommonEntityAttributes } from "src/bases/commonEntityAttributes";
import { Terminal } from "src/terminal/entities/terminal.entity";
import { Entity, OneToMany } from "typeorm";

@Entity()
export class TerminalLocation extends CommonEntityAttributes{
    constructor() {
        super()
    }

    @OneToMany(() => Terminal, (terminal) => terminal.terminalLocation)
    terminals: Terminal[]
}
