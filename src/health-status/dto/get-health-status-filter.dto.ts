import { HealthStatusGender } from '../health-status-gender.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetHealthStatusFilterDto {
    
    @IsOptional()
    @IsIn([HealthStatusGender.MALE, HealthStatusGender.FEMALE, HealthStatusGender.OTHER])
    gender: HealthStatusGender;
    
    @IsOptional()
    @IsNotEmpty()
    search: boolean;
}
