import { QueryClientConfig } from "@tanstack/react-query";
import { defaultQueryFn } from "./react-query-client";
import { STATUS_CODE } from "@lib/constants";
import { AxiosError } from "axios";

export const reactQueryPluginOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: (failureCount, error) => {
        if(error instanceof AxiosError){
            if (error.response?.status === STATUS_CODE.UNAUTHORIZED || error.response?.status === STATUS_CODE.SERVER_ERROR) {
          return failureCount < 2; 
        }
        }
        return false;
      },
    },
  },
};
