import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './controllers/app.controller';
import { AppService } from '@/services/app.service';
import { PaymentSystemModule } from '@/services/payment-system/payment-system.module';
import { CheckoutSessionUseCasesModule } from '@/use-cases/checkout-session/checkout-session-use-cases.module';
import { CheckoutSessionController } from '@/controllers/checkout-session.controller';
import { ConnectedAccountUseCasesModule } from './use-cases/connected-account/connected-account-use-cases.module';
import { ConnectedAccountController } from './controllers/connected-account.controller';
import { ProductController } from './controllers/product.controller';
import { ProductUseCasesModule } from './use-cases/product/product-use-cases.module';
import { LineItemController } from './controllers/line-item.controller';
import { LineItemUseCasesModule } from './use-cases/line-item/line-item-use-cases.module';
import { InvoiceController } from './controllers/invoice.controller';
import { InvoiceUseCasesModule } from './use-cases/invoice/invoice-use-cases.module';
import { InvoiceItemController } from './controllers/invoice-item.controller';
import { InvoiceItemUseCasesModule } from './use-cases/invoice-item/invoice-item-use-cases.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env.development',
    }),
    PaymentSystemModule,
    CheckoutSessionUseCasesModule,
    ConnectedAccountUseCasesModule,
    ProductUseCasesModule,
    LineItemUseCasesModule,
    InvoiceUseCasesModule,
    InvoiceItemUseCasesModule,
  ],
  controllers: [
    AppController,
    CheckoutSessionController,
    ConnectedAccountController,
    ProductController,
    LineItemController,
    InvoiceController,
    InvoiceItemController,
  ],
  providers: [AppService],
})
export class AppModule {}
