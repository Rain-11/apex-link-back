import CreateForm from '@/pages/TableList/components/CreateForm';
import {
  addInterface,
  batchDeletion,
  deleteInterfaceBasedOnId,
  modifyInterfaceInformation,
} from '@/services/ApexLinkServer/jiekouxinxikongzhiqi';
import { rule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  FooterToolbar,
  PageContainer,
  ProColumns,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, message } from 'antd';
import qs from 'qs';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  const res = await addInterface({
    ...fields,
  });
  if (res.code === 20000) {
    hide();
    message.success('添加接口成功');
    return true;
  }
  return false;
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  const res = await modifyInterfaceInformation({
    ...fields,
  });
  if (res.code === 20000) {
    hide();
    message.success('修改接口信息成功');
    return true;
  }
  return false;
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 */
const handleRemove = async (id: number) => {
  const hide = message.loading('正在删除');
  const res = await deleteInterfaceBasedOnId({
    deleteRequest: {
      id,
    },
  });
  if (res.code === 20000) {
    hide();
    message.success('删除成功');
    return true;
  }
  return false;
};

/**
 *  Delete node
 * @zh-CN 批量删除节点
 *
 */
const handleRemoveBatch = async (ids: number[]) => {
  const hide = message.loading('正在删除');
  const res = await batchDeletion(
    {
      ids,
    },
    {
      paramsSerializer: function (params: number[]) {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
    },
  );
  if (res.code === 20000) {
    hide();
    message.success('删除成功');
    return true;
  }
  return false;
};
const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfoVo>();
  const [selectedRowsState, setSelectedRows] = useState<API.InterfaceInfoVo[]>([]);

  const columns: ProColumns<API.InterfaceInfoVo>[] = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '接口名',
      copyable: true,
      ellipsis: true,
      tooltip: '接口名过长会自动收缩',
      dataIndex: 'name',
    },
    {
      title: '请求地址',
      copyable: true,
      dataIndex: 'url',
    },
    {
      title: '接口描述',
      copyable: true,
      ellipsis: true,
      tooltip: '接口描述过长会自动收缩',
      dataIndex: 'detail',
    },
    {
      title: '请求头',
      copyable: true,
      ellipsis: true,
      tooltip: '请求头过长会自动收缩',
      hideInSearch: true,
      dataIndex: 'requestHeader',
    },
    {
      title: '响应头',
      copyable: true,
      ellipsis: true,
      tooltip: '响应头过长会自动收缩',
      hideInSearch: true,
      dataIndex: 'responseHeader',
    },
    {
      disable: true,
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        0: {
          text: '禁用',
          status: 'Error',
        },
        1: {
          text: '启用',
          status: 'Success',
        },
      },
    },
    {
      title: '请求方式',
      copyable: true,
      dataIndex: 'method',
      valueType: 'select',
      valueEnum: {
        GET: {
          text: 'GET',
          status: 'Success',
        },
        POST: {
          text: 'POST',
          status: 'Success',
        },
        PUT: {
          text: 'PUT',
          status: 'Success',
        },
        DELETE: {
          text: 'DELETE',
          status: 'Success',
        },
      },
    },
    {
      title: '创建人',
      copyable: true,
      dataIndex: 'userName',
      hideInForm: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'date',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      valueType: 'date',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_, record) => [
        <a
          key="editable"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          更新
        </a>,
        <a
          key="delete"
          onClick={() => {
            handleRemove(record.id as number);
            actionRef.current?.reload();
          }}
        >
          删除
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.InterfaceInfoVo, API.PageParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        pagination={{
          pageSize: 5,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={rule}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemoveBatch(
                Array.of(selectedRowsState.map((item) => item.id)) as unknown as number[],
              );
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}

      <UpdateForm
        values={currentRow as API.InterfaceInfoVo}
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={(value) => {
          handleUpdateModalOpen(value as boolean);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalOpen={updateModalOpen}
        columns={columns}
      />

      <CreateForm
        onCancel={(value) => {
          handleModalOpen(value as boolean);
        }}
        onSubmit={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleModalOpen(false);
            actionRef.current?.reload();
          }
        }}
        createModalOpen={createModalOpen}
        columns={columns}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};
export default TableList;
