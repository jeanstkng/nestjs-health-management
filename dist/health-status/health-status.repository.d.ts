import { Repository } from "typeorm";
import { HealthStatus } from './health-status.entity';
import { CreateHealthStatusDto } from './dto/create-health-status.dto';
import { GetHealthStatusFilterDto } from './dto/get-health-status-filter.dto';
export declare class HealthStatusRepository extends Repository<HealthStatus> {
    getHealthStatus(filterDto: GetHealthStatusFilterDto): Promise<HealthStatus[]>;
    createHealthStatus(createHealthStatusDto: CreateHealthStatusDto): Promise<HealthStatus>;
}
