import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { CreateRoleDto, UpdateRoleDto } from '../dtos/roles.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepo: Repository<Role>
  ) {}

  findAll() {
    return this.roleRepo.find();
  }

  async findOne(id: number) {
    const role = await this.roleRepo.findOneBy({ id });
    if (!role) {
      throw new NotFoundException(`Role #${id} not found`);
    }
    return role;
  }

  createRole(data: CreateRoleDto) {
    const newRole = this.roleRepo.create(data);
    return this.roleRepo.save(newRole);
  }

  async updateRole(id: number, changes: UpdateRoleDto) {
    const role = await this.roleRepo.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException(`Role #${id} not found`);
    }
    this.roleRepo.merge(role, changes);
    return this.roleRepo.save(role);
  }

  async removeRole(id: number) {
    const role = await this.roleRepo.findOneBy({ id });
    if (!role) {
      throw new NotFoundException(`Role #${id} not found`);
    }
    return this.roleRepo.delete(id);
  }
}
