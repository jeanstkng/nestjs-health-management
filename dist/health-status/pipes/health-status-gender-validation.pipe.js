"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const health_status_gender_enum_1 = require("../health-status-gender.enum");
class HealthStatusGenderValidationPipe {
    constructor() {
        this.allowedGenders = [
            health_status_gender_enum_1.HealthStatusGender.MALE,
            health_status_gender_enum_1.HealthStatusGender.FEMALE,
            health_status_gender_enum_1.HealthStatusGender.OTHER
        ];
    }
    transform(value) {
        value = value.toUpperCase();
        if (!this.isGenderValid(value)) {
            throw new common_1.BadRequestException(`${value} is an invalid gender.`);
        }
        return value;
    }
    isGenderValid(gender) {
        const idx = this.allowedGenders.indexOf(gender);
        return idx !== -1;
    }
}
exports.HealthStatusGenderValidationPipe = HealthStatusGenderValidationPipe;
//# sourceMappingURL=health-status-gender-validation.pipe.js.map