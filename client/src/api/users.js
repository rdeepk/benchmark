import axios from 'axios';
import { getAccessToken, getIdToken } from '../utils/AuthService';

const baseUrl = 'http://localhost:8000';
const ACCESS_TOKEN_KEY = getAccessToken();
const ID_TOKEN_KEY = getIdToken();

/*
*	Gets user by passing id as a param.
*/
export function getUserById(id) {
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/user/id?id=${id}`,  { headers: { 
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