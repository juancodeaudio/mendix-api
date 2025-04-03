import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Shift } from './entities/shift.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { RolesController } from './controllers/roles.controller';
import { RolesService } from './services/roles.service';
import { ShiftsController } from './controllers/shifts.controller';
import { ShiftsService } from './services/shifts.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Shift])],
  controllers: [UsersController, RolesController, ShiftsController],
  providers: [UsersService, RolesService, ShiftsService]
})
export class UsersModule {}