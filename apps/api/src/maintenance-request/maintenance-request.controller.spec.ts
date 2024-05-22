/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test, TestingModule } from '@nestjs/testing';
import { ServiceType, RequestStatus } from '@suiteportal/api-interfaces';
import { MaintenanceRequestController } from './maintenance-request.controller';
import { MaintenanceRequestService } from './maintenance-request.service';
import { BadRequestException } from '@nestjs/common';

describe('MaintenanceRequestController', () => {
  let controller: MaintenanceRequestController;

  let mockService: MaintenanceRequestService;

  beforeEach(async () => {
    mockService = {} as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaintenanceRequestController],
      providers: [
        { provide: MaintenanceRequestService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<MaintenanceRequestController>(
      MaintenanceRequestController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call dao when getting a maintenance request by id', async () => {
    mockService.getMaintenanceRequest = jest
      .fn()
      .mockResolvedValue({ id: '1', summary: 'test' });

    const result = await controller.getMaintenanceRequest('1');

    expect(mockService.getMaintenanceRequest).toHaveBeenCalled();
    expect(result).toEqual({ id: '1', summary: 'test' });
  });

  it('should call service when creating a maintenance request', async () => {
    const request = {
      name: 'test',
      email: 'email@email.com',
      unitNumber: '123',
      summary: 'test',
      serviceType: ServiceType.General,
      status: RequestStatus.open,
    };
    mockService.createMaintenanceRequest = jest
      .fn()
      .mockResolvedValue({ id: '1', ...request });

    const result = await controller.createMaintenanceRequest(request);

    expect(mockService.createMaintenanceRequest).toHaveBeenCalledWith(request);
    expect(result).toEqual({ id: '1', ...request });
  });
  it('should throw BadRequestException if no id is provided', async () => {
    await expect(controller.closeMaintenanceRequest('')).rejects.toThrow(
      BadRequestException
    );
  });

  it('should call service when updating a maintenance request', async () => {
    const request = {
      id: '1',
      summary: 'updated test',
      stauts: RequestStatus.close,
    };
    mockService.closeMaintenanceRequest = jest.fn().mockResolvedValue(request);

    const result = await controller.closeMaintenanceRequest('1');

    expect(mockService.closeMaintenanceRequest).toHaveBeenCalledWith('1');
    expect(result).toEqual(request);
  });
});
