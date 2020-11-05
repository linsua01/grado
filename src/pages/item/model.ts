import {Effect,Reducer,Subscription,request} from'umi';     

export  interface HeroModelState  {
  name:string; 
  heros: [],
}     

export  interface  HeroModelType  {
  namespace:'hero'; 
  state : HeroModelState ; 
  effects: {
    query:Effect; 
    fetch:Effect; 
  } ;
  reducers: {
    save : Reducer < HeroModelState > ; 
  } ;
  subscriptions: {setup:Subscription};  
}

const  HeroModel : HeroModelType = {   
  namespace:'hero', 

  state: {
    name:'Luciano!', 
    heros: [],
  } ,

  effects: {
    *query({payload},{call,put}){       
    } ,
    *fetch({type,payload},{put,call,select}) {  
        const data = yield request('/web201605/js/herolist.json');       
        const  localData  =  [
          {
            ename : 105 , 
            cname : 'Lian Po' , 
            title : 'Justice Detonation' , 
            new_type:0, 
            hero_type:3, 
            skin_name : 'Justice Detonation|Hell Rock Soul' , 
          },
          {
            ename : 106, 
            cname : 'Little Joe' , 
            title : 'The Breeze of Love' , 
            new_type:0, 
            hero_type:2, 
            skin_name : 'Breeze of Love|Halloween Eve|Swans Dream|Pure White Flower Wedding|Colorful Unicorn' , 
          } 
        ] ;
        yield put({
          type:'save', 
          payload: {
            heros:data || localData, 
          } ,
        } ) ;
      } ,
  } ,
  reducers: {
    save(state,action){  
      return {
        ...state,
        ...action.payload,
      } ;
    } ,
  } ,
  subscriptions: {
    setup({dispatch,history}){    
        return history.listen(({pathname})=>{     
            if (pathname === '/hero1') {
                dispatch({
                    type:'fetch' 
                } )
            }
        } ) ;
    }
} ,
}

export  default  HeroModel ;