import { BaseEntity } from "typeorm";
import { HealthStatusGender } from './health-status-gender.enum';
import { User } from '../auth/user.entity';
export declare class HealthStatus extends BaseEntity {
    id: number;
    cough: boolean;
    fever: boolean;
    shortnessOfBreath: boolean;
    gender: HealthStatusGender;
    user: User;
    userId: number;
}
