import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { message as Message } from 'antd';

type BaseResponse = {
  code?: number;
  data?: any;
  message?: string;
};
export const requestConfig: RequestConfig = {
  baseURL: 'http://localhost:8080',
  //允许携带cookie
  withCredentials: true,
  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。
      return { ...config };
    },
  ],
  // 响应拦截器
  responseInterceptors: [
    (response) => {
      const { code, message } = response.data as BaseResponse;
      if ((code as number) < 20000 || (code as number) >= 30000) {
        Message.error(`请求异常:${message}`);
      }
      return response;
    },
  ],
};
