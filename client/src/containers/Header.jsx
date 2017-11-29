import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { requireAuth, getAccessToken } from '../utils/AuthService';
import { login, logout, isLoggedIn } from '../utils/AuthService';

class Header extends Component {

  render() {
    return (
      <div className="header">
        <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="logo">BenchMark</div>
          </div>
          <div className="col">
            <div className="login">
              {(isLoggedIn()) ? ( <a href="" className="logout btn-link" onClick={() => logout()}>Log out </a> ) : ( <button className="login btn-link" onClick={() => login()}>Log In - Sign Up</button> )}
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Header;
