import { v4 as uuidv4 } from "uuid";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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

    @Column({name: 'created_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date

    @Column({name: 'updated_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date
}