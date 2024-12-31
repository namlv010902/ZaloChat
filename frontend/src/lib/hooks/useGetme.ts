import { APIQueryKey } from "@lib/constants";
import { useQuery } from "@tanstack/react-query";

const useGetMe = () => {
  const getMe = useQuery({
    queryKey: [APIQueryKey.GET_ME],
  });
  return getMe;
}
export { useGetMe };
