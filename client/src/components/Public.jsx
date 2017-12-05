import React, { Component } from 'react';
import { login } from '../utils/AuthService';

/*
*  Component displayed publically in the loggedout state.
*/
class Public extends Component {
    
      render() {
        return (
            <div className="container-fluid public-login">
                <div className="public-logo">BenchMark</div>
                <button className="login btn btn-primary" onClick={() => login()}>Log In - Sign Up</button>
            </div>
        );
      }
    }

export default Public;