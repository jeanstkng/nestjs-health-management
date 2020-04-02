import { Controller, Get } from '@nestjs/common';
import { HealthStatusService } from './health-status.service';
import { HealthStatus } from './health-status.model';

@Controller('health-status')
export class HealthStatusController {

    constructor(private healthStatusService: HealthStatusService) {}

    @Get()
    getAllHealthStatus(): HealthStatus[] {
        return this.healthStatusService.getAllHealthStatus();
    }

}
