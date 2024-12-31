"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { getAccessToken, getUserLocal, removeTokens, removeUserLocal } from "@lib/utils/storage";
import { tokenAtom, userAtom } from "@lib/shared/stores";
import { redirect } from "next/navigation";

const useAuth = () => {
  const [, setToken] = useAtom(tokenAtom);
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    const tokenCookie = getAccessToken();
    const userLocal = getUserLocal();

    if (tokenCookie) {
      setToken(tokenCookie);
    }else{
      logout();
    }
    if (userLocal) {
      setUser(userLocal);
    }
  }, [setToken, setUser]);

  const logout =()=>{
    removeTokens();
    removeUserLocal();
    setUser(null);
    setToken(null);
    redirect('/')
  }

  return {
    token: getAccessToken(), 
    user: getUserLocal(),
    logout
  };
};

export { useAuth };
