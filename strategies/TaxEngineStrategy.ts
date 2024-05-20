interface TaxEngineStrategy {
    getTaxAmount(payload: any): Promise<any>;
    toTaxEngineRequestFormat(payload: any): Promise<any>;
}

export default TaxEngineStrategy;
