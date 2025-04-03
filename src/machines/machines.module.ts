import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MachineStatus } from './entities/machine-status.entity';
import { Location } from './entities/location.entity';
import { MachineStatusController } from './controllers/machine-status.controller';
import { MachineStatusService } from './services/machine-status.service';
import { LocationsService } from './services/locations.service';
import { LocationsController } from './controllers/locations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MachineStatus, Location])],
  providers: [MachineStatusService, LocationsService],
  controllers: [MachineStatusController, LocationsController]
})
export class MachinesModule {}
