import { Stripe } from 'stripe';

export function mergeToStripeLineItem(
  amount: number,
  product: Stripe.Product,
  price: Stripe.Price,
): Stripe.Checkout.SessionCreateParams.LineItem {
  return {
    price_data: {
      currency: price.currency,
      product_data: {
        name: product.name,
      },
      unit_amount: amount,
    },
    quantity: 1,
  };
}
