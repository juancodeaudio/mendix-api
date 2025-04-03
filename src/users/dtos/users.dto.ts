import { IsString, IsEmail, IsBoolean, IsNotEmpty, IsPositive, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  readonly isActive: boolean;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly roleId: number;

  @IsPositive()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly shiftId?: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

