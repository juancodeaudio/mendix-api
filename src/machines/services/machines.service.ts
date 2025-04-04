import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Machine } from '../entities/machine.entity';
import { Location } from '../entities/location.entity';
import { MachineStatus } from '../entities/machine-status.entity';
import { CreateMachineDto, UpdateMachineDto } from '../dtos/machines.dto';

@Injectable()
export class MachinesService {
  constructor(
    @InjectRepository(Machine) private machineRepo: Repository<Machine>,
    @InjectRepository(Location) private locationsRepo: Repository<Location>,
    @InjectRepository(MachineStatus) private machineStatusRepo: Repository<MachineStatus>,
  ) {}

  findAll() {
    return this.machineRepo.find({
      relations: ['machineStatus', 'location'],
    });
  }

  async findOne(id: number) {
    const machine = await this.machineRepo.findOne({
      where: { id },
      relations: ['machineStatus', 'location', 'workOrders'],
    });
    if (!machine) {
      throw new NotFoundException(`Machine #${id} not found`);
    }
    return machine;
  }

  async createMachine(data: CreateMachineDto) {
    const newMachine = this.machineRepo.create(data);
    if (data.machineStatusId) {
      const machineStatus = await this.machineStatusRepo.findOne({ where: { id: data.machineStatusId } });
      if (!machineStatus) {
        throw new NotFoundException(`MachineStatus #${data.machineStatusId} not found`);
      }
      newMachine.machineStatus = machineStatus;
    }
    if (data.locationId) {
      const location = await this.locationsRepo.findOne({ where: { id: data.locationId } });
      if (!location) {
        throw new NotFoundException(`Location #${data.locationId} not found`);
      }
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
      const machineStatus = await this.machineStatusRepo.findOne({ where: { id: changes.machineStatusId } });
      if (!machineStatus) {
        throw new NotFoundException(`MachineStatus #${changes.machineStatusId} not found`);
      }
      machine.machineStatus = machineStatus;
    }
    if (changes.locationId) {
      const location = await this.locationsRepo.findOne({ where: { id: changes.locationId } });
      if (!location) {
        throw new NotFoundException(`Location #${changes.locationId} not found`);
      }
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
