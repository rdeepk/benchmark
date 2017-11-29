import axios from 'axios';
import { getAccessToken, getIdToken } from '../utils/AuthService';

const baseUrl = 'http://localhost:8000';
const ACCESS_TOKEN_KEY = getAccessToken();
const ID_TOKEN_KEY = getIdToken();


export function getAttendance() {
    console.log(ACCESS_TOKEN_KEY);
    console.log(ID_TOKEN_KEY);
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/attendance/get`,  { headers: { 
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

export function createAttendance(gradeId, data) {
    let present = [], absent = [];
    for (let i = 0; i < data.studentCount.value; i++ ) {
        data['attendance'+i].value == 'true' ? present.push(data['attendance'+i].id) : absent.push(data['attendance'+i].id);
    }

    let newAttendance = {
        date: new Date(data.date.value).toISOString(),
        subject: data.subject.value,
        timeFrom: new Date(data.date.value + ' ' + data.hoursFrom.value).toISOString(),
        timeTo: new Date(data.date.value + ' ' + data.hoursTo.value).toISOString(),
        grade: gradeId,
        present: present,
        absent: absent
    }

    console.log(newAttendance);
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/attendance/create`, newAttendance,
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