import { Test, TestingModule } from '@nestjs/testing';
import { WorkOrderStatusService } from './work-order-status.service';

describe('WorkOrderStatusService', () => {
  let service: WorkOrderStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkOrderStatusService],
    }).compile();

    service = module.get<WorkOrderStatusService>(WorkOrderStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
