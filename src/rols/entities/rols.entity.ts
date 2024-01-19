import { v4 as uuidv4 } from "uuid";
import { Entity, OneToMany } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { CommonEntityAttributes } from "src/bases/commonEntityAttributes";

@Entity({name: 'rols'})
export class Rol extends CommonEntityAttributes{
    constructor() {
        super()
    }

    @OneToMany(() => User, (user) => user.rol, {cascade: false})
    user: User[]
}