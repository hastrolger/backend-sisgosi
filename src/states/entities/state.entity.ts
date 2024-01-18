import { City } from "src/cities/entities/city.entity";
import { Region } from "src/regions/entities/region.entity";
import { Column, CreateDateColumn,DeepPartial, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuidv4} from 'uuid'

@Entity('states')
export class State {
    constructor() {
        this.id = uuidv4()
    }

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({unique: true, length: 25})
    name: string

    @Column({type: 'text', nullable: true})
    description: string

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date

    @DeleteDateColumn({name: 'deleted_at'})
    deletedAt: Date

    @ManyToOne(() => Region, (region) => region.state)
    @JoinColumn({name: 'region_id'})
    region: DeepPartial<Region>

    @OneToMany(() => City, (city) => city.state)
    city: City[]
}
