import React, { Component } from 'react';
import {createAttendance} from '../api/attendance';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import AddAttendance from './AddAttendance';
import Attendance from './Attendance';

class StudentsList extends Component {
    constructor() {
        super();
        this.state = {
            date: moment()
        }
    }

  onDateChange = (date) => {
    this.setState({ date });
  }

  _isDateSame = (date1, date2) => {
    let dateOne = new Date(date1);
    let dateTwo = new Date(date2);
    if(dateOne.getFullYear() === dateTwo.getFullYear() &&
        (dateOne.getMonth() === dateTwo.getMonth()) &&
        (dateOne.getDate() === dateTwo.getDate())) {
            return true;
        } else {
        return false
    }
  }

  render() {
      console.log(this.state.date.format('YYYY-MM-DD'));
      let attendanceData = this.props.attendance.filter((item, i) => {
        return this._isDateSame(item.date, this.state.date);
      })
      console.log(attendanceData);
      let attendanceJSX;
      if(attendanceData) {
          attendanceJSX = attendanceData.map((item, i) => {
              return <Attendance attendance={item} />
          })
      }
    return (
      <div className="add-attendance">
      <DatePicker   selected={this.state.date}
                    onChange={this.onDateChange}
                    dateFormat="YYYY-MM-DD"
                />
        {attendanceJSX}

        {/* <AddAttendance students={this.props.students} gradeId={this.props.gradeId}/> */}
        </div>
   );
  }
}

export default StudentsList;