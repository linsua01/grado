import { request } from 'umi';
import axios from 'axios';

const CUSTOMER_API = 'http://46.101.114.40:1337/users';

export async function query(params) {
    return request(`${CUSTOMER_API}?${params.stringify(params)}`);
}

export async function queryAll() {
    return request(`${CUSTOMER_API}`);
}

export async function create(params) {
    axios.post(CUSTOMER_API,{...params})
        .then(res => {
            console.log(res);
            return res })
    .catch(err => {
        console.log(err);
        return err;
    })      
}

export async function modify(params) {
    console.log(params);
    console.log(CUSTOMER_API + '/' + params['id']);
    return axios.put(CUSTOMER_API + '/' + params['id'],{...params});
}

export async function del(params) {
    console.log(CUSTOMER_API + '/' + params['id']);
    return axios.delete(CUSTOMER_API + '/' + params['id']);
}

/*export async function create1(params) {
    console.log({...params})
    return request(CUSTOMER_API, {
        method: 'post',
        body: {...params}
    });
}

export async function modify1(params) {
    return request(`${CUSTOMER_API}/${params['id']}`, {
        method: 'put',
        body: JSON.stringify(params)
    });
}*/

