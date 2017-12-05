import React, { Component } from 'react';
import moment from 'moment';

/*
*  Component populated with the attendance of a selected child.
*/
class Attendance extends Component {

    /*
    *  Takes time as a param and return the formatted value.
    */
    formatTime = (time) => {
        return moment(time).format("hh:mm:ss a");
    }

    render() {
        const {attendance} = this.props;
        let jsx;
        if(attendance) {
        jsx = <div className="attendance-body">
                    <div className="row">
                        <div className="col-md-4">
                            {/* <div>Time: {this.formatTime(attendance.timeFrom)} - {this.formatTime(attendance.timeTo)}</div> */}
                            <div><span className="d-md-none">Subject:</span> {attendance.subject}</div>
                        </div>
                        <div className="col-md-4">
                            <div><span className="d-md-none">Teacher:</span> {attendance.owner.name}</div>
                        </div>
                        <div className="col-md-4">
                            <div><span className="d-md-none">Attendance:</span> {this.props.present ? 'Present' : 'Absent'}</div>
                        </div>
                    </div>
                    <hr />
                </div>
        }
    
        return (
            <div>{jsx}</div>
        );
    }
}

export default Attendance;