import db from '../config/db.config';
import { TaxConfigAttributes } from '../models/TaxConfig.model'; // Ensure this is exported from the model file

const TaxConfig = db.TaxConfig as any;

const getTaxConfigById = async (id: number): Promise<TaxConfigAttributes> => {
  try {
    const taxConfig = await TaxConfig.findByPk(id);
    if (!taxConfig) {
      throw new Error('Invalid Tax Engine Id');
    }
    return taxConfig;   
  } catch (error : any) {
    if (error instanceof Error) {
        throw new Error(error.message);
    } else {
        throw new Error('Something went wrong');
    }
  }
};

export default getTaxConfigById;
