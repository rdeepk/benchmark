import axios from 'axios';
import { getAccessToken, getIdToken } from '../utils/AuthService';

const baseUrl = 'http://localhost:8000';
const ACCESS_TOKEN_KEY = getAccessToken();
const ID_TOKEN_KEY = getIdToken();
const BULLETINS = 'bulletins';

/*
*	updates local storage on adding new bulletin.
*/
let _addBulletinToLocalStorage = (data) => {
    let bulletins = JSON.parse(localStorage.getItem(BULLETINS));
    bulletins.messages.unshift(data)
    let newData = {
        writeAccess: bulletins.writeAccess,
        messages: bulletins.messages
    }
    localStorage.setItem(BULLETINS, JSON.stringify(newData));
}

/*
*	updates local storage on editing existing bulletin.
*/
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

/*
*	updates local storage on deleting a bulletin.
*/
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

/*
*	Gets all bulletins.
*/
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

/*
*	sends post request to update existing bulletin.
*/
export function updateBulletin(doc) {
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

/*
*	sends delete request on deletion of a bulletin.
*/
export function deleteBulletin(id) {
    return new Promise((resolve, reject) => {
        axios.delete(`${baseUrl}/bulletin/delete?id=${id}`, 
            { headers: { 
                Authorization: `Bearer ${ACCESS_TOKEN_KEY}`,
                id_token: ID_TOKEN_KEY
                    }
            })
            .then((response) => {
                _deleteBulletinLocalStorage(response.data.message._id);
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
      })
}

/*
*	Sends post request on creation of a new bulletin.
*/
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