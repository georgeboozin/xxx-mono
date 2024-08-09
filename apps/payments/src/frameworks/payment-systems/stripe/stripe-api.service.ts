import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CheckoutSession } from '@/core/entites/checkout-session.entity';
import { Invoice } from '@/core/entites/invoice.entity';
import { InvoiceItem } from '@/core/entites/invoice-item.entity';

@Injectable()
export class StripeAPIService {
  instance: Stripe;

  constructor(@Inject('STRIPE_API_KEY') private readonly apiKey: string) {
    this.instance = new Stripe(this.apiKey);
  }

  async getAllPrices(): Promise<Stripe.Price[]> {
    const result = await this.instance.prices.list({
      limit: 100,
    });

    return result.data;
  }

  async getPrice(
    id: string,
    params: Stripe.PriceRetrieveParams = {},
    options: Stripe.RequestOptions = {},
  ): Promise<Stripe.Price> {
    const price = await this.instance.prices.retrieve(id, params, options);
    return price;
  }

  async getAllProducts(
    params: Stripe.ProductListParams = {},
    options: Stripe.RequestOptions = {},
  ): Promise<Stripe.Product[]> {
    const result = await this.instance.products.list(
      {
        limit: 100,
        ...params,
      },
      { ...options },
    );

    return result.data;
  }

  async getProduct(
    id: string,
    params: Stripe.ProductRetrieveParams = {},
    options: Stripe.RequestOptions = {},
  ): Promise<Stripe.Product> {
    const product = await this.instance.products.retrieve(id, params, options);
    return product;
  }

  async getAllCustomers(
    params: Stripe.CustomerListParams = {},
    options: Stripe.RequestOptions = {},
  ): Promise<Stripe.Customer[]> {
    const result = await this.instance.customers.list(
      {
        limit: 100,
        ...params,
      },
      { ...options },
    );

    return result.data;
  }
  async getCustomer(
    id: string,
    params: Stripe.CustomerRetrieveParams = {},
    options: Stripe.RequestOptions = {},
  ): Promise<Stripe.Customer | Stripe.DeletedCustomer> {
    const customer = await this.instance.customers.retrieve(
      id,
      params,
      options,
    );
    return customer;
  }

  async getAllInvoiceItems(
    params: Stripe.CustomerListParams = {},
    options: Stripe.RequestOptions = {},
  ): Promise<Stripe.InvoiceItem[]> {
    const result = await this.instance.invoiceItems.list(
      {
        limit: 100,
        ...params,
      },
      { ...options },
    );

    return result.data;
  }

  async getInvoiceItem(
    id: string,
    params: Stripe.CustomerRetrieveParams = {},
    options: Stripe.RequestOptions = {},
  ): Promise<Stripe.InvoiceItem> {
    const invoiceItem = await this.instance.invoiceItems.retrieve(
      id,
      params,
      options,
    );
    return invoiceItem;
  }

  async getAllInvoices(
    params: Stripe.CustomerListParams = {},
    options: Stripe.RequestOptions = {},
  ): Promise<Stripe.Invoice[]> {
    const result = await this.instance.invoices.list(
      {
        limit: 100,
        ...params,
      },
      { ...options },
    );

    return result.data;
  }

  async getInvoice(
    id: string,
    params: Stripe.CustomerRetrieveParams = {},
    options: Stripe.RequestOptions = {},
  ): Promise<Stripe.Invoice> {
    const invoiceItem = await this.instance.invoices.retrieve(
      id,
      params,
      options,
    );
    return invoiceItem;
  }

  async getAllConnectedAccounts(): Promise<Stripe.Account[]> {
    const result = await this.instance.accounts.list({
      limit: 100,
    });

    return result.data;
  }

  async getConnectedAccount(id: string): Promise<Stripe.Account> {
    const connectedAccount = await this.instance.accounts.retrieve(id);
    return connectedAccount;
  }

  async createCheckoutSession(
    lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
    fee: number,
    stripeAccount: string,
  ): Promise<CheckoutSession> {
    try {
      const sessionCreateParams: Stripe.Checkout.SessionCreateParams = {
        line_items: lineItems,
        payment_intent_data: {
          application_fee_amount: fee,
        },
        mode: 'payment',
        success_url: 'https://xxx.com/?session_id={CHECKOUT_SESSION_ID}',
      };
      const opts = {
        stripeAccount,
      };

      const session = await this.instance.checkout.sessions.create(
        sessionCreateParams,
        opts,
      );
      return {
        id: session.id,
        success_url: session.success_url,
        url: session.url,
      };
    } catch (e) {
      console.log('err', e);
    }
  }

  async createInvoice(
    customerId: string,
    fee: number,
    stripeAccount: string,
  ): Promise<Invoice> {
    try {
      const invoiceCreateParams: Stripe.InvoiceCreateParams = {
        customer: customerId,
        collection_method: 'send_invoice',
        days_until_due: 30,
        application_fee_amount: fee,
      };

      const opts = {
        stripeAccount,
      };

      const invoice = await this.instance.invoices.create(
        invoiceCreateParams,
        opts,
      );

      return {
        id: invoice.id,
        accountName: invoice.account_name,
        customerName: invoice.customer_name,
        customerEmail: invoice.customer_email,
      };
    } catch (err) {
      console.log('err', err);
    }
  }

  async createInvoiceItem(
    customerId: string,
    description: string,
    amount: number,
    invoiceId: string,
    stripeAccount: string,
  ): Promise<InvoiceItem> {
    try {
      const invoiceItemCreateParams: Stripe.InvoiceItemCreateParams = {
        customer: customerId,
        description,
        invoice: invoiceId,
        amount,
      };

      const opts = {
        stripeAccount,
      };

      const invoiceItem = await this.instance.invoiceItems.create(
        invoiceItemCreateParams,
        opts,
      );

      return {
        id: invoiceItem.id,
        amount: invoiceItem.amount,
        customerId: String(invoiceItem.customer),
        invoiceId: String(invoiceItem.invoice),
      };
    } catch (err) {
      console.log('err', err);
    }
  }

  async finalizeInvoice(
    invoiceId: string,
    stripeAccount: string,
  ): Promise<Invoice> {
    try {
      const invoice = await this.instance.invoices.finalizeInvoice(invoiceId, {
        stripeAccount,
      });

      return {
        id: invoice.id,
        accountName: invoice.account_name,
        customerName: invoice.customer_name,
        customerEmail: invoice.customer_email,
      };
    } catch (err) {
      console.log('err', err);
    }
  }

  async sendInvoice(
    invoiceId: string,
    stripeAccount: string,
  ): Promise<Invoice> {
    try {
      const invoice = await this.instance.invoices.sendInvoice(invoiceId, {
        stripeAccount,
      });

      return {
        id: invoice.id,
        accountName: invoice.account_name,
        customerName: invoice.customer_name,
        customerEmail: invoice.customer_email,
      };
    } catch (err) {
      console.log('err', err);
    }
  }
}
