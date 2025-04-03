import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { ShiftsService } from '../services/shifts.service';
import { CreateShiftDto, UpdateShiftDto } from '../dtos/shifts.dto';

@Controller('shifts')
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  @Get()
  @ApiOperation({ summary: 'List of shifts' })
  findAll() {
    return this.shiftsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'One shift by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shiftsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new shift' })
  createShift(@Body() payload: CreateShiftDto) {
    return this.shiftsService.createShift(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update shift' })
  updateShift(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateShiftDto) {
    return this.shiftsService.updateShift(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete shift' })
  removeShift(@Param('id', ParseIntPipe) id: number) {
    return this.shiftsService.removeShift(id);
  }
}
