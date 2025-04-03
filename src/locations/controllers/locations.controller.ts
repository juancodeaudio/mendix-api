import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { LocationsService } from '../services/locations.service';
import { CreateLocationDto, UpdateLocationDto } from '../dtos/locations.dto';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  @ApiOperation({ summary: 'List of locations' })
  findAll() {
    return this.locationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'One location by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this. locationsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new location' })
  createLocation(@Body() payload: CreateLocationDto) {
    return this.locationsService.createLocation(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update location' })
  updateLocation(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateLocationDto) {
    return this.locationsService.updateLocation(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete location' })
  removeLocation(@Param('id', ParseIntPipe) id: number) {
    return this.locationsService.removeLocation(id);
  }
}
