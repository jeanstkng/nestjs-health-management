import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
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
    private logger = new Logger('HealthStatusController');
    constructor(private healthStatusService: HealthStatusService) {}

    @Get()
    getHealthStatus(
        @Query() filterDto: GetHealthStatusFilterDto,
        @GetUser() user: User
    ): Promise<HealthStatus[]> {
        this.logger.verbose(` User "${user.username}" retrieving all health status. Filters: ${JSON.stringify(filterDto)}`);
        return this.healthStatusService.getHealthStatus(filterDto, user);
    }

    @Get('/:id')
    getHealthStatusById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<HealthStatus> {
        return this.healthStatusService.getHealthStatusById(id, user);
    }

    @UsePipes(ValidationPipe)
    @Post()
    createHealthStatus(
        @Body() createHealthStatusDto: CreateHealthStatusDto,
        @GetUser() user: User
    ): Promise<HealthStatus> {
        this.logger.verbose(`User "${user.username}" creating a new health status. Data: ${JSON.stringify(createHealthStatusDto)}`);
        return this.healthStatusService.createHealthStatus(createHealthStatusDto, user);
    }

    @Delete('/:id')
    deleteHealthStatusById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<number> {
        return this.healthStatusService.deleteHealthStatusById(id, user);
    }

    @Patch('/:id/gender')
    updateHealthStatusGenderById(
        @Param('id', ParseIntPipe) id: number,
        @Body('gender', HealthStatusGenderValidationPipe) gender: HealthStatusGender,
        @GetUser() user: User
    ): Promise<HealthStatus> {
        return this.healthStatusService.updateHealthStatusGenderById(id, gender, user);
    }

}
