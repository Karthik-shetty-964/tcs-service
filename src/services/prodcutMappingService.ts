import { Model } from 'sequelize';
import db from '../config/db.config';
import { ProductMappingAttributes } from '../models/ProductMapping.model'; // Ensure this is exported from the model file

const ProductMapping = db.ProductMapping as any;

const getCommodityByProductTaxGroup = async (product_tax_group: string): Promise<ProductMappingAttributes[]> => {
  try {
    const productMappings = await ProductMapping.findAll({
      where: { product_tax_group },
    });

    if (productMappings.length === 0) {
      throw new Error('No product mappings found for the given product tax group');
    }

    return productMappings as ProductMappingAttributes[];
  } catch (error : any) {
    if (error instanceof Error) {
        throw new Error(error.message);
    } else {
        throw new Error('Something went wrong');
    }
  }
};

export default getCommodityByProductTaxGroup;
