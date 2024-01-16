import { v4 as uuidv4 } from "uuid";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn } from "typeorm";

@Entity()
export class Rols {
    constructor() {
        this.id = uuidv4() 
    }

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({unique: true, length: 50})
    name: string

    @Column({type: 'text', nullable: true})
    description: string

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date

    @CreateDateColumn({name: 'updated_at'})
    updatedAt: Date

    @DeleteDateColumn({name: 'is_deleted'})
    isDeleted: Date
}