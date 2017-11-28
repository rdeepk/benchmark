import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import Student from './Student';
import {createAttendance} from '../api/attendance';

class StudentsList extends Component {

  handleAttendanceSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    createAttendance(this.form.id, e.target);
  }


  render() {
    let studentJSX;
    if(this.props.students) {

      studentJSX = this.props.students.map((student, i) => {
        console.log(student);
        // return <Student student={student} />
        return <div className="form-group">
          <label htmlFor="attendance">{student.name}</label>
          <select name={'attendance'+i} id={student._id} onChange={this.handleAttendance}>
          <option value={true}>P</option>
          <option value={false}>A</option>
          </select>
        </div>
      })
    }
    return (
      <div className="add-attendance">
                <section>
                <div className="row">
                    <div className="col-sm-12">
                        <h3>Attendance</h3>
                    </div>
                </div> 	
                <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                        <form id={this.props.gradeId}  ref={(form) => { this.form = form }}
                                                onSubmit={(e) => { this.handleAttendanceSubmit(e) }}>
                        <div className="form-group">
                            <label htmlFor="date">Date:</label>
                            <input type="date" name="date" required="required" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Subject:</label>
                            <input type="text" name="subject" required="required" className="form-control"/>
                        </div>
                        <input type="hidden" name="studentCount" value={this.props.students.length} required="required" className="form-control"/>
                        <div className="form-group">
                            <label htmlFor="hoursFrom">Time From:</label>
                            <input type="time" name="hoursFrom" required="required" className="form-control"/>
                            <label htmlFor="hoursTo">Time To:</label>
                            <input type="time" name="hoursTo" required="required" className="form-control"/>
                        </div>
                        {studentJSX}
                        <div className="form-group">
                            <input type="submit" value="Done" />
                        </div>
                        </form>
                    </div>
                </div>                        
            </section>
        </div>
   );
  }
}

export default StudentsList;