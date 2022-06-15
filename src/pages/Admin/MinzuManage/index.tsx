import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import {searchMinzu, searchUsers} from "@/services/ant-design-pro/api";
import {Image} from "antd";

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
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    hideInSearch: true,
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.minzuUrl} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();


  return (
    <ProTable<API.CurrentMinzu>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        const minzuList = await searchMinzu();
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
      search={{
        labelWidth: 'auto',
      }}
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
  );
};
