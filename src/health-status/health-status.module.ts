import { Module } from '@nestjs/common';
import { HealthStatusController } from './health-status.controller';
import { HealthStatusService } from './health-status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthStatusRepository } from './health-status.repository';

@Module({
  imports: [TypeOrmModule.forFeature([HealthStatusRepository])],
  controllers: [HealthStatusController],
  providers: [HealthStatusService]
})
export class HealthStatusModule {}
