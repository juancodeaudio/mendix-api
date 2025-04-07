import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { ProductsService } from '../services/products.service';
import { CreateProductDto, UpdateProductDto, ProductsQueryDto } from '../dtos/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List of products' })
  findAll(@Query() params: ProductsQueryDto) {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'One product by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  createProduct(@Body() payload: CreateProductDto) {
    return this.productsService.createProduct(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update product' })
  updateProduct(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateProductDto) {
    return this.productsService.updateProduct(id, payload);
  }

  @Put(':id/materials/:materialId')
  @ApiOperation({ summary: 'Add material to product' })
  addMaterialToProduct(
    @Param('id', ParseIntPipe) id: number,
    @Param('materialId', ParseIntPipe) materialId: number
  ) {
    return this.productsService.addMaterialToProduct(id, materialId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product' })
  removeProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.removeProduct(id);
  }

  @Delete(':id/materials/:materialId')
  @ApiOperation({ summary: 'Remove material from product' })
  removeMaterialFromProduct(
    @Param('id', ParseIntPipe) id: number,
    @Param('materialId', ParseIntPipe) materialId: number
  ) {
    return this.productsService.removeMaterialFromProduct(id, materialId);
  }
}
