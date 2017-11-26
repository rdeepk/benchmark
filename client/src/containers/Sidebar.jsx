import React, { Component } from 'react';
import Bulletin from '../components/Bulletin';
import { Route, Link } from 'react-router-dom'
import { requireAuth,isLoggedIn } from '../utils/AuthService';

class Sidebar extends Component {

  render() {
    return (
      <div className="sidebar">
        {( isLoggedIn() ) ? 
            <div>
            <Link to="/bulletin">Bulletin Board</Link><br />
            <Link to="/teachers">Teachers</Link><br />
            <Link to="/grades">Grades</Link>
            </div>
          :  ''}
      </div>
    );
  }
}

export default Sidebar;