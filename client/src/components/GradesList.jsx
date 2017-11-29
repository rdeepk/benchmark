import React, { Component } from 'react';
import Grade from './Grade';
import {getAttendance} from '../api/attendance';

class GradesList extends Component {
  constructor() {
    super();
    this.state = {
      selectedGrade : 'Select Grade',
      attendance: []
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
      console.log("attenfew:  ", data)
      this.setState({
        attendance: data
      })
    })
  }

  componentWillMount() {
    this.setAttendance();
  }

  render() {
    let gradeAttendance;
    if(this.state.attendance) {
      if(this.state.selectedGrade === 'Select Grade') {
        <h2>Please select a Grade</h2>
      } else {
        gradeAttendance = this.state.attendance.filter((item, i) => {
          return item.grade === this.state.selectedGrade;
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
          gradeJSX = <Grade grade={grade} attendance={gradeAttendance} />
        }
      });
    }

    return (
      <div>
      <div className="row content attendance-header">
        <div className="col-sm-8">
        <h1>Attendance</h1>
        </div>
        <div className="col-sm-4">
          <select class="custom-select pull-right" id="inlineFormCustomSelect" value = {this.state.selectedGrade} onChange={this.handleGrades}>
          <option value="Select Grade">Select Grade</option>
          {gradesSelectJSX}</select>
        </div>
      </div>
      {gradeJSX}
      </div>
   );
  }
}

export default GradesList;