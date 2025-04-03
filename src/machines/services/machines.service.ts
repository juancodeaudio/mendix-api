import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Machine } from '../entities/machine.entity';
import { MachineStatusService } from './machine-status.service';
import { LocationsService } from './locations.service';
import { CreateMachineDto, UpdateMachineDto } from '../dtos/machines.dto';

@Injectable()
export class MachinesService {
  constructor(
    @InjectRepository(Machine) private machineRepo: Repository<Machine>,
    private machineStatusService: MachineStatusService,
    private locationsService: LocationsService,
  ) {}

  findAll() {
    return this.machineRepo.find({
      relations: ['machineStatus', 'location'],
    });
  }

  async findOne(id: number) {
    const machine = await this.machineRepo.findOne({
      where: { id },
      relations: ['machineStatus', 'location'],
    });
    if (!machine) {
      throw new NotFoundException(`Machine #${id} not found`);
    }
    return machine;
  }

  async createMachine(data: CreateMachineDto) {
    const newMachine = this.machineRepo.create(data);
    if (data.machineStatusId) {
      const machineStatus = await this.machineStatusService.findOne(data.machineStatusId);
      newMachine.machineStatus = machineStatus;
    }
    if (data.locationId) {
      const location = await this.locationsService.findOne(data.locationId);
      newMachine.location = location;
    }
    return this.machineRepo.save(newMachine);
  }

  async updateMachine(id: number, changes: UpdateMachineDto) {
    const machine = await this.machineRepo.findOneBy({ id });
    if (!machine) {
      throw new NotFoundException(`Machine #${id} not found`);
    }
    if (changes.machineStatusId) {
      const machineStatus = await this.machineStatusService.findOne(changes.machineStatusId);
      machine.machineStatus = machineStatus;
    }
    if (changes.locationId) {
      const location = await this.locationsService.findOne(changes.locationId);
      machine.location = location;
    }
    this.machineRepo.merge(machine, changes);
    return this.machineRepo.save(machine);
  }

  async removeMachine(id: number) {
    const machine = await this.machineRepo.findOneBy({ id });
    if (!machine) {
      throw new NotFoundException(`Machine #${id} not found`);
    }
    return this.machineRepo.delete(id);
  }
}
