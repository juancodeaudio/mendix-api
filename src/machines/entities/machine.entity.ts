import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
} from 'typeorm';

import { Location } from './location.entity';
import { MachineStatus } from './machine-status.entity';
import { WorkOrder } from '../../work-orders/entities/work-order.entity';

@Entity({ name: 'machines' })
export class Machine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  type: string;

  @Column({ type: 'int', name: 'level_id' })
  levelId: number;
  
  @ManyToOne(() => MachineStatus, (status) => status.machines)
  @JoinColumn({ name: 'machine_status_id' })
  machineStatus: MachineStatus;

  @ManyToOne(() => Location, (location) => location.machines)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @ManyToMany(() => WorkOrder, (workOrder) => workOrder.machines)
  workOrders: WorkOrder[];

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
