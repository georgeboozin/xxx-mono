import { BASE_API_URL } from "@/shared/constants";
import { FormValues } from "../lib/form";

interface CreateInvoiceDTO {
  stripeAccount: string;
  customerId: string;
  fee: number;
}

interface CreateInvoiceResponseDTO {
  id: string;
  accountName: string;
  customerEmail: string;
  customerName: string;
}

export async function createInvoice({
  fee,
  connectedAccount,
  customer,
}: FormValues): Promise<CreateInvoiceResponseDTO | undefined> {
  const payload: CreateInvoiceDTO = {
    stripeAccount: connectedAccount,
    customerId: customer,
    fee: fee * 100,
  };

  try {
    const response = await fetch(`${BASE_API_URL}/api/invoice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });
    const result: CreateInvoiceResponseDTO = await response.json();
    return result;
  } catch (err) {
    console.log("error", err);
  }
}

interface FinalizeInvoiceDTO {
  stripeAccount: string;
}

interface FinalizeInvoiceResponseDTO {
  id: string;
  accountName: string;
  customerEmail: string;
  customerName: string;
}

export async function finalizeInvoice(
  connectedAccount: string,
  invoiceId: string,
): Promise<CreateInvoiceResponseDTO | undefined> {
  const payload: FinalizeInvoiceDTO = {
    stripeAccount: connectedAccount,
  };

  try {
    const response = await fetch(
      `${BASE_API_URL}/api/invoice/${invoiceId}/finalize`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(payload),
      },
    );
    const result: FinalizeInvoiceResponseDTO = await response.json();
    return result;
  } catch (err) {
    console.log("error", err);
  }
}

interface SendInvoiceDTO {
  stripeAccount: string;
}

interface SendInvoiceResponseDTO {
  id: string;
  accountName: string;
  customerEmail: string;
  customerName: string;
}

export async function sendInvoice(
  connectedAccount: string,
  invoiceId: string,
): Promise<CreateInvoiceResponseDTO | undefined> {
  const payload: SendInvoiceDTO = {
    stripeAccount: connectedAccount,
  };

  try {
    const response = await fetch(
      `${BASE_API_URL}/api/invoice/${invoiceId}/send`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(payload),
      },
    );
    const result: SendInvoiceResponseDTO = await response.json();
    return result;
  } catch (err) {
    console.log("error", err);
  }
}
