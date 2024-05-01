// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /invoke/handler */
export async function invoke(body: API.ExecutionGoalsDto, options?: { [key: string]: any }) {
  return request<API.BaseResponse>('/invoke/handler', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
