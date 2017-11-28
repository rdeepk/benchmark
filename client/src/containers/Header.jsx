import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { requireAuth, getAccessToken } from '../utils/AuthService';
import { login, logout, isLoggedIn } from '../utils/AuthService';

class Header extends Component {

  render() {
    return (
      <div className="header">
        <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <div className="logo">Benchmark</div>
          </div>
          <div className="col-sm-6">
            <div className="login">
              {(isLoggedIn()) ? ( <a href="" className="logout" onClick={() => logout()}>Log out </a> ) : ( <button className="login" onClick={() => login()}>Log In/Sign Up</button> )}
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Header;
