import { Module } from '@nestjs/common';
import { HealthStatusModule } from './health-status/health-status.module';

@Module({
  imports: [HealthStatusModule]
})
export class AppModule {}
