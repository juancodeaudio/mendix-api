import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkOrderHistoryDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly userId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly workOrderId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly event: string;
}
