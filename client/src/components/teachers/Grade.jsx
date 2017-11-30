import React, { Component } from 'react';
import StudentsList from './StudentsList';

class Grade extends Component {
  render() {
    return (
      <div>
        <StudentsList students={this.props.grade.students}
                      gradeId={this.props.grade._id}
                      attendance={this.props.attendance}
                      displayAttendanceForm={this.props.displayAttendanceForm}
                      toggleAttendanceFormDisplay={this.props.toggleAttendanceFormDisplay}
                      addToAttendanceState={this.props.addToAttendanceState} />
      </div>
   );
  }
}

export default Grade;