import { ProColumns, ProFormInstance, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React, { useEffect, useRef } from 'react';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.InterfaceInfoVo>;
export type UpdateFormProps = {
  onCancel: (flag?: boolean) => void;
  updateModalOpen: boolean;
  columns: ProColumns<API.InterfaceInfoVo>[];
  onSubmit: (values: FormValueType) => Promise<void>;
  values: API.InterfaceInfoVo;
};
const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const formRef = useRef<ProFormInstance>();
  useEffect(() => {
    formRef.current?.setFieldsValue({
      ...props.values,
    });
  }, [props.values]);
  return (
    <Modal
      title={'修改接口信息'}
      width="400px"
      open={props.updateModalOpen}
      onCancel={() => {
        props.onCancel(false);
      }}
      footer={null}
    >
      <ProTable
        formRef={formRef}
        type={'form'}
        columns={props.columns}
        onSubmit={async (values) => {
          props.onSubmit({ ...values, id: props.values.id });
        }}
        form={{
          initialValues: props.values,
        }}
      />
    </Modal>
  );
};
export default UpdateForm;
