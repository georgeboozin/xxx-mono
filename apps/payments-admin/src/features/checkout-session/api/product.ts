import useSWR from "swr";
import { BASE_API_URL } from "@/shared/constants";
import { Product } from "@/shared/model/product";

export function useProducts(connectedAccount: string) {
  const url = `${BASE_API_URL}/api/connected-account/${connectedAccount}/product`;
  const { data: products, isLoading: isLoadingProducts } = useSWR<Product[]>(
    connectedAccount ? url : null,
  );

  return {
    products,
    isLoadingProducts,
  };
}
