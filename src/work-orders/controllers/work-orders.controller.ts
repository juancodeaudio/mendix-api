import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { WorkOrdersService } from '../services/work-orders.service';
import { CreateWorkOrderDto, UpdateWorkOrderDto } from '../dtos/work-orders.dto';

@Controller('work-orders')
export class WorkOrdersController {
  constructor(private readonly workOrderService: WorkOrdersService) {}

  @Get()
  @ApiOperation({ summary: 'List of work orders' })
  findAll() {
    return this.workOrderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'One work order by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.workOrderService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new work order' })
  createWorkOrder(@Body() payload: CreateWorkOrderDto) {
    return this.workOrderService.createWorkOrder(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update work order' })
  updateWorkOrder(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateWorkOrderDto) {
    return this.workOrderService.updateWorkOrder(id, payload);
  }

  @Put(':id/machines/:machineId')
  @ApiOperation({ summary: 'Add a machine to work order' })
  addMachineToWorkOrder(
    @Param('id', ParseIntPipe) id: number,
    @Param('machineId', ParseIntPipe) machineId: number
  ) {
    return this.workOrderService.addMachineToWorkOrder(id, machineId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete work order' })
  removeWorkOrder(@Param('id', ParseIntPipe) id: number) {
    return this.workOrderService.removeWorkOrder(id);
  }

  @Delete(':id/machines/:machineId')
  @ApiOperation({ summary: 'Remove a machine from work order' })
  removeMachineFromWorkOrder(
    @Param('id', ParseIntPipe) id: number,
    @Param('machineId', ParseIntPipe) machineId: number
  ) {
    return this.workOrderService.removeMachineFromWorkOrder(id, machineId);
  }
}
