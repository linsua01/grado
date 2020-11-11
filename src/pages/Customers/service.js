import { request } from 'umi';
import axios from 'axios';



<<<<<<< HEAD
const CUSTOMER_API = `https://db.grado.land/customers`;
=======
const CUSTOMER_API = `https://db.gradho.com/customers`;
>>>>>>> 5b28138b12e5d2d26fdf2bed0ba78dda1b89fa91

export async function query(params) {
    return request(`${CUSTOMER_API}?${qs.stringify(params)}`);
}

export async function queryAll() {
    return request(`${CUSTOMER_API}`);
}

export async function create1(params) {
    console.log({...params})
    return request(CUSTOMER_API, {
        method: 'post',
        body: {...params}
    });
}

export async function create(params) {
    return axios.post(CUSTOMER_API,{...params});
}

export async function modify(params) {
    return request(`${CUSTOMER_API}/${params['id']}`, {
        method: 'put',
        body: JSON.stringify(params)
    });
}

export async function del(params) {
    return request(`${CUSTOMER_API}/${params['id']}`, {
        method: 'delete'
    });
}