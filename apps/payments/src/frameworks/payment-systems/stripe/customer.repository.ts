import { Injectable } from '@nestjs/common';
import { IGenericRepository } from '@/core/abstracts/generic-repository.abstract';
import { StripeAPIService } from './stripe-api.service';
import { Customer } from '@/core/entites/customer.entity';
import Stripe from 'stripe';

@Injectable()
export class CustomerRepository implements IGenericRepository<Customer> {
  constructor(private stripe: StripeAPIService) {}

  async getAll(): Promise<Customer[]> {
    const result = await this.stripe.getAllCustomers();
    const customers = result.map(({ id, name, email }) => ({
      id,
      name,
      email,
    }));

    return customers;
  }

  async get(id: string): Promise<Customer> {
    const customer = await this.stripe.getCustomer(id);
    if (customer.deleted) {
      return { id: customer.id, name: '', email: '' };
    }

    const { name, email } = customer as Stripe.Customer;
    return {
      id: customer.id,
      name,
      email,
    };
  }

  async getAllBy(options: {
    stripeAccount: string;
    [key: string]: any;
  }): Promise<Customer[]> {
    try {
      if (options.stripeAccount) {
        const result = await this.stripe.getAllCustomers(
          {},
          { stripeAccount: options.stripeAccount },
        );

        const customers = result.map(({ id, name, email }) => ({
          id,
          name,
          email,
        }));

        return customers;
      } else {
        return [];
      }
    } catch (err) {
      console.log('err', err);
    }
  }
}
