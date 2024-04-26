import { Footer } from '@/components';
import { useTimer } from '@/hooks/useTimer';
import { forgotPasswordDto } from '@/services/ApexLinkServer/yonghujiekou';
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
const ForgotPassword: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { styles } = useStyles();
  const formRef = useRef<ProFormInstance>();
  const [codeLoading, setCodeLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const { isTim, tim, obtainVerificationCode } = useTimer(formRef, setCodeLoading);

  const handleSubmit = async (values: API.ForgotPasswordDto) => {
    setSubmitLoading(true);
    const msg = await forgotPasswordDto({
      ...values,
    });
    if (msg.code === 20000) {
      const defaultLoginSuccessMessage = '修改密码成功！';
      message.success(defaultLoginSuccessMessage);
      history.push('/user/login');
      return;
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
          loading={submitLoading}
          submitter={{ searchConfig: { submitText: '修改密码' } }}
          formRef={formRef}
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          title="忘记密码"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.ForgotPasswordDto);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '验证邮箱',
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
              <Flex gap={'small'} align="baseline">
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
                {isTim ? (
                  <>已发送({tim})</>
                ) : (
                  <>
                    <Button
                      size="large"
                      onClick={obtainVerificationCode}
                      loading={codeLoading}
                      disabled={codeLoading as boolean}
                    >
                      获取验证码
                    </Button>
                  </>
                )}
              </Flex>
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入新密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
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
export default ForgotPassword;
