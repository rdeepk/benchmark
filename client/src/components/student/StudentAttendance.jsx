import React, { Component } from 'react';
import {getAttendanceForStudent} from '../../api/attendance';
import {getUserById} from '../../api/users';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Attendance from './Attendance';
import {getUserId} from '../../utils/AuthService';

/*
*  Populate the attendance for a student.
*/
class StudentAttendance extends Component {
    constructor() {
        super();
        this.state = {
            attendance: [],
            date: moment(),
            user: null
        }
    }
    
    /*
    *  Takes date as a param and return the formatted date.
    */
    getFormattedDate = (date) => {
        return  moment(date).format('YYYY-MM-DD')
    }
    

    componentDidMount() {
        getUserById(getUserId()).then((user) => {
            this.setState({ user })
        })
        getAttendanceForStudent().then((resp)=> {
            this.setState({
                attendance: resp.attendance
            })  
        })
    }

    onDateChange = (date) => {
        this.setState({ date });
    }
    
    /*
    *  Compare two dates to check if they match. retun boolean..
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
    let attendanceData, attendanceJSX, present = true, userData, attendanceHeaderJSX, grade, teacher, attendanceSubHeaderJSX;
    let userId = getUserId();

    if(this.state.attendance && this.state.user) {
        let attendanceData = this.state.attendance.filter((item, i) => {
            return this._isDateSame(item.date, this.state.date);
          })
        
        if(attendanceData) {
            attendanceData.map((item, i) => {
                teacher = item.owner.name;
                grade = item.grade.name;
            })
            attendanceHeaderJSX = teacher ? 
                        <div>
                            <strong>Name:</strong> {this.state.user.name}<br />                      
                            <strong>Grade:</strong> {grade}
                        </div> : '';

            attendanceSubHeaderJSX = <div className="row title student-row-title">
                                        <div className="col-md-4">Subject</div>
                                        <div className="col-md-4">Teacher</div>
                                        <div className="col-md-4">Attendance</div>
                                    </div>


            attendanceJSX = attendanceData.map((item, i) => {
                //lets check if user from the absent array.
                present = true;
                    item.absent.filter((elem, i) => {
                        if(elem._id === userId) {
                            present = false;
                            return true
                        }
                        return false;
                    })
                    
                return <Attendance attendance={item} present={present}/>
            })
        }
    }
    
    return (
        <div>
            <div className="content attendance-header flexed">
        <div>
          <h1>Attendance</h1>
        </div>
        <div>{attendanceHeaderJSX}</div>
        </div>
            <div className="row">
                <div className="col-sm-12 text-center">
                    <span>Click to Choose Date</span>
                    <DatePicker className="form-control" selected={this.state.date}
                            onChange={this.onDateChange}
                            dateFormat="YYYY-MM-DD"
                        />
                </div>
            </div>
            <div className="container-fluid">
                <div className="attendance">
                {attendanceSubHeaderJSX}
                {attendanceJSX}
                </div>
            </div>
        </div>
   );
  }
}

export default StudentAttendance;