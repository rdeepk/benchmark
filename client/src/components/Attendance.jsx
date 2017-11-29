import React, { Component } from 'react';
// import { Route } from 'react-router-dom';

class Attendance extends Component {
  render() {
    console.log("in attend:   ",this.props.attendance);
    const {attendance} = this.props;
    let jsx;
    if(attendance) {
      let presentJSX = attendance.present.map((item, i) => {
        return <div>Name: {item.name}</div>
      })

      let absentJSX = attendance.absent.map((item, i) => {
        return <div>Name: {item.name}</div>
      })

      jsx = <div>
              <div>Date: {attendance.date}</div>
              <div>Subject: {attendance.subject}</div>
              <div>Time: {attendance.timeFrom} - {attendance.timeTo}</div>
              <div>Grade: {attendance.grade}</div>
              <div>Students Present: {presentJSX}</div>
              <div>Students Absent: {absentJSX}</div>
            </div>
    }
  
    return (
      <div>{jsx}
      </div>
   );
  }
}

export default Attendance;