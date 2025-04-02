import { registerAs } from "@nestjs/config";

export default registerAs('config', () => {
  return {
    database: {
      url: process.env.DATABASE_URL,
      host: process.env.PGHOST,
      dbName: process.env.PGDATABASE,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      port: parseInt(process.env.PGPORT ?? '', 10)
    }
  }
})