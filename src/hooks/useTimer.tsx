import { sendVerificationCode } from '@/services/ApexLinkServer/yonghujiekou';
import { ProFormInstance } from '@ant-design/pro-components';
import { message } from 'antd';
import { throttle } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';

export function useTimer(
  formRef: React.MutableRefObject<ProFormInstance | undefined>,
  setCodeLoading: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const [isTim, setIsTim] = useState<boolean>(false);
  const [tim, setTim] = useState<number>(60);
  const [code, setCode] = useState<number>(0);
  const obtainVerificationCode = useCallback(
    throttle(
      async () => {
        setCodeLoading(true);
        if (formRef.current!.getFieldValue('email')) {
          const res = await sendVerificationCode({
            email: formRef.current!.getFieldValue('email'),
          });
          if (res.code === 20000 && res.data) {
            setCode(res.data)
            message.success('获取验证码成功');
            setIsTim(!isTim);
          }
        } else {
          message.error('请填写邮箱');
        }
        setCodeLoading(false);
      },
      60000,
      {
        leading: true,
        trailing: false,
      },
    ),
    [],
  );
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

  return {
    obtainVerificationCode,
    isTim,
    tim,
    code
  };
}
