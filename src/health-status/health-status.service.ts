import { Injectable } from '@nestjs/common';
import { HealthStatus } from './health-status.model';

@Injectable()
export class HealthStatusService {
    private healthStatus: HealthStatus[] = [];

    getAllHealthStatus(): HealthStatus[] {
        return this.healthStatus;
    }

}
