import { PageContainer } from '@ant-design/pro-layout';
import { Input } from 'antd';

import { Card, Col, Form, List, Row, Select } from 'antd';
import type { FC } from 'react';
import { useRequest } from 'umi';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import { queryFakeList } from './service';
import styles from './style.less';
import {MinzuDataType} from "./data.d";
import {searchMinzu, searchMinzuBy, searchMinzuByName, searchUsers} from "@/services/ant-design-pro/api";

const { Option } = Select;
const FormItem = Form.Item;

const getKey = (id: string, index: number) => `${id}-${index}`;

const Minzusearch: FC = () => {

/*  const handleFormSubmit = async (value: string) => {
    console.log(value);
    const values = await searchMinzuByName(value);
    console.log(values);
  };*/

/*
  const { data, loading, run } = searchMinzu((values: any) => {
    console.log('form data', values);

  });
*/

  const { data, loading, run } = useRequest((values: any) => {
    console.log('form data', values);
    // console.log('aaa', searchMinzu() );
  }, { manual: true, throwOnError: true } );

  const minzuList = searchMinzu();

  console.log('minzuList', minzuList);

  const list = minzuList || [];
  console.log('list123', list);

  const cardList = list && (
    <List<API.CurrentMinzu>
      rowKey="id"
      loading={loading}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
      dataSource={list}
      renderItem={(item) => (
        <List.Item>
          <Card className={styles.card} hoverable cover={<img alt={item.minzuName} src={item.minzuUrl} />}>
            <Card.Meta
              title={<a>{item.minzuName}</a>}
            />
          </Card>
        </List.Item>
      )}
    />
  );

  const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <div className={styles.coverCardList}>
    {/*  <PageContainer
        content={
          <div style={{ textAlign: 'center' }}>
            <Input.Search
              name="minzuName"
              placeholder="?????????"
              enterButton="??????"
              size="large"
              onSearch={handleFormSubmit}
              style={{ maxWidth: 522, width: '100%' }}
            />
          </div>
        }
      >
      </PageContainer>*/}

      <Card bordered={true}>
        <Form
          layout="inline"
          onValuesChange={async (_, values) => {
            // ??????????????????????????????
            console.log(values);
            //run(values);
            const minzuList = await searchMinzuBy(values);
            console.log(minzuList);
            return {
              dataSource:minzuList,
              list:minzuList
            }
          }}
        >
          <StandardFormRow title="??????" block style={{ paddingBottom: 11 }}>
            <FormItem name="minzuType">
              <TagSelect expandable>
                <TagSelect.Option value="??????">??????</TagSelect.Option>
                <TagSelect.Option value="??????">??????</TagSelect.Option>
                <TagSelect.Option value="cat3">?????????</TagSelect.Option>
                <TagSelect.Option value="cat4">?????????</TagSelect.Option>
                <TagSelect.Option value="cat5">?????????</TagSelect.Option>
                <TagSelect.Option value="cat6">?????????</TagSelect.Option>
                <TagSelect.Option value="cat7">?????????</TagSelect.Option>
                <TagSelect.Option value="cat8">?????????</TagSelect.Option>
                <TagSelect.Option value="cat9">?????????</TagSelect.Option>
                <TagSelect.Option value="cat10">?????????</TagSelect.Option>
                <TagSelect.Option value="cat11">????????????</TagSelect.Option>
                <TagSelect.Option value="cat12">????????????</TagSelect.Option>
              </TagSelect>
            </FormItem>
          </StandardFormRow>

          <StandardFormRow title="????????????" grid last>
            <Row gutter={16}>
              <Col lg={8} md={10} sm={10} xs={24}>
                <FormItem {...formItemLayout} label="??????" name="minzuSource">
                  <Select placeholder="??????" style={{ maxWidth: 200, width: '100%' }}>
                    <Option value="0">??????</Option>
                    <Option value="1">??????</Option>
                    <Option value="2">??????</Option>
                    <Option value="3">??????</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>
      <div className={styles.cardList}>{cardList}</div>
    </div>
  );
};

export default Minzusearch;
