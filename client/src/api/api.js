import axios from 'axios';
import { getAccessToken, getIdToken } from '../utils/AuthService';
const baseUrl = 'http://localhost:8000';
const ACCESS_TOKEN_KEY = getAccessToken();
const ID_TOKEN_KEY = getIdToken();


export function getLinks() {
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/user/links`,  { headers: { 
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
      })
}


export function getGrades(endPoint) {
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}${endPoint}`,  { headers: { 
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
      })
}