import { IsString, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateMachineDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly type: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly levelId: string;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly machineStatusId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly locationId: number;
}

export class UpdateMachineDto extends PartialType(CreateMachineDto) {}

