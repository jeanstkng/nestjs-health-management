import { Injectable, NotFoundException } from '@nestjs/common';
import { HealthStatusGender } from './health-status-gender.enum';
import { CreateHealthStatusDto } from './dto/create-health-status.dto';
import { GetHealthStatusFilterDto } from './dto/get-health-status-filter.dto';
import { HealthStatusRepository } from './health-status.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { HealthStatus } from './health-status.entity';

@Injectable()
export class HealthStatusService {
    constructor(
        @InjectRepository(HealthStatusRepository)
        private healthStatusRepository: HealthStatusRepository
    ) {}

    async getHealthStatus(filterDto: GetHealthStatusFilterDto): Promise<HealthStatus[]> {
        return this.healthStatusRepository.getHealthStatus(filterDto);
    }

    async getHealthStatusById(id: number): Promise<HealthStatus> {
        const found = await this.healthStatusRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Health Status with ID "${id}" not found.`);
        }
        return found;
    }

    async createHealthStatus(createHealthStatusDto: CreateHealthStatusDto): Promise<HealthStatus> {
        return this.healthStatusRepository.createHealthStatus(createHealthStatusDto);
    }

    async deleteHealthStatusById(id: number): Promise<number> {
        const deleted = await this.healthStatusRepository.delete(id);
        if (deleted.affected === 0) {
            throw new NotFoundException(`Health Status with ID "${id}" not found.`);
        }
        return id;
    }

    async updateHealthStatusGenderById(id: number, gender: HealthStatusGender): Promise<HealthStatus> {
        const healthStatus = await this.getHealthStatusById(id);
        healthStatus.gender = gender;
        await healthStatus.save();
        return healthStatus;
    }

}
