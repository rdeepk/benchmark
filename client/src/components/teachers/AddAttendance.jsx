import React, { Component } from 'react';
import {createAttendance} from '../../api/attendance';

class AddAttendance extends Component {

  handleAttendanceSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    createAttendance(this.form.id, e.target);
  }

  render() {
    let studentJSX;
    if(this.props.students) {
      studentJSX = this.props.students.map((student, i) => {
        return <div className="form-group col-md-6">
          <label htmlFor={student._id}>{i+1}. {student.name}</label>
          <select class="custom-select form-control" name={'attendance'+i} id={student._id} onChange={this.handleAttendance}>
          <option value={true}>P</option>
          <option value={false}>A</option>
          </select>
        </div>
      })
    }
    return (
      <div className="add-attendance" style={{display: this.props.displayAttendanceForm}}>
                <section> 	
                <div className="row">
                    <div className="col-md-12">
                        <form id={this.props.gradeId}  ref={(form) => { this.form = form }}
                                                onSubmit={(e) => { this.handleAttendanceSubmit(e) }}>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label htmlFor="date">Date:</label>
                                <input type="date" name="date" required="required" className="form-control" />
                            </div>
                            <div className="form-group col-md-12">
                                <label htmlFor="subject">Subject:</label>
                                <input type="text" name="subject" required="required" className="form-control"/>
                            </div>
                            <input type="hidden" name="studentCount" value={this.props.students.length} required="required" className="form-control"/>
                            <div className="form-group col-md-6">
                                <label htmlFor="hoursFrom">Time To:</label>
                                <input type="time" name="hoursTo" required="required" className="form-control"/>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="hoursFrom">Time From:</label>
                                <input type="time" name="hoursFrom" required="required" className="form-control"/>
                            </div>
                            {studentJSX}
                            <div className="form-group col-md-offset-2 col-md-4">
                                <input class="btn btn-primary" type="submit" value="Done" />
                            </div>
                            <div className="form-group col-md-4">
                                <input class="btn btn-primary" onClick={this.props.toggleAttendanceFormDisplay} value="Cancel" />
                            </div>
                        </div>  
                        </form>
                    </div>
                </div>                        
            </section>
        </div>
   );
  }
}

export default AddAttendance;