"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const health_status_entity_1 = require("./health-status.entity");
const health_status_gender_enum_1 = require("./health-status-gender.enum");
let HealthStatusRepository = class HealthStatusRepository extends typeorm_1.Repository {
    async getHealthStatus(filterDto) {
        const { search, gender } = filterDto;
        const query = this.createQueryBuilder('health-status');
        if (gender) {
            query.andWhere('health-status.gender = :gender', { gender });
        }
        if (search) {
            query.andWhere('(health-status.fever = :search OR health-status.cough = :search OR health-status.shortnessOfBreath = :search)', { search });
        }
        const healthStatus = await query.getMany();
        return healthStatus;
    }
    async createHealthStatus(createHealthStatusDto) {
        const { fever, cough, shortnessOfBreath } = createHealthStatusDto;
        const healthStatus = new health_status_entity_1.HealthStatus();
        healthStatus.cough = cough;
        healthStatus.fever = fever;
        healthStatus.shortnessOfBreath = shortnessOfBreath;
        healthStatus.gender = health_status_gender_enum_1.HealthStatusGender.MALE;
        await healthStatus.save();
        return healthStatus;
    }
};
HealthStatusRepository = __decorate([
    typeorm_1.EntityRepository(health_status_entity_1.HealthStatus)
], HealthStatusRepository);
exports.HealthStatusRepository = HealthStatusRepository;
//# sourceMappingURL=health-status.repository.js.map