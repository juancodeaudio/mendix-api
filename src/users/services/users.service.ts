import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { Shift } from '../entities/shift.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Role) private rolesRepo: Repository<Role>,
    @InjectRepository(Shift) private shiftsRepo: Repository<Shift>,
  ) {}

  findAll() {
    return this.userRepo.find({
      relations: ['role', 'shift'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['role', 'shift', 'workOrders'],
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async createUser(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    if (data.roleId) {
      const role = await this.rolesRepo.findOne({ where: { id: data.roleId } });
      if (!role) {
        throw new NotFoundException(`Role #${data.roleId} not found`);
      }
      newUser.role = role;
    }
    if (data.shiftId !== undefined) {
      const shift = data.shiftId ? await this.shiftsRepo.findOne({ where: { id: data.shiftId } }) : null;
      if (data.shiftId && !shift) {
        throw new NotFoundException(`Shift #${data.shiftId} not found`);
      }
      newUser.shift = shift;
    }
    return this.userRepo.save(newUser);
  }

  async updateUser(id: number, changes: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    if (changes.roleId) {
      const role = await this.rolesRepo.findOne({ where: { id: changes.roleId } });
      if (!role) {
        throw new NotFoundException(`Role #${changes.roleId} not found`);
      }
      user.role = role;
    }
    if (changes.shiftId !== undefined) {
      const shift = changes.shiftId ? await this.shiftsRepo.findOne({ where: { id: changes.shiftId } }) : null;
      if (changes.shiftId && !shift) {
        throw new NotFoundException(`Shift #${changes.shiftId} not found`);
      }
      user.shift = shift;
    }
    this.userRepo.merge(user, changes);
    return this.userRepo.save(user);
  }

  async removeUser(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return this.userRepo.delete(id);
  }
}
