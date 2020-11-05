import React, {FC} from 'react';    
import {connect, CustomerModelState, ConnectProps} from 'umi';       


interface PageProps extends ConnectProps {
  customers : CustomerModelState ; 
}

const Customers:FC<PageProps>=(props)=>   {         
  console.log(props.customers.data);      
  return (
    <div>
      <h1>Page Customers</h1>
      <h2>This is {JSON.stringify(props.customers.data)}</h2>
    </div>
  ) ;
}

export default connect(({customers}:{customers:CustomerModelState})=>({customers}))(Customers);    