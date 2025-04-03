import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Shift } from './entities/shift.entity';
import { User } from 'src/users/entities/user.entity';
import { ShiftsController } from './controllers/shifts.controller';
import { ShiftsService } from './services/shifts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shift, User])],
  controllers: [ShiftsController],
  providers: [ShiftsService]
})
export class ShiftsModule {}
