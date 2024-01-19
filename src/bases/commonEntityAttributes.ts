import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuidv4} from 'uuid'

export class CommonEntityAttributes {
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
}