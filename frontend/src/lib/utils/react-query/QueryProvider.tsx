"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { reactQueryPluginOptions } from "./react-query-config";

type QueryProviderProps = {
  children: ReactNode;
};

function QueryProvider({ children }: QueryProviderProps) {
  // Tạo QueryClient với trạng thái riêng biệt để hỗ trợ SSR/CSR tốt hơn
  const [queryClient] = useState(
    () => new QueryClient(reactQueryPluginOptions)
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
export { QueryProvider };
