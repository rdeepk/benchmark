import React, { Component } from 'react';
import Bulletin from '../components/Bulletin';
import { Route, Link } from 'react-router-dom'
import { requireAuth,isLoggedIn } from '../utils/AuthService';
import {getLinks, getGrades} from '../api/api';

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      role: ''
    }
  }
  componentDidMount() {
    getLinks()
    .then((data) => {
      this.setState({
        role: data.role
      })
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
          <li><Link to="/bulletin"><i class="fa fa-fw fa-bell" aria-hidden="true"></i><span>Notice Board</span></Link></li>
          {isLoggedIn() && this.state.role === 'teacher' && <li><Link to="/grades"><i class="fa fa-fw fa-signal" aria-hidden="true"></i><span>Attendance</span></Link></li>}
        </ul>
      </div>
    );
  }
}

export default Sidebar;