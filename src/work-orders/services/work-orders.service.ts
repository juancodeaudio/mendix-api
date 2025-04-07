import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { WorkOrder } from '../entities/work-order.entity';
import { User } from '../../users/entities/user.entity';
import { WorkOrderStatus } from '../entities/work-order-status.entity';
import { Machine } from '../../machines/entities/machine.entity';
import { CreateWorkOrderDto, UpdateWorkOrderDto, WorkOrderQueryDto  } from '../dtos/work-orders.dto';

@Injectable()
export class WorkOrdersService {
  constructor(
    @InjectRepository(WorkOrder) private workOrderRepo: Repository<WorkOrder>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(WorkOrderStatus) private workOrderStatusRepo: Repository<WorkOrderStatus>,
    @InjectRepository(Machine) private machineRepo: Repository<Machine>,
  ) {}

  findAll(params?: WorkOrderQueryDto ) {
    if (params?.limit && params?.offset) {
      return this.workOrderRepo.find({
        relations: ['user', 'workOrderStatus'],
        take: params.limit,
        skip: params.offset,
      });
    }
    return this.workOrderRepo.find({
      relations: ['user', 'workOrderStatus'],
    });
  }

  async findOne(id: number) {
    const workOrder = await this.workOrderRepo.findOne({
      where: { id },
      relations: { user: true, workOrderStatus: true, machines: true, workOrderProducts: { product: true } },
    });
    if (!workOrder) {
      throw new NotFoundException(`Work Order #${id} not found`);
    }
    return workOrder;
  }

  async getWorkOrderHistory(id: number) {
    const workOrder = await this.workOrderRepo.findOne({
      where: { id },
      relations: { workOrderHistory: { user: true } },
    });
    if (!workOrder) {
      throw new NotFoundException(`Work Order #${id} not found`);
    }
    return workOrder.workOrderHistory;
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
    if (data.machinesIds && data.machinesIds.length > 0) {
      const machines = await this.machineRepo.findBy({ id: In(data.machinesIds) });
      if (machines.length !== data.machinesIds.length) {
        const notFoundIds = data.machinesIds.filter((id) => !machines.some((machine) => machine.id === id));
        throw new NotFoundException(`Some machines not found - Count: ${notFoundIds.length} - Ids: ${notFoundIds.join(', ')}`);
      }
      newWorkOrder.machines = machines;
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

  async removeMachineFromWorkOrder(id: number, machineId: number) {
    const workOrder = await this.workOrderRepo.findOne({
      where: { id },
      relations: ['machines'],
    });
    if (!workOrder) {
      throw new NotFoundException(`Work Order #${id} not found`);
    }

    if (!workOrder.machines.some((machine) => machine.id === machineId)) {
      throw new NotFoundException(`Machine #${machineId} not found in Work Order #${id}`);
    }

    workOrder.machines = workOrder.machines.filter((machine) => machine.id !== machineId);
    return this.workOrderRepo.save(workOrder);
  }

  async addMachineToWorkOrder(id: number, machineId: number) {
    const workOrder = await this.workOrderRepo.findOne({
      where: { id },
      relations: ['machines'],
    });
    if (!workOrder) {
      throw new NotFoundException(`Work Order #${id} not found`);
    }

    if (workOrder.machines.some((machine) => machine.id === machineId)) {
      throw new NotFoundException(`Machine #${machineId} already exists in Work Order #${id}`);
    }
    const machine = await this.machineRepo.findOneBy({ id: machineId });
    if (!machine) {
      throw new NotFoundException(`Machine #${machineId} not found`);
    }

    workOrder.machines.push(machine);
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
