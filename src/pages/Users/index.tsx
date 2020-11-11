import React,{ useState, FC } from 'react'
import { Popconfirm, Button } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table'; 
import { connect, Dispatch, Loading, UserState } from 'umi'
import UserModal from './components/UserModal'
import { SingleUserType, FormValue } from './data.d'
import { PageContainer } from '@ant-design/pro-layout';

interface UserPageProps { 
  users: UserState,
  dispatch: Dispatch,
  handleCancle: ()=>void,
  onFinish: (values: FormValue) => void,
  userListLoading: boolean,
  confirmLoading: boolean,
}


const UserListPage:FC<UserPageProps> = ({ users, dispatch, userListLoading } ) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [confirmLoading, setConfirmloading] = useState(false)

  const [record, setRecord] = useState<SingleUserType | null>(null)
  
  // 关闭modal
  const handleCancle = () => {
    setModalVisible(false)
  }

  const listDelete = (record: SingleUserType) => {
    console.log(record)
    setRecord(record)
  }

  // 刷新
  const resetHandler = () => {
    dispatch({
      type: 'users/getRemote',
      payload: {}
    })
  }

  // 删除
  const confirmDelete = () => {
    dispatch({
      type: 'users/delete',
      payload: record
    })    
  }

  // 增加
  const addClick = () =>{
    setRecord(null)
    setModalVisible(true)
  }

  // 点击编辑按钮
  const editClick = (record: SingleUserType) => {
    setModalVisible(true)
    setRecord(record)
  }

  // 确认修改
  const onFinish = async(values: FormValue) => {
    
    if (record)
      dispatch({
        type: 'users/edit',
        payload: values
      })
      
    else
      dispatch({
        type: 'users/create',
        payload: values
      })
      setModalVisible(false);
    //resetHandler();
    
    /*setConfirmloading(true)
    let id = 0;
    if(record){
      id = record.id
    }

    let serviceFunc;
    if(id){
      serviceFunc = modify(values)
    }else{
      serviceFunc = create(values);
    }
    const result = await serviceFunc({id, values})

    if(result){ 
      setModalVisible(false)
      setConfirmloading(false)
      message.success(`${id === 0 ? 'ADD' : 'Edit'} Success`)
      resetHandler()
    }else{
      message.error(`${id === 0 ? 'Add' : 'Edit'} Failed`)
      setConfirmloading(false)
    }*/

  };

  // 页码跳转
  /*const paginationChange = (page: number, pageSize?: number) => {
    dispatch({
      type: 'users/getRemote',
      payload:{
        page,
        per_page: pageSize ? pageSize : users.meta.per_page
      }
    })
  }*/

  const columns: ProColumns<SingleUserType>[] = [
      {
        title: 'Id',
        dataIndex: 'id',
        valueType: 'digit'
      },
      {
        title: 'Name',
        dataIndex: 'username',
        valueType: 'text'
      },
      {
        title: 'Create Time',
        dataIndex: 'created_at',
        valueType: 'dateTime'
      },
      {
        title: 'Action',
        valueType: 'option',
        render: (text: any, record: SingleUserType) => [
            <a key={record.id} onClick={()=>editClick(record)}>Edit</a>,
            <Popconfirm
              key = {record.created_at}
              title="Are you sure delete this task?"
              onConfirm={confirmDelete}
              okText="Yes"
              cancelText="No"
            >
              <a  onClick={()=>listDelete(record)}>Delete</a>
            </Popconfirm>
        ]
      },
  ];

  return(
    <PageContainer>
          <ProTable 
            rowKey='id' 
            headerTitle="User List"
            toolBarRender={() => [
              <Button key='1' onClick={addClick}type='primary'>New</Button>
            ]}
            columns={columns} 
            dataSource={users.data} 
            loading={userListLoading}
            search={false}
            options={{
              density: true,
              fullScreen: true,
              reload: () => {
                resetHandler()
              },
              setting: true
            }}
          />

          <UserModal 
            visible={modalVisible} 
            handleCancle={handleCancle} 
            record={record}
            onFinish={onFinish}
            confirmLoading={confirmLoading}
          />  

      </PageContainer>  
  )
}

const mapStateToProps = ({ users, loading }: {users: UserState, loading: Loading}) => {
  return {
    users,
    userListLoadin: loading.models.users
  }
}
export default connect(mapStateToProps)(UserListPage)