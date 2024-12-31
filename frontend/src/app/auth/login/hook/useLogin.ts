"use client"

import { tokenAtom } from "@lib/shared/stores";
import {
  createApi,
  saveTokensToCookies,
  toastError,
  toastSuccess
} from "@lib/utils";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { PayloadLogin } from "../types";

const useLoginMutation = () => {
  const setToken = useSetAtom(tokenAtom);
  const router = useRouter();

  return useMutation({
    mutationFn: (data: PayloadLogin) =>
      createApi({
        urlKey: "LOGIN",
        method: "post",
        config: { data },
      }),
    onError(error) {
      if (error instanceof AxiosError)
        toastError(error?.response?.data?.message);
    },
    onSuccess({ data }) {
      toastSuccess(data?.message);
      saveTokensToCookies(data?.data?.accessToken, data?.data?.refreshToken);
      setToken(data?.data?.accessToken);
      router.push('/client/chat')
    },
  });
};

export { useLoginMutation };

