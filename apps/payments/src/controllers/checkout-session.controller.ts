import { Controller, Post, Body } from '@nestjs/common';
import { CreateCheckoutSessionDto } from '@/core/dtos/checkout-session.dto';
import { CheckoutSessionUseCases } from '@/use-cases/checkout-session/checkout-session.use-case';

@Controller('api/checkout/session')
export class CheckoutSessionController {
  constructor(private checkoutSessionUseCases: CheckoutSessionUseCases) {}

  @Post()
  createCheckoutSession(
    @Body() createCheckoutSessionDto: CreateCheckoutSessionDto,
  ) {
    return this.checkoutSessionUseCases.createSession(createCheckoutSessionDto);
  }
}
