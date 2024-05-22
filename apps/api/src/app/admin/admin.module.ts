import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminDao } from './admin.dao';
import { AdminService } from './admin.service';

@Module({
  imports: [],
  controllers: [AdminController],
  providers: [AdminDao, AdminService],
})
export class AdminModule {}
