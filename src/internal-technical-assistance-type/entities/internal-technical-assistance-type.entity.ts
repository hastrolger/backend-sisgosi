import { CommonEntityAttributes } from "src/bases/commonEntityAttributes";
import { Entity } from "typeorm";

@Entity()
export class InternalTechnicalAssistanceType extends CommonEntityAttributes{
    constructor(){
        super()
    }
}
