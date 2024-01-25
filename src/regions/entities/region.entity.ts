import { CommonEntityAttributes } from "src/bases/commonEntityAttributes";
import { State } from "src/states/entities/state.entity";
import { Terminal } from "src/terminal/entities/terminal.entity";
import { Entity, OneToMany} from "typeorm";

@Entity({name: 'regions'})
export class Region extends CommonEntityAttributes{

    constructor() {
        super()
    }

    @OneToMany(() => State, (state) => state.region)
    states: State[]

    @OneToMany(()=> Terminal, (terminal) => terminal.region)
    terminals: Terminal[]
}
