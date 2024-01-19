import { CommonEntityAttributes } from "src/bases/commonEntityAttributes";
import { State } from "src/states/entities/state.entity";
import {  DeepPartial, Entity, JoinColumn, ManyToOne } from "typeorm";


@Entity('cities')
export class City extends CommonEntityAttributes{
    constructor() {
       super()
    }

    @ManyToOne(() => State, (state) => state.city, {eager: true, cascade: true})
    @JoinColumn({name: 'state_id'})
    state: DeepPartial<State>
}
