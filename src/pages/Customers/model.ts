import {Effect, Reducer, Subscription} from'umi';
import { queryAll } from './service'

export  interface CustomerModelState  {
  data: [],
  total: 0,
  editorVisible: false,
  editorType: 'add'
}     

export  interface  CustomerModelType  {
  namespace:'customers'; 
  state : CustomerModelState ; 
  effects: {
    query:Effect; 
  } ;
  reducers: {
    save : Reducer < CustomerModelState > ; 
  } ;
  subscriptions: {setup:Subscription};  
}

const  CustomerModel : CustomerModelType = {   
  namespace:'customers', 
  state: {
    data: [],
    total: 0,
    editorVisible: false,
    editorType: 'add'
  } ,

  effects: {
    *query({type,payload},{put,call,select}) {  
        const data = yield queryAll();       
        yield put({
          type:'save', 
          payload: {
            data: data, 
          } ,
        } ) ;
      },
  },

  reducers: {
    save(state,action){  
      return {
        ...state,
        ...action.payload,
      };
    },
  },

  subscriptions: {
    setup({dispatch,history}){    
        return history.listen(({pathname})=>{     
            if (pathname === '/customers') {
                dispatch({
                    type:'query' 
                } )
            }
        } ) ;
    }
} ,
}

export  default  CustomerModel ;