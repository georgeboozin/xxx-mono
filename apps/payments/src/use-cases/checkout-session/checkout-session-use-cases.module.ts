import { Module } from '@nestjs/common';
import { PaymentSystemModule } from '@/services/payment-system/payment-system.module';
import { CheckoutSessionUseCases } from './checkout-session.use-case';

@Module({
  imports: [PaymentSystemModule],
  providers: [CheckoutSessionUseCases],
  exports: [CheckoutSessionUseCases],
})
export class CheckoutSessionUseCasesModule {}
