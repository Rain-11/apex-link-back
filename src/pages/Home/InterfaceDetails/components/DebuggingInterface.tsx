import { invoke } from '@/services/ApexLinkServer/ceshisdk';
import { Button, Col, Input, Row, Tabs, TabsProps, message } from 'antd';
import { createStyles } from 'antd-style';
import { useEffect, useState } from 'react';
import ReactJson, { InteractionProps } from 'react-json-view';
const useStyles = createStyles(({ token }) => {
  return {
    leftBorder: {
      borderLeft: `5px solid ${token.blue}`,
      paddingLeft: '10px',
    },
  };
});
const DebuggingInterface: React.FC<{
  interfaceInfo: API.InterfaceInfoVo;
}> = ({ interfaceInfo }) => {
  // 初始化JSON数据
  const [requestHeader, setRequestHeader] = useState({});
  const [params, setParams] = useState({});
  const [result, setResult] = useState({});
  const { styles } = useStyles();
  // onChange事件处理器，用于更新jsonData状态
  const handleHeaderOnChange = (edit: InteractionProps) => {
    setRequestHeader(edit.updated_src as any);
  };

  const handleParamsOnChange = (edit: InteractionProps) => {
    setParams(edit.updated_src as any);
  };

  const items: TabsProps['items'] = [
    {
      key: '请求头',
      label: '请求头',
      children: (
        <>
          <Row>
            <Row style={{ width: '100%' }}>
              <Col className={styles.leftBorder}>
                <span>请求头</span>
              </Col>
            </Row>
            <Row style={{ marginTop: '15px', width: '100%' }}>
              <Col span={24}>
                <ReactJson
                  src={requestHeader}
                  name={false}
                  onEdit={handleHeaderOnChange} // 添加此行以启用编辑功能
                  onAdd={handleHeaderOnChange} // 添加新属性时触发
                  onDelete={handleHeaderOnChange} // 删除属性时触发
                  theme="paraiso"
                  collapsed={false} // 初始时是否折叠，默认为true
                  style={{ padding: '20px', backgroundColor: '#282C34' }}
                />
              </Col>
            </Row>
          </Row>
        </>
      ),
    },
    {
      key: '请求参数',
      label: '请求参数',
      children: (
        <>
          <Row>
            <Row style={{ width: '100%' }}>
              <Col className={styles.leftBorder}>
                <span>请求参数</span>
              </Col>
            </Row>
            <Row style={{ marginTop: '15px', width: '100%' }}>
              <Col span={24}>
                <ReactJson
                  src={params}
                  name={false}
                  onEdit={handleParamsOnChange} // 添加此行以启用编辑功能
                  onAdd={handleParamsOnChange} // 添加新属性时触发
                  onDelete={handleParamsOnChange} // 删除属性时触发
                  theme="paraiso"
                  collapsed={false} // 初始时是否折叠，默认为true
                  style={{ padding: '20px', backgroundColor: '#282C34' }}
                />
              </Col>
            </Row>
          </Row>
        </>
      ),
    },
  ];
  useEffect(() => {
    if (interfaceInfo.requestHeader) {
      setRequestHeader(JSON.parse(interfaceInfo.requestHeader as string));
      setParams(JSON.parse(interfaceInfo.params as string));
    }
  }, []);

  const sendRequest = async () => {
    let res = await invoke({
      id: interfaceInfo.id,
      body: JSON.stringify(params),
    });
    if (res.code === 20000) {
      message.success('调用成功');
      setResult(res);
    }
  };
  return (
    <>
      <Row>
        <Col span={2}>
          <Button style={{ width: '100%', borderRadius: 0 }} type="primary" size="middle">
            {interfaceInfo.method}
          </Button>
        </Col>
        <Col span={18}>
          <Input value={interfaceInfo.url} style={{ width: '100%', borderRadius: 0 }} />
        </Col>
        <Col span={2}>
          <Button
            style={{ width: '100%', borderRadius: 0 }}
            type="primary"
            size="middle"
            onClick={sendRequest}
          >
            发送请求
          </Button>
        </Col>
        <Col span={2}>
          <Button style={{ width: '100%', borderRadius: 0 }} size="middle">
            重置
          </Button>
        </Col>
      </Row>

      <Row style={{ marginTop: '15px' }}>
        <Col span={24}>
          <Tabs defaultActiveKey="1" items={items} />
        </Col>
      </Row>

      <Row style={{ marginTop: '15px' }}>
        <Row style={{ width: '100%' }}>
          <Col className={styles.leftBorder}>
            <span>请求结果：</span>
          </Col>
        </Row>
        <Row style={{ marginTop: '15px', width: '100%' }}>
          <Col span={24}>
            <ReactJson
              src={result}
              name={false}
              collapsed={false} // 初始时是否折叠，默认为true
              theme="paraiso"
              style={{ padding: '20px', backgroundColor: '#282C34' }}
            />
          </Col>
        </Row>
      </Row>
    </>
  );
};

export default DebuggingInterface;
