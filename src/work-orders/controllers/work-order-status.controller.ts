import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { WorkOrderStatusService } from '../services/work-order-status.service';
import { CreateWorkOrderStatusDto, UpdateWorkOrderStatusDto } from '../dtos/work-order-status.dto';

@Controller('work-order-status')
export class WorkOrderStatusController {
  constructor(private readonly workOrderStatusService: WorkOrderStatusService) {}

  @Get()
  @ApiOperation({ summary: 'List of work order status' })
  findAll() {
    return this.workOrderStatusService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'One work order status by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.workOrderStatusService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new work order status' })
  createWorkOrderStatus(@Body() payload: CreateWorkOrderStatusDto) {
    return this.workOrderStatusService.createWorkOrderStatus(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update work order status' })
  updateWorkOrderStatus(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateWorkOrderStatusDto) {
    return this.workOrderStatusService.updateWorkOrderStatus(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete work order status' })
  removeWorkOrderStatus(@Param('id', ParseIntPipe) id: number) {
    return this.workOrderStatusService.removeWorkOrderStatus(id);
  }
}
