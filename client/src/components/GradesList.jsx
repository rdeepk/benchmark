import React, { Component } from 'react';
import Grade from './Grade';
import {getAttendance} from '../api/attendance';

class GradesList extends Component {
  constructor() {
    super();
    this.state = {
      selectedGrade : 'Select Grade'
    }
  }

  handleGrades = (e) => {
    this.setState({
      selectedGrade: e.target.value
    })
  }

  componentWillMount() {
    getAttendance()
      .then((data) => {
        
      })
  }

  render() {
    let gradesSelectJSX;
    let gradeJSX;
    if(this.props.grades) {
      gradesSelectJSX = this.props.grades.map((grade, i) => {
        return <option value={grade._id}>Grade {grade.name}</option>
      })


      this.props.grades.forEach((grade, i) => {
        if (grade._id === this.state.selectedGrade) {
          gradeJSX = <Grade grade={grade} />
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