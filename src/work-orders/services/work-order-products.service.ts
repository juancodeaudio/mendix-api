import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkOrderProduct } from '../entities/work-order-product.entity';
import { WorkOrder } from '../entities/work-order.entity';
import { Product } from '../../products/entities/product.entity';
import { CreateWorkOrderProductsDto, UpdateWorkOrderProductsDto } from '../dtos/work-order-products.dto';

@Injectable()
export class WorkOrderProductsService {
  constructor(
    @InjectRepository(WorkOrderProduct) private readonly workOrderProductRepo: Repository<WorkOrderProduct>,
    @InjectRepository(WorkOrder) private readonly workOrderRepo: Repository<WorkOrder>,
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
  ) {}

  async createWorkOrderProduct(data: CreateWorkOrderProductsDto) {
    const workOrder = await this.workOrderRepo.findOneBy({ id: data.workOrderId });
    if (!workOrder) {
      throw new NotFoundException(`Work Order #${data.workOrderId} not found`);
    }

    const product = await this.productRepo.findOneBy({ id: data.productId });
    if (!product) {
      throw new NotFoundException(`Product #${data.productId} not found`);
    }

    const newWorkOrderProduct = new WorkOrderProduct();
    newWorkOrderProduct.workOrder = workOrder;
    newWorkOrderProduct.product = product;
    newWorkOrderProduct.quantity = data.quantity;

    return this.workOrderProductRepo.save(newWorkOrderProduct);
  }

  async updateWorkOrderProduct(id: number, changes: UpdateWorkOrderProductsDto) {
    const workOrderProduct = await this.workOrderProductRepo.findOneBy({ id });
    if (!workOrderProduct) {
      throw new NotFoundException(`Work Order Product #${id} not found`);
    }

    if (changes.workOrderId) {
      const workOrder = await this.workOrderRepo.findOneBy({ id: changes.workOrderId });
      if (!workOrder) {
        throw new NotFoundException(`Work Order #${changes.workOrderId} not found`);
      }
      workOrderProduct.workOrder = workOrder;
    }

    if (changes.productId) {
      const product = await this.productRepo.findOneBy({ id: changes.productId });
      if (!product) {
        throw new NotFoundException(`Product #${changes.productId} not found`);
      }
      workOrderProduct.product = product;
    }

    this.workOrderProductRepo.merge(workOrderProduct, changes);
    return this.workOrderProductRepo.save(workOrderProduct);
  }

  async removeWorkOrderProduct(id: number) {
    const workOrderProduct = await this.workOrderProductRepo.findOneBy({ id });
    if (!workOrderProduct) {
      throw new NotFoundException(`Work Order Product #${id} not found`);
    }
    return this.workOrderProductRepo.remove(workOrderProduct);
  }
}
