/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import type {
  AxiosInstance,
  CreateAxiosDefaults,
  Method,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';

export type RequestInterceptor = (
  config: InternalAxiosRequestConfig,
) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;

export type ResponseInterceptor = (data: AxiosResponse) => AxiosResponse;
export type ResponseErrorInterceptor = (error: any) => void;

export interface IBaseApiProps
  extends Omit<CreateAxiosDefaults, 'baseURL' | 'transformRequest' | 'transformResponse'> {
  baseURL: CreateAxiosDefaults['baseURL'];
  requestInterceptors?: RequestInterceptor[];
  responseInterceptors?: Array<[ResponseInterceptor, ResponseErrorInterceptor?]>;
}

type BaseApiRequestHeaders = Record<string, string | number | string[] | number[]> | undefined;

export class BaseApi {
  private readonly _instance: AxiosInstance;

  constructor(options: IBaseApiProps) {
    const { baseURL = '', requestInterceptors = [], responseInterceptors = [], ...rest } = options;

    this._instance = axios.create({
      ...rest,
      baseURL,
    });

    this._instance.defaults.headers.get['Content-Type'] = 'application/json';
    this._instance.defaults.headers.post['Content-Type'] = 'application/json';
    this._instance.defaults.headers.patch['Content-Type'] = 'application/json';
    this._instance.defaults.headers.put['Content-Type'] = 'application/json';
    this._instance.defaults.headers.delete['Content-Type'] = 'application/json';

    this._applyRequestInterceptors(requestInterceptors);
    this._applyResponseInterceptors(responseInterceptors);
  }

  addRequestInterceptor = (interceptor: RequestInterceptor): number => {
    return this._instance.interceptors.request.use(interceptor);
  };

  addResponseInterceptor = (
    interceptor: ResponseInterceptor,
    errorInterceptor?: ResponseErrorInterceptor,
  ): number => {
    return this._instance.interceptors.response.use(interceptor, errorInterceptor);
  };

  ejectRequestInterceptor = (interceptorId: number): void => {
    this._instance.interceptors.request.eject(interceptorId);
  };

  ejectResponseInterceptor = (interceptorId: number): void => {
    this._instance.interceptors.response.eject(interceptorId);
  };

  _applyRequestInterceptors = (interceptors: RequestInterceptor[]): void => {
    interceptors.forEach((interceptor) => this.addRequestInterceptor(interceptor));
  };

  _applyResponseInterceptors = (
    interceptors: Array<[ResponseInterceptor, ResponseErrorInterceptor?]>,
  ): void => {
    interceptors.forEach(([interceptor, errorIntterceptor]) =>
      this.addResponseInterceptor(interceptor, errorIntterceptor),
    );
  };

  async request<T>(
    url: string,
    method: Method,
    body: any,
    params?: Record<any, any>,
    headers?: BaseApiRequestHeaders,
  ): Promise<T> {
    const initialRequestConfig: AxiosRequestConfig = {
      url,
      method,
      params,
      data: body,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    };

    const requestConfig = Object.keys(initialRequestConfig).reduce<AxiosRequestConfig>(
      (acc, key) => {
        const configKey = key as keyof AxiosRequestConfig;
        const requestConfigKeyValue = initialRequestConfig[configKey];
        if (requestConfigKeyValue != null) {
          acc[configKey] = requestConfigKeyValue;
        }

        return acc;
      },
      {},
    );

    const response = await this._instance.request<any, T>(requestConfig);
    return response;
  }

  async get<T>(
    url: string,
    params?: Record<string, any>,
    headers?: BaseApiRequestHeaders,
  ): Promise<T> {
    const response = await this.request<T>(url, 'get', null, params, headers);
    return response;
  }

  async post<T>(
    url: string,
    body: any,
    params?: Record<string, string>,
    headers?: BaseApiRequestHeaders,
  ): Promise<T> {
    const response = await this.request<T>(url, 'post', body, params, headers);
    return response;
  }

  async put<T>(
    url: string,
    body?: any,
    params?: Record<string, string>,
    headers?: BaseApiRequestHeaders,
  ): Promise<T> {
    const response = await this.request<T>(url, 'put', body, params, headers);
    return response;
  }

  async patch<T>(
    url: string,
    body: any,
    params?: Record<string, string>,
    headers?: BaseApiRequestHeaders,
  ): Promise<T> {
    const response = await this.request<T>(url, 'patch', body, params, headers);
    return response;
  }

  async delete<T>(
    url: string,
    body?: any,
    params?: Record<string, string>,
    headers?: BaseApiRequestHeaders,
  ): Promise<T> {
    const response = await this.request<T>(url, 'delete', body, params, headers);
    return response;
  }
}
