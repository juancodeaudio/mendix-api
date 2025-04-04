import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly code: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly materialsIds: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

