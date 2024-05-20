import { Sequelize, DataTypes, Model, ModelDefined, Optional } from 'sequelize';

// Define the attributes for the TaxConfig model
export interface TaxConfigAttributes {
  id: number;
  tax_engine: string;
}

// Define the attributes for creating a new TaxConfig instance
export interface TaxConfigCreationAttributes extends Optional<TaxConfigAttributes, 'id'> {}

// Define the TaxConfig model
const TaxConfig = (sequelize: Sequelize) => {
  return sequelize.define<Model<TaxConfigAttributes, TaxConfigCreationAttributes>>('TaxConfig', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tax_engine: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'tax_config',
    timestamps: false,
  });
};

export default TaxConfig;
