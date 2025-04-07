import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { WorkOrderProductsService } from '../services/work-order-products.service';
import { CreateWorkOrderProductsDto, UpdateWorkOrderProductsDto } from '../dtos/work-order-products.dto';

@Controller('work-order-products')
export class WorkOrderProductsController {
  constructor(private readonly workOrderproductsService: WorkOrderProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new work order-product relation' })
  createWorkOrderProduct(@Body() payload: CreateWorkOrderProductsDto) {
    return this.workOrderproductsService.createWorkOrderProduct(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update work order-product relation' })
  updateWorkOrderProduct(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateWorkOrderProductsDto) {
    return this.workOrderproductsService.updateWorkOrderProduct(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete work order-product relation' })
  removeWorkOrderProduct(@Param('id', ParseIntPipe) id: number) {
    return this.workOrderproductsService.removeWorkOrderProduct(id);
  }
}
