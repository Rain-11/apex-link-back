import { queryInterfaceBasedOnId } from '@/services/ApexLinkServer/jiekouxinxikongzhiqi';
import { useParams } from '@umijs/max';
import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import DebuggingInterface from './components/DebuggingInterface';
import InterfaceDocumentation from './components/InterfaceDocumentation';
const InterfaceDetails: React.FC = () => {
  const params = useParams();
  const [interfaceDetail, setInterfaceDetail] = useState<API.InterfaceInfoVo>();
  const initData = async () => {
    const res = await queryInterfaceBasedOnId({
      id: params.id as string,
    });
    if (res.code === 20000) {
      setInterfaceDetail(res.data);
    }
  };
  useEffect(() => {
    console.log('初始化数据');
    initData();
  }, []);
  return (
    <>
      <Tabs
        tabPosition={'left'}
        items={['文档', '调试'].map((item) => {
          return {
            label: item,
            key: item,
            children:
              interfaceDetail &&
              (item === '文档' ? (
                <InterfaceDocumentation interfaceInfo={interfaceDetail} />
              ) : (
                <DebuggingInterface interfaceInfo={interfaceDetail}></DebuggingInterface>
              )),
          };
        })}
      />
    </>
  );
};

export default InterfaceDetails;
