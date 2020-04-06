import { HealthStatusGender } from '../health-status-gender.enum';
import { IsNotEmpty } from 'class-validator';

export class CreateHealthStatusDto {
    
    @IsNotEmpty()
    fever: boolean;

    @IsNotEmpty()
    cough: boolean;
    
    @IsNotEmpty()
    shortnessOfBreath: boolean;
    
    gender: HealthStatusGender;
}
