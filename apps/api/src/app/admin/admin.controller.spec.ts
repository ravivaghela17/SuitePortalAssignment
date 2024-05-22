import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { BadRequestException } from '@nestjs/common';

describe('AdminController', () => {
  let controller: AdminController;
  let service: AdminService;

  beforeEach(async () => {
    service = {} as any;
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: AdminService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<AdminController>(AdminController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should throw BadRequestException if no email is provided', async () => {
    await expect(
      controller.validateUser({ email: undefined, password: 'password' })
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw BadRequestException if no password is provided', async () => {
    await expect(
      controller.validateUser({ email: 'email@test.com', password: undefined })
    ).rejects.toThrow(BadRequestException);
  });
});
