// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加接口 POST /interface/addInterface */
export async function addInterface(body: API.InterfaceAddDto, options?: { [key: string]: any }) {
  return request<API.BaseResponseVoid>('/interface/addInterface', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除接口 DELETE /interface/batchDeletion */
export async function batchDeletion(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.batchDeletionParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/interface/batchDeletion', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 删除接口 DELETE /interface/deleteInterfaceBasedOnID */
export async function deleteInterfaceBasedOnId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteInterfaceBasedOnIDParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/interface/deleteInterfaceBasedOnID', {
    method: 'DELETE',
    params: {
      ...params,
      deleteRequest: undefined,
      ...params['deleteRequest'],
    },
    ...(options || {}),
  });
}

/** 修改接口信息 PUT /interface/modifyInterfaceInformation */
export async function modifyInterfaceInformation(
  body: API.InterfaceUpdateDto,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/interface/modifyInterfaceInformation', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页查询接口信息 POST /interface/pagingQueryInterfaceInformation */
export async function pagingQueryInterfaceInformation(
  body: API.InterfaceQueryDto,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageInterfaceInfoVo>(
    '/interface/pagingQueryInterfaceInformation',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 根据id获取接口信息 GET /interface/queryInterfaceBasedOnID/${param0} */
export async function queryInterfaceBasedOnId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryInterfaceBasedOnIDParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseInterfaceInfoVo>(`/interface/queryInterfaceBasedOnID/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
