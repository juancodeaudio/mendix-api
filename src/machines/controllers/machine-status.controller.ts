import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { MachineStatusService } from '../services/machine-status.service';
import { CreateMachineStatusDto, UpdateMachineStatusDto } from '../dtos/machine-status.dto';

@Controller('machine-status')
export class MachineStatusController {
  constructor(private readonly machineStatusService: MachineStatusService) {}

  @Get()
  @ApiOperation({ summary: 'List of machine status' })
  findAll() {
    return this.machineStatusService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'One machine status by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.machineStatusService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new machine status' })
  createMachineStatus(@Body() payload: CreateMachineStatusDto) {
    return this.machineStatusService.createMachineStatus(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update machine status' })
  updateMachineStatus(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateMachineStatusDto) {
    return this.machineStatusService.updateMachineStatus(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete machine status' })
  removeMachineStatus(@Param('id', ParseIntPipe) id: number) {
    return this.machineStatusService.removeMachineStatus(id);
  }
}
