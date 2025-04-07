import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { Material } from '../entities/material.entity';
import { CreateProductDto, UpdateProductDto, ProductsQueryDto } from '../dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Material) private materialRepo: Repository<Material>
  ) {}

  findAll(params?: ProductsQueryDto) {
    if (params?.limit && params?.offset) {
      return this.productRepo.find({
        relations: ['materials'],
        take: params.limit,
        skip: params.offset,
      });
    }
    return this.productRepo.find();
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['materials'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async createProduct(data: CreateProductDto) {
    const newProduct = this.productRepo.create(data);
    if (data.materialsIds && data.materialsIds.length === 0) {
      newProduct.materials = [];
    } else if (data.materialsIds) {
      const materials = await this.materialRepo.findBy({ id: In(data.materialsIds) });
      if (materials.length !== data.materialsIds.length) {
        const notFoundIds = data.materialsIds.filter((id) => !materials.some((mat) => mat.id === id));
        throw new NotFoundException(`Some materials not found - Count: ${notFoundIds.length} - Ids: ${notFoundIds.join(', ')}`);
      }
      newProduct.materials = materials;
    }
    return this.productRepo.save(newProduct);
  }

  async updateProduct(id: number, changes: UpdateProductDto) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    if (changes.materialsIds) {
      const materials = await this.materialRepo.findBy({ id: In(changes.materialsIds) });
      product.materials = materials;
    }
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  async removeMaterialFromProduct(id: number, materialId: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['materials'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    
    if (!product.materials.some((mat) => mat.id === materialId)) {
      throw new NotFoundException(`Material #${materialId} not found in Product #${id}`);
    }

    product.materials = product.materials.filter((mat) => mat.id !== materialId);
    return this.productRepo.save(product);
  }

  async addMaterialToProduct(id: number, materialId: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['materials'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    if (product.materials.some((mat) => mat.id === materialId)) {
      throw new NotFoundException(`Material #${materialId} already exists in Product #${id}`);
    }
    const material = await this.materialRepo.findOneBy({ id: materialId });
    if (!material) {
      throw new NotFoundException(`Material #${materialId} not found`);
    }

    product.materials.push(material);
    return this.productRepo.save(product);
  }

  async removeProduct(id: number) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return this.productRepo.delete(id);
  }
}
