import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkOrderHistory } from '../entities/work-order-history.entity';
import { User } from '../../users/entities/user.entity';
import { WorkOrder } from '../entities/work-order.entity';
import { CreateWorkOrderHistoryDto } from '../dtos/work-order-history.dto';

@Injectable()
export class WorkOrderHistoryService {
  constructor(
    @InjectRepository(WorkOrderHistory) private readonly workOrderHistoryRepo: Repository<WorkOrderHistory>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(WorkOrder) private readonly workOrderRepo: Repository<WorkOrder>,
  ) {}

  async createWOHistoryEvent(data: CreateWorkOrderHistoryDto) {
    const { userId, workOrderId } = data;

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    const workOrder = await this.workOrderRepo.findOne({ where: { id: workOrderId } });
    if (!workOrder) {
      throw new NotFoundException(`Work Order #${workOrderId} not found`);
    }

    const newWorkOrderHistory = new WorkOrderHistory();
    newWorkOrderHistory.event = data.event;
    newWorkOrderHistory.user = user;
    newWorkOrderHistory.workOrder = workOrder;

    return this.workOrderHistoryRepo.save(newWorkOrderHistory);
  }
}
