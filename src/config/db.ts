import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'dentaldb',
  process.env.DB_USERNAME || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
        ca: fs.readFileSync(path.join(__dirname, '..', '..', 'certs', 'ap-southeast-2-bundle.pem')), // Corrected path
      },
    },
  }
);

export default sequelize;
