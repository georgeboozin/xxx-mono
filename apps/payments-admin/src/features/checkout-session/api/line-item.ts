import useSWR from "swr";
import { BASE_API_URL } from "@/shared/constants";
import { LineItem } from "@/shared/model/line-item";

export function useLineItems(connectedAccount: string) {
  const url = `${BASE_API_URL}/api/connected-account/${connectedAccount}/line-item`;
  const { data: lineItems, isLoading: isLoadingLineItems } = useSWR<LineItem[]>(
    connectedAccount ? url : null,
  );

  return {
    lineItems,
    isLoadingLineItems,
  };
}
