import { BASE_API_URL } from "@/shared/constants";

interface LineItem {
  productId: string;
  amount: number;
  fee: number;
}

interface CreateCheckoutSessionDTO {
  stripeAccount: string;
  lineItems: LineItem[];
}

interface CreateCheckoutSessionResponseDTO {
  id: string;
  success_url: string;
  url: string;
}

interface FormFieldValues {
  productName: string;
  price: number;
  fee: number;
  connectedAccount: string;
}

export async function createCheckoutSession({
  productName,
  price,
  fee,
  connectedAccount,
}: FormFieldValues) {
  const payload: CreateCheckoutSessionDTO = {
    stripeAccount: connectedAccount,
    lineItems: [
      {
        productId: productName,
        amount: price * 100,
        fee: fee * 100,
      },
    ],
  };

  try {
    const response = await fetch(`${BASE_API_URL}/api/checkout/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });
    const result: CreateCheckoutSessionResponseDTO = await response.json();
    return result;
  } catch (err) {
    console.log("error", err);
  }
}
