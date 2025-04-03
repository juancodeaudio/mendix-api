import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Shift } from 'src/shifts/entities/shift.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { RolesController } from './controllers/roles.controller';
import { RolesService } from './services/roles.service';
import { ShiftsModule } from 'src/shifts/shifts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Shift]),
    ShiftsModule
  ],
  controllers: [UsersController, RolesController],
  providers: [UsersService, RolesService]
})
export class UsersModule {}