import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { isLoggedIn, setRole } from '../utils/AuthService';
import {getLinks, getGrades} from '../api/api';

/*
*  Sidebar container to diplay the links relevant to the role of logged in user.
*/
class Sidebar extends Component {

  componentDidMount() {
    getLinks()
    .then((data) => {
      this.props.setRole(data.role);
      setRole(data.role);
      if(data.role === 'teacher') {
        getGrades(data.grades)
          .then((data)=> {
            this.props.setGradesState(data)
          })
      }
    })
  }

  render() {
    return (
      <div className="sidebar">
        <ul>
          <li><Link to="/"><i className="fa fa-fw fa-bell" aria-hidden="true"></i><span>Notice Board</span></Link></li>
          {isLoggedIn() && this.props.role === 'teacher' && <li><Link to="/attendance"><i className="fa fa-fw fa-mortar-board" aria-hidden="true"></i><span>Attendance</span></Link></li>}
          {isLoggedIn() && this.props.role === 'student' && <li><Link to="/studentAttendance"><i className="fa fa-fw fa-mortar-board" aria-hidden="true"></i><span>Attendance</span></Link></li>}
          {isLoggedIn() && this.props.role === 'parent' && <li><Link to="/childAttendance"><i className="fa fa-fw fa-mortar-board" aria-hidden="true"></i><span>Attendance</span></Link></li>}
          {isLoggedIn() && <li><Link to="/group"><i className="fa fa-fw fa-comments-o" aria-hidden="true"></i><span>Chat</span></Link></li>}
        </ul>
      </div>
    );
  }
}

export default Sidebar;