import { Repository } from "typeorm";
import { HealthStatus } from './health-status.entity';
import { CreateHealthStatusDto } from './dto/create-health-status.dto';
import { GetHealthStatusFilterDto } from './dto/get-health-status-filter.dto';
import { User } from '../auth/user.entity';
export declare class HealthStatusRepository extends Repository<HealthStatus> {
    getHealthStatus(filterDto: GetHealthStatusFilterDto, user: User): Promise<HealthStatus[]>;
    createHealthStatus(createHealthStatusDto: CreateHealthStatusDto, user: User): Promise<HealthStatus>;
}
