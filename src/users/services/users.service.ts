import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { RolesService } from './roles.service';
import { ShiftsService } from './shifts.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private rolesService: RolesService,
    private shiftsService: ShiftsService,
  ) {}

  findAll() {
    return this.userRepo.find({
      relations: ['role', 'shift'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['role', 'shift'],
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async createUser(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    if (data.roleId) {
      const role = await this.rolesService.findOne(data.roleId);
      newUser.role = role;
    }
    if (data.shiftId !== undefined) {
      const shift = data.shiftId ? await this.shiftsService.findOne(data.shiftId) : null;
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
      const role = await this.rolesService.findOne(changes.roleId);
      user.role = role;
    }
    if (changes.shiftId !== undefined) {
      const shift = changes.shiftId ? await this.shiftsService.findOne(changes.shiftId) : null;
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
