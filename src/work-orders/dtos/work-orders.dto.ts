import { IsDateString, IsNotEmpty, IsPositive, IsArray } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateWorkOrderDto {
  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  endDate: string;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  userId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly workOrderStatusId: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly machinesIds: number[];
}

export class UpdateWorkOrderDto extends PartialType(CreateWorkOrderDto) {}
