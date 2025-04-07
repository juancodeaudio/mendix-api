import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { WorkOrder } from './work-order.entity';

@Entity()
@Index('idx_wo_history_work_order', ['workOrder'])
export class WorkOrderHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  event: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => WorkOrder, (workOrder) => workOrder.workOrderHistory)
  workOrder: WorkOrder;

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
