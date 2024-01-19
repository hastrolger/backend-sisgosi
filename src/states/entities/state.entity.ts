import { CommonEntityAttributes } from "src/bases/commonEntityAttributes";
import { City } from "src/cities/entities/city.entity";
import { Region } from "src/regions/entities/region.entity";
import {DeepPartial, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";


@Entity('states')
export class State extends CommonEntityAttributes {
    constructor() {
        super()
    }

    @ManyToOne(() => Region, (region) => region.states, {nullable: false, eager: true, cascade: false})
    @JoinColumn({name: 'region_id'})
    region: DeepPartial<Region>

    @OneToMany(() => City, (city) => city.state)
    city: City[]
}
