import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import {getUserById} from '../api/users';
class StudentsList extends Component {
  render() {
    let studentsSelectJSX;
    if(this.props.students) {
      studentsSelectJSX = this.props.students.map((student, i) => {
        console.log(student);
            return <option value={student._id} id={student.email}>{student.name}</option>       
      })
    }
    return (
      <div><select>{studentsSelectJSX }</select>
      </div>
   );
  }
}

export default StudentsList;