import { Injectable } from '@nestjs/common';
import { IGenericRepository } from '@/core/abstracts/generic-repository.abstract';
import { StripeAPIService } from './stripe-api.service';
import { InvoiceItem } from '@/core/entites/invoice-item.entity';

@Injectable()
export class InvoiceItemRepository implements IGenericRepository<InvoiceItem> {
  constructor(private stripe: StripeAPIService) {}

  async getAll(): Promise<InvoiceItem[]> {
    const result = await this.stripe.getAllInvoiceItems();
    const invoiceItems = result.map(({ id, amount, customer, invoice }) => ({
      id,
      amount,
      customerId: String(customer),
      invoiceId: String(invoice),
    }));

    return invoiceItems;
  }

  async get(id: string): Promise<InvoiceItem> {
    const invoiceItem = await this.stripe.getInvoiceItem(id);

    return {
      id: invoiceItem.id,
      amount: invoiceItem.amount,
      customerId: String(invoiceItem.customer),
      invoiceId: String(invoiceItem.invoice),
    };
  }
}
