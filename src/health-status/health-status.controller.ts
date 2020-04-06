import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { HealthStatusService } from './health-status.service';
import { HealthStatusGender } from './health-status-gender.enum';
import { CreateHealthStatusDto } from './dto/create-health-status.dto';
import { GetHealthStatusFilterDto } from './dto/get-health-status-filter.dto';
import { HealthStatusGenderValidationPipe } from './pipes/health-status-gender-validation.pipe';
import { HealthStatus } from './health-status.entity';

@Controller('health-status')
export class HealthStatusController {

    constructor(private healthStatusService: HealthStatusService) {}

    @Get()
    getHealthStatus(@Query() filterDto: GetHealthStatusFilterDto): Promise<HealthStatus[]> {
        return this.healthStatusService.getHealthStatus(filterDto);
    }

    @Get('/:id')
    getHealthStatusById(@Param('id', ParseIntPipe) id: number): Promise<HealthStatus> {
        return this.healthStatusService.getHealthStatusById(id);
    }

    @UsePipes(ValidationPipe)
    @Post()
    createHealthStatus(@Body() createHealthStatusDto: CreateHealthStatusDto): Promise<HealthStatus> {
        return this.healthStatusService.createHealthStatus(createHealthStatusDto);
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
