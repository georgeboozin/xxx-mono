import { Injectable } from '@nestjs/common';
import { IPaymentSystem } from '@/core/abstracts/payment-system.abstract';
import { ConnectedAccount } from '@/core/entites/connected-account.entity';
import { Product } from '@/core/entites/product.entity';
import { LineItem } from '@/core/entites/line-item.entity';
import { Customer } from '@/core/entites/customer.entity';

@Injectable()
export class ConnectedAccountUseCases {
  constructor(private paymentSystem: IPaymentSystem) {}

  getAllAccounts(): Promise<ConnectedAccount[]> {
    return this.paymentSystem.connectedAccount.getAll();
  }

  getAllProducts(stripeAccount: string): Promise<Product[]> {
    return this.paymentSystem.product.getAllBy({ stripeAccount });
  }

  getAllLineItems(stripeAccount: string): Promise<LineItem[]> {
    return this.paymentSystem.lineItem.getAllBy({ stripeAccount });
  }

  getAllCustomers(stripeAccount: string): Promise<Customer[]> {
    return this.paymentSystem.customer.getAllBy({ stripeAccount });
  }
}
