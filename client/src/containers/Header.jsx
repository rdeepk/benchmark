import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { requireAuth, getAccessToken } from '../utils/AuthService';
import { login, logout, isLoggedIn } from '../utils/AuthService';

class Header extends Component {

  render() {
    return (
      <div className="header">
        {(isLoggedIn()) ? ( <button className="btn" onClick={() => logout()}>Log out </button> ) : ( <button className="btn btn-info log" onClick={() => login()}>Log In/Sign Up</button> )}
      </div>
    );
  }
}

export default Header;