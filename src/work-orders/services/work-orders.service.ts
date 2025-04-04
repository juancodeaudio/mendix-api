import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkOrder } from '../entities/work-order.entity';
import { User } from '../../users/entities/user.entity';
import { WorkOrderStatus } from '../entities/work-order-status.entity';
import { CreateWorkOrderDto, UpdateWorkOrderDto } from '../dtos/work-orders.dto';

@Injectable()
export class WorkOrdersService {
  constructor(
    @InjectRepository(WorkOrder) private workOrderRepo: Repository<WorkOrder>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(WorkOrderStatus) private workOrderStatusRepo: Repository<WorkOrderStatus>,
  ) {}

  findAll() {
    return this.workOrderRepo.find({
      relations: ['user', 'workOrderStatus'],
    });
  }

  async findOne(id: number) {
    const workOrder = await this.workOrderRepo.findOne({
      where: { id },
      relations: ['user', 'workOrderStatus'],
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
    if (data.workOrderStatusId) {
      const workOrderStatus = await this.workOrderStatusRepo.findOne({ where: { id: data.workOrderStatusId } });
      if (!workOrderStatus) {
        throw new NotFoundException(`Work Order Status #${data.workOrderStatusId} not found`);
      }
      newWorkOrder.workOrderStatus = workOrderStatus;
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
    if (changes.workOrderStatusId) {
      const workOrderStatus = await this.workOrderStatusRepo.findOne({ where: { id: changes.workOrderStatusId } });
      if (!workOrderStatus) {
        throw new NotFoundException(`Work Order Status #${changes.workOrderStatusId} not found`);
      }
      workOrder.workOrderStatus = workOrderStatus;
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
