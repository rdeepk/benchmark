import React, { Component } from 'react';

class Student extends Component {
    constructor() {
        super();
        this.state = {
            present: true
        }
    }

    handleAttendance= (e) => {
        console.log(e.target);
    }
  render() {
    return (
        <div className="form-group">
            <label htmlFor="attendance">{this.props.student.name}</label>
            <select name="attendance" value={this.state.present} id={this.props.student._id} onChange={this.handleAttendance}>
            <option value={true}>P</option>
            <option value={false}>A</option>
            </select>
        </div>
   );
  }
}

export default Student;