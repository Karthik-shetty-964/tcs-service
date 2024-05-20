import { Sequelize, DataTypes, Dialect } from 'sequelize';
import 'dotenv/config';
import TaxConfig from '../models/TaxConfig.model';
import ProductMapping from '../models/ProductMapping.model';

// Create a new Sequelize instance with database connection information from environment variables
const sequelize = new Sequelize(
  process.env.DB_DATABASE as string,
  process.env.DB_USERNAME as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT as Dialect,
  }
);

// Define a type for the db object
interface DbType {
  Sequelize: typeof Sequelize;
  sequelize: Sequelize;
  TaxConfig?: ReturnType<typeof TaxConfig>;
  ProductMapping?: ReturnType<typeof ProductMapping>;
}

// Initialize the db object with Sequelize and sequelize instances
const db: DbType = {
  Sequelize,
  sequelize,
};

// Import models
db.TaxConfig = TaxConfig(sequelize);
db.ProductMapping = ProductMapping(sequelize);

export default db;
