import React, { Component } from 'react';
import { setIdToken, setAccessToken, setRole, setUserId } from '../utils/AuthService';

/*
*  Component used as a callback by Auth0 after login. Sets the globals after user logs in.
*/
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