import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkOrder } from './entities/work-order.entity';
import { WorkOrderStatus } from './entities/work-order-status.entity';
import { WorkOrderProduct } from './entities/work-order-product.entity';
import { WorkOrderHistory } from './entities/work-order-history.entity';
import { User } from '../users/entities/user.entity';
import { Machine } from '../machines/entities/machine.entity';
import { Product } from '../products/entities/product.entity';
import { WorkOrdersService } from './services/work-orders.service';
import { WorkOrdersController } from './controllers/work-orders.controller';
import { WorkOrderStatusService } from './services/work-order-status.service';
import { WorkOrderStatusController } from './controllers/work-order-status.controller';
import { WorkOrderProductsService } from './services/work-order-products.service';
import { WorkOrderProductsController } from './controllers/work-order-products.controller';
import { WorkOrderHistoryService } from './services/work-order-history.service';
import { WorkOrderHistoryController } from './controllers/work-order-history.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WorkOrder, WorkOrderStatus, WorkOrderProduct, WorkOrderHistory, User, Machine, Product])],
  providers: [WorkOrdersService, WorkOrderStatusService, WorkOrderProductsService, WorkOrderHistoryService],
  controllers: [WorkOrdersController, WorkOrderStatusController, WorkOrderProductsController, WorkOrderHistoryController]
})
export class WorkOrdersModule {}
