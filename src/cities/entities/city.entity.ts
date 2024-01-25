import { CommonEntityAttributes } from "src/bases/commonEntityAttributes";
import { State } from "src/states/entities/state.entity";
import { Terminal } from "src/terminal/entities/terminal.entity";
import {  DeepPartial, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";


@Entity('cities')
export class City extends CommonEntityAttributes{
    constructor() {
       super()
    }

    @ManyToOne(() => State, (state) => state.city, {eager: true, cascade: true})
    @JoinColumn({name: 'state_id'})
    state: DeepPartial<State>

    @OneToMany(() => Terminal, (terminal)=>terminal.state)
    terminals: Terminal[]
}
