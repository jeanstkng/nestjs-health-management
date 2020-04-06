import { HealthStatusService } from './health-status.service';
import { HealthStatusGender } from './health-status-gender.enum';
import { CreateHealthStatusDto } from './dto/create-health-status.dto';
import { GetHealthStatusFilterDto } from './dto/get-health-status-filter.dto';
import { HealthStatus } from './health-status.entity';
export declare class HealthStatusController {
    private healthStatusService;
    constructor(healthStatusService: HealthStatusService);
    getHealthStatus(filterDto: GetHealthStatusFilterDto): Promise<HealthStatus[]>;
    getHealthStatusById(id: number): Promise<HealthStatus>;
    createHealthStatus(createHealthStatusDto: CreateHealthStatusDto): Promise<HealthStatus>;
    deleteHealthStatusById(id: number): Promise<number>;
    updateHealthStatusGenderById(id: number, gender: HealthStatusGender): Promise<HealthStatus>;
}
