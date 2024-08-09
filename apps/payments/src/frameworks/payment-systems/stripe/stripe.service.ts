import { Injectable } from '@nestjs/common';
import { IPaymentSystem } from '@/core/abstracts/payment-system.abstract';
import { CreateCheckoutSessionDto } from '@/core/dtos/checkout-session.dto';
import { mergeToStripeLineItem } from './stripe.mapper';
import { ProductRepository } from './product.repository';
import { StripeAPIService } from './stripe-api.service';
import { ConnectedAccountRepository } from './connected-account.repository';
import { LineItemRepository } from './line-item.repository';
import {
  CreateInvoiceDto,
  FinalizeInvoiceDto,
  SendInvoiceDto,
} from '@/core/dtos/invoice.dto';
import { CustomerRepository } from './customer.repository';
import { InvoiceRepository } from './invoice.repository';
import { InvoiceItemRepository } from './invoice-item.repository';
import { Invoice } from '@/core/entites/invoice.entity';
import { CreateInvoiceItemDto } from '@/core/dtos/invoice-item.dto';
import { InvoiceItem } from '@/core/entites/invoice-item.entity';

@Injectable()
export class StripeService implements IPaymentSystem {
  constructor(
    private stripe: StripeAPIService,
    public connectedAccount: ConnectedAccountRepository,
    public product: ProductRepository,
    public lineItem: LineItemRepository,
    public customer: CustomerRepository,
    public invoice: InvoiceRepository,
    public invoiceItem: InvoiceItemRepository,
  ) {}

  async createCheckoutSession(
    createCheckoutSessionDto: CreateCheckoutSessionDto,
  ) {
    const list = await Promise.all(
      createCheckoutSessionDto.lineItems.map(
        async ({ productId, amount, fee }) => {
          const product = await this.stripe.getProduct(productId);
          const defaultPrice = String(product?.default_price);
          const price = await this.stripe.getPrice(defaultPrice);

          const lineItem = mergeToStripeLineItem(amount, product, price);

          return { lineItem, fee: Number(fee) };
        },
      ),
    );

    const lineItems = list.map(({ lineItem }) => lineItem);
    const fee = list.reduce((acc, cur) => {
      return acc + cur.fee;
    }, 0);

    return this.stripe.createCheckoutSession(
      lineItems,
      fee,
      createCheckoutSessionDto.stripeAccount,
    );
  }

  async createInvoice(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const invoice = await this.stripe.createInvoice(
      createInvoiceDto.customerId,
      createInvoiceDto.fee,
      createInvoiceDto.stripeAccount,
    );
    return invoice;
  }

  async createInvoiceItem(
    createInvoiceItemDto: CreateInvoiceItemDto,
  ): Promise<InvoiceItem> {
    try {
      const product = await this.stripe.getProduct(
        createInvoiceItemDto.productId,
        {},
        { stripeAccount: createInvoiceItemDto.stripeAccount },
      );
      const description = product.name;

      const invoiceItem = await this.stripe.createInvoiceItem(
        createInvoiceItemDto.customerId,
        description,
        createInvoiceItemDto.amount,
        createInvoiceItemDto.invoiceId,
        createInvoiceItemDto.stripeAccount,
      );
      return invoiceItem;
    } catch (err) {
      console.log('err', err);
    }
  }

  async finalizeInvoice(
    finalizeInvoiceDto: FinalizeInvoiceDto,
    id: string,
  ): Promise<Invoice> {
    const invoice = await this.stripe.finalizeInvoice(
      id,
      finalizeInvoiceDto.stripeAccount,
    );
    return invoice;
  }

  async sendInvoice(
    sendInvoiceDto: SendInvoiceDto,
    id: string,
  ): Promise<Invoice> {
    const invoice = await this.stripe.sendInvoice(
      id,
      sendInvoiceDto.stripeAccount,
    );
    return invoice;
  }
}
