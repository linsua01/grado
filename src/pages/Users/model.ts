
import { Reducer, Effect, Subscription } from 'umi';
import { queryAll, create, modify, del } from './service'
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
        const data = yield call(queryAll)
        if(data){
          yield put({
            type: 'getList',
            payload: {
              data: data
            }
          })
        }
        
      },
      *create({payload:values}, { put, call, select }){
        
        
        const data = yield call(create,values)
        if(data){
          yield put({
            type: 'getRemote',
            payload: {}
          })
          message.success('Create Success')
        }else{
          message.error('Create Error')
        }
      },
      // 删除
      
      *edit({payload:values}, { put, call, select }){
        
        const data = yield call(modify,values)
        console.log(data)
        if(data){
          yield put({
            type: 'getRemote',
            payload: {}
          })
          message.success('Edit Success')
        }else{
          message.error('Edit Error')
        }
      },
      // 删除
      *delete({payload:{id}}, { put, call, select }){
        
        const data = yield call(del,{ id })
      
        if(data){
          yield put({
            type: 'getRemote',
            payload: {id}
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
