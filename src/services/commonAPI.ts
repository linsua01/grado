import { request } from 'umi';
import axios from 'axios';

const COMMON_API = 'https://db.grado.land/';

export async function query(api, params) {
    return request(`${COMMON_API}${api}?${params.stringify(params)}`);
}

export async function queryAll(api) {
    return axios.get(`${COMMON_API}${api}`);
}

export async function add(api, params)  {
    return axios.post(`${COMMON_API}${api}`,{...params})
        .then(response => { 
            return response
        })
        .catch(error => {
            return error.response
        });  
}

export async function edit(api, params) {
    return axios.put(`${COMMON_API}${api}${'/'}${params['id']}`,{...params})
        .then(response => { 
            return response
        })
        .catch(error => {
            return error.response
        });
}

export async function del(api, params) {
    return axios.delete(`${COMMON_API}${api}${'/'}${params['id']}`)
        .then(response => { 
            return response
        })
        .catch(error => {
            return error.response
        });
}

