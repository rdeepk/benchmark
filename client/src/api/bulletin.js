import axios from 'axios';
import { getAccessToken, getIdToken } from '../utils/AuthService';

const baseUrl = 'http://localhost:8000';
const ACCESS_TOKEN_KEY = getAccessToken();
const ID_TOKEN_KEY = getIdToken();
const BULLETINS = 'bulletins';

let _addBulletinToLocalStorage = (data) => {
    let bulletins = JSON.parse(localStorage.getItem(BULLETINS));
    bulletins.messages.unshift(data)
    let newData = {
        writeAccess: bulletins.writeAccess,
        messages: bulletins.messages
    }
    localStorage.setItem(BULLETINS, JSON.stringify(newData));
}

let _updateBulletinInLocalStorage = (data) => {
    let bulletins = JSON.parse(localStorage.getItem(BULLETINS));
    let newMessages = bulletins.messages.map((message, key) => {
        if(message._id === data._id) {
          message.message = data.message;
        }
        return  message;
      })
    let newState = {
      writeAccess: bulletins.writeAccess,
      messages: newMessages
    }

    localStorage.setItem(BULLETINS, JSON.stringify(newState));
}

let _deleteBulletinLocalStorage = (id) => {
    let bulletins = JSON.parse(localStorage.getItem(BULLETINS));
    let newMessages = bulletins.messages.filter((message, key) => {
        return message._id !== id
    })

    let newState = {
      writeAccess: bulletins.writeAccess,
      messages: newMessages
    }

    localStorage.setItem(BULLETINS, JSON.stringify(newState));
}

export function getBulletin() {
    console.log(ACCESS_TOKEN_KEY);
    console.log(ID_TOKEN_KEY);
    let bulletins = localStorage.getItem(BULLETINS);
    return new Promise((resolve, reject) => {
        if(bulletins) {
           resolve(JSON.parse(bulletins));
        }
        axios.get(`${baseUrl}/bulletin/messages`,  { headers: { 
                        Authorization: `Bearer ${ACCESS_TOKEN_KEY}`,
                        id_token: ID_TOKEN_KEY
                            }
                        })
            .then((response) => {
                localStorage.setItem(BULLETINS, JSON.stringify(response.data));
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
      })
}

export function updateBulletin(doc) {
    console.log(doc);
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/bulletin/update?id=${doc._id}`, doc,
            { headers: { 
                Authorization: `Bearer ${ACCESS_TOKEN_KEY}`,
                id_token: ID_TOKEN_KEY
                    }
            })
            .then((response) => {
                _updateBulletinInLocalStorage(response.data);
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
      })

}

export function deleteBulletin(id) {
    console.log(id);
    return new Promise((resolve, reject) => {
        axios.delete(`${baseUrl}/bulletin/delete?id=${id}`, 
            { headers: { 
                Authorization: `Bearer ${ACCESS_TOKEN_KEY}`,
                id_token: ID_TOKEN_KEY
                    }
            })
            .then((response) => {
                _deleteBulletinLocalStorage(response.data.message._id);
                console.log("api:  ", response);
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
      })
}


export function createBulletin(text) {
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/bulletin/create`, { message: text },
            { headers: { 
                Authorization: `Bearer ${ACCESS_TOKEN_KEY}`,
                id_token: ID_TOKEN_KEY
                    }
            })
            .then((response) => {
                _addBulletinToLocalStorage(response.data);
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
      })
}