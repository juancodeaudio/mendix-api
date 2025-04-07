import { Test, TestingModule } from '@nestjs/testing';
import { WorkOrderProductsController } from './work-order-products.controller';

describe('WorkOrderProductsController', () => {
  let controller: WorkOrderProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkOrderProductsController],
    }).compile();

    controller = module.get<WorkOrderProductsController>(WorkOrderProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
