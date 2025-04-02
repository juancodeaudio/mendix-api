import { IsString, IsEmail, IsBoolean, IsNotEmpty } from 'class-validator';
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
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

