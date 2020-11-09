import React, {FC, useState, useRef} from 'react';    
import {connect, CustomerModelState, ConnectProps} from 'umi';   

import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Popconfirm, message, Input, Drawer,  } from 'antd';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';

import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
//import { TableListItem } from './data.d';
import { create } from './service';


interface PageProps extends ConnectProps {
  customers : CustomerModelState ; 
}

const Customers:FC<PageProps>=(props)=>   {              

    const [createModalVisible, handleModalVisible] = useState<boolean>(false);
    const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
    const [stepFormValues, setStepFormValues] = useState({});
    //const actionRef = useRef<ActionType>();
    const [row, setRow] = useState();
    const [selectedRowsState, setSelectedRows] = useState([]);
    
    const columns: ProColumns[] = [
      {
        title: 'Id',
        dataIndex: 'id',
        hideInForm: true,
        tip: 'key',
        render: (dom, entity) => {
          return <a onClick={() => setRow(entity)}>{dom}</a>;
        },
      },
      {
        title: 'Name',
        dataIndex: 'name',
        valueType: 'text',
        sorter: (a, b) => a.name - b.name,
        filters : true,      
        search: false,   
        formItemProps: {
            rules: [
              {
                required: true,
                message: 'Name is required',
              },
            ],
          },
      },
      {
        title: 'Email',
        dataIndex: 'email',
        valueType: 'text',
        sorter: true,
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Email is required',
            },
          ],
        },
        renderText: (val: string) => <a href="">{val}</a>,
      },
      {
        title: 'State',
        dataIndex: 'state',
        initialValue: 'Active',
        filters : true,  
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
                handleModalVisible(true);
                setStepFormValues(record);
              }}>Edit</a>
            <Divider type="vertical" />
            <Popconfirm
              key={record.id}
              title="Are you sure?"
              okText="Yes"
              cancelText="No"
            >
            <a>Delete</a>
            </Popconfirm>
          </>
        ),
      },
    ];
  
    return (
      <PageContainer>
        
        <ProTable
          headerTitle='Customers'
          search={false}
          rowKey="key"
          options={{
            search: true,
          }}
          dataSource={props.customers.data}
          columns={columns}
          rowSelection={{
            onChange: (_, selectedRows) => setSelectedRows(selectedRows),
          }}
          toolBarRender={
            
            
            (_, { selectedRowKeys }) => [
            
            selectedRowKeys?.length ? (
                <>
                <Button
                  key="3"
                  onClick={() => {
                    window.alert(selectedRowKeys.join('-'));
                  }}
                >
                  Send Email
                </Button>
                <Button
                  key="3"
                  onClick={() => {
                    window.alert(selectedRowKeys.join('-'));
                  }}
                >
                  Bulk deletion
                </Button>
                </>
              ) : (null),
            <Button type="primary" onClick={() => handleModalVisible(true)}>
              <PlusOutlined /> New
            </Button>
          ]}
          
          
        />
        <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable
          onSubmit={async (value) => {
            const newRec = create(value);
            handleModalVisible(false);
          }}
          type="form"
          columns={columns}
          
        />
        </CreateForm>

        {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const newRec = create(value);
            handleUpdateModalVisible(false);
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}

      </PageContainer>
    );
  };

export default connect(({customers}:{customers:CustomerModelState})=>({customers}))(Customers);    