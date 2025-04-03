import { Test, TestingModule } from '@nestjs/testing';
import { MachineStatusService } from './machine-status.service';

describe('MachineStatusService', () => {
  let service: MachineStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MachineStatusService],
    }).compile();

    service = module.get<MachineStatusService>(MachineStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
