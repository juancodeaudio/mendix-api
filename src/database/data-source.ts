import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: parseInt(process.env.PGPORT ?? '', 10),
    ssl: true,
    synchronize: false,
    logging: false,
    migrations: ['src/database/migrations/*.ts'],
    migrationsTableName: 'migrations',
    entities: ['src/**/*.entity.ts']
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;