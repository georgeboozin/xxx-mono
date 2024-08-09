import useSWR from "swr";
import { BASE_API_URL } from "@/shared/constants";
import { Customer } from "@/shared/model/customer";

export function useCustomers(connectedAccount: string) {
  const url = `${BASE_API_URL}/api/connected-account/${connectedAccount}/customer`;
  const { data: customers, isLoading: isLoadingCustomers } = useSWR<Customer[]>(
    connectedAccount ? url : null,
  );

  return {
    customers,
    isLoadingCustomers,
  };
}
