import { Footer } from '@/components';
import { sendVerificationCode, userLogin } from '@/services/ApexLinkServer/yonghujiekou';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProFormCheckbox,
  ProFormInstance,
  ProFormText,
} from '@ant-design/pro-components';
import { Helmet, history, useModel } from '@umijs/max';
import { Button, Flex, Tabs, message } from 'antd';
import { createStyles } from 'antd-style';
import React, { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});
const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const [codeLoading, setCodeLoading] = useState<boolean>(false);
  const { initialState, setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();
  const [isTim, setIsTim] = useState<boolean>(false);
  const [tim, setTim] = useState<number>(60);
  const formRef = useRef<ProFormInstance>();
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };
  const handleSubmit = async (values: API.UserRegisterRequest) => {
    const msg = await userLogin({
      ...values,
    });
    if (msg.message === 'ok') {
      const defaultLoginSuccessMessage = '登录成功！';
      message.success(defaultLoginSuccessMessage);
      await fetchUserInfo();
      const urlParams = new URL(window.location.href).searchParams;
      history.push(urlParams.get('redirect') || '/');
      return;
    }
    console.log(msg);
  };

  const obtainVerificationCode = async () => {
    if (formRef.current?.isFieldsValidating()) {
      setCodeLoading(true);
      const res = await sendVerificationCode({
        email: formRef.current!.getFieldValue('email'),
      });
      if (res.code === 0 && res.data) {
        message.success('获取验证码成功');
        setIsTim(!isTim);
      }
      setCodeLoading(false);
    } else {
      message.error('未通过校验');
    }
  };
  useEffect(() => {
    let timer: number;
    if (isTim) {
      // @ts-ignore
      timer = setInterval(() => {
        if (tim <= 0) {
          clearInterval(timer);
          setIsTim(!isTim);
          setTim(60);
          return;
        }
        setTim((tim) => tim - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [tim, isTim]);

  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {'登录'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          formRef={formRef}
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="Ant Design"
          subTitle={'Api开放平台管理系统'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserRegisterRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '邮箱注册',
              },
            ]}
          />

          {type === 'account' && (
            <>
              <ProFormText
                name="email"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入邮箱'}
                rules={[
                  {
                    required: true,
                    message: '邮箱是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
              <Flex gap={'small'}>
                <ProFormText
                  name="code"
                  fieldProps={{
                    size: 'large',
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
                <Button size="large" onClick={obtainVerificationCode} loading={codeLoading}>
                  {isTim ? `已发送(${tim})` : '获取验证码'}
                </Button>
              </Flex>
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码 ?
            </a>
            <br />
            <a
              style={{
                marginTop: '5px',
                marginBottom: '5px',
                float: 'right',
              }}
            >
              没有账号？去注册
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
