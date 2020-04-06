import { PipeTransform, BadRequestException } from "@nestjs/common";
import { HealthStatusGender } from '../health-status-gender.enum';

export class HealthStatusGenderValidationPipe implements PipeTransform {

    readonly allowedGenders = [
        HealthStatusGender.MALE,
        HealthStatusGender.FEMALE,
        HealthStatusGender.OTHER
    ];

    transform(value: any) {
        value = value.toUpperCase();

        if (!this.isGenderValid(value)) {
            throw new BadRequestException(`${value} is an invalid gender.`);
        }

        return value;
    }

    private isGenderValid(gender: any) {
        const idx = this.allowedGenders.indexOf(gender);
        return idx !== -1;
    }
}