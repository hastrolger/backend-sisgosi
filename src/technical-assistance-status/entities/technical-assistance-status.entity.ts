import { CommonEntityAttributes } from "src/bases/commonEntityAttributes";
import { Entity } from "typeorm";

@Entity()
export class TechnicalAssistanceStatus extends CommonEntityAttributes{
    constructor() {
        super()
    }
}
