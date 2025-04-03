import { Test, TestingModule } from '@nestjs/testing';
import { MachineStatusController } from './machine-status.controller';

describe('MachineStatusController', () => {
  let controller: MachineStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MachineStatusController],
    }).compile();

    controller = module.get<MachineStatusController>(MachineStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
