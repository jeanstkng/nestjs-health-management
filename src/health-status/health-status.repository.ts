import { Repository, EntityRepository } from "typeorm";
import { HealthStatus } from './health-status.entity';
import { CreateHealthStatusDto } from './dto/create-health-status.dto';
import { HealthStatusGender } from "./health-status-gender.enum";
import { GetHealthStatusFilterDto } from './dto/get-health-status-filter.dto';
import { User } from '../auth/user.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(HealthStatus)
export class HealthStatusRepository extends Repository<HealthStatus> {
    private logger = new Logger('HealthStatusRepository');

    async getHealthStatus(
        filterDto: GetHealthStatusFilterDto,
        user: User    
    ): Promise<HealthStatus[]> {
        const { search, gender } = filterDto;
        const query = this.createQueryBuilder('health-status');

        query.where('health-status.userId = :userId', {userId: user.id});

        if (gender) {
            query.andWhere('health-status.gender = :gender', { gender });
        }

        if (search) {
            query.andWhere('(health-status.fever = :search OR health-status.cough = :search OR health-status.shortnessOfBreath = :search)', {search});
        }

        try {
            const healthStatus = await query.getMany();
            return healthStatus;   
        } catch (err) {
            this.logger.error(`Failed to get health status for user "${user.username}", DTO: ${JSON.stringify(filterDto)}`, err.stack);
            throw new InternalServerErrorException();    
        }
    }
    
    async createHealthStatus(
        createHealthStatusDto: CreateHealthStatusDto,
        user: User
    ): Promise<HealthStatus> {
        const { fever, cough, shortnessOfBreath } = createHealthStatusDto;
        
        const healthStatus = new HealthStatus();
        healthStatus.cough = cough;
        healthStatus.fever = fever;
        healthStatus.shortnessOfBreath = shortnessOfBreath;
        healthStatus.gender = HealthStatusGender.MALE;
        healthStatus.user = user;

        try {
            await healthStatus.save();
        } catch (err) {
            this.logger.error(`Failed to create health status for user "${user.username}". Data: ${JSON.stringify(createHealthStatusDto)}`, err.stack);
            throw new InternalServerErrorException();
        }

        delete healthStatus.user;

        return healthStatus;
    }
}