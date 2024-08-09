import { Injectable } from '@nestjs/common';
import { CreateCheckoutSessionDto } from '@/core/dtos/checkout-session.dto';
import { CheckoutSession } from '@/core/entites/checkout-session.entity';
import { IPaymentSystem } from '@/core/abstracts/payment-system.abstract';

@Injectable()
export class CheckoutSessionUseCases {
  constructor(private paymentSystem: IPaymentSystem) {}

  createSession(
    createCheckoutSessionDto: CreateCheckoutSessionDto,
  ): Promise<CheckoutSession> {
    return this.paymentSystem.createCheckoutSession(createCheckoutSessionDto);
  }
}
