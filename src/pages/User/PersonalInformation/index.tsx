import ChangePassword from '@/pages/User/PersonalInformation/components/ChangePassword';
import { generateAccessKey } from '@/services/ApexLinkServer/yonghujiekou';
import { useModel } from '@@/exports';
import { Avatar, Button, Card, Col, Flex, Modal, Row, Tooltip } from 'antd';
import React, { useState } from 'react';

const tabListNoTitle = [
  {
    key: 'accountSecurity',
    label: '账户安全',
  },
  {
    key: 'modifyMiami',
    label: '修改密码',
  },
  {
    key: 'wallet',
    label: '我的钱包',
  },
];
const PersonalInformation: React.FC = () => {
  const { activeTabKey, setActiveTabKey } = useModel('userInfo');
  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [secret, setSecret] = useState<API.SignatureAuthenticationVo | undefined>({
    secretId: '12321321321',
    secretKey: '12321321321',
  });
  const { initialState } = useModel('@@initialState');

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setSecret(undefined);
  };

  const getAccessKey = async () => {
    const res = await generateAccessKey();
    if (res.code === 20000) {
      setSecret(res.data);
      showModal();
      return;
    }
  };
  const contentListNoTitle: Record<string, React.ReactNode> = {
    accountSecurity: <a onClick={getAccessKey}>生成访问秘钥</a>,
    modifyMiami: <ChangePassword />,
    wallet: (
      <>
        <Card title="我的钱包" bordered={true} style={{ width: '100%', fontWeight: 'bolder' }}>
          <p>
            <Tooltip title="一金币可以调用一次接口">
              金币余额： <span>{initialState?.currentUser?.wallet}</span>
            </Tooltip>
          </p>
          <p>
            获取更多： <Button size="small">每日签到</Button>
          </p>
        </Card>
      </>
    ),
  };
  return (
    <>
      <Modal
        title="生成accesKey"
        open={isModalOpen}
        onOk={handleOk}
        cancelButtonProps={{
          style: {
            display: 'none',
          },
        }}
      >
        <p>请保存好访问秘钥，客户端不会存储访问秘钥</p>
        SecretId: {secret?.secretId}
        <br />
        SecretKey: {secret?.secretKey}
      </Modal>
      <Row>
        <Col>
          <Card
            title="个人信息"
            bordered={false}
            style={{ width: 300, marginRight: 100, textAlign: 'center' }}
          >
            <Row>
              <Col span={24}>
                <Flex vertical={true} justify={'center'} align={'center'}>
                  <Avatar
                    size={100}
                    src={<img src={initialState!.currentUser!.userAvatar} alt="avatar" />}
                  />
                  <h1>{initialState!.currentUser!.userName}</h1>
                  <p>{initialState!.currentUser!.userProfile}</p>
                </Flex>
              </Col>
            </Row>
            <Row>
              <Col>邮箱： {initialState!.currentUser!.email}</Col>
            </Row>
            <Row></Row>
            <Row></Row>
          </Card>
        </Col>
        <Col span={14}>
          <Card
            style={{ width: '100%' }}
            tabList={tabListNoTitle}
            activeTabKey={activeTabKey}
            onTabChange={onTabChange}
            tabProps={{
              size: 'middle',
            }}
          >
            {contentListNoTitle[activeTabKey]}
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default PersonalInformation;
