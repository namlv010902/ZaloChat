import { AxiosRequestConfig } from 'axios'
import { instance } from './instance'
import { APIQueryKey } from '@lib/constants'

type ApiOptions<T extends AxiosRequestConfig> = {
  method?: 'post' | 'put' | 'patch' | 'delete'
  urlKey: keyof typeof APIQueryKey
  config?: T
}

const createApi = <T extends AxiosRequestConfig>({
  method = 'post',
  urlKey,
  config,
}: ApiOptions<T>) => {
    if(!urlKey){
        throw new Error('URL key is required for API')
    }
  return instance[method](APIQueryKey[urlKey], config?.data)
}

const updateApi = <T extends AxiosRequestConfig>({
  method = 'put',
  urlKey,
  id,
  config
}: ApiOptions<T> & { id: number }) => {
    if(!id){
        throw new Error('ID is required for update API')
    }
    if(!urlKey){
        throw new Error('URL key is required for update API')
    }
  return instance[method](`${APIQueryKey[urlKey]}/${id}`, config?.data)
}

const deleteApi = <T extends AxiosRequestConfig>({
  urlKey,
  id
}: ApiOptions<T> & { id: number }) => {
    if(!id){
        throw new Error('ID is required for delete API')
    }
    if(!urlKey){
        throw new Error('URL key is required for delete API')
    }
  return instance.delete(`${APIQueryKey[urlKey]}/${id}`)
}

export { deleteApi, createApi, updateApi }
