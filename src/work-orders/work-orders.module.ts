import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkOrder } from './entities/work-order.entity';
import { WorkOrderStatus } from './entities/work-order-status.entity';
import { User } from '../users/entities/user.entity';
import { Machine } from '../machines/entities/machine.entity';
import { WorkOrdersService } from './services/work-orders.service';
import { WorkOrdersController } from './controllers/work-orders.controller';
import { WorkOrderStatusService } from './services/work-order-status.service';
import { WorkOrderStatusController } from './controllers/work-order-status.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WorkOrder, WorkOrderStatus, User, Machine])],
  providers: [WorkOrdersService, WorkOrderStatusService],
  controllers: [WorkOrdersController, WorkOrderStatusController]
})
export class WorkOrdersModule {}
