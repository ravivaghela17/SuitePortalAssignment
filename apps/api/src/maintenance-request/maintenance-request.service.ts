import { Injectable } from '@nestjs/common';
import { MaintenanceRequest, Response } from '@suiteportal/api-interfaces';
import {
  MaintenanceRequestDao,
  MaintenanceRequestDB,
} from './maintenance-request.dao';

@Injectable()
export class MaintenanceRequestService {
  constructor(private readonly maintReqDao: MaintenanceRequestDao) {
    //
  }

  async createMaintenanceRequest(maintenanceRequest: MaintenanceRequest) {
    return await this.maintReqDao.insertNewRequest(maintenanceRequest);
  }

  async getMaintenanceRequest(id: string): Promise<Response> {
    return await this.maintReqDao.getMaintenanceRequest(id);
  }
  async getOpenMaintenanceRequest(): Promise<Response> {
    return await this.maintReqDao.getOpenMaintenances();
  }
  async closeMaintenanceRequest(id: string): Promise<Response> {
    return await this.maintReqDao.closeMaintenanceRequest(id);
  }
}
