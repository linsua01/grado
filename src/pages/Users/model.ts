
import { Reducer, Effect, Subscription } from 'umi';
import { queryAll, add, edit, del } from '../../services/commonAPI'
import { message } from 'antd';
import { SingleUserType } from './data'

export interface UserState {
  data: SingleUserType[],
  meta: {
    total: number,
    per_page: number,
    page: number
  }
}

interface UserModelType {
  namespace: 'users',
  state: UserState,
  reducers: {
    getList: Reducer<UserState>
  },
  effects: {
    getRemote: Effect,
    create: Effect,
    edit: Effect,
    delete: Effect,
  },
  subscriptions: {
    setup: Subscription
  }
}

const UserModel: UserModelType = {
    namespace: 'users',
    state: {
      data: [],
      meta: {
        total: 0,
        per_page: 5,
        page: 1
      }
    },
    reducers: {
      getList(state, action){
        return action.payload  
      }
    },
    effects: {
      // 获取列表数据
      *getRemote({ payload: { page, per_page }}, {put, call}){
        const data = yield call(queryAll,'users')
        
        if(data){
          yield put({
            type: 'getList',
            payload: {
              data: data.data
            }
          })
        }
        
      },
      *create({payload:values}, { put, call, select }){
          const data = yield call(add,'users', values);
          console.log(data);
          if(data && data.status != '400'){
            yield put({
              type: 'getRemote',
              payload: {}
            })
            message.success('Create Success')
          }else{
            message.error('Edit Error ' + data.data.message[0].messages[0].message)
        }
      },
      
      
      *edit({payload:values}, { put, call, select }){
        
        const data = yield call(edit,'users',values)
        console.log(data)
        if(data && data.status != '400') {
          yield put({
            type: 'getRemote',
            payload: {}
          })
          message.success('Edit Success')
        }else{
          message.error('Edit Error ' + data.data.message[0].messages[0].message)
        }
      },
      
      *delete({payload:values}, { put, call, select }){
        
        const data = yield call(del, 'users', values )
      
        if(data && data.status != '400') {
          yield put({
            type: 'getRemote',
            payload: {}
          })
          message.success('Delete Success')
        }else{
          message.error('Delete Error')
        }
      },
    },
    
    subscriptions: {
      setup({ dispatch, history }, done){
        return history.listen(({pathname}) => {
          // console.log('subscriptions')
          if(pathname === '/users'){
            dispatch({
              type: 'getRemote',
              payload: {}
            })
          }
        })
      }
    }

}

export default UserModel
