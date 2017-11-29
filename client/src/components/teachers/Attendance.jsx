import React, { Component } from 'react';
import moment from 'moment';

class Attendance extends Component {
  
  getFormattedDate = (date) => {
    return  moment(date).format('YYYY-MM-DD')
  }

  render() {
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
                  <div>Date: {this.getFormattedDate(attendance.date)}</div>
                </div>
                <div className="col-sm-4">
                  <div>Subject: {attendance.subject}</div>
                </div>
                <div className="col-sm-4">
                <div>Grade: {attendance.grade.name}</div>
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