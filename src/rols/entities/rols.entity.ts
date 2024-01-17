import { v4 as uuidv4 } from "uuid";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, OneToMany } from "typeorm";
import { User } from "src/users/entities/user.entity";

@Entity({name: 'rols'})
export class Rol {
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

    @OneToMany(() => User, (user) => user.rol, {cascade: false})
    user: User[]
}