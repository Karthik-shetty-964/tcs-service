import { Sequelize, DataTypes, Model, ModelDefined, Optional } from 'sequelize';

// Define the attributes for the ProductMapping model
export interface ProductMappingAttributes {
  id: number;
  division: string;
  project: string;
  legal_entity: string;
  product_tax_group: string;
  transaction_type: string;
  commodity_code: string;
}

// Define the attributes for creating a new ProductMapping instance
export interface ProductMappingCreationAttributes extends Optional<ProductMappingAttributes, 'id'> {}

// Define the ProductMapping model
const ProductMapping = (sequelize: Sequelize) => {
  return sequelize.define<Model<ProductMappingAttributes, ProductMappingCreationAttributes>>('ProductMapping', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    division: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    project: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    legal_entity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_tax_group: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transaction_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    commodity_code: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: 'product_commodity_mapping',
    timestamps: false,
  });
};

export default ProductMapping;
