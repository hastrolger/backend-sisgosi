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
import { Column, CreateDateColumn, DeepPartial, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TerminalPurchaseOrder } from 'src/terminal-purchase-order/entities/terminal-purchase-order.entity';

@Entity({name: 'terminals'})
export class Terminal {

    constructor() {
        this.id = uuidv4()
    }

    @PrimaryGeneratedColumn('uuid')
    id: string  
    
    @Column({unique: true, nullable: true})
    code: string

    @Column({unique: true, length: 25})
    name: string

    @Column({unique: true})
    serial: string    

    @Column()
    direction: string

    @Column({name:'operative_system'})
    os: string

    @Column()
    software: string

    @Column({name:'ip_direction'})
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

    @ManyToOne(() => Customer, (customer) => customer.terminals,{nullable: false})
    @JoinColumn({name:'customer_id'})
    customer: DeepPartial<Customer>

    @ManyToOne(()=>TerminalPurchaseOrder, (order)=>order.terminals)
    @JoinColumn({name:'purchase_order_id'})
    purchaseOrder: DeepPartial<TerminalPurchaseOrder> 

    @ManyToOne(() => TerminalVendor, (vendor) => vendor.terminals,{nullable: false})
    @JoinColumn({name: 'terminal_vendor_id'})
    terminalVendor: DeepPartial<TerminalVendor>

    @ManyToOne(() => TerminalModel, (model) => model.terminals,{nullable: false})
    @JoinColumn({name: 'terminal_model_id'})
    terminalModel: DeepPartial<TerminalModel>

    @ManyToOne(() => TerminalType,(type) => type.terminals,{nullable: false})
    @JoinColumn({name: 'terminal_type_id'})
    terminalType: DeepPartial<TerminalType>

    @ManyToOne(() => TerminalStatus, (status) => status.terminals,{nullable: false})
    @JoinColumn({name: 'terminal_status_id'})
    terminalStatus: DeepPartial<TerminalStatus>

    @ManyToOne(() => TerminalLocation, (terminalLocation) => terminalLocation.terminals,{nullable: false})
    @JoinColumn({name:'terminal_location_id'})
    terminalLocation: DeepPartial<TerminalLocation>

    @ManyToOne(() => Region, (region) => region.terminals,{nullable: false})
    @JoinColumn({name:'region_id'})
    region: DeepPartial<Region>

    @ManyToOne(() => State, (state) => state.terminals,{nullable: false})
    @JoinColumn({name:'state_id'})
    state: DeepPartial<State>

    @ManyToOne(() => City, (city) => city.terminals,{nullable: false})
    @JoinColumn({name:'city_id'})
    city: DeepPartial<City>
    
}
