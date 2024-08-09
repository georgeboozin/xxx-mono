import { Module } from '@nestjs/common';
import { PaymentSystemModule } from '@/services/payment-system/payment-system.module';
import { ProductUseCases } from './product.use-case';

@Module({
  imports: [PaymentSystemModule],
  providers: [ProductUseCases],
  exports: [ProductUseCases],
})
export class ProductUseCasesModule {}
