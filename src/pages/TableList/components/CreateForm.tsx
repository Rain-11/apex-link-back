import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React, { useRef } from 'react';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.InterfaceInfoVo>;
export type CreateFormProps = {
  onCancel: (flag?: boolean) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  createModalOpen: boolean;
  columns: ProColumns<API.InterfaceInfoVo>[];
};
const CreateForm: React.FC<CreateFormProps> = (props) => {
  const actionRef = useRef<ActionType>();
  return (
    <Modal
      title={'新建接口信息'}
      width="400px"
      open={props.createModalOpen}
      onCancel={() => {
        props.onCancel(false);
      }}
      footer={null}
    >
      <ProTable
        type={'form'}
        actionRef={actionRef}
        columns={props.columns}
        onSubmit={async (values) => {
          props.onSubmit(values);
          actionRef.current?.reset?.();
        }}
      />
    </Modal>
  );
};
export default CreateForm;
