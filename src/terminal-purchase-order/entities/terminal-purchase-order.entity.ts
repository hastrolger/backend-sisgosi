import { Customer } from "src/customers/entities/customer.entity";
import { Terminal } from "src/terminal/entities/terminal.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import {v4 as uuidv4} from 'uuid'

@Entity({name: 'terminal_purchase_orders'})
export class TerminalPurchaseOrder {
    constructor() {
        this.id = uuidv4()
    }

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({name: 'code', length: 10})
    code: string

    @Column({type: Date, name: 'start_warranty_date'})
    startWarrantyDate: Date

    @Column({type: Date, name: 'end_warranty_date'})
    endWarrantyDate: Date

    @Column({default: 'Vigente'})
    status: string 

    @Column({type: 'text', nullable: true})
    description: string

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date

    @DeleteDateColumn({name: 'deleted_at'})
    deletedAt: Date

    @ManyToOne(() => Customer, (customer) => customer.terminalPurchaseOrders)
    @JoinColumn({name: 'costumer_id'})
    customer: Customer

    @OneToMany(()=>Terminal, (terminal)=>terminal.purchaseOrder)
    terminals: Terminal[]
}
