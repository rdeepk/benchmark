import React, { Component } from 'react';
import Grade from './Grade';
import {getAttendance} from '../../api/attendance';

/*
*  Top level container to display attendance for teachers.
*/
class GradesList extends Component {
  constructor() {
    super();
    this.state = {
      selectedGrade : 'Select Grade',
      attendance: [],
      displayAttendanceForm: 'none',
      displayAddLink: 'none'
    }
  }

  /*
  *  Called at on change event of grades dropdown used to display the grades the teacher connected with.
  */
  handleGrades = (e) => {
    this.setState({
      selectedGrade: e.target.value,
      displayAddLink: e.target.value === 'Select Grade'? 'none' : 'block'
    })
  }

  /*
  *  Gets attendance to set state for teachers.
  */
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

  /*
  *  updates state on addition if a new attendance object.
  */
  addToAttendanceState = (data) => {
    this.state.attendance.push(data);
    this.setState({attendance: this.state.attendance});
  }

  /*
  *  Toggles the display of add new attendance form.
  */
  toggleAttendanceFormDisplay = (e) => {
    e.preventDefault();
    const {displayAttendanceForm} = this.state;
    this.setState({
      displayAttendanceForm: displayAttendanceForm === 'block' ? 'none' : 'block'
    })
  }

  /*
  *  Triggered  on the click of add new attendance form.
  */
  displayAttendanceForm = (e) => {
    e.preventDefault();
    this.setState({
      displayAttendanceForm: 'block'
    })
  }

  render() {

    let gradeAttendance;
    let messageText;
    //display the attendance for the selected grade.
    if(this.state.attendance) {
      if(this.state.selectedGrade === 'Select Grade') {
        messageText = <p className="highlight">Please select a Grade to View or add attendance.</p>
      } else {
        gradeAttendance = this.state.attendance.filter((item, i) => {
          return item.grade._id === this.state.selectedGrade;
        })
      }
    }

    // Populate the grades dropdown
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
      <div className="content attendance-header flexed">
        <div>
          <h1>Attendance</h1>
        </div>
        <div>
          <select class="custom-select" id="inlineFormCustomSelect" value = {this.state.selectedGrade} onChange={this.handleGrades}>
          <option value="Select Grade">Select Grade</option>
          {gradesSelectJSX}</select>
        </div>
        <div style ={{display: this.state.displayAddLink}}>
          <a href="" className="btn btn-primary" onClick={(e) => {this.displayAttendanceForm(e)}}><i class="fa fa-plus" aria-hidden="true"></i><span>Add Attendance</span></a>
        </div>
      </div>
      {messageText}
      {gradeJSX}
      </div>
   );
  }
}

export default GradesList;