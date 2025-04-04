import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './entities/product.entity';
import { Material } from './entities/material.entity';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { MaterialsController } from './controllers/materials.controller';
import { MaterialsService } from './services/materials.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Material])],
  controllers: [ProductsController, MaterialsController],
  providers: [ProductsService, MaterialsService]
})
export class ProductsModule {}
