import { Footer } from '@/components';
import { useTimer } from '@/hooks/useTimer';
import { userRegister } from '@/services/ApexLinkServer/yonghujiekou';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormInstance, ProFormText } from '@ant-design/pro-components';
import { Helmet, Link, history } from '@umijs/max';
import { Button, Flex, Tabs, message } from 'antd';
import { createStyles } from 'antd-style';
import React, { useRef, useState } from 'react';
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
  const { styles } = useStyles();
  const formRef = useRef<ProFormInstance>();
  const { isTim, tim, obtainVerificationCode } = useTimer(formRef,setCodeLoading);
  const [submitLoading, setSubmitLoading] = useState<boolean | undefined>(false);
  const handleSubmit = async (values: API.UserRegisterRequest) => {
    setSubmitLoading(true);
    const msg = await userRegister({
      ...values,
    });
    if (msg.code === 20000) {
      const defaultLoginSuccessMessage = '注册成功';
      message.success(defaultLoginSuccessMessage);
      history.push('/user/login');
    }
    setSubmitLoading(false);
  };

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
          submitter={{ searchConfig: { submitText: '注册'}}}
          formRef={formRef}
          loading={submitLoading}
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="ApexLink"
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
              <Flex gap={'small'} align="baseline">
                <ProFormText
                  name="verificationCode"
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
                {isTim ? (
                  <>已发送({tim})</>
                ) : (
                  <>
                    <Button size="large" onClick={obtainVerificationCode} disabled={codeLoading} loading={codeLoading}>
                      获取验证码
                    </Button>
                  </>
                )}
              </Flex>
            </>
          )}
          <div
            style={{
              marginBottom: 10,
            }}
          >
            <Link
              to="/user/forgotPassword"
              style={{
                float: 'right',
              }}
            >
              忘记密码 ?
            </Link>
            <br />
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
