import React, { Component } from 'react';
import {getAttendanceForStudent} from '../../api/attendance';

class StudentAttendance extends Component {
        constructor() {
            super();
            this.state = {
                studentAttendance: []
            }
        }

    componentDidMount() {
        getAttendanceForStudent();
    }

  render() {
    return (
        <div>
        </div>
   );
  }
}

export default StudentAttendance;