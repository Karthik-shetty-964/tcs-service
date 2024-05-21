import TaxEngineStrategy from './TaxEngineStrategy';
import getCommodityByProductTaxGroup from "../services/prodcutMappingService";
import { ProductMappingAttributes } from '../models/ProductMapping.model';
import xml2js from 'xml2js';

class OneSourceStrategy implements TaxEngineStrategy {
    async getTaxAmount(payload: any): Promise<any> {
        return await this.toTaxEngineRequestFormat(payload);
        // TODO : Connect with onesource and get the tax amount
    }

    async toTaxEngineRequestFormat(payload: any): Promise<any> {

        const jsonPayload  = {
            taxCalculationRequest : {
                $ : {
                    "xmlns" : "http://www.sabrix.com/services/taxcalculationservice/2011-09-01"
                },
                INDATA : {
                    $ : {
                        version : "G"
                    },
                    INVOICE : {
                        CALCULATION_DIRECTION : payload.calculationDirection,
                        COMPANY_ROLE : payload.companyRole,
                        CURRENCY_CODE : payload.currency,
                        DOCUMENT_TYPE : payload.documentType,
                        EXTERNAL_COMPANY_ID : payload.companyId,
                        FISCAL_DATE : payload.fiscalDate,
                        INVOICE_DATE : payload.invoiceDate,
                        INVOICE_NUMBER : payload.invoiceNumber,
                        VENDOR_TAX : payload.vendorTax,
                        IS_AUDITED : payload.isAudited,
                        IS_EXEMPT : payload.isExempt,
                        LINES : { // Structure needs to be confirmed
                            LINE : await Promise.all(payload.lines.map(async (line : any, index : number) => 
                                {
                                    const productTaxGroup : string = line.productCode;
                                    const productMappingData : ProductMappingAttributes[] = await getCommodityByProductTaxGroup(productTaxGroup);
                                    const commodityCode = productMappingData[0].commodity_code;
                                    return {
                                        $ : {
                                            ID : index // to be confirmed
                                        },
                                        LINE_NUMBER : index, //Not sure, to be confirmed
                                        CUSTOMER_NUMBER : payload.customerNumber,
                                        CUSTOMER_NAME : payload.customerName,
                                        VENDOR_NUMBER : payload.vendorNumber,
                                        VENDOR_NAME : payload.vendorName,
                                        DESCRIPTION : line.description,
                                        BILL_TO : {
                                            ADDRESS_1 : line.billTo.street,
                                            CITY : line.billTo.city,
                                            STATE : line.billTo.state,
                                            COUNTRY : line.billTo.country,
                                            POSTCODE : line.billTo.postalCode
                                        },
                                        SHIP_FROM : {
                                            ADDRESS_1 : line.shipFrom.street,
                                            CITY : line.shipFrom.city,
                                            STATE : line.shipFrom.state,
                                            COUNTRY : line.shipFrom.country,
                                            POSTCODE : line.shipFrom.postalCode
                                        },
                                        SHIP_TO : {
                                            ADDRESS_1 : line.shipTo.street,
                                            CITY : line.shipTo.street,
                                            STATE : line.shipTo.state,
                                            COUNTRY : line.shipTo.country,
                                            POSTCODE : line.shipTo.postalCode
                                        },
                                        TRANSACTION_TYPE : payload.transactionType,
                                        GROSS_AMOUNT : line.grossAmount,
                                        PRODUCT_CODE : line.productCode,
                                        COMMODITY_CODE : commodityCode,
                                        // REGISTRATIONS : {
                                        //     BUYER_ROLE : line.registrations.buyerRole, // not sure
                                        // },
                                        RELATED_LINE_NUMBER : line.relatedLineItemNumber
                                    }
                                }))
                        }
                    }
                }
            }
        };

        const builder = new xml2js.Builder();
        const xmlPayload = builder.buildObject(jsonPayload);
        return xmlPayload;
    }
}

export default OneSourceStrategy;
