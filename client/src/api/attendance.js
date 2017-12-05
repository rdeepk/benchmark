import axios from 'axios';
import { getAccessToken, getIdToken } from '../utils/AuthService';

const baseUrl = 'http://localhost:8000';
const ACCESS_TOKEN_KEY = getAccessToken();
const ID_TOKEN_KEY = getIdToken();

/*
*	Gets the attendance of a student to be displayed for teacher.
*/
export function getAttendance() {
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

/*
*	Gets attendance to be displayed for student.
*/
export function getAttendanceForStudent() {
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/attendance/student`,  { headers: { 
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

/*
*	Sends request to create attendance object for student by teacher.
*/
export function createAttendance(gradeId, data) {
    let present = [], absent = [];
    for (let i = 0; i < data.studentCount.value; i++ ) {
        data['attendance'+i].checked !== true ? present.push(data['attendance'+i].id) : absent.push(data['attendance'+i].id);
    }

    let newAttendance = {
        date: new Date(data.date.value).toISOString(),
        subject: data.subject.value,
        // timeFrom: new Date(data.date.value + ' ' + data.hoursFrom.value).toISOString(),
        // timeTo: new Date(data.date.value + ' ' + data.hoursTo.value).toISOString(),
        grade: gradeId,
        present: present,
        absent: absent
    }

    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/attendance/create`, newAttendance,
            { headers: { 
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