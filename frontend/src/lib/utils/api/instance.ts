import { APIQueryKey, NEXT_PUBLIC_API_URL, STATUS_CODE } from "@lib/constants";
import { tokenAtom, userAtom } from "@lib/shared/stores";
import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { getDefaultStore } from "jotai";
import { redirect } from "next/navigation";
import {
  getAccessToken,
  getRefreshToken,
  removeTokens,
  removeUserLocal,
  saveTokensToCookies,
} from "../storage";

const instance = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
});
const refreshInstance = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
});

const jotaiStore = getDefaultStore();

function logout() {
  removeTokens();
  jotaiStore.set(tokenAtom, null);
  jotaiStore.set(userAtom, null);
  removeUserLocal();
  window.location.href = "/auth/login";
}
// Refresh token function using `refreshInstance`
async function refreshToken() {
  try {
    const refreshToken = getRefreshToken();

    if (refreshToken) {
      const response = await refreshInstance.post(
        APIQueryKey.REFRESH_TOKEN,
        null,
        {
          headers: { Authorization: `Bearer ${refreshToken}` },
        }
      );

      const newAccessToken = response.data.data.accessToken;
      saveTokensToCookies(newAccessToken);
      jotaiStore.set(tokenAtom, newAccessToken);
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newAccessToken}`;
      return newAccessToken;
    }
  } catch (error) {
    handleTokenError(error);
    throw error;
  }
}

// Error handling function for unauthorized access
function handleTokenError(error: unknown) {
  if (
    error instanceof AxiosError &&
    error.response?.status === STATUS_CODE.UNAUTHORIZED
  ) {
    logout();
    jotaiStore.set(tokenAtom, null);
  }
}

instance.interceptors.request.use((config) => {
  const accessToken = jotaiStore.get(tokenAtom) || getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
// Interceptor to handle token expiration and retries
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle token expiration and retry logic
    if (
      error.response?.status === STATUS_CODE.UNAUTHORIZED &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshToken();
        if (newAccessToken && originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return instance(originalRequest); // Retry original request with new token
        }
      } catch (refreshError) {
        logout();
        return Promise.reject(refreshError);
      }
    }

    // Handle 401 and 403 errors
    if (error.response?.status === STATUS_CODE.UNAUTHORIZED) {
      logout();
    } else if (error.response?.status === STATUS_CODE.FORBIDDEN) {
      redirect("/403");
    }

    return Promise.reject(error);
  }
);

export { instance };
