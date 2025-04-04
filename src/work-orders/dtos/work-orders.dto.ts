import { IsDateString, IsNotEmpty, IsPositive } from 'class-validator';
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
}

export class UpdateWorkOrderDto extends PartialType(CreateWorkOrderDto) {}
