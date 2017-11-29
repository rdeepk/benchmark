import React, { Component } from 'react';
import {createAttendance} from '../api/attendance';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import AddAttendance from './AddAttendance';

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

  render() {
      console.log(this.state.date.format('YYYY-MM-DD'));
    return (
      <div className="add-attendance">
      <DatePicker   selected={this.state.date}
                    onChange={this.onDateChange}
                    dateFormat="YYYY-MM-DD"
                />
        <AddAttendance students={this.props.students} gradeId={this.props.gradeId}/>
        </div>
   );
  }
}

export default StudentsList;