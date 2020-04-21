import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { HealthStatusService } from './health-status.service';
import { HealthStatusGender } from './health-status-gender.enum';
import { CreateHealthStatusDto } from './dto/create-health-status.dto';
import { GetHealthStatusFilterDto } from './dto/get-health-status-filter.dto';
import { HealthStatusGenderValidationPipe } from './pipes/health-status-gender-validation.pipe';
import { HealthStatus } from './health-status.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('health-status')
@UseGuards(AuthGuard())
export class HealthStatusController {

    constructor(private healthStatusService: HealthStatusService) {}

    @Get()
    getHealthStatus(
        @Query() filterDto: GetHealthStatusFilterDto,
        @GetUser() user: User
    ): Promise<HealthStatus[]> {
        return this.healthStatusService.getHealthStatus(filterDto, user);
    }

    @Get('/:id')
    getHealthStatusById(@Param('id', ParseIntPipe) id: number): Promise<HealthStatus> {
        return this.healthStatusService.getHealthStatusById(id);
    }

    @UsePipes(ValidationPipe)
    @Post()
    createHealthStatus(
        @Body() createHealthStatusDto: CreateHealthStatusDto,
        @GetUser() user: User
    ): Promise<HealthStatus> {
        return this.healthStatusService.createHealthStatus(createHealthStatusDto, user);
    }

    @Delete('/:id')
    deleteHealthStatusById(@Param('id', ParseIntPipe) id: number): Promise<number> {
        return this.healthStatusService.deleteHealthStatusById(id);
    }

    @Patch('/:id/gender')
    updateHealthStatusGenderById(
        @Param('id', ParseIntPipe) id: number,
        @Body('gender', HealthStatusGenderValidationPipe) gender: HealthStatusGender
    ): Promise<HealthStatus> {
        return this.healthStatusService.updateHealthStatusGenderById(id, gender);
    }

}
