import { request } from 'umi';

const CUSTOMER_API = `http://localhost:1337/customers`;

export async function query(params) {
    return request(`${CUSTOMER_API}?${qs.stringify(params)}`);
}

export async function queryAll() {
    return request(`${CUSTOMER_API}`);
}

export async function create(params) {
    return request(CUSTOMER_API, {
        method: 'post',
        body: JSON.stringify(params)
    });
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