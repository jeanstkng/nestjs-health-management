import { HealthStatusService } from './health-status.service';
export declare class HealthStatusController {
    private healthStatusService;
    constructor(healthStatusService: HealthStatusService);
    getAllHealthStatus(): any[];
}
