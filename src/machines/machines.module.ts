import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MachineStatus } from './entities/machine-status.entity';
import { MachineStatusController } from './controllers/machine-status.controller';
import { MachineStatusService } from './services/machine-status.service';

@Module({
  imports: [TypeOrmModule.forFeature([MachineStatus])],
  providers: [MachineStatusService],
  controllers: [MachineStatusController]
})
export class MachinesModule {}
