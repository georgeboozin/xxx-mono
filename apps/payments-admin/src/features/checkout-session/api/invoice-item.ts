import { BASE_API_URL } from "@/shared/constants";
import { FormValues } from "../lib/form";

interface CreateInvoiceItemDTO {
  stripeAccount: string;
  customerId: string;
  productId: string;
  amount: number;
  invoiceId: string;
}

interface CreateInvoiceItemResponseDTO {
  id: string;
  amount: number;
  customerId: string;
  invoiceId: string;
}

export async function createInvoiceItem(
  { price, connectedAccount, customer, productName }: FormValues,
  invoiceId: string,
): Promise<CreateInvoiceItemResponseDTO | undefined> {
  const payload: CreateInvoiceItemDTO = {
    stripeAccount: connectedAccount,
    customerId: customer,
    productId: productName,
    invoiceId,
    amount: price * 100,
  };

  try {
    const response = await fetch(`${BASE_API_URL}/api/invoice-item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });
    const result: CreateInvoiceItemResponseDTO = await response.json();
    return result;
  } catch (err) {
    console.log("error", err);
  }
}
