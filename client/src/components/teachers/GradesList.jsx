import React, { Component } from 'react';
import Grade from './Grade';
import {getAttendance} from '../../api/attendance';

class GradesList extends Component {
  constructor() {
    super();
    this.state = {
      selectedGrade : 'Select Grade',
      attendance: [],
      displayAttendanceForm: 'none'
    }
  }

  handleGrades = (e) => {
    this.setState({
      selectedGrade: e.target.value
    })
  }


  setAttendance = () => {
    getAttendance()
    .then((data) => {
      this.setState({
        attendance: data
      })
    })
  }

  componentWillMount() {
    this.setAttendance();
  }

  addToAttendanceState = (data) => {
    this.state.attendance.push(data);
    this.setState({attendance: this.state.attendance});
  }

  toggleAttendanceFormDisplay = (e) => {
    e.preventDefault();
    const {displayAttendanceForm} = this.state;
    this.setState({
      displayAttendanceForm: displayAttendanceForm === 'block' ? 'none' : 'block'
    })
  }

  render() {
    let gradeAttendance;
    let messageText;

    if(this.state.attendance) {
      if(this.state.selectedGrade === 'Select Grade') {
        messageText = <p className="highlight">Please select a Grade to View or add attendance.</p>
      } else {
        gradeAttendance = this.state.attendance.filter((item, i) => {
          return item.grade._id === this.state.selectedGrade;
        })
      }
    }
    let gradesSelectJSX;
    let gradeJSX;
    if(this.props.grades) {
      gradesSelectJSX = this.props.grades.map((grade, i) => {
        return <option value={grade._id}>Grade {grade.name}</option>
      })

      this.props.grades.forEach((grade, i) => {
        if (grade._id === this.state.selectedGrade) {
          gradeJSX = <Grade grade={grade}
                            attendance={gradeAttendance}
                            displayAttendanceForm={this.state.displayAttendanceForm}
                            toggleAttendanceFormDisplay={this.toggleAttendanceFormDisplay}
                            addToAttendanceState={this.addToAttendanceState}/>
        }
      });
    }

    return (
      <div>
      <div className="row content attendance-header">
        <div className="col-sm-6">
        <h1>Attendance</h1>
        </div>
        <div className="col-sm-3">
          <select class="custom-select pull-right" id="inlineFormCustomSelect" value = {this.state.selectedGrade} onChange={this.handleGrades}>
          <option value="Select Grade">Select Grade</option>
          {gradesSelectJSX}</select>
        </div>
        <div className="col-sm-3">
          <a href="" className="btn btn-primary" onClick={(e) => {this.toggleAttendanceFormDisplay(e)}}><i class="fa fa-plus" aria-hidden="true"></i><span>Add Attendance</span></a>
        </div>
      </div>
      {messageText}
      {gradeJSX}
      </div>
   );
  }
}

export default GradesList;