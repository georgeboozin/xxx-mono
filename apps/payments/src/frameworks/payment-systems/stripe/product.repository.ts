import { Injectable } from '@nestjs/common';
import { IGenericRepository } from '@/core/abstracts/generic-repository.abstract';
import { StripeAPIService } from './stripe-api.service';
import { Product } from '@/core/entites/product.entity';

@Injectable()
export class ProductRepository implements IGenericRepository<Product> {
  constructor(private stripe: StripeAPIService) {}

  async getAll(): Promise<Product[]> {
    const result = await this.stripe.getAllProducts();
    const products = result.map(({ id, name, default_price }) => ({
      id,
      name,
      priceId: String(default_price),
    }));

    return products;
  }

  async get(id: string): Promise<Product> {
    const product = await this.stripe.getProduct(id);
    return {
      id: product.id,
      name: product.name,
      priceId: String(product.default_price),
    };
  }

  async getAllBy(options: {
    stripeAccount: string;
    [key: string]: any;
  }): Promise<Product[]> {
    try {
      if (options.stripeAccount) {
        const result = await this.stripe.getAllProducts(
          {},
          { stripeAccount: options.stripeAccount },
        );

        const products = result.map(({ id, name, default_price }) => ({
          id,
          name,
          priceId: String(default_price),
        }));

        return products;
      } else {
        return [];
      }
    } catch (err) {
      console.log('err', err);
    }
  }
}
