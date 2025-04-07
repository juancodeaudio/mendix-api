import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
  Index,
  JoinColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { WorkOrderStatus } from './work-order-status.entity';
import { Machine } from '../../machines/entities/machine.entity';
import { WorkOrderProduct } from './work-order-product.entity';
import { WorkOrderHistory } from './work-order-history.entity';

@Entity({ name: 'work_orders' })
@Index('idx_work_order_status', ['workOrderStatus'])
export class WorkOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.workOrders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'timestamptz', name: 'start_date' })
  startDate: Date;

  @Column({ type: 'timestamptz', name: 'end_date' })
  endDate: Date;

  @ManyToOne(() => WorkOrderStatus, (status) => status.workOrders)
  @JoinColumn({ name: 'work_order_status_id' })
  workOrderStatus: WorkOrderStatus;

  @ManyToMany(() => Machine, (machine) => machine.workOrders)
  @JoinTable({
    name: 'work_orders_machines',
    joinColumn: {
      name: 'work_order_id'
    },
    inverseJoinColumn: {
      name: 'machine_id'
    }
  })
  machines: Machine[];

  @OneToMany(() => WorkOrderProduct, (workOrderProduct) => workOrderProduct.workOrder)
  workOrderProducts: WorkOrderProduct[];

  @OneToMany(() => WorkOrderHistory, (workOrderHistory) => workOrderHistory.workOrder)
  workOrderHistory: WorkOrderHistory[];

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;
}
