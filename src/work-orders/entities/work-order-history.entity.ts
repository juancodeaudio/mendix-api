import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
  JoinColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { WorkOrder } from './work-order.entity';

@Entity({ name: 'work_order_history' })
@Index('idx_wo_history_work_order', ['workOrder'])
export class WorkOrderHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  event: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => WorkOrder, (workOrder) => workOrder.workOrderHistory)
  @JoinColumn({ name: 'work_order_id' })
  workOrder: WorkOrder;

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
