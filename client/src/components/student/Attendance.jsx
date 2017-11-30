import React, { Component } from 'react';
import moment from 'moment';

class Attendance extends Component {

    formatTime = (time) => {
        return moment(time).format("hh:mm:ss a");
    }

    render() {
        const {attendance} = this.props;
        let jsx;
        if(attendance) {
        jsx = <div className="attendance">
                    <div className="row">
                        <div className="col-sm-12">
                            <div>Time: {this.formatTime(attendance.timeFrom)} - {this.formatTime(attendance.timeTo)}
                            <div>Subject: {attendance.subject}</div></div>
                            <div>Teacher Name: {attendance.owner.name}</div>
                            <div>Attendance: {this.props.present ? 'Present' : 'Absent'}</div>
                        </div>
                    </div>
                </div>
        }
    
        return (
            <div>{jsx}</div>
        );
    }
}

export default Attendance;