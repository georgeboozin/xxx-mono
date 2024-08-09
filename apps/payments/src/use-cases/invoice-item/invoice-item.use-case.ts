import { Injectable } from '@nestjs/common';
import { IPaymentSystem } from '@/core/abstracts/payment-system.abstract';
import { CreateInvoiceItemDto } from '@/core/dtos/invoice-item.dto';
import { InvoiceItem } from '@/core/entites/invoice-item.entity';

@Injectable()
export class InvoiceItemUseCases {
  constructor(private paymentSystem: IPaymentSystem) {}

  create(createInvoiceItemDto: CreateInvoiceItemDto): Promise<InvoiceItem> {
    return this.paymentSystem.createInvoiceItem(createInvoiceItemDto);
  }
}
