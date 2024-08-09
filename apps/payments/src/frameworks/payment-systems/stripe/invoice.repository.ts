import { Injectable } from '@nestjs/common';
import { IGenericRepository } from '@/core/abstracts/generic-repository.abstract';
import { StripeAPIService } from './stripe-api.service';
import { Invoice } from '@/core/entites/invoice.entity';

@Injectable()
export class InvoiceRepository implements IGenericRepository<Invoice> {
  constructor(private stripe: StripeAPIService) {}

  async getAll(): Promise<Invoice[]> {
    const result = await this.stripe.getAllInvoices();
    const invoices = result.map(
      ({ id, account_name, customer_email, customer_name }) => ({
        id,
        accountName: account_name,
        customerEmail: customer_email,
        customerName: customer_name,
      }),
    );

    return invoices;
  }

  async get(id: string): Promise<Invoice> {
    const invoice = await this.stripe.getInvoice(id);

    return {
      id: invoice.id,
      accountName: invoice.account_name,
      customerEmail: invoice.customer_email,
      customerName: invoice.customer_name,
    };
  }
}
