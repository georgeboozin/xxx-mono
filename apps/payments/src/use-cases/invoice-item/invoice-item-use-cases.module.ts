import { Module } from '@nestjs/common';
import { PaymentSystemModule } from '@/services/payment-system/payment-system.module';
import { InvoiceItemUseCases } from './invoice-item.use-case';

@Module({
  imports: [PaymentSystemModule],
  providers: [InvoiceItemUseCases],
  exports: [InvoiceItemUseCases],
})
export class InvoiceItemUseCasesModule {}
