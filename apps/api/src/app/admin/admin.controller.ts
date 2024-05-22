import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Get,
  Param,
} from '@nestjs/common';
import { User } from '@suiteportal/api-interfaces';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/')
  public async validateUser(@Body() user: User) {
    if (!user.email) {
      throw new BadRequestException('Must enter a email');
    }
    if (!user.password) {
      throw new BadRequestException('Must enter a password');
    }
    return await this.adminService.validateUser(user.email, user.password);
  }
}
