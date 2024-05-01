import { Button, Card, Col, Input, Row, message } from 'antd';
import { createStyles } from 'antd-style';
import copy from 'copy-to-clipboard';
import ReactJson from 'react-json-view';
const useStyles = createStyles(({ token }) => {
  return {
    leftBorder: {
      borderLeft: `5px solid ${token.blue}`,
      paddingLeft: '10px',
    },
  };
});
const jsonData = {
  code: 20000,
  message: '请求成功',
  data: {},
};
const InterfaceDocumentation: React.FC<{
  interfaceInfo: API.InterfaceInfoVo;
}> = ({ interfaceInfo }) => {
  const { styles } = useStyles();
  const handleCopyClick = (params: string) => {
    let textToCopy = undefined;
    if (params === 'interface') {
      textToCopy = interfaceInfo.url;
    } else {
      textToCopy = (interfaceInfo.host as string) + interfaceInfo.url;
    }
    const didCopy = copy(textToCopy as string);
    if (didCopy) {
      message.success('复制成功!');
    } else {
      message.error('复制失败!');
    }
  };

  return (
    <>
      <Card>
        <Row>
          <Row style={{ width: '100%' }}>
            <Col>
              <span style={{ fontWeight: 'bold' }}>{interfaceInfo.name}</span>
            </Col>
            <Col offset={18}>
              <a
                onClick={() => {
                  handleCopyClick('interface');
                }}
              >
                复制接口
              </a>
            </Col>
            <Col offset={1}>
              <a
                onClick={() => {
                  handleCopyClick('address');
                }}
              >
                复制地址
              </a>
            </Col>
          </Row>
          <Row style={{ marginTop: '15px', width: '100%' }}>
            <Col>
              <Button size={'middle'} type="primary">
                {interfaceInfo.method}
              </Button>
            </Col>
            <Col>
              <Input variant="borderless" value={interfaceInfo.url} />
            </Col>
          </Row>
          <Row style={{ marginTop: '15px', width: '100%' }}>
            <Col>
              <span>请求数据类型：</span>
              {interfaceInfo.requestDataType}
            </Col>
          </Row>
        </Row>
        {interfaceInfo.params && (
          <Row>
            <Row style={{ marginTop: '15px', width: '100%' }}>
              <Col className={styles.leftBorder}>
                <span style={{ fontWeight: 'bold' }}>请求参数示例</span>
              </Col>
            </Row>
            <Row style={{ marginTop: '15px', width: '100%' }}>
              <Col span={24}>
                <ReactJson
                  src={JSON.parse(interfaceInfo.params)}
                  name={false}
                  collapsed={false}
                  indentWidth={2}
                  theme="paraiso"
                  style={{ padding: '20px', backgroundColor: '#282C34' }}
                />
              </Col>
            </Row>
          </Row>
        )}
        <Row>
          <Row style={{ marginTop: '15px', width: '100%' }}>
            <Col className={styles.leftBorder}>
              <span style={{ fontWeight: 'bold' }}>响应示例</span>
            </Col>
          </Row>
          <Row style={{ marginTop: '15px', width: '100%' }}>
            <Col span={24}>
              <ReactJson
                src={jsonData}
                name={false}
                collapsed={false}
                indentWidth={2}
                theme="paraiso"
                style={{ padding: '20px', backgroundColor: '#282C34' }}
              />
            </Col>
          </Row>
        </Row>
      </Card>
    </>
  );
};

export default InterfaceDocumentation;
