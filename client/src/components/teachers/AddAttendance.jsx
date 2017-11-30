import React, { Component } from 'react';
import {createAttendance} from '../../api/attendance';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class AddAttendance extends Component {

  handleAttendanceSubmit = (e) => {
      e.preventDefault();
      this.props.toggleAttendanceFormDisplay(e);
    createAttendance(this.form.id, e.target)
    .then((data)=> {
        this.props.addToAttendanceState(data);
    })
    this.form.reset();
  }

  render() {
    let studentJSX;
    if(this.props.students) {
      studentJSX = this.props.students.map((student, i) => {
        return <div className="form-group col-md-12">
          <label className="toggle" htmlFor={student._id}>
            <div>
                {i+1}. {student.name}
            </div>
            <div className="switch">
                <input type="checkbox" id={student._id} name={'attendance'+i} value="absent" onChange={this.handleAttendance} />
                <span className="slider"></span>
            </div>
          </label>
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
                                <input type="datetime-local" name="date" required="required" className="form-control" />
                            </div>
                            <div className="form-group col-md-12">
                                <label htmlFor="subject">Subject:</label>
                                <input type="text" name="subject" required="required" className="form-control"/>
                            </div>
                            <input type="hidden" name="studentCount" value={this.props.students.length} required="required" className="form-control"/>
                            {/* <div className="form-group col-md-6">
                                <label htmlFor="hoursFrom">Start Time:</label>
                                <input type="time" name="hoursTo" required="required" className="form-control"/>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="hoursFrom">End Time:</label>
                                <input type="time" name="hoursFrom" required="required" className="form-control"/>
                            </div> */}
                            {studentJSX}
                            <div className="form-group col">
                                <input class="btn btn-primary" type="submit" value="Done" />
                                <input class="btn btn-primary" type="button" onClick={this.props.toggleAttendanceFormDisplay} value="Cancel" />
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