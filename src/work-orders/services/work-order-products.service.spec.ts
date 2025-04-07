import { Test, TestingModule } from '@nestjs/testing';
import { WorkOrderProductsService } from './work-order-products.service';

describe('WorkOrderProductsService', () => {
  let service: WorkOrderProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkOrderProductsService],
    }).compile();

    service = module.get<WorkOrderProductsService>(WorkOrderProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
