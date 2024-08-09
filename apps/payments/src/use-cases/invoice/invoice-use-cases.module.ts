import { Module } from '@nestjs/common';
import { PaymentSystemModule } from '@/services/payment-system/payment-system.module';
import { InvoiceUseCases } from './invoice.use-case';

@Module({
  imports: [PaymentSystemModule],
  providers: [InvoiceUseCases],
  exports: [InvoiceUseCases],
})
export class InvoiceUseCasesModule {}
