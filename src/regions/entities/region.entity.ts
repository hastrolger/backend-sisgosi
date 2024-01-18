import { State } from "src/states/entities/state.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuidv4} from 'uuid'

@Entity({name: 'regions'})
export class Region {

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

    @OneToMany(() => State, (state) => state.region)
    state: State[]
}
