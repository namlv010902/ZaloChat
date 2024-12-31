const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
export enum APIQueryKey {
    LOGIN = 'auth/login',
    GET_ME ='auth/me',
    REFRESH_TOKEN = 'auth/refreshToken',
  }
export {NEXT_PUBLIC_API_URL}
