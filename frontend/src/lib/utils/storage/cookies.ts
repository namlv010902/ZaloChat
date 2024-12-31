import Cookies from "js-cookie";

const saveTokensToCookies = (accessToken: string, refreshToken?: string) => {
  Cookies.set("access_token", accessToken, {
    expires: 7,
    secure: true,
    sameSite: "Strict",
  });

  if (refreshToken)
    Cookies.set("refresh_token", refreshToken, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
};

const removeTokens = () => {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
};

const getAccessToken = () => {
  return Cookies.get("access_token");
};

const getRefreshToken = () => {
  return Cookies.get("refresh_token");
};

export { saveTokensToCookies, removeTokens, getAccessToken, getRefreshToken };
