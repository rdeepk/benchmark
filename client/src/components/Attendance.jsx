import React, { Component } from 'react';
// import { Route } from 'react-router-dom';

class Attendance extends Component {
  render() {
    console.log("in attend:   ",this.props.attendance);
    const {attendance} = this.props;
    let jsx;
    if(attendance) {
      let presentJSX = attendance.present.map((item, i) => {
        return <div>{item.name}</div>
      })

      let absentJSX = attendance.absent.map((item, i) => {
        return <div>{item.name}</div>
      })

      jsx = <div className="attendance">
              <div className="row title">
                <div className="col-sm-4">
                  <div style={{display: 'none'}}>Time: {attendance.timeFrom} - {attendance.timeTo}</div>
                  <div>Date: {attendance.date}</div>
                </div>
                <div className="col-sm-4">
                  <div>Subject: {attendance.subject}</div>
                </div>
                <div className="col-sm-4">
                <div>Grade: {attendance.grade}</div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-offset-2 col-sm-4">
                  <p>Students Present</p>
                  {presentJSX}
                </div>
                <div className="col-sm-4">
                  <p>Students Absent</p>
                  {absentJSX}
                </div>
              </div>             
            </div>
    }
  
    return (
      <div>{jsx}
      </div>
   );
  }
}

export default Attendance;