import {v4 as uuidv4} from 'uuid'
import { City } from "src/cities/entities/city.entity";
import { Customer } from "src/customers/entities/customer.entity";
import { Region } from "src/regions/entities/region.entity";
import { State } from "src/states/entities/state.entity";
import { TerminalLocation } from "src/terminal-location/entities/terminal-location.entity";
import { TerminalModel } from "src/terminal-model/entities/terminal-model.entity";
import { TerminalStatus } from "src/terminal-status/entities/terminal-status.entity";
import { TerminalType } from "src/terminal-type/entities/terminal-type.entity";
import { TerminalVendor } from "src/terminal-vendor/entities/terminal-vendor.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TerminalPurchaseOrder } from 'src/terminal-purchase-order/entities/terminal-purchase-order.entity';

@Entity({name: 'terminals'})
export class Terminal {

    constructor() {
        this.id = uuidv4()
    }

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({unique: true, length: 25})
    name: string
    
    @Column({unique: true, nullable: true})
    code: string

    @Column({unique: true})
    serial: string

    @ManyToOne(() => TerminalVendor, (vendor) => vendor.terminals)
    @JoinColumn({name: 'terminal_vendor_id'})
    terminalVendor: TerminalVendor

    @ManyToOne(() => TerminalModel, (model) => model.terminals)
    @JoinColumn({name: 'terminal_model_id'})
    terminalModel: TerminalModel 

    @ManyToOne(() => TerminalType,(type) => type.terminals)
    @JoinColumn({name: 'terminal_type_id'})
    terminalType: TerminalType

    @ManyToOne(() => Region, (region) => region.terminals)
    @JoinColumn({name:'region_id'})
    region: Region

    @ManyToOne(() => State, (state) => state.terminals)
    @JoinColumn({name:'state_id'})
    state: State

    @ManyToOne(() => City, (city) => city.terminals)
    @JoinColumn({name:'city_id'})
    city: City

    @Column()
    direction: string

    @ManyToOne(() => TerminalLocation, (terminalLocation) => terminalLocation.terminals)
    @JoinColumn({name:'terminal_location_id'})
    terminalLocation: TerminalLocation

    @ManyToOne(() => Customer, (customer) => customer.terminals)
    @JoinColumn({name:'customer_id'})
    customer: Customer


    @ManyToOne(() => TerminalStatus, (status) => status.terminals)
    @JoinColumn({name: 'terminal_status_id'})
    terminalStatus: TerminalStatus

    @Column()
    os: string

    @Column()
    software: string

    @Column()
    ip: string

    @Column()
    netmask: string

    @Column()
    gateway: string

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date

    @DeleteDateColumn({name: 'deleted_at'})
    deletedAt: Date 
    
    @ManyToOne(()=>TerminalPurchaseOrder, (order)=>order.terminals)
    @JoinColumn({name:'purchase_order_id'})
    purchaseOrder: TerminalPurchaseOrder
}
