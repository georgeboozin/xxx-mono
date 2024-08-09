import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { StripeService } from './stripe.service';
import { IPaymentSystem } from '@/core/abstracts/payment-system.abstract';
import { StripeAPIService } from './stripe-api.service';
import { ProductRepository } from './product.repository';
import { ConnectedAccountRepository } from './connected-account.repository';
import { LineItemRepository } from './line-item.repository';
import { CustomerRepository } from './customer.repository';
import { InvoiceRepository } from './invoice.repository';
import { InvoiceItemRepository } from './invoice-item.repository';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: IPaymentSystem,
      useClass: StripeService,
    },
    {
      provide: 'STRIPE_API_KEY',
      useFactory: async (configService: ConfigService) =>
        configService.get('STRIPE_API_KEY'),
      inject: [ConfigService],
    },
    StripeAPIService,
    ProductRepository,
    ConnectedAccountRepository,
    LineItemRepository,
    CustomerRepository,
    InvoiceRepository,
    InvoiceItemRepository,
  ],
  exports: [IPaymentSystem],
})
export class StripeModule {}
