import { DefaultOptions, QueryClient, QueryKey } from '@tanstack/react-query'
import { AxiosRequestConfig } from 'axios'
import { instance } from '../api/instance'

const defaultQueryFn = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [endpoint, params, options] = queryKey as Array<string | Record<string, unknown>>

  const res = await instance.get(endpoint as string, {
    params,
    ...(options as AxiosRequestConfig)
  })
  return res.data
}
const queryConfig: DefaultOptions = {
  queries: {
    queryFn: defaultQueryFn,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: false,
    staleTime: 60 * 1000
  }
}

export const queryClientDefault = new QueryClient({ defaultOptions: queryConfig })
export {defaultQueryFn}
