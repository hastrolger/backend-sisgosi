import { CommonEntityAttributes } from "src/bases/commonEntityAttributes";
import { TechnicalAssistanceType } from "src/technical-assistance-type/entities/technical-assistance-type.entity";
import { DeepPartial, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class InternalTechnicalAssistanceType extends CommonEntityAttributes{
    constructor(){
        super()
    }

    @ManyToOne(() => TechnicalAssistanceType, (techincalAssistance) => techincalAssistance.internalTechnicalAssistanceTypes)
    @JoinColumn({ name: "technical_assistance_type_id"})
    technicalAssistanceType: DeepPartial<TechnicalAssistanceType>
}
