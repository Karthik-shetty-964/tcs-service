import OneSourceStrategy from '../strategies/OneSourceStrategy';
import AvalaraStrategy from '../strategies/AvalaraStrategy';
import getTaxConfigById from "../services/taxConfigService";
import {TaxConfigAttributes} from '../models/TaxConfig.model';

class TaxService {
  private strategies: { [key: string]: OneSourceStrategy | AvalaraStrategy };

  constructor() {
    this.strategies = {
      ONESOURCE: new OneSourceStrategy(),
      AVALARA: new AvalaraStrategy(),
    };
  }

  async processTaxEngine(jsonData: any): Promise<any> {
    try {
      const engineId : number = jsonData.tax_engine_id;
      const taxConfigData : TaxConfigAttributes = await getTaxConfigById(engineId);
      const taxEngineName : string = taxConfigData.tax_engine;
      const strategy : any = this.strategies[taxEngineName];

      if (!strategy) {
        throw new Error(`No strategy found for tax engine: ${taxEngineName}`);
      }

      return await strategy.getTaxAmount(jsonData);
    } catch (error : any) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('Something went wrong');
        }
    }
  }
}

export default new TaxService();
