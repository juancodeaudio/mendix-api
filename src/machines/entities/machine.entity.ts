import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

import { Location } from './location.entity';
import { MachineStatus } from './machine-status.entity';
import { WorkOrder } from '../../work-orders/entities/work-order.entity';

@Entity()
export class Machine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  type: string;

  @Column({ type: 'int' })
  levelId: number;
  
  @ManyToOne(() => MachineStatus, (status) => status.machines)
  machineStatus: MachineStatus;

  @ManyToOne(() => Location, (location) => location.machines)
  location: Location;

  @ManyToMany(() => WorkOrder, (workOrder) => workOrder.machines)
  workOrders: WorkOrder[];

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
