import { Test, TestingModule } from '@nestjs/testing';
import { WorkOrderStatusController } from './work-order-status.controller';

describe('WorkOrderStatusController', () => {
  let controller: WorkOrderStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkOrderStatusController],
    }).compile();

    controller = module.get<WorkOrderStatusController>(WorkOrderStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
