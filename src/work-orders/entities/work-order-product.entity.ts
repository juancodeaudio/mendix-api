import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { WorkOrder } from './work-order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class WorkOrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => WorkOrder, (workOrder) => workOrder.workOrderProducts)
  workOrder: WorkOrder;

  @ManyToOne(() => Product)
  product: Product;

  @Column({ type: 'int' })
  quantity: number;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
