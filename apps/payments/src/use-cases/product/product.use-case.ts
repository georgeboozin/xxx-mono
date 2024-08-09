import { Injectable } from '@nestjs/common';
import { IPaymentSystem } from '@/core/abstracts/payment-system.abstract';
import { Product } from '@/core/entites/product.entity';

@Injectable()
export class ProductUseCases {
  constructor(private paymentSystem: IPaymentSystem) {}

  getAllProducts(): Promise<Product[]> {
    return this.paymentSystem.product.getAll();
  }
}
