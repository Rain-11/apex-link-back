import { useTimer } from '@/hooks/useTimer';
import { changePassword } from '@/services/ApexLinkServer/yonghujiekou';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { ProForm, ProFormInstance, ProFormText } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Col, Flex, Form, FormProps, Input, Modal, Row, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

type FieldType = {
  userPassword?: string;
  verifyPassword?: string;
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const ChangePassword: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const formRef = useRef<ProFormInstance>();
  const [codeLoading, setCodeLoading] = useState<boolean>(false);
  const { obtainVerificationCode, isTim, tim, code } = useTimer(formRef, setCodeLoading);
  const { changePasswordVerification, setChangePasswordVerification } = useModel('userInfo');
  const { setActiveTabKey } = useModel('userInfo');
  const { initialState } = useModel('@@initialState');
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log(code);
    const msg = await changePassword({
      ...values,
      verificationCode: code.toString(),
    });
    if (msg.code === 20000) {
      message.success('修改密码成功');
      formRef.current?.resetFields();
      initialState!.currentUser = undefined;
      location.reload();
      return;
    }
    message.error('密码修改失败');
  };
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    const userCode = formRef.current?.getFieldValue('verificationCode');
    if (Number(userCode) !== code) {
      message.error('邮箱验证码不正确');
      setConfirmLoading(false);
      return;
    }
    message.success('校验成功');
    setConfirmLoading(false);
    setChangePasswordVerification(true);
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
    setActiveTabKey('accountSecurity');
  };
  useEffect(() => {
    if (!changePasswordVerification) {
      showModal();
    }
  }, [changePasswordVerification]);
  return (
    <>
      <Modal
        title="验证邮箱"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <ProForm
          formRef={formRef}
          submitter={{
            resetButtonProps: {
              style: {
                // 隐藏重置按钮
                display: 'none',
              },
            },
            submitButtonProps: {
              style: {
                display: 'none',
              },
            },
          }}
        >
          <Row
            style={{
              marginTop: 10,
            }}
          >
            <Col>
              <ProFormText
                name="email"
                fieldProps={{
                  size: 'small',
                  prefix: <UserOutlined />,
                  width: '50',
                }}
                placeholder={'请输入邮箱'}
                rules={[
                  {
                    required: true,
                    message: '邮箱是必填项！',
                  },
                ]}
              />
            </Col>
          </Row>
          <Flex
            gap={'small'}
            align="baseline"
            style={{
              marginTop: -15,
            }}
          >
            <ProFormText
              name="verificationCode"
              fieldProps={{
                size: 'small',
                prefix: <LockOutlined />,
              }}
              placeholder={'请填写验证码'}
              rules={[
                {
                  required: true,
                  message: '验证码是必填项！',
                },
                {
                  min: 5,
                  max: 5,
                  message: '验证码长度为5！',
                },
              ]}
            />
            {isTim ? (
              <>已发送({tim})</>
            ) : (
              <>
                <Button
                  size="small"
                  onClick={obtainVerificationCode}
                  disabled={codeLoading}
                  loading={codeLoading}
                >
                  获取验证码
                </Button>
              </>
            )}
          </Flex>
        </ProForm>
      </Modal>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 400 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="新密码"
          name="userPassword"
          rules={[{ required: true, message: '请输入userPassword' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<FieldType>
          label="再次确认密码"
          name="verifyPassword"
          rules={[{ required: true, message: '请再次输入密码' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ChangePassword;
