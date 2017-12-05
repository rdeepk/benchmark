import React, { Component } from 'react';
import {createAttendance} from '../../api/attendance';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import AddAttendance from './AddAttendance';
import Attendance from './Attendance';

/*
*  Component populated with all students of the selected grade for teachers.
*/
class StudentsList extends Component {
    constructor() {
        super();
        this.state = {
            date: moment()
        }
    }

/*
*  Sets the new date state on change event of date dropdown.
*/
  onDateChange = (date) => {
    this.setState({ date });
  }

/*
*  Compare two dates to check if they match.
*/
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

    //get attendance for the selected date.
      let attendanceData = this.props.attendance.filter((item, i) => {
        return this._isDateSame(item.date, this.state.date);
      })

      let attendanceJSX;
      if(attendanceData) {
          attendanceJSX = attendanceData.map((item, i) => {
              return <Attendance attendance={item} />
          })
      }
    return (
      <div className="add-attendance">
        <AddAttendance  students={this.props.students}
                        gradeId={this.props.gradeId}
                        displayAttendanceForm={this.props.displayAttendanceForm}
                        toggleAttendanceFormDisplay={this.props.toggleAttendanceFormDisplay}
                        addToAttendanceState={this.props.addToAttendanceState}
                        />
        <div className="row">
            <div className="col-sm-12 text-center">
                <span>Click to Choose Date</span>
                <DatePicker className="form-control" selected={this.state.date}
                        onChange={this.onDateChange}
                        dateFormat="YYYY-MM-DD"
                        utcOffset={0}
                    />
            </div>
        </div>
        {attendanceJSX}
        </div>
   );
  }
}

export default StudentsList;