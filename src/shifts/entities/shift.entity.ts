import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Shift {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'time' })
    startTime: string;

    @Column({ type: 'time' })
    endTime: string;
}