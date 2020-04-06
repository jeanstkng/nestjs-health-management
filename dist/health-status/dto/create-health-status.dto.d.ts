import { HealthStatusGender } from '../health-status-gender.enum';
export declare class CreateHealthStatusDto {
    fever: boolean;
    cough: boolean;
    shortnessOfBreath: boolean;
    gender: HealthStatusGender;
}
