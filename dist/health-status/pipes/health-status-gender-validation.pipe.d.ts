import { PipeTransform } from "@nestjs/common";
import { HealthStatusGender } from '../health-status-gender.enum';
export declare class HealthStatusGenderValidationPipe implements PipeTransform {
    readonly allowedGenders: HealthStatusGender[];
    transform(value: any): any;
    private isGenderValid;
}
