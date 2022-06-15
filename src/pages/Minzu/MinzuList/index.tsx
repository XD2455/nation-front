import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import {searchMinzu, searchMinzuBy, searchUsers} from "@/services/ant-design-pro/api";
import {Card, Col, Form, Image, Row, Select} from "antd";
import StandardFormRow from "@/pages/Minzu/Minzusearch/components/StandardFormRow";
import TagSelect from "@/pages/Minzu/Minzusearch/components/TagSelect";
const FormItem = Form.Item;
const { Option } = Select;

const columns: ProColumns<API.CurrentMinzu>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '影音',
    dataIndex: 'minzuUrl',
    /*    render: (_, record) => (
          <div>
            <Image src={record.minzuUrl} width={100} />
          </div>
        ),*/

    render (_, record) {
      if(record.minzuSource == 0){
        return (<div><Image src={record.minzuUrl} width={300} /></div>  )
      }
      else if (record.minzuSource == 2){
        return ( <div><video controls src={record.minzuUrl} width={300} /></div>)
      }
      else{
        return ( <div><audio controls src={record.minzuUrl} /></div>)
      }
    }
  },
  {
    title: '民族',
    dataIndex: 'minzuType',
    copyable: true,
  },
  {
    title: '资源名',
    dataIndex: 'minzuName',
    copyable: true,
  },
];

export default () => {
  const actionRef = useRef<ActionType>();

  const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };





  return (
    <div>



      <Card bordered={true}>
        <Form
          layout="inline"
          onValuesChange={async (_, values) => {
            // 表单项变化时请求数据
            console.log(values);
            //run(values);
            const minzuList = await searchMinzuBy(values);
            console.log("123",minzuList);
            return {
              data: minzuList
            }
          }}
        >
          <StandardFormRow title="民族" block style={{ paddingBottom: 11 }}>
            <FormItem name="minzuType">
              <TagSelect expandable>
                <TagSelect.Option value="回族">回族</TagSelect.Option>
                <TagSelect.Option value="彝族">彝族</TagSelect.Option>
                <TagSelect.Option value="cat3">类目三</TagSelect.Option>
                <TagSelect.Option value="cat4">类目四</TagSelect.Option>
                <TagSelect.Option value="cat5">类目五</TagSelect.Option>
                <TagSelect.Option value="cat6">类目六</TagSelect.Option>
                <TagSelect.Option value="cat7">类目七</TagSelect.Option>
                <TagSelect.Option value="cat8">类目八</TagSelect.Option>
                <TagSelect.Option value="cat9">类目九</TagSelect.Option>
                <TagSelect.Option value="cat10">类目十</TagSelect.Option>
                <TagSelect.Option value="cat11">类目十一</TagSelect.Option>
                <TagSelect.Option value="cat12">类目十二</TagSelect.Option>
              </TagSelect>
            </FormItem>
          </StandardFormRow>

          <StandardFormRow title="其它选项" grid last>
            <Row gutter={16}>
              <Col lg={8} md={10} sm={10} xs={24}>
                <FormItem {...formItemLayout} label="媒体" name="minzuSource">
                  <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                    <Option value="0">图片</Option>
                    <Option value="1">音频</Option>
                    <Option value="2">视频</Option>
                    <Option value="3">不限</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>

    <ProTable<API.CurrentMinzu>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        const minzuList = await searchMinzu();
        console.log('1234',minzuList);
        return {
          data: minzuList
        }
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
      }}
      rowKey="id"
      /*search={{
        labelWidth: 'auto',
      }}*/
      search={false}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
      }}
      dateFormatter="string"
      headerTitle="民族库表格"
    />

    </div>
  );
};
