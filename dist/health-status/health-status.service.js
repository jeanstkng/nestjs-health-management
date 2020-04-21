"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const health_status_repository_1 = require("./health-status.repository");
const typeorm_1 = require("@nestjs/typeorm");
let HealthStatusService = class HealthStatusService {
    constructor(healthStatusRepository) {
        this.healthStatusRepository = healthStatusRepository;
    }
    async getHealthStatus(filterDto, user) {
        return this.healthStatusRepository.getHealthStatus(filterDto, user);
    }
    async getHealthStatusById(id) {
        const found = await this.healthStatusRepository.findOne(id);
        if (!found) {
            throw new common_1.NotFoundException(`Health Status with ID "${id}" not found.`);
        }
        return found;
    }
    async createHealthStatus(createHealthStatusDto, user) {
        return this.healthStatusRepository.createHealthStatus(createHealthStatusDto, user);
    }
    async deleteHealthStatusById(id) {
        const deleted = await this.healthStatusRepository.delete(id);
        if (deleted.affected === 0) {
            throw new common_1.NotFoundException(`Health Status with ID "${id}" not found.`);
        }
        return id;
    }
    async updateHealthStatusGenderById(id, gender) {
        const healthStatus = await this.getHealthStatusById(id);
        healthStatus.gender = gender;
        await healthStatus.save();
        return healthStatus;
    }
};
HealthStatusService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(health_status_repository_1.HealthStatusRepository)),
    __metadata("design:paramtypes", [health_status_repository_1.HealthStatusRepository])
], HealthStatusService);
exports.HealthStatusService = HealthStatusService;
//# sourceMappingURL=health-status.service.js.map