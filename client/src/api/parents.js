import axios from 'axios';
import { getAccessToken, getIdToken } from '../utils/AuthService';

const baseUrl = 'http://localhost:8000';
const ACCESS_TOKEN_KEY = getAccessToken();
const ID_TOKEN_KEY = getIdToken();


export function getAttendance(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${baseUrl}/attendance/forParent?id=${id}`,  { headers: { 
                            Authorization: `Bearer ${ACCESS_TOKEN_KEY}`,
                            id_token: ID_TOKEN_KEY
                                }
                            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
   
}

export function getChildren() {
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/parent/children`,  { headers: { 
                        Authorization: `Bearer ${ACCESS_TOKEN_KEY}`,
                        id_token: ID_TOKEN_KEY
                            }
                        })
            .then((response) => {
                console.log(response.data); 
                resolve(response.data);               
            })
            .catch((error) => {
                reject(error);
            });
      })
}

export function createParent() {

    let newParent = {
        parentId: '5a1c911e8612e94f70380d5b',
        children: ['5a1c8f658612e94f70380d51']
    }

    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/parent/create`, newParent,
            { headers: { 
                Authorization: `Bearer ${ACCESS_TOKEN_KEY}`,
                id_token: ID_TOKEN_KEY
                    }
            })
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
      })
}