import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import StudentsList from './StudentsList';

class Grade extends Component {
  render() {
    return (
      <div>
      <StudentsList students={this.props.grade.students} />
      </div>
   );
  }
}

export default Grade;