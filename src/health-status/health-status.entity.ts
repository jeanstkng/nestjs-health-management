import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { HealthStatusGender } from './health-status-gender.enum';
import { User } from '../auth/user.entity';

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

    @ManyToOne(type => User, user => user.healthStatus, { eager: false })
    user: User;

    @Column()
    userId: number;
}