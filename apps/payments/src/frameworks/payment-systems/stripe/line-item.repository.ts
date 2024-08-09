import { Injectable } from '@nestjs/common';
import { IGenericRepository } from '@/core/abstracts/generic-repository.abstract';
import { StripeAPIService } from './stripe-api.service';
import { LineItem } from '@/core/entites/line-item.entity';

@Injectable()
export class LineItemRepository implements IGenericRepository<LineItem> {
  constructor(private stripe: StripeAPIService) {}

  async getAll(): Promise<LineItem[]> {
    const allProducts = await this.stripe.getAllProducts();

    const list = await Promise.all(
      allProducts.map(async ({ id, default_price }) => {
        const defaultPrice = String(default_price);
        const price = await this.stripe.getPrice(defaultPrice);

        const { fee } = price.metadata;

        return {
          productId: id,
          amount: price.unit_amount,
          fee: Number(fee),
          quantity: 1,
        };
      }),
    );

    return list;
  }

  async get(productId: string): Promise<LineItem> {
    const product = await this.stripe.getProduct(productId);
    const defaultPrice = String(product.default_price);
    const price = await this.stripe.getPrice(defaultPrice);
    const { fee } = price.metadata;

    return {
      productId: product.id,
      amount: price.unit_amount,
      fee: Number(fee),
      quantity: 1,
    };
  }

  async getAllBy(options: {
    stripeAccount: string;
    [key: string]: any;
  }): Promise<LineItem[]> {
    try {
      if (options.stripeAccount) {
        const allProducts = await this.stripe.getAllProducts(
          {},
          { stripeAccount: options.stripeAccount },
        );

        const lineItems = await Promise.all(
          allProducts.map(async ({ id, default_price }) => {
            const defaultPrice = String(default_price);
            const price = await this.stripe.getPrice(
              defaultPrice,
              {},
              { stripeAccount: options.stripeAccount },
            );

            const { fee } = price.metadata;

            return {
              productId: id,
              amount: price.unit_amount,
              fee: Number(fee),
              quantity: 1,
            };
          }),
        );

        return lineItems;
      } else {
        return [];
      }
    } catch (err) {
      console.log('err', err);
    }
  }
}
