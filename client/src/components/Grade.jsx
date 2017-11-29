import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import StudentsList from './StudentsList';

class Grade extends Component {
  render() {
    return (
      <div>
        <StudentsList students={this.props.grade.students}
                      gradeId={this.props.grade._id}
                      attendance={this.props.attendance}
                      displayAttendanceForm={this.props.displayAttendanceForm}
                      toggleAttendanceFormDisplay={this.props.toggleAttendanceFormDisplay} />
      </div>
   );
  }
}

export default Grade;