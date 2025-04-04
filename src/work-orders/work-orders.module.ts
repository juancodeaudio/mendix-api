import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkOrder } from './entities/work-order.entity';
import { User } from '../users/entities/user.entity';
import { WorkOrdersService } from './services/work-orders.service';
import { WorkOrdersController } from './controllers/work-orders.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WorkOrder, User])],
  providers: [WorkOrdersService],
  controllers: [WorkOrdersController]
})
export class WorkOrdersModule {}
