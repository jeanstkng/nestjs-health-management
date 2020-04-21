import { BaseEntity } from 'typeorm';
import { HealthStatus } from '../health-status/health-status.entity';
export declare class User extends BaseEntity {
    id: number;
    username: string;
    password: string;
    salt: string;
    healthStatus: HealthStatus[];
    validatePassword(password: string): Promise<boolean>;
}
