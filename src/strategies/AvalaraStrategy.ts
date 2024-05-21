import TaxEngineStrategy from './TaxEngineStrategy';

class AvalaraStrategy implements TaxEngineStrategy {
    async getTaxAmount(payload: any): Promise<any> {
        return this.toTaxEngineRequestFormat(payload);
        // TODO : Connect with avalara and get tax amount
    }

    async toTaxEngineRequestFormat(data: any): Promise<any> {
        return "Tax data from AVALARA";
    }
}

export default AvalaraStrategy;
