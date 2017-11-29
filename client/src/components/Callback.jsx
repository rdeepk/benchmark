import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import { setIdToken, setAccessToken, setRole } from '../utils/AuthService';

class Callback extends Component {
    componentDidMount() {
        setAccessToken();
        setIdToken();
        setRole();
       this.props.setLoginState()
        window.location.href = "/";
      }
    
      render() {
        return null;
      }
    }

export default Callback;