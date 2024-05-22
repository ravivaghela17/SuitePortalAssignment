import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { MaintenanceRequestService } from './maintenance-request.service';

@Controller('maintenance-requests')
export class MaintenanceRequestController {
  constructor(
    private readonly maintenanceRequestService: MaintenanceRequestService
  ) {
    //
  }

  @Post('/')
  public async createMaintenanceRequest(
    @Body() maintenanceRequest: MaintenanceRequest
  ) {
    if (!maintenanceRequest?.summary) {
      throw new BadRequestException('Must provide a valid summary');
    }
    if (!maintenanceRequest?.serviceType) {
      throw new BadRequestException('Must provide a valid Service Type');
    }
    return await this.maintenanceRequestService.createMaintenanceRequest(
      maintenanceRequest
    );
  }

  @Get('/')
  public async getOpenMaintenanceRequests() {
    return await this.maintenanceRequestService.getOpenMaintenanceRequest();
  }

  @Get('/:id')
  public async getMaintenanceRequest(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('No id provided');
    }
    return await this.maintenanceRequestService.getMaintenanceRequest(id);
  }

  @Put('/:id/close')
  public async closeMaintenanceRequest(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('Must provide request id');
    }
    return await this.maintenanceRequestService.closeMaintenanceRequest(id);
  }
}
