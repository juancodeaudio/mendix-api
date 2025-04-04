import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { Location } from './location.entity';
import { MachineStatus } from './machine-status.entity';

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
  
  @ManyToOne(() => MachineStatus, (status) => status.machine)
  machineStatus: MachineStatus;

  @ManyToOne(() => Location, (location) => location.machine)
  location: Location;

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
