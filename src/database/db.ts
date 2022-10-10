import { knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

export const db = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database:process.env.DB_NAME,
    user:   process.env.DB_USERNAME,
    password:  process.env.DB_PASSWORD
  },
  useNullAsDefault: true
});

