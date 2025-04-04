import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from '../entities/material.entity';
import { CreateMaterialDto, UpdateMaterialDto } from '../dtos/materials.dto';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material) private materialRepo: Repository<Material>
  ) {}

  findAll() {
    return this.materialRepo.find();
  }

  async findOne(id: number) {
    const material = await this.materialRepo.findOne({
      where: { id },
    });
    if (!material) {
      throw new NotFoundException(`Material #${id} not found`);
    }
    return material;
  }

  createMaterial(data: CreateMaterialDto) {
    const newMaterial = this.materialRepo.create(data);
    return this.materialRepo.save(newMaterial);
  }

  async updateMaterial(id: number, changes: UpdateMaterialDto) {
    const material = await this.materialRepo.findOneBy({ id });
    if (!material) {
      throw new NotFoundException(`Material #${id} not found`);
    }
    this.materialRepo.merge(material, changes);
    return this.materialRepo.save(material);
  }

  async removeMaterial(id: number) {
    const material = await this.materialRepo.findOneBy({ id });
    if (!material) {
      throw new NotFoundException(`Material #${id} not found`);
    }
    return this.materialRepo.delete(id);
  }
}
