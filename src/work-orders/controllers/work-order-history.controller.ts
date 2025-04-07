import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { WorkOrderHistoryService } from '../services/work-order-history.service';
import { CreateWorkOrderHistoryDto } from '../dtos/work-order-history.dto';

@Controller('work-order-history')
export class WorkOrderHistoryController {
  constructor(private readonly workOrderHistoryService: WorkOrderHistoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new work order history event' })
  createWOHistoryEvent(@Body() payload: CreateWorkOrderHistoryDto) {
    return this.workOrderHistoryService.createWOHistoryEvent(payload);
  }
}
