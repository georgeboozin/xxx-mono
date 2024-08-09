export interface FormValues {
  productName: string;
  price: number;
  fee: number;
  connectedAccount: string;
  customer: string;
}

export function calcPrice(amount: number) {
  return amount / 100;
}

export function calcFee(fee?: number) {
  if (fee) {
    return fee / 100;
  }

  return 0;
}

export function calcLawyerRecieves(price: number, fee?: number) {
  if (fee) {
    return price - fee;
  }
  return price;
}
