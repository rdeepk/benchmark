import axios from 'axios';
import { getAccessToken, getIdToken } from '../utils/AuthService';

const baseUrl = 'http://localhost:8000';
const access_token = getAccessToken();
const id_token = getIdToken();


export function getLinks() {
    console.log(access_token);
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/links`,  { headers: { 
                                Authorization: `Bearer ${access_token}`,
                                IdToken: id_token
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