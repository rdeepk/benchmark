import React, { Component } from 'react';
import {getUserById} from '../../api/users';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Attendance from './Attendance';
import {getUserId} from '../../utils/AuthService';

/*
*  Component populated with the seleccted child data for a parent.
*/
class Child extends Component {
    constructor() {
        super();
        this.state = {
            date: moment(),
            user: null
        }
    }
            
    getFormattedDate = (date) => {
        return  moment(date).format('YYYY-MM-DD')
    }
    

    componentDidMount() {
        getUserById(getUserId()).then((user) => {
            this.setState({ user })
        })
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
    let attendanceData, attendanceJSX, present = true, userData, attendanceHeaderJSX, grade, teacher, attendanceSubHeaderJSX;
    let userId = getUserId();

    if(this.props.attendance && this.state.user) {
        let attendanceData = this.props.attendance.filter((item, i) => {
            return this._isDateSame(item.date, this.state.date);
          })
        
        if(attendanceData) {
            attendanceData.map((item, i) => {
                teacher = item.owner.name;
                grade = item.grade.name;
            })
            attendanceHeaderJSX = teacher ? 
                        <div>
                            <strong>Name:</strong> {this.props.name}<br />                      
                            <strong>Grade:</strong> {grade}
                        </div> : '';

            attendanceSubHeaderJSX = <div className="row title student-row-title">
                                        <div className="col-md-4">Subject</div>
                                        <div className="col-md-4">Teacher</div>
                                        <div className="col-md-4">Attendance</div>
                                    </div>


            attendanceJSX = attendanceData.map((item, i) => {
                //lets check if user from the absent array.
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
        <div>{attendanceHeaderJSX}</div>

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

export default Child;