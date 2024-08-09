import { Injectable } from '@nestjs/common';
import { IPaymentSystem } from '@/core/abstracts/payment-system.abstract';
import { LineItem } from '@/core/entites/line-item.entity';

@Injectable()
export class LineItemUseCases {
  constructor(private paymentSystem: IPaymentSystem) {}

  getAllLineItems(): Promise<LineItem[]> {
    return this.paymentSystem.lineItem.getAll();
  }
}
