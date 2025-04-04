import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { MaterialsService } from '../services/materials.service';
import { CreateMaterialDto, UpdateMaterialDto } from '../dtos/materials.dto';

@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Get()
  @ApiOperation({ summary: 'List of materials' })
  findAll() {
    return this.materialsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'One material by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.materialsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new material' })
  createMaterial(@Body() payload: CreateMaterialDto) {
    return this.materialsService.createMaterial(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update material' })
  updateMaterial(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateMaterialDto) {
    return this.materialsService.updateMaterial(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete material' })
  removeMaterial(@Param('id', ParseIntPipe) id: number) {
    return this.materialsService.removeMaterial(id);
  }
}
