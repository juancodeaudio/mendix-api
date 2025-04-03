import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { RolesService } from '../services/roles.service';
import { CreateRoleDto, UpdateRoleDto } from '../dtos/roles.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiOperation({ summary: 'List of roles' })
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'One role by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this. rolesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new role' })
  createRole(@Body() payload: CreateRoleDto) {
    return this.rolesService.createRole(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update role' })
  updateRole(@Param('id') id: number, @Body() payload: UpdateRoleDto) {
    return this.rolesService.updateRole(+id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete role' })
  removeRole(@Param('id') id: number) {
    return this.rolesService.removeRole(+id);
  }
}
