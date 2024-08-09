import { Module } from '@nestjs/common';
import { StripeModule } from '@/frameworks/payment-systems/stripe/stripe.module';

@Module({
  imports: [StripeModule],
  exports: [StripeModule],
})
export class PaymentSystemModule {}
