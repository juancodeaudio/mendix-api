import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'src/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { database } = configService;
        return {
          type: 'postgres',
          username: database.user,
          host: database.host,
          database: database.dbName,
          password: database.password,
          port: database.port,
          ssl: true,
          synchronize: false,
          autoLoadEntities: true
        }
      },
    })
  ],
  exports: [TypeOrmModule]
})
export class DatabaseModule {}
