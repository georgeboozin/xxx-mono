import { useState, useCallback } from "react";
import { useProducts } from "../api/product";
import { useLineItems } from "../api/line-item";
import { useConnectedAccounts } from "../api/connected-account";
import { useCustomers } from "../api/customer";

export function useFormData(connectedAccount: string) {
  const { connectedAccounts, isLoadingConnectedAccounts } =
    useConnectedAccounts();
  const { lineItems, isLoadingLineItems } = useLineItems(connectedAccount);
  const { products, isLoadingProducts } = useProducts(connectedAccount);
  const { customers, isLoadingCustomers } = useCustomers(connectedAccount);
  const isFetching = connectedAccount
    ? isLoadingConnectedAccounts ||
      isLoadingLineItems ||
      isLoadingProducts ||
      isLoadingCustomers
    : isLoadingConnectedAccounts;

  return {
    connectedAccounts,
    lineItems,
    products,
    customers,
    isFetching,
  };
}

export function useFormState() {
  const [lawyerRecieves, setLawyerRecieves] = useState(0);
  const [success, setSuccess] = useState<boolean>(false);

  const handleClose = useCallback(() => {
    setSuccess(false);
  }, [setSuccess]);

  return {
    lawyerRecieves,
    setLawyerRecieves,
    success,
    setSuccess,
    handleClose,
  };
}
