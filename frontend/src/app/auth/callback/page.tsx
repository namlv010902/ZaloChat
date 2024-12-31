"use client";

import { tokenAtom } from "@lib/shared/stores";
import { saveTokensToCookies, toastError } from "@lib/utils";
import { useSetAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Callback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setToken = useSetAtom(tokenAtom);
  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const error = searchParams.get("error");

    if (error) {
      console.error("Login failed:", error);
      router.replace("/auth/login?error=" + error);
      toastError("Login failed");
    } else if (accessToken && refreshToken) {
      saveTokensToCookies(accessToken, refreshToken);
      setToken(accessToken);
      router.replace("/client/chat");
    }
  }, [router, searchParams]);

  return <div>Đang xử lý đăng nhập...</div>;
};

export default Callback;
