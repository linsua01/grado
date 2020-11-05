import React, {FC, useState, useRef} from 'react';    
import {connect, CustomerModelState, ConnectProps} from 'umi';   

import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Input, Drawer } from 'antd';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';

//import CreateForm from './components/CreateForm';
//import UpdateForm, { FormValueType } from './components/UpdateForm';
//import { TableListItem } from './data.d';
//import { queryRule, updateRule, addRule, removeRule } from './service';


interface PageProps extends ConnectProps {
  customers : CustomerModelState ; 
}

const Customers:FC<PageProps>=(props)=>   {              

    //const [createModalVisible, handleModalVisible] = useState<boolean>(false);
    //const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
    //const [stepFormValues, setStepFormValues] = useState({});
    //const actionRef = useRef<ActionType>();
    const [row, setRow] = useState();
    //const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
    
    const columns: ProColumns[] = [
      {
        title: 'Id',
        dataIndex: 'id',
        tip: 'key',
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'id',
            },
          ],
        },
        render: (dom, entity) => {
          return <a onClick={() => setRow(entity)}>{dom}</a>;
        },
      },
      {
        title: 'Name',
        dataIndex: 'name',
        valueType: 'text',
        sorter: true,
        formItemProps: {
            rules: [
              {
                required: true,
                message: 'name',
              },
            ],
          },
      },
      {
        title: 'Email',
        dataIndex: 'email',
        sorter: true,
        hideInForm: false,
        renderText: (val: string) => <a href="">{val}</a>,
      },
      {
        title: 'State',
        dataIndex: 'state',
        hideInForm: true,
        valueEnum: {
          0: { text: 'Active', status: 'Active' },
          1: { text: 'Inactive', status: 'Processing' },
          2: { text: 'Success', status: 'Success' },
          3: { text: 'Error', status: 'Error' },
        },
      },
      {
        title: 'Actions',
        dataIndex: 'option',
        valueType: 'option',
        render: (_, record) => (
          <>
            <a onClick={() => {
                //handleUpdateModalVisible(true);
                //setStepFormValues(record);
              }}>Edit</a>
            <Divider type="vertical" />
            <a href="">Delete</a>
          </>
        ),
      },
    ];
  
    return (
      <PageContainer>
        
        <ProTable
          headerTitle=""
          rowKey="key"
          search={{
            labelWidth: 120,
          }}
          dataSource={props.customers.data}
          columns={columns}
          toolBarRender={() => [
            <Button type="primary">
              <PlusOutlined /> New
            </Button>,
          ]}
          
        />
            
        
        
       
  
        
      </PageContainer>
    );
  };

export default connect(({customers}:{customers:CustomerModelState})=>({customers}))(Customers);    