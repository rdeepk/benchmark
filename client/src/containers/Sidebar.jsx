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
        {( isLoggedIn() ) ? 
            <div>
            <Link to="/bulletin">Bulletin Board</Link><br />
            {this.state.role === 'teacher' && <Link to="/grades">Grades</Link>}
            </div>
          :  ''}
      </div>
    );
  }
}

export default Sidebar;