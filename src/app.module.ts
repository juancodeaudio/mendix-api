import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import config from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LocationsModule } from './locations/locations.module';
import { MachinesModule } from './machines/machines.module';
import { ProductsModule } from './products/products.module';
import { WorkOrdersModule } from './work-orders/work-orders.module';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [
    ConfigModule.forRoot({
     envFilePath: '.env',
     load: [config],
     isGlobal: true,
     validationSchema: Joi.object({
      DATABASE_URL: Joi.string().required(),
      PGHOST: Joi.string().required(),
      PGDATABASE: Joi.string().required(),
      PGUSER: Joi.string().required(),
      PGPASSWORD: Joi.string().required(),
      PGPORT: Joi.number().required()
     })
    }),
    UsersModule,
    LocationsModule,
    MachinesModule,
    // ProductsModule,
    // WorkOrdersModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
