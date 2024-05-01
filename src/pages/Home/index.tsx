import { pagingQueryInterfaceInformation } from '@/services/ApexLinkServer/jiekouxinxikongzhiqi';
import { Link } from '@umijs/max';
import { Badge, List } from 'antd';
import React, { useEffect } from 'react';

const Home: React.FC = () => {
  const [data, setData] = React.useState<API.InterfaceInfoVo[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  useEffect(() => {
    pagingQueryInterfaceInformation({
      current: 1,
      pageSize: 10,
    }).then((value) => {
      setData(value.data?.records as API.InterfaceInfoVo[]);
      setTotal(Number(value.data?.total));
    });
  }, []);
  return (
    <>
      <List
        bordered
        pagination={{
          position: 'bottom',
          align: 'center',
          pageSize: 10,
          total: total,
          onChange: async (page: number, pageSize: number) => {
            pagingQueryInterfaceInformation({
              current: page,
              pageSize,
            }).then((value) => {
              setData(value.data?.records as API.InterfaceInfoVo[]);
            });
          },
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={<Link to={`/home/interfaceDetails/${item.id}`}>{item.name}</Link>}
              description={item.detail}
            />
            <div>
              {item.status === 1 ? (
                <>
                  <Link to={`/home/interfaceDetails/${item.id}`}>点击查看</Link>
                  <Badge status="success" style={{ marginLeft: '10px' }} />
                </>
              ) : (
                <>
                  {'接口已下线：'}
                  <Badge status="error" />
                </>
              )}
            </div>
          </List.Item>
        )}
      />
    </>
  );
};
export default Home;
