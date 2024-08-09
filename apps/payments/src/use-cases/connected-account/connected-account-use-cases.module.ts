import { Module } from '@nestjs/common';
import { PaymentSystemModule } from '@/services/payment-system/payment-system.module';
import { ConnectedAccountUseCases } from './connected-account.use-case';

@Module({
  imports: [PaymentSystemModule],
  providers: [ConnectedAccountUseCases],
  exports: [ConnectedAccountUseCases],
})
export class ConnectedAccountUseCasesModule {}
