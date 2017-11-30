import React, { Component } from 'react';
import { setIdToken, setAccessToken, setRole, setUserId } from '../utils/AuthService';

class Callback extends Component {
    componentDidMount() {
        setAccessToken();
        setIdToken();
        setRole();
        setUserId();
       this.props.setLoginState()
        window.location.href = "/";
      }
    
      render() {
        return null;
      }
    }

export default Callback;