import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shift } from '../entities/shift.entity';
import { CreateShiftDto, UpdateShiftDto } from '../dtos/shifts.dto';

@Injectable()
export class ShiftsService {
  constructor(
    @InjectRepository(Shift) private shiftRepo: Repository<Shift>
  ) {}

  findAll() {
    return this.shiftRepo.find();
  }

  async findOne(id: number) {
    const shift = await this.shiftRepo.findOneBy({ id });
    if (!shift) {
      throw new NotFoundException(`Shift #${id} not found`);
    }
    return shift;
  }

  createShift(data: CreateShiftDto) {
    const newShift = this.shiftRepo.create(data);
    return this.shiftRepo.save(newShift);
  }

  async updateShift(id: number, changes: UpdateShiftDto) {
    const shift = await this.shiftRepo.findOneBy({ id });
    if (!shift) {
      throw new NotFoundException(`Shift #${id} not found`);
    }
    this.shiftRepo.merge(shift, changes);
    return this.shiftRepo.save(shift);
  }

  async removeShift(id: number) {
    const shift = await this.shiftRepo.findOneBy({ id });
    if (!shift) {
      throw new NotFoundException(`Shift #${id} not found`);
    }
    return this.shiftRepo.delete(id);
  }
}
