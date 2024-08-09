import { Module } from '@nestjs/common';
import { PaymentSystemModule } from '@/services/payment-system/payment-system.module';
import { LineItemUseCases } from './line-item.use-case';

@Module({
  imports: [PaymentSystemModule],
  providers: [LineItemUseCases],
  exports: [LineItemUseCases],
})
export class LineItemUseCasesModule {}
