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
const health_status_service_1 = require("./health-status.service");
const health_status_gender_enum_1 = require("./health-status-gender.enum");
const create_health_status_dto_1 = require("./dto/create-health-status.dto");
const get_health_status_filter_dto_1 = require("./dto/get-health-status-filter.dto");
const health_status_gender_validation_pipe_1 = require("./pipes/health-status-gender-validation.pipe");
const passport_1 = require("@nestjs/passport");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const user_entity_1 = require("../auth/user.entity");
let HealthStatusController = class HealthStatusController {
    constructor(healthStatusService) {
        this.healthStatusService = healthStatusService;
    }
    getHealthStatus(filterDto, user) {
        return this.healthStatusService.getHealthStatus(filterDto, user);
    }
    getHealthStatusById(id) {
        return this.healthStatusService.getHealthStatusById(id);
    }
    createHealthStatus(createHealthStatusDto, user) {
        return this.healthStatusService.createHealthStatus(createHealthStatusDto, user);
    }
    deleteHealthStatusById(id) {
        return this.healthStatusService.deleteHealthStatusById(id);
    }
    updateHealthStatusGenderById(id, gender) {
        return this.healthStatusService.updateHealthStatusGenderById(id, gender);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_health_status_filter_dto_1.GetHealthStatusFilterDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], HealthStatusController.prototype, "getHealthStatus", null);
__decorate([
    common_1.Get('/:id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HealthStatusController.prototype, "getHealthStatusById", null);
__decorate([
    common_1.UsePipes(common_1.ValidationPipe),
    common_1.Post(),
    __param(0, common_1.Body()),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_health_status_dto_1.CreateHealthStatusDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], HealthStatusController.prototype, "createHealthStatus", null);
__decorate([
    common_1.Delete('/:id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HealthStatusController.prototype, "deleteHealthStatusById", null);
__decorate([
    common_1.Patch('/:id/gender'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __param(1, common_1.Body('gender', health_status_gender_validation_pipe_1.HealthStatusGenderValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], HealthStatusController.prototype, "updateHealthStatusGenderById", null);
HealthStatusController = __decorate([
    common_1.Controller('health-status'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __metadata("design:paramtypes", [health_status_service_1.HealthStatusService])
], HealthStatusController);
exports.HealthStatusController = HealthStatusController;
//# sourceMappingURL=health-status.controller.js.map