import axios from 'axios';
import { getAccessToken } from '../utils/AuthService';

const baseUrl = 'http://localhost:8000';
const token = getAccessToken();


export function getBulletin() {
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/bulletin/messages`,  { headers: { Authorization: `Bearer ${token}` }})
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
      })
}