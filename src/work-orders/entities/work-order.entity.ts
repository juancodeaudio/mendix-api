import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { WorkOrderStatus } from './work-order-status.entity';
import { Machine } from '../../machines/entities/machine.entity';

@Entity()
export class WorkOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.workOrders)
  user: User;

  @Column({ type: 'timestamptz' })
  startDate: Date;

  @Column({ type: 'timestamptz' })
  endDate: Date;

  @ManyToOne(() => WorkOrderStatus, (status) => status.workOrders)
  workOrderStatus: WorkOrderStatus;

  @ManyToMany(() => Machine, (machine) => machine.workOrders)
  @JoinTable()
  machines: Machine[];

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
