import { HealthStatusGender } from './health-status-gender.enum';
import { CreateHealthStatusDto } from './dto/create-health-status.dto';
import { GetHealthStatusFilterDto } from './dto/get-health-status-filter.dto';
import { HealthStatusRepository } from './health-status.repository';
import { HealthStatus } from './health-status.entity';
import { User } from '../auth/user.entity';
export declare class HealthStatusService {
    private healthStatusRepository;
    constructor(healthStatusRepository: HealthStatusRepository);
    getHealthStatus(filterDto: GetHealthStatusFilterDto, user: User): Promise<HealthStatus[]>;
    getHealthStatusById(id: number, user: User): Promise<HealthStatus>;
    createHealthStatus(createHealthStatusDto: CreateHealthStatusDto, user: User): Promise<HealthStatus>;
    deleteHealthStatusById(id: number, user: User): Promise<number>;
    updateHealthStatusGenderById(id: number, gender: HealthStatusGender, user: User): Promise<HealthStatus>;
}
