import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MachineStatus } from '../entities/machine-status.entity';
import { CreateMachineStatusDto, UpdateMachineStatusDto } from '../dtos/machine-status.dto';

@Injectable()
export class MachineStatusService {
  constructor(
    @InjectRepository(MachineStatus) private machineStatusRepo: Repository<MachineStatus>
  ) {}

  findAll() {
    return this.machineStatusRepo.find();
  }

  async findOne(id: number) {
    const status = await this.machineStatusRepo.findOne({
      where: { id },
      relations: ['machines'],
    });
    if (!status) {
      throw new NotFoundException(`Machine status #${id} not found`);
    }
    return status;
  }

  createMachineStatus(data: CreateMachineStatusDto) {
    const newStatus = this.machineStatusRepo.create(data);
    return this.machineStatusRepo.save(newStatus);
  }

  async updateMachineStatus(id: number, changes: UpdateMachineStatusDto) {
    const status = await this.machineStatusRepo.findOneBy({ id });
    if (!status) {
      throw new NotFoundException(`Machine status #${id} not found`);
    }
    this.machineStatusRepo.merge(status, changes);
    return this.machineStatusRepo.save(status);
  }

  async removeMachineStatus(id: number) {
    const status = await this.machineStatusRepo.findOneBy({ id });
    if (!status) {
      throw new NotFoundException(`Machine status #${id} not found`);
    }
    return this.machineStatusRepo.delete(id);
  }
}
