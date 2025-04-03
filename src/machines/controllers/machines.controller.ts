import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { MachinesService } from '../services/machines.service';
import { CreateMachineDto, UpdateMachineDto } from '../dtos/machines.dto';

@Controller('machines')
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}

  @Get()
  @ApiOperation({ summary: 'List of machines' })
  findAll() {
    return this.machinesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'One machine by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this. machinesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new machine' })
  createMachine(@Body() payload: CreateMachineDto) {
    return this.machinesService.createMachine(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update machine' })
  updateMachine(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateMachineDto) {
    return this.machinesService.updateMachine(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete machine' })
  removeMachine(@Param('id', ParseIntPipe) id: number) {
    return this.machinesService.removeMachine(id);
  }
}
