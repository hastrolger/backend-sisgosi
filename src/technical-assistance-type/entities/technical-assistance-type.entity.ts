import { CommonEntityAttributes } from "src/bases/commonEntityAttributes";
import { Entity } from "typeorm";

@Entity()
export class TechnicalAssistanceType extends CommonEntityAttributes{
    constructor() {
        super()
    }
}
