import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkOrderStatus } from '../entities/work-order-status.entity';
import { CreateWorkOrderStatusDto, UpdateWorkOrderStatusDto } from '../dtos/work-order-status.dto';

@Injectable()
export class WorkOrderStatusService {
  constructor(
    @InjectRepository(WorkOrderStatus) private workOrderStatusRepo: Repository<WorkOrderStatus>
  ) {}

  findAll() {
    return this.workOrderStatusRepo.find();
  }

  async findOne(id: number) {
    const status = await this.workOrderStatusRepo.findOne({
      where: { id },
      relations: ['workOrders'],
    });
    if (!status) {
      throw new NotFoundException(`Work Order status #${id} not found`);
    }
    return status;
  }

  createWorkOrderStatus(data: CreateWorkOrderStatusDto) {
    const newStatus = this.workOrderStatusRepo.create(data);
    return this.workOrderStatusRepo.save(newStatus);
  }

  async updateWorkOrderStatus(id: number, changes: UpdateWorkOrderStatusDto) {
    const status = await this.workOrderStatusRepo.findOneBy({ id });
    if (!status) {
      throw new NotFoundException(`Work Order status #${id} not found`);
    }
    this.workOrderStatusRepo.merge(status, changes);
    return this.workOrderStatusRepo.save(status);
  }

  async removeWorkOrderStatus(id: number) {
    const status = await this.workOrderStatusRepo.findOneBy({ id });
    if (!status) {
      throw new NotFoundException(`Work Order status #${id} not found`);
    }
    return this.workOrderStatusRepo.delete(id);
  }
}
