import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { HealthStatusGender } from './health-status-gender.enum';

@Entity()
export class HealthStatus extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cough: boolean;

    @Column()
    fever: boolean;

    @Column()
    shortnessOfBreath: boolean;

    @Column()
    gender: HealthStatusGender;
}