import { Injectable } from '@nestjs/common';
import { IPaymentSystem } from '@/core/abstracts/payment-system.abstract';
import {
  CreateInvoiceDto,
  FinalizeInvoiceDto,
  SendInvoiceDto,
} from '@/core/dtos/invoice.dto';
import { Invoice } from '@/core/entites/invoice.entity';

@Injectable()
export class InvoiceUseCases {
  constructor(private paymentSystem: IPaymentSystem) {}

  create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    return this.paymentSystem.createInvoice(createInvoiceDto);
  }

  finalize(
    finalizeInvoiceDto: FinalizeInvoiceDto,
    id: string,
  ): Promise<Invoice> {
    return this.paymentSystem.finalizeInvoice(finalizeInvoiceDto, id);
  }

  send(sendInvoiceDto: SendInvoiceDto, id: string): Promise<Invoice> {
    return this.paymentSystem.sendInvoice(sendInvoiceDto, id);
  }
}
