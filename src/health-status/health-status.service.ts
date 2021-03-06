import { Injectable, NotFoundException } from '@nestjs/common';
import { HealthStatusGender } from './health-status-gender.enum';
import { CreateHealthStatusDto } from './dto/create-health-status.dto';
import { GetHealthStatusFilterDto } from './dto/get-health-status-filter.dto';
import { HealthStatusRepository } from './health-status.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { HealthStatus } from './health-status.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class HealthStatusService {
    constructor(
        @InjectRepository(HealthStatusRepository)
        private healthStatusRepository: HealthStatusRepository
    ) {}

    async getHealthStatus(
        filterDto: GetHealthStatusFilterDto,
        user: User    
    ): Promise<HealthStatus[]> {
        return this.healthStatusRepository.getHealthStatus(filterDto, user);
    }

    async getHealthStatusById(
        id: number,
        user: User
    ): Promise<HealthStatus> {
        const found = await this.healthStatusRepository.findOne({ where: { id, userId: user.id } });

        if (!found) {
            throw new NotFoundException(`Health Status with ID "${id}" not found.`);
        }
        return found;
    }

    async createHealthStatus(
        createHealthStatusDto: CreateHealthStatusDto, 
        user: User
    ): Promise<HealthStatus> {
        return this.healthStatusRepository.createHealthStatus(createHealthStatusDto, user);
    }

    async deleteHealthStatusById(
        id: number,
        user: User
    ): Promise<number> {
        const deleted = await this.healthStatusRepository.delete({ id, userId: user.id });
        if (deleted.affected === 0) {
            throw new NotFoundException(`Health Status with ID "${id}" not found.`);
        }
        return id;
    }

    async updateHealthStatusGenderById(
        id: number,
        gender: HealthStatusGender,
        user: User
    ): Promise<HealthStatus> {
        const healthStatus = await this.getHealthStatusById(id, user);
        healthStatus.gender = gender;
        await healthStatus.save();
        return healthStatus;
    }

}
