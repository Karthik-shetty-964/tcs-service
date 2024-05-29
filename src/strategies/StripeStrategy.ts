import TaxEngineStrategy from "./TaxEngineStrategy";
const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY);

class StripeStrategy implements TaxEngineStrategy {
    async getTaxAmount(payload: any): Promise<any> {
        return this.toTaxEngineRequestFormat(payload);
    }

    async toTaxEngineRequestFormat(data: any): Promise<any> {
        const calculation = await stripe.tax.calculations.create({
            currency: data.currency,
            customer_details: {
              address: {
                line1: data.line1,
                city: data.city,
                state: data.state,
                postal_code: data.postal_code,  
                country: data.country,
              },
              address_source: data.address_type,
            },
            line_items: [
              {
                amount: data.amount,
                tax_code: 'txcd_10000000',
                reference: 'Music Streaming Coupon',
              }
            ],
            // shipping_cost: {
            //   amount: 200,
            // },
            expand: ['line_items'],
        });

        return calculation;
    }
}

export default StripeStrategy;