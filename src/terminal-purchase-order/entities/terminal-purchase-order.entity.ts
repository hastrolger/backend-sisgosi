import { Terminal } from "src/terminal/entities/terminal.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import {v4 as uuidv4} from 'uuid'

@Entity({name: 'terminal_purchase_orders'})
export class TerminalPurchaseOrder {
    constructor() {
        this.id = uuidv4()
    }

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({name: 'order_code', length: 10})
    orderCode: string

    @Column({type: 'text', nullable: true})
    description: string

    @Column({type: Date, name: 'start_warranty_date'})
    startWarrantyDate: Date

    @Column({type: Date, name: 'end_warranty_date'})
    endWarrantyDate: Date

    @Column({default: 'Vigente'})
    status: string 

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date

    @DeleteDateColumn({name: 'deleted_at'})
    deletedAt: Date

    @OneToMany(()=>Terminal, (terminal)=>terminal.purcahseOrder)
    terminals: Terminal[]
}
