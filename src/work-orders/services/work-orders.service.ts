import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkOrder } from '../entities/work-order.entity';
import { User } from '../../users/entities/user.entity';
import { CreateWorkOrderDto, UpdateWorkOrderDto } from '../dtos/work-orders.dto';

@Injectable()
export class WorkOrdersService {
  constructor(
    @InjectRepository(WorkOrder) private workOrderRepo: Repository<WorkOrder>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.workOrderRepo.find({
      relations: ['user'],
    });
  }

  async findOne(id: number) {
    const workOrder = await this.workOrderRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!workOrder) {
      throw new NotFoundException(`Work Order #${id} not found`);
    }
    return workOrder;
  }

  async createWorkOrder(data: CreateWorkOrderDto) {
    const newWorkOrder = this.workOrderRepo.create(data);
    if (data.userId) {
      const user = await this.userRepo.findOne({ where: { id: data.userId } });
      if (!user) {
        throw new NotFoundException(`User #${data.userId} not found`);
      }
      newWorkOrder.user = user;
    }
    return this.workOrderRepo.save(newWorkOrder);
  }

  async updateWorkOrder(id: number, changes: UpdateWorkOrderDto) {
    const workOrder = await this.workOrderRepo.findOneBy({ id });
    if (!workOrder) {
      throw new NotFoundException(`Work Order #${id} not found`);
    }
    if (changes.userId) {
      const user = await this.userRepo.findOne({ where: { id: changes.userId } });
      if (!user) {
        throw new NotFoundException(`User #${changes.userId} not found`);
      }
      workOrder.user = user;
    }
    this.workOrderRepo.merge(workOrder, changes);
    return this.workOrderRepo.save(workOrder);
  }

  async removeWorkOrder(id: number) {
    const workOrder = await this.workOrderRepo.findOneBy({ id });
    if (!workOrder) {
      throw new NotFoundException(`Work Order #${id} not found`);
    }
    return this.workOrderRepo.delete(id);
  }
}
