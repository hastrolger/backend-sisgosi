import { CommonEntityAttributes } from "src/bases/commonEntityAttributes";
import { InternalTechnicalAssistanceType } from "src/internal-technical-assistance-type/entities/internal-technical-assistance-type.entity";
import { Entity, OneToMany } from "typeorm";

@Entity()
export class TechnicalAssistanceType extends CommonEntityAttributes{
    constructor() {
        super()
    }

    @OneToMany(()=>InternalTechnicalAssistanceType,(internalTechnicalAssistanceType) => internalTechnicalAssistanceType.technicalAssistanceType)
    internalTechnicalAssistanceTypes: InternalTechnicalAssistanceType[]
}
