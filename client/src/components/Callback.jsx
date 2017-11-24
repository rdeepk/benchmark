import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import { setIdToken, setAccessToken } from '../utils/AuthService';

class Callback extends Component {
    componentDidMount() {
        setAccessToken();
        setIdToken();
        window.location.href = "/";
      }
    
      render() {
        return null;
      }
    }

export default Callback;