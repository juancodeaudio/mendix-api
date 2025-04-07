import { IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateWorkOrderProductsDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly workOrderId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly productId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly quantity: number;
}

export class UpdateWorkOrderProductsDto extends PartialType(CreateWorkOrderProductsDto) {}
