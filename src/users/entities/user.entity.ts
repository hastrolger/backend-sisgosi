import { Rol } from "src/rols/entities/rols.entity"
import { Column, CreateDateColumn, DeepPartial, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { v4 as uuidv4} from 'uuid'

@Entity({name: 'users'})
export class User {
    constructor() {
        this.id = uuidv4() 
    }

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({name: 'first_name', length: 50})
    firstName: string

    @Column({name: 'last_name', length: 50})
    lastName: string

    @Column({unique: true, name: 'email'})
    email: string

    @Column({unique: true})
    username: string

    @Column({name: 'password'})
    password: string

    @Column({name: 'is_active', default: true})
    isActive: boolean

    @Column({type: 'text', nullable: true})
    description: string

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date

    @DeleteDateColumn({name: 'is_deleted'})
    isDeleted: Date

    @ManyToOne(() => Rol, (rol) => rol.user, {eager: true, cascade: false})
    @JoinColumn({name: 'rol_id'})
    rol: DeepPartial<Rol>
}
