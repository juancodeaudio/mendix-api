import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Machine } from './entities/machine.entity';
import { MachineStatus } from './entities/machine-status.entity';
import { Location } from './entities/location.entity';
import { MachinesController } from './controllers/machines.controller';
import { MachinesService } from './services/machines.service';
import { MachineStatusController } from './controllers/machine-status.controller';
import { MachineStatusService } from './services/machine-status.service';
import { LocationsController } from './controllers/locations.controller';
import { LocationsService } from './services/locations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Machine, MachineStatus, Location])],
  providers: [MachinesService, MachineStatusService, LocationsService],
  controllers: [MachinesController, MachineStatusController, LocationsController]
})
export class MachinesModule {}
