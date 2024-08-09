import { CheckoutSession } from '@/core/entites/checkout-session.entity';
import { CreateCheckoutSessionDto } from '../dtos/checkout-session.dto';
import { IGenericRepository } from './generic-repository.abstract';
import { ConnectedAccount } from '../entites/connected-account.entity';
import { Product } from '../entites/product.entity';
import { LineItem } from '../entites/line-item.entity';
import {
  CreateInvoiceDto,
  FinalizeInvoiceDto,
  SendInvoiceDto,
} from '../dtos/invoice.dto';
import { Invoice } from '../entites/invoice.entity';
import { Customer } from '../entites/customer.entity';
import { InvoiceItem } from '../entites/invoice-item.entity';
import { CreateInvoiceItemDto } from '../dtos/invoice-item.dto';

export abstract class IPaymentSystem {
  abstract connectedAccount: IGenericRepository<ConnectedAccount>;
  abstract product: IGenericRepository<Product>;
  abstract lineItem: IGenericRepository<LineItem>;
  abstract customer: IGenericRepository<Customer>;
  abstract invoice: IGenericRepository<Invoice>;
  abstract invoiceItem: IGenericRepository<InvoiceItem>;

  abstract createCheckoutSession(
    payload: CreateCheckoutSessionDto,
  ): Promise<CheckoutSession>;

  abstract createInvoice(payload: CreateInvoiceDto): Promise<Invoice>;
  abstract finalizeInvoice(
    payload: FinalizeInvoiceDto,
    id: string,
  ): Promise<Invoice>;
  abstract sendInvoice(payload: SendInvoiceDto, id: string): Promise<Invoice>;

  abstract createInvoiceItem(
    payload: CreateInvoiceItemDto,
  ): Promise<InvoiceItem>;
}
