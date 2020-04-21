import { Module } from '@nestjs/common';
import { HealthStatusModule } from './health-status/health-status.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    HealthStatusModule,
    AuthModule]
})
export class AppModule {}
