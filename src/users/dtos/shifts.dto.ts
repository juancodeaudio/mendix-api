import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateShiftDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly startTime: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly endTime: string;
}

export class UpdateShiftDto extends PartialType(CreateShiftDto) {}
