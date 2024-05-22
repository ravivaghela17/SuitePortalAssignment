import { Injectable } from '@nestjs/common';
import { AdminDao } from './admin.dao';

@Injectable()
export class AdminService {
  constructor(private readonly adminDao: AdminDao) {}

  async validateUser(email: string, password: string) {
    return await this.adminDao.validateUser(email, password);
  }
}
