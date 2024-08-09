import useSWR from "swr";
import { BASE_API_URL } from "@/shared/constants";
import { ConnectedAccount } from "@/shared/model/connected-account";

export function useConnectedAccounts() {
  const { data: connectedAccounts, isLoading: isLoadingConnectedAccounts } =
    useSWR<ConnectedAccount[]>(`${BASE_API_URL}/api/connected-account`);

  return {
    connectedAccounts,
    isLoadingConnectedAccounts,
  };
}
