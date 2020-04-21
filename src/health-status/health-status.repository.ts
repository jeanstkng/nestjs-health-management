import { Repository, EntityRepository } from "typeorm";
import { HealthStatus } from './health-status.entity';
import { CreateHealthStatusDto } from './dto/create-health-status.dto';
import { HealthStatusGender } from "./health-status-gender.enum";
import { GetHealthStatusFilterDto } from './dto/get-health-status-filter.dto';
import { User } from '../auth/user.entity';

@EntityRepository(HealthStatus)
export class HealthStatusRepository extends Repository<HealthStatus> {
    
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

        const healthStatus = await query.getMany();
        return healthStatus;
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

        await healthStatus.save();

        delete healthStatus.user;

        return healthStatus;
    }
}