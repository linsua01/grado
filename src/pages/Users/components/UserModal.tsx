import React, { useEffect, FC } from 'react'
import { Modal, Form, Input, message, DatePicker, Switch  } from 'antd';
import { SingleUserType, FormValue } from '../data';
import moment from 'moment';

interface UserModalProps {
  record: SingleUserType | null,
  visible: boolean
  handleCancle: () => void,
  onFinish: (valus: FormValue) => void,
  confirmLoading: boolean,
}

const UserModal:FC<UserModalProps> = (props) => {
    const [ form ] = Form.useForm()

    const { record, visible, handleCancle, onFinish, confirmLoading } = props

    useEffect(()=>{
      if(record === null){
        form.resetFields()
      }else{
        form.setFieldsValue({
          ...record,
          create_time: moment(record.created_at),
          status: Boolean(record.status)
        })
      }
    }, [visible])

    // 确认修改
    const okModify = () => {
      form.submit()
    }
    
    const onFinishFailed = (errorInfo: any) => {
      // console.log('Failed:', errorInfo);
      message.error(errorInfo.errorFields[0].errors[0])
    };


    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    }
    
    return(
        <div>
            <Modal
              title={record ? `Edit  ID:${record.id}` : 'Add'}
              visible={visible}
              onOk={okModify}
              onCancel={handleCancle}
              forceRender
              confirmLoading={confirmLoading}
            >
              <Form
                name="basic"
                {...formItemLayout}
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{
                  status: true
                }}
              >
                <Form.Item label="Id" name="id">
                  <Input />
                </Form.Item>
                <Form.Item label="Name" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Email" name="email" >
                  <Input />
                </Form.Item>
                <Form.Item label="Password" name="password" >
                  <Input />
                </Form.Item>
                <Form.Item label="Confirmed" name="confirmed" valuePropName='checked'>
                  <Switch checkedChildren="true" unCheckedChildren="false" />
                </Form.Item>
              </Form>
            </Modal>
        </div>
    )
}
export default UserModal